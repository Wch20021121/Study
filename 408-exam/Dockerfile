# 408 大题工位：纯静态站点镜像
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="study-408-exam"
LABEL org.opencontainers.image.description="408 综合大题拆解：组成原理、计算机网络、操作系统与知识线路图"

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/

RUN find /usr/share/nginx/html -type d -exec chmod 755 {} \; \
 && find /usr/share/nginx/html -type f -exec chmod 644 {} \;

EXPOSE 80
STOPSIGNAL SIGQUIT

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
