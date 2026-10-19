import type { Place } from "./types";

export type Anchor = {
  ppp: number;
  growth: number;
  inflation: number;
  unemployment: number;
  living: number;
  working: number;
  investing: number;
  safety: number;
  health: number;
  education: number;
  cost: number;
  governance: number;
  digital: number;
  tourism: number;
  conflict: number;
  openness: number;
  medianAge: number;
  popGrowth: number;
  urban: number;
  language: number;
  tax: number;
};

function A(partial: Partial<Anchor> & Pick<Anchor, "ppp" | "growth" | "living" | "working" | "investing">): Anchor {
  return {
    inflation: 3.2,
    unemployment: 6,
    safety: 58,
    health: 60,
    education: 58,
    cost: 42,
    governance: 52,
    digital: 52,
    tourism: 42,
    conflict: 18,
    openness: 54,
    medianAge: 30,
    popGrowth: 1,
    urban: 58,
    language: 46,
    tax: 40,
    ...partial,
  };
}

/** Regional medians. Country overrides pull well-known places off the median. */
const SUB: Record<string, Anchor> = {
  "Western Europe": A({ ppp: 64000, growth: 1.1, inflation: 2.2, unemployment: 5.5, living: 82, working: 76, investing: 70, safety: 76, health: 84, education: 82, cost: 74, governance: 82, digital: 88, tourism: 76, conflict: 8, openness: 84, medianAge: 43, popGrowth: 0.3, urban: 80, language: 68, tax: 62 }),
  "Northern Europe": A({ ppp: 66000, growth: 1.4, inflation: 2.3, unemployment: 6.2, living: 86, working: 78, investing: 74, safety: 82, health: 86, education: 86, cost: 76, governance: 88, digital: 90, tourism: 58, conflict: 6, openness: 86, medianAge: 42, popGrowth: 0.4, urban: 82, language: 84, tax: 68 }),
  "Southern Europe": A({ ppp: 42000, growth: 1.6, inflation: 2.4, unemployment: 9.5, living: 74, working: 64, investing: 62, safety: 72, health: 78, education: 74, cost: 62, governance: 68, digital: 78, tourism: 84, conflict: 10, openness: 76, medianAge: 45, popGrowth: 0.1, urban: 74, language: 42, tax: 58 }),
  "Eastern Europe": A({ ppp: 36000, growth: 2.4, inflation: 4.2, unemployment: 4.8, living: 64, working: 68, investing: 62, safety: 70, health: 68, education: 74, cost: 46, governance: 60, digital: 76, tourism: 52, conflict: 18, openness: 68, medianAge: 42, popGrowth: -0.2, urban: 66, language: 46, tax: 46 }),
  "Northern America": A({ ppp: 62000, growth: 2, inflation: 2.6, unemployment: 4.8, living: 78, working: 76, investing: 78, safety: 70, health: 76, education: 80, cost: 72, governance: 76, digital: 86, tourism: 64, conflict: 10, openness: 80, medianAge: 39, popGrowth: 0.6, urban: 82, language: 92, tax: 44 }),
  "Central America": A({ ppp: 14000, growth: 3.2, inflation: 4, unemployment: 6, living: 52, working: 54, investing: 52, safety: 46, health: 54, education: 52, cost: 40, governance: 46, digital: 52, tourism: 58, conflict: 28, openness: 58, medianAge: 27, popGrowth: 1.2, urban: 62, language: 32, tax: 36 }),
  Caribbean: A({ ppp: 18000, growth: 2.2, inflation: 3.6, unemployment: 8, living: 56, working: 52, investing: 48, safety: 52, health: 56, education: 56, cost: 52, governance: 52, digital: 58, tourism: 78, conflict: 16, openness: 60, medianAge: 33, popGrowth: 0.5, urban: 58, language: 70, tax: 34 }),
  "South America": A({ ppp: 18000, growth: 2.2, inflation: 6, unemployment: 8, living: 54, working: 52, investing: 50, safety: 46, health: 58, education: 58, cost: 44, governance: 48, digital: 62, tourism: 56, conflict: 22, openness: 52, medianAge: 32, popGrowth: 0.8, urban: 78, language: 28, tax: 42 }),
  "Eastern Asia": A({ ppp: 28000, growth: 3.4, inflation: 1.6, unemployment: 3.8, living: 68, working: 72, investing: 66, safety: 76, health: 74, education: 78, cost: 58, governance: 64, digital: 82, tourism: 60, conflict: 16, openness: 62, medianAge: 40, popGrowth: 0.1, urban: 72, language: 36, tax: 40 }),
  "South-Eastern Asia": A({ ppp: 14000, growth: 4.6, inflation: 2.8, unemployment: 3.5, living: 56, working: 60, investing: 64, safety: 62, health: 58, education: 60, cost: 40, governance: 52, digital: 64, tourism: 68, conflict: 18, openness: 64, medianAge: 30, popGrowth: 0.9, urban: 52, language: 58, tax: 34 }),
  "Southern Asia": A({ ppp: 8000, growth: 5.2, inflation: 6, unemployment: 6.5, living: 48, working: 52, investing: 58, safety: 52, health: 48, education: 52, cost: 32, governance: 46, digital: 52, tourism: 40, conflict: 32, openness: 48, medianAge: 27, popGrowth: 1.2, urban: 38, language: 62, tax: 34 }),
  "Central Asia": A({ ppp: 12000, growth: 4.4, inflation: 7, unemployment: 5.5, living: 50, working: 54, investing: 52, safety: 62, health: 54, education: 64, cost: 34, governance: 42, digital: 58, tourism: 36, conflict: 18, openness: 46, medianAge: 28, popGrowth: 1.4, urban: 48, language: 28, tax: 32 }),
  "Western Asia": A({ ppp: 28000, growth: 2.8, inflation: 4, unemployment: 7, living: 58, working: 58, investing: 60, safety: 64, health: 64, education: 64, cost: 52, governance: 52, digital: 70, tourism: 58, conflict: 28, openness: 60, medianAge: 31, popGrowth: 1.1, urban: 74, language: 52, tax: 22 }),
  "Northern Africa": A({ ppp: 12000, growth: 3, inflation: 6, unemployment: 10, living: 48, working: 46, investing: 46, safety: 54, health: 50, education: 52, cost: 36, governance: 42, digital: 52, tourism: 58, conflict: 30, openness: 46, medianAge: 27, popGrowth: 1.5, urban: 58, language: 36, tax: 36 }),
  "Western Africa": A({ ppp: 4200, growth: 4.2, inflation: 8, unemployment: 5, living: 38, working: 42, investing: 44, safety: 44, health: 36, education: 40, cost: 34, governance: 40, digital: 40, tourism: 28, conflict: 36, openness: 46, medianAge: 18, popGrowth: 2.4, urban: 46, language: 52, tax: 32 }),
  "Eastern Africa": A({ ppp: 3200, growth: 5.2, inflation: 7, unemployment: 5, living: 38, working: 42, investing: 46, safety: 46, health: 38, education: 42, cost: 32, governance: 40, digital: 36, tourism: 40, conflict: 34, openness: 46, medianAge: 19, popGrowth: 2.5, urban: 34, language: 48, tax: 32 }),
  "Middle Africa": A({ ppp: 3800, growth: 3.4, inflation: 7, unemployment: 8, living: 34, working: 38, investing: 40, safety: 36, health: 32, education: 38, cost: 36, governance: 32, digital: 32, tourism: 24, conflict: 40, openness: 40, medianAge: 18, popGrowth: 2.6, urban: 48, language: 36, tax: 30 }),
  "Southern Africa": A({ ppp: 10000, growth: 1.6, inflation: 5, unemployment: 18, living: 46, working: 40, investing: 46, safety: 40, health: 44, education: 52, cost: 40, governance: 48, digital: 52, tourism: 52, conflict: 22, openness: 54, medianAge: 26, popGrowth: 1.3, urban: 58, language: 62, tax: 40 }),
  "Australia and New Zealand": A({ ppp: 58000, growth: 1.8, inflation: 2.8, unemployment: 4.2, living: 84, working: 76, investing: 72, safety: 80, health: 82, education: 82, cost: 74, governance: 84, digital: 86, tourism: 72, conflict: 6, openness: 82, medianAge: 38, popGrowth: 1.1, urban: 86, language: 94, tax: 52 }),
  Melanesia: A({ ppp: 4000, growth: 3, inflation: 4, unemployment: 4, living: 42, working: 40, investing: 36, safety: 48, health: 36, education: 40, cost: 40, governance: 38, digital: 28, tourism: 36, conflict: 24, openness: 42, medianAge: 23, popGrowth: 1.8, urban: 22, language: 48, tax: 28 }),
  Micronesia: A({ ppp: 7000, growth: 1.4, inflation: 3, unemployment: 6, living: 48, working: 44, investing: 36, safety: 62, health: 48, education: 52, cost: 52, governance: 50, digital: 42, tourism: 40, conflict: 8, openness: 50, medianAge: 26, popGrowth: 0.6, urban: 46, language: 60, tax: 24 }),
  Polynesia: A({ ppp: 8000, growth: 1.6, inflation: 3, unemployment: 7, living: 54, working: 46, investing: 38, safety: 68, health: 56, education: 56, cost: 54, governance: 54, digital: 48, tourism: 62, conflict: 6, openness: 48, medianAge: 28, popGrowth: 0.5, urban: 42, language: 40, tax: 28 }),
  Antarctica: A({ ppp: 2000, growth: 0, inflation: 0, unemployment: 0, living: 20, working: 10, investing: 5, safety: 40, health: 20, education: 20, cost: 30, governance: 40, digital: 20, tourism: 10, conflict: 2, openness: 20, medianAge: 35, popGrowth: 0, urban: 0, language: 40, tax: 10 }),
  "Seven seas (open ocean)": A({ ppp: 2000, growth: 0, inflation: 1, unemployment: 2, living: 24, working: 16, investing: 10, safety: 40, health: 30, education: 30, cost: 40, governance: 40, digital: 24, tourism: 8, conflict: 4, openness: 30, medianAge: 36, popGrowth: 0, urban: 10, language: 40, tax: 10 }),
};

const WORLD = A({ ppp: 12000, growth: 2.4, living: 52, working: 52, investing: 50 });

const O: Record<string, Partial<Anchor>> = {
  USA: { ppp: 82000, growth: 2.3, inflation: 2.8, unemployment: 4.1, living: 74, working: 78, investing: 86, safety: 58, health: 72, education: 80, cost: 78, governance: 74, digital: 88, tourism: 72, conflict: 14, openness: 82, medianAge: 38.5, popGrowth: 0.5, urban: 83, language: 98, tax: 46 },
  CAN: { ppp: 60000, growth: 1.5, inflation: 2.4, unemployment: 6.2, living: 82, working: 74, investing: 72, safety: 78, health: 80, education: 82, cost: 74, governance: 82, digital: 86, tourism: 68, conflict: 6, openness: 82, medianAge: 41, popGrowth: 0.9, urban: 82, language: 94, tax: 50 },
  GRL: { ppp: 54000, growth: 1.2, inflation: 2, unemployment: 5, living: 64, working: 48, investing: 34, safety: 82, health: 70, education: 64, cost: 72, governance: 78, digital: 62, tourism: 36, conflict: 4, openness: 60, medianAge: 34, popGrowth: 0, urban: 87, language: 50, tax: 42 },
  MEX: { ppp: 23000, growth: 2.1, inflation: 4.4, unemployment: 2.8, living: 52, working: 58, investing: 60, safety: 36, health: 56, education: 56, cost: 40, governance: 46, digital: 62, tourism: 74, conflict: 38, openness: 66, medianAge: 29, popGrowth: 0.8, urban: 81, language: 30, tax: 38 },
  BRA: { ppp: 20000, growth: 2.2, inflation: 4.4, unemployment: 7.4, living: 52, working: 52, investing: 54, safety: 40, health: 56, education: 56, cost: 42, governance: 48, digital: 68, tourism: 62, conflict: 20, openness: 54, medianAge: 34, popGrowth: 0.5, urban: 87, language: 24, tax: 52 },
  ARG: { ppp: 26000, growth: 2.4, inflation: 90, unemployment: 7.2, living: 54, working: 50, investing: 36, safety: 50, health: 64, education: 70, cost: 48, governance: 42, digital: 72, tourism: 58, conflict: 12, openness: 40, medianAge: 32, popGrowth: 0.4, urban: 92, language: 30, tax: 48 },
  CHL: { ppp: 30000, growth: 2.2, inflation: 3.8, unemployment: 8.2, living: 66, working: 60, investing: 62, safety: 58, health: 68, education: 70, cost: 56, governance: 68, digital: 76, tourism: 60, conflict: 12, openness: 74, medianAge: 36, popGrowth: 0.5, urban: 88, language: 28, tax: 40 },
  COL: { ppp: 19000, growth: 2.4, inflation: 5.4, unemployment: 10, living: 52, working: 50, investing: 52, safety: 42, health: 58, education: 56, cost: 38, governance: 48, digital: 64, tourism: 58, conflict: 36, openness: 58, medianAge: 32, popGrowth: 0.6, urban: 82, language: 24, tax: 40 },
  PER: { ppp: 16000, growth: 2.6, inflation: 2.6, unemployment: 6.2, living: 50, working: 52, investing: 52, safety: 44, health: 54, education: 56, cost: 38, governance: 46, digital: 58, tourism: 64, conflict: 22, openness: 60, medianAge: 30, popGrowth: 0.9, urban: 79, language: 22, tax: 36 },
  GBR: { ppp: 56000, growth: 1.1, inflation: 2.6, unemployment: 4.4, living: 76, working: 74, investing: 76, safety: 70, health: 78, education: 82, cost: 76, governance: 78, digital: 90, tourism: 74, conflict: 10, openness: 84, medianAge: 40.5, popGrowth: 0.5, urban: 84, language: 98, tax: 52 },
  IRL: { ppp: 108000, growth: 3.2, inflation: 2.2, unemployment: 4.4, living: 80, working: 80, investing: 78, safety: 78, health: 78, education: 84, cost: 78, governance: 82, digital: 88, tourism: 70, conflict: 6, openness: 90, medianAge: 39, popGrowth: 1, urban: 64, language: 98, tax: 42 },
  FRA: { ppp: 55000, growth: 1.1, inflation: 2.2, unemployment: 7.4, living: 80, working: 70, investing: 68, safety: 66, health: 84, education: 80, cost: 72, governance: 74, digital: 84, tourism: 88, conflict: 12, openness: 78, medianAge: 42, popGrowth: 0.3, urban: 81, language: 46, tax: 64 },
  DEU: { ppp: 66000, growth: 0.3, inflation: 2.4, unemployment: 3.4, living: 82, working: 78, investing: 66, safety: 76, health: 84, education: 82, cost: 70, governance: 82, digital: 86, tourism: 68, conflict: 8, openness: 82, medianAge: 45, popGrowth: 0.1, urban: 78, language: 62, tax: 60 },
  NLD: { ppp: 72000, growth: 1.2, inflation: 2.6, unemployment: 3.7, living: 84, working: 80, investing: 76, safety: 78, health: 84, education: 84, cost: 76, governance: 86, digital: 92, tourism: 70, conflict: 6, openness: 90, medianAge: 42, popGrowth: 0.4, urban: 92, language: 90, tax: 56 },
  BEL: { ppp: 64000, growth: 1.1, inflation: 2.5, unemployment: 5.6, living: 78, working: 72, investing: 68, safety: 68, health: 82, education: 82, cost: 72, governance: 76, digital: 86, tourism: 64, conflict: 8, openness: 84, medianAge: 42, popGrowth: 0.4, urban: 98, language: 72, tax: 60 },
  CHE: { ppp: 92000, growth: 1.3, inflation: 1.2, unemployment: 2.4, living: 90, working: 84, investing: 80, safety: 88, health: 90, education: 86, cost: 92, governance: 90, digital: 92, tourism: 78, conflict: 4, openness: 84, medianAge: 43, popGrowth: 0.7, urban: 74, language: 74, tax: 42 },
  AUT: { ppp: 68000, growth: 0.4, inflation: 2.8, unemployment: 5.2, living: 86, working: 76, investing: 70, safety: 84, health: 86, education: 82, cost: 74, governance: 82, digital: 84, tourism: 82, conflict: 6, openness: 82, medianAge: 44, popGrowth: 0.3, urban: 59, language: 64, tax: 58 },
  SWE: { ppp: 64000, growth: 1, inflation: 2.2, unemployment: 8.2, living: 86, working: 74, investing: 74, safety: 72, health: 86, education: 86, cost: 74, governance: 88, digital: 92, tourism: 56, conflict: 8, openness: 86, medianAge: 41, popGrowth: 0.5, urban: 88, language: 88, tax: 66 },
  NOR: { ppp: 90000, growth: 1.3, inflation: 2.8, unemployment: 4, living: 90, working: 80, investing: 74, safety: 86, health: 88, education: 86, cost: 84, governance: 90, digital: 92, tourism: 64, conflict: 6, openness: 82, medianAge: 40, popGrowth: 0.7, urban: 83, language: 88, tax: 60 },
  DNK: { ppp: 74000, growth: 1.6, inflation: 1.8, unemployment: 5.2, living: 88, working: 78, investing: 74, safety: 84, health: 86, education: 88, cost: 78, governance: 92, digital: 94, tourism: 58, conflict: 6, openness: 86, medianAge: 42, popGrowth: 0.4, urban: 88, language: 90, tax: 70 },
  FIN: { ppp: 60000, growth: 0.6, inflation: 1.8, unemployment: 8, living: 86, working: 72, investing: 70, safety: 86, health: 84, education: 88, cost: 72, governance: 92, digital: 92, tourism: 52, conflict: 8, openness: 84, medianAge: 43, popGrowth: 0.2, urban: 86, language: 82, tax: 64 },
  ISL: { ppp: 72000, growth: 2.2, inflation: 4.5, unemployment: 3.4, living: 88, working: 80, investing: 66, safety: 90, health: 84, education: 84, cost: 80, governance: 86, digital: 92, tourism: 86, conflict: 4, openness: 74, medianAge: 37, popGrowth: 1.2, urban: 94, language: 90, tax: 54 },
  ESP: { ppp: 48000, growth: 2.5, inflation: 2.6, unemployment: 11.2, living: 78, working: 64, investing: 66, safety: 74, health: 82, education: 76, cost: 60, governance: 70, digital: 84, tourism: 92, conflict: 8, openness: 78, medianAge: 45, popGrowth: 0.4, urban: 81, language: 40, tax: 54 },
  ITA: { ppp: 54000, growth: 0.7, inflation: 1.6, unemployment: 6.8, living: 76, working: 64, investing: 60, safety: 70, health: 80, education: 74, cost: 66, governance: 62, digital: 74, tourism: 90, conflict: 8, openness: 74, medianAge: 48, popGrowth: -0.2, urban: 72, language: 38, tax: 62 },
  PRT: { ppp: 44000, growth: 1.9, inflation: 2.4, unemployment: 6.4, living: 78, working: 68, investing: 66, safety: 82, health: 78, education: 74, cost: 58, governance: 74, digital: 80, tourism: 88, conflict: 6, openness: 80, medianAge: 46, popGrowth: 0.2, urban: 67, language: 48, tax: 52 },
  GRC: { ppp: 38000, growth: 2.2, inflation: 2.6, unemployment: 10.2, living: 70, working: 58, investing: 58, safety: 70, health: 74, education: 76, cost: 56, governance: 60, digital: 72, tourism: 90, conflict: 10, openness: 70, medianAge: 46, popGrowth: -0.3, urban: 80, language: 52, tax: 54 },
  POL: { ppp: 45000, growth: 3.1, inflation: 3.6, unemployment: 2.9, living: 68, working: 72, investing: 66, safety: 74, health: 68, education: 78, cost: 46, governance: 64, digital: 78, tourism: 58, conflict: 14, openness: 74, medianAge: 42, popGrowth: -0.2, urban: 60, language: 52, tax: 46 },
  CZE: { ppp: 50000, growth: 1.4, inflation: 2.4, unemployment: 2.7, living: 74, working: 76, investing: 66, safety: 78, health: 76, education: 80, cost: 52, governance: 70, digital: 82, tourism: 68, conflict: 8, openness: 78, medianAge: 43, popGrowth: 0.1, urban: 74, language: 48, tax: 48 },
  HUN: { ppp: 42000, growth: 1.6, inflation: 3.8, unemployment: 4.3, living: 64, working: 68, investing: 58, safety: 72, health: 68, education: 74, cost: 44, governance: 54, digital: 76, tourism: 64, conflict: 10, openness: 70, medianAge: 43, popGrowth: -0.3, urban: 72, language: 40, tax: 48 },
  ROU: { ppp: 42000, growth: 2.4, inflation: 5.2, unemployment: 5.4, living: 60, working: 64, investing: 60, safety: 70, health: 62, education: 70, cost: 40, governance: 56, digital: 74, tourism: 56, conflict: 10, openness: 72, medianAge: 42, popGrowth: -0.4, urban: 54, language: 42, tax: 40 },
  UKR: { ppp: 15000, growth: 3.2, inflation: 8, unemployment: 12, living: 46, working: 44, investing: 34, safety: 42, health: 52, education: 74, cost: 32, governance: 42, digital: 70, tourism: 36, conflict: 78, openness: 58, medianAge: 41, popGrowth: -0.6, urban: 70, language: 40, tax: 38 },
  RUS: { ppp: 38000, growth: 2.2, inflation: 7.5, unemployment: 2.6, living: 52, working: 58, investing: 40, safety: 56, health: 60, education: 74, cost: 40, governance: 36, digital: 74, tourism: 42, conflict: 48, openness: 34, medianAge: 40, popGrowth: -0.2, urban: 75, language: 30, tax: 36 },
  TUR: { ppp: 38000, growth: 3.2, inflation: 42, unemployment: 8.8, living: 56, working: 54, investing: 48, safety: 58, health: 64, education: 64, cost: 42, governance: 44, digital: 72, tourism: 84, conflict: 28, openness: 52, medianAge: 33, popGrowth: 0.6, urban: 77, language: 32, tax: 38 },
  CHN: { ppp: 24000, growth: 4.8, inflation: 0.6, unemployment: 5.1, living: 62, working: 70, investing: 64, safety: 74, health: 72, education: 74, cost: 48, governance: 58, digital: 82, tourism: 62, conflict: 18, openness: 52, medianAge: 39, popGrowth: 0, urban: 64, language: 28, tax: 38 },
  JPN: { ppp: 50000, growth: 0.8, inflation: 2.2, unemployment: 2.5, living: 84, working: 78, investing: 62, safety: 92, health: 88, education: 86, cost: 70, governance: 84, digital: 86, tourism: 74, conflict: 8, openness: 70, medianAge: 49, popGrowth: -0.4, urban: 92, language: 34, tax: 50 },
  KOR: { ppp: 52000, growth: 2.2, inflation: 2.2, unemployment: 2.8, living: 76, working: 74, investing: 72, safety: 80, health: 84, education: 88, cost: 64, governance: 74, digital: 94, tourism: 64, conflict: 16, openness: 74, medianAge: 45, popGrowth: 0, urban: 81, language: 40, tax: 44 },
  TWN: { ppp: 72000, growth: 3.4, inflation: 2, unemployment: 3.4, living: 80, working: 78, investing: 76, safety: 84, health: 82, education: 86, cost: 62, governance: 78, digital: 92, tourism: 58, conflict: 20, openness: 78, medianAge: 44, popGrowth: 0, urban: 80, language: 36, tax: 34 },
  HKG: { ppp: 74000, growth: 2.4, inflation: 1.6, unemployment: 3, living: 74, working: 76, investing: 78, safety: 86, health: 82, education: 82, cost: 88, governance: 74, digital: 94, tourism: 78, conflict: 12, openness: 92, medianAge: 46, popGrowth: 0.2, urban: 100, language: 70, tax: 28 },
  SGP: { ppp: 125000, growth: 2.8, inflation: 2.2, unemployment: 2.1, living: 84, working: 84, investing: 88, safety: 94, health: 86, education: 88, cost: 86, governance: 90, digital: 96, tourism: 76, conflict: 4, openness: 96, medianAge: 42, popGrowth: 0.8, urban: 100, language: 94, tax: 26 },
  IND: { ppp: 11000, growth: 6.6, inflation: 4.6, unemployment: 7.6, living: 50, working: 56, investing: 72, safety: 56, health: 48, education: 54, cost: 30, governance: 52, digital: 58, tourism: 52, conflict: 26, openness: 56, medianAge: 28, popGrowth: 0.9, urban: 36, language: 74, tax: 36 },
  IDN: { ppp: 15000, growth: 5, inflation: 2.4, unemployment: 4.8, living: 54, working: 58, investing: 66, safety: 62, health: 52, education: 56, cost: 34, governance: 52, digital: 62, tourism: 70, conflict: 16, openness: 60, medianAge: 30, popGrowth: 0.8, urban: 58, language: 42, tax: 32 },
  VNM: { ppp: 15000, growth: 6.2, inflation: 3.2, unemployment: 2.2, living: 58, working: 66, investing: 70, safety: 72, health: 58, education: 62, cost: 34, governance: 50, digital: 68, tourism: 66, conflict: 10, openness: 66, medianAge: 32, popGrowth: 0.7, urban: 40, language: 28, tax: 30 },
  THA: { ppp: 22000, growth: 2.6, inflation: 1.2, unemployment: 1.1, living: 62, working: 64, investing: 60, safety: 66, health: 68, education: 64, cost: 42, governance: 52, digital: 72, tourism: 86, conflict: 18, openness: 66, medianAge: 40, popGrowth: 0.1, urban: 52, language: 36, tax: 34 },
  MYS: { ppp: 32000, growth: 4.4, inflation: 2.2, unemployment: 3.3, living: 64, working: 66, investing: 66, safety: 66, health: 66, education: 68, cost: 42, governance: 62, digital: 76, tourism: 68, conflict: 12, openness: 74, medianAge: 31, popGrowth: 1, urban: 78, language: 70, tax: 32 },
  PHL: { ppp: 12000, growth: 5.6, inflation: 3.2, unemployment: 4.2, living: 50, working: 56, investing: 60, safety: 52, health: 50, education: 58, cost: 34, governance: 48, digital: 60, tourism: 62, conflict: 26, openness: 62, medianAge: 26, popGrowth: 1.4, urban: 48, language: 84, tax: 34 },
  AUS: { ppp: 64000, growth: 1.7, inflation: 2.8, unemployment: 4.2, living: 84, working: 76, investing: 72, safety: 78, health: 82, education: 82, cost: 76, governance: 84, digital: 86, tourism: 76, conflict: 6, openness: 80, medianAge: 38, popGrowth: 1.2, urban: 86, language: 98, tax: 50 },
  NZL: { ppp: 52000, growth: 1.2, inflation: 2.4, unemployment: 4.6, living: 86, working: 74, investing: 66, safety: 80, health: 80, education: 82, cost: 72, governance: 88, digital: 86, tourism: 80, conflict: 4, openness: 82, medianAge: 38, popGrowth: 0.8, urban: 87, language: 98, tax: 48 },
  ZAF: { ppp: 16000, growth: 0.8, inflation: 4.6, unemployment: 32, living: 46, working: 36, investing: 48, safety: 32, health: 48, education: 56, cost: 42, governance: 52, digital: 62, tourism: 64, conflict: 28, openness: 60, medianAge: 28, popGrowth: 1, urban: 68, language: 78, tax: 46 },
  NGA: { ppp: 6200, growth: 3.2, inflation: 24, unemployment: 5.2, living: 36, working: 42, investing: 46, safety: 30, health: 32, education: 42, cost: 36, governance: 34, digital: 46, tourism: 24, conflict: 46, openness: 44, medianAge: 18, popGrowth: 2.4, urban: 53, language: 78, tax: 30 },
  KEN: { ppp: 6500, growth: 5, inflation: 5.4, unemployment: 5.6, living: 44, working: 48, investing: 54, safety: 42, health: 42, education: 50, cost: 36, governance: 44, digital: 52, tourism: 58, conflict: 28, openness: 54, medianAge: 20, popGrowth: 1.9, urban: 29, language: 70, tax: 36 },
  GHA: { ppp: 7000, growth: 4.2, inflation: 16, unemployment: 3.6, living: 44, working: 46, investing: 50, safety: 54, health: 42, education: 50, cost: 36, governance: 50, digital: 52, tourism: 36, conflict: 14, openness: 56, medianAge: 21, popGrowth: 1.9, urban: 58, language: 72, tax: 34 },
  RWA: { ppp: 3200, growth: 7, inflation: 5.5, unemployment: 13, living: 48, working: 50, investing: 56, safety: 74, health: 48, education: 48, cost: 34, governance: 62, digital: 48, tourism: 46, conflict: 16, openness: 58, medianAge: 20, popGrowth: 2.2, urban: 18, language: 36, tax: 32 },
  ETH: { ppp: 3200, growth: 6.4, inflation: 18, unemployment: 4, living: 36, working: 40, investing: 44, safety: 42, health: 36, education: 40, cost: 30, governance: 38, digital: 32, tourism: 36, conflict: 42, openness: 40, medianAge: 19, popGrowth: 2.5, urban: 23, language: 36, tax: 28 },
  EGY: { ppp: 17000, growth: 3.6, inflation: 22, unemployment: 7, living: 46, working: 46, investing: 50, safety: 58, health: 50, education: 54, cost: 32, governance: 40, digital: 56, tourism: 70, conflict: 24, openness: 48, medianAge: 24, popGrowth: 1.6, urban: 43, language: 38, tax: 32 },
  MAR: { ppp: 10000, growth: 3.2, inflation: 1.8, unemployment: 9.2, living: 52, working: 48, investing: 56, safety: 66, health: 50, education: 50, cost: 34, governance: 50, digital: 62, tourism: 74, conflict: 14, openness: 58, medianAge: 30, popGrowth: 1, urban: 64, language: 42, tax: 36 },
  ARE: { ppp: 76000, growth: 3.8, inflation: 2.1, unemployment: 2.4, living: 74, working: 76, investing: 80, safety: 90, health: 78, education: 74, cost: 70, governance: 70, digital: 90, tourism: 82, conflict: 8, openness: 82, medianAge: 33, popGrowth: 0.8, urban: 87, language: 78, tax: 12 },
  SAU: { ppp: 62000, growth: 2.6, inflation: 1.8, unemployment: 4.8, living: 64, working: 62, investing: 72, safety: 78, health: 72, education: 70, cost: 48, governance: 58, digital: 84, tourism: 62, conflict: 16, openness: 64, medianAge: 30, popGrowth: 1.2, urban: 85, language: 52, tax: 14 },
  QAT: { ppp: 114000, growth: 2.2, inflation: 1.6, unemployment: 0.6, living: 74, working: 72, investing: 74, safety: 90, health: 78, education: 72, cost: 68, governance: 68, digital: 88, tourism: 64, conflict: 6, openness: 74, medianAge: 33, popGrowth: 0.6, urban: 99, language: 64, tax: 10 },
  ISR: { ppp: 52000, growth: 2, inflation: 3.2, unemployment: 3.4, living: 70, working: 74, investing: 74, safety: 60, health: 80, education: 84, cost: 74, governance: 68, digital: 90, tourism: 58, conflict: 42, openness: 74, medianAge: 30, popGrowth: 1.5, urban: 93, language: 78, tax: 46 },
  IRN: { ppp: 18000, growth: 2.4, inflation: 32, unemployment: 8.5, living: 42, working: 44, investing: 28, safety: 52, health: 58, education: 66, cost: 36, governance: 32, digital: 58, tourism: 40, conflict: 36, openness: 24, medianAge: 33, popGrowth: 0.8, urban: 76, language: 28, tax: 28 },
  PAK: { ppp: 6500, growth: 2.6, inflation: 12, unemployment: 6.5, living: 38, working: 42, investing: 40, safety: 36, health: 38, education: 40, cost: 28, governance: 34, digital: 42, tourism: 28, conflict: 44, openness: 36, medianAge: 22, popGrowth: 1.8, urban: 38, language: 58, tax: 28 },
  BGD: { ppp: 8500, growth: 5.4, inflation: 8, unemployment: 4.4, living: 44, working: 52, investing: 52, safety: 54, health: 44, education: 50, cost: 28, governance: 38, digital: 48, tourism: 22, conflict: 16, openness: 46, medianAge: 27, popGrowth: 1, urban: 40, language: 36, tax: 28 },
  LKA: { ppp: 14000, growth: 4, inflation: 3.5, unemployment: 4.8, living: 54, working: 50, investing: 46, safety: 64, health: 62, education: 70, cost: 36, governance: 48, digital: 52, tourism: 68, conflict: 12, openness: 50, medianAge: 33, popGrowth: 0.4, urban: 19, language: 48, tax: 34 },
  VEN: { ppp: 8000, growth: 3, inflation: 55, unemployment: 6, living: 28, working: 30, investing: 18, safety: 22, health: 36, education: 56, cost: 40, governance: 18, digital: 48, tourism: 28, conflict: 36, openness: 22, medianAge: 29, popGrowth: -0.4, urban: 88, language: 20, tax: 24 },
  CUB: { ppp: 10000, growth: 1, inflation: 18, unemployment: 2.4, living: 42, working: 38, investing: 16, safety: 64, health: 68, education: 74, cost: 30, governance: 34, digital: 28, tourism: 58, conflict: 10, openness: 18, medianAge: 42, popGrowth: -0.2, urban: 77, language: 24, tax: 40 },
  HTI: { ppp: 3000, growth: -1, inflation: 22, unemployment: 14, living: 18, working: 20, investing: 12, safety: 12, health: 22, education: 32, cost: 40, governance: 14, digital: 28, tourism: 18, conflict: 72, openness: 28, medianAge: 24, popGrowth: 1.2, urban: 58, language: 24, tax: 20 },
  AFG: { ppp: 2000, growth: -1.5, inflation: 8, unemployment: 12, living: 18, working: 16, investing: 10, safety: 14, health: 22, education: 24, cost: 28, governance: 12, digital: 22, tourism: 8, conflict: 90, openness: 16, medianAge: 18, popGrowth: 2.2, urban: 26, language: 16, tax: 12 },
  SYR: { ppp: 3000, growth: -0.5, inflation: 40, unemployment: 16, living: 16, working: 18, investing: 8, safety: 18, health: 28, education: 40, cost: 36, governance: 12, digital: 30, tourism: 12, conflict: 86, openness: 12, medianAge: 23, popGrowth: 1, urban: 56, language: 24, tax: 16 },
  YEM: { ppp: 2000, growth: -1, inflation: 18, unemployment: 13, living: 14, working: 16, investing: 8, safety: 12, health: 20, education: 28, cost: 34, governance: 10, digital: 24, tourism: 10, conflict: 94, openness: 16, medianAge: 20, popGrowth: 2, urban: 38, language: 16, tax: 12 },
  SDN: { ppp: 2500, growth: -2, inflation: 80, unemployment: 12, living: 16, working: 16, investing: 8, safety: 14, health: 22, education: 30, cost: 36, governance: 12, digital: 28, tourism: 12, conflict: 90, openness: 16, medianAge: 19, popGrowth: 2.2, urban: 36, language: 28, tax: 14 },
  SSD: { ppp: 1200, growth: -1, inflation: 40, unemployment: 14, living: 12, working: 12, investing: 6, safety: 10, health: 14, education: 18, cost: 40, governance: 8, digital: 12, tourism: 6, conflict: 96, openness: 14, medianAge: 18, popGrowth: 1.6, urban: 20, language: 22, tax: 8 },
  SOM: { ppp: 1500, growth: 3, inflation: 5, unemployment: 18, living: 16, working: 18, investing: 14, safety: 12, health: 16, education: 18, cost: 36, governance: 10, digital: 28, tourism: 8, conflict: 84, openness: 24, medianAge: 16, popGrowth: 2.8, urban: 46, language: 24, tax: 10 },
  MMR: { ppp: 5000, growth: 1, inflation: 18, unemployment: 4, living: 30, working: 32, investing: 22, safety: 28, health: 32, education: 42, cost: 28, governance: 18, digital: 40, tourism: 28, conflict: 76, openness: 28, medianAge: 29, popGrowth: 0.7, urban: 32, language: 18, tax: 16 },
  PRK: { ppp: 1800, growth: 0.6, inflation: 4, unemployment: 3.5, living: 22, working: 24, investing: 8, safety: 40, health: 36, education: 48, cost: 20, governance: 16, digital: 8, tourism: 6, conflict: 36, openness: 6, medianAge: 35, popGrowth: 0.4, urban: 62, language: 4, tax: 20 },
  IRQ: { ppp: 12000, growth: 2.6, inflation: 4, unemployment: 15, living: 36, working: 38, investing: 34, safety: 30, health: 42, education: 46, cost: 32, governance: 28, digital: 48, tourism: 22, conflict: 48, openness: 40, medianAge: 21, popGrowth: 2.2, urban: 71, language: 24, tax: 16 },
  LBN: { ppp: 14000, growth: 1, inflation: 20, unemployment: 12, living: 40, working: 38, investing: 24, safety: 42, health: 58, education: 68, cost: 52, governance: 22, digital: 64, tourism: 48, conflict: 40, openness: 36, medianAge: 32, popGrowth: -0.5, urban: 89, language: 62, tax: 24 },
  JOR: { ppp: 11000, growth: 2.4, inflation: 2.2, unemployment: 18, living: 52, working: 44, investing: 48, safety: 68, health: 64, education: 66, cost: 46, governance: 54, digital: 66, tourism: 62, conflict: 16, openness: 60, medianAge: 24, popGrowth: 1.4, urban: 92, language: 62, tax: 28 },
  GEO: { ppp: 22000, growth: 6, inflation: 2.4, unemployment: 14, living: 60, working: 56, investing: 62, safety: 72, health: 60, education: 72, cost: 40, governance: 60, digital: 74, tourism: 72, conflict: 24, openness: 70, medianAge: 37, popGrowth: -0.2, urban: 60, language: 36, tax: 32 },
  KAZ: { ppp: 32000, growth: 4, inflation: 8, unemployment: 4.7, living: 54, working: 58, investing: 58, safety: 64, health: 60, education: 72, cost: 36, governance: 46, digital: 72, tourism: 32, conflict: 12, openness: 56, medianAge: 31, popGrowth: 1.2, urban: 58, language: 30, tax: 30 },
  UZB: { ppp: 10000, growth: 6, inflation: 9, unemployment: 5, living: 48, working: 54, investing: 54, safety: 70, health: 56, education: 68, cost: 28, governance: 40, digital: 58, tourism: 48, conflict: 10, openness: 42, medianAge: 28, popGrowth: 1.6, urban: 50, language: 22, tax: 28 },
  MNG: { ppp: 15000, growth: 4.5, inflation: 7, unemployment: 5.5, living: 48, working: 52, investing: 50, safety: 62, health: 54, education: 68, cost: 36, governance: 50, digital: 62, tourism: 40, conflict: 8, openness: 58, medianAge: 28, popGrowth: 1.2, urban: 69, language: 24, tax: 30 },
  CRI: { ppp: 26000, growth: 4, inflation: 1.8, unemployment: 8, living: 70, working: 60, investing: 58, safety: 64, health: 70, education: 68, cost: 56, governance: 68, digital: 74, tourism: 82, conflict: 8, openness: 70, medianAge: 34, popGrowth: 0.6, urban: 82, language: 36, tax: 38 },
  PAN: { ppp: 38000, growth: 4.2, inflation: 1.6, unemployment: 7, living: 64, working: 62, investing: 66, safety: 58, health: 66, education: 62, cost: 52, governance: 52, digital: 68, tourism: 64, conflict: 10, openness: 78, medianAge: 30, popGrowth: 1.3, urban: 69, language: 40, tax: 30 },
  URY: { ppp: 30000, growth: 2, inflation: 5, unemployment: 8, living: 70, working: 62, investing: 60, safety: 64, health: 72, education: 72, cost: 56, governance: 74, digital: 78, tourism: 66, conflict: 6, openness: 72, medianAge: 36, popGrowth: 0.2, urban: 96, language: 28, tax: 44 },
  DOM: { ppp: 24000, growth: 4.6, inflation: 3.8, unemployment: 5.2, living: 52, working: 56, investing: 58, safety: 48, health: 54, education: 52, cost: 40, governance: 48, digital: 60, tourism: 80, conflict: 14, openness: 62, medianAge: 28, popGrowth: 0.9, urban: 83, language: 28, tax: 32 },
  JAM: { ppp: 12000, growth: 1.8, inflation: 5, unemployment: 4.4, living: 50, working: 50, investing: 46, safety: 44, health: 56, education: 62, cost: 48, governance: 52, digital: 60, tourism: 82, conflict: 16, openness: 58, medianAge: 30, popGrowth: 0.1, urban: 57, language: 96, tax: 36 },
  MUS: { ppp: 26000, growth: 4, inflation: 3.5, unemployment: 6, living: 66, working: 62, investing: 60, safety: 70, health: 68, education: 70, cost: 48, governance: 68, digital: 70, tourism: 84, conflict: 4, openness: 72, medianAge: 38, popGrowth: 0.1, urban: 41, language: 70, tax: 30 },
  MDV: { ppp: 24000, growth: 5, inflation: 2, unemployment: 4, living: 62, working: 60, investing: 54, safety: 74, health: 68, education: 62, cost: 62, governance: 50, digital: 64, tourism: 94, conflict: 6, openness: 58, medianAge: 31, popGrowth: 0.4, urban: 41, language: 62, tax: 24 },
  HRV: { ppp: 42000, growth: 3, inflation: 3, unemployment: 5.4, living: 72, working: 66, investing: 62, safety: 76, health: 74, education: 76, cost: 54, governance: 64, digital: 78, tourism: 90, conflict: 8, openness: 74, medianAge: 44, popGrowth: -0.4, urban: 58, language: 50, tax: 46 },
  EST: { ppp: 46000, growth: 1.4, inflation: 3.4, unemployment: 7, living: 76, working: 74, investing: 74, safety: 80, health: 76, education: 84, cost: 58, governance: 82, digital: 92, tourism: 56, conflict: 12, openness: 86, medianAge: 42, popGrowth: 0, urban: 69, language: 62, tax: 44 },
  BLR: { ppp: 22000, growth: 2, inflation: 6, unemployment: 3.4, living: 50, working: 54, investing: 28, safety: 64, health: 64, education: 74, cost: 32, governance: 28, digital: 70, tourism: 24, conflict: 22, openness: 24, medianAge: 41, popGrowth: -0.4, urban: 80, language: 24, tax: 36 },
  PSE: { ppp: 6000, growth: -2, inflation: 12, unemployment: 28, living: 32, working: 24, investing: 16, safety: 22, health: 48, education: 62, cost: 42, governance: 28, digital: 56, tourism: 16, conflict: 84, openness: 22, medianAge: 20, popGrowth: 2.2, urban: 77, language: 48, tax: 18 },
  LBY: { ppp: 18000, growth: 2, inflation: 3, unemployment: 18, living: 36, working: 34, investing: 24, safety: 32, health: 46, education: 52, cost: 36, governance: 18, digital: 44, tourism: 22, conflict: 52, openness: 28, medianAge: 28, popGrowth: 1.2, urban: 81, language: 24, tax: 12 },
  DZA: { ppp: 14000, growth: 3.2, inflation: 5, unemployment: 12, living: 46, working: 42, investing: 40, safety: 58, health: 56, education: 58, cost: 32, governance: 38, digital: 54, tourism: 28, conflict: 18, openness: 34, medianAge: 28, popGrowth: 1.4, urban: 74, language: 24, tax: 36 },
  TUN: { ppp: 12000, growth: 1.4, inflation: 6, unemployment: 15, living: 52, working: 42, investing: 40, safety: 60, health: 60, education: 64, cost: 34, governance: 46, digital: 58, tourism: 64, conflict: 16, openness: 48, medianAge: 33, popGrowth: 0.7, urban: 70, language: 40, tax: 40 },
  SEN: { ppp: 4500, growth: 5.5, inflation: 3, unemployment: 3.4, living: 44, working: 46, investing: 52, safety: 58, health: 40, education: 40, cost: 36, governance: 52, digital: 50, tourism: 42, conflict: 18, openness: 56, medianAge: 19, popGrowth: 2.5, urban: 49, language: 36, tax: 32 },
  CIV: { ppp: 6500, growth: 6, inflation: 3.5, unemployment: 2.8, living: 42, working: 48, investing: 54, safety: 48, health: 38, education: 42, cost: 38, governance: 44, digital: 48, tourism: 28, conflict: 22, openness: 54, medianAge: 18, popGrowth: 2.4, urban: 52, language: 36, tax: 30 },
  TZA: { ppp: 3600, growth: 5.4, inflation: 3.6, unemployment: 2.6, living: 42, working: 46, investing: 52, safety: 58, health: 40, education: 44, cost: 30, governance: 46, digital: 38, tourism: 62, conflict: 14, openness: 50, medianAge: 18, popGrowth: 2.8, urban: 36, language: 48, tax: 30 },
};

const TOURISM = new Set([
  "ESP", "ITA", "GRC", "THA", "HRV", "TUR", "PRT", "ISL", "JAM", "DOM", "CRI", "MDV", "MUS", "FJI", "SYC", "ATG", "CUB", "MAR", "EGY", "MEX", "FRA", "AUT", "CZE", "KHM", "LAO", "CPV", "BRB", "BHS", "LCA", "VUT",
]);

const TECH = new Set(["USA", "IND", "SGP", "KOR", "TWN", "ISR", "SWE", "NLD", "GBR", "CAN", "DEU", "FRA", "JPN", "ARE", "EST", "IRL", "FIN", "AUS"]);

const ENERGY_EXPORT = new Set(["NOR", "QAT", "SAU", "ARE", "KAZ", "AGO", "AZE", "KWT", "OMN", "DZA", "LBY"]);

const LOW_INFL = new Set(["JPN", "CHE", "CHN"]);

type Pin = { growth?: number; inflation?: number; unemployment?: number };

const PIN: Record<string, Partial<Record<number, Pin>>> = {
  USA: {
    2019: { growth: 2.3, inflation: 1.8, unemployment: 3.7 },
    2020: { growth: -2.2, inflation: 1.2, unemployment: 8.1 },
    2021: { growth: 5.8, inflation: 4.7, unemployment: 5.4 },
    2022: { growth: 1.9, inflation: 8, unemployment: 3.6 },
    2023: { growth: 2.5, inflation: 4.1, unemployment: 3.6 },
    2024: { growth: 2.8, inflation: 3, unemployment: 4.1 },
    2025: { growth: 2.2, inflation: 2.6, unemployment: 4.2 },
    2026: { growth: 2, inflation: 2.4, unemployment: 4.2 },
  },
  CHN: {
    2016: { growth: 6.8, inflation: 2 },
    2017: { growth: 6.9, inflation: 1.6 },
    2018: { growth: 6.7, inflation: 2.1 },
    2019: { growth: 6, inflation: 2.9 },
    2020: { growth: 2.2, inflation: 2.5, unemployment: 5 },
    2021: { growth: 8.4, inflation: 0.9 },
    2022: { growth: 3, inflation: 2 },
    2023: { growth: 5.2, inflation: 0.2 },
    2024: { growth: 5, inflation: 0.2 },
    2025: { growth: 4.8, inflation: 0.4 },
    2026: { growth: 4.5, inflation: 0.8 },
  },
  IND: {
    2019: { growth: 3.9, inflation: 3.7 },
    2020: { growth: -5.8, inflation: 6.2 },
    2021: { growth: 9.7, inflation: 5.5 },
    2022: { growth: 7, inflation: 6.7 },
    2023: { growth: 8.2, inflation: 5.4 },
    2024: { growth: 6.5, inflation: 4.8 },
    2025: { growth: 6.4, inflation: 4.2 },
    2026: { growth: 6.3, inflation: 4 },
  },
  DEU: {
    2020: { growth: -3.8, inflation: 0.4 },
    2021: { growth: 3.2, inflation: 3.2 },
    2022: { growth: 1.4, inflation: 8.7 },
    2023: { growth: -0.3, inflation: 6 },
    2024: { growth: -0.2, inflation: 2.4 },
    2025: { growth: 0.4, inflation: 2.1 },
    2026: { growth: 0.8, inflation: 2 },
  },
  GBR: {
    2020: { growth: -10.3, inflation: 0.9 },
    2021: { growth: 8.6, inflation: 2.6 },
    2022: { growth: 4.8, inflation: 9.1 },
    2023: { growth: 0.3, inflation: 6.8 },
    2024: { growth: 1.1, inflation: 2.5 },
    2026: { growth: 1.3, inflation: 2.2 },
  },
  JPN: {
    2020: { growth: -4.2, inflation: 0 },
    2021: { growth: 2.7, inflation: -0.2 },
    2022: { growth: 1, inflation: 2.5 },
    2023: { growth: 1.5, inflation: 3.3 },
    2024: { growth: 0.8, inflation: 2.7 },
    2026: { growth: 0.7, inflation: 1.8 },
  },
  FRA: {
    2020: { growth: -7.5, inflation: 0.5 },
    2021: { growth: 6.4, inflation: 2.1 },
    2022: { growth: 2.6, inflation: 5.9 },
    2024: { growth: 1.1, inflation: 2.3 },
    2026: { growth: 1, inflation: 1.8 },
  },
  BRA: {
    2020: { growth: -3.3, inflation: 3.2 },
    2021: { growth: 4.8, inflation: 8.3 },
    2022: { growth: 3, inflation: 9.3 },
    2024: { growth: 3.2, inflation: 4.4 },
    2026: { growth: 2, inflation: 3.8 },
  },
  TUR: {
    2018: { inflation: 16.3, growth: 3 },
    2020: { growth: 1.9, inflation: 12.3 },
    2021: { growth: 11.4, inflation: 19.6 },
    2022: { growth: 5.5, inflation: 72 },
    2023: { growth: 4.5, inflation: 54 },
    2024: { growth: 3.2, inflation: 58 },
    2025: { growth: 3.2, inflation: 34 },
    2026: { growth: 3.4, inflation: 26 },
  },
  ARG: {
    2018: { inflation: 34, growth: -2.6 },
    2019: { inflation: 54, growth: -2 },
    2020: { growth: -9.9, inflation: 42 },
    2021: { growth: 10.4, inflation: 48 },
    2022: { growth: 5, inflation: 72 },
    2023: { growth: -1.6, inflation: 133 },
    2024: { growth: -1.8, inflation: 118 },
    2025: { growth: 4.5, inflation: 42 },
    2026: { growth: 3.5, inflation: 28 },
  },
  UKR: {
    2019: { growth: 3.2, inflation: 7.9, unemployment: 8.5 },
    2020: { growth: -3.8, inflation: 2.7 },
    2021: { growth: 3.4, inflation: 9.4 },
    2022: { growth: -28.8, inflation: 20, unemployment: 21 },
    2023: { growth: 5.3, inflation: 13, unemployment: 17 },
    2024: { growth: 3.5, inflation: 6.5, unemployment: 14 },
    2025: { growth: 3.2, inflation: 8, unemployment: 13 },
    2026: { growth: 3.6, inflation: 7, unemployment: 12 },
  },
  RUS: {
    2020: { growth: -2.7, inflation: 3.4 },
    2021: { growth: 5.9, inflation: 6.7 },
    2022: { growth: -1.2, inflation: 13.8 },
    2023: { growth: 3.6, inflation: 5.9 },
    2024: { growth: 4.1, inflation: 8.4 },
    2025: { growth: 1.6, inflation: 7 },
    2026: { growth: 1.3, inflation: 6 },
  },
  NGA: {
    2020: { growth: -1.8, inflation: 13 },
    2022: { inflation: 19, growth: 3.3 },
    2023: { inflation: 25, growth: 2.9 },
    2024: { inflation: 33, growth: 3.4 },
    2025: { inflation: 23, growth: 3.2 },
    2026: { inflation: 18, growth: 3.4 },
  },
  ZAF: {
    2020: { growth: -6, unemployment: 29 },
    2024: { growth: 0.6, unemployment: 32.1, inflation: 4.4 },
    2026: { growth: 1.4, unemployment: 31.5, inflation: 4.2 },
  },
  EGY: {
    2023: { inflation: 24, growth: 3.8 },
    2024: { inflation: 28, growth: 2.4 },
    2026: { inflation: 14, growth: 4.2 },
  },
  ISR: {
    2020: { growth: -1.9 },
    2023: { growth: 2, inflation: 4.2 },
    2024: { growth: 0.7, inflation: 3.1 },
    2025: { growth: 2.4 },
    2026: { growth: 3.2 },
  },
  SGP: {
    2020: { growth: -3.9, inflation: -0.2 },
    2021: { growth: 9.7 },
    2024: { growth: 3.8, inflation: 2.4 },
    2026: { growth: 2.6, inflation: 1.8 },
  },
  ARE: {
    2020: { growth: -5 },
    2022: { growth: 7.5, inflation: 4.8 },
    2024: { growth: 3.8, inflation: 2.2 },
    2026: { growth: 4, inflation: 2 },
  },
  VNM: {
    2020: { growth: 2.9 },
    2024: { growth: 7, inflation: 3.6 },
    2026: { growth: 6.2, inflation: 3.2 },
  },
  MEX: {
    2020: { growth: -8.4 },
    2022: { inflation: 7.9, growth: 3.7 },
    2024: { growth: 1.5, inflation: 4.7 },
    2026: { growth: 1.8, inflation: 3.6 },
  },
  IDN: {
    2020: { growth: -2.1 },
    2024: { growth: 5, inflation: 2.3 },
    2026: { growth: 5, inflation: 2.5 },
  },
  KOR: {
    2020: { growth: -0.7 },
    2022: { inflation: 5.1, growth: 2.7 },
    2024: { growth: 2, inflation: 2.3 },
    2026: { growth: 2.1, inflation: 2 },
  },
  AUS: {
    2020: { growth: -2.1 },
    2022: { inflation: 6.6, growth: 4.1 },
    2024: { growth: 1.1, inflation: 3.2 },
    2026: { growth: 2, inflation: 2.6 },
  },
  ESP: {
    2020: { growth: -11.2, unemployment: 15.5 },
    2022: { inflation: 8.3, growth: 6.2 },
    2024: { growth: 3.2, unemployment: 11.3, inflation: 2.8 },
    2026: { growth: 2.1, unemployment: 10.6, inflation: 2.2 },
  },
  ITA: {
    2020: { growth: -8.9 },
    2022: { inflation: 8.7, growth: 4.8 },
    2024: { growth: 0.7, inflation: 1.1 },
    2026: { growth: 0.8, inflation: 1.7 },
  },
  CAN: {
    2020: { growth: -5.1 },
    2022: { inflation: 6.8, growth: 3.8 },
    2024: { growth: 1.3, inflation: 2.4, unemployment: 6.3 },
    2026: { growth: 1.6, inflation: 2, unemployment: 6.4 },
  },
  POL: {
    2020: { growth: -2 },
    2022: { inflation: 14.4, growth: 5.3 },
    2024: { growth: 2.9, inflation: 3.7 },
    2026: { growth: 3.2, inflation: 3 },
  },
  SAU: {
    2020: { growth: -4.3 },
    2022: { growth: 7.5, inflation: 2.5 },
    2024: { growth: 1.4, inflation: 1.7 },
    2026: { growth: 3.4, inflation: 1.8 },
  },
};

export type MacroPin = Pin;

export function anchorFor(place: Place): Anchor {
  const base = SUB[place.subregion] ?? WORLD;
  const patch = O[place.iso];
  return patch ? { ...base, ...patch } : base;
}

export type Nudge = Partial<{
  growth: number;
  inflation: number;
  unemployment: number;
  living: number;
  working: number;
  investing: number;
  tourism: number;
  conflict: number;
  sentiment: number;
  housing: number;
  venture: number;
  openness: number;
  governance: number;
}>;

export const GLOBAL: Record<number, Nudge> = {
  2016: { growth: 0.4, inflation: -0.8, unemployment: 0.5, housing: -8, sentiment: 2, venture: -6, tourism: -4 },
  2017: { growth: 0.6, inflation: -0.6, unemployment: 0.3, housing: -6, sentiment: 3, venture: -4, tourism: -2 },
  2018: { growth: 0.4, inflation: -0.3, unemployment: 0.1, housing: -4, sentiment: 1, venture: -2 },
  2019: { growth: 0.2, inflation: -0.5, unemployment: 0, housing: -2, sentiment: 1, venture: 0 },
  2020: { growth: -5.5, inflation: -1.1, unemployment: 2.4, living: -8, working: -9, investing: -10, tourism: -34, sentiment: -16, housing: -3, venture: -8 },
  2021: { growth: 3.6, inflation: 0.8, unemployment: 0.8, living: -2, working: -1, investing: -1, tourism: -14, sentiment: -3, housing: 3, venture: 5 },
  2022: { growth: -0.4, inflation: 4.8, unemployment: -0.3, living: -2, sentiment: -6, housing: 8, investing: -3, venture: -2 },
  2023: { growth: 0.1, inflation: 1.4, unemployment: -0.2, housing: 5, sentiment: -1, venture: 2 },
  2024: {},
  2025: { growth: 0.15, inflation: -0.7, housing: 1, sentiment: 2, venture: 1 },
  2026: { growth: 0.1, inflation: -0.9, housing: 0, sentiment: 2, venture: 2 },
};

function add(n: Nudge, key: keyof Nudge, value: number) {
  n[key] = (n[key] ?? 0) + value;
}

export function story(iso: string, year: number): Nudge {
  const n: Nudge = {};
  if ((year === 2020 || year === 2021) && TOURISM.has(iso)) {
    add(n, "growth", year === 2020 ? -3.2 : -0.8);
    add(n, "tourism", year === 2020 ? -16 : -8);
    add(n, "sentiment", -4);
    add(n, "working", -3);
  }
  if (year >= 2023 && TECH.has(iso)) add(n, "venture", year >= 2024 ? 6 : 4);
  if ((year === 2022 || year === 2023) && ENERGY_EXPORT.has(iso)) {
    add(n, "growth", 1.4);
    add(n, "investing", 3);
    add(n, "inflation", -1.2);
  }
  if ((year === 2022 || year === 2023) && LOW_INFL.has(iso)) add(n, "inflation", year === 2022 ? -3.2 : -1.2);
  if (iso === "CHN" && year >= 2022) {
    add(n, "investing", -6);
    add(n, "sentiment", -6);
    add(n, "housing", 6);
    add(n, "venture", -4);
  }
  if (iso === "CHN" && year <= 2019) add(n, "growth", 1.4);
  if (iso === "DEU" && year >= 2023) {
    add(n, "growth", -0.6);
    add(n, "investing", -5);
    add(n, "sentiment", -4);
    add(n, "working", -3);
  }
  if (iso === "UKR" && year >= 2022) {
    add(n, "conflict", 18);
    add(n, "living", year === 2022 ? -26 : -16);
    add(n, "working", -14);
    add(n, "investing", -18);
    add(n, "sentiment", year === 2022 ? -24 : -12);
    add(n, "tourism", -30);
    add(n, "openness", -6);
  }
  if (iso === "RUS" && year >= 2022) {
    add(n, "conflict", 16);
    add(n, "openness", -22);
    add(n, "investing", -16);
    add(n, "governance", -6);
    add(n, "sentiment", -8);
  }
  if (iso === "BLR" && year >= 2022) {
    add(n, "openness", -16);
    add(n, "investing", -10);
    add(n, "sentiment", -6);
  }
  if (iso === "ISR" && year >= 2023) {
    add(n, "conflict", year === 2024 ? 22 : 14);
    add(n, "sentiment", year === 2024 ? -12 : -6);
    add(n, "tourism", year === 2024 ? -22 : -10);
    add(n, "living", -4);
  }
  if (iso === "PSE" && year >= 2023) {
    add(n, "conflict", 8);
    add(n, "living", -10);
    add(n, "sentiment", -14);
  }
  if ((iso === "LKA") && (year === 2022 || year === 2023)) {
    add(n, "inflation", year === 2022 ? 28 : 8);
    add(n, "growth", year === 2022 ? -6 : -1);
    add(n, "sentiment", -12);
    add(n, "governance", -6);
  }
  if (iso === "GHA" && year >= 2022 && year <= 2024) add(n, "inflation", 8);
  if (iso === "ETH" && year >= 2021 && year <= 2023) {
    add(n, "conflict", 18);
    add(n, "sentiment", -8);
  }
  if ((iso === "MLI" || iso === "BFA" || iso === "NER") && year >= 2022) {
    add(n, "conflict", 16);
    add(n, "governance", -8);
    add(n, "investing", -8);
  }
  if (year >= 2023 && (iso === "IND" || iso === "VNM" || iso === "IDN" || iso === "PHL")) {
    add(n, "investing", 3);
    add(n, "sentiment", 2);
  }
  if (year >= 2023 && (iso === "ARE" || iso === "SAU" || iso === "QAT")) {
    add(n, "tourism", 6);
    add(n, "investing", 4);
    add(n, "venture", 3);
  }
  return n;
}

export function macroPin(iso: string, year: number): Pin | undefined {
  return PIN[iso]?.[year];
}

export const PLACE_NOTES: Record<string, string> = {
  USA: "Deep capital and a tight innovation core, with uneven safety and an expensive housing belt.",
  CHN: "Still the manufacturing center of gravity. Property, youth jobs, and mood have cooled since 2022.",
  IND: "The fastest large-scale growth story on the map, with infrastructure and jobs still catching income.",
  DEU: "High living standards, an industrial model under energy and China pressure.",
  JPN: "Extraordinary safety and services, thin dynamism, and a very old age structure.",
  GBR: "A global services capital with a costly south and a slower post-2016 investment pulse.",
  UKR: "A working society under invasion. Any investing reading is a risk reading first.",
  SGP: "The cleanest operating environment in Asia, priced accordingly.",
  ARE: "Safety, air links, and a deliberate push into tourism and capital.",
  NGA: "Scale, youth, and a huge informal economy. Prices and security still tax daily life.",
  ZAF: "Institutions and scenery above its income peers, jobs far below.",
  BRA: "A continental market with a stubborn public-safety discount.",
  TUR: "A tourist and industrial crossroads still digesting a long inflation shock.",
  ARG: "Human capital and cities ahead of macro credibility. The 2024–26 disinflation is real but unfinished.",
  ISR: "A venture outlier whose security discount widened after 2023.",
  MEX: "Nearshoring lifted the investment case. Local safety still splits the map.",
  IDN: "A young, urbanizing market the size of a continent, with Bali doing different work than Jakarta.",
  VNM: "Factory relocation, a young workforce, and a tourism coast that came back fast.",
  SAU: "Oil income funding a forced diversification. Social rules and climate still shape living.",
  RUS: "A resource economy reoriented under sanctions. Openness is the constraint.",
  EGY: "A visitor economy and a currency that keeps rewriting household plans.",
  KEN: "East Africa's services hub, with Nairobi and the coast living different economies.",
  AUS: "High living scores, migration-fed growth, and housing that locals argue about constantly.",
  CAN: "Living quality is the product. Housing in the big metros is the caveat.",
  FRA: "Services, healthcare, and a visitor economy that still defines how the country is read abroad.",
  KOR: "Export tech, intense education, and a demographic clock.",
  POL: "The decade's quiet convergence story inside Europe.",
  ESP: "Tourism and cities carry growth. Youth unemployment never fully left.",
  ITA: "Extraordinary places, thin growth, and a median age near 48.",
  CHE: "The stability benchmark. Almost everything is excellent and expensive.",
};
