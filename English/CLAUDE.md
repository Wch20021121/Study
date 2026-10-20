# CLAUDE.md

## 项目概述

本项目用于生成考研英语一阅读理解文章，包含文章、题目（含完整解析）和重难点单词。项目也包含英语学习相关的辅助技能。

## 快速开始

1. **构建**：`python3 temp/build.py`（从仓库根目录运行）
2. **JSON 路径**：`READ/data/april/4-XX.json` 或 `READ/data/may/5-X.json`
3. **构建产物**：`READ/data/article.js` 和 `READ/data/words.js`

## 文章格式要求

每篇 JSON 必须包含：
- `date`, `month`, `day`, `title`, `text`（3-5段，用 `\n\n` 分隔）
- `questions`：5道题，每题有 `answer` 和完整 `explanation`（A/B/C/D 全要有）
- `words`：重难点单词，**格式为对象数组** `{"word": "xxx", "def": "翻译"}`

**words 格式示例**：
```json
"words": [
  {"word": "proliferation", "def": "激增，扩散"},
  {"word": "misinformation", "def": "错误信息"}
]
```

## 重要构建规则

- **翻译由 AI 在 JSON 中提供**：每个单词必须自带准确翻译，build.py 只负责合并
- **验证问题**：若构建输出"⚠️ 发现以下问题"，必须修复后再完成
- **单词翻译核验**：生成文章后必须检查 words 数组中每个单词的翻译是否准确

## 工作流

新增文章流程：
1. 在对应月份目录创建 `X-X.json`
2. 运行 `python3 temp/build.py`
3. 确认构建输出"✅ 构建完成，所有验证通过"

## 可用技能

本项目包含以下 Claude Code 技能：

- **daily-reading**：生成考研英语一阅读理解文章（检索文章 → 生成题目 → 答案复检 → 保存 JSON → 构建）
- **scientific-writing**：科学论文写作辅助（IMRAD 结构、引用格式、图表设计、报告规范）
- **tavily-research**：通过 Tavily CLI 进行深度 AI 研究

使用 `/daily-reading`、`/scientific-writing`、`/tavily-research` 调用对应技能。
