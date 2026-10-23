#!/usr/bin/env bash
# 408 大题工位 + 英语真题档案：一键构建 / 启动 / 查看状态
# 用法：
#   sudo bash deploy.sh                 首次部署（Docker 已安装）
#   sudo bash deploy.sh --install-docker 先安装 Docker（阿里云镜像），再部署
#   sudo bash deploy.sh status|logs|down|restart
#
# 说明：脚本默认使用 40810（408）和 5001（英语）两个宿主机端口。
# 可在项目根目录 .env 中改 EXAM408_PORT / ENGLISH_PORT。

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

if [[ -f "$ROOT/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  . "$ROOT/.env"
  set +a
fi

EXAM408_PORT="${EXAM408_PORT:-40810}"
ENGLISH_PORT="${ENGLISH_PORT:-5001}"

ACTION="${1:-up}"

usage() {
  cat <<'USAGE'
408 大题工位 · Docker 一键部署

用法：
  sudo bash deploy.sh                  构建并启动两个站点
  sudo bash deploy.sh --install-docker 先安装 Docker / Compose，再部署
  bash deploy.sh status               查看容器和 HTTP 状态
  bash deploy.sh logs                 跟踪日志
  bash deploy.sh restart              重启
  bash deploy.sh down                 停止并删除容器（镜像保留）
  bash deploy.sh config               查看最终 compose 配置

端口（可在 .env 修改）：
  408 大题工位   -> 宿主机 40810
  英语真题档案   -> 宿主机 5001

公网访问前，请在阿里云安全组放行这两个 TCP 端口。
USAGE
}

log() {
  printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"
}

die() {
  echo "错误：$*" >&2
  exit 1
}

need_linux() {
  [[ "$(uname -s)" == "Linux" ]] || die "自动安装 Docker 仅支持 Linux；macOS 请先启动 Docker Desktop。"
}

install_compose_plugin() {
  if docker compose version >/dev/null 2>&1; then
    return 0
  fi
  if command -v docker-compose >/dev/null 2>&1; then
    return 0
  fi

  local arch asset dir
  case "$(uname -m)" in
    x86_64 | amd64) arch="x86_64" ;;
    aarch64 | arm64) arch="aarch64" ;;
    *) die "不支持的 CPU 架构：$(uname -m)" ;;
  esac
  asset="docker-compose-linux-${arch}"
  dir="/usr/local/lib/docker/cli-plugins"
  log "安装 Docker Compose 插件：$asset"
  mkdir -p "$dir"
  curl -fsSL "https://github.com/docker/compose/releases/latest/download/${asset}" \
    -o "${dir}/docker-compose"
  chmod +x "${dir}/docker-compose"
}

install_docker() {
  need_linux
  [[ "${EUID:-$(id -u)}" -eq 0 ]] || die "安装 Docker 需要 root，请用：sudo bash deploy.sh --install-docker"

  if command -v docker >/dev/null 2>&1; then
    log "已检测到 Docker，跳过安装"
  else
    log "使用 Docker 官方脚本安装（Aliyun 镜像）"
    command -v curl >/dev/null 2>&1 || {
      if command -v apt-get >/dev/null 2>&1; then
        apt-get update && apt-get install -y ca-certificates curl
      elif command -v dnf >/dev/null 2>&1; then
        dnf install -y ca-certificates curl
      elif command -v yum >/dev/null 2>&1; then
        yum install -y ca-certificates curl
      else
        die "找不到 curl，请先安装 curl"
      fi
    }
    curl -fsSL https://get.docker.com | sh -s -- --mirror Aliyun
  fi

  if command -v systemctl >/dev/null 2>&1; then
    systemctl enable --now docker
  fi

  install_compose_plugin

  if [[ -n "${SUDO_USER:-}" ]]; then
    usermod -aG docker "$SUDO_USER" || true
    log "已尝试把 $SUDO_USER 加入 docker 组；重新登录后可不加 sudo"
  fi
}

ensure_docker() {
  command -v docker >/dev/null 2>&1 || die "未安装 Docker。首次部署请运行：sudo bash deploy.sh --install-docker"
  if ! docker info >/dev/null 2>&1; then
    if command -v systemctl >/dev/null 2>&1 && [[ "${EUID:-$(id -u)}" -eq 0 ]]; then
      log "Docker 守护进程未运行，尝试启动"
      systemctl start docker
    fi
  fi
  docker info >/dev/null 2>&1 || die "无法连接 Docker。请启动 Docker Desktop，或执行：sudo systemctl start docker；权限问题请把用户加入 docker 组。"

  if docker compose version >/dev/null 2>&1; then
    COMPOSE=(docker compose)
  elif command -v docker-compose >/dev/null 2>&1; then
    COMPOSE=(docker-compose)
  else
    die "找不到 Docker Compose。可运行：sudo bash deploy.sh --install-docker，或手动安装 docker-compose-plugin。"
  fi
}

validate_ports() {
  [[ "$EXAM408_PORT" =~ ^[0-9]+$ ]] || die "EXAM408_PORT 必须是数字：$EXAM408_PORT"
  [[ "$ENGLISH_PORT" =~ ^[0-9]+$ ]] || die "ENGLISH_PORT 必须是数字：$ENGLISH_PORT"
  (( EXAM408_PORT >= 1 && EXAM408_PORT <= 65535 )) || die "EXAM408_PORT 越界：$EXAM408_PORT"
  (( ENGLISH_PORT >= 1 && ENGLISH_PORT <= 65535 )) || die "ENGLISH_PORT 越界：$ENGLISH_PORT"
  [[ "$EXAM408_PORT" != "$ENGLISH_PORT" ]] || die "两个站点不能使用同一个宿主机端口"
}

http_ok() {
  local url="$1"
  if command -v curl >/dev/null 2>&1; then
    curl -fsS --max-time 2 "$url" >/dev/null 2>&1
  elif command -v wget >/dev/null 2>&1; then
    wget -qO- --timeout=2 "$url" >/dev/null 2>&1
  else
    return 1
  fi
}

wait_http() {
  local name="$1"
  local url="$2"
  local tries="${3:-60}"
  local i
  for ((i = 1; i <= tries; i++)); do
    if http_ok "$url"; then
      log "$name 就绪：$url"
      return 0
    fi
    sleep 2
  done
  log "$name 未在预期时间内就绪"
  return 1
}

public_ip() {
  local ip=""
  if command -v curl >/dev/null 2>&1; then
    ip="$(curl -fsS --max-time 1 http://100.100.100.200/latest/meta-data/eipv4 2>/dev/null || true)"
    if [[ -z "$ip" ]]; then
      ip="$(curl -fsS --max-time 1 http://100.100.100.200/latest/meta-data/public-ipv4 2>/dev/null || true)"
    fi
  fi
  printf '%s' "$ip"
}

print_urls() {
  local ip
  ip="$(public_ip)"
  echo
  echo "============================================================"
  echo " 408 大题工位"
  echo "   本机：http://127.0.0.1:${EXAM408_PORT}/"
  if [[ -n "$ip" ]]; then
    echo "   公网：http://${ip}:${EXAM408_PORT}/"
  else
    echo "   公网：http://<服务器公网IP>:${EXAM408_PORT}/"
  fi
  echo
  echo " 英语真题档案"
  echo "   本机：http://127.0.0.1:${ENGLISH_PORT}/"
  if [[ -n "$ip" ]]; then
    echo "   公网：http://${ip}:${ENGLISH_PORT}/"
  else
    echo "   公网：http://<服务器公网IP>:${ENGLISH_PORT}/"
  fi
  echo
  echo " 阿里云安全组需放行入方向 TCP ${EXAM408_PORT} 和 ${ENGLISH_PORT}"
  echo " 服务器本机防火墙（如有）也要放行这两个端口"
  echo "============================================================"
}

up() {
  ensure_docker
  validate_ports
  log "构建并启动：408 -> ${EXAM408_PORT}，英语 -> ${ENGLISH_PORT}"
  "${COMPOSE[@]}" -f "$ROOT/compose.yaml" up -d --build
  "${COMPOSE[@]}" -f "$ROOT/compose.yaml" ps

  local ok=1
  wait_http "408 大题工位" "http://127.0.0.1:${EXAM408_PORT}/healthz" 60 || ok=0
  wait_http "英语真题档案" "http://127.0.0.1:${ENGLISH_PORT}/healthz" 60 || ok=0

  if [[ "$ok" -eq 0 ]]; then
    echo
    echo "最近日志："
    "${COMPOSE[@]}" -f "$ROOT/compose.yaml" logs --tail=80 || true
    die "有站点未通过健康检查，请查看上面的日志。"
  fi

  print_urls
}

status() {
  ensure_docker
  validate_ports
  "${COMPOSE[@]}" -f "$ROOT/compose.yaml" ps
  echo
  printf '408  /healthz : '
  http_ok "http://127.0.0.1:${EXAM408_PORT}/healthz" && echo "ok" || echo "FAIL"
  printf '英语 /healthz : '
  http_ok "http://127.0.0.1:${ENGLISH_PORT}/healthz" && echo "ok" || echo "FAIL"
}

logs() {
  ensure_docker
  "${COMPOSE[@]}" -f "$ROOT/compose.yaml" logs -f --tail=100
}

down() {
  ensure_docker
  "${COMPOSE[@]}" -f "$ROOT/compose.yaml" down
}

restart() {
  ensure_docker
  "${COMPOSE[@]}" -f "$ROOT/compose.yaml" restart
}

case "$ACTION" in
  up | start | deploy)
    up
    ;;
  --install-docker | install-docker)
    install_docker
    up
    ;;
  status)
    status
    ;;
  logs)
    logs
    ;;
  down | stop)
    down
    ;;
  restart)
    restart
    ;;
  config)
    ensure_docker
    "${COMPOSE[@]}" -f "$ROOT/compose.yaml" config
    ;;
  -h | --help | help)
    usage
    ;;
  *)
    usage
    die "未知操作：$ACTION"
    ;;
esac
