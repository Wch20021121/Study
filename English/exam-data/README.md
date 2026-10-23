# 真题结构化数据

## reading/

`reading/2010.json`—`reading/2026.json` 是逐年阅读精讲数据，由 `English/frontend/src/parse_reading.py` 从公开的《考研英语一阅读精翻》笔记整理：

- 来源：<https://github.com/Destinnnnn/kaoyan-english-1-2005-2026>
- 内容：四篇阅读的原文、逐句翻译、20 题答案与选项辨析、长难句拆解、词汇笔记。
- 生成：`python3 English/frontend/src/parse_reading.py`

原始笔记为个人学习整理，可能存在个别笔误；本仓库已在解析时清理 Markdown 标记、合并段落并校验题号/选项完整性。答案按页面选项顺序标注，使用前请以正式试卷为准。

## 后续

完形、新题型、翻译、写作的全卷数据将按年份补充到 `English/exam-data/years/<year>.json`。
