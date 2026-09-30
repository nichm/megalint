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

export { Github, Logo } from "@/app/components/landing-components";

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
