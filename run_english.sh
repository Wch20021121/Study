#!/usr/bin/env bash
# 仓库根目录快捷入口：转发到 English/run_english.sh
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$ROOT/English/run_english.sh" "$@"
