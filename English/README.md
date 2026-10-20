# 考研英语一 · 每日阅读

## 项目说明

考研英语一阅读理解每日一题，包含文章阅读、选择题作答、重难点单词复习。直接双击 HTML 文件即可在浏览器中使用，无需安装任何依赖。

## 目录结构

```
Study/English/
├── README.md                    # 项目说明
├── READ/                        # 阅读模块（核心）
│   ├── index.html               # 📖 每日阅读页面（双击打开）
│   ├── words.html               # 📝 词汇表页面（双击打开）
│   └── data/                    # 📦 数据目录
│       ├── april/               # 📅 文章数据源（每篇一个 JSON）
│       │   ├── 4-11.json
│       │   ├── 4-12.json
│       │   └── ...
│       ├── article.js           # 构建产物（自动生成）
│       └── words.js             # 构建产物（自动生成）
└── temp/                        # 🛠 辅助脚本
    └── build.py                 # 一键构建脚本
```

## 数据格式

每篇文章一个 JSON 文件（`data/april/4-XX.json`）：

```json
{
  "date": "4/11",
  "month": 4,
  "day": 11,
  "title": "Article from 4/11",
  "text": "文章正文，段落之间用 \\n\\n 分隔",
  "questions": [
    {
      "num": 1,
      "type": "综合题",
      "stem": "题干",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "answer": "正确答案字母",
      "explanation": {"A": "解析A", "B": "解析B", "C": "解析C", "D": "解析D"}
    }
  ],
  "words": ["难点词1", "难点词2", ...]
}
```

## 如何使用

### 打开页面

直接双击 `READ/index.html` 或 `READ/words.html` 即可在浏览器中打开。

### 添加新文章

1. 使用 `/reading` 命令让 AI 检索期刊文章并生成题目
2. 运行构建脚本：`python3 temp/build.py`
3. 刷新浏览器即可看到最新内容

### 构建脚本

```bash
python3 temp/build.py
```

功能：
- 读取 `data/april/` 下所有 `*.json` 文件
- 合并生成 `data/article.js`（供 index.html 使用）
- 统计所有单词频次，生成 `data/words.js`（供 words.html 使用）

## 功能特性

- 📅 日期选择器，快速切换不同日期的文章
- 📖 文章正文展示，重难点单词高亮（点击跳转到词汇表）
- ✅ 选择题作答，提交后显示得分和解析
- 📝 词汇表页面，支持搜索和筛选
- 📊 单词按出现频次排序，含词性和中文释义

## 数据架构说明

| 层级 | 文件 | 职责 |
|------|------|------|
| **展示层** | `index.html`, `words.html` | 纯前端渲染，通过 `<script src>` 引用数据 |
| **数据源** | `data/april/*.json` | 每篇文章独立存储，方便新增和维护 |
| **构建产物** | `data/article.js`, `data/words.js` | 脚本自动生成，供 HTML 页面引用 |

工作流：`JSON 数据源 → build.py → JS 构建产物 → HTML 页面`
