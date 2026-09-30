# AGENTS.md — megalint

Megalint — AI prompt, skill, and agent linter. Runs 4 tools in parallel (AgentLinter, PromptLint, Home-Grow conventions, Prompt Hardener) producing a single scored report.

Three modes:
- `--mode skills` — lint skill directories (SKILL.md + supporting files) — primary use case
- `--mode prompts` — lint individual .md prompt files (system prompts, AGENTS.md, CLAUDE.md, etc.)
- `--mode agents` — lint OpenClaw MDS agent workspaces (legacy)
- `--mode auto` — detect from input structure (default)

Auto-detection: SKILL.md → skills, AGENTS.md+SOUL.md → agents, else prompts.

Part of the webuildstuffio org. See the repo README for setup and usage.
