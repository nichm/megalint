/* ─── Landing page static data ─── */

import type { LucideIcon } from "lucide-react";
import {
  Search, Terminal, BarChart3, Zap, Shield, FileText, Lock,
  Share2, RefreshCw, ChevronRight, Users, TrendingUp, Check,
  AlertTriangle, Eye, Layers, GitBranch,
} from "lucide-react";

export const TRUST_BAR_LINKS = [
  { label: "Anthropic CLAUDE.md", href: "https://code.claude.com/docs/en/memory" },
  { label: "Agent Skills Standard", href: "https://agentskills.io" },
  { label: "Claude Code", href: "https://github.com/anthropics/claude-code" },
  { label: "OpenClaw", href: "https://docs.openclaw.ai" },
  { label: "Cursor", href: "https://cursor.sh" },
  { label: "Windsurf", href: "https://codeium.com/windsurf" },
];

export const WHY_CARDS = [
  {
    icon: AlertTriangle,
    title: "Vague instructions fail silently",
    desc: "\"Be helpful\" gives your agent nothing to work with. Ambiguous pronouns, missing priorities, and naked conditionals degrade output quality without any error message.",
    stat: "40%",
    statLabel: "of agent configs score below 60 on Clarity",
  },
  {
    icon: Shield,
    title: "Secrets hide in plain text",
    desc: "API keys, tokens, and passwords end up in CLAUDE.md files that get committed to repos. Standard .gitignore doesn't catch secrets embedded in markdown.",
    stat: "1 in 5",
    statLabel: "workspaces have exposed credentials",
  },
  {
    icon: GitBranch,
    title: "Multi-file configs drift",
    desc: "SOUL.md defines one persona, CLAUDE.md another. TOOLS.md references files that don't exist. As your workspace grows, contradictions multiply.",
    stat: "3.2×",
    statLabel: "more contradictions in 5+ file workspaces",
  },
];

export const HOW_STEPS = [
  {
    step: "01", icon: Search, title: "Scan",
    desc: "Discovers every .md file in your workspace — CLAUDE.md, SOUL.md, USER.md, TOOLS.md, rules/, skills/. Parses structure, references, and content.",
    detail: "Supports Claude Code, OpenClaw, Moltbot, Cursor, Windsurf, and any Agent Skills–compatible workspace.",
  },
  {
    step: "02", icon: BarChart3, title: "Score",
    desc: "Evaluates across five dimensions: structure, clarity, completeness, security, and cross-file consistency. Each scored 0–100.",
    detail: "Rules based on Anthropic's official best practices plus community-contributed patterns from real agent workspaces.",
  },
  {
    step: "03", icon: Zap, title: "Fix",
    desc: "Every issue comes with a prescription and a suggested fix. Secrets get flagged for rotation. Contradictions get resolved.",
    detail: "Each diagnostic includes a 💡 Fix suggestion. Apply them to your files and re-run to verify your score improves.",
  },
];

export const SKILL_DETECTION_ITEMS = [
  { icon: Terminal, title: "Remote Code Injection", desc: "curl|bash, eval(), dynamic requires", severity: "CRITICAL" },
  { icon: Lock, title: "Key Theft", desc: "Private key, seed phrase, wallet access", severity: "CRITICAL" },
  { icon: Shield, title: "In-band Injection", desc: "Prompt manipulation, context override", severity: "DANGEROUS" },
  { icon: Zap, title: "Forced Wallet Connect", desc: "Unauthorized transaction signing", severity: "CRITICAL" },
];

export const VERDICT_LEVELS = [
  { label: "SAFE", color: "#4ade80", desc: "No threats detected" },
  { label: "SUSPICIOUS", color: "#fbbf24", desc: "Review recommended" },
  { label: "DANGEROUS", color: "#f97316", desc: "Known risk patterns" },
  { label: "MALICIOUS", color: "#ef4444", desc: "Active threat detected" },
];

export const EIGHT_DIMENSIONS: { title: string; weight: string; icon: LucideIcon; rules: string[]; example: string }[] = [
  {
    title: "Structure", weight: "12%", icon: Layers,
    rules: ["File organization & naming conventions", "Section separation & hierarchy", "Required files present (CLAUDE.md, etc.)", "Consistent frontmatter format"],
    example: '🔴 CRITICAL  Missing TOOLS.md — referenced in CLAUDE.md:12',
  },
  {
    title: "Clarity", weight: "20%", icon: Eye,
    rules: ["Naked conditionals without criteria", "Compound instructions (too many per line)", "Ambiguous pronouns & vague language", "Missing priority signals (P0/P1/P2)"],
    example: '⚠️ WARN "be helpful" → specify: response length, tone, format',
  },
  {
    title: "Completeness", weight: "12%", icon: FileText,
    rules: ["Identity / persona defined", "Tool documentation present", "Boundaries & constraints set", "Error handling & workflows"],
    example: '⚠️ WARN No error recovery workflow — add escalation path',
  },
  {
    title: "Security", weight: "15%", icon: Shield,
    rules: ["API key / token / password detection", "Injection defense instructions", "Permission boundaries defined", "Sensitive data handling rules"],
    example: '🔴 CRITICAL  Secret: API key "sk-proj-..." in TOOLS.md:14',
  },
  {
    title: "Consistency", weight: "8%", icon: GitBranch,
    rules: ["Cross-file reference integrity", "Persona alignment (SOUL ↔ CLAUDE)", "Permission conflict detection", "Language mixing patterns (ko/en)"],
    example: '🔴 CRITICAL  SOUL.md persona ≠ CLAUDE.md persona — reconcile',
  },
  {
    title: "Memory", weight: "10%", icon: RefreshCw,
    rules: ["Session handoff protocol", "File-based persistence (daily notes, logs)", "Task state tracking (progress files)", "Learning loop & knowledge distillation"],
    example: '⚠️ WARN No handoff protocol — agent loses context between sessions',
  },
  {
    title: "Runtime Config", weight: "13%", icon: Terminal,
    rules: ["Gateway bind (loopback only)", "Auth mode enabled (token/password)", "Token strength (32+ chars)", "DM/group policy restrictions", "Plaintext secrets in config"],
    example: '🔴 CRITICAL  Gateway bind "0.0.0.0" — exposes agent to network',
  },
  {
    title: "Skill Safety", weight: "10%", icon: Search,
    rules: ["Dangerous shell commands (rm -rf, curl|bash)", "Sensitive path access (~/.ssh, ~/.env)", "Data exfiltration patterns", "Prompt injection vectors in skills", "Excessive permission requests"],
    example: '🔴 CRITICAL  Skill contains: curl ... | bash',
  },
];

export const COMPARISON_ROWS = [
  { feature: "Scoring", official: "Basic via /init", ours: "6-category (0-100) per file", os: "partial", us: "full" },
  { feature: "Scope", official: "Single CLAUDE.md", ours: "Full workspace (all files)", os: "partial", us: "full" },
  { feature: "Cross-file checks", official: "✕", ours: "Contradiction detection", os: "none", us: "full" },
  { feature: "Secret scanning", official: "✕", ours: "Keys, tokens, passwords", os: "none", us: "full" },
  { feature: "Fix guidance", official: "Prompting suggestions", ours: "Actionable fix per issue", os: "partial", us: "full" },
  { feature: "Custom rules", official: "✕", ours: ".agentlinterrc per team", os: "none", us: "full" },
  { feature: "CI/CD", official: "✕", ours: "GitHub Action per PR", os: "none", us: "full" },
  { feature: "Templates", official: "/init bootstrap", ours: "4 starter templates", os: "partial", us: "full" },
  { feature: "Reports", official: "✕", ours: "Web report + Share on X", os: "none", us: "full" },
  { feature: "Frameworks", official: "Claude Code only", ours: "CC, OpenClaw, Moltbot, Cursor, Windsurf", os: "partial", us: "full" },
];

export const FLYWHEEL_STEPS = [
  { icon: Search, label: "Lint" },
  { icon: Share2, label: "Share" },
  { icon: Users, label: "Users" },
  { icon: TrendingUp, label: "Data" },
  { icon: RefreshCw, label: "Rules ↻" },
];

export const EVOLUTION_LEVELS = [
  { level: "L1 · Auto", title: "Weight Tuning", desc: "Scores shift based on which warnings users fix immediately vs ignore." },
  { level: "L2 · Semi", title: "Rule Discovery", desc: "Patterns found in top-scoring agents become new rule candidates." },
  { level: "L3 · Auto", title: "Fix Evolution", desc: "Low-acceptance fixes get replaced through A/B testing." },
  { level: "L4 · Semi", title: "Template Updates", desc: "Starter templates evolve based on what files users add." },
];

export const PRIVACY_CARDS = [
  { icon: Lock, title: "Local-First Execution", desc: "All scanning runs on your machine. File contents never leave. Report sharing (scores + diagnostics only) is optional — use --local to disable entirely.", badge: "Files stay local" },
  { icon: Shield, title: "Secrets Auto-Masked", desc: "When AgentLinter detects a secret (API key, token, password), it appears as [REDACTED] in diagnostics. Even in shareable reports, raw secrets are never included.", badge: "16 secret patterns" },
  { icon: Eye, title: "Reports ≠ Raw Files", desc: "Shareable reports contain only scores, file names, line numbers, and diagnostic messages. Never the original file content. Your SOUL.md stays private.", badge: "Metadata only" },
  { icon: FileText, title: "Open Source, Auditable", desc: "Every line of code is on GitHub. No obfuscated binaries, no hidden network calls. Read it, fork it, verify it. Trust through transparency.", badge: "MIT License" },
  { icon: Terminal, title: "No Telemetry by Default", desc: "Unlike many dev tools, AgentLinter sends zero analytics out of the box. If you opt in to anonymous usage stats, it's aggregated counts only — never content.", badge: "--no-telemetry flag" },
  { icon: Lock, title: "CI/CD Safe", desc: "In CI pipelines, AgentLinter only outputs scores and diagnostics to stdout. No artifacts, no uploads, no external dependencies beyond Node.js itself.", badge: "Air-gap compatible" },
];

export const REPORT_FEATURES = [
  "Tier grades: S → A+ → A → B+ → B → C",
  "Exact prescriptions with actionable fix suggestions",
  "Percentile ranking against all agents",
  "Progress tracking: watch 72 become 89",
  "One-click share on X with Score Card image",
];

export const ATTACK_LAYERS = [
  { layer: "L1", title: "Manifest", desc: "Metadata tricks — fake names, hidden permissions, misleading descriptions", color: "var(--amber)" },
  { layer: "L2", title: "Skill File", desc: "Malicious code — remote eval, secret exfiltration, wallet drains", color: "var(--red)" },
  { layer: "L3", title: "Prompt", desc: "Injection payloads — LLM manipulation, context poisoning", color: "var(--red)" },
];
