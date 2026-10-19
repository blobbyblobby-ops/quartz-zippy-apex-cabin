export type TrendItem = {
  title: string;
  traffic: string;
  headline: string;
  matches: boolean;
};

export type VendorResult = {
  vendor: "Semrush" | "Ahrefs";
  state: "unkeyed" | "ok" | "error";
  detail: string;
  rows: { phrase: string; volume: string; extra: string }[];
};

export type AttentionSeries = {
  term: string;
  points: { month: string; views: number }[];
  last: number;
  mom: number | null;
  yoy: number | null;
};

export type InterestResult = {
  state: "ok" | "empty" | "error";
  note: string;
  terms: string[];
  points: { label: string; values: number[] }[];
  related: { query: string; value: string; kind: "top" | "rising"; term: string }[];
};

export type LiveBundle = {
  fetchedAt: string;
  placeLabel: string;
  googleTrends: {
    state: "ok" | "empty" | "error";
    geoNote: string;
    items: TrendItem[];
    aiMatches: number;
  };
  interest: InterestResult;
  semrush: VendorResult;
  ahrefs: VendorResult;
  attention: AttentionSeries[];
  attentionNote: string;
  news: { title: string; source: string; url: string; when: string }[];
  hackerNews: { title: string; url: string; points: number; comments: number; when: string }[];
  official: { label: string; date: string; value: number | null; unit: string }[];
  officialNote: string;
};

const WIKI: Record<string, string> = {
  lwi: "Quality_of_life",
  living: "Quality_of_life",
  working: "Labour_economics",
  investing: "Investment",
  sentiment: "Consumer_confidence",
  momentum: "Economic_growth",
  gdpGrowth: "Economic_growth",
  inflation: "Inflation",
  unemployment: "Unemployment",
  ppp: "Purchasing_power_parity",
  debt: "Government_debt",
  currency: "Exchange_rate",
  external: "Balance_of_trade",
  cost: "Cost_of_living",
  housing: "Affordable_housing",
  purchasing: "Purchasing_power",
  income: "Income",
  confidence: "Consumer_confidence",
  ease: "Ease_of_doing_business_index",
  startups: "Startup_company",
  fdi: "Foreign_direct_investment",
  tax: "Tax",
  credit: "Small_and_medium-sized_enterprises",
  bizMomentum: "Business_cycle",
  popGrowth: "Population_growth",
  medianAge: "Population_pyramid",
  urban: "Urbanization",
  migration: "Human_migration",
  workingAge: "Workforce",
  lifeSat: "Life_satisfaction",
  trust: "Social_trust",
  optimism: "Optimism",
  workLife: "Work–life_balance",
  riskAppetite: "Risk_aversion",
  cohesion: "Social_cohesion",
  safety: "Crime",
  health: "Health_care",
  education: "Education",
  environment: "Air_pollution",
  transit: "Public_transport",
  digital: "Internet_access",
  culture: "Culture",
  climate: "Climate",
  wage: "Wage",
  jobHeat: "Labour_market",
  remote: "Remote_work",
  talent: "Human_capital",
  labor: "Labour_law",
  language: "Lingua_franca",
  market: "Stock_market",
  realestate: "Real_estate",
  venture: "Venture_capital",
  policy: "Policy",
  openness: "Capital_control",
  tourism: "Tourism",
  discourse: "Social_media",
  socialTone: "Sentiment_analysis",
  conflict: "War",
  corruption: "Political_corruption",
  cyber: "Cybercrime",
  informal: "Informal_economy",
  sanctions: "Economic_sanctions",
  governance: "Governance",
};

const NEEDLES: Record<string, string[]> = {
  inflation: ["inflation", "cpi", "prices", "cost of living"],
  unemployment: ["job", "jobs", "unemployment", "layoff", "hiring"],
  gdpGrowth: ["gdp", "recession", "growth"],
  housing: ["housing", "rent", "mortgage"],
  cost: ["cost of living", "prices", "inflation"],
  remote: ["remote", "work from home", "wfh"],
  venture: ["startup", "venture", "funding"],
  tourism: ["travel", "tourism", "flight"],
  conflict: ["war", "ceasefire", "conflict"],
  sanctions: ["sanction"],
  cyber: ["hack", "cyber", "breach"],
  discourse: ["ai", "chatgpt", "google"],
};

const AI = ["ai", "artificial intelligence", "chatgpt", "openai", "gemini", "claude", "llm", "machine learning", "generative"];

const INDICATORS = [
  { code: "NY.GDP.MKTP.KD.ZG", label: "Real GDP growth", unit: "%" },
  { code: "FP.CPI.TOTL.ZG", label: "Inflation, consumer prices", unit: "%" },
  { code: "SL.UEM.TOTL.ZS", label: "Unemployment", unit: "%" },
  { code: "NY.GDP.PCAP.PP.CD", label: "GDP per capita, PPP", unit: "USD" },
];

let isoMemo: Map<string, string> | null = null;
const bundleCache = new Map<string, { at: number; bundle: LiveBundle }>();

export async function loadSignals(input: {
  iso3: string;
  placeName: string;
  metricId: string;
  metricLabel: string;
  semrushKey?: string;
  ahrefsKey?: string;
}): Promise<LiveBundle> {
  const semrushKey = readKey(input.semrushKey);
  const ahrefsKey = readKey(input.ahrefsKey);
  const key = `${input.iso3}|${input.metricId}|${semrushKey.tag}|${ahrefsKey.tag}`;
  const hit = bundleCache.get(key);
  if (hit && Date.now() - hit.at < 15 * 60 * 1000) return hit.bundle;

  const placeLabel = input.placeName || "World";
  const iso2 = input.iso3 ? await iso2For(input.iso3) : null;
  const needles = needlesFor(input.metricId, input.metricLabel);
  const phrase = searchPhrase(input.metricId, input.metricLabel);
  const terms = trendTerms(phrase);
  const wikiTitles = [
    ["Artificial intelligence", "Artificial_intelligence"],
    ["Large language model", "Large_language_model"],
    ["ChatGPT", "ChatGPT"],
    [input.metricLabel, WIKI[input.metricId] ?? "Quality_of_life"],
  ] as const;
  const uniqueWiki = dedupeTitles(wikiTitles);

  const newsQuery = [input.metricLabel, input.placeName].filter(Boolean).join(" ");
  const database = iso2 ? iso2.toLowerCase() : "us";
  const geo = iso2 ? iso2.toUpperCase() : "";

  const googleJob = (async () => {
    const interest = await googleInterest(geo, placeLabel, terms);
    const trends = await googleTrends(iso2, placeLabel, needles);
    return { interest, trends };
  })();

  const [google, attention, newsAi, newsMetric, hnAi, hnMetric, official, semrush, ahrefs] = await Promise.all([
    googleJob,
    wikiAttention(uniqueWiki),
    googleNews("artificial intelligence"),
    googleNews(newsQuery || input.metricLabel),
    hackerNews("artificial intelligence"),
    hackerNews(input.metricLabel),
    worldBank(iso2, placeLabel),
    vendorSemrush(database, semrushKey, [terms[0], phrase]),
    vendorAhrefs(database, ahrefsKey, [terms[0], phrase]),
  ]);

  const news = dedupeNews([...newsMetric, ...newsAi]).slice(0, 6);
  const hacker = dedupeHn([...hnMetric, ...hnAi]).slice(0, 5);

  const bundle: LiveBundle = {
    fetchedAt: new Date().toISOString(),
    placeLabel,
    googleTrends: google.trends,
    interest: google.interest,
    semrush,
    ahrefs,
    attention,
    attentionNote:
      "Monthly English Wikipedia pageviews for the latest month Wikimedia has finished publishing. A trailing month under half the recent level is treated as unpublished and dropped. This is encyclopedia attention, not Google, Semrush, or Ahrefs search volume.",
    news,
    hackerNews: hacker,
    official: official.rows,
    officialNote: official.note,
  };
  bundleCache.set(key, { at: Date.now(), bundle });
  return bundle;
}

function needlesFor(metricId: string, label: string): string[] {
  const fromLabel = label
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3 && !["index", "pillar", "level", "pressure"].includes(word));
  return [...AI, ...(NEEDLES[metricId] ?? []), ...fromLabel];
}

function matches(text: string, needles: string[]): boolean {
  const hay = text.toLowerCase();
  return needles.some((needle) => hay.includes(needle));
}

async function iso2For(iso3: string): Promise<string | null> {
  try {
    if (!isoMemo) {
      const response = await fetch("https://api.worldbank.org/v2/country?format=json&per_page=400", {
        signal: AbortSignal.timeout(8000),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) return null;
      const payload = (await response.json()) as [unknown, { id?: string; iso2Code?: string }[]];
      isoMemo = new Map();
      for (const row of payload[1] ?? []) {
        if (row.id && row.iso2Code) isoMemo.set(row.id, row.iso2Code);
      }
    }
    return isoMemo.get(iso3) ?? null;
  } catch {
    return null;
  }
}

const PHRASE: Record<string, string> = {
  lwi: "quality of life",
  living: "quality of life",
  working: "jobs",
  investing: "investment",
  sentiment: "consumer confidence",
  momentum: "economic growth",
  gdpGrowth: "gdp growth",
  ppp: "gdp per capita",
  debt: "government debt",
  currency: "exchange rate",
  external: "trade balance",
  cost: "cost of living",
  housing: "housing prices",
  purchasing: "purchasing power",
  ease: "ease of doing business",
  fdi: "foreign investment",
  credit: "small business loans",
  bizMomentum: "business climate",
  popGrowth: "population growth",
  medianAge: "median age",
  workingAge: "working age",
  lifeSat: "life satisfaction",
  trust: "trust in government",
  workLife: "work life balance",
  riskAppetite: "risk appetite",
  cohesion: "social cohesion",
  jobHeat: "job market",
  remote: "remote work",
  talent: "talent shortage",
  labor: "labor law",
  language: "english proficiency",
  market: "stock market",
  realestate: "real estate",
  venture: "venture capital",
  policy: "political stability",
  openness: "capital controls",
  socialTone: "public mood",
  cyber: "cyber attack",
  informal: "informal economy",
  sanctions: "sanctions",
};

const TRENDS_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function searchPhrase(metricId: string, label: string): string {
  return PHRASE[metricId] ?? label.replace(/\(.*?\)/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}

function trendTerms(phrase: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const term of ["artificial intelligence", "chatgpt", phrase]) {
    const key = term.toLowerCase();
    if (seen.has(key) || key.length < 2) continue;
    seen.add(key);
    out.push(term);
  }
  return out;
}

function readKey(value: string | undefined): { key: string; tag: string; rejected: boolean } {
  const raw = (value ?? "").trim();
  if (!raw) return { key: "", tag: "0", rejected: false };
  if (raw.length < 8 || raw.length > 200 || /[\s"'<>]/.test(raw)) return { key: "", tag: "bad", rejected: true };
  let hash = 0;
  for (const char of raw) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return { key: raw, tag: hash.toString(16), rejected: false };
}

async function googleInterest(geo: string, placeLabel: string, terms: string[]): Promise<InterestResult> {
  const where = geo ? `${geo} (${placeLabel})` : `worldwide${placeLabel === "World" ? "" : `, because ${placeLabel} has no country code`}`;
  const empty: InterestResult = { state: "empty", note: "", terms, points: [], related: [] };
  try {
    const jar = new Map<string, string>();
    await warmTrends(jar);
    const exploreReq = {
      comparisonItem: terms.map((keyword) => ({ keyword, geo, time: "today 12-m" })),
      category: 0,
      property: "",
    };
    const exploreUrl = `https://trends.google.com/trends/api/explore?hl=en-US&tz=300&req=${encodeURIComponent(JSON.stringify(exploreReq))}`;
    const exploreResponse = await trendsFetch(exploreUrl, jar, "https://trends.google.com/trends/explore");
    const exploreText = await exploreResponse.text();
    if (!exploreResponse.ok || exploreText.includes("Error 429")) {
      return { ...empty, state: "error", note: `Google Trends interest-over-time returned ${exploreResponse.status} for ${where}. The daily list below is separate. No index was filled in.` };
    }
    const explore = JSON.parse(stripTrends(exploreText)) as { widgets?: TrendsWidget[] };
    const widgets = explore.widgets ?? [];
    const seriesWidget = widgets.find((widget) => widget.id === "TIMESERIES");
    if (!seriesWidget?.token || !seriesWidget.request) {
      return { ...empty, state: "error", note: `Google Trends returned no interest series for ${where}.` };
    }
    const points = await trendTimeline(seriesWidget, jar);
    const related = await trendRelated(widgets, terms, jar);
    if (points.length === 0) {
      return { ...empty, state: "empty", note: `Google Trends accepted ${where} but the 12-month series was empty.`, related };
    }
    return {
      state: "ok",
      note: `Search interest, last 12 months, ${where}. Scale is 0–100 against the peak of these terms together. It is not a search count and not a Semrush volume.`,
      terms,
      points,
      related,
    };
  } catch (error) {
    return { ...empty, state: "error", note: `Google Trends interest failed: ${messageOf(error)}` };
  }
}

type TrendsWidget = { id?: string; token?: string; request?: unknown };

async function trendTimeline(widget: TrendsWidget, jar: Map<string, string>): Promise<InterestResult["points"]> {
  const url = widgetUrl("multiline", widget);
  const response = await trendsFetch(url, jar, "https://trends.google.com/trends/explore");
  const text = await response.text();
  if (!response.ok || text.includes("Error 429")) return [];
  const payload = JSON.parse(stripTrends(text)) as {
    default?: { timelineData?: { formattedAxisTime?: string; value?: number[]; isPartial?: boolean }[] };
  };
  return (payload.default?.timelineData ?? [])
    .filter((row) => !row.isPartial)
    .map((row) => ({
      label: (row.formattedAxisTime ?? "").replace(/\u2009/g, " "),
      values: row.value ?? [],
    }))
    .filter((row) => row.values.length > 0);
}

async function trendRelated(widgets: TrendsWidget[], terms: string[], jar: Map<string, string>): Promise<InterestResult["related"]> {
  const relatedWidgets = widgets
    .filter((widget) => {
      const id = widget.id ?? "";
      return (id === "RELATED_QUERIES" || id.startsWith("RELATED_QUERIES_")) && widget.token && widget.request;
    })
    .sort((a, b) => relatedIndex(a.id) - relatedIndex(b.id));
  const out: InterestResult["related"] = [];
  for (const [index, widget] of relatedWidgets.entries()) {
    if (index > 0) await delay(700);
    const term = widgetTerm(widget, terms[relatedIndex(widget.id)] ?? "");
    const rows = await relatedLists(widget, jar, term);
    if (rows == null) break;
    out.push(...rows);
  }
  return out;
}

function relatedIndex(id?: string): number {
  const match = (id ?? "").match(/_(\d+)$/);
  return match ? Number(match[1]) : 0;
}

function widgetTerm(widget: TrendsWidget, fallback: string): string {
  const request = widget.request as {
    restriction?: { complexKeywordsRestriction?: { keyword?: { value?: string }[] } };
  };
  return request?.restriction?.complexKeywordsRestriction?.keyword?.[0]?.value || fallback;
}

async function relatedLists(widget: TrendsWidget, jar: Map<string, string>, term: string): Promise<InterestResult["related"] | null> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await trendsFetch(widgetUrl("relatedsearches", widget), jar, "https://trends.google.com/trends/explore");
      const text = await response.text();
      if (response.status === 429 || text.includes("Error 429")) {
        if (attempt === 0) {
          await delay(1500);
          continue;
        }
        return null;
      }
      if (!response.ok) return null;
      const payload = JSON.parse(stripTrends(text)) as {
        default?: { rankedList?: { rankedKeyword?: { query?: string; formattedValue?: string; value?: number }[] }[] };
      };
      const out: InterestResult["related"] = [];
      for (const [index, list] of (payload.default?.rankedList ?? []).entries()) {
        const kind = index === 0 ? "top" : "rising";
        const cap = kind === "top" ? 4 : 3;
        for (const row of (list.rankedKeyword ?? []).slice(0, cap)) {
          if (!row.query) continue;
          out.push({ query: row.query, value: row.formattedValue ?? String(row.value ?? ""), kind, term });
        }
      }
      return out;
    } catch {
      return null;
    }
  }
  return null;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function widgetUrl(kind: string, widget: TrendsWidget): string {
  const params = new URLSearchParams({
    hl: "en-US",
    tz: "300",
    token: widget.token ?? "",
    req: JSON.stringify(widget.request),
  });
  return `https://trends.google.com/trends/api/widgetdata/${kind}?${params.toString()}`;
}

async function warmTrends(jar: Map<string, string>): Promise<void> {
  let url = "https://trends.google.com/trends/?geo=US";
  for (let hop = 0; hop < 4; hop += 1) {
    const response = await trendsFetch(url, jar, "https://trends.google.com/");
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      await response.arrayBuffer();
      if (!location) return;
      url = new URL(location, url).toString();
      continue;
    }
    await response.arrayBuffer();
    return;
  }
}

async function trendsFetch(url: string, jar: Map<string, string>, referer: string): Promise<Response> {
  const headers: Record<string, string> = {
    "User-Agent": TRENDS_UA,
    Accept: "application/json,text/plain,*/*",
    Referer: referer,
  };
  const cookie = [...jar.entries()].map(([name, value]) => `${name}=${value}`).join("; ");
  if (cookie) headers.Cookie = cookie;
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(12000), redirect: "manual" });
  const baked = typeof response.headers.getSetCookie === "function" ? response.headers.getSetCookie() : [];
  for (const raw of baked) {
    const pair = raw.split(";")[0] ?? "";
    const eq = pair.indexOf("=");
    if (eq > 0) jar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
  }
  return response;
}

function stripTrends(text: string): string {
  return text.replace(/^\)\]\}',?\s*/, "");
}

async function googleTrends(iso2: string | null, placeLabel: string, needles: string[]): Promise<LiveBundle["googleTrends"]> {
  if (!iso2) {
    return {
      state: "empty",
      geoNote: placeLabel === "World"
        ? "Google's public daily RSS is national, not worldwide. Pick a country to load that country's trending searches. A world total is not published on this feed, so none is invented."
        : `${placeLabel} has no World Bank ISO-2 code on this coastline file, so a Google Trends geo was not guessed.`,
      items: [],
      aiMatches: 0,
    };
  }
  try {
    const response = await fetch(`https://trends.google.com/trending/rss?geo=${encodeURIComponent(iso2)}`, {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "MeridianAtlas/1.0 (living-work-capital research dashboard)" },
    });
    if (!response.ok) {
      return { state: "error", geoNote: `Google Trends RSS returned HTTP ${response.status} for geo ${iso2}.`, items: [], aiMatches: 0 };
    }
    const xml = await response.text();
    const items = parseTrends(xml, needles);
    if (items.length === 0) {
      return {
        state: "empty",
        geoNote: `Google Trends accepted geo ${iso2} (${placeLabel}) but the daily RSS had no items.`,
        items: [],
        aiMatches: 0,
      };
    }
    const aiMatches = items.filter((item) => item.matches).length;
    return {
      state: "ok",
      geoNote: `Daily search trends for geo ${iso2} (${placeLabel}), from Google's public RSS. Traffic is Google's bucket for today, not the 12-month interest index above.`,
      items: items.slice(0, 12),
      aiMatches,
    };
  } catch (error) {
    return { state: "error", geoNote: `Google Trends RSS failed: ${messageOf(error)}`, items: [], aiMatches: 0 };
  }
}

function parseTrends(xml: string, needles: string[]): TrendItem[] {
  return xml
    .split(/<item>/)
    .slice(1)
    .map((chunk) => {
      const title = textOf(chunk, "title");
      const traffic = chunk.match(/<ht:approx_traffic>([^<]*)<\/ht:approx_traffic>/)?.[1]?.trim() ?? "";
      const headline = textOf(chunk, "ht:news_item_title");
      return { title, traffic, headline, matches: matches(`${title} ${headline}`, needles) };
    })
    .filter((item) => item.title.length > 0);
}

async function wikiAttention(titles: { term: string; title: string }[]): Promise<AttentionSeries[]> {
  const end = new Date();
  end.setUTCDate(1);
  end.setUTCMonth(end.getUTCMonth() - 1);
  const start = new Date(end);
  start.setUTCMonth(start.getUTCMonth() - 17);
  const startStamp = stamp(start);
  const endStamp = stamp(end);
  const rows = await Promise.all(titles.map((item) => wikiOne(item.term, item.title, startStamp, endStamp)));
  return rows.filter((row): row is AttentionSeries => row != null);
}

async function wikiOne(term: string, title: string, startStamp: string, endStamp: string): Promise<AttentionSeries | null> {
  try {
    const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/${encodeURIComponent(title)}/monthly/${startStamp}/${endStamp}`;
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: {
        Accept: "application/json",
        "User-Agent": "MeridianAtlas/1.0 (living-work-capital research dashboard)",
        "Api-User-Agent": "MeridianAtlas/1.0 (living-work-capital research dashboard)",
      },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { items?: { timestamp: string; views: number }[] };
    const points = dropUnpublished(
      (payload.items ?? []).map((item) => ({
        month: `${item.timestamp.slice(0, 4)}-${item.timestamp.slice(4, 6)}`,
        views: item.views,
      })),
    );
    if (points.length < 2) return null;
    const last = points[points.length - 1];
    const prev = points[points.length - 2];
    const yearAgo = points.length > 12 ? points[points.length - 13] : null;
    return {
      term,
      points,
      last: last.views,
      mom: prev.views > 0 ? last.views / prev.views - 1 : null,
      yoy: yearAgo && yearAgo.views > 0 ? last.views / yearAgo.views - 1 : null,
    };
  } catch {
    return null;
  }
}

async function googleNews(query: string): Promise<LiveBundle["news"]> {
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(`${query} when:7d`)}&hl=en-US&gl=US&ceid=US:en`;
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "MeridianAtlas/1.0" },
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return xml
      .split(/<item>/)
      .slice(1, 6)
      .map((chunk) => {
        const raw = textOf(chunk, "title");
        const splitAt = raw.lastIndexOf(" - ");
        const title = splitAt > 0 ? raw.slice(0, splitAt) : raw;
        const source = splitAt > 0 ? raw.slice(splitAt + 3) : "Google News";
        const url = chunk.match(/<link>([^<]*)<\/link>/)?.[1]?.trim() ?? "";
        const when = chunk.match(/<pubDate>([^<]*)<\/pubDate>/)?.[1]?.trim() ?? "";
        return { title, source, url, when };
      })
      .filter((item) => item.title.length > 0);
  } catch {
    return [];
  }
}

async function hackerNews(query: string): Promise<LiveBundle["hackerNews"]> {
  try {
    const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=4`;
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return [];
    const payload = (await response.json()) as {
      hits?: { title?: string; url?: string; points?: number; num_comments?: number; created_at?: string; objectID?: string }[];
    };
    return (payload.hits ?? [])
      .filter((hit) => hit.title)
      .map((hit) => ({
        title: hit.title ?? "",
        url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID ?? ""}`,
        points: hit.points ?? 0,
        comments: hit.num_comments ?? 0,
        when: hit.created_at ?? "",
      }));
  } catch {
    return [];
  }
}

async function worldBank(iso2: string | null, placeLabel: string): Promise<{ rows: LiveBundle["official"]; note: string }> {
  if (!iso2) {
    return {
      rows: [],
      note: placeLabel === "World"
        ? "Pick a country for the live World Bank rows. A world aggregate is a different series and is not mixed in quietly."
        : "No ISO-2 code, so the World Bank country API was not called.",
    };
  }
  const rows = await Promise.all(
    INDICATORS.map(async (indicator) => {
      try {
        const url = `https://api.worldbank.org/v2/country/${encodeURIComponent(iso2)}/indicator/${indicator.code}?format=json&mrv=6&per_page=6`;
        const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!response.ok) return { label: indicator.label, date: "", value: null, unit: indicator.unit };
        const payload = (await response.json()) as [unknown, { date?: string; value: number | null }[] | null];
        const series = (payload[1] ?? []).filter((row) => row.value != null);
        const latest = series[0];
        return {
          label: indicator.label,
          date: latest?.date ?? "",
          value: latest?.value ?? null,
          unit: indicator.unit,
        };
      } catch {
        return { label: indicator.label, date: "", value: null, unit: indicator.unit };
      }
    }),
  );
  const any = rows.some((row) => row.value != null);
  return {
    rows: rows.filter((row) => row.value != null),
    note: any
      ? `World Bank API, country ${iso2}. Latest non-empty observation. These cells do not recolor the map and will not match the model.`
      : `World Bank returned no values for ${iso2}.`,
  };
}

async function vendorSemrush(database: string, access: { key: string; rejected: boolean }, phrases: string[]): Promise<VendorResult> {
  const key = access.key || process.env.SEMRUSH_API_KEY || "";
  if (!key) {
    return {
      vendor: "Semrush",
      state: "unkeyed",
      detail: access.rejected
        ? "That Semrush key was rejected before any request. Volume was not estimated."
        : "No Semrush key yet. Paste one below. It stays in this browser and is sent only with the next fetch. Volume is not estimated.",
      rows: [],
    };
  }
  const db = database === "gb" ? "uk" : database;
  const rows: VendorResult["rows"] = [];
  for (const phrase of uniquePhrases(phrases)) {
    try {
      const url = `https://api.semrush.com/?type=phrase_this&key=${encodeURIComponent(key)}&phrase=${encodeURIComponent(phrase)}&database=${encodeURIComponent(db)}&export_columns=Ph,Nq,Cp,Co`;
      const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
      const text = await response.text();
      if (!response.ok || /^\s*ERROR\b/i.test(text)) {
        return { vendor: "Semrush", state: "error", detail: "Semrush refused the request. The key is not shown. No volume was invented.", rows: [] };
      }
      for (const line of text.trim().split(/\n/).slice(1)) {
        const [ph, nq, cp, co] = line.split(";");
        if (ph) rows.push({ phrase: ph, volume: nq ?? "", extra: `CPC ${cp ?? "—"} · competition ${co ?? "—"}` });
      }
    } catch (error) {
      return { vendor: "Semrush", state: "error", detail: messageOf(error), rows: [] };
    }
  }
  return { vendor: "Semrush", state: "ok", detail: `Phrase volume for database ${db}. Monthly searches, not the 0–100 Trends index.`, rows };
}

async function vendorAhrefs(database: string, access: { key: string; rejected: boolean }, phrases: string[]): Promise<VendorResult> {
  const key = access.key || process.env.AHREFS_API_KEY || "";
  if (!key) {
    return {
      vendor: "Ahrefs",
      state: "unkeyed",
      detail: access.rejected
        ? "That Ahrefs key was rejected before any request. Volume was not estimated."
        : "No Ahrefs key yet. Paste one below. It stays in this browser and is sent only with the next fetch. Volume is not estimated.",
      rows: [],
    };
  }
  const country = database === "uk" ? "gb" : database;
  const rows: VendorResult["rows"] = [];
  for (const phrase of uniquePhrases(phrases)) {
    try {
      const url = `https://api.ahrefs.com/v3/keywords-explorer/overview?country=${encodeURIComponent(country)}&keywords=${encodeURIComponent(phrase)}&select=keyword,volume,difficulty`;
      const response = await fetch(url, {
        signal: AbortSignal.timeout(8000),
        headers: { Authorization: `Bearer ${key}`, Accept: "application/json" },
      });
      if (!response.ok) {
        return { vendor: "Ahrefs", state: "error", detail: `Ahrefs returned HTTP ${response.status}. No volume was invented.`, rows: [] };
      }
      const payload = (await response.json()) as { keywords?: { keyword?: string; volume?: number; difficulty?: number }[] };
      for (const row of payload.keywords ?? []) {
        rows.push({
          phrase: row.keyword ?? phrase,
          volume: row.volume != null ? String(row.volume) : "",
          extra: row.difficulty != null ? `difficulty ${row.difficulty}` : "",
        });
      }
    } catch (error) {
      return { vendor: "Ahrefs", state: "error", detail: messageOf(error), rows: [] };
    }
  }
  return { vendor: "Ahrefs", state: "ok", detail: `Keywords Explorer, country ${country}. Volume and difficulty.`, rows };
}

function uniquePhrases(phrases: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const phrase of phrases) {
    const key = phrase.toLowerCase();
    if (!phrase || seen.has(key)) continue;
    seen.add(key);
    out.push(phrase);
  }
  return out.slice(0, 2);
}

function dropUnpublished(points: { month: string; views: number }[]): { month: string; views: number }[] {
  if (points.length < 4) return points;
  const last = points[points.length - 1];
  const prior = points.slice(-4, -1).map((point) => point.views);
  const median = [...prior].sort((a, b) => a - b)[1];
  if (median > 0 && last.views < median * 0.5) return points.slice(0, -1);
  return points;
}

function dedupeTitles(rows: readonly (readonly [string, string])[]): { term: string; title: string }[] {
  const seen = new Set<string>();
  const out: { term: string; title: string }[] = [];
  for (const [term, title] of rows) {
    if (seen.has(title)) continue;
    seen.add(title);
    out.push({ term, title });
  }
  return out;
}

function dedupeNews(rows: LiveBundle["news"]): LiveBundle["news"] {
  const seen = new Set<string>();
  return rows.filter((row) => {
    if (seen.has(row.title)) return false;
    seen.add(row.title);
    return true;
  });
}

function dedupeHn(rows: LiveBundle["hackerNews"]): LiveBundle["hackerNews"] {
  const seen = new Set<string>();
  return rows.filter((row) => {
    if (seen.has(row.title)) return false;
    seen.add(row.title);
    return true;
  });
}

function textOf(chunk: string, tag: string): string {
  const match = chunk.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`));
  return decode(match?.[1]?.trim() ?? "");
}

function decode(value: string): string {
  return value
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function stamp(date: Date): string {
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${date.getUTCFullYear()}${month}0100`;
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : "Request failed";
}
