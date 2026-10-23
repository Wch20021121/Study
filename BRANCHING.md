# 分支与 worktree 开发说明

这套仓库采用 **同仓、目录隔离、镜像/容器独立、main 统一部署** 的方式。

```text
main
├── 408          # 只开发 408
└── english      # 只开发英语
```

分支是开发边界，Docker 是运行边界，两者不要混在一起。

---

## 1. 每个分支负责什么

| 分支 | 只改这些 | 典型内容 |
| --- | --- | --- |
| `408` | `408-exam/**` | 408 页面、题目、408 Dockerfile、408 的模块开发脚本 |
| `english` | `English/**` | 英语页面、真题数据、英语 Dockerfile、英语的模块开发脚本 |
| `main` | 根目录共享文件 | `compose.yaml`、`deploy.sh`、`.env.example`、README、端口契约 |

模块自己的开发细节：

- 408：[408-exam/README.md](408-exam/README.md)
- 英语：[English/DEV.md](English/DEV.md)

### main 负责的共享文件

- `compose.yaml`
- `compose.dev.yaml`
- `deploy.sh`
- `.env.example`
- `README.md`
- `README-408-DEPLOY.md`
- `BRANCHING.md`
- `.gitignore`

模块分支不要各自维护一份 `compose.yaml`，否则两个分支迟早会漂移。

如果 408 或英语确实需要一个新端口、新服务、新环境变量：

1. 先在 `main` 做一个小改动；
2. 提交并推送 `main`；
3. 切回模块分支，`git merge main`；
4. 再继续模块开发。

---

## 2. 推荐的日常流程

> 下面命令适用于“只有一个工作目录、靠 `git switch` 切换”的模式。
> 如果你用 worktree，每个目录固定在自己的分支，**不要**在模块目录里 `git switch main`；合并到 main 要回到 main 所在的目录执行。

### 开发 408

```bash
git switch 408
git merge main
# 改 408-exam/**
git add 408-exam
git commit -m "feat(408): ..."
```

### 开发英语

```bash
git switch english
git merge main
# 改 English/**
git add English
git commit -m "feat(english): ..."
```

### 合并到 main

```bash
git switch main
git pull
git merge --no-ff 408
git merge --no-ff english
git push
```

`main` 永远保持可部署。服务器只从 `main` 拉代码。

---

## 3. 用 worktree 同时开发两边

如果不想频繁 `git switch`，可以让两个分支各自占用一个目录：

```bash
cd /Users/wch/workspace/Study

git worktree add ../Study-408 408
git worktree add ../Study-English english
```

目录结构：

```text
workspace/
├── Study/           # main
├── Study-408/       # 408 分支
└── Study-English/   # english 分支
```

查看：

```bash
git worktree list
```

删除某个 worktree（确认里面没有未提交改动）：

```bash
git worktree remove ../Study-408
git worktree remove ../Study-English
```

---

## 4. 两个 worktree 如何不打架

关键点：**不要固定 `container_name`**。

本项目的 `compose.yaml` 已经移除了固定容器名，Compose 会根据项目名自动生成容器名。不同 worktree 使用不同项目名，就不会撞名。

### 408 worktree

```bash
cd ../Study-408

# 方式一：直接指定项目名
COMPOSE_PROJECT_NAME=study-408 docker compose up -d --build exam408

# 方式二：用模块脚本
./408-exam/dev.sh
```

访问：

```text
http://127.0.0.1:40810/
```

### English worktree

```bash
cd ../Study-English

# 方式一：直接指定项目名
COMPOSE_PROJECT_NAME=study-english docker compose up -d --build english

# 方式二：用模块脚本
./English/dev.sh
```

访问：

```text
http://127.0.0.1:5001/
```

两边的项目名不同，容器名类似：

```text
study-408-exam408-1
study-english-english-1
```

所以可以同时存在。

### worktree 里怎么合并

在 408 worktree 里（已经在 408 分支）：

```bash
git merge main
git add 408-exam
git commit -m "feat(408): ..."
```

然后回到 main 所在的主目录：

```bash
cd /Users/wch/workspace/Study
git switch main
git merge --no-ff 408
```

英语同理：在 `Study-English` 里 `git merge main`、提交，回到主目录再 merge `english`。

不要在 408 worktree 里执行 `git switch main`：`main` 正在主目录被检出，Git 会拒绝。

### 端口注意

上面的命令只启动自己负责的站点：

- 408 worktree 只启动 `exam408`，占用 `40810`；
- English worktree 只启动 `english`，占用 `5001`。

这样两个 worktree 可以同时运行。

如果你在两个 worktree 都执行 `docker compose up -d`（启动全部服务），就会抢同一个 40810/5001 端口。此时要么只启动自己那个 service，要么给其中一个 worktree 在 `.env` 里换端口：

```dotenv
# 例如 408 worktree 的第二套环境
EXAM408_PORT=40811
ENGLISH_PORT=5002
```

但换端口后，408 页面右上角的英语链接也要同步改 `408-exam/site/assets/config.js`。

另外，如果本地 main 的 `study-sites` 项目已经在运行，它已经占用 40810/5001。启动 worktree 前可以：

```bash
# 只停 main 的 408
docker compose -p study-sites stop exam408

# 或者直接给 worktree 换端口
EXAM408_PORT=40811 ./408-exam/dev.sh
```

---

## 5. 模块开发脚本

两个模块脚本都只启动自己，不会碰对方：

### 408

```bash
./408-exam/dev.sh          # 构建并启动 408
./408-exam/dev.sh logs     # 看 408 日志
./408-exam/dev.sh status   # 看 408 容器
./408-exam/dev.sh down     # 只清理 408 的 compose 项目
```

### 英语

```bash
./English/dev.sh           # 构建并启动英语
./English/dev.sh logs
./English/dev.sh status
./English/dev.sh down
```

脚本内部使用固定的项目名：

- 408：`study-408`
- 英语：`study-english`

所以它们不会和 main 的 `study-sites` 项目、也不会和对方撞名。

---

## 6. 部署策略

服务器永远只部署 `main`：

```bash
ssh root@你的服务器IP
cd /opt/study

git switch main
git pull
sudo bash deploy.sh
```

首次部署：

```bash
sudo bash deploy.sh --install-docker
```

不要从服务器直接拉 `408` 或 `english` 分支部署。分支是开发用的，`main` 是发布入口。

### 只想部署一个服务时

在服务器上可以单独构建/启动，但前提是代码已经从 `main` 拉取：

```bash
cd /opt/study

# 只更新 408
sudo docker compose up -d --build exam408

# 只更新英语
sudo docker compose up -d --build english
```

`deploy.sh` 默认会处理两个服务；单独操作直接用 Compose 命令。

---

## 7. 常见冲突怎么避免

### 不要在模块分支改共享文件

比如 `408` 分支不要顺手改根目录 `compose.yaml`，英语分支也不要改 `deploy.sh`。这些改动放 `main`。

### 定期合并 main

长期不合会让分支落后太多。建议每次开始开发前：

```bash
git switch 408
git merge main
```

或者：

```bash
git switch english
git merge main
```

### 端口和链接是契约

当前契约：

| 项目 | 值 |
| --- | --- |
| 408 宿主机端口 | `40810` |
| 英语宿主机端口 | `5001` |
| 408 页面英语链接 | `http://当前主机:5001/` |

如果英语端口变了：

1. 改根目录 `.env` 的 `ENGLISH_PORT`；
2. 改 `408-exam/site/assets/config.js` 的 `englishPort`；
3. 在 `main` 提交这个契约变更；
4. 把 `main` 合并回两个开发分支。

---

## 8. 一句话总结

- `main`：共享设施 + 发布入口；
- `408`：只改 `408-exam/`；
- `english`：只改 `English/`；
- 用不同 `COMPOSE_PROJECT_NAME` 和模块脚本并行开发；
- 服务器只跑 `main`。
