# 考研英语一 · 每日阅读

## 项目说明

考研英语一阅读理解每日一题，包含文章阅读、选择题作答、重难点单词复习。直接双击 HTML 文件即可在浏览器中使用，无需安装任何依赖。

## 真题做题 / 解析双页版

`frontend/` 现在以“每套卷子两个页面”为主入口：

| 页面 | 路径 | 用途 |
| --- | --- | --- |
| 做题 | `frontend/practice/<year>.html` | 无答案卷面、自动保存、计时、答题卡 |
| 解析 | `frontend/analysis/<year>.html` | 自动阅卷、错题定位、全卷解析、词汇和长难句 |

总入口：`frontend/index.html`。这里同时保留 `frontend/2021.html` 和 `frontend/years/*.html` 作为旧版长文/方法库。

重新生成做题、解析和总目录：

```bash
python3 English/frontend/src/exam/build_exam.py
```

设计说明、数据来源和旧版入口见 [frontend/README.md](frontend/README.md)；分支/worktree 规则见根目录 [BRANCHING.md](../BRANCHING.md)。

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

## 真题与拆解（新增）

- `真题/2021英语一/`：2021 英语（一）完整原文、答案与解析、62 句长难句、189 个核心词、全文翻译、阅读方法与 7 日计划。
- `frontend/index.html`：2010—2026 真题总目录；`frontend/2021.html` 是 2021 全卷精讲样板，`frontend/years/2010.html`—`years/2026.html` 与 `frontend/2021.html` 覆盖全部 17 套全卷精讲。
- `frontend/years/`：逐年全卷精讲页，支持译文切换、点选项对答案、长难句拆解、词汇闪卡和进度记录；2021 在 `frontend/2021.html`。
- 重新生成 2021 全卷页：`python3 English/frontend/build.py`；重新生成总目录与逐年全卷页：`python3 English/frontend/src/build_archive.py`。

## 部署到 Linux / 5000 端口

> 分支开发、worktree、只启动英语：见 [DEV.md](DEV.md) 和 [../BRANCHING.md](../BRANCHING.md)。
>
> 如果使用仓库根目录的统一编排 `compose.yaml`，英语站映射到宿主机 **5001**、408 站映射到 **40810**，请优先看根目录的 [`README-408-DEPLOY.md`](../README-408-DEPLOY.md)。本章下面的 5000 是英语单站单独部署的默认值。

### 快速预览：run_english.sh

```bash
# 仓库根目录
chmod +x run_english.sh English/run_english.sh
./run_english.sh start        # 0.0.0.0:5000
./run_english.sh status
./run_english.sh logs
./run_english.sh stop
```

也可以直接运行 `English/run_english.sh`。公网访问前，在阿里云安全组入方向放行 TCP 5000。

### Docker + Nginx（推荐长期运行）

```bash
cd English
docker compose up -d --build
docker compose ps
curl -I http://127.0.0.1:5000/
```

完整方案、阿里云安装步骤、安全组、更新回滚、HTTPS 和 Docker 学习路线见 [DOCKER.md](DOCKER.md)。

关键文件：

- [DEV.md](DEV.md)：英语分支开发、worktree、只启动英语
- [dev.sh](dev.sh)：只启动 `english` 的模块脚本
- [run_english.sh](run_english.sh)：Linux 静态服务脚本（`start|stop|restart|status|logs|fg`）
- [Dockerfile](Dockerfile)：`nginx:1.27-alpine` + 静态站点
- [compose.yaml](compose.yaml)：英语单站可选编排；宿主机 `5000` → 容器 `80`，不固定容器名
- [deploy/nginx.conf](deploy/nginx.conf)：Nginx 站点配置
- [.dockerignore](.dockerignore)：只把 `frontend/` 打进镜像
