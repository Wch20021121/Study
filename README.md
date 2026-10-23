# Study · 408 大题工位与英语真题档案

这个仓库里现在有一套可以直接运行的 Docker 静态站点：

- **408 大题工位**：计算机组成原理、计算机网络、计算机系统（操作系统）的 12 道仿真大题，加上一张知识线路图；
- **英语真题档案**：2010—2026 考研英语（一）真题总目录和逐年全卷精讲；
- 两个站点各自构建镜像、各自运行容器、各自监听端口，但用**同一份 Compose 文件**管理。

> 408 站点：<http://127.0.0.1:40810/>
>
> 英语站点：<http://127.0.0.1:5001/>
>
> 详细阿里云部署步骤：[README-408-DEPLOY.md](README-408-DEPLOY.md)

> **端口说明**：TCP 端口范围是 1—65535，`408100` 超出范围，Docker 会报 `invalid hostPort`。所以本项目用 **40810** 作为 408 的默认端口。如果确实希望 URL 里出现 `408100`，只能用反向代理路径，不能作为真实端口监听。

---

## 1. 这个仓库里有什么

| 内容 | 位置 | 说明 |
| --- | --- | --- |
| 408 站点首页 | [408-exam/site/index.html](408-exam/site/index.html) | 三科入口、题干关键词速查、交叉考点 |
| 组成原理 | [408-exam/site/coa.html](408-exam/site/coa.html) | Cache、指令与数据通路、流水线、磁盘/DMA |
| 计算机网络 | [408-exam/site/network.html](408-exam/site/network.html) | VLSM/路由、TCP 拥塞控制、DNS/HTTP、CSMA/CD |
| 计算机系统 | [408-exam/site/os.html](408-exam/site/os.html) | 页表/TLB、调度、PV、inode/磁盘调度 |
| 知识线路图 | [408-exam/site/map.html](408-exam/site/map.html) | 18 个节点、5 个交叉点，可跳转对应大题 |
| 408 镜像 | [408-exam/Dockerfile](408-exam/Dockerfile) | Nginx + 静态文件 |
| 408 Nginx 配置 | [408-exam/deploy/nginx.conf](408-exam/deploy/nginx.conf) | 健康检查、缓存、压缩、安全响应头 |
| 两站编排 | [compose.yaml](compose.yaml) | 408 + 英语两个 service |
| 本地开发挂载 | [compose.dev.yaml](compose.dev.yaml) | 改文件不用重新 build |
| 一键部署脚本 | [deploy.sh](deploy.sh) | 构建、启动、检查健康、状态、日志、停止 |
| 英语站 | [English/](English/) | 已有静态站，单独镜像、单独端口 |
| 大体积资料 | `cs-408/`、`考研数学/` | 不进 Docker，也不建议进 Git |

题目是**原创仿真题**，不是真题原文；解析按 408 常见口径编写，适合自测和复盘。

---

## 2. 快速启动

前置条件：Docker Desktop（macOS）或 Docker Engine + Compose 插件（Linux）。

```bash
cd /Users/wch/workspace/Study

# 可选：改端口。不改也能用默认值
cp .env.example .env

docker compose up -d --build
docker compose ps
```

访问：

```text
http://127.0.0.1:40810/
http://127.0.0.1:5001/
```

停止：

```bash
docker compose down
```

再次启动（镜像已存在，不需要重新 build）：

```bash
docker compose up -d
```

如果只想启动一个：

```bash
docker compose up -d exam408
docker compose up -d english
```

`exam408` 和 `english` 是 **Compose 的服务名**；`study-408-exam` 和 `study-english` 是**容器名**，不要混用。

---

## 3. 两个服务是独立部署吗？

是“独立容器、独立镜像、独立端口”，但共用一份 Compose 项目。

| | 408 | 英语 |
| --- | --- | --- |
| Compose service | `exam408` | `english` |
| 容器名 | `study-408-exam` | `study-english` |
| 镜像 | `study-408-exam:local` | `kaoyan-english:local` |
| 宿主机端口 | `40810` | `5001` |
| 容器内端口 | `80` | `80` |
| 构建目录 | `408-exam/` | `English/` |
| 数据卷 | 无 | 无 |

### 独立的部分

- 两个镜像分别构建，互不依赖；
- 两个容器分别运行，一个停止或崩溃不影响另一个；
- 可以单独 build、单独 up、单独 stop、单独看日志；
- 没有 `depends_on`，启动顺序无所谓；
- 408 页面右上角的英语链接只是浏览器跳转，不是服务器内部调用。英语停了，408 还能正常打开，只是英语链接打不开。

### 仍然耦合的部分

- 它们在同一个 Compose 项目 `study-sites` 里；
- `docker compose up -d` 默认启动两个；
- `docker compose down` 默认删除两个容器和共享网络；
- 共用一个 Compose 默认网络，但彼此不依赖这个网络通信。

所以日常可以这样单独操作：

```bash
docker compose up -d --build exam408   # 只重建并启动 408
docker compose up -d english           # 只启动英语
docker compose stop exam408            # 只停 408
docker compose restart english         # 只重启英语
docker compose logs -f --tail=100 exam408
```

---

## 4. Docker 到底怎么理解

先记住四个东西：

```text
Dockerfile  --docker build-->  镜像 image  --docker run-->  容器 container
                                      │
                                      └── 可以被 Compose 编排成一组服务
```

| 概念 | 类比 | 说明 |
| --- | --- | --- |
| 镜像 image | 安装包 / 只读模板 | 包含文件系统、启动命令、环境变量等 |
| 容器 container | 运行中的实例 | 镜像启动后产生，有自己的进程和可写层 |
| Dockerfile | 制作镜像的菜谱 | 一行行描述“基于什么、复制什么、怎么启动” |
| Compose | 多容器启动清单 | 一个 YAML 管多个 service、端口、网络、健康检查 |
| Registry | 镜像仓库 | Docker Hub、阿里云 ACR 等，用来推拉镜像 |

容器不是虚拟机。它和宿主机共享内核，启动快、体积小；隔离的是进程、文件系统、网络等命名空间。

---

## 5. Dockerfile 怎么写

### 5.1 最小静态站 Dockerfile

```dockerfile
FROM nginx:1.27-alpine
COPY site/ /usr/share/nginx/html/
EXPOSE 80
```

三行就能工作：

- `FROM`：基于 Nginx 官方 Alpine 镜像；
- `COPY`：把当前构建上下文里的 `site/` 复制到容器里的网站根目录；
- `EXPOSE`：声明容器内监听 80，**它不会自动把端口开到宿主机**，端口映射要写在 `docker run -p` 或 Compose 的 `ports` 里。

### 5.2 本项目的 408 Dockerfile

```dockerfile
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="study-408-exam"
LABEL org.opencontainers.image.description="408 综合大题拆解"

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/

RUN find /usr/share/nginx/html -type d -exec chmod 755 {} \; \
 && find /usr/share/nginx/html -type f -exec chmod 644 {} \;

EXPOSE 80
STOPSIGNAL SIGQUIT

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
```

逐行理解：

- **`FROM nginx:1.27-alpine`**：固定小版本，避免 `latest` 某天变化导致构建结果不可复现；Alpine 体积小。
- **`LABEL`**：镜像元数据，方便在镜像仓库里识别。
- **`COPY deploy/nginx.conf ...`**：用我们自己的 Nginx 配置替换默认站点配置。
- **`COPY site/ ...`**：只复制静态站，不把 README、截图、临时文件带进镜像。
- **`RUN find ... chmod`**：统一文件权限，避免宿主机权限影响容器内 Nginx 读取。
- **`EXPOSE 80`**：文档性质，告诉使用者容器内服务在 80。
- **`STOPSIGNAL SIGQUIT`**：让 Nginx 收到停止信号时优雅退出。
- **`HEALTHCHECK`**：每 30 秒请求一次 `/healthz`，失败 3 次标记为 unhealthy。
- **没有写 `CMD`**：因为基础镜像 `nginx:1.27-alpine` 已经定义了启动命令，直接继承即可。

构建上下文（build context）很重要：

```bash
docker build -t study-408-exam:local ./408-exam
```

这里的上下文是 `408-exam/`，所以 Dockerfile 里写 `COPY site/ ...`；如果你从仓库根目录构建，路径就要改成 `COPY 408-exam/site/ ...`。

### 5.3 Dockerfile 常用指令

| 指令 | 作用 | 注意 |
| --- | --- | --- |
| `FROM` | 基础镜像 | 尽量固定版本 |
| `WORKDIR` | 设置工作目录 | 后续 `COPY`/`RUN` 相对它 |
| `COPY` | 复制文件 | 路径相对构建上下文 |
| `ADD` | 复制并支持解压/URL | 能用 `COPY` 就用 `COPY` |
| `RUN` | 构建时执行命令 | 尽量合并，装完清理缓存 |
| `ENV` | 运行时环境变量 | 会留在镜像里，不要放密钥 |
| `ARG` | 构建参数 | `docker build --build-arg` 传入 |
| `EXPOSE` | 声明端口 | 不等于发布端口 |
| `USER` | 指定运行用户 | 生产环境尽量非 root |
| `VOLUME` | 声明数据卷 | 数据库等需要持久化时用 |
| `CMD` | 默认启动命令 | 可被 `docker run` 参数覆盖 |
| `ENTRYPOINT` | 入口命令 | 更适合“固定程序 + 参数” |
| `HEALTHCHECK` | 健康检查 | 容器状态会显示 healthy/unhealthy |

### 5.4 `.dockerignore` 也要写

`.dockerignore` 决定哪些文件不进入构建上下文。本项目的 [408-exam/.dockerignore](408-exam/.dockerignore) 排除了 `.git`、`.DS_Store`、Dockerfile 等无关文件。

不写它，`docker build` 可能把几百 MB 的临时文件、日志、PDF 一起传给 Docker daemon，构建又慢、镜像又大，还可能把密钥带进去。

---

## 6. Compose 怎么写

### 6.1 最小 Compose

```yaml
services:
  web:
    build: ./408-exam
    ports:
      - "40810:80"
```

- `services`：服务列表；
- `web`：服务名，可以自己取；
- `build`：用哪个目录的 Dockerfile 构建；
- `ports`：宿主机端口:容器端口。

启动：

```bash
docker compose up -d --build
```

### 6.2 本项目 Compose 的关键字段

```yaml
name: study-sites

services:
  exam408:
    build:
      context: ./408-exam
      dockerfile: Dockerfile
    image: study-408-exam:local
    container_name: study-408-exam
    ports:
      - "${EXAM408_PORT:-40810}:80"
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://127.0.0.1/healthz"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

| 字段 | 作用 |
| --- | --- |
| `name` | Compose 项目名，影响容器/网络命名 |
| `build.context` | 构建上下文目录 |
| `build.dockerfile` | Dockerfile 文件名 |
| `image` | 构建后打的镜像标签 |
| `container_name` | 固定容器名（方便 `docker logs`，但会限制 `--scale`） |
| `ports` | `宿主机:容器`；`${VAR:-默认值}` 从 `.env` 读取 |
| `restart: unless-stopped` | 开机/崩溃自动重启；手动 stop 后不自动拉起 |
| `security_opt` | 禁止容器获得新特权 |
| `healthcheck` | 覆盖/补充镜像健康检查 |
| `logging` | 限制日志大小，避免磁盘被日志吃满 |

### 6.3 `.env` 与变量替换

根目录的 [.env.example](.env.example)：

```dotenv
EXAM408_PORT=40810
ENGLISH_PORT=5001
```

Compose 会自动读取同目录的 `.env`，所以：

```yaml
ports:
  - "${EXAM408_PORT:-40810}:80"
```

意思是：如果环境变量存在就用它，否则用 40810。改端口只需要：

```bash
cp .env.example .env
# 编辑 .env
docker compose up -d
```

> 注意：英语端口改了以后，还要改 [408-exam/site/assets/config.js](408-exam/site/assets/config.js) 里的 `englishPort`，再重新 build 408；否则 408 右上角仍然跳旧端口。

### 6.4 端口、卷、网络

**端口映射**

```yaml
ports:
  - "40810:80"           # 宿主机 40810 -> 容器 80
  - "127.0.0.1:40810:80" # 只允许本机访问，公网不暴露
```

- 左边是宿主机端口，右边是容器端口；
- 容器之间互相访问时，用**服务名 + 容器端口**，例如 `http://english:80`，不是 `:5001`；
- 只给宿主机用的端口才需要 `ports`。

**数据卷**

```yaml
volumes:
  - ./site:/usr/share/nginx/html:ro   # bind mount，只读
  - db-data:/var/lib/postgresql/data  # named volume
```

- bind mount：把宿主机目录挂进容器，适合开发；
- named volume：Docker 管理的持久化卷，适合数据库；
- 本项目生产环境没有挂载：静态文件已经打进镜像，部署更稳定；
- 本地开发用 [compose.dev.yaml](compose.dev.yaml) 把 `408-exam/site` 和 `English/frontend` 挂进去，改完刷新即可。

**网络**

Compose 会自动创建一个默认网络。本项目的两个服务都加入 `study-sites_default`，但它们没有内部调用关系。如果以后 408 需要调用英语站的 API，可以直接用 `english` 这个服务名，而不是宿主机的 `5001`。

### 6.5 启动顺序与依赖

当前没有 `depends_on`，因为两个站互不依赖。以后如果加数据库，可以写：

```yaml
depends_on:
  db:
    condition: service_healthy
```

但 `depends_on` 只保证启动顺序，不保证应用已经“准备好”；真正的健康等待要靠 healthcheck 和应用重试。

---

## 7. 常用命令

在仓库根目录执行：

| 命令 | 作用 |
| --- | --- |
| `docker compose config` | 检查最终解析后的 Compose 配置 |
| `docker compose build` | 构建所有镜像 |
| `docker compose build exam408` | 只构建 408 |
| `docker compose up -d` | 后台启动所有服务 |
| `docker compose up -d --build exam408` | 重建并启动 408 |
| `docker compose ps` | 看运行中的容器 |
| `docker compose ps -a` | 包括已停止的 |
| `docker compose logs -f --tail=100` | 实时看日志 |
| `docker compose logs -f exam408` | 只看 408 |
| `docker compose exec exam408 sh` | 进入 408 容器 |
| `docker compose restart exam408` | 只重启 408 |
| `docker compose stop exam408` | 只停止 408 |
| `docker compose start exam408` | 启动已停止的 408 |
| `docker compose down` | 停止并删除两个容器和网络 |
| `docker compose down --rmi local` | 连本地镜像一起删（谨慎） |

Docker 原生命令：

```bash
docker image ls                 # 镜像
docker container ls -a          # 所有容器
docker logs study-408-exam      # 容器日志
docker inspect study-408-exam   # 容器详情
docker stats --no-stream        # 资源占用
docker system df                # Docker 磁盘占用
```

不要随手执行 `docker system prune -a`，它会删掉所有未使用的镜像和缓存，重新构建会很慢。

---

## 8. 10 分钟练习

如果刚学 Docker，可以拿 Nginx 做一次最小实验：

```bash
# 1. 启动一个临时 Nginx
docker run -d --name demo-nginx -p 8080:80 nginx:1.27-alpine

# 2. 访问
curl -I http://127.0.0.1:8080/

# 3. 看日志
docker logs demo-nginx

# 4. 进容器
docker exec -it demo-nginx sh
# 在容器里执行：ls /usr/share/nginx/html，然后 exit

# 5. 停掉并删除
docker stop demo-nginx
docker rm demo-nginx
```

理解这几件事就算入门了：

1. `-p 8080:80` 是宿主机端口到容器端口的映射；
2. 容器里默认的 Nginx 页面来自 `/usr/share/nginx/html`；
3. `docker exec` 进入的是容器内部，不是宿主机；
4. `docker stop` 只是停止，`docker rm` 才删除容器；
5. 镜像还在，所以随时可以再 run 一个。

---

## 9. 再写一个网站的步骤

假设你要加一个数学资料站，目录是 `math-site/`：

```text
math-site/
├── Dockerfile
└── site/index.html
```

先写一个能跑的最小 `Dockerfile`（不自定义 Nginx 配置）：

```dockerfile
FROM nginx:1.27-alpine
COPY site/ /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
```

如果要加 `/healthz`、缓存和安全响应头，再把 `deploy/nginx.conf` 加进来：
在 `Dockerfile` 里增加 `COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf`，
并把健康检查地址改成 `/healthz`。本项目的 408 和英语站就是这么做的。

在 `compose.yaml` 加一个 service：

```yaml
  math:
    build:
      context: ./math-site
      dockerfile: Dockerfile
    image: study-math:local
    container_name: study-math
    ports:
      - "40820:80"
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

然后：

```bash
docker compose up -d --build math
```

这就是 Compose 的价值：新增一个服务，只是加一段 YAML，不需要记一长串 `docker run` 参数。

---

## 10. 阿里云部署摘要

完整步骤、安全组、防火墙、HTTPS 和排错见 [README-408-DEPLOY.md](README-408-DEPLOY.md)。

```bash
# 服务器上
cd /opt/study
sudo bash deploy.sh --install-docker   # 首次：装 Docker + Compose，再启动两站
# 或者 Docker 已装好：
sudo bash deploy.sh
```

访问：

```text
http://服务器公网IP:40810/
http://服务器公网IP:5001/
```

阿里云安全组入方向需要放行 TCP `40810`、`5001`。如果本机 `curl` 正常、公网打不开，优先查安全组。

常用维护：

```bash
cd /opt/study
sudo bash deploy.sh status
sudo bash deploy.sh logs
sudo bash deploy.sh restart
sudo bash deploy.sh down
```

---

## 11. 排错速查

| 现象 | 原因 / 解决 |
| --- | --- |
| `invalid hostPort: 408100` | 端口超过 65535，改 `40810` 或其他合法端口 |
| `port is already allocated` | 宿主机端口被占用，改 `.env` 或停掉占用进程 |
| 公网打不开，本机正常 | 阿里云安全组 / ufw / firewalld 没放行 |
| 容器是 `unhealthy` | `docker compose logs exam408` 看 Nginx 或 `/healthz` |
| 页面 404 | 检查 `COPY site/` 是否复制到了 `/usr/share/nginx/html` |
| 改了 HTML 不生效 | 静态文件已打进镜像，重新 `docker compose up -d --build exam408`；或使用 `compose.dev.yaml` |
| `permission denied` 连 Docker | 把用户加入 docker 组，或命令加 `sudo` |
| `docker compose` 找不到 | 安装 `docker-compose-plugin`，或运行 `sudo bash deploy.sh --install-docker` |
| 英语链接跳错端口 | 改 `.env` 的 `ENGLISH_PORT` 后，同步改 `408-exam/site/assets/config.js`，重新 build 408 |
| macOS 5000 被占用 | AirPlay 接收器占用；英语默认用 5001 |

---

## 12. 目录结构

```text
Study/
├── README.md                    # 本文件：项目总览 + Docker 入门
├── README-408-DEPLOY.md         # 阿里云部署详细说明
├── compose.yaml                 # 两个站点的统一编排
├── compose.dev.yaml             # 本地开发挂载覆盖
├── .env.example                 # 端口配置示例
├── deploy.sh                    # 一键部署/状态/日志/停止
├── 408-exam/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── deploy/nginx.conf
│   └── site/
│       ├── index.html
│       ├── coa.html
│       ├── network.html
│       ├── os.html
│       ├── map.html
│       └── assets/
├── English/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── deploy/nginx.conf
│   └── frontend/                # 英语真题档案静态站
├── cs-408/                      # 408 PDF 资料，不进 Docker/Git
└── 考研数学/                     # 数学 PDF 资料，不进 Docker/Git
```

---

## 13. 继续阅读

- 阿里云 ECS、安全组、防火墙、Caddy HTTPS：[README-408-DEPLOY.md](README-408-DEPLOY.md)
- 408 知识线路图：[408-exam/site/map.html](408-exam/site/map.html)
- 408 首页：[408-exam/site/index.html](408-exam/site/index.html)
- 英语站：[English/README.md](English/README.md)

如果以后要加数据库、对象存储、HTTPS 或 CI/CD，建议保持现在的结构：**每个站点一个镜像，一个 Compose 管多个服务，宿主机只暴露必要端口**。这样扩起来最省心。
