#!/usr/bin/env bash
# homegrow/prompts.sh — Prompt-specific convention checks
# Called by run.sh in prompts mode. Uses emit() / AGENTS_DIR / AGENTS / DISABLED_RULES from parent.
#
# Rule IDs (prefix: prompt/):
#   prompt/identity            Role/identity definition present
#   prompt/output-format       Output format guidance
#   prompt/dangerous-commands  No rm -rf /, curl|sh, etc.
#   prompt/injection           No prompt injection patterns
#   prompt/scope               Scope / task boundaries defined
#   prompt/examples            Concrete examples present
#   prompt/constraints         Constraints or restrictions present
#
# Citation: patterns derived from empirical analysis of 407 leaked system prompts
# across 33 companies (arxiv.org/abs/2609.31575, Sep 2026).

rule_enabled() {
  local rule_id="$1"
  [[ -z "${DISABLED_RULES:-}" ]] && return 0
  [[ ",$DISABLED_RULES," == *",$rule_id,"* ]] && return 1
  return 0
}

# Resolve item to list of .md files to check
_resolve_prompt_files() {
  local item="$1"
  local dir="$AGENTS_DIR/$item"
  if [[ -f "$dir" ]]; then
    echo "$dir"
  elif [[ -d "$dir" ]]; then
    for f in "$dir"/*.md; do
      [[ -f "$f" ]] && echo "$f"
    done
  fi
}

# ─── prompt/identity ─────────────────────────────────────────────────────────

check_prompt_identity() {
  rule_enabled "prompt/identity" || return 0
  for item in "${AGENTS[@]}"; do
    local found=0
    while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      if rg -qi '(you are|your role|act as|as an? |your (task|job|purpose|goal) is|system:|role:)' "$f" 2>/dev/null; then
        found=1; break
      fi
    done < <(_resolve_prompt_files "$item")
    if [[ "$found" -eq 1 ]]; then
      emit OK "$item" "[prompt/identity] has role definition"
    else
      emit INFO "$item" "[prompt/identity] no role/identity definition — 2.9% of prompt tokens across 33 companies define identity/persona (arxiv 2609.31575)"
    fi
  done
}

# ─── prompt/output-format ────────────────────────────────────────────────────

check_prompt_output_format() {
  rule_enabled "prompt/output-format" || return 0
  for item in "${AGENTS[@]}"; do
    local found=0
    while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      if rg -qi '(output|format|respond|response|return|reply|produce|generate|emit|write).*(json|markdown|yaml|xml|list|table|bullet|numbered|code|text|csv|html|plain)' "$f" 2>/dev/null \
        || rg -qi '(format|output|respond) (in|as|with|using|should be)' "$f" 2>/dev/null; then
        found=1; break
      fi
    done < <(_resolve_prompt_files "$item")
    if [[ "$found" -eq 1 ]]; then
      emit OK "$item" "[prompt/output-format] has output format guidance"
    else
      emit INFO "$item" "[prompt/output-format] no output format — 12.4% of top prompt content is formatting/style (arxiv 2609.31575)"
    fi
  done
}

# ─── prompt/dangerous-commands ───────────────────────────────────────────────

check_prompt_dangerous_commands() {
  rule_enabled "prompt/dangerous-commands" || return 0
  local dangerous_patterns='rm -rf\s+/|rm -rf\s+~|rm -rf\s+\$HOME|sudo\s+rm|mkfs\.|dd\s+if=|>\s*/dev/sd|chmod\s+777|curl.*\|\s*(ba)?sh|wget.*\|\s*(ba)?sh'
  for item in "${AGENTS[@]}"; do
    local found_danger=0
    while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      if rg -qP "$dangerous_patterns" "$f" 2>/dev/null; then
        local fname
        fname=$(basename "$f")
        emit ERROR "$item" "[prompt/dangerous-commands] $fname contains dangerous commands"
        found_danger=1
      fi
    done < <(_resolve_prompt_files "$item")
    [[ "$found_danger" -eq 0 ]] && emit OK "$item" "[prompt/dangerous-commands] no dangerous commands"
  done
}

# ─── prompt/injection ────────────────────────────────────────────────────────

check_prompt_injection() {
  rule_enabled "prompt/injection" || return 0
  local injection_patterns='ignore (all )?previous|disregard (all )?instructions|you are now|new instructions|forget (all|everything|your)|override (your|all)|reveal.*system prompt|leak.*system prompt|jailbreak'
  for item in "${AGENTS[@]}"; do
    local found_inject=0
    while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      if rg -qi "$injection_patterns" "$f" 2>/dev/null; then
        local fname
        fname=$(basename "$f")
        emit WARN "$item" "[prompt/injection] $fname matches injection patterns — verify defensive"
        found_inject=1
      fi
    done < <(_resolve_prompt_files "$item")
    [[ "$found_inject" -eq 0 ]] && emit OK "$item" "[prompt/injection] no injection patterns"
  done
}

# ─── prompt/scope ────────────────────────────────────────────────────────────

check_prompt_scope() {
  rule_enabled "prompt/scope" || return 0
  for item in "${AGENTS[@]}"; do
    local found=0
    while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      if rg -qi '(do not .{0,30}(use|run|call|change|modify|delete)|must not|should not|out of scope|not (for|designed|intended) |boundaries|limitation)' "$f" 2>/dev/null; then
        found=1; break
      fi
    done < <(_resolve_prompt_files "$item")
    if [[ "$found" -eq 1 ]]; then
      emit OK "$item" "[prompt/scope] has scope/task boundaries"
    else
      emit INFO "$item" "[prompt/scope] no scope boundaries — consider defining limits"
    fi
  done
}

# ─── prompt/examples ─────────────────────────────────────────────────────────

check_prompt_examples() {
  rule_enabled "prompt/examples" || return 0
  for item in "${AGENTS[@]}"; do
    local found=0
    while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      local raw_fences
      raw_fences=$(rg -c '^```' "$f" 2>/dev/null || echo 0)
      if [[ $((raw_fences / 2)) -ge 1 ]] || rg -qi '(example|e\.g\.|for instance|sample|such as)' "$f" 2>/dev/null; then
        found=1; break
      fi
    done < <(_resolve_prompt_files "$item")
    if [[ "$found" -eq 1 ]]; then
      emit OK "$item" "[prompt/examples] has examples"
    else
      emit INFO "$item" "[prompt/examples] no examples — concrete examples improve adherence"
    fi
  done
}

# ─── prompt/constraints ─────────────────────────────────────────────────────

check_prompt_constraints() {
  rule_enabled "prompt/constraints" || return 0
  for item in "${AGENTS[@]}"; do
    local total_constraints=0
    while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      local c
      c=$(rg -c '\b(NEVER|MUST NOT|DO NOT|IMPORTANT|CRITICAL|REQUIRED|STRICTLY|ALWAYS|FORBIDDEN)\b' "$f" 2>/dev/null || echo 0)
      total_constraints=$((total_constraints + c))
    done < <(_resolve_prompt_files "$item")
    if [[ "$total_constraints" -ge 1 ]]; then
      emit OK "$item" "[prompt/constraints] $total_constraints emphatic constraints"
    else
      emit INFO "$item" "[prompt/constraints] no emphatic constraints (NEVER/MUST NOT/etc.)"
    fi
  done
}

# ─── Run all prompt checks ──────────────────────────────────────────────────

check_prompt_identity
check_prompt_output_format
check_prompt_dangerous_commands
check_prompt_injection
check_prompt_scope
check_prompt_examples
check_prompt_constraints
