import { METRICS, metricById } from "@/data/metrics";

export type AddedKind = "news" | "statistic" | "index";

export type AddedType = {
  id: string;
  label: string;
  kind: AddedKind;
  definition: string;
  calculation: string;
  sourceName: string;
  sourceUrl: string;
  published: string;
  why: string;
  query: string;
  baseId: string;
};

const KEY = "meridian.added.v1";

export function isKnownMetric(id: string): boolean {
  return METRICS.some((metric) => metric.id === id);
}

export function loadAdded(): AddedType[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isAdded);
  } catch {
    return [];
  }
}

export function saveAdded(rows: AddedType[]) {
  window.localStorage.setItem(KEY, JSON.stringify(rows));
}

export function isAdded(value: unknown): value is AddedType {
  if (!value || typeof value !== "object") return false;
  const row = value as AddedType;
  return typeof row.id === "string" && typeof row.label === "string" && isKnownMetric(row.baseId);
}

export function addedBase(row: AddedType) {
  return metricById(row.baseId);
}

export function packAdded(row: AddedType): string {
  const bytes = new TextEncoder().encode(JSON.stringify(row));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

export function unpackAdded(packed: string): AddedType | null {
  try {
    const binary = atob(packed.replaceAll("-", "+").replaceAll("_", "/"));
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as unknown;
    return isAdded(parsed) ? parsed : null;
  } catch {
    return null;
  }
}