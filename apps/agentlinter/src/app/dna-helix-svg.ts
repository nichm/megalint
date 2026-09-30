/**
 * Shared DNA helix SVG path data for next/og ImageResponse.
 * Satori (the renderer) only supports intrinsic elements, so we export
 * raw path data that both icon.tsx and opengraph-image.tsx inline.
 */

export const DNA_STRANDS = {
  left: "M10 4 C10 9, 22 11, 22 16 C22 21, 10 23, 10 28",
  right: "M22 4 C22 9, 10 11, 10 16 C10 21, 22 23, 22 28",
} as const;

export const DNA_RUNGS = [
  { x1: 12, y1: 8, x2: 20, y2: 8, opacity: 0.15 },
  { x1: 14, y1: 12.5, x2: 18, y2: 12.5, opacity: 0.1 },
  { x1: 14, y1: 19.5, x2: 18, y2: 19.5, opacity: 0.1 },
  { x1: 12, y1: 24, x2: 20, y2: 24, opacity: 0.15 },
] as const;

export const DNA_NODES = [
  { cx: 16, cy: 10.5, r: 2, fill: "#a78bfa" },
  { cx: 16, cy: 16, r: 2.5, fill: "#5eead4" },
  { cx: 16, cy: 21.5, r: 2, fill: "#a78bfa" },
] as const;
