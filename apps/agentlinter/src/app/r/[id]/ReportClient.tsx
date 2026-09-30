"use client";

import { motion } from "framer-motion";
import {
  Share2,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  FileText,
  Lightbulb,
  ArrowRight,
  Copy,
  ExternalLink,
  Sparkles,
  Target,
  Zap,
  Lock,
} from "lucide-react";
import { useState } from "react";
import {
  CATEGORY_META,
  RULE_EDUCATION,
  SCORING_METHODOLOGY,
} from "./report-data";
import {
  Github,
  Logo,
  getTier,
  CategoryIcon,
  SeverityIcon,
  Histogram,
  Collapsible,
  CodeBlock,
} from "./report-components";

/* ─── Types ─── */
export interface ReportData {
  id?: string;
  workspace?: string;
  totalScore: number;
  filesScanned: number;
  timestamp: string;
  categories: { name: string; score: number }[];
  diagnostics: {
    severity: string;
    category: string;
    rule: string;
    file: string;
    line?: number;
    message: string;
    fix?: string;
  }[];
  files: string[];
  history?: { id: string; score: number; created_at: string }[];
}

/* ─── Main Report Page ─── */
export default function ReportPage({ data }: { data: ReportData }) {
  const tier = getTier(data.totalScore);
  const [showAllFiles, setShowAllFiles] = useState(false);

  const percentile =
    data.totalScore >= 98
      ? 1
      : data.totalScore >= 96
        ? 3
        : data.totalScore >= 93
          ? 5
          : data.totalScore >= 90
            ? 8
            : data.totalScore >= 85
              ? 12
              : data.totalScore >= 80
                ? 18
                : data.totalScore >= 75
                  ? 25
                  : data.totalScore >= 68
                    ? 35
                    : 50;

  const errors = data.diagnostics.filter(
    (d) => d.severity === "critical" || d.severity === "error",
  );
  const warnings = data.diagnostics.filter((d) => d.severity === "warning");
  const infos = data.diagnostics.filter((d) => d.severity === "info");

  const totalRules = Object.values(CATEGORY_META).reduce(
    (sum, c) => sum + c.rules.length,
    0,
  );
  const passedRules = totalRules - data.diagnostics.length;

  // Build category breakdown for share text
  const labels: Record<string, string> = {
    structure: "📁",
    clarity: "💡",
    completeness: "📋",
    security: "🔒",
    consistency: "🔗",
    memory: "🧠",
    runtime: "⚙️",
    skillSafety: "🛡️",
  };
  const allCategories = [...data.categories]
    .sort((a, b) => b.score - a.score)
    .map((cat) => `${labels[cat.name] || ""}${cat.score}`)
    .join(" ");

  const shareText = `🧬 AgentLinter Score: ${data.totalScore}/100

⭐ ${tier.grade} tier · Top ${percentile}%

Is YOUR AI agent secure?
Free & open source — try it yourself:

npx agentlinter

https://agentlinter.com`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="min-h-screen bg-[var(--bg)] noise">
      {/* Nav */}
      <nav className="border-b border-[var(--border)] sticky top-0 bg-[var(--bg)]/80 backdrop-blur-xl z-50">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <Logo size={20} />
            <span className="font-semibold text-[14px]">AgentLinter</span>
            <span className="text-[11px] mono text-[var(--text-dim)] ml-1">
              Report
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href={shareUrl}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all hover:brightness-125"
              style={{ backgroundColor: tier.bg, color: tier.color }}
            >
              <Share2 className="w-3 h-3" />
              Share
            </a>
            <a
              href="https://github.com/seojoonkim/agentlinter"
              target="_blank"
              className="text-[var(--text-dim)] hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-[720px] mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* ═══════ Score Hero ═══════ */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 sm:gap-4 mb-3">
                  <span className="text-[64px] sm:text-[88px] font-bold text-white leading-none display">
                    {data.totalScore}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[24px] sm:text-[28px]">
                        {tier.emoji}
                      </span>
                      <div
                        className="px-3 py-1 rounded-xl text-[18px] sm:text-[20px] font-bold mono"
                        style={{ color: tier.color, backgroundColor: tier.bg }}
                      >
                        {tier.grade}
                      </div>
                    </div>
                    <span
                      className="text-[13px] font-medium"
                      style={{ color: tier.color }}
                    >
                      {tier.label}
                    </span>
                  </div>
                </div>
                <div className="text-[13px] text-[var(--text-secondary)] space-y-1">
                  <p>
                    <span className="mono">{data.filesScanned}</span> files
                    scanned · <span className="mono">{totalRules}</span> rules
                    checked ·{" "}
                    <span className="mono" style={{ color: "var(--green)" }}>
                      {passedRules}
                    </span>{" "}
                    passed
                  </p>
                  <p>
                    Top{" "}
                    <span
                      className="mono font-medium"
                      style={{ color: tier.color }}
                    >
                      {percentile}%
                    </span>{" "}
                    of all agent workspaces
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[var(--teal)]">
                  <Lock className="w-3 h-3" />
                  <span>Results only — your files never uploaded</span>
                </div>
              </div>

              {/* Mini summary */}
              <div className="flex flex-wrap gap-2.5">
                {errors.length > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--red)]/10 text-[var(--red)] text-[12px] mono">
                    <AlertCircle className="w-3 h-3" /> {errors.length} critical
                    {errors.length > 1 ? "s" : ""}
                  </div>
                )}
                {warnings.length > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--amber)]/10 text-[var(--amber)] text-[12px] mono">
                    <AlertTriangle className="w-3 h-3" /> {warnings.length}{" "}
                    warning{warnings.length > 1 ? "s" : ""}
                  </div>
                )}
                {infos.length > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-[var(--text-secondary)] text-[12px] mono">
                    <Info className="w-3 h-3" /> {infos.length} info
                  </div>
                )}
                {data.diagnostics.length === 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--green)]/10 text-[var(--green)] text-[12px] mono">
                    <CheckCircle2 className="w-3 h-3" /> All clear
                  </div>
                )}
              </div>
            </div>

            {/* Grade Scale Explainer */}
            <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[13px] font-medium text-[var(--text-primary)]">
                  Grade Scale
                </span>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 text-center">
                {[
                  { grade: "S", min: "98+", color: "#c084fc" },
                  { grade: "A+", min: "96", color: "#a78bfa" },
                  { grade: "A", min: "93", color: "#818cf8" },
                  { grade: "A-", min: "90", color: "#60a5fa" },
                  { grade: "B+", min: "85", color: "#34d399" },
                  { grade: "B", min: "80", color: "#4ade80" },
                  { grade: "B-", min: "75", color: "#a3e635" },
                  { grade: "C+", min: "68", color: "#fbbf24" },
                  { grade: "C", min: "60", color: "#f59e0b" },
                  { grade: "C-", min: "55", color: "#fb923c" },
                  { grade: "D", min: "50", color: "#ef4444" },
                  { grade: "F", min: "<50", color: "#991b1b" },
                ].map((g) => (
                  <div
                    key={g.grade}
                    className={`py-1.5 px-1 rounded-md text-[10px] mono ${tier.grade === g.grade ? "ring-2 ring-white/30" : ""}`}
                    style={{ backgroundColor: `${g.color}18`, color: g.color }}
                  >
                    <div className="font-bold">{g.grade}</div>
                    <div className="opacity-70 text-[9px]">{g.min}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-[var(--text-dim)] leading-relaxed">
                💡 <strong>90+</strong> = Production-ready ·{" "}
                <strong>80-89</strong> = Good with minor fixes ·{" "}
                <strong>70-79</strong> = Needs attention ·{" "}
                <strong>&lt;70</strong> = Significant improvements needed
              </p>
            </div>

            {/* Category bars */}
            <div className="mt-8 space-y-3">
              {data.categories.map((cat) => {
                const catTier = getTier(cat.score);
                const meta = CATEGORY_META[cat.name];
                return (
                  <div key={cat.name} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 w-[120px] text-right">
                      <CategoryIcon
                        name={cat.name}
                        className="w-3.5 h-3.5 text-[var(--text-dim)]"
                      />
                      <span className="text-[13px] text-[var(--text-secondary)] flex-1 text-right">
                        {cat.name}
                      </span>
                    </div>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: catTier.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.score}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                    <div className="flex items-center gap-2 w-[80px]">
                      <span
                        className="text-[13px] mono font-medium"
                        style={{ color: catTier.color }}
                      >
                        {cat.score}
                      </span>
                      <span
                        className="text-[10px] mono px-1.5 py-0.5 rounded"
                        style={{
                          color: catTier.color,
                          backgroundColor: catTier.bg,
                        }}
                      >
                        {catTier.grade}
                      </span>
                      <span className="text-[10px] mono text-[var(--text-dim)]">
                        ×{meta?.weight}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ═══════ Share on X CTA ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-xl border border-[#1d9bf0]/30 bg-gradient-to-r from-[#1d9bf0]/8 to-[#1d9bf0]/3 p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-[15px] font-semibold text-white mb-1.5 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share your score on X
              </h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                Every share helps more developers discover agent linting. Better
                agent configs across the ecosystem means fewer hallucinations,
                fewer security gaps, and stronger AI workflows for everyone.
              </p>
            </div>
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white text-[14px] font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Post on X
            </a>
          </div>
        </motion.div>

        {/* ═══════ Fix with AI Agent CTA ═══════ */}
        {data.diagnostics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-xl border border-[var(--accent)]/30 bg-gradient-to-r from-[var(--accent)]/8 to-[var(--accent)]/3 p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-white mb-1.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  Fix issues with your AI agent
                </h3>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  Copy this report link and share it with Claude, ChatGPT, or
                  your favorite AI assistant. Ask them to fix the flagged issues
                  — they can read the diagnostics and apply fixes automatically.
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  // Could add a toast here
                }}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--accent)] hover:brightness-110 text-white text-[14px] font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══════ Table of Contents ═══════ */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6">
          <h2 className="text-[15px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
            In This Report
          </h2>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              {
                label: "Category Deep-Dives",
                anchor: "#categories",
                icon: <BookOpen className="w-3 h-3" />,
              },
              {
                label: "All Diagnostics",
                anchor: "#diagnostics",
                icon: <Target className="w-3 h-3" />,
              },
              {
                label: "Score Distribution",
                anchor: "#distribution",
                icon: <Sparkles className="w-3 h-3" />,
              },
              {
                label: "Scoring Methodology",
                anchor: "#methodology",
                icon: <Zap className="w-3 h-3" />,
              },
              {
                label: "Files Scanned",
                anchor: "#files",
                icon: <FileText className="w-3 h-3" />,
              },
              {
                label: "Next Steps",
                anchor: "#next-steps",
                icon: <ArrowRight className="w-3 h-3" />,
              },
            ].map((item) => (
              <a
                key={item.anchor}
                href={item.anchor}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* ═══════ Category Deep-Dives ═══════ */}
        <div id="categories" className="space-y-4">
          <h2 className="text-[24px] sm:text-[28px] font-bold display flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[var(--accent)]" />
            Category Deep-Dives
          </h2>
          <p className="text-[13px] text-[var(--text-secondary)] -mt-2 mb-2">
            Each category evaluates a different dimension of your agent
            workspace. Click to expand and see every rule checked, what passed,
            what flagged, and why each rule exists.
          </p>

          {data.categories.map((cat) => {
            const catTier = getTier(cat.score);
            const meta = CATEGORY_META[cat.name];
            const catDiagnostics = data.diagnostics.filter(
              (d) => d.category === cat.name.toLowerCase(),
            );
            const flaggedRules = new Set(catDiagnostics.map((d) => d.rule));

            return (
              <Collapsible
                key={cat.name}
                title={`${cat.name} — ${cat.score}/100`}
                icon={<CategoryIcon name={cat.name} className={`w-4 h-4`} />}
                badge={
                  <span
                    className="text-[11px] mono px-2 py-0.5 rounded-md"
                    style={{
                      color: catTier.color,
                      backgroundColor: catTier.bg,
                    }}
                  >
                    {catTier.grade} · {meta.weight}% weight
                  </span>
                }
                defaultOpen={cat.score < 100}
              >
                <div className="space-y-5 pt-4">
                  {/* Description */}
                  <div>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                      {meta.description}
                    </p>
                  </div>

                  {/* Why It Matters */}
                  <div className="rounded-lg bg-[var(--accent-glow)] border border-[var(--accent-dim)] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span className="text-[12px] font-semibold text-[var(--accent)] uppercase tracking-wider">
                        Why This Matters
                      </span>
                    </div>
                    <p className="text-[13px] text-[var(--text)] leading-relaxed">
                      {meta.whyItMatters}
                    </p>
                  </div>

                  {/* Rules Checklist */}
                  <div>
                    <h4 className="text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                      Rules Checked ({meta.rules.length})
                    </h4>
                    <div className="space-y-1">
                      {meta.rules.map((rule) => {
                        const isFlagged = flaggedRules.has(rule.id);
                        const diagnostic = catDiagnostics.find(
                          (d) => d.rule === rule.id,
                        );
                        return (
                          <div
                            key={rule.id}
                            className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg"
                            style={{
                              backgroundColor: isFlagged
                                ? "rgba(255,255,255,0.02)"
                                : "transparent",
                            }}
                          >
                            {isFlagged ? (
                              <span className="mt-0.5">
                                {rule.severity === "critical" ||
                                rule.severity === "error" ? (
                                  <AlertCircle className="w-3.5 h-3.5 text-[var(--red)]" />
                                ) : rule.severity === "warning" ? (
                                  <AlertTriangle className="w-3.5 h-3.5 text-[var(--amber)]" />
                                ) : (
                                  <Info className="w-3.5 h-3.5 text-[var(--text-dim)]" />
                                )}
                              </span>
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-[var(--green)]" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[13px] ${isFlagged ? "text-[var(--text)]" : "text-[var(--text-secondary)]"}`}
                                >
                                  {rule.description}
                                </span>
                              </div>
                              <span className="text-[10px] mono text-[var(--text-dim)]">
                                {rule.id}
                              </span>
                              {diagnostic && (
                                <p className="text-[12px] text-[var(--text-secondary)] mt-1 pl-0">
                                  →{" "}
                                  {diagnostic.message.length > 120
                                    ? diagnostic.message.substring(0, 120) +
                                      "..."
                                    : diagnostic.message}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Flagged Issues Detail */}
                  {catDiagnostics.length > 0 && (
                    <div>
                      <h4 className="text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                        Flagged Issues ({catDiagnostics.length})
                      </h4>
                      <div className="space-y-4">
                        {catDiagnostics.map((d, i) => {
                          const education = RULE_EDUCATION[d.rule];
                          return (
                            <div
                              key={i}
                              className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4"
                            >
                              <div className="flex items-start gap-2.5 mb-2">
                                <SeverityIcon severity={d.severity} />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[12px] mono text-[var(--text-secondary)]">
                                      {d.file}
                                      {d.line ? `:${d.line}` : ""}
                                    </span>
                                    <span className="text-[10px] mono px-1.5 py-0.5 rounded bg-white/5 text-[var(--text-dim)]">
                                      {d.rule}
                                    </span>
                                  </div>
                                  <p className="text-[13px] text-[var(--text)] mt-1">
                                    {d.message}
                                  </p>
                                </div>
                              </div>

                              {/* Fix suggestion */}
                              {d.fix && (
                                <div className="mt-3 flex items-start gap-2 px-3 py-2 rounded-lg bg-[var(--green)]/5 border border-[var(--green)]/10">
                                  <Zap className="w-3 h-3 mt-0.5 text-[var(--green)] shrink-0" />
                                  <span className="text-[12px] text-[var(--green)]">
                                    <strong>Fix:</strong> {d.fix}
                                  </span>
                                </div>
                              )}

                              {/* Educational context */}
                              {education && (
                                <div className="mt-3 space-y-2">
                                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                                    {education.impact}
                                  </p>
                                  {education.example && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                      <CodeBlock
                                        code={education.example.bad}
                                        label="❌ Before"
                                      />
                                      <CodeBlock
                                        code={education.example.good}
                                        label="✅ After"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Perfect score message */}
                  {catDiagnostics.length === 0 && (
                    <div className="flex items-center gap-3 py-3 px-4 rounded-lg bg-[var(--green)]/5 border border-[var(--green)]/10">
                      <CheckCircle2 className="w-5 h-5 text-[var(--green)]" />
                      <div>
                        <p className="text-[13px] text-[var(--green)] font-medium">
                          Perfect score — all {meta.rules.length} rules passed
                        </p>
                        <p className="text-[12px] text-[var(--text-secondary)]">
                          No issues found in this category. Your{" "}
                          {cat.name.toLowerCase()} game is strong.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Collapsible>
            );
          })}
        </div>

        {/* ═══════ All Diagnostics (flat view) ═══════ */}
        <div id="diagnostics" className="space-y-4">
          <h2 className="text-[24px] sm:text-[28px] font-bold display flex items-center gap-3">
            <Target className="w-5 h-5 text-[var(--accent)]" />
            All Diagnostics
          </h2>

          {data.diagnostics.length === 0 ? (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[var(--green)]" />
              <div>
                <p className="text-[14px] text-[var(--green)] font-medium">
                  Zero issues
                </p>
                <p className="text-[13px] text-[var(--text-secondary)]">
                  All {totalRules} rules passed without any flags.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] divide-y divide-[var(--border)]">
              {data.diagnostics.map((d, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                  <SeverityIcon severity={d.severity} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[12px] mono text-[var(--text-secondary)]">
                        {d.file}
                        {d.line ? `:${d.line}` : ""}
                      </span>
                      <span className="text-[10px] mono px-1.5 py-0.5 rounded bg-white/5 text-[var(--text-dim)]">
                        {d.rule}
                      </span>
                      <span
                        className={`text-[10px] mono px-1.5 py-0.5 rounded ${
                          d.severity === "critical" || d.severity === "error"
                            ? "bg-[var(--red)]/10 text-[var(--red)]"
                            : d.severity === "warning"
                              ? "bg-[var(--amber)]/10 text-[var(--amber)]"
                              : "bg-white/5 text-[var(--text-dim)]"
                        }`}
                      >
                        {d.severity}
                      </span>
                    </div>
                    <p className="text-[13px] text-[var(--text)] mt-0.5">
                      {d.message}
                    </p>
                    {d.fix && (
                      <p className="text-[12px] text-[var(--green)] mt-1">
                        💡 {d.fix}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══════ Score Distribution ═══════ */}
        <div id="distribution" className="space-y-4">
          <h2 className="text-[24px] sm:text-[28px] font-bold display flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[var(--accent)]" />
            Score Distribution
          </h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] text-[var(--text-secondary)]">
                Where you stand among all scanned workspaces
              </span>
              <span className="text-[12px] mono" style={{ color: tier.color }}>
                Top {percentile}%
              </span>
            </div>
            <Histogram userScore={data.totalScore} />
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-white/3 p-3">
                <div className="text-[10px] mono text-[var(--text-dim)] mb-1">
                  Median
                </div>
                <div className="text-[16px] font-bold mono text-[var(--text-secondary)]">
                  64
                </div>
              </div>
              <div
                className="rounded-lg p-3"
                style={{ backgroundColor: tier.bg }}
              >
                <div className="text-[10px] mono text-[var(--text-dim)] mb-1">
                  Your Score
                </div>
                <div
                  className="text-[16px] font-bold mono"
                  style={{ color: tier.color }}
                >
                  {data.totalScore}
                </div>
              </div>
              <div className="rounded-lg bg-white/3 p-3">
                <div className="text-[10px] mono text-[var(--text-dim)] mb-1">
                  Top 1%
                </div>
                <div className="text-[16px] font-bold mono text-[var(--text-secondary)]">
                  98+
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ Scoring Methodology ═══════ */}
        <div id="methodology" className="space-y-4">
          <h2 className="text-[24px] sm:text-[28px] font-bold display flex items-center gap-3">
            <Zap className="w-5 h-5 text-[var(--accent)]" />
            Scoring Methodology
          </h2>
          <p className="text-[13px] text-[var(--text-secondary)] -mt-2">
            Understanding how AgentLinter calculates your score helps you
            prioritize improvements.
          </p>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6 space-y-5">
            {/* Base score */}
            <div>
              <h3 className="text-[15px] font-semibold mb-2">Base Score</h3>
              <p className="text-[13px] text-[var(--text-secondary)]">
                {SCORING_METHODOLOGY.base}
              </p>
            </div>

            {/* Deductions */}
            <div>
              <h3 className="text-[15px] font-semibold mb-3">Deductions</h3>
              <div className="space-y-2.5">
                {SCORING_METHODOLOGY.deductions.map((d) => (
                  <div key={d.severity} className="flex items-start gap-3">
                    <div
                      className="flex items-center justify-center w-[44px] h-[28px] rounded-lg mono text-[13px] font-bold shrink-0 mt-0.5"
                      style={{
                        color: d.color,
                        backgroundColor: `color-mix(in srgb, ${d.color} 12%, transparent)`,
                      }}
                    >
                      {d.points}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-[13px] font-medium"
                        style={{ color: d.color }}
                      >
                        {d.severity}
                      </span>
                      <span className="text-[12px] text-[var(--text-dim)] ml-1.5 break-words">
                        {d.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonuses */}
            <div>
              <h3 className="text-[15px] font-semibold mb-3">Bonus Points</h3>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-[12px]">
                {SCORING_METHODOLOGY.bonuses.map((b, i) => (
                  <div key={b.category} className="contents">
                    <span className="text-[var(--green)] mono font-medium whitespace-nowrap">
                      {b.category}
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      {b.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formula */}
            <div className="rounded-lg bg-[var(--bg)] border border-[var(--border)] p-4">
              <h3 className="text-[12px] font-semibold text-[var(--text-dim)] uppercase tracking-wider mb-2">
                Final Score Formula
              </h3>
              <code className="text-[14px] text-[var(--accent)]">
                Total = Σ (category_score × category_weight)
              </code>
              <div className="mt-3 text-[12px] mono text-[var(--text-dim)] space-y-1">
                {data.categories.map((cat) => {
                  const meta = CATEGORY_META[cat.name];
                  return (
                    <div key={cat.name} className="flex gap-2">
                      <span className="text-[var(--text-secondary)]">
                        {cat.name}:
                      </span>
                      <span>
                        {cat.score} × {meta.weight / 100} ={" "}
                        {((cat.score * meta.weight) / 100).toFixed(1)}
                      </span>
                    </div>
                  );
                })}
                <div className="border-t border-[var(--border)] pt-1 mt-1 flex gap-2 font-medium text-[var(--accent)]">
                  <span>Total:</span>
                  <span>
                    {data.categories
                      .reduce(
                        (s, c) =>
                          s + (c.score * CATEGORY_META[c.name].weight) / 100,
                        0,
                      )
                      .toFixed(1)}{" "}
                    ≈ {data.totalScore}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ Files Scanned ═══════ */}
        <div id="files" className="space-y-4">
          <h2 className="text-[24px] sm:text-[28px] font-bold display flex items-center gap-3">
            <FileText className="w-5 h-5 text-[var(--accent)]" />
            Files Scanned ({data.filesScanned})
          </h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {data.files.map((f) => {
                const issues = data.diagnostics.filter((d) => d.file === f);
                const hasIssue = issues.length > 0;
                return (
                  <div
                    key={f}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-white/3 transition-colors"
                  >
                    {hasIssue ? (
                      <Info className="w-3 h-3 shrink-0 text-[var(--text-dim)]" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3 shrink-0 text-[var(--green)]" />
                    )}
                    <span className="text-[12px] mono text-[var(--text-secondary)] truncate">
                      {f}
                    </span>
                    {hasIssue && (
                      <span className="text-[10px] mono text-[var(--text-dim)] ml-auto shrink-0">
                        {issues.length} issue{issues.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════ Next Steps ═══════ */}
        <div id="next-steps" className="space-y-4">
          <h2 className="text-[24px] sm:text-[28px] font-bold display flex items-center gap-3">
            <ArrowRight className="w-5 h-5 text-[var(--accent)]" />
            Next Steps
          </h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6 space-y-4">
            {data.totalScore >= 95 ? (
              <>
                <div className="flex items-start gap-3">
                  <span className="text-[20px]">🏆</span>
                  <div>
                    <p className="text-[14px] font-semibold">
                      You&apos;re in the top tier.
                    </p>
                    <p className="text-[13px] text-[var(--text-secondary)] mt-1">
                      Your workspace is exceptionally well-configured. The
                      remaining info-level suggestions are minor polish — fix
                      them if you want perfection, or ship as-is with
                      confidence.
                    </p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] pt-4 space-y-3">
                  <p className="text-[13px] font-semibold">
                    Optional improvements:
                  </p>
                  {data.diagnostics.slice(0, 3).map((d, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-[12px] text-[var(--text-secondary)]"
                    >
                      <ChevronRight className="w-3 h-3 mt-0.5 text-[var(--text-dim)] shrink-0" />
                      <span>
                        <span className="mono text-[var(--text)]">
                          {d.file}
                        </span>{" "}
                        — {d.message.substring(0, 80)}
                        {d.fix && (
                          <span className="text-[var(--green)]">
                            {" "}
                            → {d.fix.substring(0, 60)}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : data.totalScore >= 80 ? (
              <div className="space-y-3">
                <p className="text-[14px] font-semibold">
                  Focus on these high-impact fixes:
                </p>
                {data.diagnostics
                  .sort((a, b) => {
                    const order = {
                      critical: 0,
                      error: 0,
                      warning: 1,
                      info: 2,
                    };
                    return (
                      (order[a.severity as keyof typeof order] || 2) -
                      (order[b.severity as keyof typeof order] || 2)
                    );
                  })
                  .slice(0, 5)
                  .map((d, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <SeverityIcon severity={d.severity} />
                      <div className="text-[13px]">
                        <span className="mono text-[var(--text-secondary)]">
                          {d.file}
                        </span>
                        <span className="text-[var(--text)]">
                          {" "}
                          — {d.message}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[14px] font-semibold">
                  Start with the criticals:
                </p>
                <p className="text-[13px] text-[var(--text-secondary)]">
                  Fix all <span className="text-[var(--red)]">critical</span>
                  -level issues first — these have the biggest impact on your
                  score and agent behavior. Then tackle{" "}
                  <span className="text-[var(--amber)]">warnings</span>. Info
                  items are polish.
                </p>
              </div>
            )}

            {/* Auto-fix hint */}
            {data.diagnostics.some((d) => d.fix) && (
              <div className="mt-4 rounded-lg bg-[var(--teal-dim)] border border-[var(--teal)]/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-3.5 h-3.5 text-[var(--teal)]" />
                  <span className="text-[12px] font-semibold text-[var(--teal)] uppercase tracking-wider">
                    Fixes Available
                  </span>
                </div>
                <p className="text-[13px] text-[var(--text-secondary)]">
                  {data.diagnostics.filter((d) => d.fix).length} issues have
                  suggested fixes. Apply the 💡 suggestions above to improve
                  your score.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ═══════ Share CTA ═══════ */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-8 text-center space-y-4">
          <div className="text-[28px]">{tier.emoji}</div>
          <p className="text-[18px] font-bold display">
            Score: {data.totalScore}/100 · {tier.grade} Tier
          </p>
          <p className="text-[13px] text-[var(--text-secondary)]">
            Share your score and help other developers discover AgentLinter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={shareUrl}
              target="_blank"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-[14px] font-semibold transition-all hover:brightness-125"
              style={{ backgroundColor: tier.color, color: "black" }}
            >
              <Share2 className="w-4 h-4" />
              Share on X
            </a>
            <a
              href="https://github.com/seojoonkim/agentlinter"
              target="_blank"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-[14px] font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-hover)] transition-all"
            >
              <Github className="w-4 h-4" />
              Star on GitHub
            </a>
          </div>
          <div className="text-[13px] text-[var(--text-dim)] pt-2">
            Score your own agent →{" "}
            <code className="text-[var(--accent)]">npx agentlinter</code>
            <span className="mx-2">·</span>
            Free & open source
          </div>
        </div>

        {/* ═══════ Privacy Note ═══════ */}
        <div className="rounded-xl border border-[var(--teal-dim)] bg-[var(--teal-dim)] p-4 flex items-start gap-3">
          <Lock className="w-4 h-4 text-[var(--teal)] mt-0.5 shrink-0" />
          <div className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
            <span className="font-medium text-[var(--teal)]">
              🔒 Results only — files never uploaded.
            </span>{" "}
            AgentLinter scans 100% locally. This report contains only scores and
            diagnostic messages. Your actual file contents (CLAUDE.md, SOUL.md,
            etc.) never leave your machine.{" "}
            <a
              href="https://agentlinter.com/#privacy"
              className="text-[var(--teal)] hover:underline"
            >
              Learn more →
            </a>
          </div>
        </div>

        {/* ═══════ Spread the Word ═══════ */}
        <div className="rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--accent-dim)] to-[var(--teal-dim)] p-5 text-center">
          <p className="text-[14px] font-medium text-[var(--text)] mb-2">
            🙌 Help fellow agent builders
          </p>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4 max-w-[400px] mx-auto">
            If AgentLinter helped you improve your agent setup, share it with
            developers in your community. Every share helps the ecosystem.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(`My agent workspace scored ${data.totalScore}/100 on AgentLinter ⚡\n\nFree & open source — score your own:\nnpx agentlinter\n\nagentlinter.com`)}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-medium bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-hover)] transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              Share on X
            </a>
            <a
              href="https://github.com/seojoonkim/agentlinter"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-medium bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-hover)] transition-all"
            >
              ⭐ Star on GitHub
            </a>
          </div>
        </div>

        {/* ═══════ Footer ═══════ */}
        <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between text-[12px] text-[var(--text-dim)]">
          <div className="flex items-center gap-2">
            <Logo size={14} />
            <span>AgentLinter</span>
            <span className="text-[10px] mono">v0.1.0</span>
          </div>
          <span className="mono">
            {new Date(data.timestamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </main>
    </div>
  );
}
