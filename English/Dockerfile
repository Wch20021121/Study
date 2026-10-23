# 英语（一）真题档案：静态站点镜像
# 基础镜像固定小版本，便于复现；升级时改这一行并重新构建。
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="kaoyan-english"
LABEL org.opencontainers.image.description="2010-2026 考研英语（一）真题全卷精讲静态站点"

# 用自己的 server 配置替换默认站点
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# 只复制静态产物；构建上下文中的 src / 数据 / 真题 Markdown 由 .dockerignore 排除
COPY frontend/ /usr/share/nginx/html/

# 统一文件权限，避免宿主机权限影响容器内 nginx 读取
RUN find /usr/share/nginx/html -type d -exec chmod 755 {} \; \
 && find /usr/share/nginx/html -type f -exec chmod 644 {} \;

EXPOSE 80
STOPSIGNAL SIGQUIT

# Alpine 自带 busybox wget；命中 /healthz 返回 ok
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
