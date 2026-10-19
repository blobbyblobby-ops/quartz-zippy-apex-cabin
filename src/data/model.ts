import { anchorFor, GLOBAL, macroPin, PLACE_NOTES, story, type Nudge } from "./anchors";
import { readingsOf } from "./metrics";
import { clamp } from "./palette";
import { PLACE_BY, PLACES } from "./places";
import type { Brief, Place, Raw, Reading, Region, TermFreq, ThemeShare, Weights } from "./types";
import { YEAR_MIN, YEARS } from "./types";

function unit(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296;
}

function jitter(iso: string, year: number, key: string, amp: number): number {
  return (unit(`${iso}:${year}:${key}`) - 0.5) * 2 * amp;
}

function take(nudge: Nudge, key: keyof Nudge): number {
  return nudge[key] ?? 0;
}

const SANCTION: Record<string, number> = {
  RUS: 78,
  IRN: 74,
  PRK: 90,
  SYR: 82,
  VEN: 58,
  BLR: 66,
  MMR: 50,
  CUB: 42,
  SDN: 40,
  AFG: 34,
};

const DEBT: Record<string, number> = {
  JPN: 88,
  GRC: 80,
  ITA: 74,
  USA: 70,
  FRA: 66,
  GBR: 62,
  ESP: 64,
  PRT: 62,
  BEL: 64,
  EGY: 64,
  ARG: 64,
  PAK: 66,
  GHA: 62,
  LKA: 58,
  BRA: 60,
  ZAF: 58,
  CAN: 56,
  CHN: 54,
  IND: 50,
};

const CLIMATE: Record<string, number> = {
  GBR: 58,
  IRL: 56,
  SGP: 46,
  ARE: 38,
  QAT: 36,
  SAU: 34,
  NOR: 46,
  SWE: 48,
  FIN: 44,
  CAN: 52,
  RUS: 36,
  BRA: 68,
  ESP: 78,
  PRT: 80,
  NZL: 74,
  AUS: 70,
  ISL: 40,
  JPN: 66,
  KOR: 62,
  THA: 58,
  IDN: 60,
  PHL: 62,
  MAR: 76,
  ZAF: 78,
  CRI: 80,
  MEX: 70,
  USA: 64,
  FRA: 68,
  ITA: 74,
  GRC: 80,
  HRV: 78,
  TUR: 70,
  EGY: 52,
  IND: 48,
  CHN: 56,
  DEU: 60,
  NLD: 58,
  CHE: 62,
  AUT: 64,
  VNM: 64,
  KEN: 72,
  ETH: 60,
  ARG: 70,
  CHL: 72,
  COL: 74,
  PER: 68,
  URY: 72,
};

function incomeLevel(ppp: number): number {
  const v = (Math.log(Math.max(700, ppp)) - Math.log(1100)) / (Math.log(120000) - Math.log(1100));
  return clamp(v * 100, 0, 100);
}

function workingAge(age: number): number {
  if (age < 22) return 54 + (age - 16) * 0.7;
  if (age < 36) return 60 + (age - 22) * 0.4;
  return clamp(66 - (age - 36) * 0.55, 50, 70);
}

export function isThin(place: Place): boolean {
  return place.pop < 8000 || place.continent === "Antarctica" || place.subregion.startsWith("Seven");
}

function buildSeries(place: Place): Raw[] {
  const anchor = anchorFor(place);
  const drafts: Raw[] = [];
  let prevLwi: number | null = null;

  for (const year of YEARS) {
    const g = GLOBAL[year] ?? {};
    const s = story(place.iso, year);
    const shift = (base: number, key: keyof Nudge, amp = 0) =>
      base + take(g, key) + take(s, key) + (amp ? jitter(place.iso, year, key, amp) : 0);

    let growth = clamp(shift(anchor.growth, "growth", 0.25), -40, 16);
    let inflation = clamp(shift(anchor.inflation, "inflation", 0.18), -2, 220);
    const slack = anchor.unemployment > 18 ? 0.3 : 1;
    let unemployment = clamp(
      anchor.unemployment + (take(g, "unemployment") + take(s, "unemployment")) * slack + jitter(place.iso, year, "unemployment", 0.18),
      0.3,
      48,
    );
    const pin = macroPin(place.iso, year);
    if (pin?.growth != null) growth = pin.growth;
    if (pin?.inflation != null) inflation = pin.inflation;
    if (pin?.unemployment != null) unemployment = pin.unemployment;

    const living = clamp(shift(anchor.living, "living", 0.7), 3, 98);
    const working = clamp(shift(anchor.working, "working", 0.7), 3, 98);
    const investing = clamp(shift(anchor.investing, "investing", 0.8), 2, 98);
    const tourism = clamp(shift(anchor.tourism, "tourism", 0.8), 0, 100);
    const conflict = clamp(shift(anchor.conflict, "conflict", 0.35), 0, 100);
    const governance = clamp(anchor.governance + take(s, "governance") + jitter(place.iso, year, "gov", 0.45), 4, 98);
    const openness = clamp(anchor.openness + take(s, "openness") + jitter(place.iso, year, "open", 0.4), 2, 99);
    const digital = clamp(anchor.digital + (year >= 2020 ? 2.5 : 0) + (year - 2016) * 0.3 + jitter(place.iso, year, "digital", 0.4), 4, 99);
    const safety = clamp(anchor.safety + (living - anchor.living) * 0.22 - Math.max(0, conflict - anchor.conflict) * 0.18, 3, 98);
    const health = clamp(anchor.health + (year === 2020 ? -6 : year === 2021 ? -2 : 0), 4, 98);
    const education = clamp(anchor.education + jitter(place.iso, year, "edu", 0.25), 4, 98);
    const cost = clamp(anchor.cost + take(g, "housing") * 0.28 + Math.max(0, inflation - 4) * 0.22, 8, 98);
    const housing = clamp(anchor.cost * 0.7 + take(g, "housing") + take(s, "housing") + (year >= 2022 ? 3 : 0), 6, 99);
    const venture = clamp(investing * 0.5 + openness * 0.18 + digital * 0.12 + take(g, "venture") + take(s, "venture"), 0, 100);
    const sentiment = clamp(
      living * 0.34 +
        working * 0.22 +
        investing * 0.16 +
        (100 - conflict) * 0.16 +
        (100 - Math.min(inflation, 45)) * 0.12 * 0.2 +
        take(g, "sentiment") +
        take(s, "sentiment") +
        jitter(place.iso, year, "sent", 0.8),
      2,
      98,
    );
    const lwi = clamp(living * 0.36 + working * 0.3 + investing * 0.34, 0, 100);
    const momentum = clamp(50 + (prevLwi == null ? 0 : (lwi - prevLwi) * 2.4), 0, 100);
    prevLwi = lwi;

    const language = clamp(anchor.language, 0, 100);
    const tax = clamp(anchor.tax + jitter(place.iso, year, "tax", 0.3), 4, 92);
    const popGrowth = clamp(anchor.popGrowth + (year === 2020 ? -0.12 : 0), -1.6, 4.2);
    const medianAge = clamp(anchor.medianAge + (year - 2024) * (anchor.medianAge < 24 ? 0.05 : 0.13), 15, 56);
    const urban = clamp(anchor.urban + (year - 2016) * 0.12, 0, 100);
    const wage = clamp(inflation * 0.62 + Math.max(growth, -4) * 0.28, -4, 80);
    const credit = clamp(governance * 0.48 + openness * 0.24 + (100 - conflict) * 0.16, 4, 96);
    const startups = clamp(venture * 0.62 + digital * 0.2 + working * 0.12, 2, 98);
    const fdi = clamp(investing * 0.42 + openness * 0.32 + governance * 0.22 - conflict * 0.18, 2, 98);
    const ease = clamp(governance * 0.34 + openness * 0.28 + credit * 0.22 + (100 - tax) * 0.16, 2, 98);
    const bizMomentum = clamp(50 + growth * 3 + (investing - 55) * 0.35, 2, 98);
    const europe = place.continent === "Europe" ? 18 : 0;
    const labor = clamp(38 + europe + (governance - 60) * 0.35, 12, 92);
    const remote = clamp(digital * 0.46 + language * 0.34 + (100 - conflict) * 0.16 + (year >= 2020 ? 5 : 0), 0, 100);
    const talent = clamp(education * 0.4 + working * 0.28 + digital * 0.2 + urban * 0.12, 0, 100);
    const jobHeat = clamp(78 - unemployment * 1.55 + growth * 1.8, 2, 98);
    const market = clamp(48 + growth * 3.1 + (investing - 50) * 0.35 + (sentiment - 50) * 0.15, 2, 98);
    const policy = clamp(governance * 0.62 + (100 - conflict) * 0.24 + openness * 0.14, 2, 98);
    const culture = clamp(tourism * 0.48 + living * 0.28 + urban * 0.12, 6, 98);
    let environment = clamp(68 - (100 - governance) * 0.22 - urban * 0.1 - conflict * 0.08 + (place.continent === "Europe" ? 8 : 0), 6, 96);
    if (place.iso === "CHN" || place.iso === "IND") environment = clamp(environment - 12, 6, 96);
    const transitBoost = ["JPN", "KOR", "SGP", "HKG", "CHE", "NLD", "FRA", "DEU", "ESP", "TWN"].includes(place.iso)
      ? 16
      : place.continent === "Europe"
        ? 8
        : 0;
    const transit = clamp(urban * 0.28 + governance * 0.32 + transitBoost - (place.iso === "USA" ? 12 : 0), 6, 96);
    const climate =
      CLIMATE[place.iso] ??
      clamp(94 - Math.abs(Math.abs(place.lat) - 26) * 1.65, 16, 92);
    const ageShare = workingAge(medianAge);
    const migration = clamp(living * 0.34 + working * 0.24 + openness * 0.2 + safety * 0.16 - conflict * 0.22, 0, 100);
    const lifeSat = clamp(living * 0.5 + safety * 0.22 + (100 - cost) * 0.12 + (100 - conflict) * 0.16, 2, 98);
    const trust = clamp(governance * 0.72 + safety * 0.18 - conflict * 0.16, 2, 98);
    const optimism = clamp(sentiment * 0.62 + investing * 0.24 + working * 0.14, 2, 98);
    const workLife = clamp(living * 0.4 + labor * 0.28 + (100 - housing) * 0.18 + (100 - jobHeat) * 0.08, 4, 96);
    const riskAppetite = clamp(investing * 0.4 + venture * 0.3 + (100 - governance) * 0.1 + (40 - Math.min(medianAge, 50)) * 0.4, 2, 96);
    const cohesion = clamp(safety * 0.4 + trust * 0.35 + (100 - conflict) * 0.25, 2, 98);
    const currency = clamp(96 - Math.min(inflation, 60) * 1.05 - conflict * 0.1 + governance * 0.08, 2, 98);
    const debt = clamp((DEBT[place.iso] ?? 40 + (100 - governance) * 0.22) + (year >= 2020 && year <= 2022 ? 4 : 0), 8, 96);
    const external = clamp(52 + (tourism > 75 ? 8 : 0) + (openness - 50) * 0.2 - Math.max(0, inflation - 8) * 0.3, 6, 94);
    const corruption = clamp(102 - governance * 0.86 + conflict * 0.1, 3, 98);
    const informal = clamp(96 - governance * 0.42 - incomeLevel(anchor.ppp) * 0.38 + conflict * 0.12, 4, 97);
    const cyber = clamp(digital * 0.42 + incomeLevel(anchor.ppp) * 0.28 + (100 - governance) * 0.22, 4, 96);
    let sanctions = SANCTION[place.iso] ?? clamp((100 - openness) * 0.18 + conflict * 0.12, 0, 42);
    if (place.iso === "RUS" && year >= 2022) sanctions = Math.max(sanctions, 84);
    if (place.iso === "BLR" && year >= 2022) sanctions = Math.max(sanctions, 70);
    const discourse = clamp(
      22 + Math.log10(place.pop + 50) * 7 + (year === 2020 ? 12 : year === 2022 ? 9 : 0) + conflict * 0.12,
      6,
      98,
    );
    const socialTone = clamp(sentiment * 0.7 + (100 - conflict) * 0.2 - Math.min(inflation, 40) * 0.35, 2, 98);
    const confidence = clamp(sentiment * 0.5 + working * 0.25 + currency * 0.25, 2, 98);
    const realestate = clamp((100 - housing) * 0.34 + governance * 0.26 + tourism * 0.2 + investing * 0.2, 2, 98);

    drafts.push({
      lwi,
      living,
      working,
      investing,
      sentiment,
      momentum,
      gdpGrowth: growth,
      inflation,
      unemployment,
      ppp: anchor.ppp,
      debt,
      currency,
      external,
      cost,
      housing,
      purchasing: 0,
      income: 0,
      confidence,
      ease,
      startups,
      fdi,
      tax,
      credit,
      bizMomentum,
      popGrowth,
      medianAge,
      urban,
      migration,
      workingAge: ageShare,
      lifeSat,
      trust,
      optimism,
      workLife,
      riskAppetite,
      cohesion,
      safety,
      health,
      education,
      environment,
      transit,
      digital,
      culture,
      climate,
      wage,
      jobHeat,
      remote,
      talent,
      labor,
      language,
      market,
      realestate,
      venture,
      policy,
      openness,
      tourism,
      discourse,
      socialTone,
      conflict,
      corruption,
      cyber,
      informal,
      sanctions,
      governance,
    });
  }

  const anchorIdx = 2024 - YEAR_MIN;
  const growths = drafts.map((row) => row.gdpGrowth);
  for (let i = 0; i < drafts.length; i++) {
    let ppp = anchor.ppp;
    if (i >= anchorIdx) {
      for (let k = anchorIdx; k < i; k++) ppp *= 1 + growths[k] / 100;
    } else {
      for (let k = anchorIdx - 1; k >= i; k--) {
        const g = growths[k];
        ppp /= 1 + (g <= -90 ? -0.5 : g) / 100;
      }
    }
    drafts[i].ppp = clamp(ppp, 400, 250000);
    drafts[i].income = incomeLevel(drafts[i].ppp);
    drafts[i].purchasing = clamp(drafts[i].income * 0.62 + (100 - drafts[i].cost) * 0.38, 0, 100);
    drafts[i].informal = clamp(96 - drafts[i].governance * 0.4 - drafts[i].income * 0.38 + drafts[i].conflict * 0.12, 4, 97);
    drafts[i].cyber = clamp(drafts[i].digital * 0.4 + drafts[i].income * 0.3 + (100 - drafts[i].governance) * 0.22, 4, 96);
  }
  return drafts;
}

const cache = new Map<string, Raw[]>();

export function seriesOf(iso: string): Raw[] {
  const hit = cache.get(iso);
  if (hit) return hit;
  const place = PLACE_BY[iso];
  if (!place) return [];
  const built = buildSeries(place);
  cache.set(iso, built);
  return built;
}

export function withRegion(raw: Raw, region: Region): Raw {
  const next: Raw = { ...raw };
  const bump = (key: keyof Raw, delta: number, lo = 0, hi = 100) => {
    next[key] = clamp(Number(raw[key]) + delta, lo, hi);
  };
  bump("living", region.dL);
  bump("working", region.dW);
  bump("investing", region.dI);
  bump("safety", region.dL * 0.4);
  bump("tourism", region.kind === "tourist" || region.kind === "coast" ? 12 : region.dL * 0.15);
  bump("cost", region.kind === "metro" || region.kind === "capital" ? 8 : region.kind === "tourist" ? 6 : 0);
  bump("housing", region.kind === "metro" || region.kind === "capital" ? 9 : region.kind === "tourist" ? 7 : 0);
  bump("venture", region.dI * 0.65 + (region.kind === "metro" ? 4 : 0));
  bump("startups", region.dI * 0.5 + (region.kind === "metro" ? 3 : 0));
  bump("digital", region.kind === "metro" || region.kind === "capital" ? 4 : region.kind === "interior" ? -4 : 0);
  bump("environment", region.kind === "industrial" || region.kind === "resource" ? -7 : region.kind === "tourist" ? 3 : 0);
  bump("jobHeat", region.dW * 0.35);
  bump("remote", region.kind === "tourist" ? 6 : region.kind === "metro" ? 3 : 0);
  bump("talent", region.dW * 0.25);
  bump("sentiment", (region.dL + region.dW + region.dI) * 0.22);
  bump("optimism", (region.dL + region.dI) * 0.18);
  bump("lifeSat", region.dL * 0.3);
  bump("fdi", region.dI * 0.3);
  next.unemployment = clamp(raw.unemployment - region.dW * 0.05, 0.3, 50);
  next.lwi = clamp(next.living * 0.36 + next.working * 0.3 + next.investing * 0.34, 0, 100);
  return next;
}

export function rawAt(iso: string, year: number, region?: Region | null): Raw | null {
  const row = seriesOf(iso)[year - YEAR_MIN];
  if (!row) return null;
  return region ? withRegion(row, region) : row;
}

export function readingAt(iso: string, year: number, metricId: string, region?: Region | null): Reading | null {
  const raw = rawAt(iso, year, region);
  if (!raw) return null;
  return readingsOf(raw)[metricId] ?? null;
}

export function blendedLevel(raw: Raw, prev: Raw | null, metricId: string, weights: Weights): number {
  const now = readingsOf(raw)[metricId]?.level ?? 0;
  const before = prev ? (readingsOf(prev)[metricId]?.level ?? now) : now;
  const social = clamp(now * 0.48 + (readingsOf(raw).sentiment?.level ?? now) * 0.52, 0, 100);
  const news = clamp(now + (now - before) * 1.65, 0, 100);
  const sum = weights.official + weights.social + weights.news;
  if (sum <= 0) return now;
  return (now * weights.official + social * weights.social + news * weights.news) / sum;
}

const THEME_SPECS: { id: string; label: string; terms: string[]; score: (raw: Raw) => number }[] = [
  { id: "cost", label: "Cost of living", terms: ["rent", "groceries", "bills", "prices"], score: (r) => r.cost * 0.55 + Math.min(100, r.inflation * 2.4) * 0.45 },
  { id: "housing", label: "Housing", terms: ["housing", "mortgage", "landlord", "affordability"], score: (r) => r.housing * 0.75 + r.cost * 0.25 },
  { id: "jobs", label: "Jobs and wages", terms: ["jobs", "wages", "hiring", "layoffs"], score: (r) => Math.min(100, r.unemployment * 3) * 0.45 + (100 - r.jobHeat) * 0.25 + r.wage * 2 },
  { id: "remote", label: "Remote work", terms: ["remote work", "nomad", "coworking", "visa"], score: (r) => r.remote * 0.7 + r.digital * 0.3 },
  { id: "safety", label: "Safety", terms: ["safety", "crime", "policing", "protests"], score: (r) => (100 - r.safety) * 0.55 + r.conflict * 0.45 },
  { id: "health", label: "Healthcare", terms: ["healthcare", "hospitals", "insurance", "pharmacies"], score: (r) => (100 - r.health) * 0.6 + (yearless(r) ? 20 : 20) },
  { id: "capital", label: "Startups and capital", terms: ["startup", "venture", "funding", "IPO"], score: (r) => r.venture * 0.5 + r.startups * 0.35 + r.fdi * 0.15 },
  { id: "travel", label: "Travel and tourism", terms: ["tourism", "flights", "hotels", "beaches"], score: (r) => r.tourism * 0.7 + r.culture * 0.3 },
  { id: "policy", label: "Policy and governance", terms: ["election", "policy", "tax", "regulation"], score: (r) => (100 - r.governance) * 0.4 + r.tax * 0.25 + 18 },
  { id: "climate", label: "Climate and environment", terms: ["climate", "heat", "floods", "air quality"], score: (r) => (100 - r.environment) * 0.5 + (100 - r.climate) * 0.5 },
  { id: "migration", label: "Migration", terms: ["immigration", "emigration", "borders", "visas"], score: (r) => Math.abs(r.migration - 48) * 0.9 + Math.abs(r.popGrowth) * 8 + 12 },
  { id: "ai", label: "AI and tech work", terms: ["AI", "automation", "chips", "software jobs"], score: (r) => r.digital * 0.3 + r.venture * 0.45 + r.talent * 0.25 },
];

function yearless(raw: Raw): boolean {
  return raw.health > 0;
}

export function themeShares(raw: Raw): ThemeShare[] {
  const scored = THEME_SPECS.map((spec) => ({ ...spec, value: Math.max(1, spec.score(raw)) }));
  const total = scored.reduce((sum, row) => sum + row.value, 0);
  return scored
    .map((row) => ({ id: row.id, label: row.label, share: (row.value / total) * 100 }))
    .sort((a, b) => b.share - a.share);
}

export function topTerms(raw: Raw, limit = 8): TermFreq[] {
  const shares = themeShares(raw);
  const byId = new Map(shares.map((row) => [row.id, row.share]));
  const terms: TermFreq[] = [];
  for (const spec of THEME_SPECS) {
    const share = byId.get(spec.id) ?? 0;
    spec.terms.forEach((term, index) => {
      const wobble = 0.72 + unit(`${term}:${Math.round(raw.discourse)}:${spec.id}`) * 0.5;
      terms.push({
        term,
        theme: spec.label,
        score: share * wobble * (1 - index * 0.12) * (0.55 + raw.discourse / 180),
      });
    });
  }
  return terms.sort((a, b) => b.score - a.score).slice(0, limit);
}

const YEAR_CONTEXT: Record<number, string> = {
  2016: "Late-cycle expansion. Capital was cheap and tourism was still building.",
  2017: "A synchronized growth year. Trade and travel readings were firm.",
  2018: "Growth held, with early trade friction and a stronger dollar.",
  2019: "The pre-pandemic baseline. Rich-world labor markets were tight and inflation was quiet.",
  2020: "The pandemic break. Output, travel, and sentiment dropped. Remote work and digital readings jumped.",
  2021: "Reopening. Demand came back faster than supply and prices started to lift.",
  2022: "The price shock. Energy, food, and housing dominated, and the war in Ukraine repriced risk.",
  2023: "Disinflation started. Rates bit. AI and venture language concentrated in a few hubs.",
  2024: "Growth split. The US and parts of Asia held up. Europe and property-heavy markets cooled.",
  2025: "A softer landing in most large economies. Housing stayed tight. Conflict stayed local.",
  2026: "Nowcast. South and Southeast Asia and the Gulf still add growth. Europe is steady. Conflict geographies stay discounted.",
};

const WATCH: { key: keyof Raw; label: string }[] = [
  { key: "gdpGrowth", label: "GDP growth" },
  { key: "inflation", label: "Inflation" },
  { key: "unemployment", label: "Unemployment" },
  { key: "sentiment", label: "Sentiment" },
  { key: "lwi", label: "The LWI index" },
  { key: "tourism", label: "Tourism" },
  { key: "housing", label: "Housing pressure" },
  { key: "venture", label: "Venture activity" },
  { key: "conflict", label: "Conflict exposure" },
  { key: "safety", label: "Safety" },
];

export function briefsFor(name: string, year: number, current: Raw, previous: Raw | null): Brief[] {
  const briefs: Brief[] = [
    {
      kicker: String(year),
      title: year === 2026 ? "Nowcast, not a final print" : "The year in context",
      detail: YEAR_CONTEXT[year] ?? "",
    },
  ];
  if (!previous) return briefs;
  const moves = WATCH.map((item) => ({
    ...item,
    delta: current[item.key] - previous[item.key],
  }))
    .filter((item) => Math.abs(item.delta) >= 0.6)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
    .slice(0, 3);
  for (const move of moves) {
    const dir = move.delta > 0 ? "rose" : "fell";
    const digits = move.key === "gdpGrowth" || move.key === "inflation" || move.key === "unemployment" ? 1 : 0;
    briefs.push({
      kicker: "Shift",
      title: `${move.label} ${dir}`,
      detail: `In ${name}, ${move.label.toLowerCase()} ${dir} ${Math.abs(move.delta).toFixed(digits)} from ${year - 1}. The atlas reads that as a modeled change, not a wire story.`,
    });
  }
  return briefs;
}

export function noteFor(place: Place, raw: Raw): string {
  return (
    PLACE_NOTES[place.iso] ??
    `${place.subregion}. Living ${Math.round(raw.living)}, working ${Math.round(raw.working)}, investing ${Math.round(raw.investing)} on the modeled index.`
  );
}

export function weightedRaw(places: Place[], year: number): Raw | null {
  let weight = 0;
  const acc: Partial<Raw> = {};
  for (const place of places) {
    if (isThin(place) || place.pop <= 0) continue;
    const raw = rawAt(place.iso, year);
    if (!raw) continue;
    weight += place.pop;
    for (const key of Object.keys(raw) as (keyof Raw)[]) {
      acc[key] = (acc[key] ?? 0) + raw[key] * place.pop;
    }
  }
  if (weight <= 0) return null;
  const out = {} as Raw;
  for (const key of Object.keys(acc) as (keyof Raw)[]) out[key] = (acc[key] ?? 0) / weight;
  return out;
}

export function placesInScope(scope: string): Place[] {
  if (scope.startsWith("c:")) return PLACES.filter((place) => place.continent === scope.slice(2));
  if (scope.startsWith("s:")) return PLACES.filter((place) => place.subregion === scope.slice(2));
  return PLACES;
}
