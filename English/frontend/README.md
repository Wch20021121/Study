# 2010—2026 英语（一）真题档案

每套卷子现在是一个年度工作区，顶部固定三个视图：

| 视图 | 路径 | 用途 |
| --- | --- | --- |
| 真题 | `practice/<year>.html` | 默认入口。只有题目和选项，选择只记录、不显示对错；自动保存、计时、答题卡 |
| 真题解析 | `analysis/<year>.html` | 客观题自动阅卷、错题定位、全卷解析、翻译/写作参考、全卷词汇和长难句 |
| 知识点分析 | `knowledge/<year>.html` | 命题结构、阅读题干信号、词汇分布、长难句难度、写作可迁移表达、作答进度；不展示正确选项 |

三个视图共用同一份本机作答记录。顶部工具可以：

- **暂存 JSON**：把作答、计时、交卷记录、自评和词汇掌握标记导出为 JSON；
- **导入**：恢复同一年的 JSON 暂存；
- **清空**：确认后清空本卷作答、计时、交卷记录和主观题自评，回到“真题”；词汇掌握标记保留。

总入口是 `index.html`，支持筛选“未交卷 / 已交卷”。

## 现在有什么

- `index.html`：17 套卷子的真题 / 解析 / 知识点入口。
- `practice/2010.html`—`practice/2026.html`：真题视图。
- `analysis/2010.html`—`analysis/2026.html`：真题解析视图。
- `knowledge/2010.html`—`knowledge/2026.html`：知识点分析视图。
- `2021.html`：2021 旧版全卷长文，保留作为方法库（阅读方法、7 日计划等）。
- `years/2010.html`—`years/2026.html`：旧版逐年长页，保留作为旧版阅读入口。

## 怎么用

1. 打开 `index.html`，选一套年份，默认进入“真题”。
2. 限时完成；选择题点击选项，翻译和作文直接输入，进度自动保存在本机。选项只标记“已选”，不显示正确答案。
3. 点“交卷”跳到“真题解析”：客观题自动阅卷，列出错题；主观题对照参考译文/范文自评。
4. 切到“知识点分析”，按命题结构、题干信号、词汇分布、长难句和写作表达复习。
5. 需要备份或换设备时，在顶部点“暂存 JSON”；下次用“导入”恢复。点“清空”则清空本卷全部作答。

> 客观题：完形 20 × 0.5 + 阅读 20 × 2 + 新题型 5 × 2 = 60 分。
> 主观题：翻译 10 分 + 写作 30 分，由你自己对照参考答案打分。

## 重新生成

三个视图和总入口：

```bash
python3 English/frontend/src/exam/build_exam.py
```

会生成：

- `practice/*.html`
- `analysis/*.html`
- `knowledge/*.html`
- `index.html`
- `assets/exam/exam.css`、`practice.js`、`analysis.js`、`knowledge.js`、`yearbar.js`、`portal.js`

旧版长页（可选，只有需要改旧版阅读时才运行）：

```bash
python3 English/frontend/src/parse_reading.py
python3 English/frontend/src/build_archive.py
```

`build_archive.py` 现在只写 `years/*.html` 和 `index.legacy.html`，不会覆盖新版 `index.html`。

2021 旧版全卷页仍由 `build.py` 生成：

```bash
python3 English/frontend/build.py
```

## 本地预览

因为页面使用相对路径和 localStorage，建议用 HTTP 服务预览：

```bash
python3 -m http.server 5005 --bind 127.0.0.1 --directory English/frontend
```

打开：

```text
http://127.0.0.1:5005/index.html
```

## 数据

- 阅读、长难句、词汇：`English/exam-data/reading/<year>.json`
- 完形、新题型、翻译、写作：`English/exam-data/years/<year>.json`
- 2021 的全卷部分从旧版 `2021.html` 提取到 `English/exam-data/years/2021.json`。

题目原文与参考译文据公开学习资料整理；答案按页面选项顺序标注。仅用于个人学习。
