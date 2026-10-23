# -*- coding: utf-8 -*-
"""生成 2021 英语一学习页与真题 Markdown。

用法：
    python3 English/frontend/build.py
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent          # English/frontend
ENGLISH = ROOT.parent                           # English
SRC = ROOT / "src"
DOC = ENGLISH / "真题" / "2021英语一"
OUT_HTML = ROOT / "2021.html"

sys.path.insert(0, str(SRC))

from content.exam import META, EXAM  # noqa: E402
from content.sentences import SENTENCES  # noqa: E402
from content.vocab import VOCAB  # noqa: E402
from content.skills import SKILLS, QUIZ, PLAN  # noqa: E402


def fail(msg: str) -> None:
    raise SystemExit(f"❌ {msg}")


def validate() -> None:
    cloze = EXAM["cloze"]
    if len(cloze["questions"]) != 20:
        fail(f"完形应为 20 题，实际 {len(cloze['questions'])}")
    nums = [q["n"] for q in cloze["questions"]]
    if nums != list(range(1, 21)):
        fail(f"完形题号不连续：{nums}")
    passage = "\n".join(p["en"] for p in cloze["passage"])
    if set(re.findall(r"\{\{(\d+)\}\}", passage)) != {str(i) for i in range(1, 21)}:
        fail("完形原文的 1–20 空标记不完整。")
    expected_cloze = [
        "peaks", "generally", "while", "accumulation", "possibility",
        "delay", "included", "compared", "with", "scored", "went by",
        "attributable", "involved", "explain", "treatments", "Meanwhile",
        "take", "well-being", "level", "diet",
    ]
    for q, want in zip(cloze["questions"], expected_cloze):
        got = q["options"]["ABCD".index(q["answer"])]
        if got.lower() != want.lower():
            fail(f"完形第 {q['n']} 题答案错位：{q['answer']} → {got}，应为 {want}")

    reading = EXAM["reading"]
    if len(reading) != 4:
        fail(f"阅读应为 4 篇，实际 {len(reading)}")
    all_rq = [q for t in reading for q in t["questions"]]
    if [q["n"] for q in all_rq] != list(range(21, 41)):
        fail("阅读题号不是 21–40。")
    expected_reading = {
        21: "remains", 22: "rail travellers", 23: "failed to provide", 24: "change of ownership",
        25: "sustainable", 26: "better off", 27: "environmental degradation", 28: "forest loss",
        29: "protect the environment", 30: "effects of a program", 31: "impression", 32: "rare",
        33: "dental", 34: "deep-root", 35: "stern", 36: "partiality", 37: "anti-regulatory",
        38: "anti-competitive", 39: "out of touch", 40: "congress",
    }
    for q in all_rq:
        letter = q["answer"]
        if letter not in "ABCD":
            fail(f"阅读第 {q['n']} 题答案 {letter} 非法")
        opt = q["options"]["ABCD".index(letter)].lower()
        if expected_reading[q["n"]] not in opt:
            fail(f"阅读第 {q['n']} 题答案与选项内容不匹配：{letter} → {opt}")

    partb = EXAM["partb"]
    if len(partb["answers"]) != 5:
        fail("新题型应为 5 题。")
    if set(partb["options"]) != set("ABCDEFG"):
        fail("新题型选项不是 A–G。")
    for a in partb["answers"]:
        if a["answer"] not in partb["options"]:
            fail(f"新题型第 {a['n']} 题答案非法。")
    expected_b = {41: "résumés", 42: "Acquisio", 43: "charge them too little", 44: "EY", 45: "predict"}
    for a in partb["answers"]:
        text = partb["options"][a["answer"]]["en"]
        if expected_b[a["n"]] not in text:
            fail(f"新题型第 {a['n']} 题答案错位：{a['answer']} → {text[:60]}")

    partc = EXAM["partc"]
    if set(partc["segments"]) != {str(i) for i in range(46, 51)}:
        fail("翻译画线句不是 46–50。")
    partc_text = "\n".join(p["en"] for p in partc["paragraphs"])
    if set(re.findall(r"\[\[(\d+)\]\]", partc_text)) != {str(i) for i in range(46, 51)}:
        fail("翻译原文的画线标记不完整。")

    if len(SENTENCES) < 55:
        fail(f"长难句过少：{len(SENTENCES)}")
    if len(VOCAB) < 150:
        fail(f"词汇过少：{len(VOCAB)}")
    for v in VOCAB:
        for key in ("w", "pos", "cn", "sec", "ctx", "note"):
            if not v.get(key):
                fail(f"词条缺字段 {key}：{v}")
    for s in SENTENCES:
        for key in ("id", "sec", "en", "core", "structure", "key", "zh", "tip"):
            if not s.get(key):
                fail(f"长难句缺字段 {key}：{s.get('id')}")

    # 写作字数（宽松校验，只防止明显过短/过长）
    a_words = len(EXAM["writing"]["partA"]["sample"].split())
    b_words = len(EXAM["writing"]["partB"]["sample"].split())
    if not 85 <= a_words <= 130:
        fail(f"小作文范文约 {a_words} 词，超出 85–130 的合理范围。")
    if not 150 <= b_words <= 220:
        fail(f"大作文范文约 {b_words} 词，超出 150–220 的合理范围。")


def md_escape(text: str) -> str:
    """仅处理 Markdown 表格中的竖线；正文保留原样。"""
    return str(text).replace("|", "\\|")


def display_blanks(text: str) -> str:
    return re.sub(r"\{\{(\d+)\}\}", lambda m: f"__({m.group(1)})__", text)


def cloze_text() -> str:
    parts = []
    for p in EXAM["cloze"]["passage"]:
        t = p["en"]
        t = re.sub(r"\{\{(\d+)\}\}", lambda m: f"__({m.group(1)})__", t)
        parts.append(t)
    return "\n\n".join(parts)


def reading_text(t: dict) -> str:
    return "\n\n".join(p["en"] for p in t["paragraphs"])


def partc_text() -> str:
    out = []
    for p in EXAM["partc"]["paragraphs"]:
        t = p["en"]
        t = re.sub(r"\[\[(\d+)\]\](.*?)\[\[/\1\]\]", lambda m: f"**({m.group(1)}) {m.group(2)}**", t, flags=re.S)
        out.append(t)
    return "\n\n".join(out)


def markdown_docs() -> dict[str, str]:
    e = EXAM
    meta = e["meta"]
    docs: dict[str, str] = {}

    # ---------- 01 真题原文 ----------
    md = [
        f"# {meta['exam']} · {meta['subject']}",
        "",
        f"> 考试时间：{meta['date']}　满分：{meta['score']} 分　建议用时：{meta['duration']}",
        ">",
        "> 本文件为纯原文版，答案与解析见 `02-答案与解析.md`。",
        "",
        "## Section I　Use of English（完形填空，10 分）",
        "",
        f"**Directions:** {e['cloze']['directions']}",
        "",
        cloze_text(),
        "",
        "### 题目",
        "",
    ]
    for q in e["cloze"]["questions"]:
        md.append(f"**{q['n']}.** " + "　".join(f"{'ABCD'[i]}. {o}" for i, o in enumerate(q["options"])))
        md.append("")
    md += ["", "## Section II　Reading Comprehension", "", "### Part A", "", f"**Directions:** {meta['parta_directions']}", ""]
    for t in e["reading"]:
        md += [f"## {t['title']}　{t['cn_title']}", "", f"> {t['topic']}　建议用时：{t['suggest']}", "", reading_text(t), "", "### 题目", ""]
        for q in t["questions"]:
            md.append(f"**{q['n']}.** {q['stem']}")
            md.append("")
            for i, o in enumerate(q["options"]):
                md.append(f"- {'ABCD'[i]}. {o}")
            md.append("")
    md += ["### Part B　新题型（7 选 5，10 分）", "", f"**Directions:** {e['partb']['directions']}", ""]
    for b in e["partb"]["blocks"]:
        if b["type"] == "heading":
            md += [f"#### {b['en']}（{b['zh']}）", ""]
        else:
            md += [re.sub(r"\{\{(\d+)\}\}", lambda m: f"__({m.group(1)})__", b["en"]), ""]
    md += ["### 选项", ""]
    for k, o in e["partb"]["options"].items():
        md += [f"**[{k}]** {o['en']}", "", f"> {o['zh']}", ""]
    md += ["", "### Part C　翻译（10 分）", "", f"**Directions:** {e['partc']['directions']}", "", partc_text(), ""]
    md += ["", "## Section III　Writing", "", "### Part A　小作文（51，10 分）", "", e["writing"]["partA"]["prompt"], ""]
    md += ["", "### Part B　大作文（52，20 分）", "", e["writing"]["partB"]["prompt"], ""]
    md += ["**图画文字：**", "", f"- 孩子：{e['writing']['partB']['picture']['child']}", f"- 父亲：{e['writing']['partB']['picture']['father']}", ""]
    docs["01-真题原文.md"] = "\n".join(md).strip() + "\n"

    # ---------- 02 答案与解析 ----------
    md = [
        "# 2021 英语（一）· 答案与解析",
        "",
        "> 答案按本页所给选项顺序标注。若你手头的试卷选项顺序不同，请以“选项内容”为准，不要只背字母。",
        "",
        "## 答案速查",
        "",
        "| 题号 | 答案 | 题号 | 答案 | 题号 | 答案 | 题号 | 答案 |",
        "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ]
    all_answers = [("cloze", q["n"], q["answer"]) for q in e["cloze"]["questions"]]
    all_answers += [("read", q["n"], q["answer"]) for t in e["reading"] for q in t["questions"]]
    all_answers += [("partb", a["n"], a["answer"]) for a in e["partb"]["answers"]]
    for i in range(0, len(all_answers), 4):
        row = all_answers[i:i + 4]
        cells = []
        for _, n, a in row:
            cells += [f"**{n}**", a]
        while len(cells) < 8:
            cells += ["", ""]
        md.append("| " + " | ".join(cells) + " |")
    md += ["", "## Section I　完形填空", ""]
    for q in e["cloze"]["questions"]:
        md += [
            f"### {q['n']}. {q['answer']}　{q['options']['ABCD'.index(q['answer'])]}",
            "",
            f"- **选项词义：** " + "；".join(f"{'ABCD'[i]} {o}（{q['cn'][i]}）" for i, o in enumerate(q["options"])),
            f"- **解析：** {q['explain']}",
            f"- **干扰项：** {q['trap']}",
            f"- **考点：** {q['type']}",
            "",
        ]
    md += ["## Section II　Part A　阅读理解", ""]
    for t in e["reading"]:
        md += [f"## {t['title']}　{t['cn_title']}", "", f"> {t['intro']}", ""]
        for q in t["questions"]:
            md += [
                f"### {q['n']}. {q['answer']}　{q['type']}",
                "",
                f"**题干：** {q['stem']}",
                "",
                "**选项：**",
                "",
            ]
            for i, o in enumerate(q["options"]):
                md.append(f"- {'ABCD'[i]}. {o}")
            md += [
                "",
                f"**解析：** {q['explain']}",
                "",
                f"**证据句：** {q['evidence']}",
                "",
                f"**干扰项：** {q['trap']}",
                "",
            ]
    md += ["## Section II　Part B　新题型", ""]
    for a in e["partb"]["answers"]:
        md += [
            f"### {a['n']}. {a['answer']}",
            "",
            f"**解析：** {a['explain']}",
            "",
            f"**衔接线索：** {a['clue']}",
            "",
        ]
    md += [f"**多余选项：** {e['partb']['extra_note']}", ""]
    md += ["## Section II　Part C　翻译", ""]
    for n in [str(i) for i in range(46, 51)]:
        s = e["partc"]["segments"][n]
        md += [
            f"### {n}.",
            "",
            f"**原文：** {s['en']}",
            "",
            f"**参考译文：** {s['translation']}",
            "",
            f"**主干：** {s['core']}",
            "",
            f"**结构：** {s['structure']}",
            "",
            f"**关键词：** {s['key']}",
            "",
            f"**易错点：** {s['pitfall']}",
            "",
        ]
    md += ["## Section III　Writing", "", "### Part A　小作文参考范文", "", e["writing"]["partA"]["sample"], "", "### Part B　大作文参考范文", "", e["writing"]["partB"]["sample"], ""]
    docs["02-答案与解析.md"] = "\n".join(md).strip() + "\n"

    # ---------- 03 长难句 ----------
    md = [
        "# 2021 英语（一）· 长难句精析",
        "",
        f"> 共 {len(SENTENCES)} 句。每句按“主干—结构—关键词—翻译—提醒”拆解。建议先遮住解析，自己说一遍主干。",
        "",
    ]
    for s in SENTENCES:
        md += [
            f"## {s['id']}　{s['sec_label']}　难度 {'●' * s['level']}{'○' * (3 - s['level'])}",
            "",
            f"**原句：** {s['en']}",
            "",
            f"**主干：** {s['core']}",
            "",
            f"**结构：** {s['structure']}",
            "",
            f"**关键词：** {s['key']}",
            "",
            f"**参考译文：** {s['zh']}",
            "",
            f"**提醒：** {s['tip']}",
            "",
        ]
    docs["03-长难句精析.md"] = "\n".join(md).strip() + "\n"

    # ---------- 04 词汇 ----------
    md = [
        "# 2021 英语（一）· 核心词汇",
        "",
        f"> 共 {len(VOCAB)} 词。按试卷板块分组，含文中搭配、辨析与记忆提示。不要只背中文，先读搭配。",
        "",
    ]
    for sec, label in [("cloze", "完形填空"), ("text1", "Text 1"), ("text2", "Text 2"), ("text3", "Text 3"),
                       ("text4", "Text 4"), ("partb", "新题型"), ("partc", "翻译")]:
        items = [v for v in VOCAB if v["sec"] == sec]
        if not items:
            continue
        md += [f"## {label}（{len(items)} 词）", "", "| 单词 | 词性 | 中文 | 文中搭配 | 记忆 / 辨析 |", "| --- | --- | --- | --- | --- |"]
        for v in items:
            md.append(
                f"| **{md_escape(v['w'])}** | {md_escape(v['pos'])} | {md_escape(v['cn'])} | "
                f"{md_escape(v['ctx'])} | {md_escape(v['note'])} |"
            )
        md.append("")
    docs["04-核心词汇.md"] = "\n".join(md).strip() + "\n"

    # ---------- 06 全文翻译 ----------
    md = [
        "# 2021 英语（一）· 全文翻译",
        "",
        "> 译文用于对照精读，不必逐字对应。先自己译，再比较语序和词义取舍。",
        "",
        "## Section I　完形填空",
        "",
    ]
    for i, p in enumerate(e["cloze"]["passage"], 1):
        md += [f"**P{i}**", "", display_blanks(p["en"]), "", f"> {p['zh']}", ""]
    md += ["## Section II　Part A　阅读", ""]
    for t in e["reading"]:
        md += [f"## {t['title']}　{t['cn_title']}", ""]
        for i, p in enumerate(t["paragraphs"], 1):
            md += [f"**P{i}**", "", p["en"], "", f"> {p['zh']}", ""]
    md += ["## Section II　Part B　新题型", ""]
    for b in e["partb"]["blocks"]:
        if b["type"] == "heading":
            md += [f"### {b['en']}（{b['zh']}）", ""]
        else:
            md += [display_blanks(b["en"]), "", f"> {display_blanks(b['zh'])}", ""]
    md += ["## Section II　Part C　翻译", ""]
    for p in e["partc"]["paragraphs"]:
        md += [p["en"], "", f"> {p['zh']}", ""]
    md += ["## Section III　Writing", "", "### Part A", "", e["writing"]["partA"]["sample_zh"], "", "### Part B", "", e["writing"]["partB"]["sample_zh"], ""]
    docs["06-全文翻译.md"] = "\n".join(md).strip() + "\n"

    # ---------- 05 方法 ----------
    md = [
        "# 2021 英语（一）· 阅读方法与 7 日计划",
        "",
        "> 方法不是用来背的，是用来在下一套题里执行的。每读一章，回到本卷找一句原文验证。",
        "",
    ]
    for ch in SKILLS:
        md += [f"## {ch['num']}. {ch['title']}", "", f"> {ch['lede']}", ""]
        for sec in ch["sections"]:
            md += [f"### {sec['h']}", ""]
            for key in ("p", "p2"):
                for para in sec.get(key, []):
                    md += [para, ""]
            if sec.get("bullets"):
                md += [f"- {b}" for b in sec["bullets"]] + [""]
            if sec.get("table"):
                tb = sec["table"]
                md += ["| " + " | ".join(tb["head"]) + " |", "| " + " | ".join(["---"] * len(tb["head"])) + " |"]
                for row in tb["rows"]:
                    md.append("| " + " | ".join(md_escape(c) for c in row) + " |")
                md.append("")
            if sec.get("example"):
                ex = sec["example"]
                md += [f"> **例：** {ex['en']}", ">", f"> {ex['zh']}", ">", f"> {ex['note']}", ""]
    md += ["## 猜词训练", ""]
    for i, q in enumerate(QUIZ, 1):
        md += [f"**{i}. {q['q']}**", ""]
        for j, o in enumerate(q["options"]):
            md.append(f"- {'ABCD'[j]}. {o}")
        md += ["", f"> 答案：{'ABCD'[q['answer']]}。{q['explain']}", ""]
    md += ["## 7 日计划", ""]
    for d in PLAN:
        md += [f"### Day {d['day']}　{d['theme']}（{d['time']}）", ""]
        md += [f"- [ ] {t}" for t in d["tasks"]]
        md.append("")
    docs["05-阅读方法与训练计划.md"] = "\n".join(md).strip() + "\n"

    return docs


def build_html() -> None:
    template = (SRC / "template.html").read_text(encoding="utf-8")
    css = (SRC / "styles.css").read_text(encoding="utf-8")
    js = (SRC / "app.js").read_text(encoding="utf-8")

    payload = {
        "meta": META,
        "cloze": EXAM["cloze"],
        "reading": EXAM["reading"],
        "partb": EXAM["partb"],
        "partc": EXAM["partc"],
        "writing": EXAM["writing"],
        "sentences": SENTENCES,
        "vocab": VOCAB,
        "skills": SKILLS,
        "quiz": QUIZ,
        "plan": PLAN,
    }
    data_json = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    data_json = data_json.replace("</", "<\\/")

    html = template
    html = html.replace("{{CSS}}", css)
    html = html.replace("{{JS}}", js)
    html = html.replace("{{DATA}}", data_json)
    html = html.replace("{{N_SENT}}", str(len(SENTENCES)))
    html = html.replace("{{N_VOCAB}}", str(len(VOCAB)))

    if "{{" in html and "}}" in html:
        leftovers = re.findall(r"\{\{[A-Z_]+\}\}", html)
        if leftovers:
            fail(f"模板仍有未替换的占位符：{set(leftovers)}")

    OUT_HTML.write_text(html, encoding="utf-8")


def build_docs() -> None:
    DOC.mkdir(parents=True, exist_ok=True)
    docs = markdown_docs()
    for name, content in docs.items():
        (DOC / name).write_text(content, encoding="utf-8")

    payload = {
        "meta": META,
        "cloze": EXAM["cloze"],
        "reading": EXAM["reading"],
        "partb": EXAM["partb"],
        "partc": EXAM["partc"],
        "writing": EXAM["writing"],
        "sentences": SENTENCES,
        "vocab": VOCAB,
        "skills": SKILLS,
        "quiz": QUIZ,
        "plan": PLAN,
    }
    (DOC / "study-data.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    readme = f"""# 2021 英语（一）真题与拆解

这是 `2021 年全国硕士研究生招生考试英语（一）` 的完整学习包，内容与 `English/frontend/2021.html` 同源。

## 文件

| 文件 | 内容 |
| --- | --- |
| `01-真题原文.md` | 完形、阅读 4 篇、新题型、翻译、写作题目，无答案，适合打印做题 |
| `02-答案与解析.md` | 全部选择题答案、逐题解析、证据句、干扰项；翻译参考译文；写作范文 |
| `03-长难句精析.md` | {len(SENTENCES)} 句长难句的主干、结构、关键词、翻译和提醒 |
| `04-核心词汇.md` | {len(VOCAB)} 个核心词，按板块分组，含搭配与辨析 |
| `05-阅读方法与训练计划.md` | 猜词、拆句、定位、排除、主旨、完形、新题型、翻译写作方法与 7 日计划 |
| `06-全文翻译.md` | 完形、阅读 4 篇、新题型、翻译和写作范文的完整译文 |
| `study-data.json` | 结构化数据，供网页或其他工具复用 |

## 怎么用

1. 先打开 `01-真题原文.md`，按 180 分钟限时做一遍（作文也写）。
2. 对 `02-答案与解析.md`，只标错题，不急着看解析。
3. 用 `03` 和 `04` 补长难句与词汇，用 `05` 把错题归因到具体题型。
4. 打开 `../../frontend/2021.html`，用交互版复习：点空白看答案、点单词看笔记、闪卡背词、勾选计划。

## 版本说明

- 真题原文据公开扫描版试卷整理；答案按本页选项顺序标注。
- 扫描件中个别拼写、标点有 OCR 噪声，已按通行版本校正；如发现差异，以你手中的正式试卷为准。
- 本资料仅用于个人学习，不用于商业传播。

## 校对来源

- 真题 PDF：<https://github.com/Fantasia1999/kaoyanzhenti>（`公共课/英语真题/英语一/2021年考研英语一真题.pdf`）
- 答案交叉核对：<https://mtoutiao.xdf.cn/kaoyan/202111/11229761.html>
- 作文题意与图画说明：<https://m.koolearn.com/kaoyan/20210625/1455878.html>
"""
    (DOC / "README.md").write_text(readme, encoding="utf-8")


def main() -> None:
    validate()
    OUT_HTML.parent.mkdir(parents=True, exist_ok=True)
    build_html()
    build_docs()
    size = OUT_HTML.stat().st_size / 1024
    print("✅ 构建完成")
    print(f"   2021 全卷页: {OUT_HTML} ({size:.1f} KB)")
    print(f"   真题目录: {DOC}")
    print(f"   长难句: {len(SENTENCES)} 句")
    print(f"   词汇: {len(VOCAB)} 个")
    print(f"   选择题: {20 + sum(len(t['questions']) for t in EXAM['reading']) + 5} 道")


if __name__ == "__main__":
    main()
