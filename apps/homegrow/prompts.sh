#!/usr/bin/env bash
# homegrow/prompts.sh — Prompt-specific convention checks
# Called by run.sh in prompts mode. Uses same emit() / AGENTS_DIR / AGENTS from parent.
#
# Checks:
#   P1. Prompt has clear role/identity
#   P2. Prompt has output format guidance
#   P3. No dangerous commands
#   P4. No injection vulnerabilities

# ─── P1. Prompt has clear role/identity ───────────────────────────────────────

check_prompt_identity() {
  for item in "${AGENTS[@]}"; do
    local item_dir="$AGENTS_DIR/$item"
    [[ ! -d "$item_dir" ]] && continue
    for f in "$item_dir"/*.md; do
      [[ -f "$f" ]] || continue
      local fname
      fname=$(basename "$f")
      if rg -qi '(you are|your role|as an? |act as|system|identity|persona)' "$f" 2>/dev/null; then
        emit OK "$item" "$fname has role/identity definition"
      else
        emit INFO "$item" "$fname has no explicit role — consider adding 'You are...' or persona definition"
      fi
    done
  done
}

# ─── P2. Prompt has output format guidance ───────────────────────────────────

check_prompt_output_format() {
  for item in "${AGENTS[@]}"; do
    local item_dir="$AGENTS_DIR/$item"
    [[ ! -d "$item_dir" ]] && continue
    for f in "$item_dir"/*.md; do
      [[ -f "$f" ]] || continue
      local fname
      fname=$(basename "$f")
      if rg -qi '(output|format|respond|response|return|reply).*(json|markdown|yaml|xml|list|table|bullet|numbered|code)' "$f" 2>/dev/null \
        || rg -qi '(respond|format|output) (in|as|with|using)' "$f" 2>/dev/null; then
        emit OK "$item" "$fname has output format guidance"
      else
        emit INFO "$item" "$fname has no output format guidance — consider specifying expected response format"
      fi
    done
  done
}

# ─── P3. No dangerous commands ───────────────────────────────────────────────

check_prompt_dangerous_commands() {
  local dangerous_patterns='rm -rf\s+/|rm -rf\s+~|rm -rf\s+\$HOME|sudo\s+rm|mkfs\.\|dd\s+if=|>\s*/dev/sd|chmod\s+777|curl.*\|\s*(ba)?sh|wget.*\|\s*(ba)?sh'
  for item in "${AGENTS[@]}"; do
    local item_dir="$AGENTS_DIR/$item"
    [[ ! -d "$item_dir" ]] && continue
    local found=0
    for f in "$item_dir"/*.md; do
      [[ -f "$f" ]] || continue
      if rg -qP "$dangerous_patterns" "$f" 2>/dev/null; then
        local fname
        fname=$(basename "$f")
        emit ERROR "$item" "$fname contains dangerous commands (rm -rf /, sudo rm, curl|sh, etc.)"
        found=1
      fi
    done
    [[ "$found" -eq 0 ]] && emit OK "$item" "no dangerous commands found"
  done
}

# ─── P4. No injection vulnerabilities ────────────────────────────────────────

check_prompt_injection() {
  local injection_patterns='ignore (all )?previous|disregard (all )?instructions|you are now|new instructions|forget (all|everything|your)|override (your|all)|system prompt'
  for item in "${AGENTS[@]}"; do
    local item_dir="$AGENTS_DIR/$item"
    [[ ! -d "$item_dir" ]] && continue
    local found=0
    for f in "$item_dir"/*.md; do
      [[ -f "$f" ]] || continue
      if rg -qi "$injection_patterns" "$f" 2>/dev/null; then
        local fname
        fname=$(basename "$f")
        emit WARN "$item" "$fname contains text matching injection patterns — verify this is intentional"
        found=1
      fi
    done
    [[ "$found" -eq 0 ]] && emit OK "$item" "no injection patterns detected"
  done
}

# ─── Run all prompt checks ───────────────────────────────────────────────────

check_prompt_identity
check_prompt_output_format
check_prompt_dangerous_commands
check_prompt_injection
