"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  Check,
  ChevronDown,
  Copy,
  Eye,
  FileText,
  Info,
  Layers,
  Puzzle,
  Scale,
  Shield,
} from "lucide-react";

export function Github({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M10 4 C10 9, 22 11, 22 16 C22 21, 10 23, 10 28"
        stroke="url(#lg)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 4 C22 9, 10 11, 10 16 C10 21, 22 23, 22 28"
        stroke="#5eead4"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1="12"
        y1="8"
        x2="20"
        y2="8"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <line
        x1="14"
        y1="12.5"
        x2="18"
        y2="12.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.15"
      />
      <line
        x1="14"
        y1="19.5"
        x2="18"
        y2="19.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.15"
      />
      <line
        x1="12"
        y1="24"
        x2="20"
        y2="24"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <circle cx="16" cy="10.5" r="1.5" fill="#a78bfa" />
      <circle cx="16" cy="16" r="2" fill="#5eead4" />
      <circle cx="16" cy="21.5" r="1.5" fill="#a78bfa" />
      <defs>
        <linearGradient id="lg" x1="10" y1="4" x2="22" y2="28">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function getTier(score: number) {
  if (score >= 98)
    return {
      grade: "S",
      color: "#c084fc",
      bg: "#c084fc18",
      label: "Exceptional",
      emoji: "🏆",
    };
  if (score >= 96)
    return {
      grade: "A+",
      color: "#a78bfa",
      bg: "#a78bfa18",
      label: "Outstanding",
      emoji: "⭐",
    };
  if (score >= 93)
    return {
      grade: "A",
      color: "#818cf8",
      bg: "#818cf818",
      label: "Excellent",
      emoji: "🎯",
    };
  if (score >= 90)
    return {
      grade: "A-",
      color: "#60a5fa",
      bg: "#60a5fa18",
      label: "Great",
      emoji: "✨",
    };
  if (score >= 85)
    return {
      grade: "B+",
      color: "#34d399",
      bg: "#34d39918",
      label: "Good",
      emoji: "👍",
    };
  if (score >= 80)
    return {
      grade: "B",
      color: "#4ade80",
      bg: "#4ade8018",
      label: "Decent",
      emoji: "👌",
    };
  if (score >= 75)
    return {
      grade: "B-",
      color: "#a3e635",
      bg: "#a3e63518",
      label: "Fair",
      emoji: "📝",
    };
  if (score >= 68)
    return {
      grade: "C+",
      color: "#fbbf24",
      bg: "#fbbf2418",
      label: "Needs Work",
      emoji: "🔧",
    };
  if (score >= 60)
    return {
      grade: "C",
      color: "#f59e0b",
      bg: "#f59e0b18",
      label: "Below Average",
      emoji: "📊",
    };
  if (score >= 55)
    return {
      grade: "C-",
      color: "#fb923c",
      bg: "#fb923c18",
      label: "Poor",
      emoji: "⚠️",
    };
  if (score >= 50)
    return {
      grade: "D",
      color: "#ef4444",
      bg: "#ef444418",
      label: "Weak",
      emoji: "🚨",
    };
  return {
    grade: "F",
    color: "#991b1b",
    bg: "#991b1b18",
    label: "Failing",
    emoji: "💀",
  };
}

export function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const cn = className || "w-4 h-4";
  switch (name) {
    case "Structure":
      return <Layers className={cn} />;
    case "Clarity":
      return <Eye className={cn} />;
    case "Completeness":
      return <Puzzle className={cn} />;
    case "Security":
      return <Shield className={cn} />;
    case "Consistency":
      return <Scale className={cn} />;
    default:
      return <FileText className={cn} />;
  }
}

export function SeverityIcon({ severity }: { severity: string }) {
  if (severity === "critical" || severity === "error")
    return <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[var(--red)]" />;
  if (severity === "warning")
    return (
      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-[var(--amber)]" />
    );
  return <Info className="w-3.5 h-3.5 shrink-0 text-[var(--text-dim)]" />;
}

export function Histogram({ userScore }: { userScore: number }) {
  const bins = [
    { range: "0–29", count: 3, min: 0, max: 29 },
    { range: "30–39", count: 5, min: 30, max: 39 },
    { range: "40–49", count: 12, min: 40, max: 49 },
    { range: "50–59", count: 22, min: 50, max: 59 },
    { range: "60–69", count: 35, min: 60, max: 69 },
    { range: "70–79", count: 28, min: 70, max: 79 },
    { range: "80–89", count: 15, min: 80, max: 89 },
    { range: "90–100", count: 6, min: 90, max: 100 },
  ];
  const max = Math.max(...bins.map((b) => b.count));
  const activeBin = bins.findIndex(
    (b) => userScore >= b.min && userScore <= b.max,
  );

  return (
    <div>
      <div className="flex items-end gap-1 h-[80px]">
        {bins.map((bin, i) => {
          const height = (bin.count / max) * 100;
          const isActive = i === activeBin;
          return (
            <div
              key={bin.range}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span
                className="text-[9px] mono"
                style={{
                  color: isActive ? "var(--accent)" : "var(--text-dim)",
                }}
              >
                {bin.count}
              </span>
              <div
                className="w-full rounded-sm transition-all"
                style={{
                  height: `${height}%`,
                  backgroundColor: isActive
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.06)",
                  minHeight: "3px",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1 mt-1.5">
        {bins.map((bin, i) => (
          <div
            key={bin.range}
            className="flex-1 text-center text-[9px] mono"
            style={{
              color: i === activeBin ? "var(--accent)" : "var(--text-dim)",
            }}
          >
            {bin.range}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  badge,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[var(--border)] rounded-xl bg-[var(--bg-card)] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 sm:px-5 py-3 sm:py-4 hover:bg-[var(--bg-card-hover)] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          {icon}
          <span className="text-[14px] font-semibold">{title}</span>
          {badge}
        </div>
        <ChevronDown
          className="w-4 h-4 text-[var(--text-dim)] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 sm:px-5 pb-4 sm:pb-5 border-t border-[var(--border)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-lg bg-[var(--bg)] border border-[var(--border)] overflow-hidden">
      {label && (
        <div className="px-3 py-1.5 border-b border-[var(--border)] text-[10px] mono text-[var(--text-dim)] uppercase tracking-wider">
          {label}
        </div>
      )}
      <pre className="px-3 py-2.5 text-[12px] mono leading-relaxed overflow-x-auto text-[var(--text-secondary)]">
        {code}
      </pre>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
      >
        {copied ? (
          <Check className="w-3 h-3 text-[var(--green)]" />
        ) : (
          <Copy className="w-3 h-3 text-[var(--text-dim)]" />
        )}
      </button>
    </div>
  );
}
