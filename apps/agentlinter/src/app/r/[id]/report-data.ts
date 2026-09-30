/* ─── Report Page Static Data ─── */
/* Extracted from ReportClient.tsx to keep the component under 900 lines */

export interface CategoryMeta {
  weight: number;
  description: string;
  whyItMatters: string;
  rules: { id: string; severity: string; description: string }[];
}

export interface RuleEducation {
  impact: string;
  example?: { bad: string; good: string };
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  Structure: {
    weight: 20,
    description:
      "How well your workspace files are organized — modular files, logical heading hierarchy, appropriate file sizes, and clear navigation.",
    whyItMatters:
      "Agents read your config files sequentially. A monolithic 500-line CLAUDE.md with no headings is like a legal document with no sections — the model will lose context, miss important instructions, and produce inconsistent behavior. Modular, well-structured files let the agent quickly find what it needs.",
    rules: [
      {
        id: "structure/has-main-file",
        severity: "critical",
        description: "Workspace has a CLAUDE.md or AGENTS.md entry point",
      },
      {
        id: "structure/has-sections",
        severity: "warning",
        description: "Main file has 3+ organized sections with headings",
      },
      {
        id: "structure/heading-hierarchy",
        severity: "info",
        description: "Headings follow logical hierarchy (no level skipping)",
      },
      {
        id: "structure/file-size",
        severity: "warning",
        description: "Files are not excessively long (< 500 lines for main)",
      },
      {
        id: "structure/modular-files",
        severity: "info",
        description: "Uses multiple focused files instead of one monolith",
      },
      {
        id: "structure/no-empty-sections",
        severity: "warning",
        description: "No empty sections in core files",
      },
      {
        id: "structure/has-file-map",
        severity: "info",
        description: "Directory tree or file map for navigation",
      },
      {
        id: "structure/has-version-or-update-date",
        severity: "info",
        description: "Version or update date for freshness tracking",
      },
    ],
  },
  Clarity: {
    weight: 25,
    description:
      "How clear and unambiguous your instructions are — specific language, actionable directives, no vague qualifiers, and defined terms.",
    whyItMatters:
      '"Be helpful" means nothing to an LLM. "When the user asks a question, provide a code example first, then explain" means everything. Vague instructions are the #1 cause of unpredictable agent behavior. Every ambiguous word is a coinflip the model makes without you. Clarity is the highest-weighted category (25%) because it has the most direct impact on behavior.',
    rules: [
      {
        id: "clarity/no-vague-instructions",
        severity: "warning",
        description:
          'No vague qualifiers ("be nice", "use common sense", "etc.")',
      },
      {
        id: "clarity/actionable-instructions",
        severity: "info",
        description:
          'Active voice over passive ("Do X" not "X should be done")',
      },
      {
        id: "clarity/has-examples",
        severity: "info",
        description: "Includes examples or code blocks for expected behavior",
      },
      {
        id: "clarity/no-contradictions",
        severity: "critical",
        description: 'No "always X" vs "never X" contradictions',
      },
      {
        id: "clarity/instruction-density",
        severity: "info",
        description: "Not too many imperative rules (< 30) to avoid dilution",
      },
      {
        id: "clarity/naked-conditional",
        severity: "critical",
        description: 'Conditionals use specific triggers, not "if appropriate"',
      },
      {
        id: "clarity/compound-instruction",
        severity: "warning",
        description: "One action per bullet point, not 3+ verbs in one line",
      },
      {
        id: "clarity/escape-hatch-missing",
        severity: "warning",
        description: "Absolute rules have exception/escalation paths",
      },
      {
        id: "clarity/ambiguous-pronoun",
        severity: "warning",
        description: 'Instructions don\'t start with ambiguous "it" / "this"',
      },
      {
        id: "clarity/action-without-context",
        severity: "info",
        description: "Instructions specify when/why, not just what",
      },
      {
        id: "clarity/sentence-complexity",
        severity: "info",
        description: "Sentences are short and simple, not nested prose",
      },
      {
        id: "clarity/priority-signal-missing",
        severity: "warning",
        description: "Files with 10+ rules have explicit priority markers",
      },
      {
        id: "clarity/undefined-term",
        severity: "info",
        description: "Acronyms and jargon are defined on first use",
      },
    ],
  },
  Completeness: {
    weight: 20,
    description:
      "Whether your workspace covers all essential aspects — identity, tools, boundaries, memory strategy, user context, error handling, and workflows.",
    whyItMatters:
      "An agent without defined boundaries will make up its own. An agent without a memory strategy will forget everything between sessions. Each missing piece is a gap where the model fills in defaults — and those defaults may not match your intent. Completeness ensures your agent has the full picture.",
    rules: [
      {
        id: "completeness/has-identity",
        severity: "warning",
        description:
          "Agent has a defined persona (SOUL.md or identity section)",
      },
      {
        id: "completeness/has-tools",
        severity: "warning",
        description: "Tool documentation exists (TOOLS.md or tools section)",
      },
      {
        id: "completeness/has-boundaries",
        severity: "warning",
        description: "Constraints and off-limits behaviors are defined",
      },
      {
        id: "completeness/has-memory-strategy",
        severity: "info",
        description: "Memory or session continuity strategy exists",
      },
      {
        id: "completeness/has-user-context",
        severity: "info",
        description: "User context (name, timezone, preferences) is provided",
      },
      {
        id: "completeness/has-error-awareness",
        severity: "info",
        description:
          "Error awareness — mentions of errors, failures, edge cases (see also has-error-recovery for actual recovery protocol)",
      },
      {
        id: "completeness/has-output-format",
        severity: "info",
        description: "Expected output format/style is defined",
      },
      {
        id: "completeness/has-workflow",
        severity: "info",
        description: "Multi-step workflows (deploy, review) are documented",
      },
      {
        id: "completeness/has-priorities",
        severity: "info",
        description: "Priority guidance for conflicting instructions",
      },
    ],
  },
  Security: {
    weight: 20,
    description:
      "Whether your workspace keeps secrets safe, defends against prompt injection, defines permission boundaries, and avoids PII exposure.",
    whyItMatters:
      "Agent workspaces often contain real API keys, tokens, and personal data. A single leaked secret in a shared CLAUDE.md can compromise your entire infrastructure. Prompt injection defense is equally critical — without it, a malicious user in a group chat can override your agent's instructions. Security isn't optional; it's existential.",
    rules: [
      {
        id: "security/no-secrets",
        severity: "critical",
        description: "No API keys, tokens, or passwords in agent files",
      },
      {
        id: "security/has-injection-defense",
        severity: "warning",
        description: "Prompt injection defense instructions exist",
      },
      {
        id: "security/has-permission-boundaries",
        severity: "warning",
        description: "Permission boundaries (who can authorize what)",
      },
      {
        id: "security/no-pii-exposure",
        severity: "warning",
        description: "No PII (email, phone) in shared agent files",
      },
      {
        id: "security/env-var-references",
        severity: "info",
        description: "Uses env var references instead of hardcoded values",
      },
    ],
  },
  Consistency: {
    weight: 8,
    description:
      "Whether your files agree with each other — no conflicting permissions, matching tone, consistent naming, valid cross-references, and aligned timezones.",
    whyItMatters:
      'When SOUL.md says "be casual" but SECURITY.md uses formal legal language, the agent gets confused about its voice. When one file says "auto-send emails" and another says "never send without approval," the agent picks randomly. Consistency ensures your agent speaks with one voice and follows one set of rules.',
    rules: [
      {
        id: "consistency/referenced-files-exist",
        severity: "critical",
        description: "All referenced files actually exist in workspace",
      },
      {
        id: "consistency/naming-convention",
        severity: "info",
        description: "Consistent file naming (UPPERCASE.md or lowercase.md)",
      },
      {
        id: "consistency/no-duplicate-instructions",
        severity: "warning",
        description: "No duplicate instructions across files",
      },
      {
        id: "consistency/identity-alignment",
        severity: "warning",
        description: "Agent identity is consistent across files",
      },
      {
        id: "consistency/permission-conflict",
        severity: "critical",
        description: "No conflicting permissions across files",
      },
      {
        id: "consistency/tone-voice-alignment",
        severity: "warning",
        description: "Instruction tone matches persona in SOUL.md",
      },
      {
        id: "consistency/language-mixing",
        severity: "info",
        description: "No excessive language mixing within sections",
      },
      {
        id: "consistency/circular-dependency",
        severity: "warning",
        description: "No circular file references",
      },
      {
        id: "consistency/timezone-locale-drift",
        severity: "warning",
        description: "Consistent timezone references across files",
      },
      {
        id: "consistency/priority-conflict",
        severity: "warning",
        description: "Same topic doesn't have conflicting priorities",
      },
      {
        id: "consistency/outdated-cross-references",
        severity: "critical",
        description: "Section references point to existing sections",
      },
    ],
  },
  Memory: {
    weight: 10,
    description:
      "How well your agent persists knowledge across sessions — memory strategy, session handoff, file-based notes, context window awareness, and task tracking.",
    whyItMatters:
      "Agents without memory are goldfish — they wake up confused, repeat questions, and forget what they learned yesterday. A well-designed memory system lets your agent build knowledge over time, resume interrupted work, and maintain long-term context.",
    rules: [
      {
        id: "memory/has-memory-strategy",
        severity: "warning",
        description: "Memory strategy defined (file-based, database, etc.)",
      },
      {
        id: "memory/has-session-handoff",
        severity: "warning",
        description:
          "Session startup protocol (what to read, how to restore context)",
      },
      {
        id: "memory/has-file-based-memory",
        severity: "info",
        description: "File-based memory system (logs, notes)",
      },
      {
        id: "memory/has-context-window-awareness",
        severity: "info",
        description: "Guidance for long conversations and context overflow",
      },
      {
        id: "memory/has-task-tracking",
        severity: "info",
        description: "Task/state tracking for resuming work",
      },
    ],
  },
  "Runtime Config": {
    weight: 13,
    description:
      "Runtime configuration quality — JSON structure, environment variables, API timeouts, tool permissions, and model settings.",
    whyItMatters:
      "Runtime config controls how your agent actually runs — API keys, timeouts, tool permissions, model selection. A misconfigured runtime can leak secrets, hit rate limits, or grant excessive permissions.",
    rules: [
      {
        id: "runtime/has-config",
        severity: "info",
        description:
          "Runtime config file exists (clawdbot.json, openclaw.json)",
      },
      {
        id: "runtime/valid-json",
        severity: "critical",
        description: "Config is valid JSON",
      },
      {
        id: "runtime/has-env-vars",
        severity: "info",
        description: "Uses environment variables for secrets",
      },
      {
        id: "runtime/has-timeout-settings",
        severity: "info",
        description: "API timeout settings configured",
      },
    ],
  },
  "Skill Safety": {
    weight: 10,
    description:
      "Safety and quality of custom skills — documentation, environment checks, error handling, security docs, and safe defaults.",
    whyItMatters:
      "Custom skills extend your agent's capabilities but introduce risk. A skill without security docs is a footgun. Skills need clear documentation, environment validation, and safe defaults to prevent misuse.",
    rules: [
      {
        id: "skillSafety/has-skill-md",
        severity: "warning",
        description: "Skills have SKILL.md documentation",
      },
      {
        id: "skillSafety/has-frontmatter",
        severity: "info",
        description: "SKILL.md has frontmatter metadata",
      },
      {
        id: "skillSafety/has-environment-check",
        severity: "warning",
        description: "Skills validate required environment variables",
      },
      {
        id: "skillSafety/has-security-docs",
        severity: "warning",
        description: "Skills document security implications",
      },
      {
        id: "skillSafety/has-error-handling",
        severity: "info",
        description: "Skills handle errors gracefully",
      },
    ],
  },
};

export const RULE_EDUCATION: Record<string, RuleEducation> = {
  "structure/heading-hierarchy": {
    impact:
      "Skipped heading levels (h1 → h3) break the document outline. LLMs use heading hierarchy to understand section relationships and nesting. A clean hierarchy means better context parsing.",
    example: {
      bad: "# Main Title\n### Subsection  ← skipped h2",
      good: "# Main Title\n## Section\n### Subsection  ← proper nesting",
    },
  },
  "clarity/undefined-term": {
    impact:
      'Undefined acronyms force the model to guess meanings. In agent config files, precision matters — "MUST" could be an RFC 2119 keyword or just emphasis. Define it once so the model knows exactly what you mean.',
    example: {
      bad: "⚠️ MUST reference Name, Timezone",
      good: "⚠️ **MUST** (required — agent will fail without this): reference Name, Timezone",
    },
  },
  "consistency/language-mixing": {
    impact:
      "Mixing languages within sections can confuse the model's language mode. While technical terms in English within Korean text is normal, heavily mixed sentences reduce instruction clarity. Each section should have a primary language.",
    example: {
      bad: "이 파일을 read해서 check하고 update해야 함",
      good: "이 파일을 읽고, 확인하고, 업데이트해야 함\n(or: Read, check, and update this file)",
    },
  },
  "clarity/no-vague-instructions": {
    impact:
      'Vague qualifiers like "be helpful" or "use common sense" give the model zero actionable information. Every vague word is a random choice the model makes without your input. Specific instructions produce predictable, consistent behavior.',
    example: {
      bad: "Be helpful and concise",
      good: "Answer in ≤3 sentences for simple questions. Use bullet points for complex answers. Include a code example when explaining technical concepts.",
    },
  },
  "clarity/naked-conditional": {
    impact:
      '"If too long" means 100 words to one model and 10,000 to another. Vague conditionals create inconsistent branching behavior. Replace with measurable thresholds.',
    example: {
      bad: "If the response is too long, shorten it",
      good: "If the response exceeds 500 words, summarize in ≤3 bullet points",
    },
  },
  "clarity/escape-hatch-missing": {
    impact:
      'Absolute rules without exceptions create deadlocks. When two "never" rules conflict, the agent has no way to resolve the paradox. An escape hatch ("unless the user explicitly requests it") gives the agent a principled way to handle edge cases.',
    example: {
      bad: "Never modify files without asking",
      good: "Never modify files without asking — unless the user just said 'fix it' or 'go ahead' in the same conversation",
    },
  },
  "security/no-secrets": {
    impact:
      "Secrets in config files get committed to git, shared via clipboard, and synced to cloud storage. A single leaked API key can cost thousands in unauthorized usage or compromise your entire infrastructure.",
    example: {
      bad: 'api_key: "sk-proj-abc123..."',
      good: "api_key: $OPENAI_API_KEY  # from environment",
    },
  },
  "security/has-injection-defense": {
    impact:
      'Without injection defense, anyone in a group chat can say "ignore all previous instructions and..." to hijack your agent. This is the most common attack vector for AI agents in production.',
  },
  "consistency/referenced-files-exist": {
    impact:
      "Referencing a file that doesn't exist (\"see BOOTSTRAP.md\") creates a broken link the agent can't follow. It may hallucinate the contents or silently skip the instruction, both leading to unpredictable behavior.",
  },
  "completeness/has-identity": {
    impact:
      "Without a defined identity, the agent defaults to a generic assistant persona. A consistent personality (tone, name, behavior patterns) makes the agent more predictable and the user experience more cohesive.",
  },
  "completeness/has-boundaries": {
    impact:
      'An agent without boundaries will attempt anything it\'s asked to do. Defined boundaries ("never send emails without confirmation") prevent catastrophic mistakes and build trust.',
  },
};

export const SCORING_METHODOLOGY = {
  base: "Each category starts at 100 points.",
  deductions: [
    {
      severity: "Critical",
      points: -15,
      color: "var(--red)",
      description: "Issues that break agent behavior or expose secrets",
    },
    {
      severity: "Warning",
      points: -8,
      color: "var(--amber)",
      description: "Significant issues that degrade agent quality",
    },
    {
      severity: "Info",
      points: -3,
      color: "var(--text-dim)",
      description: "Minor suggestions for improvement",
    },
  ],
  bonuses: [
    { category: "Structure", description: "Modular files (3+ → +5, 5+ → +10)" },
    { category: "Clarity", description: "Has examples or code blocks (+5)" },
    {
      category: "Completeness",
      description:
        "Key files exist: SOUL, IDENTITY, USER, TOOLS, SECURITY (+2 each)",
    },
    {
      category: "Security",
      description: "Has SECURITY.md (+5), injection defense keywords (+5)",
    },
    {
      category: "Consistency",
      description: "Consistent UPPERCASE naming convention (+5)",
    },
  ],
  formula: "Total = Σ (category_score × category_weight)",
};
