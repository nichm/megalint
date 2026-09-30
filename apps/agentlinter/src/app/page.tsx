"use client";

import { motion } from "framer-motion";
import {
  Terminal,
  ArrowRight,
  Shield,
  FileText,
  Lock,
  Share2,
  Check,
  Sparkles,
  ExternalLink,
  Minus,
  CircleCheck,
  CircleMinus,
  Quote,
  ArrowUpRight,
  AlertTriangle,
  ChevronRight,
  Users,
} from "lucide-react";

import {
  Github,
  useGitHubStars,
  GitHubStarsBadge,
  Logo,
  RotatingAgentName,
  CopyCommand,
  FadeIn,
  AnimatedTerminal,
  ScoreCardPreview,
} from "./components/landing-components";

import {
  TRUST_BAR_LINKS,
  WHY_CARDS,
  HOW_STEPS,
  SKILL_DETECTION_ITEMS,
  VERDICT_LEVELS,
  EIGHT_DIMENSIONS,
  COMPARISON_ROWS,
  FLYWHEEL_STEPS,
  EVOLUTION_LEVELS,
  PRIVACY_CARDS,
  REPORT_FEATURES,
  ATTACK_LAYERS,
} from "./components/landing-data";

export default function Home() {
  const stars = useGitHubStars("seojoonkim/agentlinter");

  return (
    <div className="min-h-screen noise">
      {/* ── Nav ── */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-[var(--bg)]/80 border-b border-[var(--border)] px-5 sm:px-8" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="max-w-[1000px] mx-auto h-14 flex items-center">
          <div className="flex items-center gap-0.5">
            <Logo size={22} />
            <span className="text-[19px]" style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 600, letterSpacing: "-0.01em" }}>
              Agent<span className="text-[var(--accent)]">Linter</span>
            </span>
            <span className="ml-1.5 text-[10px] mono text-[var(--text-dim)] bg-white/[0.04] px-1.5 py-0.5 rounded-md">v0.7.0</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 flex-1 justify-center">
            <a href="#why" className="text-[13px] text-[var(--text-dim)] hover:text-[var(--text-secondary)] transition-colors">Why</a>
            <a href="#how" className="text-[13px] text-[var(--text-dim)] hover:text-[var(--text-secondary)] transition-colors">How</a>
            <a href="#compare" className="text-[13px] text-[var(--text-dim)] hover:text-[var(--text-secondary)] transition-colors">Compare</a>
            <a href="#privacy" className="text-[13px] text-[var(--text-dim)] hover:text-[var(--text-secondary)] transition-colors">Privacy</a>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a href="https://github.com/seojoonkim/agentlinter" target="_blank" className="text-[13px] text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
              <GitHubStarsBadge stars={stars} />
            </a>
            <a href="#start" className="hidden sm:inline-flex text-[13px] px-4 py-1.5 rounded-lg bg-[var(--accent)] text-black font-semibold hover:brightness-110 transition-all">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-[120px] sm:pt-[140px] pb-8 sm:pb-12 px-5 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <motion.div className="max-w-[700px]" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--teal-dim)] text-[var(--teal)] text-[12px] sm:text-[13px] mono mb-3 whitespace-nowrap">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>Optimized for <span className="text-[var(--claude)]">CLAUDE.md</span> · Free &amp; Open Source</span>
            </div>
            <h1 className="display text-[36px] sm:text-[56px] lg:text-[72px] leading-[1.2] tracking-tight mb-5">
              Is your <RotatingAgentName />
              <br />
              <span className="text-[var(--accent)] glow-text">sharp & secure?</span>
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[var(--text-secondary)] leading-[1.7] mb-8 max-w-[540px]">
              Built on Anthropic&apos;s <span className="mono text-[var(--claude)] font-medium">CLAUDE.md</span> best practices. Lint your agent&apos;s clarity, structure, security, memory, and consistency in one command.
              Catch leaked secrets, vague instructions, and broken references before they cost you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all w-full sm:w-auto justify-center sm:justify-start">
                <Terminal className="w-4 h-4 text-[var(--text-dim)]" />
                <CopyCommand command="npx agentlinter" className="text-[15px]" />
              </div>
              <a href="https://github.com/seojoonkim/agentlinter" target="_blank" className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-[14px] hover:text-white hover:border-[var(--border-hover)] transition-all w-full sm:w-auto">
                <Github className="w-4 h-4" /> View Source <GitHubStarsBadge stars={stars} />
              </a>
            </div>
            <p className="text-[13px] text-[var(--text-dim)] mono mb-12 sm:mb-16">Free &amp; open source · No config needed · Runs in seconds</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <AnimatedTerminal />
          </motion.div>
        </div>
        <div className="h-16 sm:h-24" />
      </section>

      {/* ── Trust Bar ── */}
      <section className="py-8 sm:py-10 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-center text-[12px] sm:text-[13px] text-[var(--text-dim)] mono mb-6 tracking-wider uppercase">Built on open standards</p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {TRUST_BAR_LINKS.map((item) => (
              <a key={item.label} href={item.href} target="_blank" className="text-[13px] sm:text-[14px] text-[var(--text-dim)] hover:text-[var(--text-secondary)] transition-colors flex items-center gap-1">
                {item.label} <ArrowUpRight className="w-3 h-3 opacity-40" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why It Matters ── */}
      <section id="why" className="py-18 sm:py-24 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <p className="text-[14px] mono text-[var(--accent)] mb-4 tracking-wider uppercase">Why this matters</p>
            <h2 className="display text-[32px] sm:text-[48px] lg:text-[56px] leading-[1.1] tracking-tight mb-6 max-w-[700px]">Your agent config is code.<br /><span className="text-[var(--text-secondary)]">Treat it like code.</span></h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-[1.8] mb-12 max-w-[580px]">
              A single CLAUDE.md file can dramatically change how your agent performs. Vague instructions produce vague results. Leaked secrets become vulnerabilities. Contradictions across files cause unpredictable behavior.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] max-w-[640px]">
              <Quote className="w-5 h-5 text-[var(--accent)] mb-4 opacity-50" />
              <p className="text-[15px] sm:text-[16px] text-[var(--text)] leading-[1.8] mb-4 italic">&ldquo;Be specific: &lsquo;Use 2-space indentation&rsquo; is better than &lsquo;Format code properly.&rsquo;&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent-dim)] flex items-center justify-center text-[11px] font-bold text-[var(--accent)]">A</div>
                <div>
                  <div className="text-[14px] text-[var(--text)]">Anthropic</div>
                  <a href="https://code.claude.com/docs/en/memory" target="_blank" className="text-[12px] text-[var(--accent)] hover:underline flex items-center gap-1">CLAUDE.md Best Practices <ExternalLink className="w-3 h-3" /></a>
                </div>
              </div>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5">
            {WHY_CARDS.map((item, i) => (
              <FadeIn key={item.title} delay={0.1 * i}>
                <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all h-full">
                  <item.icon className="w-5 h-5 text-[var(--text-dim)] mb-5" />
                  <h3 className="font-semibold text-[15px] mb-3 leading-tight">{item.title}</h3>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7] mb-5">{item.desc}</p>
                  <div className="pt-4 border-t border-[var(--border)]">
                    <span className="text-[22px] font-bold text-[var(--teal)]">{item.stat}</span>
                    <p className="text-[12px] text-[var(--text-dim)] mt-1">{item.statLabel}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="py-18 sm:py-24 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <p className="text-[14px] mono text-[var(--teal)] mb-4 tracking-wider uppercase">How it works</p>
            <h2 className="display text-[32px] sm:text-[48px] lg:text-[56px] leading-[1.1] tracking-tight mb-5">One command. <span className="text-[var(--teal)]">Full diagnosis.</span></h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-12 max-w-[520px]">No setup. No config files. Point it at your workspace and get an instant, actionable report.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {HOW_STEPS.map((item, i) => (
              <FadeIn key={item.step} delay={0.1 * i}>
                <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all h-full group">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] mono text-[var(--teal)] bg-[var(--teal-dim)] px-2.5 py-1 rounded-lg">{item.step}</span>
                    <item.icon className="w-5 h-5 text-[var(--text-dim)] group-hover:text-[var(--teal)] transition-colors" />
                  </div>
                  <h3 className="text-[18px] font-semibold mb-3">{item.title}</h3>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7] mb-4">{item.desc}</p>
                  <p className="text-[13px] text-[var(--text-dim)] leading-[1.6]">{item.detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skill Security Scanner ── */}
      <section className="py-18 sm:py-24 px-5 sm:px-8 border-t border-[var(--border)] bg-gradient-to-b from-[var(--red)]/[0.02] to-transparent">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--red)]/30 text-[var(--red)] text-[12px] sm:text-[13px] mono mb-4">
              <Shield className="w-3 h-3" /><span>NEW in v0.7.0</span>
            </div>
            <p className="text-[14px] mono text-[var(--red)] mb-4 tracking-wider uppercase">Security Scanner</p>
            <h2 className="display text-[32px] sm:text-[48px] lg:text-[56px] leading-[1.1] tracking-tight mb-5">Scan skills before they<br /><span className="text-[var(--red)]">compromise your agent.</span></h2>
            <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-[1.7] mb-8 max-w-[600px]">
              The MoltX incident exposed <span className="text-[var(--red)] font-semibold">440,000 agents</span> to private key theft through a malicious skill. AgentLinter now scans skills for hidden attack vectors before you install them.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--red)]/20">
              <h3 className="text-[16px] font-semibold mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-[var(--red)]" /> 3-Layer Attack Structure</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {ATTACK_LAYERS.map((item) => (
                  <div key={item.layer} className="p-4 rounded-xl bg-white/[0.02] border border-[var(--border)]">
                    <span className="text-[11px] mono px-2 py-0.5 rounded" style={{ color: item.color, backgroundColor: `${item.color}15` }}>{item.layer}</span>
                    <h4 className="text-[14px] font-semibold mt-2 mb-1">{item.title}</h4>
                    <p className="text-[13px] text-[var(--text-dim)] leading-[1.5]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {SKILL_DETECTION_ITEMS.map((item, i) => (
              <FadeIn key={item.title} delay={0.05 * i}>
                <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--red)]/30 transition-all h-full">
                  <div className="flex items-center justify-between mb-3">
                    <item.icon className="w-4 h-4 text-[var(--text-dim)]" />
                    <span className="text-[9px] mono text-[var(--red)] bg-[var(--red)]/10 px-1.5 py-0.5 rounded">{item.severity}</span>
                  </div>
                  <h3 className="font-semibold text-[14px] mb-1">{item.title}</h3>
                  <p className="text-[12px] text-[var(--text-dim)] leading-[1.5]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.15}>
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] mb-10">
              <h3 className="text-[15px] font-semibold mb-4">Verdict Levels</h3>
              <div className="flex flex-wrap gap-3">
                {VERDICT_LEVELS.map((v) => (
                  <div key={v.label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.02] border border-[var(--border)]">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
                    <span className="text-[13px] font-semibold" style={{ color: v.color }}>{v.label}</span>
                    <span className="text-[12px] text-[var(--text-dim)]">— {v.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
                <div className="text-[11px] mono text-[var(--teal)] mb-2">DEFAULT SCAN</div>
                <CopyCommand command="npx agentlinter" className="text-[15px] mb-3" />
                <p className="text-[13px] text-[var(--text-dim)]">Score + Skill scan + Share (all-in-one)</p>
              </div>
              <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
                <div className="text-[11px] mono text-[var(--red)] mb-2">PRE-INSTALL CHECK</div>
                <CopyCommand command="npx agentlinter scan <url>" className="text-[15px] mb-3" />
                <p className="text-[13px] text-[var(--text-dim)]">Verify external skill before installing</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Auto Mode Detection ── */}
      <section className="py-18 sm:py-24 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <p className="text-[14px] mono text-[var(--teal)] mb-4 tracking-wider uppercase">Smart Detection</p>
            <h2 className="display text-[32px] sm:text-[48px] lg:text-[56px] leading-[1.1] tracking-tight mb-5">Project vs Agent. <span className="text-[var(--teal)]">Auto-detected.</span></h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-12 max-w-[560px]">AgentLinter automatically detects your workspace type and adjusts recommendations. No configuration needed.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { mode: "PROJECT MODE", color: "accent", title: "Claude Code Projects", trigger: "CLAUDE.md", items: ["Project-scoped rules", "No memory strategy requirements", "No USER.md recommendations", "No session handoff checks"] },
              { mode: "AGENT MODE", color: "teal", title: "OpenClaw / Moltbot Agents", trigger: "AGENTS.md`, `openclaw.json`, or `moltbot.json", items: ["Full rule set applied", "Memory strategy checks", "User context recommendations", "Session handoff validation"] },
            ].map((m, i) => (
              <FadeIn key={m.mode} delay={0.1 * (i + 1)}>
                <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[11px] mono text-[var(--${m.color})] bg-[var(--${m.color})]/10 px-2.5 py-1 rounded-lg`}>{m.mode}</span>
                  </div>
                  <h3 className="text-[18px] font-semibold mb-3">{m.title}</h3>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7] mb-4">
                    Detected when <code className={`text-[var(--${m.color})] bg-[var(--${m.color})]/10 px-1.5 py-0.5 rounded text-[13px]`}>{m.trigger}</code> exists.
                  </p>
                  <ul className="text-[13px] text-[var(--text-dim)] space-y-2">
                    {m.items.map((item) => <li key={item}>✓ {item}</li>)}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Eight Dimensions ── */}
      <section className="py-18 sm:py-24 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <p className="text-[14px] mono text-[var(--accent)] mb-4 tracking-wider uppercase">Scoring Engine</p>
            <h2 className="display text-[32px] sm:text-[48px] lg:text-[56px] leading-[1.1] tracking-tight mb-5">Eight dimensions. <span className="text-[var(--accent)]">Real rules.</span></h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-12 max-w-[560px]">Not a vibe check. Every score is backed by specific, documented rules derived from Anthropic&apos;s guidelines, security best practices, and patterns from high-performing agent workspaces.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EIGHT_DIMENSIONS.map((dim, i) => (
              <FadeIn key={dim.title} delay={0.05 * i}>
                <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5"><dim.icon className="w-4 h-4 text-[var(--text-dim)]" /><h3 className="font-semibold text-[15px]">{dim.title}</h3></div>
                    <span className="text-[11px] mono text-[var(--text-dim)] bg-white/[0.03] px-2 py-0.5 rounded-md">{dim.weight}</span>
                  </div>
                  <ul className="space-y-1.5 mb-4 flex-1">
                    {dim.rules.map((rule) => (
                      <li key={rule} className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[var(--text-dim)] mt-2 shrink-0" /><span className="text-[13px] text-[var(--text-secondary)] leading-[1.5]">{rule}</span></li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-[var(--border)]"><code className="text-[11.5px] text-[var(--text-dim)] mono leading-[1.6] break-all">{dim.example}</code></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── VS Anthropic ── */}
      <section id="compare" className="py-18 sm:py-24 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <p className="text-[14px] mono text-[var(--teal)] mb-4 tracking-wider uppercase">How we&apos;re different</p>
            <h2 className="display text-[32px] sm:text-[48px] lg:text-[56px] leading-[1.1] tracking-tight mb-4 max-w-[700px]"><span className="text-[var(--claude)]">Anthropic</span> built the foundation.<br /><span className="text-[var(--accent)]">We built the linter.</span></h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-14 max-w-[600px]">
              Anthropic&apos;s Claude Code provides <a href="https://code.claude.com/docs/en/memory" target="_blank" className="text-[var(--accent)] hover:underline">CLAUDE.md memory</a> and <a href="https://code.claude.com/docs/en/skills" target="_blank" className="text-[var(--accent)] hover:underline">skills</a> — the building blocks. AgentLinter analyzes whether you&apos;re using them effectively.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-[var(--border)] overflow-hidden overflow-x-auto">
              <div className="grid grid-cols-[140px_1fr_1fr] bg-white/[0.02] min-w-[600px]">
                <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-r border-[var(--border)]"><span className="text-[12px] text-[var(--text-dim)] mono">Feature</span></div>
                <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-r border-[var(--border)] text-center"><div className="text-[13px] text-[var(--text-secondary)]">Claude Code</div><div className="text-[10px] text-[var(--text-dim)] mono mt-0.5">Anthropic Official</div></div>
                <div className="px-4 py-2.5 sm:px-5 sm:py-3 text-center"><div className="text-[13px] font-semibold text-[var(--accent)]">AgentLinter</div></div>
              </div>
              {COMPARISON_ROWS.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-[140px_1fr_1fr] min-w-[600px] ${i % 2 === 0 ? "bg-[var(--bg)]" : "bg-white/[0.01]"}`}>
                  <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-r border-t border-[var(--border)]"><span className="text-[13px] font-medium">{row.feature}</span></div>
                  <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-r border-t border-[var(--border)] flex items-center gap-2">
                    {row.os === "full" ? <CircleCheck className="w-3.5 h-3.5 text-[var(--green)] shrink-0" /> : row.os === "partial" ? <CircleMinus className="w-3.5 h-3.5 text-[var(--amber)] shrink-0" /> : <Minus className="w-3.5 h-3.5 text-[var(--text-dim)] shrink-0" />}
                    <span className="text-[13px] text-[var(--text-secondary)]">{row.official}</span>
                  </div>
                  <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-t border-[var(--border)] flex items-center gap-2">
                    <CircleCheck className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span className="text-[13px] text-[var(--text-secondary)]">{row.ours}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-8 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center shrink-0 mt-0.5"><Sparkles className="w-4 h-4 text-[var(--accent)]" /></div>
              <div>
                <p className="text-[14px] text-[var(--text)] font-medium mb-1">Not a replacement — an extension.</p>
                <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7]">AgentLinter builds on Anthropic&apos;s <a href="https://code.claude.com/docs/en/memory" target="_blank" className="text-[var(--accent)] hover:underline">CLAUDE.md standard</a> and the <a href="https://agentskills.io" target="_blank" className="text-[var(--accent)] hover:underline">Agent Skills open standard</a>. Think of it as ESLint for JavaScript — the language gives you the syntax, the linter tells you if your code is good.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Report + Share ── */}
      <section className="py-18 sm:py-24 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <p className="text-[14px] mono text-[var(--accent)] mb-4 tracking-wider uppercase">Reports</p>
                <h2 className="display text-[32px] sm:text-[48px] leading-[1.1] tracking-tight mb-5">Your score card.<br /><span className="text-[var(--teal)]">Share it.</span></h2>
                <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-8">Every run generates a web report with tier grade, category breakdown, prescriptions, and percentile ranking. Track progress over time.</p>
                <div className="space-y-3.5">
                  {REPORT_FEATURES.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-[var(--accent-dim)] flex items-center justify-center mt-0.5 shrink-0"><Check className="w-2.5 h-2.5 text-[var(--accent)]" /></div>
                      <span className="text-[14px] text-[var(--text-secondary)] leading-[1.5]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}><div className="flex justify-center"><ScoreCardPreview /></div></FadeIn>
          </div>
        </div>
      </section>

      {/* ── Self-Evolving ── */}
      <section className="py-18 sm:py-24 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <p className="text-[14px] mono text-[var(--teal)] mb-4 tracking-wider uppercase">Intelligence</p>
            <h2 className="display text-[32px] sm:text-[48px] leading-[1.1] tracking-tight mb-5">Rules that <span className="text-[var(--accent)]">learn.</span></h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-12 max-w-[540px]">Every lint teaches us something. Common failures become new rules. Bad fixes get replaced. The engine improves with every run.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-14 justify-center sm:justify-start">
              {FLYWHEEL_STEPS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex flex-col items-center gap-1.5 w-12 sm:w-14">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center"><s.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-dim)]" /></div>
                    <span className="text-[10px] sm:text-[11px] text-[var(--text-dim)] mono truncate">{s.label}</span>
                  </div>
                  {i < 4 && <ChevronRight className="w-3 h-3 text-[var(--text-dim)] mt-[-16px]" />}
                </div>
              ))}
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EVOLUTION_LEVELS.map((item, i) => (
              <FadeIn key={item.title} delay={0.05 * i}>
                <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] h-full flex flex-col">
                  <span className="text-[11px] mono text-[var(--accent)] bg-[var(--accent-dim)] px-2 py-0.5 rounded-lg self-start">{item.level}</span>
                  <h3 className="font-semibold text-[14px] mt-3 mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.6] flex-1">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="text-[12px] text-[var(--text-dim)] mt-6 mono">All data anonymized · opt-out: --no-telemetry</p>
        </div>
      </section>

      {/* ── Privacy & Security ── */}
      <section id="privacy" className="py-18 sm:py-24 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <p className="text-[14px] mono text-[var(--teal)] mb-4 tracking-wider uppercase">Privacy &amp; Security</p>
            <h2 className="display text-[32px] sm:text-[48px] lg:text-[56px] leading-[1.1] tracking-tight mb-6 max-w-[700px]">Your files never leave<br /><span className="text-[var(--teal)]">your machine.</span></h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-12 max-w-[560px]">
              All scanning and scoring runs 100% locally. Your file contents never leave your machine. Report sharing is optional — when enabled, only scores and diagnostic messages are uploaded (not your actual files). Use <code className="text-[var(--teal)] bg-[var(--teal)]/10 px-1.5 py-0.5 rounded text-[13px]">--local</code> to skip sharing entirely.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRIVACY_CARDS.map((item, i) => (
              <FadeIn key={item.title} delay={0.05 * i}>
                <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all h-full">
                  <div className="flex items-center justify-between mb-4">
                    <item.icon className="w-5 h-5 text-[var(--teal)]" />
                    <span className="text-[11px] mono text-[var(--teal)] bg-[var(--teal-dim)] px-2 py-0.5 rounded-lg">{item.badge}</span>
                  </div>
                  <h3 className="font-semibold text-[15px] mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.7]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.15}>
            <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[var(--teal-dim)] border border-[var(--teal)]/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--teal)]/15 flex items-center justify-center shrink-0"><Shield className="w-5 h-5 text-[var(--teal)]" /></div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--teal)] mb-2">TL;DR</h3>
                  <p className="text-[15px] text-[var(--text)] leading-[1.7]">AgentLinter reads your files locally, scores them locally, and outputs results locally. Nothing touches a server unless <em>you</em> choose to share a report — and even then, only scores and diagnostic messages are included, never your actual file contents.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Get Started ── */}
      <section id="start" className="py-22 sm:py-28 px-5 sm:px-8 border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-[600px] h-[400px] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[120px]" /></div>
        <div className="max-w-[640px] mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="display text-[32px] sm:text-[48px] lg:text-[56px] leading-[1.1] tracking-tight mb-5">One command.<br /><span className="text-[var(--accent)] glow-text">Try it now.</span></h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-8 max-w-[440px] mx-auto">Run it in your agent workspace. Get your score in seconds. No signup. No API key. No config.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] glow-accent mb-5 w-full sm:w-auto justify-center">
              <Terminal className="w-5 h-5 text-[var(--text-dim)]" />
              <CopyCommand command="npx agentlinter" className="text-[17px] sm:text-[19px]" />
            </div>
            <p className="text-[13px] text-[var(--text-dim)] mono mb-8">100% free &amp; open source · Click to copy · Node.js 18+</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://github.com/seojoonkim/agentlinter" target="_blank" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-[14px] hover:text-white hover:border-[var(--border-hover)] transition-all w-full sm:w-auto">
                <Github className="w-4 h-4" /> Star on GitHub <GitHubStarsBadge stars={stars} />
              </a>
              <a href="https://github.com/seojoonkim/agentlinter#readme" target="_blank" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-[14px] hover:text-white hover:border-[var(--border-hover)] transition-all w-full sm:w-auto">
                <FileText className="w-4 h-4" /> Read the Docs
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Spread the Word ── */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[600px] mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--teal-dim)] mb-5"><Share2 className="w-5 h-5 text-[var(--teal)]" /></div>
            <h3 className="display text-[22px] sm:text-[28px] leading-[1.2] mb-4">Help us help more agents</h3>
            <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-[1.7] mb-8 max-w-[480px] mx-auto">If AgentLinter helped improve your agent setup, share it with fellow developers. Every share helps the open-source agent ecosystem grow stronger.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`https://x.com/intent/tweet?text=${encodeURIComponent("Just discovered AgentLinter — it's like ESLint for AI agents. Scores your CLAUDE.md, AGENTS.md and agent workspace files.\n\nFree & open source:\nnpx agentlinter\n\nagentlinter.com")}`} target="_blank" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] text-[14px] hover:text-white hover:border-[var(--border-hover)] transition-all w-full sm:w-auto">
                <ArrowUpRight className="w-3.5 h-3.5" /> Share on X
              </a>
              <a href="https://github.com/seojoonkim/agentlinter" target="_blank" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] text-[14px] hover:text-white hover:border-[var(--border-hover)] transition-all w-full sm:w-auto">
                <Github className="w-3.5 h-3.5" /> Star on GitHub <GitHubStarsBadge stars={stars} />
              </a>
              <a href="https://github.com/seojoonkim/agentlinter/discussions" target="_blank" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] text-[14px] hover:text-white hover:border-[var(--border-hover)] transition-all w-full sm:w-auto">
                <Users className="w-3.5 h-3.5" /> Join Community
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Acknowledgments ── */}
      <section className="py-10 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[600px] mx-auto text-center">
          <FadeIn>
            <p className="text-[12px] mono text-[var(--text-dim)] mb-3 tracking-wider uppercase">Acknowledgments</p>
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7]">
              Skill Security Scanner was inspired by <a href="https://dev.to/sebayaki/moltx-44-1plm" target="_blank" className="text-[var(--accent)] hover:underline">@sebayaki&apos;s MoltX security analysis</a> — thank you for uncovering the vulnerability that protects 440K+ agents today.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-5 sm:px-8 border-t border-[var(--border)]">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-[13px]">
              <div className="flex items-center gap-2"><Logo size={16} /><span className="font-semibold">AgentLinter</span></div>
              <span className="text-[var(--text-dim)]">·</span>
              <span className="text-[var(--text-dim)]">Free &amp; Open Source ESLint for AI Agents</span>
            </div>
            <div className="flex items-center gap-6 text-[13px] text-[var(--text-dim)]">
              <a href="https://github.com/seojoonkim/agentlinter" className="hover:text-[var(--text-secondary)] transition-colors flex items-center gap-1.5"><Github className="w-3.5 h-3.5" /> GitHub <GitHubStarsBadge stars={stars} /></a>
              <a href="https://twitter.com/simonkim_nft" target="_blank" className="hover:text-[var(--text-secondary)] transition-colors">@simonkim_nft</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
            <p className="text-[12px] text-[var(--text-dim)] leading-[1.8]">
              Built on <a href="https://code.claude.com/docs/en/memory" target="_blank" className="hover:text-[var(--text-secondary)] transition-colors">Anthropic&apos;s CLAUDE.md standard</a> · <a href="https://agentskills.io" target="_blank" className="hover:text-[var(--text-secondary)] transition-colors">Agent Skills open standard</a> · <a href="https://code.claude.com/docs/en/skills" target="_blank" className="hover:text-[var(--text-secondary)] transition-colors">Claude Code Skills</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
