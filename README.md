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

# Rule control
./megalint.sh --mode skills --list-rules                 # Show all skill rules with IDs
./megalint.sh --disable-rule skill/examples,skill/output-format  # Disable specific rules
./megalint.sh --preset minimal                           # Only ERROR-severity rules
./megalint.sh --preset balanced                          # ERROR + WARN rules (no INFO)
./megalint.sh -q                                         # Suppress OK/INFO in output

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
| Secret patterns (API keys, tokens, PII) | **Yes** | **Yes** | **Yes** | |
| Injection patterns (OWASP regex) | | **Yes** | **Yes** | |
| Prompt injection defense | | | | **Yes** |
| Persona switching defense | | | | **Yes** |
| Role consistency | | | | **Yes** |
| Skill SKILL.md structure | | | **Yes** | |
| Skill when-to-use guidance | | | **Yes** | |
| Skill dangerous commands | | | **Yes** | |
| Skill actionable instructions | | | **Yes** | |
| Skill scope boundaries | | | **Yes** | |
| Skill tool boundaries | | | **Yes** | |
| Skill error handling guidance | | | **Yes** | |
| Memory / session handoff | **Yes** | | | |

## Rule Registry

Every convention check has a unique **rule ID** (e.g., `skill/file-exists`, `prompt/injection`). Rules can be individually toggled via `--disable-rule` and filtered by `--preset`.

### Skill Rules (16 rules)

| Rule ID | Severity | Description | Research Citation |
|---------|:--------:|-------------|-------------------|
| `skill/file-exists` | ERROR | SKILL.md must exist | Claude Code skill architecture |
| `skill/description` | WARN | Clear description/purpose | arxiv 2609.31575 — 2.9% identity/persona |
| `skill/when-to-use` | WARN | Trigger guidance for agents | Claude Code `description` field |
| `skill/structure` | WARN | ≥2 markdown headings | arxiv 2609.31575 — 12.4% formatting/style |
| `skill/dangerous-commands` | ERROR | No rm -rf /, curl\|sh, etc. | Claude Code: "reversibility and blast radius" |
| `skill/actionable` | WARN | Steps, bullets, or code | Devin/Claude Code step-by-step patterns |
| `skill/injection` | WARN | No injection patterns | arxiv 2609.31575 Table 5 |
| `skill/file-count` | INFO | ≤5 files per skill | Single-responsibility |
| `skill/scope-boundaries` | INFO | What the skill should NOT do | arxiv 2609.31575 — 5.4% safety/boundaries |
| `skill/examples` | INFO | Concrete examples present | ChatGPT: behavior through examples |
| `skill/output-format` | INFO | Output format specified | arxiv 2609.31575 — 12.4% formatting/style |
| `skill/error-handling` | INFO | Error recovery instructions | Claude Code, Devin, Cursor agents |
| `skill/secrets` | ERROR | No hardcoded API keys/PII | Standard security |
| `skill/restrictions` | INFO | NEVER/MUST NOT markers | arxiv 2609.31575 Fig. 7: 4,725 emphatic markers |
| `skill/tool-boundaries` | INFO | Tool use boundaries | arxiv 2609.31575 — 58% tool/protocol rules |
| `skill/idempotent` | WARN | Destructive ops have safeguards | Claude Code: "check with user" |

### Prompt Rules (7 rules)

| Rule ID | Severity | Description | Research Citation |
|---------|:--------:|-------------|-------------------|
| `prompt/identity` | INFO | Role/identity definition | arxiv 2609.31575 — 2.9% identity/persona |
| `prompt/output-format` | INFO | Output format guidance | arxiv 2609.31575 — 12.4% formatting/style |
| `prompt/dangerous-commands` | ERROR | No destructive commands | Standard security |
| `prompt/injection` | WARN | No injection patterns | arxiv 2609.31575 Table 5 |
| `prompt/scope` | INFO | Scope/task boundaries | Universal across top prompts |
| `prompt/examples` | INFO | Concrete examples | ChatGPT example-driven behavior |
| `prompt/constraints` | INFO | NEVER/MUST NOT markers | arxiv 2609.31575 Fig. 7 |

### Presets

| Preset | Rules | Description |
|--------|:-----:|-------------|
| `strict` | All | Every rule enabled (default) |
| `balanced` | ERROR + WARN | Skip INFO-only advisory rules |
| `minimal` | ERROR only | Bare minimum — dangerous commands, secrets, file exists |

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
| `--list-rules` | List all rules for the current mode and exit |
| `--disable-rule ID,...` | Disable specific rules by comma-separated IDs |
| `--preset PRESET` | Apply rule preset: `strict`, `balanced`, `minimal` |
| `-q, --quiet` | Only show errors and warnings (suppress OK/INFO) |
| `--json` | Output results as JSON to stdout |
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

Reports are saved to `.reports/` (gitignored).

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
    },
    "mode": "skills",
    "disabled_rules": "",
    "preset": ""
  }
}
```

Run ID = `{commit}_{timestamp}`, so you can compare scores across commits.

### Unified Report Format

All four tools merge into a single consistent structure:

```json
{
  "meta": { "run_id", "timestamp", "git": {...}, "model", "agents_scanned", "mode" },
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
    "my-skill": {
      "agentlinter": { "score": 84, "categories": {...}, "diagnostics": [...] },
      "promptlint": { "SKILL.md": { "clarity": 7.2, "security": 10, ... }, ... },
      "prompt_hardener": { "Spotlighting": {...}, "Instruction Defense": {...}, ... }
    }
  },
  "homegrow": { "passes": 58, "warnings": 4, "errors": 1, "checks": [...] }
}
```

## Dependencies

- **Node.js** — AgentLinter
- **ripgrep (rg)** — Convention checks
- **Python 3** + venvs — PromptLint, Prompt Hardener

Install: `brew install node ripgrep` (macOS). Missing deps fail early with clear errors.

## Environment Setup

```bash
cp .env.example .env
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
| Consistency | Conventions | (OK×1.0 + WARN×0.5 + ERR×0.0) / total × 100 | 22% |
| Security | Prompt Hardener | (satisfied_checks / total_checks) * 100 | 20% |
| Token Budget | Length check | Per-file tokens vs budget (LOAD_WEIGHTS) | 15% |

When a tool is skipped (e.g., Hardener without API key), its weight redistributes proportionally.

**Pass/fail:** Score >= threshold (default 70) AND no blocking errors. Configurable via `megalint.conf` or CLI.

**Grade scale:** S (97+), A+ (95+), A (93+), A- (90+), B+ (87+), B (83+), B- (80+), C+ (77+), C (73+), C- (70+), D (60+), F (<60)

**Display format:** `84 (B+)` — score first, grade in brackets, used consistently everywhere.

## Research Citations

Rule patterns are derived from empirical analysis of leaked system prompts:

- **[arxiv.org/abs/2609.31575](https://arxiv.org/abs/2609.31575)** — "A Large-Scale Empirical Study of LLM System Prompts" (Sep 2026). 407 system prompts from 33 companies. Key findings: 58% tool/protocol, 12.4% formatting/style, 7.4% memory/context, 5.4% safety, 2.9% identity/persona. CRITICAL/NEVER/MUST NOT markers cluster on tool use + file safety + formatting.
- **Claude Code system prompt** — Lean skill format: `description` + `allowedTools` + bundled files. Emphasis on reversibility, blast radius, tool boundaries, error recovery.
- **ChatGPT system prompt** — Behavioral encoding through examples and constraints, not declarative rules alone.
- **Devin system prompt** — Step-by-step workflow definitions, tool boundaries, scope limits.
- **YeeKal/leaked-system-prompts** — 100+ system prompt collection across major AI products.

## Modifying the Tools

All tools are cloned directly into this repo (no `.git`). Edit source directly:

- **AgentLinter rules:** `apps/agentlinter/packages/cli/src/engine/rules/` → rebuild with `bun run build`
- **PromptLint analyzers:** `apps/promptlint/promptlint/analyzers/` → no build needed
- **Prompt Hardener:** `apps/prompt-hardener/src/prompt_hardener/` → no build needed
- **Convention checks:** `apps/homegrow/skills.sh` / `prompts.sh` / `run.sh` → no build needed
- **Rule registry:** `apps/homegrow/RULES.md` — canonical reference for all rule IDs

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
      run.sh             # Dispatcher + agents checks
      skills.sh          # 16 skill-specific checks (sourced by run.sh)
      prompts.sh         # 7 prompt-specific checks (sourced by run.sh)
      rules.conf         # Per-check toggles + token budget targets
      RULES.md           # Rule registry reference
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
bats tests/megalint.bats
```

Covers: help/format validation, temp cleanup, no-eval parsing, homegrow delegation, template exclusion, portability, and refactored Python libs (config, process, display).

## Status

- **Stream A** (safety): done ✅
- **Stream B** (dead code): done ✅
- **Stream C** (portability): done ✅
- **Stream D1** (homegrow dedup): done ✅
- **D2-D7** (Python extraction): done ✅
- **Skills/Prompts generalization**: done ✅
- **Rule registry + research-backed checks**: done ✅

See **[BUGS.md](BUGS.md)** for full tracker.

## Deep Dive

See **[ANALYSIS.md](ANALYSIS.md)** for: per-check analysis with ratings and failure modes for all 31 Home-Grow checks and 10 Prompt Hardener sub-criteria.

## Reinstalling Dependencies

If you move or rename the directory, recreate the Python venvs (shebangs encode absolute paths):

```bash
cd apps/agentlinter/packages/cli && bun install && bun run build
cd apps/promptlint && uv venv .venv && uv pip install -e . --python .venv/bin/python
cd apps/prompt-hardener && uv venv .venv && uv pip install -e . --python .venv/bin/python
```
