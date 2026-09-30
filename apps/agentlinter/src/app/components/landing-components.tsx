"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Copy,
  CheckCheck,
  Share2,
  Star,
} from "lucide-react";

/* GitHub mark (lucide-react v1 removed brand icons) */
export function Github({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/* GitHub stars hook */
export function useGitHubStars(repo: string) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, [repo]);

  return stars;
}

/* GitHub stars badge */
export function GitHubStarsBadge({ stars, className = "" }: { stars: number | null; className?: string }) {
  if (stars === null) return null;
  const formatted = stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toString();
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[var(--amber)]/10 text-[var(--amber)] text-[11px] mono ${className}`}>
      <Star className="w-3 h-3 fill-current" />
      {formatted}
    </span>
  );
}

/* DNA helix logo (client-side, for landing page) */
export function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4 C10 9, 22 11, 22 16 C22 21, 10 23, 10 28" stroke="url(#strand-left)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M22 4 C22 9, 10 11, 10 16 C10 21, 22 23, 22 28" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="12" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="14" y1="12.5" x2="18" y2="12.5" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <line x1="14" y1="19.5" x2="18" y2="19.5" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <line x1="12" y1="24" x2="20" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <circle cx="16" cy="10.5" r="1.5" fill="#a78bfa" />
      <circle cx="16" cy="16" r="2" fill="#5eead4" />
      <circle cx="16" cy="21.5" r="1.5" fill="#a78bfa" />
      <defs>
        <linearGradient id="strand-left" x1="10" y1="4" x2="22" y2="28">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Agent name rotator */
const AGENT_NAMES = ["agent", "Claude Code", "Cursor", "Clawdbot", "Windsurf", "Moltbot"];

export function RotatingAgentName() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % AGENT_NAMES.length), 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block align-bottom">
      <span className="invisible whitespace-nowrap" aria-hidden="true">Claude Code</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={AGENT_NAMES[index]}
          className="absolute left-0 bottom-0 whitespace-nowrap bg-gradient-to-r from-[var(--text)] to-[var(--text-secondary)] bg-clip-text"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)", scale: 0.95 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(6px)", scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], opacity: { duration: 0.4 } }}
        >
          {AGENT_NAMES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* Animated counter */
export function Counter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* Copy command button */
export function CopyCommand({ command, className = "" }: { command: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(command); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className={`group relative inline-flex items-center gap-3 ${className}`}
    >
      <span className="mono text-[var(--accent-bright)]">{command}</span>
      {copied ? (
        <CheckCheck className="w-4 h-4 text-[var(--green)]" />
      ) : (
        <Copy className="w-4 h-4 text-[var(--text-dim)] group-hover:text-[var(--text-secondary)] transition-colors" />
      )}
    </button>
  );
}

/* Section fade-in */
export function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
}

/* Animated terminal */
export function AnimatedTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const terminalLines = [
    { text: "$ npx agentlinter", type: "command" },
    { text: "", type: "blank" },
    { text: "🔍 AgentLinter v1.0.0", type: "header" },
    { text: "📁 Scanning workspace: .claude/ + root", type: "info" },
    { text: "   Found 5 files: CLAUDE.md, SOUL.md, USER.md, TOOLS.md, SECURITY.md", type: "info" },
    { text: "", type: "blank" },
    { text: "  Workspace Score ........ 76/100  (B+)", type: "score" },
    { text: "  ├─ Structure     ████████░░  80", type: "detail" },
    { text: "  ├─ Clarity       ███████░░░  70", type: "detail" },
    { text: "  ├─ Completeness  ██████░░░░  60", type: "detail" },
    { text: "  ├─ Security      █████████░  90", type: "detail" },
    { text: "  ├─ Consistency   ██████░░░░  60", type: "detail" },
    { text: "  ├─ Memory        ████████░░  80", type: "detail" },
    { text: "  ├─ Runtime Cfg   █████████░  88", type: "detail" },
    { text: "  └─ Skill Safety  █████████░  92", type: "detail" },
    { text: "", type: "blank" },
    { text: "  2 critical(s) · 3 warning(s)", type: "warning" },
    { text: "", type: "blank" },
    { text: '  🔴 CRITICAL  TOOLS.md:14 — Secret: API key pattern "sk-proj-..."', type: "error" },
    { text: "  🔴 CRITICAL  SOUL.md ↔ CLAUDE.md — Conflicting persona definition", type: "error" },
    { text: '  ⚠️  WARN  CLAUDE.md:28 — Vague: "be helpful" → be specific', type: "warn" },
    { text: "  ⚠️  WARN  No error recovery strategy defined", type: "warn" },
    { text: "  ⚠️  WARN  2 cross-file references broken", type: "warn" },
    { text: "", type: "blank" },
    { text: "  💡 3 issues with suggested fixes. See report for details.", type: "success" },
    { text: "  📊 Report → agentlinter.com/r/a3f8k2", type: "success" },
  ];

  useEffect(() => {
    if (!inView || currentLine >= terminalLines.length) return;
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, terminalLines[currentLine].text]);
      setCurrentLine((prev) => prev + 1);
    }, currentLine === 0 ? 500 : terminalLines[currentLine].type === "blank" ? 60 : 90);
    return () => clearTimeout(timer);
  }, [inView, currentLine]);

  const getColor = (i: number) => {
    const t = terminalLines[i]?.type;
    if (t === "command") return "text-[var(--accent-bright)]";
    if (t === "header") return "text-white font-medium";
    if (t === "score") return "text-white font-medium";
    if (t === "error") return "text-[var(--red)]";
    if (t === "warn" || t === "warning") return "text-[var(--amber)]";
    if (t === "success") return "text-[var(--teal)]";
    return "text-[var(--text-dim)]";
  };

  return (
    <div ref={ref} className="rounded-2xl border border-[var(--border)] overflow-hidden bg-[#08080e] glow-accent">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)] bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-[var(--text-dim)] mono">~/my-agent</span>
      </div>
      <div className="p-6 sm:p-8 mono text-[12px] sm:text-[13px] leading-[1.9] min-h-[380px] sm:min-h-[420px] overflow-x-auto">
        {lines.map((line, i) => (
          <div key={i} className={getColor(i)}>{line || "\u00A0"}</div>
        ))}
        {currentLine < terminalLines.length && (
          <span className="inline-block w-1.5 h-3.5 bg-[var(--accent)] animate-pulse" />
        )}
      </div>
    </div>
  );
}

/* Score card preview */
export function ScoreCardPreview() {
  const cats = [
    { label: "Structure", score: 80, color: "#60a5fa" },
    { label: "Clarity", score: 90, color: "#a78bfa" },
    { label: "Completeness", score: 85, color: "#818cf8" },
    { label: "Security", score: 95, color: "#34d399" },
    { label: "Consistency", score: 75, color: "#fbbf24" },
    { label: "Memory", score: 88, color: "#f472b6" },
    { label: "Runtime Cfg", score: 92, color: "#38bdf8" },
    { label: "Skill Safety", score: 98, color: "#4ade80" },
  ];

  return (
    <motion.div className="w-full max-w-[400px]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden bg-[#08080e] glow-accent">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-2">
            <div className="bg-white/[0.04] rounded-md px-3 py-1 text-[11px] text-[var(--text-dim)] mono text-center">agentlinter.com/r/a3f8k2</div>
          </div>
        </div>
        <div className="p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo size={16} />
              <span className="text-[13px] text-[var(--text-dim)]">Score Report</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg text-[13px] font-bold mono text-[var(--accent)] bg-[var(--accent-dim)]">A</div>
          </div>
          <div className="flex items-end gap-4">
            <span className="text-[48px] font-bold text-white leading-none glow-text">87</span>
            <div className="pb-2">
              <div className="text-[12px] mono text-[var(--accent)]">Top 12%</div>
              <div className="text-[11px] text-[var(--text-dim)]">of all agents</div>
            </div>
          </div>
          <div className="space-y-2.5">
            {cats.map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <span className="text-[11px] text-[var(--text-secondary)] w-[76px] text-right mono">{c.label}</span>
                <div className="flex-1 h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" initial={{ width: 0 }} whileInView={{ width: `${c.score}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} style={{ backgroundColor: c.color, opacity: 0.8 }} />
                </div>
                <span className="text-[11px] w-5 mono" style={{ color: c.color }}>{c.score}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-[var(--border)]">
            <div className="text-[11px] text-[var(--text-dim)] mono mb-2">Top issues</div>
            <div className="space-y-1.5">
              {[
                { type: "CRITICAL", text: "Rotate exposed API key", color: "var(--red)" },
                { type: "WARN", text: "Add error recovery strategy", color: "var(--amber)" },
                { type: "TIP", text: "3 issues with suggested fixes", color: "var(--teal)" },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[9px] mono px-1 rounded" style={{ color: p.color, backgroundColor: `${p.color}15` }}>{p.type}</span>
                  <span className="text-[12px] text-[var(--text-secondary)]">{p.text}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[14px] font-medium bg-[var(--accent-dim)] text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-all">
            <Share2 className="w-3.5 h-3.5" />
            Share on X
          </button>
        </div>
      </div>
    </motion.div>
  );
}
