#!/usr/bin/env bash
# 英语（一）真题档案：Linux 单机静态服务脚本
# 用法：./run_english.sh {start|stop|restart|status|logs|fg}
# 环境变量：PORT（默认 5000）、BIND（默认 0.0.0.0）、PYTHON（默认 python3）
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$APP_DIR/frontend"
PID_FILE="$APP_DIR/.run_english.pid"
LOG_FILE="$APP_DIR/.run_english.log"
PORT="${PORT:-5000}"
BIND="${BIND:-0.0.0.0}"
PYTHON="${PYTHON:-python3}"

usage() {
  cat <<'USAGE'
英语（一）真题档案 · 静态服务

用法：
  ./run_english.sh start      后台启动（默认 0.0.0.0:5000）
  ./run_english.sh stop       停止
  ./run_english.sh restart    重启
  ./run_english.sh status     查看状态
  ./run_english.sh logs       实时查看日志
  ./run_english.sh fg         前台运行（Ctrl+C 停止）

环境变量：
  PORT=5000                  监听端口
  BIND=0.0.0.0               监听地址
  PYTHON=python3             Python 解释器

示例：
  PORT=8080 ./run_english.sh start
  BIND=127.0.0.1 ./run_english.sh fg

公网访问还需要在阿里云安全组放行对应 TCP 端口。
USAGE
}

die() { echo "错误：$*" >&2; exit 1; }

validate_port() {
  [[ "$PORT" =~ ^[0-9]+$ ]] || die "PORT 必须是数字：$PORT"
  (( PORT >= 1 && PORT <= 65535 )) || die "PORT 必须在 1-65535 之间：$PORT"
}

check_python() {
  command -v "$PYTHON" >/dev/null 2>&1 || die "找不到 $PYTHON；请安装 python3，或改用 Docker 部署"
  "$PYTHON" - <<'PY' >/dev/null 2>&1 || die "Python 不可用"
import sys
sys.exit(0 if sys.version_info >= (3, 7) else 1)
PY
}

# 端口被占用时返回 0，未被占用返回 1
port_in_use() {
  "$PYTHON" - "$PORT" <<'PY' >/dev/null 2>&1
import socket, sys
port = int(sys.argv[1])
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
try:
    s.bind(("0.0.0.0", port))
except OSError:
    sys.exit(0)   # 被占用
else:
    sys.exit(1)   # 可用
finally:
    s.close()
PY
}

is_running() {
  [[ -f "$PID_FILE" ]] || return 1
  local pid
  pid="$(cat "$PID_FILE" 2>/dev/null || true)"
  [[ "$pid" =~ ^[0-9]+$ ]] || return 1
  kill -0 "$pid" 2>/dev/null
}

get_url() {
  echo "http://127.0.0.1:${PORT}/"
}

print_public_hint() {
  local eip=""
  if command -v curl >/dev/null 2>&1; then
    # 阿里云 ECS 元数据服务；非 ECS 环境会快速失败，不影响启动
    eip="$(curl -fsS --max-time 1 http://100.100.100.200/latest/meta-data/eipv4 2>/dev/null || true)"
  fi
  echo
  echo "本机访问：$(get_url)"
  if [[ -n "$eip" ]]; then
    echo "公网访问：http://${eip}:${PORT}/"
  else
    echo "公网访问：http://<服务器公网IP>:${PORT}/"
  fi
  echo "阿里云安全组需放行入方向 TCP ${PORT}；服务器本机防火墙也要放行。"
  echo "日志：$LOG_FILE"
}

start() {
  validate_port
  check_python
  [[ -f "$FRONTEND_DIR/index.html" ]] || die "找不到 $FRONTEND_DIR/index.html"

  if is_running; then
    echo "已在运行，PID $(cat "$PID_FILE")，地址 $(get_url)"
    return 0
  fi

  rm -f "$PID_FILE"

  if port_in_use; then
    die "端口 ${PORT} 已被占用。用 'ss -lntp | grep :${PORT}' 查看进程，或换 PORT。"
  fi

  echo "启动静态服务：${BIND}:${PORT} -> ${FRONTEND_DIR}"
  (
    cd "$FRONTEND_DIR"
    nohup env PYTHONUNBUFFERED=1 "$PYTHON" -m http.server "$PORT" --bind "$BIND" \
      >>"$LOG_FILE" 2>&1 &
    echo $! >"$PID_FILE"
  )

  local pid
  pid="$(cat "$PID_FILE")"
  sleep 1

  if ! kill -0 "$pid" 2>/dev/null; then
    echo "启动失败，最近日志：" >&2
    tail -n 20 "$LOG_FILE" >&2 || true
    rm -f "$PID_FILE"
    exit 1
  fi

  if command -v curl >/dev/null 2>&1; then
    if curl -fsS --max-time 3 "$(get_url)" >/dev/null 2>&1; then
      echo "启动成功，PID ${pid}"
    else
      echo "进程已启动，但 HTTP 检查未通过；请查看日志。" >&2
      print_public_hint
      exit 1
    fi
  else
    echo "启动成功，PID ${pid}（未安装 curl，跳过 HTTP 检查）"
  fi

  print_public_hint
}

stop() {
  if ! is_running; then
    echo "未在运行（没有有效 PID 文件）。"
    rm -f "$PID_FILE"
    return 0
  fi

  local pid
  pid="$(cat "$PID_FILE")"
  echo "停止 PID ${pid} ..."
  kill "$pid" 2>/dev/null || true

  for _ in $(seq 1 20); do
    if ! kill -0 "$pid" 2>/dev/null; then
      rm -f "$PID_FILE"
      echo "已停止。"
      return 0
    fi
    sleep 0.2
  done

  echo "进程未退出，强制结束。" >&2
  kill -9 "$pid" 2>/dev/null || true
  rm -f "$PID_FILE"
  echo "已停止。"
}

status() {
  validate_port
  if is_running; then
    echo "状态：运行中"
    echo "PID：$(cat "$PID_FILE")"
    echo "地址：$(get_url)"
    if command -v curl >/dev/null 2>&1; then
      local code
      code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 3 "$(get_url)" || true)"
      echo "HTTP：${code:-无响应}"
    fi
  else
    echo "状态：未运行"
    if port_in_use; then
      echo "注意：端口 ${PORT} 当前被其他进程占用。"
    fi
  fi
}

logs() {
  [[ -f "$LOG_FILE" ]] || die "还没有日志：$LOG_FILE"
  tail -n 100 -f "$LOG_FILE"
}

foreground() {
  validate_port
  check_python
  [[ -f "$FRONTEND_DIR/index.html" ]] || die "找不到 $FRONTEND_DIR/index.html"
  if port_in_use; then
    die "端口 ${PORT} 已被占用。"
  fi
  echo "前台运行：http://${BIND}:${PORT}/ （Ctrl+C 停止）"
  cd "$FRONTEND_DIR"
  exec "$PYTHON" -m http.server "$PORT" --bind "$BIND"
}

case "${1:-start}" in
  start) start ;;
  stop) stop ;;
  restart) stop; start ;;
  status) status ;;
  logs) logs ;;
  fg|foreground) foreground ;;
  -h|--help|help) usage ;;
  *) usage; exit 2 ;;
esac
