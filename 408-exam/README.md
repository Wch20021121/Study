# 408 大题工位 · 模块开发说明

本目录只由 `408` 分支维护。英语内容在 `English/`，由 `english` 分支维护；两边不要互相改目录。

---

## 1. 只启动 408

在仓库根目录执行：

```bash
./408-exam/dev.sh
```

或者直接指定 Compose 项目名和服务名：

```bash
COMPOSE_PROJECT_NAME=study-408 docker compose up -d --build exam408
```

访问：

```text
http://127.0.0.1:40810/
```

常用命令：

```bash
./408-exam/dev.sh logs
./408-exam/dev.sh status
./408-exam/dev.sh restart
./408-exam/dev.sh down
```

这个脚本只处理 `exam408`，不会构建或启动英语容器。

---

## 2. 用 worktree 并行开发

在仓库根目录：

```bash
git worktree add ../Study-408 408
cd ../Study-408
```

之后就在 `Study-408/` 里开发，不再和 `main`、`english` 抢同一个工作目录。

默认项目名是 `study-408`，容器名由 Compose 自动生成，例如：

```text
study-408-exam408-1
```

所以它可以和英语 worktree 的 `study-english-english-1` 同时存在。

---

## 3. 目录边界

只改：

```text
408-exam/
├── Dockerfile
├── dev.sh
├── deploy/nginx.conf
└── site/
```

不要改：

- `English/**`：这是 `english` 分支的地盘；
- 根目录 `compose.yaml`、`deploy.sh`、`.env.example`、`README.md`、`BRANCHING.md`：这些是 `main` 的共享设施。

如果 408 确实需要改端口/服务定义：

1. 先在 `main` 做共享设施改动；
2. 在 408 分支执行 `git merge main`；
3. 再继续开发。

---

## 4. 提交与合并

开始开发前：

```bash
git switch 408
git merge main
```

提交：

```bash
git add 408-exam
git commit -m "feat(408): ..."
```

合并到 `main`：

```bash
git switch main
git merge --no-ff 408
```

完整分支规则见 [../BRANCHING.md](../BRANCHING.md)。

---

## 5. 页面结构

| 文件 | 内容 |
| --- | --- |
| `site/index.html` | 408 总览 |
| `site/coa.html` | 计算机组成原理 4 道大题 |
| `site/network.html` | 计算机网络 4 道大题 |
| `site/os.html` | 计算机系统/操作系统 4 道大题 |
| `site/map.html` | 知识线路图 |
| `site/assets/` | CSS、JS、配置、图标 |

题目是原创仿真题，不是真题原文。

---

## 6. 部署

服务器只部署 `main`，不要直接拉 `408` 分支：

```bash
cd /opt/study
git switch main
git pull
sudo bash deploy.sh
```

只更新 408 时：

```bash
cd /opt/study
sudo docker compose up -d --build exam408
```
