# -*- coding: utf-8 -*-
"""Parse the public reading-translation notes into the archive data format."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

SRC = Path("/tmp/reading-src")
OUT = Path(__file__).resolve().parents[2] / "exam-data" / "reading"


def clean(s: str) -> str:
    s = str(s).strip()
    s = s.replace("==", "")
    s = re.sub(r"(?m)^>\s*", "", s)
    s = re.sub(r"（定位：[^）]*）", "", s)
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = s.replace("`", "")
    s = re.sub(r"\s+", " ", s).strip()
    return s


def overview_parts(text: str) -> tuple[str, list[str], str]:
    m = re.search(r"> \[!abstract\] 文章概览\n(.*?)(?=\n---|\n## Passage)", text, re.S)
    if not m:
        return "", [], ""
    lines = []
    for line in m.group(1).splitlines():
        line = line.lstrip("> ").strip()
        if line:
            lines.append(line)
    raw_overview = "\n".join(lines)
    overview = "\n".join(clean(x) for x in lines)
    topics = []
    tm = re.search(r"(?:\*\*)?主题(?:\*\*)?[：:]\s*(.+?)(?=\n-\s*(?:\*\*)?行文逻辑|\Z)", raw_overview, re.S)
    if tm:
        raw = re.sub(r"\s*\n\s*", "", tm.group(1)).strip().rstrip("。")
        raw = re.sub(r"^四篇文章依次讨论", "", raw)
        raw = raw.replace("，以及", "、").replace("以及", "、")
        topics = [clean(x) for x in re.split(r"[、；]", raw) if clean(x)]
        if len(topics) > 4:
            topics = topics[:4]
    topic_line = re.sub(r"\s*\n\s*", "", tm.group(1)).strip() if tm else ""
    return overview, topics, clean(topic_line)


def guess_pos(w: str) -> str:
    wl = w.lower().strip()
    if " " in wl or "-" in wl and " " in wl:
        return "phr."
    if wl.endswith("ly"):
        return "adv."
    if wl.endswith(("tion", "sion", "ment", "ity", "ness", "ance", "ence", "ship", "age")):
        return "n."
    if wl.endswith(("ive", "ous", "able", "ible", "al", "ic", "ful", "less", "ary")):
        return "adj."
    if wl.endswith(("ize", "ise", "ify", "ate")):
        return "v."
    if wl.endswith("ing") and "-" in wl:
        return "adj."
    if wl.endswith("ing"):
        return "v./n."
    if wl.endswith("ed"):
        return "v./adj."
    return "词"


def parse(path: Path, year: int) -> dict:
    text = path.read_text(encoding="utf-8")
    overview, topics, topic_line = overview_parts(text)
    passages = []
    sentences = []
    vocab = []
    seen_vocab = set()

    chunks = re.split(r"\n## Passage\s+(\d+)\s*\n", text)
    for i in range(1, len(chunks), 2):
        pno = int(chunks[i])
        body = chunks[i + 1]
        cn_title = topics[pno - 1] if len(topics) >= pno else f"Passage {pno}"

        paras = []
        pchunks = re.split(r"\n#### Paragraph\s+(\d+)\s*\n", body)
        for j in range(1, len(pchunks), 2):
            pnum = int(pchunks[j])
            pbody = re.split(r"\n### 题目解析", pchunks[j + 1])[0]
            # prepend newline so the first **S1** is captured too
            sblocks = re.split(r"\n\*\*S(\d+)\*\*\s*\n", "\n" + pbody)
            ens, zhs = [], []
            for k in range(1, len(sblocks), 2):
                snum = int(sblocks[k])
                sbody = sblocks[k + 1]
                qm = re.search(r"> \[!quote\] 原文\s*\n(.*?)(?=\n\*\*精译|\n> \[!)", sbody, re.S)
                en = ""
                if qm:
                    lines = [clean(l.lstrip("> ").strip()) for l in qm.group(1).splitlines() if l.strip().startswith(">")]
                    en = " ".join([x for x in lines if x])
                tm = re.search(r"\*\*精译\*\*[：:]\s*(.+)", sbody)
                zh = tm.group(1).strip() if tm else ""
                if not en:
                    continue
                ens.append(en)
                zhs.append(clean(zh))

                # 长难句拆解
                tipm = re.search(r"> \[!tip\] 长难句拆解\s*\n(.*?)(?=\n> \[!|\n####|\Z)", sbody, re.S)
                if tipm:
                    tipblock = tipm.group(1)

                    def bullet(label: str) -> str:
                        bm = re.search(r">\s*-\s*\*\*" + label + r"\*\*[：:]\s*(.+)", tipblock)
                        return clean(bm.group(1)) if bm else ""

                    core = bullet("主干")
                    struct = bullet("结构")
                    pitfall = bullet("易错点")
                    if core or struct:
                        vm = re.findall(r">\s*-\s*`([^`]+)`[：:]\s*(.+)", sbody)
                        keys = "；".join(f"{a}：{clean(b)}" for a, b in vm[:4])
                        sentences.append({
                            "id": f"{year}-T{pno}-P{pnum}-S{snum:02d}",
                            "sec": f"text{pno}",
                            "sec_label": f"Text {pno}",
                            "level": 3,
                            "en": en,
                            "core": core or "见结构",
                            "structure": struct or "见原句",
                            "key": keys or "见下方词汇笔记",
                            "zh": clean(zh) or "（译文待补）",
                            "tip": pitfall or "先找谓语，再拆从句；把修饰语挂回它修饰的词。",
                        })

                # 词汇
                for blockname in ["熟词僻义", "词汇与搭配"]:
                    bm = re.search(r"> \[!(?:warning|info)\] " + blockname + r"\s*\n(.*?)(?=\n> \[!|\n####|\Z)", sbody, re.S)
                    if not bm:
                        continue
                    for line in bm.group(1).splitlines():
                        mm = re.match(r">\s*-\s*`([^`]+)`[：:]\s*(.+)", line)
                        if not mm:
                            continue
                        w = mm.group(1).strip()
                        note = clean(mm.group(2))
                        key = w.lower()
                        if key in seen_vocab or len(w) > 48 or not note:
                            continue
                        seen_vocab.add(key)
                        vocab.append({
                            "w": w,
                            "pos": guess_pos(w),
                            "cn": note,
                            "sec": f"text{pno}",
                            "sec_label": f"Text {pno}",
                            "ctx": en[:170],
                            "forms": [w],
                            "note": note,
                        })
            if ens:
                paras.append({"en": " ".join(ens), "zh": " ".join(zhs)})

        # 题目
        qarea = re.split(r"\n### 题目解析", body, 1)
        qtext = qarea[1] if len(qarea) > 1 else ""
        qchunks = re.split(r"\n#### Q(\d+)\s*\n", qtext)
        qs = []
        for k in range(1, len(qchunks), 2):
            qno = int(qchunks[k])
            qbody = qchunks[k + 1]
            sm = re.search(r"\*\*题干\*\*[：:]\s*(.+)", qbody)
            stem = clean(sm.group(1)) if sm else ""
            am = re.search(r"\*\*标准答案\*\*[：:]\s*`([A-D])`", qbody)
            answer = am.group(1) if am else ""
            em = re.search(r"\[!quote\] 原文定位\s*\n(.*?)(?=\n> \[!success\])", qbody, re.S)
            evidence = ""
            if em:
                evidence = "\n".join(
                    clean(l.lstrip("> ").strip())
                    for l in em.group(1).splitlines()
                    if l.strip().startswith(">") and clean(l.lstrip("> ").strip())
                )
            cm = re.search(r"> \[!success\] 正确项[：:]\s*([A-D])\s*(.*?)(?=\n>\s*\n|\n\n> \[!failure\]|\Z)", qbody, re.S)
            correct_text = cm.group(2).strip() if cm else ""
            opts = {}
            if cm:
                opts[cm.group(1)] = clean(correct_text.split("\n")[0])
            wm = re.search(r"> \[!failure\] 其他选项辨析\s*\n(.*)", qbody, re.S)
            wrong_lines = []
            if wm:
                for line in wm.group(1).splitlines():
                    mm = re.match(r">\s*-\s*\*\*([A-D])\s+(.*?)\*\*(.*)", line)
                    if mm:
                        letter, opt, rest = mm.group(1), mm.group(2), mm.group(3)
                        if letter not in opts:
                            opts[letter] = clean(opt)
                        wrong_lines.append(f"{letter}. {clean(opt)}：{clean(rest.lstrip('：:'))}")
            options = [opts.get(x, "") for x in "ABCD"]
            exp = []
            if correct_text:
                exp.append("正确项：" + clean(correct_text))
            if wrong_lines:
                exp.append("其他选项：" + "；".join(wrong_lines))
            sl = stem.lower()
            if "title" in sl:
                typ = "主旨/标题"
            elif "attitude" in sl:
                typ = "态度"
            elif "refers to" in sl:
                typ = "指代"
            elif "suggest" in sl or "infer" in sl or "imply" in sl:
                typ = "推断"
            elif "because" in sl or "in that" in sl:
                typ = "因果"
            elif "author" in sl:
                typ = "观点"
            else:
                typ = "细节"
            qs.append({
                "n": qno, "stem": stem, "options": options, "answer": answer,
                "explain": "\n".join(exp), "evidence": evidence, "trap": "", "type": typ,
            })
        passages.append({
            "id": f"text{pno}",
            "kicker": "Section II · Part A",
            "title": f"Text {pno}",
            "en_title": (paras[0]["en"][:70] + "…") if paras else cn_title,
            "cn_title": cn_title,
            "score": 10,
            "suggest": "16–18 分钟",
            "topic": cn_title,
            "intro": f"本篇主题：{cn_title}。先读题干，圈出关键词；回原文找证据句，再用主体、范围、方向排除。",
            "paragraphs": paras,
            "questions": qs,
        })

    return {
        "meta": {
            "year": year,
            "exam": f"{year} 年全国硕士研究生招生考试",
            "subject": "英语（一）",
            "title": f"{year} 英语（一）阅读精讲",
            "overview": overview,
            "topics": topics,
            "stats": {"sentences": len(sentences), "vocab": len(vocab)},
        },
        "reading": passages,
        "sentences": sentences,
        "vocab": vocab,
    }


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for year in range(2010, 2027):
        path = SRC / f"{year}.md"
        if not path.exists():
            print("missing", path)
            continue
        data = parse(path, year)
        out = OUT / f"{year}.json"
        out.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        print(year, "texts", len(data["reading"]), "sentences", len(data["sentences"]), "vocab", len(data["vocab"]))


if __name__ == "__main__":
    main()
