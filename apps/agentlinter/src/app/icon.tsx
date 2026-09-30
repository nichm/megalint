import { ImageResponse } from "next/og";
import { DNA_STRANDS, DNA_RUNGS, DNA_NODES } from "./dna-helix-svg";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
    </div>,
    { ...size },
  );
}
