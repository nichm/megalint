#!/usr/bin/env bash
# homegrow/skills.sh — Skill-specific convention checks
# Called by run.sh in skills mode. Uses same emit() / AGENTS_DIR / AGENTS from parent.
#
# Checks:
#   S1. SKILL.md exists
#   S2. SKILL.md has description
#   S3. SKILL.md has when-to-use guidance
#   S4. SKILL.md has structured headings
#   S5. No dangerous commands
#   S6. Skill has actionable instructions
#   S7. No injection vulnerabilities
#   S8. Reasonable file count

# ─── S1. SKILL.md exists ─────────────────────────────────────────────────────

check_skill_file_exists() {
  for skill in "${AGENTS[@]}"; do
    local skill_dir="$AGENTS_DIR/$skill"
    [[ ! -d "$skill_dir" ]] && continue
    if [[ -f "$skill_dir/SKILL.md" ]]; then
      emit OK "$skill" "SKILL.md exists"
    else
      emit ERROR "$skill" "SKILL.md missing — every skill must have a SKILL.md file"
    fi
  done
}

# ─── S2. SKILL.md has a description/purpose ──────────────────────────────────

check_skill_description() {
  for skill in "${AGENTS[@]}"; do
    local f="$AGENTS_DIR/$skill/SKILL.md"
    [[ ! -f "$f" ]] && continue
    if rg -qi '(description|purpose|what|overview|about)' "$f" 2>/dev/null \
      || head -5 "$f" | rg -q '.' 2>/dev/null; then
      local first_line
      first_line=$(head -1 "$f" | tr -d '#' | xargs)
      if [[ ${#first_line} -gt 5 ]]; then
        emit OK "$skill" "SKILL.md has description"
      else
        emit WARN "$skill" "SKILL.md has no clear description — add a summary of what this skill does"
      fi
    else
      emit WARN "$skill" "SKILL.md missing description — add a clear purpose statement"
    fi
  done
}

# ─── S3. SKILL.md has when-to-use guidance ───────────────────────────────────

check_skill_when_to_use() {
  for skill in "${AGENTS[@]}"; do
    local f="$AGENTS_DIR/$skill/SKILL.md"
    [[ ! -f "$f" ]] && continue
    if rg -qi '(when to use|use (this|when)|trigger|invoke|run this|apply this|activate)' "$f" 2>/dev/null; then
      emit OK "$skill" "SKILL.md has when-to-use guidance"
    else
      emit WARN "$skill" "SKILL.md missing when-to-use guidance — agents need to know WHEN to invoke this skill"
    fi
  done
}

# ─── S4. SKILL.md has structured headings ─────────────────────────────────────

check_skill_structure() {
  for skill in "${AGENTS[@]}"; do
    local f="$AGENTS_DIR/$skill/SKILL.md"
    [[ ! -f "$f" ]] && continue
    local heading_count
    heading_count=$(rg -c '^#+\s' "$f" 2>/dev/null || echo 0)
    if [[ "$heading_count" -ge 2 ]]; then
      emit OK "$skill" "SKILL.md has $heading_count sections"
    elif [[ "$heading_count" -eq 1 ]]; then
      emit INFO "$skill" "SKILL.md has only 1 heading — consider adding more structure"
    else
      emit WARN "$skill" "SKILL.md has no headings — structured skills with clear sections are more reliably followed"
    fi
  done
}

# ─── S5. No dangerous commands in skill files ────────────────────────────────

check_skill_dangerous_commands() {
  local dangerous_patterns='rm -rf\s+/|rm -rf\s+~|rm -rf\s+\$HOME|sudo\s+rm|mkfs\.\|dd\s+if=|>\s*/dev/sd|chmod\s+777|curl.*\|\s*(ba)?sh|wget.*\|\s*(ba)?sh'
  for skill in "${AGENTS[@]}"; do
    local skill_dir="$AGENTS_DIR/$skill"
    [[ ! -d "$skill_dir" ]] && continue
    local found=0
    for f in "$skill_dir"/*.md; do
      [[ -f "$f" ]] || continue
      if rg -qP "$dangerous_patterns" "$f" 2>/dev/null; then
        local fname
        fname=$(basename "$f")
        emit ERROR "$skill" "$fname contains dangerous commands (rm -rf /, sudo rm, curl|sh, etc.)"
        found=1
      fi
    done
    [[ "$found" -eq 0 ]] && emit OK "$skill" "no dangerous commands found"
  done
}

# ─── S6. Skill has clear instructions (not just prose) ───────────────────────

check_skill_actionable() {
  for skill in "${AGENTS[@]}"; do
    local f="$AGENTS_DIR/$skill/SKILL.md"
    [[ ! -f "$f" ]] && continue
    local has_steps has_bullets has_code
    has_steps=$(rg -c '^\d+\.\s' "$f" 2>/dev/null || echo 0)
    has_bullets=$(rg -c '^[-*]\s' "$f" 2>/dev/null || echo 0)
    has_code=$(rg -c '^```' "$f" 2>/dev/null || echo 0)
    local total=$((has_steps + has_bullets + has_code))
    if [[ "$total" -ge 3 ]]; then
      emit OK "$skill" "SKILL.md has actionable content ($has_steps steps, $has_bullets bullets, $has_code code blocks)"
    elif [[ "$total" -ge 1 ]]; then
      emit INFO "$skill" "SKILL.md has some structure — consider adding more steps/examples"
    else
      emit WARN "$skill" "SKILL.md is prose-only — add numbered steps, bullet lists, or code examples for clarity"
    fi
  done
}

# ─── S7. Skill has no injection vulnerabilities ──────────────────────────────

check_skill_injection() {
  local injection_patterns='ignore (all )?previous|disregard (all )?instructions|you are now|new instructions|forget (all|everything|your)|override (your|all)|system prompt'
  for skill in "${AGENTS[@]}"; do
    local skill_dir="$AGENTS_DIR/$skill"
    [[ ! -d "$skill_dir" ]] && continue
    local found=0
    for f in "$skill_dir"/*.md; do
      [[ -f "$f" ]] || continue
      if rg -qi "$injection_patterns" "$f" 2>/dev/null; then
        local fname
        fname=$(basename "$f")
        emit WARN "$skill" "$fname contains text matching injection patterns — verify this is intentional (defensive instruction vs vulnerability)"
        found=1
      fi
    done
    [[ "$found" -eq 0 ]] && emit OK "$skill" "no injection patterns detected"
  done
}

# ─── S8. Skill files are not too numerous ─────────────────────────────────────

check_skill_file_count() {
  for skill in "${AGENTS[@]}"; do
    local skill_dir="$AGENTS_DIR/$skill"
    [[ ! -d "$skill_dir" ]] && continue
    local md_count=0
    for f in "$skill_dir"/*.md; do
      [[ -f "$f" ]] && ((md_count++))
    done
    if [[ "$md_count" -le 5 ]]; then
      emit OK "$skill" "$md_count .md file(s)"
    elif [[ "$md_count" -le 10 ]]; then
      emit INFO "$skill" "$md_count .md files — consider consolidating"
    else
      emit WARN "$skill" "$md_count .md files — skills should be focused; split into multiple skills if scope is too broad"
    fi
  done
}

# ─── Run all skill checks ────────────────────────────────────────────────────

check_skill_file_exists
check_skill_description
check_skill_when_to_use
check_skill_structure
check_skill_dangerous_commands
check_skill_actionable
check_skill_injection
check_skill_file_count
