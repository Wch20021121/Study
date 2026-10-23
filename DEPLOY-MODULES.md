# 多模块 Docker 部署笔记（英语 / 408 / 数学）

> **2026-10 更新**：新增「408 大题工位」并与英语站统一编排，当前实际端口为 **40810（408）** 和 **5001（英语）**。一键部署、阿里云步骤和常见问题请优先看 [`README-408-DEPLOY.md`](README-408-DEPLOY.md)。本文保留作为 Docker 基础操作与多模块思路的参考，旧示例里的 `5000/5001` 不再对应当前站点。

这份笔记解决两个问题：

1. Docker 的日常基本操作；
2. 代码用 Git 推到阿里云后，如何按模块分别部署，而不是把所有东西塞进一个容器。

---

## 0. 先看清当前仓库的模块

| 模块 | 入口/内容 | 体量 | 建议 |
| --- | --- | --- | --- |
| `English/frontend/` | 英语真题档案静态站，`index.html` | 约 18–30MB | Docker + Nginx，端口 5000 |
| `cs-408/docs/` | 408 复习系统静态站，`index.html` + CSS/JS | 很小 | Nginx 静态站，端口 5001 |
| `cs-408/` 其余 PDF | 2.6GB 资料库 | 很大 | 不要打进 Git/镜像，用 OSS 或独立数据盘 |
| `考研数学/` | 3.8GB PDF 资料 | 很大 | 不要打进 Git/镜像，用 OSS 或 Nginx 文件服务 |
| `408/` | Markdown 笔记 | 12KB | 不是网站；需要展示再转 HTML，或暂不部署 |

> 重要：根目录 `.gitignore` 已经把 `cs-408/`、`考研数学/` 忽略。`git push` **不会**把这两个目录推到服务器。PDF 资料建议用阿里云 OSS、scp/rsync，或单独的数据盘，不要为了“一个 git 仓库全搞定”把几 GB PDF 塞进 Git。

检查某个文件是否会被 Git 忽略：

```bash
git check-ignore -v cs-408/docs/index.html
git check-ignore -v 考研数学/27张宇基础30讲线代.pdf
git status --short
```

---

## 1. Docker 的心智模型

```text
Dockerfile  --build-->  镜像（image）  --run-->  容器（container）
                          只读模板                 运行实例
Compose 文件  --up-->  一组容器 + 网络 + 端口映射 + 重启策略
```

四个最常用的对应关系：

| 概念 | 类比 | 命令 |
| --- | --- | --- |
| 镜像 | 安装包/模板 | `docker images` |
| 容器 | 正在运行的实例 | `docker ps` |
| Dockerfile | 制作镜像的菜谱 | `docker build` |
| Compose | 多个容器的启动清单 | `docker compose up` |

端口映射：

```text
-p 5000:80
   ↑    ↑
宿主机  容器
```

浏览器访问服务器 `5000`，请求被转到容器里的 `80`。

文件挂载：

```text
-v /opt/study/cs-408/docs:/usr/share/nginx/html:ro
   ↑ 宿主机路径             ↑ 容器路径              ↑ 只读
```

`-p` 是端口映射，`-v` 是文件挂载，不要混为一谈。

---

## 2. Docker 基本操作速查

### 2.1 安装/确认

```bash
docker --version
docker info
docker compose version
sudo systemctl status docker
```

### 2.2 镜像

```bash
docker pull nginx:1.27-alpine     # 拉镜像
docker images                     # 本地镜像
docker build -t myapp:1.0 .       # 用当前目录 Dockerfile 构建
docker tag myapp:1.0 registry.cn-hangzhou.aliyuncs.com/ns/myapp:1.0
docker push registry.cn-hangzhou.aliyuncs.com/ns/myapp:1.0
docker rmi myapp:1.0              # 删镜像（无容器使用时）
```

### 2.3 容器

```bash
docker run -d --name web -p 5000:80 nginx:1.27-alpine
docker run -d --name web \
  -p 5000:80 \
  -v "$PWD/site:/usr/share/nginx/html:ro" \
  --restart unless-stopped \
  nginx:1.27-alpine

docker ps                         # 运行中的容器
docker ps -a                      # 包括已停止的
docker logs -f --tail=100 web     # 日志
docker exec -it web sh            # 进容器
docker inspect web                # 详细配置/健康状态
docker stop web
docker start web
docker restart web
docker rm -f web                  # 删除容器
```

常用参数：

- `-d`：后台运行
- `--name`：容器名
- `-p 宿主机:容器`：端口映射
- `-v 宿主机:容器:ro`：只读挂载
- `-e KEY=VALUE`：环境变量
- `--restart unless-stopped`：开机/崩溃自动启动
- `--rm`：容器退出后自动删除（临时调试）

### 2.4 Compose

```bash
docker compose up -d              # 按 compose.yaml 启动
docker compose up -d --build      # 重新构建镜像再启动
docker compose ps                 # 状态/健康
docker compose logs -f            # 日志
docker compose restart
docker compose down               # 停止并删除容器（镜像保留）
docker compose config             # 查看最终解析后的配置
docker compose pull               # 拉取镜像
```

新版是 `docker compose`（插件），老版是 `docker-compose`（独立二进制）。优先用前者。

### 2.5 清理

```bash
docker system df                  # 磁盘占用
docker image prune -f             # 清理悬空镜像
docker container prune -f         # 清理已停止容器
# docker system prune -a 会删掉所有未使用镜像，慎用
```

---

## 3. 推荐：每个模块一个容器，端口分开

```text
公网 80/443
  │
  ▼
Caddy / Nginx 反向代理
  ├── /english/ 或 english.example.com  → 127.0.0.1:5000
  ├── /408/     或 408.example.com      → 127.0.0.1:5001
  └── /math/    或 math.example.com     → 127.0.0.1:5002
```

这样做的原因：

- 每个模块独立构建、独立重启，一个坏了不影响其他；
- 端口只在本机监听，公网只暴露 80/443；
- 以后加“政治”“专业课”只是再加一个 service；
- 反向代理统一做 HTTPS、缓存、访问日志。

如果暂时没有域名，也可以先用：

```text
http://服务器IP:5000/   English
http://服务器IP:5001/   408
http://服务器IP:5002/   数学资料
```

但安全组要逐个放行端口，长期不如 80/443 干净。

---

## 4. English 模块

English 已经有：

- `English/Dockerfile`
- `English/compose.yaml`
- `English/deploy/nginx.conf`

部署：

```bash
cd /opt/study/English
docker compose up -d --build
docker compose ps
curl -I http://127.0.0.1:5000/
```

宿主机 5000 → 容器 80。

---

## 5. 408 模块

`cs-408/docs/` 是纯静态站，适合直接用 Nginx 挂载：

```bash
cd /opt/study

docker run -d \
  --name cs408 \
  -p 5001:80 \
  -v "$PWD/cs-408/docs:/usr/share/nginx/html:ro" \
  --restart unless-stopped \
  nginx:1.27-alpine
```

访问 `http://服务器IP:5001/`。

注意：

- 这里用的是 `-v` 文件挂载，没有把 2.6GB 的 PDF 库打进镜像；
- 如果 PDF 也要在线看，建议单独做一个文件服务，不要把整个 `cs-408/` 挂到网站根目录；
- 容器内默认 Nginx 配置对静态 HTML 够用；如果要自定义缓存/健康检查，参照 `English/deploy/nginx.conf` 写一份。

如果希望它也进 Git：

```bash
# 只把 docs 纳入版本管理，PDF 继续忽略
# 在 .gitignore 中保留 cs-408/，但用强制添加或调整规则
git add -f cs-408/docs
```

更推荐把 `cs-408/docs` 拆成独立的小仓库；PDF 走 OSS。

---

## 6. 数学模块

`考研数学/` 目前主要是 PDF，没有 `index.html`。两种做法：

### 方案 A：临时文件服务（有目录列表）

```bash
docker run -d \
  --name math-files \
  -p 5002:80 \
  -v "$PWD/考研数学:/usr/share/nginx/html:ro" \
  --restart unless-stopped \
  nginx:1.27-alpine
```

默认 Nginx 没有目录列表，需要自己写配置开启 `autoindex on;`，否则访问目录会 403。

### 方案 B：OSS（更推荐）

把 PDF 上传到阿里云 OSS，开启静态网站/签名 URL，页面只放链接。这样：

- 不占 ECS 磁盘；
- 不经过 Git；
- 可以单独做权限和 CDN；
- 不会因为 3.8GB 导致 Docker 构建/传输极慢。

如果以后给数学做 HTML 索引页，再单独建一个 Nginx 容器即可。

---

## 7. 根目录 Compose 示例（可选）

等模块都准备好后，可以在仓库根目录放一个 `compose.yaml` 统一管理：

```yaml
name: study

services:
  english:
    build: ./English
    ports:
      - "5000:80"
    restart: unless-stopped

  cs408:
    image: nginx:1.27-alpine
    volumes:
      - ./cs-408/docs:/usr/share/nginx/html:ro
    ports:
      - "5001:80"
    restart: unless-stopped

  # 可选：数学 PDF 文件服务
  math:
    image: nginx:1.27-alpine
    volumes:
      - ./考研数学:/usr/share/nginx/html:ro
    ports:
      - "5002:80"
    restart: unless-stopped
```

然后：

```bash
cd /opt/study
docker compose up -d --build
docker compose ps
```

注意：这个根 Compose 里的 `cs-408/`、`考研数学/` 如果仍被 `.gitignore` 忽略，服务器上必须先通过 rsync/OSS 准备这些目录，否则容器会挂载空目录。

---

## 8. 反向代理（推荐最终形态）

用 Caddy 最简单，自动 HTTPS：

```caddyfile
english.example.com {
    reverse_proxy 127.0.0.1:5000
}

408.example.com {
    reverse_proxy 127.0.0.1:5001
}

math.example.com {
    reverse_proxy 127.0.0.1:5002
}
```

或者 Nginx：

```nginx
server {
    listen 80;
    server_name english.example.com;
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

大陆服务器绑域名通常需要 ICP 备案；只通过 IP:端口访问不涉及备案，但不适合长期公开服务。

---

## 9. Git → 服务器 → Docker 的日常流程

本地：

```bash
cd /Users/wch/workspace/Study
git status
git add English run_english.sh DEPLOY-MODULES.md .gitignore
git commit -m "add English site and Docker deployment"
git push
```

服务器：

```bash
cd /opt/study
git pull

cd English
docker compose up -d --build
docker compose ps
docker compose logs -f --tail=100
```

更新后如果页面没变：

```bash
docker compose up -d --build   # 确认重新构建
# 浏览器 Ctrl/Cmd+Shift+R 强刷
```

---

## 10. 最容易踩的坑

1. **公网打不开**：先 `curl 127.0.0.1:端口`，本机通再查阿里云安全组和防火墙。
2. **端口冲突**：`ss -lntp | grep :5000`；改 `PORT` 或停掉旧进程。
3. **Git 没推上去**：`git status` 看是否被 `.gitignore` 忽略；大 PDF 不要硬塞 Git。
4. **容器里没有文件**：检查 `-v` 的宿主机路径和 `docker exec ... ls`。
5. **改了文件不生效**：镜像里的文件不会自动跟随宿主机变化；重新 build，或用开发挂载。
6. **`permission denied` 连 Docker**：把用户加入 docker 组后重新登录。
7. **`docker compose` 找不到**：安装 `docker-compose-plugin`，或临时用 `docker-compose`。
8. **把 5000 长期暴露公网**：尽量用 Caddy/Nginx 反代到 80/443，并上 HTTPS。
