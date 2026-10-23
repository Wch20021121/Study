#!/usr/bin/env bash
# 英语模块的独立开发入口：只构建/启动 english，不碰 408 容器。
# 用法：
#   ./English/dev.sh           构建并启动英语
#   ./English/dev.sh logs      跟踪英语日志
#   ./English/dev.sh status    查看英语容器
#   ./English/dev.sh restart   重启英语
#   ./English/dev.sh down      清理英语的 compose 项目
#
# 默认项目名 study-english；需要并行多套时可用：
#   COMPOSE_PROJECT_NAME=study-english-b ./English/dev.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PROJECT="${COMPOSE_PROJECT_NAME:-study-english}"
ACTION="${1:-up}"

usage() {
  cat <<'USAGE'
英语模块开发脚本

用法：
  ./English/dev.sh           构建并启动英语
  ./English/dev.sh logs      跟踪英语日志
  ./English/dev.sh status    查看英语容器
  ./English/dev.sh restart   重启英语
  ./English/dev.sh down      停止并删除英语的 compose 项目

环境变量：
  COMPOSE_PROJECT_NAME        默认 study-english
  ENGLISH_PORT                默认 5001（也可写在根目录 .env）
USAGE
}

case "$ACTION" in
  up | start)
    exec docker compose -p "$PROJECT" up -d --build english
    ;;
  logs)
    exec docker compose -p "$PROJECT" logs -f --tail=100 english
    ;;
  status | ps)
    exec docker compose -p "$PROJECT" ps
    ;;
  restart)
    exec docker compose -p "$PROJECT" restart english
    ;;
  down | stop)
    exec docker compose -p "$PROJECT" down --remove-orphans
    ;;
  -h | --help | help)
    usage
    ;;
  *)
    usage
    exit 1
    ;;
esac
