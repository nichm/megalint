# Megalint Rule Registry

Every convention check has a unique rule ID used for `--list-rules`, `--disable-rule`, and `--preset`.

## Skill Rules (prefix: `skill/`)

| ID | Default Severity | Description | Source |
|----|:---:|---|---|
| `skill/file-exists` | ERROR | SKILL.md must exist in each skill directory | Claude Code skill architecture |
| `skill/description` | WARN | SKILL.md has a clear description/purpose statement | arxiv 2609.31575 — 2.9% of tokens = identity/persona |
| `skill/when-to-use` | WARN | When-to-use / trigger guidance for agents | Claude Code `description` field |
| `skill/structure` | WARN | Structured headings (≥2 sections) | arxiv 2609.31575 — 12.4% = formatting/style |
| `skill/dangerous-commands` | ERROR | No destructive commands (rm -rf /, curl\|sh) | Claude Code: "reversibility and blast radius" |
| `skill/actionable` | WARN | Steps, bullets, or code examples present | Devin/Claude Code step-by-step patterns |
| `skill/injection` | WARN | No prompt injection patterns | arxiv 2609.31575 Table 5: 7/62 use ≥3 techniques |
| `skill/file-count` | INFO | Reasonable file count per skill (≤5 OK) | Single-responsibility principle |
| `skill/scope-boundaries` | INFO | Defines what the skill should NOT do | arxiv 2609.31575 — 5.4% = safety/boundaries |
| `skill/examples` | INFO | Concrete examples or code blocks present | ChatGPT: behavior through examples |
| `skill/output-format` | INFO | Output format specification | arxiv 2609.31575 — 12.4% = formatting/style |
| `skill/error-handling` | INFO | Error recovery / fallback instructions | Claude Code, Devin, Cursor agents |
| `skill/secrets` | ERROR | No hardcoded secrets, API keys, or PII | Standard security practice |
| `skill/restrictions` | INFO | NEVER/MUST NOT markers for critical constraints | arxiv 2609.31575 Fig. 7: 4,725 emphatic markers |
| `skill/tool-boundaries` | INFO | Tool use boundaries (prefer X over Y) | arxiv 2609.31575 — 58% = tool/protocol rules |
| `skill/idempotent` | WARN | Destructive ops have safeguards | Claude Code: "check with user before proceeding" |

## Prompt Rules (prefix: `prompt/`)

| ID | Default Severity | Description | Source |
|----|:---:|---|---|
| `prompt/identity` | INFO | Prompt has role/identity definition | arxiv 2609.31575 — 2.9% = identity/persona |
| `prompt/output-format` | INFO | Output format guidance present | arxiv 2609.31575 — 12.4% = formatting/style |
| `prompt/dangerous-commands` | ERROR | No destructive commands | Standard security practice |
| `prompt/injection` | WARN | No prompt injection patterns | arxiv 2609.31575 Table 5 |
| `prompt/scope` | INFO | Scope / task boundaries defined | Universal across top prompts |
| `prompt/examples` | INFO | Concrete examples present | ChatGPT example-driven behavior |
| `prompt/constraints` | INFO | Emphatic constraints (NEVER/MUST NOT) | arxiv 2609.31575 Fig. 7 |

## Presets

| Preset | Description | Disabled Rules |
|--------|-------------|----------------|
| `strict` | All rules enabled (default) | None |
| `balanced` | ERROR + WARN rules only | All INFO-severity rules |
| `minimal` | ERROR rules only | All WARN + INFO rules |

## Research Citations

Rule patterns derived from:
- **arxiv.org/abs/2609.31575** — "A Large-Scale Empirical Study of LLM System Prompts" (Sep 2026). 407 leaked system prompts, 33 companies, 58% tool/protocol, 12.4% formatting, 5.4% safety.
- **Claude Code system prompt** — Lean skill format: description + allowedTools + bundled files. Emphasis on reversibility, tool boundaries, error recovery.
- **ChatGPT system prompt** — Behavioral encoding through examples, not just rules.
- **Devin system prompt** — Step-by-step workflow definitions, tool boundaries.
- **YeeKal/leaked-system-prompts** — 100+ system prompt collection.
- **sachin7x/system_prompts_leaks** — Additional leaked prompt corpus.
