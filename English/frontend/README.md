# 2010—2026 英语（一）真题档案

打开 `index.html` 进入总目录；17 套全卷精讲已全部接入，2021 在 `2021.html`，其余年份在 `years/`。

## 现在有什么

- `index.html`：2010—2026 共 17 套的总目录。
- `2021.html`：2021 英语（一）全卷精讲（完形、阅读、新题型、翻译、写作 + 长难句 + 词汇 + 方法 + 7 日计划）。
- `years/2010.html`—`years/2026.html`：其余 16 套全卷精讲，每套含完形、阅读、新题型、翻译、写作、长难句和核心词汇。

## 怎么用

1. 先打开 `index.html`，选一套年份。
2. 全卷页里先做题，再点选项看解析、展开译文；新题型答案在“做完再看”折叠区。
3. 长难句先遮住解析自己说主干；词汇用闪卡标记“已掌握”。
4. 2021 全卷页里有完整的阅读方法、7 日计划和写作范文，可先当方法库使用。

## 重新生成

```bash
python3 English/frontend/src/parse_reading.py
python3 English/frontend/src/build_archive.py
```

- `parse_reading.py` 从 `src` 的阅读精翻资料生成 `English/exam-data/reading/<year>.json`。
- `build_archive.py` 生成 `index.html`、`years/*.html` 和共享 `assets/`。

2021 全卷页仍由 `build.py` 生成：

```bash
python3 English/frontend/build.py
```

## 状态

| 范围 | 状态 |
| --- | --- |
| 2010—2026 总目录 | 已完成 |
| 2010—2026 阅读精讲 | 已完成 17/17 |
| 2021、2010—2020、2022—2026 全卷精讲 | 已完成 17/17 |
| 全部 | 已完成 |

阅读原文与逐句翻译据公开学习资料整理；答案按页面选项顺序标注。仅用于个人学习。
