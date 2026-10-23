# -*- coding: utf-8 -*-
"""2021 考研英语一 · 结构化试卷数据。"""

from .cloze import CLOZE
from .reading import READING
from .partb import PARTB
from .partc import PARTC
from .writing import WRITING

META = {
    "exam": "2021 年全国硕士研究生招生考试",
    "subject": "英语（一）",
    "short": "2021 英语一",
    "date": "2020 年 12 月 26 日",
    "duration": "180 分钟",
    "score": 100,
    "parta_directions": (
        "Read the following four texts. Answer the questions below each text by choosing A, B, C or D. "
        "Mark your answers on the ANSWER SHEET. (40 points)"
    ),
    "sections": [
        {"id": "cloze", "label": "完形填空", "score": 10, "range": "1–20", "time": "15–18 分钟"},
        {"id": "text1", "label": "阅读 Text 1", "score": 10, "range": "21–25", "time": "16–18 分钟"},
        {"id": "text2", "label": "阅读 Text 2", "score": 10, "range": "26–30", "time": "16–18 分钟"},
        {"id": "text3", "label": "阅读 Text 3", "score": 10, "range": "31–35", "time": "16–18 分钟"},
        {"id": "text4", "label": "阅读 Text 4", "score": 10, "range": "36–40", "time": "16–18 分钟"},
        {"id": "partb", "label": "新题型 7 选 5", "score": 10, "range": "41–45", "time": "15–18 分钟"},
        {"id": "partc", "label": "翻译", "score": 10, "range": "46–50", "time": "18–20 分钟"},
        {"id": "writing", "label": "写作", "score": 30, "range": "51–52", "time": "50–55 分钟"},
    ],
}

EXAM = {
    "meta": META,
    "cloze": CLOZE,
    "reading": READING,
    "partb": PARTB,
    "partc": PARTC,
    "writing": WRITING,
}
