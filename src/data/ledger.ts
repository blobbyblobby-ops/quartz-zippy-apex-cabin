import { ALSO_CITED, JOURNAL_HOMES, forumLine, type Cited } from "./canon";
import { METRICS } from "./metrics";
import type { MetricDef } from "./types";

export type SourceStatus = "loaded" | "reference" | "rejected" | "live";

export type Source = {
  id: string;
  status: SourceStatus;
  name: string;
  publisher: string;
  series: string;
  published: string;
  url: string;
  why: string;
  notUsedBecause?: string;
};

export type SearchHit = {
  when: string;
  engine: string;
  query: string;
  opened: string;
  kept: string;
};

export type Tip = {
  title: string;
  definition: string;
  words: { word: string; meaning: string }[];
  calculation: string;
  notThis: string;
  why: string;
  sourceIds: string[];
  alsoCited?: Cited[];
  journals?: string;
  forum?: string;
};

/** Files this page actually executes. Nothing here is a live API pull. */
export const LOADED_FILES = [
  "Coastlines and place attributes: public/geo/countries.json (Natural Earth 1:50m admin-0 countries, population attribute included).",
  "Subregional medians and about 98 country anchors: src/data/anchors.ts.",
  "Sparse macro pins for 28 economies, not a full country-year panel: src/data/anchors.ts (PIN).",
  "Global year shocks and country stories (pandemic, inflation, war, tech, energy): src/data/anchors.ts (GLOBAL, story).",
  "Every derived series and the discourse simulator: src/data/model.ts.",
  "Metric names, blurbs, and the 0–100 intensity maps: src/data/metrics.ts.",
  "Named zones and north/center/south belts: src/data/regions.ts.",
] as const;

export const SOURCES: Source[] = [
  {
    id: "ne",
    status: "loaded",
    name: "Natural Earth 1:50m Admin 0 — Countries",
    publisher: "Natural Earth",
    series: "Cultural vectors, version 5.1.1",
    published: "Version 5.1.1 listed on the Natural Earth 50m cultural download page (reviewed 19 October 2026). Public domain.",
    url: "https://www.naturalearthdata.com/downloads/50m-cultural-vectors/",
    why: "One file gives coastlines, ISO codes, continent, subregion, centroid, and a population attribute that matches the polygons. Joining a newer population file onto these split map units (overseas France, and similar) without an audited crosswalk would mis-weight the choropleth. Chosen for geometric consistency. The population field is a late-2010s estimate — the United States attribute is 328,239,523 — and is used only as a weight, not as a 2026 headcount.",
  },
  {
    id: "model",
    status: "loaded",
    name: "Meridian formula module",
    publisher: "This page",
    series: "Constructed indexes, 2016–2026",
    published: "Ships with the page. Not a statistical release.",
    url: "",
    why: "Most readings are identities in code, not downloaded cells. The page can show the exact expression. A published composite that hid its weights would be worse for a definition-first atlas.",
  },
  {
    id: "anchors",
    status: "loaded",
    name: "Hand anchors",
    publisher: "This page",
    series: "22 subregional medians and about 98 country overrides, aimed at a 2024-shaped level",
    published: "Compiled into the app. Not a vintage of any one table.",
    url: "",
    why: "Countries that sit far from their region (Singapore, South Africa, Argentina, Ukraine) cannot inherit a median. Overrides exist only where a public profile is widely known to differ. Everyone else stays on the subregional median on purpose, so the long tail is not fake precision.",
  },
  {
    id: "pins",
    status: "loaded",
    name: "Macro pins",
    publisher: "This page, shaped to published national-accounts orders of magnitude",
    series: "Real GDP growth, CPI inflation, and sometimes unemployment for 28 economies and selected years",
    published: "Inside the app. 2019–2025 pins follow the public path of those crises. 2026 pins are a nowcast written earlier than, and not row-imported from, the IMF October 2026 World Economic Outlook.",
    url: "",
    why: "The pandemic drop and the 2022 price shock are large enough that a smooth anchor would be misleading. Pins override the formula only for those three macro fields, and only where a pin exists. They are not a claim that every decimal matches a later IMF vintage.",
  },
  {
    id: "imf",
    status: "reference",
    name: "World Economic Outlook, October 2026",
    publisher: "International Monetary Fund",
    series: "Real GDP growth; inflation, average consumer prices; unemployment where the WEO reports it",
    published: "eLibrary record dated 12 October 2026. Public release page dated 13 October 2026. Title: Resilience Under Strain, Urgent Choices. ISBN 9798229055079. DOI 10.5089/9798229055079.081.",
    url: "https://www.imf.org/en/publications/weo/issues/2026/10/13/world-economic-outlook-october-2026",
    why: "Right family for real growth, CPI inflation, and a comparable unemployment concept across countries. The October 2026 edition puts world real GDP growth at 3.1% in 2026 and world inflation at 4.7%. Chosen over a single national statistical office because one source covers the map. Not row-imported: this page does not call the IMF API, and its 2026 country pins can differ from that vintage.",
  },
  {
    id: "wdi",
    status: "reference",
    name: "World Development Indicators",
    publisher: "World Bank",
    series: "GDP per capita, PPP (the NY.GDP.PCAP.PP family); urban population share",
    published: "Continuously updated database. No single snapshot was downloaded into this build. Reviewed as the correct family on 19 October 2026.",
    url: "https://databank.worldbank.org/source/world-development-indicators",
    why: "PPP income is the right level concept for 'what a typical income buys' across countries. Current-dollar GDP was rejected as the income ladder because exchange rates move the ranking without moving local living standards. Not row-imported. The page compounds a 2024-shaped PPP anchor with its own real-growth path.",
  },
  {
    id: "wpp",
    status: "reference",
    name: "World Population Prospects 2024",
    publisher: "UN DESA, Population Division",
    series: "Population, median age, population growth. Summary of Results, UN DESA/POP/2024/TR/NO. 9",
    published: "July 2024 (posted 11–12 July 2024). Twenty-eighth edition. Estimates draw on 1,910 censuses (1950–2023) and 3,189 nationally representative surveys. Medium variant is the usual projection.",
    url: "https://desapublications.un.org/publications/world-population-prospects-2024-summary-of-results",
    why: "The official global demographic set. Chosen over national statistical offices for coverage, and over Natural Earth population for recency. Not joined yet: the map weight still uses the Natural Earth attribute so weights and polygons stay one file. A later update can swap weights after an ISO crosswalk.",
  },
  {
    id: "ilo",
    status: "reference",
    name: "ILOSTAT modelled estimates",
    publisher: "International Labour Organization",
    series: "Unemployment rate, modelled",
    published: "ILOSTAT is updated through the year. No ILO extract was loaded. Reviewed as the right labor-slack family on 19 October 2026.",
    url: "https://ilostat.ilo.org/",
    why: "National unemployment definitions differ (who counts as looking for work). ILO modelled estimates are the comparable series. Used as the concept the unemployment field is aiming at. Pins and anchors are not an ILO download. South Africa's very high reading is treated as structural, which is why its anchor barely moves with the global shock.",
  },
  {
    id: "wgi",
    status: "reference",
    name: "Worldwide Governance Indicators, 2026 update",
    publisher: "World Bank",
    series: "Six perception composites, 1996–2025, from 35 sources and more than 400 underlying indicators",
    published: "2026 update. Cite as: Worldwide Governance Indicators, 2026 Update, World Bank (www.govindicators.org). Method note: World Bank (2026), “The Worldwide Governance Indicators: Methodology for Measuring Governance Using Perception Data.” Prior method: Kaufmann and Kraay (2024).",
    url: "https://www.worldbank.org/en/publication/worldwide-governance-indicators",
    why: "Best single public composite for 'are the rules predictable.' Governance, trust, ease of business, and corruption pressure on this page are formulas around an anchor, not a rescaled WGI estimate. WGI was not imported. The Bank's own advisory says the indicators are a lens, not a credit rating. This page treats them the same way.",
  },
  {
    id: "whr",
    status: "reference",
    name: "World Happiness Report 2026",
    publisher: "Wellbeing Research Centre, University of Oxford, with Gallup, the UN Sustainable Development Solutions Network, and the WHR editorial board",
    series: "Cantril ladder life evaluation, Gallup World Poll, national samples in roughly 140 countries",
    published: "19 March 2026 (press release the same day; author event 20 March 2026). 14th edition. Finland's reported ladder average in that release is 7.764 out of 10.",
    url: "https://www.worldhappiness.report/",
    why: "The life-satisfaction number people mean when they say 'happiness ranking.' Chosen over social-media mood because it is a nationally representative survey question, asked the same way. Not imported. Life satisfaction here is a constructed index from living, safety, cost, and conflict. It will not match the ladder.",
  },
  {
    id: "oecd",
    status: "reference",
    name: "OECD Better Life Index and national accounts companions",
    publisher: "OECD",
    series: "Work-life balance, housing, safety, education, among member and partner countries",
    published: "OECD.Stat / Better Life is updated by dataset. Not downloaded.",
    url: "https://www.oecdbetterlifeindex.org/",
    why: "Useful definitions for work-life and housing among rich countries. Rejected as the world map's spine because it does not cover most of the territories on this coastlines file.",
  },
  {
    id: "itu",
    status: "reference",
    name: "ITU facts and figures / UN E-Government Survey family",
    publisher: "International Telecommunication Union; UN DESA for e-government",
    series: "Individuals using the internet, broadband, e-government development",
    published: "ITU publishes an annual facts-and-figures note. Not downloaded.",
    url: "https://www.itu.int/en/ITU-D/Statistics/Pages/facts/default.aspx",
    why: "Right concept for digital infrastructure. The page instead moves an anchor up a little each year, with a step in 2020. That is a trend assumption, not an ITU country score.",
  },
  {
    id: "acled",
    status: "rejected",
    name: "ACLED conflict events",
    publisher: "Armed Conflict Location & Event Data Project",
    series: "Event-level political violence and demonstrations",
    published: "Updated weekly. Not connected.",
    url: "https://acleddata.com/",
    why: "Best public event feed for conflict exposure.",
    notUsedBecause: "A weekly event feed needs a maintained pipeline, a geographic join, and a decision about protests versus battles. This page has none of that. Conflict is an anchored index plus a few story shocks (Ukraine from 2022, Israel and Palestine from 2023, Sahel from 2022, Ethiopia 2021–2023). It is not an incident map.",
  },
  {
    id: "ofac",
    status: "rejected",
    name: "OFAC sanctions lists and EU restrictive-measures map",
    publisher: "US Treasury OFAC; European Commission",
    series: "SDN and consolidated sanctions lists",
    published: "Updated as designations change. Not connected.",
    url: "https://ofac.treasury.gov/sanctions-list-service",
    why: "Primary legal lists for whether a jurisdiction is financially isolated.",
    notUsedBecause: "Sanctions friction here is a short fixed list (Russia, Iran, DPRK, Syria, Venezuela, Belarus, Myanmar, Cuba, Sudan, Afghanistan) plus a formula for everyone else. Russia is floored at 84 from 2022 and Belarus at 70 from 2022. It is not a compliance screen and it does not read the live list.",
  },
  {
    id: "cpi",
    status: "rejected",
    name: "Corruption Perceptions Index",
    publisher: "Transparency International",
    series: "Annual expert-perception index, usually released early the following year",
    published: "Annual. The running CPI vintage was not imported.",
    url: "https://www.transparency.org/en/cpi",
    why: "The public series people cite for corruption.",
    notUsedBecause: "Importing it and also building corruption as 102 − 0.86×governance + 0.1×conflict would double-count one perception. The formula is disclosed instead. It is not the CPI score.",
  },
  {
    id: "numbeo",
    status: "rejected",
    name: "Numbeo cost-of-living crowdsource",
    publisher: "Numbeo",
    series: "User-submitted prices and crime perceptions",
    published: "Continuous. Not used.",
    url: "https://www.numbeo.com/cost-of-living/",
    why: "Only global price scrapbook with city coverage.",
    notUsedBecause: "Contributors are whoever opens the site. Cities with many expats are over-sampled. Rejected as a primary series. Housing and cost on this page move off an anchor when inflation and the post-2021 housing nudge move. That is still a model, but it is not a scrape of restaurant menus.",
  },
  {
    id: "social",
    status: "rejected",
    name: "Platform feeds (X, Reddit, TikTok, Facebook, YouTube, news wires)",
    publisher: "Those platforms and wire services",
    series: "Posts, video, and headlines",
    published: "Continuous. Zero posts were collected.",
    url: "",
    why: "They are what 'social mood' and 'news momentum' sound like.",
    notUsedBecause: "No post was read in order to color the map. The source-blend sliders reweight a formula: social mood mixes the metric's own level with the sentiment index; news momentum exaggerates the year-to-year change. Discourse themes are the same formulas turned into word shares. A separate live panel does call Google Trends' daily RSS, Google News RSS, Wikipedia pageviews, the World Bank API, and Hacker News. Those responses are labeled and are not blended into the choropleth. Reddit and Bluesky returned 403 from this host. GDELT rate-limited the request.",
  },
  {
    id: "dark",
    status: "rejected",
    name: "Dark-web markets and stolen-data forums",
    publisher: "Not a publisher",
    series: "None",
    published: "Not accessed.",
    url: "",
    why: "People ask for illicit-economy pressure and mean hidden services.",
    notUsedBecause: "Not connected, not shown, and not a source. Illicit-economy pressure is a public-style index from governance, income, and conflict. It is not a market listing. The live panel does not add a hidden-service crawl.",
  },
  {
    id: "gtrends",
    status: "live",
    name: "Google Trends interest and daily RSS",
    publisher: "Google",
    series: "12-month interest 0–100 and related queries, plus the daily trending RSS by country geo",
    published: "Fetched when the briefing is open. Interest is worldwide when no country is selected. The daily RSS is national only. Not stored as a vintage.",
    url: "https://trends.google.com/trending/rss?geo=US",
    why: "The public, first-party feed for what a country is searching today, including how often an AI or metric term is among the trending queries.",
    notUsedBecause: "It does not recolor the map. Interest over time is the 12-month 0–100 index. The daily RSS is a separate today-list. A refusal is left blank.",
  },
  {
    id: "semrush",
    status: "rejected",
    name: "Semrush phrase volume",
    publisher: "Semrush",
    series: "phrase_this: volume, CPC, competition",
    published: "Commercial API. Called only when a key is pasted in the briefing or SEMRUSH_API_KEY is set on the server. The key is not put in the share link.",
    url: "https://www.semrush.com/",
    why: "The keyword-volume source practitioners cite for search demand.",
    notUsedBecause: "Called only when a key is pasted in the briefing or set on the server. Volume is not estimated from Wikipedia or Google Trends.",
  },
  {
    id: "ahrefs",
    status: "rejected",
    name: "Ahrefs Keywords Explorer",
    publisher: "Ahrefs",
    series: "Search volume and keyword difficulty",
    published: "Commercial API. Called only when a key is pasted in the briefing or AHREFS_API_KEY is set on the server. The key is not put in the share link.",
    url: "https://ahrefs.com/",
    why: "The other keyword-volume source practitioners cite, alongside Semrush.",
    notUsedBecause: "Called only when a key is pasted in the briefing or set on the server. Keyword difficulty is not guessed.",
  },
  {
    id: "wiki",
    status: "live",
    name: "Wikimedia pageviews",
    publisher: "Wikimedia Foundation",
    series: "English Wikipedia, user pageviews, monthly",
    published: "Fetched for artificial intelligence, large language model, ChatGPT, and the open metric's article.",
    url: "https://wikimedia.org/api/rest_v1/",
    why: "A public frequency series with a real trend. It moves with search interest. It is not search volume.",
  },
  {
    id: "gnews",
    status: "live",
    name: "Google News RSS",
    publisher: "Google",
    series: "Headlines matching a query over seven days",
    published: "Fetched with the open metric and with 'artificial intelligence'.",
    url: "https://news.google.com/",
    why: "A live headline list. A count of headlines is not a tone model and is not a share of discourse.",
  },
  {
    id: "hn",
    status: "live",
    name: "Hacker News search",
    publisher: "Y Combinator, via Algolia",
    series: "Stories matching the query, with points and comment counts",
    published: "Fetched live. A technical public.",
    url: "https://hn.algolia.com/api",
    why: "The social feed that answers from this host. Reddit and Bluesky returned 403, so they are not presented as empty success.",
  },
  {
    id: "wbapi",
    status: "live",
    name: "World Bank indicators API",
    publisher: "World Bank",
    series: "NY.GDP.MKTP.KD.ZG, FP.CPI.TOTL.ZG, SL.UEM.TOTL.ZS, NY.GDP.PCAP.PP.CD",
    published: "Latest non-empty observation for the open country.",
    url: "https://api.worldbank.org/v2/country",
    why: "The live official cells for growth, inflation, unemployment, and PPP income. Shown beside the model so the two cannot be confused.",
    notUsedBecause: "Not copied into the anchors. The map does not switch to these cells.",
  },
];

export const SEARCHES: SearchHit[] = [
  {
    when: "19 October 2026",
    engine: "Web index, then the publisher's own site",
    query: "IMF World Economic Outlook October 2026 release date GDP inflation",
    opened: "IMF eLibrary book 9798229055079; IMF publications page for the 13 October 2026 issue; IMF DataMapper WEO October 2026 profile.",
    kept: "Citation, ISBN, DOI, and the world aggregates (growth 3.1%, inflation 4.7%). Country rows were not copied in.",
  },
  {
    when: "19 October 2026",
    engine: "Web index, then Gallup and worldhappiness.report",
    query: "World Happiness Report 2026 publication date Gallup World Poll",
    opened: "Gallup analytics page; WHR launch-events note (4 March 2026) announcing the 19 March 2026 release; the 19 March 2026 press release.",
    kept: "Publisher, date, survey name, and the fact that life satisfaction on this page is not that ladder.",
  },
  {
    when: "19 October 2026",
    engine: "Web index, then naturalearthdata.com",
    query: "Natural Earth 50m admin 0 countries latest version",
    opened: "1:50m Cultural Vectors download page.",
    kept: "Version 5.1.1, public domain, de-facto boundaries. Confirms the coastline file's family.",
  },
  {
    when: "19 October 2026",
    engine: "Web index, then UN DESA publications and a ReliefWeb mirror",
    query: "UN World Population Prospects 2024 revision",
    opened: "UN DESA publications page for the Summary of Results; ReliefWeb repost dated 12 July 2024.",
    kept: "July 2024 date, document number, census and survey counts. Population weights on the map were still not switched, for the join reason under Natural Earth.",
  },
  {
    when: "19 October 2026",
    engine: "Web index, then worldbank.org",
    query: "World Bank Worldwide Governance Indicators update",
    opened: "WGI home, documentation, and updates pages.",
    kept: "2026 update exists, covers 1996–2025, 35 sources, 400+ indicators, and a usage advisory. Scores were not downloaded.",
  },
  {
    when: "19 October 2026",
    engine: "Direct request from the page's host",
    query: "Google Trends RSS, Google News RSS, Wikipedia pageviews, World Bank indicator API, Hacker News Algolia, Google Trends explore, Reddit, Bluesky, GDELT",
    opened: "trends.google.com/trending/rss; news.google.com/rss; wikimedia pageviews; api.worldbank.org; hn.algolia.com; trends explore; reddit.com; public.api.bsky.app; api.gdeltproject.org.",
    kept: "RSS trends, news headlines, pageview counts, World Bank rows, and Hacker News stories are wired as live and labeled. Interest-over-time (explore, then the multiline widget) returned 200 after a warm GET to trends.google.com. Related queries use the same cookie jar and stay empty if Google answers 429. Reddit and Bluesky returned 403. GDELT returned a rate-limit message. Semrush and Ahrefs are called only after a key is pasted; none was present, so no volume was returned.",
  },
];

export const NOT_SEARCHED = [
  "No Scopus, Web of Science, PubMed, JSTOR, or Google Scholar systematic review. The field guide is a shelf of names those literatures already use. It is not a citation count.",
  "No X keyword search and no TikTok. Reddit and Bluesky were requested and returned 403. GDELT was requested and rate-limited. None of those failures was filled with a made-up count.",
  "No Semrush or Ahrefs volume without a key. A key can be pasted in the briefing and is not written into the share link. Volume and keyword difficulty stay blank until that call succeeds.",
  "No national statistical office bulk downloads (BEA, ONS, Destatis, and the rest) beyond the orders of magnitude already baked into pins. The live World Bank rows are separate and are not written back into the pins.",
  "No central-bank speech scrape and no earnings transcripts.",
  "No dark-web request.",
] as const;

const WORDS = {
  index: "A unitless score squeezed onto 0–100 so countries can share a color scale. It is not a currency, a percent, or an official statistic.",
  anchor: "A starting level, around 2024, either a subregional median or a country override. The year path moves off this number. It is not a surveyed data point.",
  nudge: "A fixed add-on for a year or a story (pandemic, a war, a housing boom). Same idea as a dummy variable, written in by hand.",
  jitter: "A tiny deterministic wobble from a hash of country, year, and field. It keeps untouched series from looking falsely smooth. It is not measurement error from a survey, and it is not news.",
  clamp: "A hard floor and ceiling so a formula cannot run off the scale.",
  nowcast: "A reading for the current year before the official annual number exists. Here, 2026 is the model's own continuation, not the IMF October 2026 country forecast.",
  ppp: "Purchasing-power parity: income converted so a common basket costs the same everywhere. It is not the market exchange rate.",
  level: "Where the thing stands, not how fast it changed.",
  blend: "A weighted average of three constructed views of the same metric: the official-style level, a social-mood remix, and a news-momentum remix.",
  choropleth: "A map colored by a number. Territory area is not the data. Population only enters when a region is averaged.",
  thin: "A place with under 8,000 people, Antarctica, or an open-ocean unit. Dropped from rankings and averages because the public series are mostly empty.",
  pin: "A typed-in macro number that replaces the formula for that country-year. Only growth, inflation, and unemployment can be pinned.",
};

const FORMULAS: Record<string, { calc: string; sources: string[]; notThis: string }> = {
  lwi: {
    calc: "LWI = 0.36×living + 0.30×working + 0.34×investing, then clamped to 0–100. The weights are a choice: living slightly ahead of investing, working just behind. They are not estimated from a regression.",
    sources: ["model", "anchors"],
    notThis: "Not the UN Human Development Index, not the Legatum Prosperity Index, and not a World Bank score.",
  },
  living: {
    calc: "Start at the living anchor. Add the global year nudge and any country story nudge. Add jitter of ±0.7. Clamp to 3–98. Safety is then pulled toward this result; living itself is not rebuilt from safety, health, and education each year (those are sibling fields).",
    sources: ["anchors", "model"],
    notThis: "Not a household survey of life quality.",
  },
  working: {
    calc: "Working anchor + global nudge + story nudge + jitter ±0.7. Clamp 3–98.",
    sources: ["anchors", "model"],
    notThis: "Not the employment-to-population ratio and not average wages.",
  },
  investing: {
    calc: "Investing anchor + global nudge + story nudge + jitter ±0.8. Clamp 2–98. Story shocks cut this hard for Ukraine (from 2022), Russia (from 2022), China property (from 2022), and the Sahel (from 2022).",
    sources: ["anchors", "model"],
    notThis: "Not a stock-market return and not FDI in dollars.",
  },
  sentiment: {
    calc: "0.34×living + 0.22×working + 0.16×investing + 0.16×(100−conflict) + 0.024×(100−min(inflation, 45)) + global and story sentiment nudges + jitter ±0.8. Clamp 2–98. The inflation term is small on purpose: prices already move cost and wages elsewhere.",
    sources: ["model"],
    notThis: "Not a Gallup poll and not a count of posts.",
  },
  momentum: {
    calc: "50 + 2.4×(this year's LWI − last year's LWI). Clamp 0–100. Fifty means 'no change.' The first year (2016) is 50 because there is no prior year inside the page.",
    sources: ["model"],
    notThis: "Not a purchasing-managers index.",
  },
  gdpGrowth: {
    calc: "Anchor growth + global growth nudge + story nudge + jitter ±0.25 percentage points. Clamp −40 to 16. If a macro pin exists for that country-year, the pin replaces this result entirely.",
    sources: ["pins", "anchors", "imf"],
    notThis: "Not a live IMF print. World growth in the October 2026 WEO is 3.1%; this page does not force every country to add up to that.",
  },
  inflation: {
    calc: "Anchor inflation + global nudge + story nudge + jitter ±0.18. Clamp −2 to 220. A pin replaces it. Tourist economies get an extra growth and tourism hit in 2020–21, not an extra inflation formula. Energy exporters get −1.2 on inflation in 2022–23 as a story nudge, before any pin.",
    sources: ["pins", "imf", "anchors"],
    notThis: "Not monthly CPI and not a consumer basket you can shop.",
  },
  unemployment: {
    calc: "Anchor + (global nudge + story nudge) × slack + jitter ±0.18. Slack is 0.3 if the anchor is already above 18% (so South Africa does not absorb the global cycle twice) and 1 otherwise. Clamp 0.3–48. A pin replaces it.",
    sources: ["pins", "ilo", "anchors"],
    notThis: "Not the ILO modelled estimate line, and not a claimant count.",
  },
  ppp: {
    calc: "Take the 2024 PPP anchor. Walk forward by multiplying by (1 + real GDP growth/100) for each later year. Walk backward by dividing by (1 + that year's growth/100). If a backward step would be −90% or worse, use −50% so a crisis does not explode the history. Clamp between $400 and $250,000.",
    sources: ["anchors", "wdi", "model"],
    notThis: "Not the World Bank's published PPP series. Nominal dollar GDP was rejected as the ladder.",
  },
  debt: {
    calc: "If the country is in the hand table (Japan 88, Greece 80, Italy 74, United States 70, and a short list of others), use that. Otherwise 40 + 0.22×(100−governance). Add 4 points in 2020, 2021, and 2022. Clamp 8–96. Higher means heavier, so the color treats it as a burden.",
    sources: ["anchors", "model", "imf"],
    notThis: "Not the IMF general-government debt-to-GDP ratio. Japan's high reading is a level choice, not this year's fiscal outturn.",
  },
  currency: {
    calc: "96 − 1.05×min(inflation, 60) − 0.10×conflict + 0.08×governance. Clamp 2–98. A price spike is most of the score. Higher means more stable.",
    sources: ["model"],
    notThis: "Not the exchange rate versus the dollar and not reserves in months of imports.",
  },
  external: {
    calc: "52 + 8 if tourism is above 75, else 0; plus 0.20×(openness−50); minus 0.30×max(0, inflation−8). Clamp 6–94.",
    sources: ["model"],
    notThis: "Not the current-account balance in percent of GDP.",
  },
  cost: {
    calc: "Cost anchor + 0.28×global housing nudge + 0.22×max(0, inflation−4). Clamp 8–98. Higher means more expensive relative to the way the index is built, which is why the map treats 'higher' as worse.",
    sources: ["anchors", "model"],
    notThis: "Not a Numbeo index and not a local CPI level.",
  },
  housing: {
    calc: "0.70×cost anchor + global housing nudge + story housing nudge + 3 if the year is 2022 or later. Clamp 6–99. Higher means less affordable.",
    sources: ["anchors", "model"],
    notThis: "Not a price-to-income ratio from the OECD or the Dallas Fed housing series.",
  },
  purchasing: {
    calc: "0.62×income level + 0.38×(100−cost). Clamp 0–100. Income is itself a log ladder of PPP.",
    sources: ["model", "wdi"],
    notThis: "Not household consumption per head from national accounts.",
  },
  income: {
    calc: "Log ladder of PPP. Score = 100 × (ln(PPP) − ln(1100)) / (ln(120000) − ln(1100)), clamped 0–100. A log is used so a jump from $2,000 to $4,000 matters about as much as a jump from $40,000 to $80,000.",
    sources: ["model", "wdi"],
    notThis: "Not median household income and not wages.",
  },
  confidence: {
    calc: "0.50×sentiment + 0.25×working + 0.25×currency stability. Clamp 2–98.",
    sources: ["model"],
    notThis: "Not the University of Michigan survey or the European Commission consumer confidence index.",
  },
  ease: {
    calc: "0.34×governance + 0.28×openness + 0.22×SME credit + 0.16×(100−tax burden). Clamp 2–98.",
    sources: ["model", "wgi"],
    notThis: "Not the discontinued World Bank Doing Business score, and not its successor B-READY, which was not imported.",
  },
  startups: {
    calc: "0.62×venture + 0.20×digital + 0.12×working. Clamp 2–98.",
    sources: ["model"],
    notThis: "Not new-firm registrations from a business registry.",
  },
  fdi: {
    calc: "0.42×investing + 0.32×openness + 0.22×governance − 0.18×conflict. Clamp 2–98.",
    sources: ["model"],
    notThis: "Not UNCTAD FDI flows in dollars.",
  },
  tax: {
    calc: "Tax anchor + jitter ±0.3. Clamp 4–92. Higher means a heavier take, so the color treats higher as worse. The anchor is a feel-of-burden score, not the statutory corporate rate.",
    sources: ["anchors"],
    notThis: "Not OECD tax-to-GDP and not a headline corporate tax rate.",
  },
  credit: {
    calc: "0.48×governance + 0.24×openness + 0.16×(100−conflict). Clamp 4–96. This is SME credit access, not sovereign bond yields.",
    sources: ["model", "wgi"],
    notThis: "Not the IMF financial-access survey and not domestic credit to the private sector as a percent of GDP.",
  },
  bizMomentum: {
    calc: "50 + 3×real GDP growth + 0.35×(investing−55). Clamp 2–98. Fifty is neutral.",
    sources: ["model"],
    notThis: "Not a PMI.",
  },
  popGrowth: {
    calc: "Population-growth anchor, minus 0.12 percentage points in 2020 only. Clamp −1.6 to 4.2.",
    sources: ["anchors", "wpp"],
    notThis: "Not the UN World Population Prospects growth rate. The 2020 dip is a single assumption.",
  },
  medianAge: {
    calc: "Age anchor + (year−2024)×pace. Pace is 0.05 years per calendar year if the anchor age is under 24, otherwise 0.13. Clamp 15–56. Young countries age more slowly in this formula because their age structure is still wide at the bottom.",
    sources: ["anchors", "wpp"],
    notThis: "Not the UN median age by year.",
  },
  urban: {
    calc: "Urban anchor + 0.12×(year−2016). Clamp 0–100. A slow, even rise. No country is allowed to urbanize in a jump.",
    sources: ["anchors", "wdi"],
    notThis: "Not the World Bank urban-population percent series.",
  },
  migration: {
    calc: "0.34×living + 0.24×working + 0.20×openness + 0.16×safety − 0.22×conflict. Clamp 0–100. Higher means more pull.",
    sources: ["model"],
    notThis: "Not net migration from UN WPP and not asylum applications.",
  },
  workingAge: {
    calc: "A curve of median age, not a census tabulation. Under 22: 54 + 0.7×(age−16). From 22 to 36: 60 + 0.4×(age−22). After 36: 66 − 0.55×(age−36), clamped 50–70. The hump in the middle is the demographic dividend shape, drawn by hand.",
    sources: ["model", "wpp"],
    notThis: "Not the UN share of people aged 15–64.",
  },
  lifeSat: {
    calc: "0.50×living + 0.22×safety + 0.12×(100−cost) + 0.16×(100−conflict). Clamp 2–98.",
    sources: ["model", "whr"],
    notThis: "Not the Gallup Cantril ladder and not the World Happiness Report rank. Finland's 7.764 in the 2026 report is a survey mean on a 0–10 scale; this field is a 0–100 construct.",
  },
  trust: {
    calc: "0.72×governance + 0.18×safety − 0.16×conflict. Clamp 2–98.",
    sources: ["model", "wgi"],
    notThis: "Not the World Values Survey question on trusting parliament, and not a WGI estimate.",
  },
  optimism: {
    calc: "0.62×sentiment + 0.24×investing + 0.14×working. Clamp 2–98.",
    sources: ["model"],
    notThis: "Not a consumer-expectations survey.",
  },
  workLife: {
    calc: "0.40×living + 0.28×labor protections + 0.18×(100−housing pressure) + 0.08×(100−job-market heat). Clamp 4–96. Higher means more room outside work.",
    sources: ["model", "oecd"],
    notThis: "Not OECD hours worked.",
  },
  riskAppetite: {
    calc: "0.40×investing + 0.30×venture + 0.10×(100−governance) + 0.40×(40−min(median age, 50)). Clamp 2–96. Younger and less rule-bound places score as more willing to take a chance. That is a cultural assumption, not a trading position.",
    sources: ["model"],
    notThis: "Not equity-risk premium and not a venture-capital survey.",
  },
  cohesion: {
    calc: "0.40×safety + 0.35×trust + 0.25×(100−conflict). Clamp 2–98.",
    sources: ["model"],
    notThis: "Not a social-trust survey item.",
  },
  safety: {
    calc: "Safety anchor + 0.22×(living − living anchor) − 0.18×max(0, conflict − conflict anchor). Clamp 3–98.",
    sources: ["anchors", "model"],
    notThis: "Not homicide rates from UNODC and not Numbeo crime.",
  },
  health: {
    calc: "Health anchor, minus 6 in 2020 and minus 2 in 2021, otherwise unchanged. Clamp 4–98. The pandemic is a two-year notch, not a disease model.",
    sources: ["anchors", "model"],
    notThis: "Not healthy life expectancy, not hospital beds, and not a COVID death rate.",
  },
  education: {
    calc: "Education anchor + jitter ±0.25. Clamp 4–98. Almost flat through time on purpose.",
    sources: ["anchors"],
    notThis: "Not PISA scores and not mean years of schooling from the UNDP.",
  },
  environment: {
    calc: "68 − 0.22×(100−governance) − 0.10×urban − 0.08×conflict, plus 8 if the country is in Europe. China and India then lose 12. Clamp 6–96. A zone of type industrial or resource later loses 7 more; a tourist zone gains 3.",
    sources: ["model"],
    notThis: "Not PM2.5 from the WHO or IQAir, and not the Yale Environmental Performance Index.",
  },
  transit: {
    calc: "0.28×urban + 0.32×governance, plus 16 for Japan, Korea, Singapore, Hong Kong, Switzerland, Netherlands, France, Germany, Spain, Taiwan; plus 8 for other European countries; minus 12 for the United States. Clamp 6–96.",
    sources: ["model"],
    notThis: "Not kilometers of rail and not a transit-agency ridership feed.",
  },
  digital: {
    calc: "Digital anchor + 2.5 if the year is 2020 or later + 0.30×(year−2016) + jitter ±0.4. Clamp 4–99.",
    sources: ["anchors", "itu"],
    notThis: "Not ITU percent-of-people-online.",
  },
  culture: {
    calc: "0.48×tourism + 0.28×living + 0.12×urban. Clamp 6–98.",
    sources: ["model"],
    notThis: "Not a count of museums, restaurants, or UNESCO sites.",
  },
  climate: {
    calc: "A hand table for countries where latitude would lie (Britain, the Gulf, the Nordics, the Mediterranean). Otherwise 94 − 1.65×| |latitude| − 26 |, clamped 16–92. The formula prefers latitudes near 26 degrees. That is a comfort sketch, not heating-degree days.",
    sources: ["model"],
    notThis: "Not Copernicus climate reanalysis and not a wet-bulb temperature.",
  },
  wage: {
    calc: "0.62×inflation + 0.28×max(real growth, −4). Clamp −4 to 80. Nominal wage pace. It can be high just because prices are high.",
    sources: ["model"],
    notThis: "Not an employer survey and not real wages. Real wages would subtract inflation; this field does not.",
  },
  jobHeat: {
    calc: "78 − 1.55×unemployment + 1.8×real growth. Clamp 2–98. Higher means a tighter hiring market.",
    sources: ["model", "ilo"],
    notThis: "Not vacancies per unemployed person.",
  },
  remote: {
    calc: "0.46×digital + 0.34×global-language access + 0.16×(100−conflict) + 5 if the year is 2020 or later. Clamp 0–100.",
    sources: ["model"],
    notThis: "Not a visa-policy database and not a count of coworking desks.",
  },
  talent: {
    calc: "0.40×education + 0.28×working + 0.20×digital + 0.12×urban. Clamp 0–100.",
    sources: ["model"],
    notThis: "Not tertiary attainment from UNESCO and not a LinkedIn skills graph.",
  },
  labor: {
    calc: "38 + 18 if the country is in Europe + 0.35×(governance−60). Clamp 12–92. The Europe step is a blunt legal-tradition assumption, not a reading of each labor code.",
    sources: ["model"],
    notThis: "Not ILO employment-protection legislation scores.",
  },
  language: {
    calc: "The language anchor, unchanged across years. Clamp 0–100. It is 'can an outsider operate in a widely used business language,' not the number of languages spoken at home.",
    sources: ["anchors"],
    notThis: "Not Ethnologue and not EF English Proficiency Index ranks, which were not imported.",
  },
  market: {
    calc: "48 + 3.1×real growth + 0.35×(investing−50) + 0.15×(sentiment−50). Clamp 2–98. Risk-asset mood. Not a price.",
    sources: ["model"],
    notThis: "Not an equity index return. Do not read it as a forecast.",
  },
  realestate: {
    calc: "0.34×(100−housing pressure) + 0.26×governance + 0.20×tourism + 0.20×investing. Clamp 2–98. High means a balance of demand and rules, not 'prices will rise.'",
    sources: ["model"],
    notThis: "Not a house-price index and not a cap rate.",
  },
  venture: {
    calc: "0.50×investing + 0.18×openness + 0.12×digital + global venture nudge + story venture nudge. Clamp 0–100. Tech-hub story adds +4 in 2023 and +6 from 2024 for a fixed set (United States, India, Singapore, Korea, Taiwan, Israel, and a short rich-country list).",
    sources: ["model"],
    notThis: "Not PitchBook, Crunchbase, or CB Insights dollars.",
  },
  policy: {
    calc: "0.62×governance + 0.24×(100−conflict) + 0.14×openness. Clamp 2–98.",
    sources: ["model", "wgi"],
    notThis: "Not a political-risk vendor score (not PRS, not Eurasia Group).",
  },
  openness: {
    calc: "Openness anchor + story nudge + jitter ±0.4. Clamp 2–99. Russia loses 22 from 2022 via the story, before the sanctions floor is applied separately.",
    sources: ["anchors", "model"],
    notThis: "Not the Fraser Institute or Heritage economic-freedom index, and not the trade-openness ratio (exports+imports)/GDP.",
  },
  tourism: {
    calc: "Tourism anchor + global nudge + story nudge + jitter ±0.8. Clamp 0–100. Places in the hand-kept tourist set take an extra −16 in 2020 and −8 in 2021.",
    sources: ["anchors", "model"],
    notThis: "Not UN Tourism arrival counts.",
  },
  discourse: {
    calc: "22 + 7×log10(population + 50) + 12 in 2020 + 9 in 2022 + 0.12×conflict. Clamp 6–98. Louder places are larger, plus crisis years. The log stops China and India from owning the entire scale.",
    sources: ["model", "ne"],
    notThis: "Not a count of articles or posts. Population is the Natural Earth attribute, so this loudness is on the late-2010s headcount.",
  },
  socialTone: {
    calc: "0.70×sentiment + 0.20×(100−conflict) − 0.35×min(inflation, 40). Clamp 2–98. Higher means warmer.",
    sources: ["model", "social"],
    notThis: "Not a sentiment model on text. No posts were read.",
  },
  conflict: {
    calc: "Conflict anchor + global nudge + story nudge + jitter ±0.35. Clamp 0–100. Higher means more exposure. Story floors do the real work for active wars; the anchor does the rest.",
    sources: ["anchors", "acled"],
    notThis: "Not ACLED event counts and not battle deaths from UCDP.",
  },
  corruption: {
    calc: "102 − 0.86×governance + 0.10×conflict. Clamp 3–98. Higher means more pressure. Almost the mirror of governance, by construction.",
    sources: ["model", "cpi", "wgi"],
    notThis: "Not the Transparency International CPI. If you need the CPI, use the CPI.",
  },
  cyber: {
    calc: "After income exists: 0.40×digital + 0.30×income level + 0.22×(100−governance). Clamp 4–96. Rich, connected, lower-governance places score as more exposed. Higher means more exposure, so the color treats it as a burden.",
    sources: ["model"],
    notThis: "Not an incident feed (not Mandiant, not CSIS, not a CERT). The blurb on the metric says the same thing.",
  },
  informal: {
    calc: "96 − 0.40×governance − 0.38×income level + 0.12×conflict. Clamp 4–97. Higher means a heavier informal and illegal share of economic life, as a public-style guess.",
    sources: ["model", "dark"],
    notThis: "Not a dark-web crawl and not IMF informality estimates, which were not imported.",
  },
  sanctions: {
    calc: "A fixed score if the country is on the short list (DPRK 90, Syria 82, Russia 78, Iran 74, Belarus 66, Venezuela 58, Myanmar 50, Cuba 42, Sudan 40, Afghanistan 34). Otherwise 0.18×(100−openness) + 0.12×conflict, clamped 0–42 so unsanctioned countries cannot look like sanctioned ones. From 2022, Russia is at least 84 and Belarus at least 70.",
    sources: ["model", "ofac"],
    notThis: "Not the OFAC SDN list and not legal advice. A low score is not a license to transact.",
  },
  governance: {
    calc: "Governance anchor + story nudge + jitter ±0.45. Clamp 4–98. Higher means more state capacity and more predictable rules.",
    sources: ["anchors", "wgi"],
    notThis: "Not a WGI estimate (those run roughly −2.5 to +2.5). Not rescaled onto that range.",
  },
};

const GROUP_TIPS: Record<string, Tip> = {
  Index: {
    title: "Index group",
    definition: "The six summary scores. Three pillars, their weighted sum (LWI), a mood score that can disagree with the hard series, and a momentum score centered on 50.",
    words: [
      { word: "Pillar", meaning: "One of living, working, investing. A bundle, not a single official series." },
      { word: "Index", meaning: WORDS.index },
    ],
    calculation: "See each score's own question mark. LWI is 36/30/34 on the three pillars.",
    notThis: "Not a licensed product of any development bank.",
    why: "Grouped first because every other group is an ingredient or a cousin of these six.",
    sourceIds: ["model"],
  },
  Macro: {
    title: "Macro group",
    definition: "The national-accounts family: growth, prices, jobs, PPP income, debt feel, currency, and the external position.",
    words: [
      { word: "Macro", meaning: "The whole economy, not a household and not a firm." },
      { word: "Real", meaning: "After inflation. Real GDP growth is volume, not the rise in prices." },
    ],
    calculation: "Growth, inflation, and unemployment can be replaced by a pin. The other four are formulas. None are downloaded cells.",
    notThis: "Not the IMF WEO workbook.",
    why: "These are the only fields where a published number has a standard meaning, so the page is strictest here about what was not imported.",
    sourceIds: ["pins", "imf", "wdi", "ilo"],
  },
  Household: {
    title: "Household group",
    definition: "What day-to-day money feels like: costs, housing, what income buys, where income sits, and whether households will plan ahead.",
    words: [
      { word: "Household", meaning: "People spending and saving, not the government and not firms." },
      { word: "Purchasing power", meaning: "Income after local costs, on the index scale. Not a FX conversion." },
    ],
    calculation: "All five are formulas off anchors, inflation, and the PPP ladder. See each item.",
    notThis: "Not a household budget survey.",
    why: "Separated from macro so a high-GDP country can still read as expensive.",
    sourceIds: ["model", "anchors"],
  },
  Business: {
    title: "Business group",
    definition: "Operating climate for firms: rules, new-firm energy, foreign-capital pull, tax feel, small-firm credit, and whether that climate is heating.",
    words: [
      { word: "SME", meaning: "Small and medium-sized enterprises. Firms too small to tap bond markets." },
      { word: "FDI", meaning: "Foreign direct investment: long-horizon money that buys or builds a lasting stake, not a short portfolio trade." },
    ],
    calculation: "Formulas. Ease is not Doing Business. FDI attractiveness is not a dollar flow.",
    notThis: "Not a chamber-of-commerce survey.",
    why: "Kept apart from investing so 'easy to run a shop' is not the same claim as 'easy to raise venture money.'",
    sourceIds: ["model", "wgi"],
  },
  Demographics: {
    title: "Demographics group",
    definition: "People as a structure: growth, age, cities, pull on migrants, and the rough share in prime working years.",
    words: [
      { word: "Median age", meaning: "The age where half the people are younger and half are older. Not the average, which a few very old people can drag up." },
      { word: "Urbanization", meaning: "Share of life organized in cities, on a 0–100 index. Not the official urban percent." },
    ],
    calculation: "Anchors plus a slow time rule. The UN WPP 2024 is the reference and is not loaded.",
    notThis: "Not a census extract.",
    why: "Age structure changes too slowly to invent a crisis path. The formulas are almost flat on purpose.",
    sourceIds: ["anchors", "wpp", "ne"],
  },
  Psychographics: {
    title: "Psychographics group",
    definition: "Stated and implied mood: contentment, trust in institutions, optimism, room for a life outside work, willingness to take a chance, and trust among people.",
    words: [
      { word: "Psychographics", meaning: "Attitudes and preferences, as opposed to age or income. Here they are inferred from other scores, not asked." },
      { word: "Institution", meaning: "Courts, the civil service, the police, the statistics office. Not a single politician." },
    ],
    calculation: "Each is a weighted sum of pillars and risk scores. No microdata.",
    notThis: "Not the World Values Survey and not the Gallup World Poll.",
    why: "Included because living and investing conditions are not the same as how people feel about them. The gap is the point of having both.",
    sourceIds: ["model", "whr", "wgi"],
  },
  Living: {
    title: "Living group",
    definition: "The ingredients of the living pillar as their own map layers: safety, care, schooling, environment, transit, digital networks, culture, and climate comfort.",
    words: [
      { word: "Living", meaning: "Daily life outside the paycheck and outside the investment case." },
    ],
    calculation: "Mostly anchors. Health has a pandemic notch. Digital drifts up. Climate is latitude plus a hand table.",
    notThis: "Not the living pillar itself. The pillar is a separate anchor, not the average of these eight.",
    why: "So you can see a safe country with a harsh climate, or a cultured city that is hard to cross without a car.",
    sourceIds: ["anchors", "model"],
  },
  Working: {
    title: "Working group",
    definition: "Labor-market texture: wage pace, hiring heat, remote practicality, talent thickness, formal protections, and language access.",
    words: [
      { word: "Nominal", meaning: "In money, before subtracting inflation. Wage growth here is nominal." },
    ],
    calculation: "Wages are a function of inflation and growth, so they are not an independent survey.",
    notThis: "Not the working pillar. Same warning as living: the pillar is its own anchor.",
    why: "A tight job market can still pay wages that lose to prices. These fields can disagree, and should.",
    sourceIds: ["model"],
  },
  Investing: {
    title: "Investing group",
    definition: "Capital texture: market mood, property balance, venture activity, policy predictability, openness, and the visitor economy as an asset.",
    words: [
      { word: "Openness", meaning: "How freely capital, talent, and trade cross the border. Not a moral verdict." },
    ],
    calculation: "Formulas off governance, conflict, tourism, and the investing anchor.",
    notThis: "Not the investing pillar, and not a return forecast.",
    why: "Split out so tourism yield is not mistaken for venture activity.",
    sourceIds: ["model", "anchors"],
  },
  Discourse: {
    title: "Discourse group",
    definition: "How loud a place is in the model's conversation, and whether that conversation is warm or hostile.",
    words: [
      { word: "Discourse", meaning: "Talk about a place. Here, a formula of population and conflict. Not a corpus of text." },
      { word: "Tone", meaning: "Warm versus hostile, built from sentiment, conflict, and inflation." },
    ],
    calculation: "See discourse volume and social tone. Themes lower on the page renormalize twelve topic scores into shares that add to 100.",
    notThis: "Not media monitoring.",
    why: "Kept visible so the social and news sliders have something they are honestly tied to — a formula, not a feed.",
    sourceIds: ["model", "social"],
  },
  Risk: {
    title: "Risk group",
    definition: "What can break a plan: violence, graft, cyber exposure, informal and illegal economic weight, sanctions drag, and the quality of the state (which is the one item here where higher is better).",
    words: [
      { word: "Exposure", meaning: "How much of the bad thing the model assigns. Not a probability and not a loss amount." },
      { word: "Friction", meaning: "Extra cost and delay. Sanctions friction is not a count of designated persons." },
    ],
    calculation: "See each item. Governance is an anchor. The other five are mostly mirrors of governance, income, conflict, and a sanctions list.",
    notThis: "Not a risk vendor's letter grade.",
    why: "Separated so a high living score cannot hide a sanctions or conflict problem unless you never click these.",
    sourceIds: ["model", "wgi", "ofac", "acled", "dark"],
  },
};

export function groupTip(group: string): Tip {
  const base = GROUP_TIPS[group] ?? {
    title: group,
    definition: "A family of map metrics.",
    words: [],
    calculation: "Open each metric.",
    notThis: "Not an official classification.",
    why: "Grouped so the sidebar is readable.",
    sourceIds: ["model"],
  };
  return {
    ...base,
    alsoCited: ALSO_CITED[group] ?? [],
    journals: JOURNAL_HOMES[group],
    forum: forumLine(group),
  };
}

export function metricTip(metric: MetricDef): Tip {
  const formula = FORMULAS[metric.id];
  const direction = metric.higherIsBetter
    ? "Higher is treated as more favorable. Brass on the map, in the level lens, means a higher reading."
    : "Higher is a heavier or less favorable reading. The color scale still paints high numbers in brass, so read the sign before cheering a bright country.";
  return {
    title: metric.label,
    definition: metric.blurb,
    words: [
      { word: "Index versus statistic", meaning: metric.scale === "index" ? WORDS.index : "A statistic here means the field has a real-world unit (percent, dollars, years). It is still produced by the model unless a pin replaced it." },
      { word: "Level intensity", meaning: "The 0–100 ink used for coloring and for the source blend. For indexes it is the score itself. For statistics it is a stretch between two hand-picked ends, so 0 and 100 are not observed minima and maxima." },
      { word: "Anchor", meaning: WORDS.anchor },
    ],
    calculation: `${formula?.calc ?? "No separate expression is written down for this field."} ${direction} In the level lens, an index hero number is the source blend, while a statistic hero number stays on the unblended value. The map always uses the blend.`,
    notThis: formula?.notThis ?? "Not a downloaded official series.",
    why: "The expression is the method. If a reference source is listed, it is the series this field is trying to resemble. It was not pasted in cell by cell unless the status on that source says loaded. Live sources, when named, are fetched in the briefing and do not replace this expression.",
    sourceIds: formula?.sources ?? ["model"],
    alsoCited: ALSO_CITED[metric.group] ?? [],
    journals: JOURNAL_HOMES[metric.group],
    forum: forumLine(metric.group, metric.id),
  };
}

export const UI: Record<string, Tip> = {
  brand: {
    title: "Meridian",
    definition: "One page for comparing places on living, work, and capital from 2016 through a 2026 nowcast. Every control recolors the same map.",
    words: [
      { word: "Meridian", meaning: "A line of longitude. Used here as a name for a worldwide cut through the same three questions, not as a surveying tool." },
      { word: "Atlas", meaning: "A map plus the numbers that paint it. Not a printed book." },
    ],
    calculation: "No score of its own. The world pill to the right is the population-weighted LWI of the current scope.",
    notThis: "Not a fund, not a government, and not a forecast house.",
    why: "A single page so a shared link can restore the year, metric, lens, weights, and place without an account.",
    sourceIds: ["model", "ne"],
  },
  worldLwi: {
    title: "Scope LWI",
    definition: "Population-weighted average of the LWI index for every non-thin territory inside the current map scope.",
    words: [
      { word: "Population-weighted", meaning: "Each country's LWI is multiplied by its Natural Earth population attribute, then divided by the sum of those populations. A large country moves the number more than a small one. Area does not." },
      { word: "LWI", meaning: "Living 36, working 30, investing 34." },
      { word: "Thin", meaning: WORDS.thin },
    ],
    calculation: "Sum over countries of (LWI × population) / sum of population. Thin places and non-positive population are skipped. This pill does not use the source blend and does not use the time lens. It is the raw level.",
    notThis: "Not world GDP and not a UN regional aggregate.",
    why: "An unweighted mean would let microstates outvote India. Population weights are the least-bad public scale that already sits on the polygons.",
    sourceIds: ["ne", "model"],
  },
  play: {
    title: "Play the years",
    definition: "Steps the year from 2016 through 2026 and then loops. About 0.9 seconds per year.",
    words: [
      { word: "Year", meaning: "A calendar year, not a fiscal year and not a rolling twelve-month window." },
    ],
    calculation: "No statistic. It only changes which precomputed year is drawn.",
    notThis: "Not a forecast animation. 2026 is already on the page as a nowcast; play does not compute a new one.",
    why: "Change is easier to see in motion than in a table. Pause by pressing the button again, or by touching the year slider.",
    sourceIds: ["model"],
  },
  year: {
    title: "Year slider",
    definition: "Selects which year of the 2016–2026 path is on the map and in the briefing.",
    words: [
      { word: "Nowcast", meaning: WORDS.nowcast },
      { word: "Path", meaning: "The same formulas run once per year, with pins and story nudges applied where they exist." },
    ],
    calculation: "Arrow keys move one year when focus is not in a field. The series are computed in the browser from the anchors. They are not fetched per year.",
    notThis: "Not a revision history. Changing the year does not show how the estimate was revised later. It shows the model's level for that year.",
    why: "Eleven years covers the pre-pandemic baseline (2019), the break (2020), the price shock (2022), and the current nowcast.",
    sourceIds: ["pins", "model"],
  },
  search: {
    title: "Find a place",
    definition: "Filters the place list already on the page. Countries match name or exact ISO code. Regions match once you have typed at least two characters, and only named zones (not the automatic north/center/south belts).",
    words: [
      { word: "ISO", meaning: "The three-letter code on the place file, close to ISO 3166-1 alpha-3, including some Natural Earth exceptions." },
      { word: "Zone", meaning: "A focus area inside a country. Not a legal border." },
    ],
    calculation: "A substring check. At most six countries and six regions are shown. No server search.",
    notThis: "Not a gazetteer and not Google.",
    why: "The list is finite and already loaded, so a local filter is complete and does not depend on a network.",
    sourceIds: ["ne"],
  },
  scope: {
    title: "Map scope",
    definition: "Limits which territories count as 'in view' for the average, the ranking, and the bright colors. Places outside the scope stay on the map, faded.",
    words: [
      { word: "Continent", meaning: "The continent attribute on the Natural Earth place file. Russia is filed under Europe there. Mexico is filed under Central America in that file's region scheme, not as part of Northern America." },
      { word: "Subregion", meaning: "The UN-style subregion on the same file (Western Europe, Eastern Africa, and so on)." },
    ],
    calculation: "A place matches a continent scope if its continent string equals the choice, or a subregion scope if its subregion string equals the choice. World matches all.",
    notThis: "Not a political bloc (not NATO, not ASEAN, not the EU). The EU is not a scope.",
    why: "Continent and subregion are already on every feature, so the filter cannot silently drop a country for lack of a join.",
    sourceIds: ["ne"],
  },
  population: {
    title: "Emphasis",
    definition: "Dims territories under the chosen population cutoff so large places read first. They stay clickable. Rankings use the same cutoff.",
    words: [
      { word: "Population", meaning: "The Natural Earth population attribute, late 2010s. Not a 2026 UN projection. Example: United States 328,239,523." },
    ],
    calculation: "If the cutoff is 0, nothing is dimmed for size. Otherwise places under the cutoff are drawn at lower opacity. Thin places are dim regardless.",
    notThis: "Not a statement that small countries do not matter. It is a visual filter.",
    why: "A world map colored at equal intensity makes Luxembourg as loud as Indonesia. The default cutoff is 1 million so the eye lands on places where the public series are less empty.",
    sourceIds: ["ne"],
  },
  lensLevel: {
    title: "Level lens",
    definition: "Colors the map by where the metric stands in the selected year, after the source blend.",
    words: [
      { word: "Lens", meaning: "A way of looking at the same series. It does not change the stored year path." },
      { word: "Blend", meaning: WORDS.blend },
    ],
    calculation: "Map color runs from ink at 0 through green in the middle to brass at 100. For indexes the hero number is the rounded blend. For statistics (growth, inflation, unemployment, PPP, wages, age, population growth, working-age share) the hero stays in the statistic's own units and is not blended; the map is still the 0–100 intensity, blended.",
    notThis: "Not a ranking percentile. A score of 70 is not 'better than 70% of countries.'",
    why: "Level is the default because change lenses hide whether a country is actually a good or a bad place to start.",
    sourceIds: ["model"],
  },
  lensDelta: {
    title: "One-year change",
    definition: "Colors the map by this year's blended level minus last year's blended level.",
    words: [
      { word: "Change", meaning: "A difference of index points, not a percent change, even when the underlying statistic is a percent." },
    ],
    calculation: "Score = blended level(year) − blended level(year−1). At 2016 the change is zero because there is no 2015 inside the page. Color runs from teal (fell, around −24) through flat gray (0) to brass (rose, around +24).",
    notThis: "Not a growth rate of the statistic. Unemployment going from 4% to 5% is a change in the intensity score, which you should read next to the level.",
    why: "A country can be poor and improving, or rich and slipping. Level alone hides that.",
    sourceIds: ["model"],
  },
  lens2019: {
    title: "Change since 2019",
    definition: "Colors the map by this year's blended level minus the 2019 blended level. 2019 is the last full pre-pandemic year in this model.",
    words: [
      { word: "Baseline", meaning: "The comparison year, fixed at 2019. Not each country's own peak." },
    ],
    calculation: "Score = blended level(year) − blended level(2019). In 2019 itself the score is the difference against 2018's level only in the one-year lens; in this lens 2019 versus 2019 is zero.",
    notThis: "Not 'versus the pre-COVID trend.' There is no counterfactual path.",
    why: "2019 is the obvious shared baseline. Using each country's best year would reward different dates and make the map incomparable.",
    sourceIds: ["model", "pins"],
  },
  official: {
    title: "Official statistics weight",
    definition: "How much of the map color comes from the metric's own 0–100 intensity, before any mood or momentum remix.",
    words: [
      { word: "Official", meaning: "Official-style: the unblended model path, including pins where they exist. It does not mean a government published this cell." },
      { word: "Weight", meaning: "A slider from 0 to 100. The three sliders are renormalized so they sum to 100% of the blend even if the raw numbers do not sum to 100." },
    ],
    calculation: "Share = this slider / (official + social + news). If all three are zero, the map uses the unblended level.",
    notThis: "Not a claim about source quality. Turning this down does not 'remove the government data.' It turns down the unblended path.",
    why: "Default 70 because the page's promise is closer to national accounts than to conversation, and because the conversation layer is simulated.",
    sourceIds: ["model", "pins"],
  },
  social: {
    title: "Social mood weight",
    definition: "How much of the map color comes from a remix that pulls the metric toward the sentiment index.",
    words: [
      { word: "Social", meaning: "A formula named for mood. Not a social network." },
      { word: "Sentiment index", meaning: "The constructed mood score. See that metric's question mark." },
    ],
    calculation: "Social view = 0.48×(this metric's intensity) + 0.52×(sentiment intensity), clamped 0–100. The slider sets its vote in the blend. Default 20.",
    notThis: "Not X, Reddit, TikTok, or a survey. The live panel's feeds are not an input to this slider.",
    why: "Included so you can see how much a mood overlay would move the map, without pretending the overlay is measured.",
    sourceIds: ["model", "social"],
  },
  news: {
    title: "News momentum weight",
    definition: "How much of the map color comes from a remix that exaggerates the latest change.",
    words: [
      { word: "News", meaning: "A formula named for 'what just changed.' Not a wire service." },
      { word: "Momentum", meaning: "This year's intensity minus last year's, scaled up." },
    ],
    calculation: "News view = this year's intensity + 1.65×(this year's intensity − last year's intensity), clamped 0–100. Default slider 10. In 2016, last year equals this year, so the news view equals the level.",
    notThis: "Not a count of headlines. The Google News list in the live panel is a separate list and does not move this slider.",
    why: "News really does amplify change. The slider lets you add that bias on purpose and see it, instead of hiding it inside the level.",
    sourceIds: ["model", "social"],
  },
  blendNote: {
    title: "What the blend touches",
    definition: "The choropleth uses the blend. Hard figures in the briefing, when the metric is a statistic and the lens is level, stay on the unblended path.",
    words: [
      { word: "Choropleth", meaning: WORDS.choropleth },
      { word: "Hard figure", meaning: "A number with a unit: percent, dollars, years. Shown as printed by the metric's formatter." },
    ],
    calculation: "Blended level = (official view × official weight + social view × social weight + news view × news weight) / (sum of weights).",
    notThis: "Not a Bayesian model and not a polling average.",
    why: "Splitting the two keeps a 4.1% unemployment figure from being silently rewritten by a mood slider, while still letting the map answer 'what if conversation counted more.'",
    sourceIds: ["model"],
  },
  map: {
    title: "The map",
    definition: "Natural Earth 1:50m coastlines, drawn in the Natural Earth projection (a compromise projection, neither equal-area nor conformal).",
    words: [
      { word: "De facto", meaning: "Natural Earth draws who controls the ground, not every legal claim. Disputed areas follow that file." },
      { word: "Projection", meaning: "A way to flatten a sphere. Shapes and areas are both a bit off. Do not compare country size by eye." },
    ],
    calculation: "Fill is colorFor(blended score). Opacity fades places outside the scope, under the population cutoff, or marked thin. Click a country to open it. Click a disk inside an open country to open a zone.",
    notThis: "Not a navigation chart and not a statement of borders.",
    why: "50m is the middle Natural Earth scale: readable coastlines without the download weight of 10m. Version family 5.1.1 as listed by Natural Earth.",
    sourceIds: ["ne"],
  },
  legend: {
    title: "Color legend",
    definition: "How to read the paint. Level lens: low numbers are dark, high numbers are brass. Change lenses: falls are teal, no change is gray, rises are brass.",
    words: [
      { word: "Brass", meaning: "The accent color. It means 'high' or 'rose,' which is favorable only when the metric says higher is better." },
      { word: "Teal", meaning: "Used only on change lenses, for a fall in the index intensity." },
    ],
    calculation: "Level color is a two-part mix from 0 to 100. Change color is a two-part mix from −24 to +24. Values outside that are pinned to the end color. Missing numbers are dim.",
    notThis: "Not a diverging scale around the world average. The midpoint is the middle of the index, not the median country.",
    why: "One ramp, used everywhere, so a color means the same thing on the map and in your memory.",
    sourceIds: ["model"],
  },
  zoom: {
    title: "Zoom",
    definition: "Scales the map around its center. Scroll and pinch do the same. It does not change any number.",
    words: [{ word: "Zoom", meaning: "A view control. Not a change of geographic resolution. The coastline detail stays 50m." }],
    calculation: "Each click multiplies the scale by 1.35 or by 1/1.35.",
    notThis: "Not a new dataset at closer zoom.",
    why: "Zones are small. You need to get close enough to click them.",
    sourceIds: ["ne"],
  },
  pillars: {
    title: "Three pillars",
    definition: "The living, working, and investing anchors (after the year path and, if a zone is open, after that zone's offsets). They are the ingredients of LWI.",
    words: [
      { word: "Offset", meaning: "A zone adds a fixed number of points to living, working, and investing, then related fields move with it. Prices and population stay national." },
    ],
    calculation: "Shown as rounded levels, not blended. LWI on the map can disagree with 0.36×these three if you are looking at a blended index hero rather than these boxes.",
    notThis: "Not GDP shares.",
    why: "Always visible so the summary cannot hide which pillar is doing the work.",
    sourceIds: ["model"],
  },
  hero: {
    title: "The big number",
    definition: "The selected metric for the selected place (or the population-weighted scope if no place is selected), in the selected lens.",
    words: [
      { word: "Hero", meaning: "The primary figure. Everything else on the briefing is context for it." },
    ],
    calculation: "Level + index: rounded blended intensity. Level + statistic: the formatted unblended value (percent, dollars, or years). One-year and since-2019: the change, formatted with a plus sign when positive. Scope aggregates weight countries by the Natural Earth population and skip thin places.",
    notThis: "Not a confidence interval. There is no standard error on these numbers.",
    why: "One number, with the formula one click away, beats a dashboard of unlabeled tiles.",
    sourceIds: ["model", "ne"],
  },
  history: {
    title: "Year path",
    definition: "The unblended metric for each year from 2016 through 2026, for this place or for the population-weighted scope.",
    words: [
      { word: "Unblended", meaning: "The source sliders do not move this line. It is the official-style path." },
    ],
    calculation: "One point per year. The vertical scale is automatic, so a flat series still fills the chart. Do not compare slopes across metrics by eye.",
    notThis: "Not a forecast fan. 2026 is one nowcast point, not a range.",
    why: "The map is a single year. The line is there so a bright country can still show a break in 2020.",
    sourceIds: ["model", "pins"],
  },
  zones: {
    title: "Zones",
    definition: "Focus areas inside the open country: named metros, coasts, capitals, industrial belts, and, where no name was written, a north, center, and south belt.",
    words: [
      { word: "Named", meaning: "A place a person would recognize (a city or a coast). Unnamed belts are marked 'modeled.'" },
      { word: "Disk", meaning: "The circle on the map is a marker of radius in kilometers, not the administrative boundary." },
    ],
    calculation: "The zone copies the national year and then adds living, working, and investing offsets. Safety, tourism, cost, housing, venture, digital, environment, jobs, and sentiment move by smaller rules of the same offsets. Unemployment moves only slightly. PPP, inflation, and population stay national.",
    notThis: "Not a legal border and not a local statistical office.",
    why: "National averages hide the fact that the capital and the interior are different economies. The offsets are honest about being offsets.",
    sourceIds: ["model"],
  },
  rank: {
    title: "Highest and lowest",
    definition: "Territories in the current scope, at or above the population cutoff, not thin, sorted by the map score (blended, and in the current lens).",
    words: [
      { word: "Reading", meaning: "The number the sort uses. For an index lens-level view it is the blended 0–100 score. For a change lens it is the change in that score." },
    ],
    calculation: "Sort descending. Show six at the top and four at the bottom. Ties keep a stable sort only by the order the filter produced, which is the place-file order. There is no second key.",
    notThis: "Not a published league table.",
    why: "The map makes spatial clusters obvious and ranks easy to miss. The list does the opposite.",
    sourceIds: ["model", "ne"],
  },
  themes: {
    title: "Discourse themes",
    definition: "Twelve topic scores, turned into shares of 100, from the same constructed indexes. The words under them are a fixed vocabulary, reweighted.",
    words: [
      { word: "Share", meaning: "This topic's score divided by the sum of all twelve topic scores. The shares add to 100 by construction. They are not the percent of posts." },
      { word: "Term", meaning: "One of four fixed phrases per topic. Its bar is the topic share, times a hash wobble, times a penalty for being later in the list, times a loudness factor from discourse volume." },
    ],
    calculation: "Topic scores are hand formulas: cost uses cost and inflation, housing uses housing, jobs uses unemployment and job heat, and so on. Then shares = score / sum(scores).",
    notThis: "Not a live social scrape and not a topic model (not LDA, not a neural classifier). No text was classified. The live panel below is a different object.",
    why: "A briefing that only shows indexes feels bloodless. These labels are a readable shadow of the indexes, marked as simulated so they are not mistaken for listening to a country.",
    sourceIds: ["model", "social"],
  },
  briefs: {
    title: "Atlas briefs",
    definition: "Short sentences generated from which fields moved, plus a fixed sentence about what that calendar year was in the model.",
    words: [
      { word: "Brief", meaning: "A template sentence. Not a reported article and not a model-written essay from a language model at read time." },
    ],
    calculation: "The year sentence is a lookup. Other sentences fire when a field crosses a hand-set threshold between last year and this year (growth, inflation, sentiment, conflict, and LWI).",
    notThis: "Not journalism. There is no byline because nobody reported it from the field.",
    why: "Threshold sentences are auditable. A free-written paragraph would hide the rule.",
    sourceIds: ["model"],
  },
  thin: {
    title: "Thin public record",
    definition: "The place has under 8,000 people in the Natural Earth attribute, or it is Antarctica, or its subregion is an open-ocean unit.",
    words: [{ word: "Thin", meaning: WORDS.thin }],
    calculation: "A boolean rule. Thin places are dropped from averages and rankings and painted dim.",
    notThis: "Not a judgement that the people there are unknowable. It is a rule about empty published series.",
    why: "Coloring a reef or a polar station with a full LWI implies a labor market that is not there.",
    sourceIds: ["ne"],
  },
  share: {
    title: "Share this view",
    definition: "Copies the address of this exact view: year, metric, lens, scope, place, zone, population cutoff, and the three weights. If you have just added a data type, that type is packed into the link too.",
    words: [
      { word: "Public link", meaning: "This is one page. After you publish it from the Grok app controls, the copied address is the address other people can open. Reader-added types travel inside the link; they are not an account." },
    ],
    calculation: "The query string is the state. Nothing is saved on a server for the share itself.",
    notThis: "Not a login and not a private note. Anyone with the link sees that view.",
    why: "You asked for one shareable page. The state is in the URL so the page can be updated without a second site.",
    sourceIds: ["model"],
  },
  ledger: {
    title: "Sources and method",
    definition: "The full shelf: what is loaded, what was only used as a reference, what was rejected, which searches were run, and how to add a data type.",
    words: [
      { word: "Loaded", meaning: "The page would change if this file changed. Geometry, anchors, pins, and formulas." },
      { word: "Reference", meaning: "The published series a field is trying to resemble. Not copied in." },
      { word: "Rejected", meaning: "Considered, then not used, with a reason." },
    ],
    calculation: "Counts on the ledger are the lengths of those lists. They are not a paper count.",
    notThis: "Not a systematic review. No journal database was queried.",
    why: "Hover cards define one object. The ledger is where the choice among sources is argued.",
    sourceIds: ["imf", "wpp", "wgi", "whr", "ne", "social"],
  },
  added: {
    title: "A data type you added",
    definition: "A reader-defined layer stored in this browser and, when you share, inside the link. It does not create a new measured series.",
    words: [
      { word: "Stand-in", meaning: "An existing metric whose map coloring is reused so the new type is visible. The briefing says which one. The new type's own text is yours." },
    ],
    calculation: "The map score is the stand-in metric's score. Your definition, source, date, and query are shown as text. They are not fed into the formula.",
    notThis: "Not an automatic download of the URL you typed. The page does not fetch that source.",
    why: "You can extend the vocabulary of the page without inventing fake country numbers. When a real series is wired later, the stand-in can be replaced.",
    sourceIds: ["model"],
  },
  live: {
    title: "Live search and attention",
    definition: "Feeds fetched when you open a place or a metric. They sit beside the model. They do not recolor the map, change the year path, or move the source-blend sliders.",
    words: [
      { word: "Google Trends", meaning: "Two live series. Interest over time is a 0–100 index for the last 12 months, for artificial intelligence, ChatGPT, and this metric's search phrase, plus top and rising related queries. Trending today is the public daily RSS with Google's traffic buckets. Neither is a Semrush volume." },
      { word: "Semrush", meaning: "Monthly phrase volume, CPC, and competition. Called when you paste a key into the briefing. The key stays in this browser. With no key, the row stays empty. Volume is not copied from Trends or Wikipedia." },
      { word: "Ahrefs", meaning: "Search volume and keyword difficulty from Keywords Explorer. Same rule as Semrush: a key in the briefing, or no number." },
      { word: "Pageviews", meaning: "English Wikipedia monthly user pageviews for artificial intelligence, large language model, ChatGPT, and the metric's article. Frequency and the change versus last month and last year. Encyclopedia attention, not search volume." },
      { word: "World Bank rows", meaning: "Latest real GDP growth, consumer-price inflation, unemployment, and GDP per capita PPP for the open country. Official cells. They will not match the model." },
    ],
    calculation: "One server request fans out to the public endpoints and returns whatever each one actually answered. Failures stay failures. A 15-minute cache avoids hammering the same country and metric.",
    notThis: "Not a blend, not a dark-web crawl, and not a claim that Reddit or Bluesky were read. Both returned 403. GDELT rate-limited the host, so it is named and not graphed.",
    why: "Search demand and AI-term attention were asked for by name. The three tools are not interchangeable, so each one reports its own state instead of a single 'interest' number.",
    sourceIds: ["gtrends", "semrush", "ahrefs", "wiki", "gnews", "hn", "wbapi"],
  },
  field: {
    title: "Field guide",
    definition: "Forty-two people, forty-two institutions, and forty-two conferences where this element's argument actually shows up. Filtered to the open metric's family. The full shelf is one toggle away.",
    words: [
      { word: "Tagged", meaning: "The name is used for this family of elements. A macroeconomist is not tagged to tourism just to inflate the count." },
      { word: "Shelf order", meaning: "The order on the page. Not a rank, not an h-index, and not a Scopus query." },
    ],
    calculation: "A name matches if its tags include the metric's group or the metric's own id. Counts are that filter's length out of 42.",
    notThis: "Not a systematic review and not a speaker list you can buy.",
    why: "The question marks say which sources the page uses. This list says where a person would go to hear the element argued with the sources the page does not use.",
    sourceIds: ["model"],
  },
};

export function uiTip(id: string): Tip {
  return UI[id] ?? UI.brand;
}

export function sourceById(id: string): Source | undefined {
  return SOURCES.find((source) => source.id === id);
}

export const LEDGER_COUNTS = {
  loadedFiles: LOADED_FILES.length,
  sourcesNamed: SOURCES.length,
  loadedSources: SOURCES.filter((source) => source.status === "loaded").length,
  referenceSources: SOURCES.filter((source) => source.status === "reference").length,
  rejectedSources: SOURCES.filter((source) => source.status === "rejected").length,
  searchesLogged: SEARCHES.length,
  metrics: METRICS.length,
  countryAnchors: 98,
  subregionalMedians: 22,
  pinnedEconomies: 28,
  notSearchedNotes: NOT_SEARCHED.length,
};
