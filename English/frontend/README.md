# 2010—2026 英语（一）真题档案

每套卷子现在有两个页面：

| 页面 | 路径 | 用途 |
| --- | --- | --- |
| 做题 | `practice/<year>.html` | 只有题目和选项，自动保存、计时、答题卡；交卷后跳到解析页 |
| 解析 | `analysis/<year>.html` | 客观题自动阅卷、错题定位、全卷解析、翻译/写作参考、全卷词汇和长难句 |

总入口是 `index.html`，支持筛选“未交卷 / 已交卷”。

## 现在有什么

- `index.html`：17 套卷子的做题 / 解析双入口。
- `practice/2010.html`—`practice/2026.html`：做题页。
- `analysis/2010.html`—`analysis/2026.html`：解析页。
- `2021.html`：2021 旧版全卷长文，保留作为方法库（阅读方法、7 日计划等）。
- `years/2010.html`—`years/2026.html`：旧版逐年长页，保留作为旧版阅读入口。

## 怎么用

1. 打开 `index.html`，选一套年份。
2. 进入做题页，限时完成；选择题点击选项，翻译和作文直接输入，进度自动保存在本机。
3. 点“交卷”，系统跳到解析页：客观题自动阅卷，列出错题；主观题对照参考译文/范文自评。
4. 解析页底部有这一年的全部重难点词汇和长难句，可搜索、筛选、标记已掌握。

> 客观题：完形 20 × 0.5 + 阅读 20 × 2 + 新题型 5 × 2 = 60 分。
> 主观题：翻译 10 分 + 写作 30 分，由你自己对照参考答案打分。

## 重新生成

新版做题 / 解析页：

```bash
python3 English/frontend/src/exam/build_exam.py
```

会生成：

- `practice/*.html`
- `analysis/*.html`
- `index.html`
- `assets/exam/exam.css`、`practice.js`、`analysis.js`、`portal.js`

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
