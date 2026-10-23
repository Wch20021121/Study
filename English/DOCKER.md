# 用 Docker 部署英语（一）真题档案

这份文档对应两个目标：

1. 在阿里云 Linux 服务器上，用 `run_english.sh` 快速把站点挂到 **5000** 端口；
2. 用 Docker + Nginx 做一套更适合长期运行的部署，并借这个项目学习 Docker。

---

## 1. 两种运行方式怎么选

| 方式 | 适合场景 | 优点 | 局限 |
| --- | --- | --- | --- |
| `run_english.sh` | 临时预览、第一次上云、快速验证 | 不需要 Docker，一条命令启动 | Python 自带 http.server，性能和 TLS 能力有限，不适合长期公网生产 |
| Docker + Nginx | 长期运行、反复更新、学习容器 | 环境一致、重启自动恢复、Nginx 静态性能好、易迁移 | 需要安装 Docker，多一层概念 |

建议路径：**先用脚本确认 5000 端口和安全组没问题，再切到 Docker。** 两者都使用同一个 `English/frontend/` 目录，不冲突；同一时间只运行一个即可。

---

## 2. 目录和文件

```text
Study/
├── run_english.sh                 # 根目录快捷入口（转发到 English/run_english.sh）
└── English/
    ├── run_english.sh             # Linux 静态服务脚本：start/stop/status/logs/fg
    ├── Dockerfile                 # nginx:alpine + 静态站点
    ├── compose.yaml               # Docker Compose 编排
    ├── .dockerignore              # 缩小构建上下文
    ├── .env.example               # PORT=5000 示例
    ├── deploy/nginx.conf          # 容器内 Nginx 站点配置
    ├── DOCKER.md                  # 本文
    └── frontend/                  # 真正要发布的 HTML/CSS/JS/图片
        ├── index.html
        ├── 2021.html
        ├── years/*.html
        └── assets/
```

Docker 的构建上下文是 `English/`，所以镜像里只会包含 `frontend/` 的静态产物；`exam-data/`、`真题/`、`frontend/src/` 不会进入镜像。

---

## 3. 方案一：用 run_english.sh 挂到 5000

### 3.1 上传代码

把整个 `Study` 目录（至少 `English/frontend/` 和 `English/run_english.sh`）放到服务器，例如：

```bash
cd /opt
sudo mkdir -p /opt/study
sudo chown "$USER":"$USER" /opt/study
# 用 scp / git clone / 阿里云文件传输均可
cd /opt/study
```

### 3.2 启动

```bash
cd /opt/study
chmod +x run_english.sh English/run_english.sh

# 默认 0.0.0.0:5000
./run_english.sh start

# 或者直接进 English 目录
cd English
./run_english.sh start
```

看到类似输出即成功：

```text
启动成功，PID 12345
本机访问：http://127.0.0.1:5000/
公网访问：http://<服务器公网IP>:5000/
```

### 3.3 常用命令

```bash
./run_english.sh status      # 是否运行 + HTTP 状态码
./run_english.sh logs        # 实时日志
./run_english.sh restart     # 重启
./run_english.sh stop        # 停止
./run_english.sh fg          # 前台运行，Ctrl+C 停止
PORT=8080 ./run_english.sh start   # 换端口
```

脚本行为：

- 使用 `nohup` 后台运行，PID 写在 `English/.run_english.pid`；
- 日志写到 `English/.run_english.log`；
- 启动前检查端口是否被占用；
- 启动后自动请求一次首页做健康检查；
- 停止时先 `SIGTERM`，20 次（约 4 秒）仍未退出才 `kill -9`；
- 非 root 即可运行，5000 端口不需要特权。

### 3.4 阿里云必须放行 5000

控制台路径：

```text
ECS 实例 → 安全组 → 配置规则 → 入方向 → 手动添加
协议类型：TCP
端口范围：5000/5000
授权对象：0.0.0.0/0（或只填你的办公/家庭公网 IP）
```

如果服务器开了本机防火墙：

```bash
# firewalld（Alibaba Cloud Linux / CentOS 系）
sudo firewall-cmd --permanent --add-port=5000/tcp
sudo firewall-cmd --reload

# ufw（Ubuntu）
sudo ufw allow 5000/tcp
```

然后在本机浏览器访问：

```text
http://<ECS 公网 IP>:5000/
```

> 安全组没放行时，服务器上 `curl 127.0.0.1:5000` 正常，但外网打不开；这是最常见的“服务启动了但访问不了”的原因。

### 3.5 让脚本开机自启（可选）

`nohup` 不会在重启后自动恢复。两种做法：

1. 直接用下面的 Docker 方案，`restart: unless-stopped` 会处理容器重启；
2. 或者写 systemd 服务：

```ini
# /etc/systemd/system/english-site.service
[Unit]
Description=Kaoyan English static site
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/study/English/frontend
ExecStart=/usr/bin/python3 -m http.server 5000 --bind 0.0.0.0
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now english-site
sudo systemctl status english-site
```

生产环境仍建议用 Docker + Nginx，而不是 python http.server。

---

## 4. 方案二：Docker + Nginx（推荐长期使用）

### 4.1 架构

```text
浏览器
  │  http://<ECS 公网IP>:5000
  ▼
阿里云安全组（放行 TCP 5000）
  ▼
宿主机 5000 端口
  ▼  docker 端口映射 5000:80
容器内的 nginx:alpine
  │  监听 80
  ▼
/usr/share/nginx/html/
  ├── index.html
  ├── 2021.html
  ├── years/*.html
  └── assets/*
```

关键点：**容器内 Nginx 监听 80，宿主机映射到 5000。** 所以浏览器访问 5000，而 Dockerfile 里写 `EXPOSE 80` 是正确的。

### 4.2 在阿里云安装 Docker

先确认系统：

```bash
cat /etc/os-release
uname -m
```

#### Alibaba Cloud Linux 3 / CentOS 系

```bash
sudo dnf install -y docker
sudo systemctl enable --now docker
docker --version
```

如果仓库里没有 `docker` 包，使用 Docker 官方 CE 仓库（RHEL 兼容）：

```bash
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
```

#### Ubuntu 22.04/24.04

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-v2
sudo systemctl enable --now docker
docker --version
docker compose version
```

如果 `docker-compose-v2` 不存在，按 Docker 官方 apt 仓库安装 `docker-compose-plugin`。也可以使用官方一键脚本，但执行前应先阅读脚本内容，不要在生产机上盲目 `curl | sh`。

#### 让当前用户免 sudo

```bash
sudo usermod -aG docker "$USER"
# 退出 SSH 重新登录，或 newgrp docker
docker run hello-world
```

`hello-world` 能输出欢迎信息，说明 Docker 守护进程和权限都正常。

### 4.3 构建并启动

```bash
cd /opt/study/English

# 可选：改宿主机端口
cp .env.example .env
# vi .env   # PORT=5000

# 构建镜像 + 后台启动
docker compose up -d --build

# 查看状态（STATUS 应为 healthy）
docker compose ps

# 本机验证
curl -I http://127.0.0.1:5000/
curl -s http://127.0.0.1:5000/healthz
```

`curl` 应看到 `HTTP/1.1 200 OK`，`/healthz` 返回 `ok`。

### 4.4 首次手动构建（理解 Dockerfile）

不看 Compose，先手动走一遍，更容易理解每一步：

```bash
cd /opt/study/English

# -t 给镜像起名字；最后的 . 是构建上下文
docker build -t kaoyan-english:local .

# 查看镜像
docker images | grep kaoyan-english

# -d 后台；--name 容器名；-p 宿主机端口:容器端口
docker run -d \
  --name kaoyan-english \
  -p 5000:80 \
  --restart unless-stopped \
  kaoyan-english:local

docker ps
curl -I http://127.0.0.1:5000/
```

停止并删除手动容器，再交给 Compose：

```bash
docker rm -f kaoyan-english
docker compose up -d --build
```

### 4.5 Compose 文件解释

```yaml
services:
  web:
    build: .                 # 用当前目录 Dockerfile 构建
    image: kaoyan-english:local
    ports:
      - "5000:80"            # 宿主机 5000 -> 容器 80
    restart: unless-stopped  # 服务器重启/容器崩溃后自动拉起
    healthcheck: ...         # 定期访问 /healthz
```

`docker compose up -d --build` 做了三件事：

1. 按 Dockerfile 构建镜像；
2. 创建容器；
3. 按 `ports` 做端口映射，按 `restart` 设置重启策略。

### 4.6 更新站点

静态站没有数据库，更新就是“替换文件 + 重建镜像”：

```bash
cd /opt/study
git pull                # 或者重新上传 frontend/
cd English

docker compose up -d --build
docker compose ps
```

Nginx 镜像会重新拷贝最新 `frontend/`。浏览器如果看到旧页面，强制刷新（Ctrl/Cmd+Shift+R）；HTML 本身没有设置长缓存，图片/CSS/JS 缓存 7 天。

回滚思路：

```bash
# 构建时打版本标签
docker build -t kaoyan-english:2026-10-21 .
# 出问题时用旧标签启动
docker run -d --name kaoyan-english -p 5000:80 kaoyan-english:2026-10-21
```

更规范的做法是推送镜像到阿里云 ACR，用版本标签部署；学习阶段先掌握本地标签即可。

### 4.7 日志、排障、清理

```bash
docker compose logs -f --tail=100     # 跟踪日志
docker compose restart                # 重启
docker compose down                   # 停止并删除容器（镜像保留）
docker compose up -d                  # 再启动

docker inspect --format '{{.State.Health.Status}}' kaoyan-english
docker exec -it kaoyan-english sh     # 进容器看文件
docker exec kaoyan-english ls /usr/share/nginx/html

docker image prune -f                 # 清理悬空镜像
# 不要随手 docker system prune -a，会删掉还要用的镜像
```

### 4.8 开发时用 bind mount（可选）

改 HTML 不想每次 rebuild，可以临时把宿主机目录挂进容器：

```bash
docker run --rm -d \
  --name kaoyan-english-dev \
  -p 5001:80 \
  -v "$PWD/frontend:/usr/share/nginx/html:ro" \
  nginx:1.27-alpine
```

访问 `http://服务器IP:5001/`。`-v 宿主机路径:容器路径:ro` 是只读挂载；改宿主机文件后刷新即可。**这是开发模式**，生产仍建议把文件打进镜像，避免“服务器上的文件和镜像不一致”。

---

## 5. 阿里云公网访问检查清单

按顺序排查，基本能覆盖 90% 的“打不开”：

1. **容器/进程是否在跑**
   ```bash
   docker compose ps
   # 或
   ./run_english.sh status
   ```
2. **本机是否能访问**
   ```bash
   curl -I http://127.0.0.1:5000/
   ```
   本机通、外网不通 → 优先查安全组和防火墙。
3. **端口是否真的监听**
   ```bash
   ss -lntp | grep :5000
   ```
4. **安全组**：入方向 TCP 5000，源 IP 是否正确。
5. **本机防火墙**：`firewall-cmd --list-ports` / `ufw status`。
6. **运营商/公司网络**：有些网络封非标准端口，换手机热点测试。
7. **域名/HTTPS**：如果后面接域名，大陆服务器通常需要 ICP 备案；只通过 IP:5000 访问不涉及备案，但不适合长期公开服务。

---

## 6. 生产化建议（学完基础后）

- **不要长期直接暴露 5000 的 HTTP**。在 5000 前面放 Nginx/Caddy，统一 80/443，再上 TLS。
- 域名 + HTTPS 的最短路径：Caddy 反代 `127.0.0.1:5000`，自动申请证书；或者 Nginx + certbot。
- 安全组只开放必要端口：22、80、443；5000 可只对反代所在机器/本机开放。
- 基础镜像固定版本，定期更新；构建时可用 `docker build --pull`。
- 容器不要 `--privileged`，不要挂载 `/var/run/docker.sock`。
- 静态站点没有数据库，备份重点是 `frontend/` 和构建文件；Git 就是最好的版本管理。
- 需要多台机器/滚动更新时，再学阿里云 ACR、ACK/Kubernetes；这个项目用单机 Compose 足够。

---

## 7. 用这个项目学 Docker：建议路线

1. **镜像/容器**：`docker run hello-world`，理解“镜像=只读模板，容器=运行实例”。
2. **端口映射**：`docker run -d -p 5000:80 nginx:alpine`，访问默认 Nginx 页面；理解 `宿主机:容器`。
3. **替换内容**：用本项目的 `docker build` + `docker run`，把默认页换成真题档案。
4. **看容器**：`docker ps`、`docker logs`、`docker exec -it ... sh`、`docker inspect`。
5. **Dockerfile 分层**：改一行 HTML 再 build，观察 `COPY frontend/` 层变化；理解 `.dockerignore` 为什么能加快构建。
6. **数据卷**：用 `-v "$PWD/frontend:/usr/share/nginx/html:ro"` 做开发挂载，比较“重建镜像”和“挂载热更新”的差异。
7. **Compose**：用 `compose.yaml` 管理端口、重启策略、健康检查、日志轮转；`docker compose config` 看最终配置。
8. **发布**：给镜像打 `日期/commit` 标签，推到阿里云 ACR，在另一台机器拉取运行；理解“构建一次，到处运行”。
9. **反向代理/TLS**：Caddy 或 Nginx 反代 5000，配域名和 HTTPS。
10. **CI/CD（进阶）**：Git push 后自动 build/push，再在服务器 `docker compose pull && up -d`。

---

## 8. 常见问题

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 本机 curl 通，公网打不开 | 安全组/防火墙未放行 | 放行 TCP 5000；检查 `firewall-cmd`/`ufw` |
| `permission denied while trying to connect to Docker` | 当前用户不在 docker 组 | `sudo usermod -aG docker $USER` 后重新登录 |
| `port is already allocated` | 宿主机 5000 被占用 | `ss -lntp \| grep :5000`，停掉或改 `PORT` |
| `docker compose` 不存在 | 只装了旧版 docker-compose | 装 `docker-compose-plugin`，或用 `docker-compose` |
| 页面 403/404 | 文件没进镜像/路径大小写 | `docker exec ... ls /usr/share/nginx/html`；检查 `COPY frontend/` |
| 中文乱码 | 响应头/HTML 编码 | 本项目 Nginx 已设 `charset utf-8`；检查浏览器强制编码 |
| 改了 HTML 不生效 | 浏览器缓存或没重建 | 强刷；`docker compose up -d --build` |
| 构建很慢/上下文很大 | 把 `exam-data`、`真题` 传进构建上下文 | 保留 `.dockerignore`，只在 `English/` 下构建 |
| 容器一直 unhealthy | Nginx 没起来/配置错误 | `docker compose logs`；`docker exec ... nginx -t` |
| 域名访问失败 | 未备案/未解析/未开 80/443 | 大陆服务器先备案；检查 DNS 和安全组 |

---

## 9. 最小命令清单

```bash
# 方式一：脚本
cd /opt/study
./run_english.sh start
./run_english.sh status
./run_english.sh stop

# 方式二：Docker
cd /opt/study/English
docker compose up -d --build
docker compose ps
curl -I http://127.0.0.1:5000/
docker compose logs -f
docker compose down
```

> 说明：本仓库的开发环境没有安装 Docker/Nginx，因此 Docker 镜像未在本机实际构建；Dockerfile、Compose 和 Nginx 配置按静态站点标准编写，建议先在测试 ECS 上执行 `docker compose up -d --build` 验证，再用于正式环境。
