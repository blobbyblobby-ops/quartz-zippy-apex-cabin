export type BBox = [number, number, number, number];

export type Place = {
  iso: string;
  name: string;
  continent: string;
  subregion: string;
  pop: number;
  lon: number;
  lat: number;
  bbox: BBox;
};

export type Lens = "level" | "delta" | "since2019";

export type Weights = {
  official: number;
  social: number;
  news: number;
};

export type Raw = {
  lwi: number;
  living: number;
  working: number;
  investing: number;
  sentiment: number;
  momentum: number;
  gdpGrowth: number;
  inflation: number;
  unemployment: number;
  ppp: number;
  debt: number;
  currency: number;
  external: number;
  cost: number;
  housing: number;
  purchasing: number;
  income: number;
  confidence: number;
  ease: number;
  startups: number;
  fdi: number;
  tax: number;
  credit: number;
  bizMomentum: number;
  popGrowth: number;
  medianAge: number;
  urban: number;
  migration: number;
  workingAge: number;
  lifeSat: number;
  trust: number;
  optimism: number;
  workLife: number;
  riskAppetite: number;
  cohesion: number;
  safety: number;
  health: number;
  education: number;
  environment: number;
  transit: number;
  digital: number;
  culture: number;
  climate: number;
  wage: number;
  jobHeat: number;
  remote: number;
  talent: number;
  labor: number;
  language: number;
  market: number;
  realestate: number;
  venture: number;
  policy: number;
  openness: number;
  tourism: number;
  discourse: number;
  socialTone: number;
  conflict: number;
  corruption: number;
  cyber: number;
  informal: number;
  sanctions: number;
  governance: number;
};

export type Scale = "index" | "stat";

export type MetricDef = {
  id: keyof Raw;
  label: string;
  group: string;
  blurb: string;
  higherIsBetter: boolean;
  scale: Scale;
  format: (value: number) => string;
  /** 0–100 intensity of the reading itself. Higher means more of the thing. */
  levelOf: (value: number) => number;
};

export type Reading = {
  value: number;
  level: number;
  display: string;
};

export type RegionKind =
  | "metro"
  | "tourist"
  | "industrial"
  | "capital"
  | "coast"
  | "interior"
  | "resource";

export type Region = {
  id: string;
  iso: string;
  name: string;
  kind: RegionKind;
  lat: number;
  lon: number;
  km: number;
  dL: number;
  dW: number;
  dI: number;
  note: string;
  named: boolean;
};

export type Brief = {
  kicker: string;
  title: string;
  detail: string;
};

export type TermFreq = {
  term: string;
  theme: string;
  score: number;
};

export type ThemeShare = {
  id: string;
  label: string;
  share: number;
};

export const YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;
export const YEAR_MIN = 2016;
export const YEAR_MAX = 2026;

export function yearIndex(year: number): number {
  return year - YEAR_MIN;
}
