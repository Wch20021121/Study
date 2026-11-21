# 2027 考研政治《一页纸》知识点手册：单页翻阅静态站
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="study-politics"
LABEL org.opencontainers.image.description="2027 考研政治一页纸知识点手册，单页翻阅"

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/

RUN find /usr/share/nginx/html -type d -exec chmod 755 {} \; \
 && find /usr/share/nginx/html -type f -exec chmod 644 {} \;

EXPOSE 80
STOPSIGNAL SIGQUIT

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
