#!/usr/bin/env bash
#
# Context Engineering Kit - 安装脚本
#
# 用法:
#   ./install.sh                    安装到当前目录
#   ./install.sh /path/to/project   安装到指定项目
#
set -euo pipefail

# 确定脚本所在目录（兼容符号链接）
SCRIPT_DIR="$(cd "$(dirname "$(readlink -f "$0" 2>/dev/null || echo "$0")")" && pwd)"
TARGET_DIR="$(cd "${1:-.}" && pwd)"

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

created=()
skipped=()

log_created() { created+=("$1"); echo -e "  ${GREEN}+${NC} $1"; }
log_skipped() { skipped+=("$1"); echo -e "  ${YELLOW}·${NC} $1 (已存在，跳过)"; }

echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Context Engineering Kit 安装器${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
echo ""
echo "目标项目: $TARGET_DIR"
echo ""

# ---- 1. 安装 Claude Code 命令 ----
echo -e "${CYAN}[1/3] 安装 Claude Code 命令 → .claude/commands/${NC}"

COMMANDS_DIR="$TARGET_DIR/.claude/commands"
mkdir -p "$COMMANDS_DIR"

for cmd in "$SCRIPT_DIR/commands/"*.md; do
  filename="$(basename "$cmd")"
  dest="$COMMANDS_DIR/$filename"
  if [ -f "$dest" ]; then
    log_skipped ".claude/commands/$filename"
  else
    cp "$cmd" "$dest"
    log_created ".claude/commands/$filename"
  fi
done

echo ""

# ---- 2. 安装 memory 模板 ----
echo -e "${CYAN}[2/3] 安装 memory 模板 → memory/${NC}"

MEMORY_DIR="$TARGET_DIR/memory"
mkdir -p "$MEMORY_DIR"

for mem in "$SCRIPT_DIR/templates/memory/"*.md; do
  filename="$(basename "$mem")"
  dest="$MEMORY_DIR/$filename"
  if [ -f "$dest" ]; then
    log_skipped "memory/$filename"
  else
    cp "$mem" "$dest"
    log_created "memory/$filename"
  fi
done

echo ""

# ---- 3. 安装 prompts 模板 + 根级文档 ----
echo -e "${CYAN}[3/3] 安装 prompts 模板 + 根级文档${NC}"

PROMPTS_DIR="$TARGET_DIR/prompts"
mkdir -p "$PROMPTS_DIR"

for p in "$SCRIPT_DIR/templates/prompts/"*.md; do
  filename="$(basename "$p")"
  dest="$PROMPTS_DIR/$filename"
  if [ -f "$dest" ]; then
    log_skipped "prompts/$filename"
  else
    cp "$p" "$dest"
    log_created "prompts/$filename"
  fi
done

# 根级模板文件
for root_file in "$SCRIPT_DIR/templates/"*.md; do
  filename="$(basename "$root_file")"
  dest="$TARGET_DIR/$filename"
  if [ -f "$dest" ]; then
    log_skipped "$filename"
  else
    cp "$root_file" "$dest"
    log_created "$filename"
  fi
done

echo ""

# ---- 安装报告 ----
echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
echo -e "  ${GREEN}新建 ${#created[@]} 个文件${NC}，${YELLOW}跳过 ${#skipped[@]} 个已有文件${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
echo ""
echo "下一步:"
echo "  1. 编辑 CLAUDE.md，填入项目基本信息"
echo "  2. 编辑 prompts/coding_rules.md 和 style_guide.md"
echo "  3. 首次 git commit 建立基线"
echo ""
echo "日常工作:"
echo "  /start          恢复工作上下文"
echo "  /wrap           下班自动总结"
echo "  /init-context   重新生成/补齐缺失文件"
echo ""
