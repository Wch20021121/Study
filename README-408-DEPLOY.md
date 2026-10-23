# 408 大题工位 + 英语真题档案：Docker 部署说明

这个目录现在有两套独立站点，用两个容器、两个宿主机端口运行：

| 站点 | 容器名 | 宿主机端口 | 容器内端口 | 目录 |
| --- | --- | --- | --- | --- |
| 408 大题工位 | `study-408-exam` | **40810** | 80 | `408-exam/` |
| 英语真题档案 | `study-english` | **5001** | 80 | `English/` |

> **关于 408100**：TCP 端口范围是 1—65535，`408100` 超出范围，Docker 和操作系统都无法把宿主机端口映射到 408100。本项目用 **40810** 作为默认端口。如果你确实喜欢 408100 这个数字，只能用域名/反向代理路径来实现类似 `https://你的域名/408100/` 的效果，不能作为真实端口监听。
>
> 想换端口：在项目根目录新建 `.env`，写 `EXAM408_PORT=你的端口`、`ENGLISH_PORT=你的端口`，然后重新 `sudo bash deploy.sh`。

---

## 1. 本地先跑一遍

macOS 上启动 Docker Desktop 后，在项目根目录执行：

```bash
cd /Users/wch/workspace/Study
cp .env.example .env      # 可选，用来改端口
docker compose up -d --build
docker compose ps
```

访问：

- 408：http://127.0.0.1:40810/
- 英语：http://127.0.0.1:5001/

健康检查：

```bash
curl -I http://127.0.0.1:40810/
curl -I http://127.0.0.1:5001/
curl http://127.0.0.1:40810/healthz
```

停止：

```bash
docker compose down
```

如果本机 5000 被 macOS 的 AirPlay 接收器占用，不要用 5000；本项目英语默认 5001，就是为了避开它。

---

## 2. 阿里云 ECS 一键部署（推荐）

假设服务器是 **Ubuntu 22.04/24.04** 或 **Alibaba Cloud Linux 3 / CentOS 兼容系统**，安全组已放行 `22`、`40810`、`5001`。

### 2.1 第一次：装 Docker + 部署

SSH 登录服务器：

```bash
ssh root@你的服务器公网IP
```

安装 git，拉代码（当前仓库的 origin 是 `https://github.com/Wch20021121/Study.git`；如果服务器访问 GitHub 慢，见 2.4 的 rsync 方式）：

```bash
dnf install -y git || apt-get update && apt-get install -y git
mkdir -p /opt/study
git clone https://github.com/Wch20021121/Study.git /opt/study
cd /opt/study
```

一键安装 Docker 并启动两个站点：

```bash
sudo bash deploy.sh --install-docker
```

脚本会：

1. 用 Docker 官方脚本安装 Docker（Aliyun 镜像）；
2. 安装/检查 Compose 插件；
3. 构建 `408-exam` 和 `English` 两个镜像；
4. 启动两个容器；
5. 等待 `/healthz` 通过，并打印本机/公网访问地址。

如果服务器已经装好 Docker 和 Compose，只需要：

```bash
cd /opt/study
sudo bash deploy.sh
```

> **如果 `--install-docker` 在 Alibaba Cloud Linux 3 上失败**，用阿里云 Docker CE 镜像手动安装：
>
> ```bash
> sudo dnf install -y dnf-plugins-core
> sudo dnf config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
> sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
> sudo systemctl enable --now docker
> cd /opt/study && sudo bash deploy.sh
> ```
>
> Ubuntu 如果官方脚本较慢，可先按阿里云/清华镜像配置 Docker apt 源，再安装 `docker-ce docker-compose-plugin`。装好后用 `docker compose version` 验证。
>
> 如果 `docker build` 卡在拉取 `nginx:1.27-alpine`：到阿里云「容器镜像服务 → 镜像工具 → 镜像加速器」复制专属地址，写入 `/etc/docker/daemon.json` 的 `registry-mirrors`，然后 `sudo systemctl restart docker`。这不会改变站点代码，只影响拉基础镜像的速度。

> 首次装完 Docker 后，如果不想每次都加 `sudo`，把当前用户加入 docker 组并重新登录：
>
> ```bash
> sudo usermod -aG docker "$USER"
> newgrp docker
> ```

### 2.2 访问

在浏览器打开：

```text
http://服务器公网IP:40810/
http://服务器公网IP:5001/
```

如果打不开，先在服务器本机验证：

```bash
curl -I http://127.0.0.1:40810/
curl -I http://127.0.0.1:5001/
```

本机通、公网不通，一般是**阿里云安全组**或**服务器防火墙**没放行。

### 2.3 日常命令

```bash
cd /opt/study

sudo bash deploy.sh status      # 容器 + HTTP 健康状态
sudo bash deploy.sh logs        # 跟踪日志
sudo bash deploy.sh restart     # 重启
sudo bash deploy.sh down        # 停止并删除容器（镜像保留）
sudo bash deploy.sh             # 重新构建并启动
```

等价的原生 Compose 命令：

```bash
docker compose ps
docker compose logs -f --tail=100
docker compose up -d --build
docker compose down
```

### 2.4 不用 Git 的上传方式

如果服务器访问 GitHub 不稳定，可以在本地用 `rsync` 把需要的目录传上去：

```bash
rsync -avz \
  --exclude '.git' \
  --exclude 'cs-408' \
  --exclude '考研数学' \
  --exclude '.env' \
  /Users/wch/workspace/Study/ \
  root@你的服务器IP:/opt/study/
```

不要传 `cs-408/` 和 `考研数学/` 的几 GB PDF；它们和这两个站点无关。`408-exam/`、`English/frontend/`、`English/deploy/`、根目录的 `compose.yaml`、`deploy.sh` 是必须的。

---

## 3. 手动 Docker 命令（不想用脚本时）

### 3.1 构建 408 镜像

```bash
cd /opt/study
docker build -t study-408-exam:local ./408-exam
docker run -d \
  --name study-408-exam \
  -p 40810:80 \
  --restart unless-stopped \
  study-408-exam:local
```

### 3.2 构建英语镜像

```bash
cd /opt/study
docker build -t kaoyan-english:local ./English
docker run -d \
  --name study-english \
  -p 5001:80 \
  --restart unless-stopped \
  kaoyan-english:local
```

### 3.3 用 Compose（推荐）

```bash
cd /opt/study
docker compose up -d --build
docker compose ps
```

> 注意：`English/compose.yaml` 是英语单站原来的编排，默认容器名 `kaoyan-english`、端口 5000；根目录 `compose.yaml` 是两站统一编排，容器名 `study-english`、端口 5001。**只选一套启动**，避免重复容器和端口混乱；如果确实要同时跑，先确认两套编排的宿主机端口不冲突。

---

## 4. 阿里云安全组与防火墙

### 4.1 安全组

阿里云控制台 → ECS → 实例 → 安全组 → 入方向，添加：

| 协议 | 端口范围 | 授权对象 |
| --- | --- | --- |
| TCP | 40810 | 你的公网 IP/32（或 0.0.0.0/0） |
| TCP | 5001 | 你的公网 IP/32（或 0.0.0.0/0） |

长期公开服务不建议直接暴露高位端口；更推荐只开 80/443，用 Caddy/Nginx 反向代理到 `127.0.0.1:40810` 和 `127.0.0.1:5001`。

### 4.2 服务器防火墙

Ubuntu（ufw）：

```bash
sudo ufw allow 40810/tcp
sudo ufw allow 5001/tcp
sudo ufw status
```

Alibaba Cloud Linux / CentOS（firewalld）：

```bash
sudo firewall-cmd --permanent --add-port=40810/tcp
sudo firewall-cmd --permanent --add-port=5001/tcp
sudo firewall-cmd --reload
sudo firewall-cmd --list-ports
```

---

## 5. 更新内容

本地改完 HTML/CSS 后：

```bash
cd /Users/wch/workspace/Study
git add 408-exam compose.yaml compose.dev.yaml deploy.sh .env.example README-408-DEPLOY.md \
  English/Dockerfile English/.dockerignore English/deploy English/frontend \
  English/compose.yaml English/.env.example English/README.md
git commit -m "add 408 big-question site and docker deploy"
git push
```

服务器：

```bash
cd /opt/study
git pull
sudo bash deploy.sh
```

因为静态文件已经打进镜像，**只改宿主机文件不会自动更新**；必须重新 build。开发时可以用挂载覆盖：

```bash
docker compose -f compose.yaml -f compose.dev.yaml up -d --build
```

这样 `408-exam/site/` 和 `English/frontend/` 会以只读方式挂进容器，刷新浏览器即可看到改动。

---

## 6. 想用域名 + HTTPS（可选）

推荐 Caddy，自动申请证书。先让两个站点只监听本机：

```yaml
# compose.yaml 里把 ports 改成
# - "127.0.0.1:40810:80"
# - "127.0.0.1:5001:80"
```

Caddyfile：

```caddyfile
study.example.com {
    reverse_proxy 127.0.0.1:40810
}

english.example.com {
    reverse_proxy 127.0.0.1:5001
}
```

如果只想用一个域名，可以按路径反代：

```caddyfile
study.example.com {
    handle_path /408/* {
        reverse_proxy 127.0.0.1:40810
    }
    handle_path /english/* {
        reverse_proxy 127.0.0.1:5001
    }
}
```

> 如果使用上面的单域名路径反代，请把 `408-exam/site/assets/config.js` 里的 `englishUrl` 改成 `"/english/"`，这样 408 页面右上角的英语链接会走路径代理，而不是继续跳 `:5001`。
>
> 大陆服务器绑定域名通常需要 ICP 备案；只用 `IP:端口` 访问不涉及备案，但不适合长期公开服务。

---

## 7. 常见问题

| 现象 | 排查 |
| --- | --- |
| `invalid hostPort: 408100` | 端口超过 65535，不存在这个 TCP 端口；改用 40810 或其他 ≤65535 的端口。 |
| 公网打不开，本机 curl 正常 | 优先查阿里云安全组，再查 ufw/firewalld。 |
| `permission denied while trying to connect to Docker` | `sudo usermod -aG docker $USER && newgrp docker`，或命令前加 `sudo`。 |
| `docker compose` 找不到 | 安装 `docker-compose-plugin`；本项目 `deploy.sh --install-docker` 会尝试补装。 |
| 容器启动但页面 404 | 确认 `408-exam/site/index.html` 存在；`docker exec study-408-exam ls /usr/share/nginx/html`。 |
| 改了 HTML 不生效 | 静态文件已打进镜像，执行 `sudo bash deploy.sh` 重新 build；或使用 `compose.dev.yaml` 挂载。 |
| 5000 端口被占用 | macOS AirPlay 接收器；英语已改用 5001。 |
| 英语端口想换 | 根目录 `.env` 写 `ENGLISH_PORT=新端口`，重新 `sudo bash deploy.sh`；同时改 `408-exam/site/assets/config.js` 里的 `englishPort`，让 408 页面右上角的英语链接跳转到正确端口。 |

---

## 8. 文件结构

```text
Study/
├── compose.yaml                 # 两站统一编排
├── compose.dev.yaml             # 本地开发挂载覆盖
├── .env.example                 # 端口示例
├── deploy.sh                    # 一键部署/状态/日志/停止
├── README-408-DEPLOY.md         # 本文件
├── 408-exam/
│   ├── Dockerfile
│   ├── deploy/nginx.conf
│   └── site/
│       ├── index.html           # 总览
│       ├── coa.html             # 组成原理 4 道大题
│       ├── network.html         # 计算机网络 4 道大题
│       ├── os.html              # 计算机系统/操作系统 4 道大题
│       ├── map.html             # 知识线路图
│       └── assets/
│           ├── site.css
│           ├── site.js
│           └── config.js        # 英语站端口
└── English/
    ├── Dockerfile
    ├── deploy/nginx.conf
    └── frontend/                # 英语真题档案静态站
```
