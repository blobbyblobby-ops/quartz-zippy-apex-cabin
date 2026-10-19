import { clamp } from "./palette";
import type { MetricDef, Raw, Reading } from "./types";

function idx(value: number): string {
  return Math.round(value).toString();
}

function signed(value: number, digits: number, suffix = ""): string {
  const n = value.toFixed(digits);
  return `${value > 0 ? "+" : ""}${n}${suffix}`;
}

function levelSpan(value: number, lo: number, hi: number): number {
  return clamp(((value - lo) / (hi - lo)) * 100, 0, 100);
}

function stat(
  id: keyof Raw,
  label: string,
  group: string,
  blurb: string,
  higherIsBetter: boolean,
  format: (value: number) => string,
  levelOf: (value: number) => number,
): MetricDef {
  return { id, label, group, blurb, higherIsBetter, scale: "stat", format, levelOf };
}

function index(
  id: keyof Raw,
  label: string,
  group: string,
  blurb: string,
  higherIsBetter: boolean,
): MetricDef {
  return {
    id,
    label,
    group,
    blurb,
    higherIsBetter,
    scale: "index",
    format: idx,
    levelOf: (value) => clamp(value, 0, 100),
  };
}

export const METRICS: MetricDef[] = [
  index("lwi", "LWI index", "Index", "Composite of living, working, and investing conditions. 36 / 30 / 34.", true),
  index("living", "Living pillar", "Index", "Safety, health, education, environment, culture, climate, and costs.", true),
  index("working", "Working pillar", "Index", "Jobs, wages, talent, remote readiness, and day-to-day labor conditions.", true),
  index("investing", "Investing pillar", "Index", "Dynamism, capital openness, policy stability, and venture depth.", true),
  index("sentiment", "Sentiment index", "Index", "Mood of living, working, and opportunity — can diverge from the hard series.", true),
  index("momentum", "Momentum", "Index", "Change in the LWI index versus the prior year, centered at 50.", true),

  stat("gdpGrowth", "Real GDP growth", "Macro", "Modeled real output growth for the year.", true, (v) => signed(v, 1, "%"), (v) => levelSpan(v, -8, 10)),
  stat("inflation", "Inflation", "Macro", "Consumer-price pace. Extreme crises are pinned to published orders of magnitude.", false, (v) => `${v.toFixed(1)}%`, (v) => levelSpan(v, 0, 40)),
  stat("unemployment", "Unemployment", "Macro", "Labor-market slack. High readings in places like South Africa are structural.", false, (v) => `${v.toFixed(1)}%`, (v) => levelSpan(v, 0, 35)),
  stat("ppp", "GDP per capita (PPP)", "Macro", "Purchasing-power income level, compounded from a 2024 anchor with the growth path.", true, (v) => `$${Math.round(v).toLocaleString("en-US")}`, (v) => levelSpan(Math.log(Math.max(800, v)), Math.log(1200), Math.log(120000))),
  index("debt", "Debt pressure", "Macro", "How heavy the public-debt burden feels for policy and markets.", false),
  index("currency", "Currency stability", "Macro", "Resistance to inflation spikes, conflict, and sudden devaluation.", true),
  index("external", "External balance", "Macro", "Exporter strength versus import and financing pressure.", true),

  index("cost", "Cost of living", "Household", "Everyday prices relative to local incomes. Higher means more expensive.", false),
  index("housing", "Housing pressure", "Household", "How hard it is to rent or buy. Higher means less affordable.", false),
  index("purchasing", "Purchasing power", "Household", "What incomes actually buy after local costs.", true),
  index("income", "Income level", "Household", "Where typical incomes sit on a global ladder.", true),
  index("confidence", "Household confidence", "Household", "Willingness to spend and plan, blending prices, jobs, and mood.", true),

  index("ease", "Ease of business", "Business", "Governance, credit, tax friction, and openness to operate.", true),
  index("startups", "Startup formation", "Business", "How active new-firm creation is.", true),
  index("fdi", "FDI attractiveness", "Business", "Pull for long-horizon foreign capital.", true),
  index("tax", "Tax burden", "Business", "How heavy the tax take feels for firms and households.", false),
  index("credit", "SME credit access", "Business", "Whether smaller firms can borrow.", true),
  index("bizMomentum", "Business momentum", "Business", "Whether the business climate is heating or cooling.", true),

  stat("popGrowth", "Population growth", "Demographics", "Annual population change.", true, (v) => signed(v, 2, "%"), (v) => levelSpan(v, -1.2, 3.5)),
  stat("medianAge", "Median age", "Demographics", "Age structure. Higher means older.", false, (v) => `${v.toFixed(1)} yrs`, (v) => levelSpan(v, 15, 50)),
  index("urban", "Urbanization", "Demographics", "Share of life organized in cities.", true),
  index("migration", "Migration pull", "Demographics", "Attractiveness to people moving for work or safety.", true),
  stat("workingAge", "Working-age share", "Demographics", "Approximate share of the population in prime working years.", true, (v) => `${v.toFixed(1)}%`, (v) => levelSpan(v, 48, 72)),

  index("lifeSat", "Life satisfaction", "Psychographics", "Everyday contentment, not the same thing as income.", true),
  index("trust", "Institutional trust", "Psychographics", "Whether people treat public institutions as reliable.", true),
  index("optimism", "Optimism", "Psychographics", "Forward-looking mood about one's own prospects.", true),
  index("workLife", "Work-life preference", "Psychographics", "Room for life outside work. Higher means more room.", true),
  index("riskAppetite", "Risk appetite", "Psychographics", "Cultural and market willingness to take a chance.", true),
  index("cohesion", "Social cohesion", "Psychographics", "Everyday trust among people, dented by conflict and crime.", true),

  index("safety", "Safety", "Living", "Personal security in daily life.", true),
  index("health", "Healthcare", "Living", "Access to and quality of care.", true),
  index("education", "Education", "Living", "Schooling quality and attainment.", true),
  index("environment", "Environment", "Living", "Air, water, and ecological headroom.", true),
  index("transit", "Transit & access", "Living", "Ability to move without a private car.", true),
  index("digital", "Digital infrastructure", "Living", "Connectivity and the reliability of the network.", true),
  index("culture", "Culture & leisure", "Living", "Depth of food, arts, sport, and public life.", true),
  index("climate", "Climate comfort", "Living", "How livable the climate feels through the year.", true),

  stat("wage", "Wage growth", "Working", "Nominal wage pace. Can lag or lead inflation.", true, (v) => signed(v, 1, "%"), (v) => levelSpan(v, -2, 12)),
  index("jobHeat", "Job-market heat", "Working", "How tight hiring conditions are.", true),
  index("remote", "Remote-work readiness", "Working", "Broadband, language, and visa practicality for distributed work.", true),
  index("talent", "Talent depth", "Working", "Thickness of skilled labor markets.", true),
  index("labor", "Labor protections", "Working", "Formal protections around dismissal, leave, and safety.", true),
  index("language", "Global-language access", "Working", "Ease of operating in widely used business languages.", true),

  index("market", "Market momentum", "Investing", "Risk-asset mood, not a forecast of returns.", true),
  index("realestate", "Real-estate balance", "Investing", "Yield and demand versus bubble and affordability risk.", true),
  index("venture", "Venture activity", "Investing", "Early-stage funding and startup ambition.", true),
  index("policy", "Policy stability", "Investing", "Whether rules are predictable enough to underwrite a plan.", true),
  index("openness", "Capital openness", "Investing", "Ability to move capital, talent, and trade in and out.", true),
  index("tourism", "Tourism yield", "Investing", "Strength of the visitor economy as a place-based asset.", true),

  index("discourse", "Discourse volume", "Discourse", "How loud the place is in news and social conversation this year.", true),
  index("socialTone", "Social tone", "Discourse", "Warmth or hostility of that conversation.", true),

  index("conflict", "Conflict exposure", "Risk", "War, political violence, and acute security crisis.", false),
  index("corruption", "Corruption pressure", "Risk", "How much graft and capture tax everyday decisions.", false),
  index("cyber", "Cyber exposure", "Risk", "How heavily connected economies are targeted. Not an incident feed.", false),
  index("informal", "Illicit-economy pressure", "Risk", "Public-style estimate of informal and illegal economic weight. Dark-web markets are not ingested.", false),
  index("sanctions", "Sanctions friction", "Risk", "Compliance drag from sanctions and financial isolation.", false),
  index("governance", "Governance quality", "Risk", "State capacity, rule of law, and administrative reliability.", true),
];

export const GROUPS = [
  "Index",
  "Macro",
  "Household",
  "Business",
  "Demographics",
  "Psychographics",
  "Living",
  "Working",
  "Investing",
  "Discourse",
  "Risk",
] as const;

const BY_ID = new Map(METRICS.map((metric) => [metric.id, metric]));

export function metricById(id: string): MetricDef {
  return BY_ID.get(id as keyof Raw) ?? METRICS[0];
}

export function readingsOf(raw: Raw): Record<string, Reading> {
  const out: Record<string, Reading> = {};
  for (const metric of METRICS) {
    const value = raw[metric.id];
    out[metric.id] = {
      value,
      level: metric.levelOf(value),
      display: metric.format(value),
    };
  }
  return out;
}

export function formatDelta(metric: MetricDef, current: number, previous: number): string {
  const d = current - previous;
  const sign = d > 0 ? "+" : "";
  if (metric.id === "ppp") {
    return `${sign}$${Math.round(d).toLocaleString("en-US")}`;
  }
  if (metric.id === "medianAge") return `${sign}${d.toFixed(1)} yrs`;
  if (metric.scale === "stat") return `${sign}${d.toFixed(1)} pts`;
  return `${sign}${d.toFixed(1)}`;
}
