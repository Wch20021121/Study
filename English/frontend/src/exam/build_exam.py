# -*- coding: utf-8 -*-
"""Build the two-page-per-year English exam experience.

For each year:
  practice/YYYY.html  -- paper only, no answers, autosave, submit -> analysis
  analysis/YYYY.html  -- full solutions, wrong-answer report, all vocab/sentences

The old years/*.html reader pages are intentionally left in place as a legacy
long-form edition.  This builder owns index.html and the new assets/exam files.
"""
from __future__ import annotations

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
ASSETS = ROOT / "assets" / "exam"


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


def json_for_script(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")


def build_year(year: int, raw: dict) -> dict:
    practice = practice_payload(raw)
    analysis = analysis_payload(raw)
    meta = raw["meta"]
    title = meta.get("title") or f"{year} 英语（一）"
    desc = f"{year} 考研英语（一）做题与解析：在线作答、交卷阅卷、错题定位、全卷解析和重难点词汇。"
    practice_page = (SRC / "practice.template.html").read_text(encoding="utf-8")
    practice_page = (practice_page
                     .replace("{{YEAR}}", str(year))
                     .replace("{{TITLE}}", esc(title))
                     .replace("{{DESC}}", esc(desc))
                     .replace("{{DATA}}", json_for_script(practice)))
    (OUT_PRACTICE / f"{year}.html").write_text(practice_page, encoding="utf-8")

    analysis_page = (SRC / "analysis.template.html").read_text(encoding="utf-8")
    analysis_page = (analysis_page
                     .replace("{{YEAR}}", str(year))
                     .replace("{{TITLE}}", esc(title))
                     .replace("{{DESC}}", esc(desc))
                     .replace("{{DATA}}", json_for_script(analysis)))
    (OUT_ANALYSIS / f"{year}.html").write_text(analysis_page, encoding="utf-8")

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
    ASSETS.mkdir(parents=True, exist_ok=True)
    for name in ("exam.css", "practice.js", "analysis.js", "portal.js"):
        shutil.copyfile(SRC / name, ASSETS / name)

    years = []
    for year in range(2010, 2027):
        raw = load_year(year)
        years.append(build_year(year, raw))
        print(year, "practice + analysis")

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
              .replace("{{YEARS_DATA}}", json_for_script(portal_data)))
    (ROOT / "index.html").write_text(portal, encoding="utf-8")
    print("portal", len(portal) // 1024, "KB", "years", len(years))


if __name__ == "__main__":
    main()
