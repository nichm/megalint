# Megalint

AI prompt, skill, and agent linter. Four complementary tools run in parallel, producing a single merged report with consistent scoring. Supports AI skills, system prompts, and agent workspaces.

## Quick Start

```bash
# Skills (primary use case)
./megalint.sh --mode skills ~/.cursor/skills/           # Lint all skills
./megalint.sh --mode skills ~/.cursor/skills/bugfix      # Lint one skill
./megalint.sh ~/.cursor/skills/stop-slop                 # Auto-detect: skills mode

# Prompts
./megalint.sh my-system-prompt.md                        # Lint a prompt file
./megalint.sh AGENTS.md CLAUDE.md                        # Multiple prompt files

# Agent workspaces (legacy)
./megalint.sh --mode agents --agents-dir src/agents      # OpenClaw workspace

# Common options
./megalint.sh --yes                                      # Include Prompt Hardener (API cost)
./megalint.sh --format both --yes                        # Save JSON + Markdown reports
./megalint.sh --help                                     # All options
```

## Modes

| Mode | Description | Auto-detect |
|------|-------------|-------------|
| `--mode skills` | Skill directories with SKILL.md | Has `SKILL.md` |
| `--mode prompts` | Individual .md prompt files | Fallback |
| `--mode agents` | OpenClaw MDS agent workspaces | Has `AGENTS.md` + `SOUL.md` |
| `--mode auto` | Detect from input (default) | — |

## Why Four Tools?

Each tool solves a different layer of prompt quality. No single tool covers everything.

| Capability | AgentLinter | PromptLint | Conventions | Prompt Hardener |
|-----------|:-----------:|:----------:|:-----------:|:---------------:|
| **Type** | Static (Node.js) | Static (Python) | Static (Bash) | LLM-powered (API) |
| **Scope** | Whole workspace | Per-file | Cross-item | Per-item |
| **Cost** | Free | Free | Free | ~$0.02/item |
| **Speed** | ~1s/item | ~0.5s/file | Instant | ~5s/item |
| | | | | |
| File structure / naming | **Yes** | | **Yes** | |
| Required files present | | | **Yes** | |
| Section hierarchy | **Yes** | | | |
| Vague instructions / passive voice | **Yes** | **Yes** | | |
| Contradictions / conflicting directives | **Yes** | **Yes** | | |
| Ambiguous pronouns / naked conditionals | **Yes** | | | |
| Token cost estimation | | **Yes** | | |
| Secret patterns (API keys, tokens, PII) | **Yes** | **Yes** | | |
| Injection patterns (OWASP regex) | | **Yes** | | |
| Prompt injection defense | | | | **Yes** |
| Persona switching defense | | | | **Yes** |
| Role consistency | | | | **Yes** |
| Skill SKILL.md structure | | | **Yes** | |
| Skill when-to-use guidance | | | **Yes** | |
| Skill dangerous commands | | | **Yes** | |
| Skill actionable instructions | | | **Yes** | |
| Memory / session handoff | **Yes** | | | |
| Skill safety (dangerous commands) | **Yes** | | | |

### Skills mode convention checks

In skills mode, the convention checker validates skill quality:

| Check | Severity | Description |
|-------|----------|-------------|
| skill_file_exists | ERROR | SKILL.md must exist in each skill dir |
| skill_description | WARN | SKILL.md has a clear description/purpose |
| skill_when_to_use | WARN | SKILL.md has when-to-use guidance |
| skill_structure | WARN | SKILL.md has structured headings |
| skill_dangerous_commands | ERROR | No dangerous commands (rm -rf /, curl\|sh, etc.) |
| skill_actionable | WARN | SKILL.md has steps, bullets, or code examples |
| skill_injection | WARN | No prompt injection patterns |
| skill_file_count | INFO | Reasonable number of files per skill |

### Agents mode convention checks (legacy)

In agents mode, the full OpenClaw convention suite runs (31+ checks). See `RULES_GUIDE.md`.

**In short:**
- **AgentLinter** = ESLint for prompts (structure + clarity + security rules)
- **PromptLint** = per-file quality scanner (clarity + cost + injection patterns)
- **Conventions** = mode-specific consistency checks (skills, prompts, or agents)
- **Prompt Hardener** = active security testing via LLM (finds what regex can't)

## Options

| Flag | Description |
|------|-------------|
| `--mode MODE` | Linting mode: `auto`, `skills`, `prompts`, `agents` (default: auto) |
| `-y, --yes` | Skip cost confirmation for Prompt Hardener |
| `-m, --model MODEL` | Override model (`claude-sonnet-4-6` or `claude-opus-4-6`) |
| `-f, --format FORMAT` | Output report: `json`, `md`, or `both` |
| `--pass-threshold N` | Minimum score to pass (default: 70) |
| `--no-blocking` | Don't fail on convention errors regardless of score |
| `-d, --agents-dir DIR` | Override input directory |
| `-c, --config FILE` | Load alternate config file |
| `-h, --help` | Show help |
| `[path...]` | Lint specific items (default: all in directory) |

## Configuration

`megalint.conf` controls weights, thresholds, and grade scale. All values are editable:

```bash
WEIGHT_STRUCTURE=25     # AgentLinter — workspace structure, clarity, rules
WEIGHT_QUALITY=18       # PromptLint — per-file clarity (0-10 scaled to 0-100)
WEIGHT_CONSISTENCY=22   # Home-Grow — cross-agent consistency checks
WEIGHT_SECURITY=20      # Prompt Hardener — LLM-powered injection testing
WEIGHT_BUDGET=15        # Token Budget — per-file length vs budget scoring

PASS_THRESHOLD=70       # minimum score to pass
BLOCKING_ERRORS=true    # any ERROR = fail regardless of score
```

CLI flags override config values for a single run.

## Output

Reports are saved to `dev-tools/megalint/.reports/` (gitignored).

Each run produces:
- **Log file** — `lint-run_{commit}_{timestamp}.log` (always)
- **JSON report** — `report_{commit}_{timestamp}.json` (with `--format json` or `both`)
- **Markdown report** — `report_{commit}_{timestamp}.md` (with `--format md` or `both`)

Intermediate files (tool stdout, Hardener evals) go to a temp directory and are cleaned up automatically (trap on EXIT/INT/TERM).

### Version Tracking

Every report includes git metadata for tracking progress over time:

```json
{
  "meta": {
    "run_id": "0c41d44_2026-02-20_16-15-47",
    "git": {
      "commit": "0c41d44",
      "branch": "main",
      "dirty": false,
      "message": "Add passportio agent and update shared configs"
    }
  }
}
```

Run ID = `{commit}_{timestamp}`, so you can compare scores across commits.

### Unified Report Format

All four tools merge into a single consistent structure:

```json
{
  "meta": { "run_id", "timestamp", "git": {...}, "model", "agents_scanned" },
  "scoring": {
    "combined": 84.2, "grade": "B+", "passed": true,
    "pass_threshold": 70, "blocking_errors": true,
    "pillars": {
      "structure": { "score": 84, "weight": 25, "tool": "AgentLinter" },
      "quality": { "score": 87.3, "weight": 18, "tool": "PromptLint" },
      "consistency": { "score": 90, "weight": 22, "tool": "Home-Grow" },
      "security": { "score": 40, "weight": 20, "tool": "Prompt Hardener" },
      "budget": { "score": 99, "weight": 15, "tool": "Token Budget" }
    },
    "quality_detail": { "clarity": 8.2, "security": 9.5, "cost": 8.5 }
  },
  "agents": {
    "kodo": {
      "agentlinter": { "score": 84, "categories": {...}, "diagnostics": [...] },
      "promptlint": { "AGENTS.md": { "clarity": 7.2, "security": 10, ... }, ... },
      "prompt_hardener": { "Spotlighting": {...}, "Instruction Defense": {...}, ... }
    }
  },
  "homegrow": { "passes": 58, "warnings": 4, "errors": 1, "checks": [...] }
}
```

## Dependencies

- **Node.js** — AgentLinter
- **ripgrep (rg)** — Home-Grow checks
- **Python 3** + venvs — PromptLint, Prompt Hardener

Install: `brew install node ripgrep` (macOS). Missing deps fail early with clear errors.

## Environment Setup

```bash
cp dev-tools/megalint/.env.example dev-tools/megalint/.env
# Edit .env → set ANTHROPIC_API_KEY
```

Only needed for Tool 4 (Prompt Hardener). Tools 1-3 are free and run without keys.

## Models

| Model | Input $/MTok | Output $/MTok | Best for |
|-------|:------------:|:-------------:|----------|
| `claude-sonnet-4-6` | $3 | $15 | Fast default, good accuracy |
| `claude-opus-4-6` | $5 | $25 | Deepest analysis |

## Scoring

All five pillars contribute to the combined score via weighted pillars:

| Pillar | Tool | How | Default Weight |
|--------|------|-----|:-:|
| Structure | AgentLinter | Raw 0-100 score | 25% |
| Quality | PromptLint | avg(clarity, security, cost) * 10 → 0-100 | 18% |
| Consistency | Home-Grow | (OK×1.0 + WARN×0.5 + ERR×0.0) / total × 100 | 22% |
| Security | Prompt Hardener | (satisfied_checks / total_checks) * 100 | 20% |
| Token Budget | Length check | Per-file tokens vs budget (LOAD_WEIGHTS) | 15% |

When a tool is skipped (e.g., Hardener without API key), its weight redistributes proportionally.

**Pass/fail:** Score >= threshold (default 70) AND no blocking errors. Configurable via `megalint.conf` or CLI.

**Grade scale:** S (97+), A+ (95+), A (93+), A- (90+), B+ (87+), B (83+), B- (80+), C+ (77+), C (73+), C- (70+), D (60+), F (&lt;60)

**Display format:** `84 (B+)` — score first, grade in brackets, used consistently everywhere.

## Modifying the Tools

All tools are cloned directly into this repo (no `.git`). Edit source directly:

- **AgentLinter rules:** `apps/agentlinter/packages/cli/src/engine/rules/` → rebuild with `bun run build`
- **PromptLint analyzers:** `apps/promptlint/promptlint/analyzers/` → no build needed
- **Prompt Hardener:** `apps/prompt-hardener/src/prompt_hardener/` → no build needed
- **Home-Grow checks:** `apps/homegrow/run.sh` (all checks as functions) + `apps/homegrow/rules.conf` (per-check toggles + budgets). Called by `megalint.sh` — no inlining.

## Directory Layout

```
megalint/
  megalint.sh            # Unified runner (all 4 tools, 3 modes)
  megalint.conf          # Scoring weights, thresholds, grade scale
  apps/                  # Self-contained tool apps
    agentlinter/         # TypeScript, workspace-level linting
    promptlint/          # Python, per-file quality scoring
    prompt-hardener/     # Python, LLM-powered security testing
    homegrow/            # Bash, mode-aware convention checks
      run.sh             # Skills + prompts + agents checks (single source of truth)
      rules.conf         # Per-check toggles + token budget targets
  lib/                   # Extracted Python modules (testable, lintable)
    config.py            # Single source of truth for weights, grades, pricing, modes
    process.py           # Tool adapters, process_all, writes summary.json
    display.py           # Reads summary.json, prints terminal output
    scoring.py           # 5-pillar scoring engine
    report.py            # JSON + Markdown report generator
  tests/
    megalint.bats        # Regression and parity tests
  .env.example           # API key template (committed)
  .env                   # Your API keys (gitignored)
  .reports/              # All output (gitignored)
  README.md              # This file
```

## Tests

```bash
bats dev-tools/megalint/tests/megalint.bats
```

Covers: help/format validation, temp cleanup, no-eval parsing, homegrow delegation, template exclusion, portability, and refactored Python libs (config, process, display).

## Status

- **Stream A** (safety): done ✅  
- **Stream B** (dead code): done ✅  
- **Stream C** (portability): done ✅  
- **Stream D1** (homegrow dedup): done ✅  
- **D2-D7** (Python extraction): done ✅  

See **[BUGS.md](BUGS.md)** for full tracker.

## Deep Dive

See **[ANALYSIS.md](ANALYSIS.md)** for: per-check analysis with ratings and failure modes for all 31 Home-Grow checks and 10 Prompt Hardener sub-criteria.

## Reinstalling Dependencies

If you move or rename the `dev-tools/megalint/` directory, recreate the Python venvs (shebangs encode absolute paths):

```bash
cd dev-tools/megalint/apps/agentlinter/packages/cli && bun install && bun run build
cd dev-tools/megalint/apps/promptlint && uv venv .venv && uv pip install -e . --python .venv/bin/python
cd dev-tools/megalint/apps/prompt-hardener && uv venv .venv && uv pip install -e . --python .venv/bin/python
```
