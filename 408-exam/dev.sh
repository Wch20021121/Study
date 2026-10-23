#!/usr/bin/env bash
# 408 模块的独立开发入口：只构建/启动 exam408，不碰英语容器。
# 用法：
#   ./408-exam/dev.sh           构建并启动 408
#   ./408-exam/dev.sh logs      跟踪 408 日志
#   ./408-exam/dev.sh status    查看 408 容器
#   ./408-exam/dev.sh restart   重启 408
#   ./408-exam/dev.sh down      清理 408 的 compose 项目
#
# 默认项目名 study-408；需要并行多套时可用：
#   COMPOSE_PROJECT_NAME=study-408-b ./408-exam/dev.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PROJECT="${COMPOSE_PROJECT_NAME:-study-408}"
ACTION="${1:-up}"

usage() {
  cat <<'USAGE'
408 模块开发脚本

用法：
  ./408-exam/dev.sh           构建并启动 408
  ./408-exam/dev.sh logs      跟踪 408 日志
  ./408-exam/dev.sh status    查看 408 容器
  ./408-exam/dev.sh restart   重启 408
  ./408-exam/dev.sh down      停止并删除 408 的 compose 项目

环境变量：
  COMPOSE_PROJECT_NAME        默认 study-408
  EXAM408_PORT                默认 40810（也可写在根目录 .env）
USAGE
}

case "$ACTION" in
  up | start)
    exec docker compose -p "$PROJECT" up -d --build exam408
    ;;
  logs)
    exec docker compose -p "$PROJECT" logs -f --tail=100 exam408
    ;;
  status | ps)
    exec docker compose -p "$PROJECT" ps
    ;;
  restart)
    exec docker compose -p "$PROJECT" restart exam408
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
