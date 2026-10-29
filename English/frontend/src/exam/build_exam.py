# -*- coding: utf-8 -*-
"""Build the three-view-per-year English exam experience.

For each year:
  practice/YYYY.html   -- paper only, no answers, autosave, submit -> analysis
  analysis/YYYY.html   -- full solutions, wrong-answer report, all vocab/sentences
  knowledge/YYYY.html  -- answer-free knowledge map: structure, patterns, vocab,
                          long sentences, writing moves and study progress

Plus one standalone module:
  drill/               -- one-question random practice; answer bank is fetched
                          only on submit.  Data is split by year under
                          assets/drill/questions and assets/drill/answers.

The old years/*.html reader pages are intentionally left in place as a legacy
long-form edition.  This builder owns index.html and the new assets.
"""
from __future__ import annotations

import hashlib
import html
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]      # English/frontend
SRC = ROOT / "src" / "exam"
READING = ROOT.parent / "exam-data" / "reading"
YEARS = ROOT.parent / "exam-data" / "years"
OUT_PRACTICE = ROOT / "practice"
OUT_ANALYSIS = ROOT / "analysis"
OUT_KNOWLEDGE = ROOT / "knowledge"
OUT_DRILL = ROOT / "drill"
ASSETS = ROOT / "assets" / "exam"
ASSETS_DRILL = ROOT / "assets" / "drill"


def asset_version() -> str:
    digest = hashlib.sha256()
    for name in ("exam.css", "practice.js", "analysis.js", "knowledge.js", "yearbar.js",
                 "portal.js", "drill.css", "drill-hub.js", "drill-play.js"):
        digest.update((SRC / name).read_bytes())
    return digest.hexdigest()[:10]


def drill_version() -> str:
    """Version the question data independently from the page assets."""
    digest = hashlib.sha256()
    for path in sorted(READING.glob("*.json")) + sorted(YEARS.glob("*.json")):
        digest.update(path.read_bytes())
    return digest.hexdigest()[:10]


def as_text(value: object) -> str:
    if isinstance(value, (list, tuple)):
        return "\n".join(str(x).strip() for x in value if str(x).strip())
    return str(value or "").strip()


def esc(value: object) -> str:
    return html.escape(str(value), quote=True)


def load_year(year: int) -> dict:
    raw = json.loads((READING / f"{year}.json").read_text(encoding="utf-8"))
    extra_path = YEARS / f"{year}.json"
    if extra_path.exists():
        raw.update(json.loads(extra_path.read_text(encoding="utf-8")))
    raw.pop("_note", None)

    partb = raw.get("partb")
    if partb:
        if not partb.get("type"):
            if partb.get("paragraphs"):
                partb["type"] = "ordering"
            elif any("label" in b for b in partb.get("blocks", [])):
                partb["type"] = "matching"
            else:
                partb["type"] = "7选5"
        if not partb.get("fixed_note") and partb.get("extra_note"):
            partb["fixed_note"] = partb["extra_note"]

    full = all(k in raw for k in ("cloze", "reading", "partb", "partc", "writing"))
    raw.setdefault("meta", {})
    raw["meta"]["full"] = bool(full)
    raw["meta"]["year"] = year
    raw["meta"].setdefault("subject", "英语（一）")
    return raw


def practice_payload(raw: dict) -> dict:
    meta = raw.get("meta", {})
    payload = {
        "meta": {
            "year": meta.get("year"),
            "exam": meta.get("exam", ""),
            "subject": meta.get("subject", "英语（一）"),
            "duration": 180,
            "full": bool(meta.get("full")),
            "topics": meta.get("topics", []),
        },
        "cloze": None,
        "reading": [],
        "partb": None,
        "partc": None,
        "writing": None,
    }
    cloze = raw.get("cloze")
    if cloze:
        payload["cloze"] = {
            "title": cloze.get("title", "完形填空"),
            "directions": cloze.get("directions", ""),
            "score": cloze.get("score", 10),
            "passage": [{"en": p.get("en", "")} for p in cloze.get("passage", [])],
            "questions": [
                {"n": q["n"], "options": q.get("options", []), "type": q.get("type", "")}
                for q in cloze.get("questions", [])
            ],
        }
    for text in raw.get("reading", []):
        payload["reading"].append({
            "id": text.get("id"),
            "title": text.get("title", ""),
            "paragraphs": [{"en": p.get("en", "")} for p in text.get("paragraphs", [])],
            "questions": [
                {"n": q["n"], "stem": q.get("stem", ""), "options": q.get("options", []), "type": q.get("type", "")}
                for q in text.get("questions", [])
            ],
        })
    partb = raw.get("partb")
    if partb:
        payload["partb"] = {
            "type": partb.get("type", "7选5"),
            "title": partb.get("title", "新题型"),
            "directions": partb.get("directions", ""),
            "intro": partb.get("intro", ""),
            "blocks": [
                {k: b.get(k) for k in ("type", "label", "en") if b.get(k) is not None}
                for b in partb.get("blocks", [])
            ],
            "paragraphs": {
                k: {"en": v.get("en", "")} for k, v in (partb.get("paragraphs") or {}).items()
            },
            "options": {
                k: {"en": v.get("en", "")} for k, v in (partb.get("options") or {}).items()
            },
        }
    partc = raw.get("partc")
    if partc:
        payload["partc"] = {
            "title": partc.get("title", "翻译"),
            "directions": partc.get("directions", ""),
            "intro": partc.get("intro", ""),
            "paragraphs": [{"en": p.get("en", "")} for p in partc.get("paragraphs", [])],
            "segments": {
                str(n): {"en": s.get("en", "")}
                for n, s in (partc.get("segments") or {}).items()
            },
        }
    writing = raw.get("writing")
    if writing:
        def prompt_part(key: str) -> dict:
            part = writing.get(key, {})
            picture = part.get("picture") or {}
            pic = {k: picture.get(k) for k in ("src", "caption", "child", "father", "note") if picture.get(k)}
            return {
                "title": part.get("title", ""),
                "score": part.get("score", 0),
                "words": part.get("words", ""),
                "prompt": part.get("prompt", ""),
                "prompt_zh": part.get("prompt_zh", ""),
                "picture": pic,
            }
        payload["writing"] = {"partA": prompt_part("partA"), "partB": prompt_part("partB")}
    return payload


def analysis_payload(raw: dict) -> dict:
    raw = dict(raw)
    raw["meta"] = dict(raw.get("meta", {}))
    raw["meta"]["full"] = bool(raw["meta"].get("full"))
    return raw


def knowledge_payload(raw: dict) -> dict:
    """Answer-free data for the knowledge tab.

    Keep stems, vocabulary and sentence notes, but deliberately leave out every
    question answer / explanation / trap field so this view cannot reveal a key.
    """
    meta = raw.get("meta", {})
    cloze = raw.get("cloze")
    reading = raw.get("reading", [])
    partb = raw.get("partb")
    partc = raw.get("partc")
    writing = raw.get("writing")

    sections = []
    if cloze:
        sections.append({
            "id": "cloze", "label": "完形填空", "kind": "Use of English",
            "score": 10, "count": len(cloze.get("questions", [])),
            "focus": "逻辑关系 · 词义辨析 · 固定搭配",
        })
    if reading:
        count = sum(len(t.get("questions", [])) for t in reading)
        sections.append({
            "id": "reading", "label": "阅读理解", "kind": "Part A",
            "score": 40, "count": count,
            "focus": "定位 · 同义替换 · 段落功能 · 主旨态度",
        })
    if partb:
        sections.append({
            "id": "partb", "label": "新题型", "kind": "Part B",
            "score": 10, "count": len(partb.get("answers", [])),
            "focus": "衔接 · 指代 · 段落顺序 / 匹配",
        })
    if partc:
        sections.append({
            "id": "partc", "label": "翻译", "kind": "Part C",
            "score": 10, "count": len(partc.get("segments", {})),
            "focus": "长句拆分 · 语序 · 术语准确",
        })
    if writing:
        sections.append({
            "id": "writing", "label": "写作", "kind": "Part A + B",
            "score": 30, "count": 2,
            "focus": "任务覆盖 · 结构 · 句式 · 准确度",
        })

    writing_payload = None
    if writing:
        def writing_part(key: str) -> dict:
            part = writing.get(key, {}) or {}
            return {
                "title": part.get("title", ""),
                "score": part.get("score", 0),
                "words": part.get("words", ""),
                "prompt": part.get("prompt", ""),
                "prompt_zh": part.get("prompt_zh", ""),
                "structure": part.get("structure", []),
                "expressions": part.get("expressions", []),
                "traps": part.get("traps", []),
            }
        writing_payload = {"partA": writing_part("partA"), "partB": writing_part("partB")}

    return {
        "meta": {
            "year": meta.get("year"),
            "exam": meta.get("exam", ""),
            "subject": meta.get("subject", "英语（一）"),
            "topics": meta.get("topics", []),
            "overview": meta.get("overview", ""),
            "full": bool(meta.get("full")),
            "stats": meta.get("stats", {}),
        },
        "sections": sections,
        "cloze": ({"title": cloze.get("title", "完形填空"), "score": 10,
                   "count": len(cloze.get("questions", []))} if cloze else None),
        "reading": [
            {
                "id": t.get("id", ""),
                "title": t.get("title", ""),
                "questions": [{"n": q.get("n"), "stem": q.get("stem", "")}
                              for q in t.get("questions", [])],
            }
            for t in reading
        ],
        "partb": ({"type": partb.get("type", ""), "title": partb.get("title", "新题型"),
                   "cn_title": partb.get("cn_title", ""),
                   "directions": partb.get("directions", "")} if partb else None),
        "partc": ({"title": partc.get("title", "翻译"),
                   "cn_title": partc.get("cn_title", ""),
                   "directions": partc.get("directions", "")} if partc else None),
        "writing": writing_payload,
        "vocab": [
            {k: v.get(k) for k in ("w", "pos", "cn", "sec", "sec_label", "ctx", "note", "forms")
             if v.get(k) is not None}
            for v in raw.get("vocab", [])
        ],
        "sentences": [
            {k: s.get(k) for k in ("id", "sec", "sec_label", "level", "en", "core",
                                   "structure", "key", "zh", "tip")
             if s.get(k) is not None}
            for s in raw.get("sentences", [])
        ],
    }


def view_tabs(year: int, active: str) -> str:
    paths = {
        "paper": {
            "paper": f"{year}.html",
            "analysis": f"../analysis/{year}.html",
            "knowledge": f"../knowledge/{year}.html",
        },
        "analysis": {
            "paper": f"../practice/{year}.html",
            "analysis": f"{year}.html",
            "knowledge": f"../knowledge/{year}.html",
        },
        "knowledge": {
            "paper": f"../practice/{year}.html",
            "analysis": f"../analysis/{year}.html",
            "knowledge": f"{year}.html",
        },
    }[active]
    views = [
        ("paper", "真题", "PAPER"),
        ("analysis", "真题解析", "SOLUTIONS"),
        ("knowledge", "知识点分析", "KNOWLEDGE"),
    ]
    lock = {
        "paper": "交卷前不显示答案",
        "analysis": "答案只在本页展开",
        "knowledge": "本页不含正确选项",
    }[active]
    tabs = []
    for key, label, en in views:
        current = ' aria-current="page"' if key == active else ""
        cls = "view-tab is-active" if key == active else "view-tab"
        tabs.append(
            f'<a class="{cls}" href="{paths[key]}" data-view="{key}"{current}>'
            f'<b>{label}</b><small>{en}</small></a>'
        )
    tab_html = "".join(tabs)
    return f'''<nav class="view-tabs" aria-label="试卷视图">
  <div class="view-tabs-inner">
    <div class="view-tabs-links">{tab_html}</div>
    <div class="view-tabs-tools">
      <span class="paper-lock">{lock}</span>
      <button class="tab-tool" type="button" data-export-json>暂存 JSON</button>
      <button class="tab-tool" type="button" data-import-json>导入</button>
      <input id="yearJsonInput" type="file" accept="application/json,.json" hidden>
      <button class="tab-tool is-danger" type="button" data-clear-year>清空</button>
    </div>
  </div>
</nav>'''


def drill_year_payload(year: int, raw: dict) -> tuple[dict, dict, list[dict]]:
    """Build the answer-free bank, answer key and index rows for one year."""
    meta = raw.get("meta", {})
    topics = meta.get("topics", [])
    bank = {
        "year": year,
        "exam": meta.get("exam", ""),
        "topics": topics,
        "cloze": None,
        "reading": [],
        "partb": None,
    }
    answers: dict[str, dict] = {}
    rows: list[dict] = []

    cloze = raw.get("cloze")
    if cloze:
        bank["cloze"] = {
            "title": cloze.get("title", "完形填空"),
            "directions": cloze.get("directions", ""),
            "intro": cloze.get("intro", ""),
            "topic": cloze.get("topic", ""),
            "passage": [{"en": p.get("en", "")} for p in cloze.get("passage", [])],
            "questions": [
                {"n": q.get("n"), "options": q.get("options", []), "type": q.get("type", "")}
                for q in cloze.get("questions", [])
            ],
        }
        for q in cloze.get("questions", []):
            n = q.get("n")
            qid = f"{year}-cloze-{n}"
            modes = ["all", "cloze"]
            if n == 1:
                modes.append("first")
            answers[qid] = {
                "kind": "choice",
                "answer": q.get("answer", ""),
                "explain": as_text(q.get("explain")),
                "trap": as_text(q.get("trap")),
                "optionNotes": q.get("cn", []),
            }
            rows.append({
                "id": qid,
                "year": year,
                "section": "cloze",
                "sectionLabel": "完形填空",
                "n": n,
                "kind": "cloze",
                "topic": cloze.get("topic", "完形填空") or "完形填空",
                "type": q.get("type", ""),
                "label": f"{year} · 完形第 {n} 题",
                "analysisId": f"cloze-{n}",
                "modes": modes,
            })

    for i, text in enumerate(raw.get("reading", [])):
        tid = text.get("id") or f"text{i + 1}"
        section_label = f"Text {i + 1}"
        topic = topics[i] if i < len(topics) else (text.get("cn_title") or text.get("title") or section_label)
        bank["reading"].append({
            "id": tid,
            "title": text.get("title", section_label),
            "cn_title": text.get("cn_title", ""),
            "intro": text.get("intro", ""),
            "paragraphs": [{"en": p.get("en", "")} for p in text.get("paragraphs", [])],
            "questions": [
                {
                    "n": q.get("n"),
                    "stem": q.get("stem", ""),
                    "options": q.get("options", []),
                    "type": q.get("type", ""),
                }
                for q in text.get("questions", [])
            ],
        })
        first_n = (text.get("questions") or [{}])[0].get("n")
        for q in text.get("questions", []):
            n = q.get("n")
            qid = f"{year}-{tid}-{n}"
            modes = ["all", "reading"]
            if i == 0 and n == first_n:
                modes.append("readingFirst")
            answers[qid] = {
                "kind": "choice",
                "answer": q.get("answer", ""),
                "explain": as_text(q.get("explain")),
                "evidence": q.get("evidence", ""),
                "trap": as_text(q.get("trap")),
            }
            rows.append({
                "id": qid,
                "year": year,
                "section": tid,
                "sectionLabel": section_label,
                "n": n,
                "kind": "reading",
                "topic": topic,
                "type": q.get("type", ""),
                "label": f"{year} · {section_label} · 第 {n} 题",
                "analysisId": f"{tid}-{n}",
                "modes": modes,
            })

    partb = raw.get("partb")
    if partb:
        bank["partb"] = {
            "type": partb.get("type", "7选5"),
            "title": partb.get("title", "新题型"),
            "cn_title": partb.get("cn_title", ""),
            "directions": partb.get("directions", ""),
            "intro": partb.get("intro", ""),
            "blocks": [
                {k: b.get(k) for k in ("type", "label", "en") if b.get(k) is not None}
                for b in partb.get("blocks", [])
            ],
            "paragraphs": {
                k: {"en": v.get("en", "")} for k, v in (partb.get("paragraphs") or {}).items()
            },
            "options": {
                k: {"en": v.get("en", ""), "zh": v.get("zh", "")}
                for k, v in (partb.get("options") or {}).items()
            },
            "fixed_note": partb.get("fixed_note", ""),
        }
        topic = partb.get("cn_title") or partb.get("title") or "新题型"
        for a in partb.get("answers", []):
            n = a.get("n")
            qid = f"{year}-partb-{n}"
            answers[qid] = {
                "kind": "choice",
                "answer": a.get("answer", ""),
                "explain": as_text(a.get("explain")),
                "clue": a.get("clue", ""),
            }
            rows.append({
                "id": qid,
                "year": year,
                "section": "partb",
                "sectionLabel": "新题型",
                "n": n,
                "kind": "partb",
                "topic": topic,
                "type": partb.get("type", ""),
                "label": f"{year} · 新题型 · 第 {n} 题",
                "analysisId": f"partb-{n}",
                "modes": ["all", "partb"],
            })

    return bank, answers, rows


def build_drill(years_raw: list[tuple[int, dict]], version: str) -> dict:
    """Write the per-year banks/keys and the lightweight drill index."""
    (ASSETS_DRILL / "questions").mkdir(parents=True, exist_ok=True)
    (ASSETS_DRILL / "answers").mkdir(parents=True, exist_ok=True)
    rows: list[dict] = []
    for year, raw in years_raw:
        bank, answers, year_rows = drill_year_payload(year, raw)
        (ASSETS_DRILL / "questions" / f"{year}.json").write_text(
            json.dumps(bank, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        (ASSETS_DRILL / "answers" / f"{year}.json").write_text(
            json.dumps(answers, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        rows.extend(year_rows)

    modes = [
        ("all", "随机一题", "MIXED", "从全部客观题里抽一道，适合碎片时间。"),
        ("reading", "随机阅读", "READING", "抽一篇阅读原文，只做其中一道题。"),
        ("first", "各年首题", "FIRST", "随机年份的整卷第 1 题（完形第 1 题）。"),
        ("readingFirst", "各年阅读首题", "FIRST READING", "随机年份的 Text 1 第 21 题。"),
        ("partb", "随机新题型", "PART B", "7选5 / 排序 / 匹配随机一道。"),
        ("cloze", "随机完形", "CLOZE", "抽一篇完形，只做其中一个空。"),
    ]
    mode_payload = []
    for mode_id, label, tag, desc in modes:
        count = sum(1 for row in rows if mode_id in row["modes"])
        mode_payload.append({"id": mode_id, "label": label, "tag": tag, "desc": desc, "count": count})
    index = {
        "version": version,
        "modes": mode_payload,
        "counts": {m["id"]: m["count"] for m in mode_payload},
        "questions": rows,
    }
    (ASSETS_DRILL / "index.json").write_text(
        json.dumps(index, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return index


def build_drill_pages(version: str) -> None:
    asset = asset_version()
    for name, out in (("drill-hub.template.html", "index.html"),
                      ("drill-play.template.html", "play.html")):
        page = (SRC / name).read_text(encoding="utf-8")
        page = (page
                .replace("{{ASSET_VERSION}}", asset)
                .replace("{{DRILL_VERSION}}", version))
        (OUT_DRILL / out).write_text(page, encoding="utf-8")


def json_for_script(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")


def build_year(year: int, raw: dict) -> dict:
    practice = practice_payload(raw)
    analysis = analysis_payload(raw)
    knowledge = knowledge_payload(raw)
    meta = raw["meta"]
    title = meta.get("title") or f"{year} 英语（一）"
    desc = f"{year} 考研英语（一）真题、解析与知识点分析：在线作答、暂存 JSON、交卷阅卷、错题定位、全卷解析和重难点词汇。"
    version = asset_version()
    practice_page = (SRC / "practice.template.html").read_text(encoding="utf-8")
    practice_page = (practice_page
                     .replace("{{YEAR}}", str(year))
                     .replace("{{TITLE}}", esc(title))
                     .replace("{{DESC}}", esc(desc))
                     .replace("{{ASSET_VERSION}}", version)
                     .replace("{{VIEW_TABS}}", view_tabs(year, "paper"))
                     .replace("{{DATA}}", json_for_script(practice)))
    (OUT_PRACTICE / f"{year}.html").write_text(practice_page, encoding="utf-8")

    analysis_page = (SRC / "analysis.template.html").read_text(encoding="utf-8")
    analysis_page = (analysis_page
                     .replace("{{YEAR}}", str(year))
                     .replace("{{TITLE}}", esc(title))
                     .replace("{{DESC}}", esc(desc))
                     .replace("{{ASSET_VERSION}}", version)
                     .replace("{{VIEW_TABS}}", view_tabs(year, "analysis"))
                     .replace("{{DATA}}", json_for_script(analysis)))
    (OUT_ANALYSIS / f"{year}.html").write_text(analysis_page, encoding="utf-8")

    knowledge_page = (SRC / "knowledge.template.html").read_text(encoding="utf-8")
    knowledge_page = (knowledge_page
                      .replace("{{YEAR}}", str(year))
                      .replace("{{TITLE}}", esc(title))
                      .replace("{{DESC}}", esc(desc))
                      .replace("{{ASSET_VERSION}}", version)
                      .replace("{{VIEW_TABS}}", view_tabs(year, "knowledge"))
                      .replace("{{DATA}}", json_for_script(knowledge)))
    (OUT_KNOWLEDGE / f"{year}.html").write_text(knowledge_page, encoding="utf-8")

    objective_count = 0
    if raw.get("cloze"):
        objective_count += len(raw["cloze"].get("questions", []))
    objective_count += sum(len(t.get("questions", [])) for t in raw.get("reading", []))
    if raw.get("partb"):
        objective_count += len(raw["partb"].get("answers", []))
    return {
        "year": year,
        "title": title,
        "topics": meta.get("topics", []),
        "full": bool(meta.get("full")),
        "objectiveCount": objective_count,
        "vocabCount": len(raw.get("vocab", [])),
        "sentenceCount": len(raw.get("sentences", [])),
        "readingCount": len(raw.get("reading", [])),
    }


def main() -> None:
    OUT_PRACTICE.mkdir(parents=True, exist_ok=True)
    OUT_ANALYSIS.mkdir(parents=True, exist_ok=True)
    OUT_KNOWLEDGE.mkdir(parents=True, exist_ok=True)
    OUT_DRILL.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)
    ASSETS_DRILL.mkdir(parents=True, exist_ok=True)
    for name in ("exam.css", "practice.js", "analysis.js", "knowledge.js", "yearbar.js", "portal.js"):
        shutil.copyfile(SRC / name, ASSETS / name)
    for name in ("drill.css", "drill-hub.js", "drill-play.js"):
        shutil.copyfile(SRC / name, ASSETS_DRILL / name)

    years = []
    drill_raw = []
    for year in range(2010, 2027):
        raw = load_year(year)
        years.append(build_year(year, raw))
        drill_raw.append((year, raw))
        print(year, "practice + analysis + knowledge")

    drill_ver = drill_version()
    drill_index = build_drill(drill_raw, drill_ver)
    build_drill_pages(drill_ver)
    print("drill", len(drill_index["questions"]), "questions",
          {m["id"]: m["count"] for m in drill_index["modes"]})

    portal_data = [
        {
            "year": y["year"],
            "title": y["title"],
            "topics": y["topics"],
            "full": y["full"],
            "objectiveCount": y["objectiveCount"],
            "vocabCount": y["vocabCount"],
            "sentenceCount": y["sentenceCount"],
            "readingCount": y["readingCount"],
        }
        for y in years
    ]
    portal = (SRC / "portal.template.html").read_text(encoding="utf-8")
    portal = (portal
              .replace("{{COUNT}}", str(len(years)))
              .replace("{{ASSET_VERSION}}", asset_version())
              .replace("{{YEARS_DATA}}", json_for_script(portal_data)))
    (ROOT / "index.html").write_text(portal, encoding="utf-8")
    print("portal", len(portal) // 1024, "KB", "years", len(years))


if __name__ == "__main__":
    main()
