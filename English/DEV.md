# 英语真题档案 · 模块开发说明

本目录只由 `english` 分支维护。408 内容在 `408-exam/`，由 `408` 分支维护；两边不要互相改目录。

---

## 1. 只启动英语

在仓库根目录执行：

```bash
./English/dev.sh
```

或者直接指定 Compose 项目名和服务名：

```bash
COMPOSE_PROJECT_NAME=study-english docker compose up -d --build english
```

访问：

```text
http://127.0.0.1:5001/
```

常用命令：

```bash
./English/dev.sh logs
./English/dev.sh status
./English/dev.sh restart
./English/dev.sh down
```

这个脚本只处理 `english`，不会构建或启动 408 容器。

---

## 2. 用 worktree 并行开发

在仓库根目录：

```bash
git worktree add ../Study-English english
cd ../Study-English
```

之后就在 `Study-English/` 里开发，不再和 `main`、`408` 抢同一个工作目录。

默认项目名是 `study-english`，容器名由 Compose 自动生成，例如：

```text
study-english-english-1
```

所以它可以和 408 worktree 的 `study-408-exam408-1` 同时存在。

---

## 3. 目录边界

只改：

```text
English/
├── Dockerfile
├── dev.sh
├── DEV.md
├── deploy/nginx.conf
├── frontend/
├── run_english.sh
└── 真题/、READ/、temp/ 等现有内容
```

不要改：

- `408-exam/**`：这是 `408` 分支的地盘；
- 根目录 `compose.yaml`、`deploy.sh`、`.env.example`、`README.md`、`BRANCHING.md`：这些是 `main` 的共享设施。

如果英语确实需要改端口/服务定义：

1. 先在 `main` 做共享设施改动；
2. 在 `english` 分支执行 `git merge main`；
3. 再继续开发。

---

## 4. 单站独立编排（可选）

`English/compose.yaml` 是英语单站原来的编排，适合单独调试：

```bash
cd English
docker compose up -d --build
# 默认 http://127.0.0.1:5000/
```

注意它和根目录统一编排的区别：

| 方式 | 项目名 | 端口 |
| --- | --- | --- |
| 根目录 `compose.yaml` | `study-sites` / 可用 `study-english` 覆盖 | 5001 |
| `English/compose.yaml` | `kaoyan-english` | 5000 |

日常分支开发优先用根目录统一编排的 `./English/dev.sh`；只有在单独调试英语镜像时才用 `English/compose.yaml`。

---

## 5. 提交与合并

开始开发前：

```bash
git switch english
git merge main
```

提交：

```bash
git add English
git commit -m "feat(english): ..."
```

合并到 `main`：

```bash
git switch main
git merge --no-ff english
```

完整分支规则见 [../BRANCHING.md](../BRANCHING.md)。

---

## 6. 英语内容构建

英语阅读文章/词汇的 JSON 和构建流程见 [README.md](README.md)；构建命令：

```bash
python3 temp/build.py
```

构建后确认输出“✅ 构建完成，所有验证通过”。

---

## 7. 部署

服务器只部署 `main`，不要直接拉 `english` 分支：

```bash
cd /opt/study
git switch main
git pull
sudo bash deploy.sh
```

只更新英语时：

```bash
cd /opt/study
sudo docker compose up -d --build english
```
