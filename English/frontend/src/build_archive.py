# -*- coding: utf-8 -*-
"""Legacy builder for the long-form years/*.html reader pages.

The canonical index + practice/analysis pages now live in
``src/exam/build_exam.py``.  This script is kept for regenerating the old
reader pages only; it writes ``index.legacy.html`` instead of clobbering the
new portal at ``index.html``.
"""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent      # English/frontend
DATA = ROOT.parent / "exam-data" / "reading"
OUT = ROOT / "years"
ASSETS = ROOT / "assets"
SRC = ROOT / "src"


def esc(s: str) -> str:
    return (str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            .replace('"', "&quot;"))


def short(s: str, n: int = 22) -> str:
    s = s.strip()
    return s if len(s) <= n else s[:n - 1] + "…"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)

    # shared assets
    base_css = (SRC / "styles.css").read_text(encoding="utf-8")
    extra_css = (SRC / "reader-extra.css").read_text(encoding="utf-8")
    (ASSETS / "reader.css").write_text(base_css + "\n" + extra_css, encoding="utf-8")
    shutil.copyfile(SRC / "reader.js", ASSETS / "reader.js")
    shutil.copyfile(SRC / "portal.css", ASSETS / "portal.css")

    template = (SRC / "reader.template.html").read_text(encoding="utf-8")
    years = []
    for year in range(2010, 2027):
        path = DATA / f"{year}.json"
        if not path.exists():
            print("missing", path)
            continue
        raw = json.loads(path.read_text(encoding="utf-8"))
        extra_path = ROOT.parent / "exam-data" / "years" / f"{year}.json"
        if extra_path.exists():
            extra = json.loads(extra_path.read_text(encoding="utf-8"))
            raw.update(extra)
            raw["meta"]["full"] = True
        meta = raw["meta"]
        full = bool(meta.get("full"))
        mode = "全卷精讲" if full else "阅读精讲"
        meta["title"] = f"{year} 英语（一）{mode}"
        reading = raw["reading"]
        sentences = raw["sentences"]
        vocab = raw["vocab"]
        if len(reading) != 4:
            raise SystemExit(f"{year}: expected 4 texts, got {len(reading)}")
        for t in reading:
            if len(t["questions"]) != 5:
                raise SystemExit(f"{year} {t['id']}: expected 5 questions")
        years.append((year, raw))

        # section numbering / nav
        next_no = 1
        cloze_no = None
        if "cloze" in raw:
            cloze_no = next_no
            next_no += 1
        reading_start = next_no
        next_no += 4
        partb_no = partc_no = writing_no = None
        if "partb" in raw:
            partb_no = next_no; next_no += 1
        if "partc" in raw:
            partc_no = next_no; next_no += 1
        if "writing" in raw:
            writing_no = next_no; next_no += 1
        sent_no = next_no
        vocab_no = next_no + 1

        nav_items = []
        if cloze_no:
            nav_items.append('<a href="#cloze" class="jump-year">完形</a>')
        for i, t in enumerate(reading):
            nav_items.append(f'<a href="#{t["id"]}" class="{"jump-year" if i == 0 and not cloze_no else ""}">{t["title"]}</a>')
        if partb_no:
            nav_items.append('<a href="#partb">新题型</a>')
        if partc_no:
            nav_items.append('<a href="#partc">翻译</a>')
        if writing_no:
            nav_items.append('<a href="#writing">写作</a>')
        nav_items += ['<a href="#sentences">长难句</a>', '<a href="#vocab">核心词</a>']
        nav = "".join(nav_items)

        data_json = json.dumps(raw, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
        if year == 2021:
            redirect = """<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta http-equiv="refresh" content="0;url=../2021.html">
<link rel="canonical" href="../2021.html">
<title>2021 英语（一）全卷精讲</title>
<style>body{background:#0d1712;color:#efe4c8;font-family:system-ui,sans-serif;padding:12vh 8vw;line-height:1.8}a{color:#d3b45e}</style>
</head><body><p>2021 年全卷精讲在独立页面。</p><p><a href="../2021.html">前往 2021 全卷精讲 →</a></p></body></html>"""
            (OUT / "2021.html").write_text(redirect, encoding="utf-8")
            print("2021 page redirect")
            continue

        page = template
        page = page.replace("{{YEAR}}", str(year))
        page = page.replace("{{TITLE}}", esc(meta["title"]))
        page = page.replace("{{MODE}}", mode)
        scope = ("<b>本页范围：</b>完形、阅读、新题型、翻译、写作 + 长难句 + 核心词汇。" if full
                 else "<b>本页范围：</b>四篇阅读的原文、逐句翻译、20 题解析、长难句和词汇。完形、新题型、翻译、写作正在按年份补齐；2021 年已有全卷精讲版。")
        page = page.replace("{{SCOPE}}", scope)
        ov = esc(meta["overview"])
        ov = re.sub(r"(?m)^-\s*主题：", "<b>主题</b>　", ov)
        ov = re.sub(r"(?m)^-\s*行文逻辑：", "<b>行文逻辑</b>　", ov)
        ov = ov.replace("\n", "<br>")
        page = page.replace("{{OVERVIEW}}", ov)
        page = page.replace("{{N_SENT}}", str(len(sentences)))
        page = page.replace("{{N_VOCAB}}", str(len(vocab)))
        page = page.replace("{{N_Q}}", str(40 if "cloze" in raw else 20))
        page = page.replace("{{SENT_NO}}", f"{sent_no:02d}")
        page = page.replace("{{VOCAB_NO}}", f"{vocab_no:02d}")
        page = page.replace("{{NAV}}", nav)
        page = page.replace("{{DATA}}", data_json)
        (OUT / f"{year}.html").write_text(page, encoding="utf-8")
        print(year, "page", len(page) // 1024, "KB")

    # portal cards (chronological)
    cards = []
    for year, raw in years:
        meta = raw["meta"]
        topics = meta.get("topics") or []
        topic_text = " · ".join(short(x, 15) for x in topics[:4])
        s = meta.get("stats", {})
        featured = year == 2021
        full = bool(meta.get("full"))
        href = "2021.html" if featured else f"years/{year}.html"
        status = "全卷精讲" if (featured or full) else "阅读精讲"
        meta_line = (f"4 篇阅读 · 20 题<br>{s.get('sentences', 0)} 句长难句 · {s.get('vocab', 0)} 词"
                     if not (featured or full) else
                     "完形 20 空 · 阅读 4 篇 · 新题型 5 空<br>翻译 5 句 · 写作 51/52")
        cards.append(f'''<a class="year-card {'featured' if featured else ''}" href="{href}">
          <span class="yc-year">{year}</span>
          <span class="yc-status">{status}</span>
          <span class="yc-topics">{esc(topic_text)}</span>
          <span class="yc-meta">{meta_line}</span>
          <span class="yc-cta">进入 {'全卷' if (featured or full) else '阅读精讲'} →</span>
        </a>''')

    portal = (SRC / "portal.template.html").read_text(encoding="utf-8")
    portal = portal.replace("{{CARDS}}", "\n".join(cards))
    full_count = 1 + sum(1 for _, raw in years if raw.get("meta", {}).get("full") and _ != 2021)
    portal = portal.replace("{{FULL_COUNT}}", str(full_count))
    (ROOT / "index.legacy.html").write_text(portal, encoding="utf-8")
    print("legacy portal", len(portal) // 1024, "KB", "years", len(years))


if __name__ == "__main__":
    main()
