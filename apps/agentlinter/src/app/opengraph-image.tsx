import { ImageResponse } from "next/og";
import { DNA_STRANDS, DNA_RUNGS, DNA_NODES } from "./dna-helix-svg";

export const runtime = "nodejs";
export const alt = "AgentLinter - ESLint for AI Agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0a0a0f 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <svg width="120" height="120" viewBox="0 0 32 32" fill="none" style={{ marginBottom: 32 }}>
        <path d={DNA_STRANDS.left} stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d={DNA_STRANDS.right} stroke="#5eead4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <line x1={DNA_RUNGS[0].x1} y1={DNA_RUNGS[0].y1} x2={DNA_RUNGS[0].x2} y2={DNA_RUNGS[0].y2} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1={DNA_RUNGS[1].x1} y1={DNA_RUNGS[1].y1} x2={DNA_RUNGS[1].x2} y2={DNA_RUNGS[1].y2} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1={DNA_RUNGS[2].x1} y1={DNA_RUNGS[2].y1} x2={DNA_RUNGS[2].x2} y2={DNA_RUNGS[2].y2} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1={DNA_RUNGS[3].x1} y1={DNA_RUNGS[3].y1} x2={DNA_RUNGS[3].x2} y2={DNA_RUNGS[3].y2} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx={DNA_NODES[0].cx} cy={DNA_NODES[0].cy} r={DNA_NODES[0].r} fill={DNA_NODES[0].fill} />
        <circle cx={DNA_NODES[1].cx} cy={DNA_NODES[1].cy} r={DNA_NODES[1].r} fill={DNA_NODES[1].fill} />
        <circle cx={DNA_NODES[2].cx} cy={DNA_NODES[2].cy} r={DNA_NODES[2].r} fill={DNA_NODES[2].fill} />
      </svg>

      <div style={{ fontSize: 72, fontWeight: 700, color: "white", letterSpacing: "-0.02em", marginBottom: 16 }}>AgentLinter</div>
      <div style={{ fontSize: 32, color: "rgba(255,255,255,0.6)", marginBottom: 48 }}>ESLint for AI Agents</div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 32px", background: "rgba(255,255,255,0.05)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
        <span style={{ color: "#5eead4", fontSize: 24 }}>$</span>
        <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 24, fontFamily: "monospace" }}>npx agentlinter</span>
      </div>

      <div style={{ position: "absolute", bottom: 40, display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: 20 }}>
        Free & Open Source
      </div>
    </div>,
    { ...size },
  );
}
