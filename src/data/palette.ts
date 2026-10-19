import type { Lens } from "./types";

/** Matches the CSS tokens in styles.css. Continuous ramps can't be Tailwind classes. */
export const INK = "#1c2824";
export const MID = "#3d6b56";
export const BRASS = "#e0a45a";
export const NEG = "#1a4550";
export const FLAT = "#2a3330";
export const DIM = "#1a221f";

function hex(color: string): [number, number, number] {
  const n = Number.parseInt(color.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: string, b: string, t: number): string {
  const pa = hex(a);
  const pb = hex(b);
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function ramp(value: number, lo: number, hi: number, stops: [string, string, string]): string {
  const t = clamp((value - lo) / (hi - lo), 0, 1);
  if (t < 0.5) return mix(stops[0], stops[1], t / 0.5);
  return mix(stops[1], stops[2], (t - 0.5) / 0.5);
}

export function colorFor(value: number, lens: Lens): string {
  if (!Number.isFinite(value)) return DIM;
  if (lens === "level") return ramp(value, 0, 100, [INK, MID, BRASS]);
  return ramp(value, -24, 24, [NEG, FLAT, BRASS]);
}
