import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, n as require_react_dom, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Pause, i as Play, n as Search, o as Minus, r as Plus, s as CircleHelp } from "../_libs/lucide-react.mjs";
import { n as previewPathPrefix } from "./router-Dhw4Kblw.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { a as ResponsiveContainer, i as Line, n as YAxis, r as XAxis, t as LineChart } from "../_libs/recharts+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as path_default, t as naturalEarth1_default } from "../_libs/d3-geo.mjs";
import { r as select_default } from "../_libs/d3-drag+d3-selection.mjs";
import "../_libs/d3-transition.mjs";
import { n as identity, t as zoom_default } from "../_libs/d3-zoom.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BkG_QQJx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
/** Matches the CSS tokens in styles.css. Continuous ramps can't be Tailwind classes. */
var INK = "#1c2824";
var MID = "#3d6b56";
var BRASS = "#e0a45a";
var NEG = "#1a4550";
var FLAT = "#2a3330";
var DIM = "#1a221f";
function hex(color) {
	const n = Number.parseInt(color.slice(1), 16);
	return [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	];
}
function mix(a, b, t) {
	const pa = hex(a);
	const pb = hex(b);
	const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
	return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
function clamp(n, lo, hi) {
	return Math.max(lo, Math.min(hi, n));
}
function ramp(value, lo, hi, stops) {
	const t = clamp((value - lo) / (hi - lo), 0, 1);
	if (t < .5) return mix(stops[0], stops[1], t / .5);
	return mix(stops[1], stops[2], (t - .5) / .5);
}
function colorFor(value, lens) {
	if (!Number.isFinite(value)) return DIM;
	if (lens === "level") return ramp(value, 0, 100, [
		INK,
		MID,
		BRASS
	]);
	return ramp(value, -24, 24, [
		NEG,
		FLAT,
		BRASS
	]);
}
function idx(value) {
	return Math.round(value).toString();
}
function signed$1(value, digits, suffix = "") {
	const n = value.toFixed(digits);
	return `${value > 0 ? "+" : ""}${n}${suffix}`;
}
function levelSpan(value, lo, hi) {
	return clamp((value - lo) / (hi - lo) * 100, 0, 100);
}
function stat(id, label, group, blurb, higherIsBetter, format, levelOf) {
	return {
		id,
		label,
		group,
		blurb,
		higherIsBetter,
		scale: "stat",
		format,
		levelOf
	};
}
function index(id, label, group, blurb, higherIsBetter) {
	return {
		id,
		label,
		group,
		blurb,
		higherIsBetter,
		scale: "index",
		format: idx,
		levelOf: (value) => clamp(value, 0, 100)
	};
}
var METRICS = [
	index("lwi", "LWI index", "Index", "Composite of living, working, and investing conditions. 36 / 30 / 34.", true),
	index("living", "Living pillar", "Index", "Safety, health, education, environment, culture, climate, and costs.", true),
	index("working", "Working pillar", "Index", "Jobs, wages, talent, remote readiness, and day-to-day labor conditions.", true),
	index("investing", "Investing pillar", "Index", "Dynamism, capital openness, policy stability, and venture depth.", true),
	index("sentiment", "Sentiment index", "Index", "Mood of living, working, and opportunity — can diverge from the hard series.", true),
	index("momentum", "Momentum", "Index", "Change in the LWI index versus the prior year, centered at 50.", true),
	stat("gdpGrowth", "Real GDP growth", "Macro", "Modeled real output growth for the year.", true, (v) => signed$1(v, 1, "%"), (v) => levelSpan(v, -8, 10)),
	stat("inflation", "Inflation", "Macro", "Consumer-price pace. Extreme crises are pinned to published orders of magnitude.", false, (v) => `${v.toFixed(1)}%`, (v) => levelSpan(v, 0, 40)),
	stat("unemployment", "Unemployment", "Macro", "Labor-market slack. High readings in places like South Africa are structural.", false, (v) => `${v.toFixed(1)}%`, (v) => levelSpan(v, 0, 35)),
	stat("ppp", "GDP per capita (PPP)", "Macro", "Purchasing-power income level, compounded from a 2024 anchor with the growth path.", true, (v) => `$${Math.round(v).toLocaleString("en-US")}`, (v) => levelSpan(Math.log(Math.max(800, v)), Math.log(1200), Math.log(12e4))),
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
	stat("popGrowth", "Population growth", "Demographics", "Annual population change.", true, (v) => signed$1(v, 2, "%"), (v) => levelSpan(v, -1.2, 3.5)),
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
	stat("wage", "Wage growth", "Working", "Nominal wage pace. Can lag or lead inflation.", true, (v) => signed$1(v, 1, "%"), (v) => levelSpan(v, -2, 12)),
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
	index("governance", "Governance quality", "Risk", "State capacity, rule of law, and administrative reliability.", true)
];
var GROUPS = [
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
	"Risk"
];
var BY_ID = new Map(METRICS.map((metric) => [metric.id, metric]));
function metricById(id) {
	return BY_ID.get(id) ?? METRICS[0];
}
function readingsOf(raw) {
	const out = {};
	for (const metric of METRICS) {
		const value = raw[metric.id];
		out[metric.id] = {
			value,
			level: metric.levelOf(value),
			display: metric.format(value)
		};
	}
	return out;
}
function formatDelta(metric, current, previous) {
	const d = current - previous;
	const sign = d > 0 ? "+" : "";
	if (metric.id === "ppp") return `${sign}$${Math.round(d).toLocaleString("en-US")}`;
	if (metric.id === "medianAge") return `${sign}${d.toFixed(1)} yrs`;
	if (metric.scale === "stat") return `${sign}${d.toFixed(1)} pts`;
	return `${sign}${d.toFixed(1)}`;
}
/** Shelf order, not a Scopus rank. Tagged by the element families these names are actually used for. */
var PEOPLE = [
	{
		name: "Olivier Blanchard",
		home: "Peterson Institute; MIT emeritus",
		elements: ["Macro", "inflation"],
		note: "The standard classroom voice on fiscal policy, inflation dynamics, and why a shock year is not a new trend."
	},
	{
		name: "Gita Gopinath",
		home: "IMF; Harvard",
		elements: [
			"Macro",
			"Investing",
			"inflation",
			"sanctions"
		],
		note: "International macro and the IMF's public forecasts. Cited when a country number is being compared with the World Economic Outlook."
	},
	{
		name: "Carmen M. Reinhart",
		home: "Harvard Kennedy School",
		elements: [
			"Macro",
			"Risk",
			"debt",
			"sanctions"
		],
		note: "Banking crises, capital-flow stops, and debt. The person editors call when a bright growth year might be a boom that ends."
	},
	{
		name: "Kenneth Rogoff",
		home: "Harvard",
		elements: [
			"Macro",
			"Risk",
			"currency",
			"sanctions"
		],
		note: "Exchange rates, debt overhang, and financial crisis. Often paired with Reinhart, and often argued with."
	},
	{
		name: "Lawrence H. Summers",
		home: "Harvard",
		elements: ["Macro", "Working"],
		note: "Macro policy and labor-market heat. A frequent public interpreter of whether unemployment is cyclical or structural."
	},
	{
		name: "Raghuram Rajan",
		home: "Chicago Booth",
		elements: [
			"Macro",
			"Business",
			"Risk",
			"Investing"
		],
		note: "Finance, development, and what happens when credit outruns the institutions that are supposed to watch it."
	},
	{
		name: "Esther Duflo",
		home: "MIT, J-PAL",
		elements: [
			"Household",
			"Living",
			"Index",
			"Demographics"
		],
		note: "Randomized evidence on what actually changes a poor household's life. The counterweight to league tables."
	},
	{
		name: "Abhijit Banerjee",
		home: "MIT, J-PAL",
		elements: ["Household", "Living"],
		note: "Poverty, credit for small firms, and why a national average hides the household the policy was written for."
	},
	{
		name: "Thomas Piketty",
		home: "Paris School of Economics; World Inequality Lab",
		elements: [
			"Household",
			"Investing",
			"Index"
		],
		note: "Wealth, inheritance, and the capital share. The citation behind almost every inequality chart in a general journal."
	},
	{
		name: "Emmanuel Saez",
		home: "UC Berkeley",
		elements: [
			"Household",
			"Business",
			"tax"
		],
		note: "Top incomes and tax design. Used when a tax-burden index is being checked against administrative data rather than a vibe."
	},
	{
		name: "Gabriel Zucman",
		home: "Paris School of Economics; EU Tax Observatory",
		elements: [
			"Household",
			"Business",
			"Risk",
			"corruption"
		],
		note: "Hidden wealth, profit shifting, and the gap between a country's books and its residents' money."
	},
	{
		name: "Daron Acemoglu",
		home: "MIT",
		elements: [
			"Working",
			"Business",
			"Risk",
			"Discourse",
			"Index",
			"governance"
		],
		note: "Institutions, and the later papers on whether automation and AI raise wages or only output."
	},
	{
		name: "James A. Robinson",
		home: "University of Chicago",
		elements: [
			"Risk",
			"Living",
			"governance"
		],
		note: "Why the same resources produce different states. The political-economy half of the institutions argument."
	},
	{
		name: "Dani Rodrik",
		home: "Harvard Kennedy School",
		elements: [
			"Macro",
			"Business",
			"Investing"
		],
		note: "Globalization, industrial policy, and the trilemma between deep integration, democracy, and national policy."
	},
	{
		name: "Branko Milanovic",
		home: "CUNY Graduate Center",
		elements: [
			"Household",
			"Demographics",
			"Macro",
			"income"
		],
		note: "Global income distribution. The charts that put a person, not a country, on the world income ladder."
	},
	{
		name: "Raj Chetty",
		home: "Harvard, Opportunity Insights",
		elements: [
			"Household",
			"Working",
			"Demographics",
			"Index"
		],
		note: "Neighborhoods, mobility, and the administrative-data standard for 'does a child escape the parent's income.'"
	},
	{
		name: "Claudia Goldin",
		home: "Harvard",
		elements: ["Working", "Demographics"],
		note: "Women's labor supply, education, and the long history inside a current unemployment or wage number."
	},
	{
		name: "David Autor",
		home: "MIT",
		elements: [
			"Working",
			"Discourse",
			"unemployment",
			"remote"
		],
		note: "Polarization of jobs, China trade, and the current papers on what AI does to task demand."
	},
	{
		name: "Angus Deaton",
		home: "Princeton",
		elements: [
			"Psychographics",
			"Household",
			"Living",
			"Index"
		],
		note: "Consumption, wellbeing, and the argument that a life-satisfaction score is not a GDP residual."
	},
	{
		name: "Anne Case",
		home: "Princeton",
		elements: [
			"Living",
			"Demographics",
			"Psychographics"
		],
		note: "Deaths of despair. Cited when health and local labor markets are allowed to be the same story."
	},
	{
		name: "Daniel Kahneman",
		home: "Princeton, 1934–2024",
		elements: ["Psychographics", "lifeSat"],
		note: "Still the citation for experienced utility versus remembered utility. Dead, and not optional in this literature."
	},
	{
		name: "Richard H. Thaler",
		home: "Chicago Booth",
		elements: ["Psychographics", "Household"],
		note: "Behavioral responses to prices, pensions, and defaults. The bridge from a cost index to what households actually do."
	},
	{
		name: "John F. Helliwell",
		home: "University of British Columbia",
		elements: [
			"Psychographics",
			"Index",
			"lifeSat",
			"Living"
		],
		note: "Long-time editor of the World Happiness Report. The survey ladder people mean by 'happiest country.'"
	},
	{
		name: "Jan-Emmanuel De Neve",
		home: "Wellbeing Research Centre, Oxford",
		elements: [
			"Psychographics",
			"Working",
			"Index",
			"lifeSat"
		],
		note: "Wellbeing measurement at work and in the current World Happiness Report editorial group."
	},
	{
		name: "Edward Glaeser",
		home: "Harvard",
		elements: [
			"Living",
			"Working",
			"Demographics",
			"Index",
			"tourism",
			"housing"
		],
		note: "Cities: why density raises wages, prices, and the returns to a tourist or a commuter at the same time."
	},
	{
		name: "Enrico Moretti",
		home: "UC Berkeley",
		elements: [
			"Working",
			"Investing",
			"Demographics"
		],
		note: "The geography of jobs. Innovation clusters, housing supply, and why a national talent score is the wrong unit."
	},
	{
		name: "Amartya Sen",
		home: "Harvard",
		elements: [
			"Living",
			"Psychographics",
			"Index"
		],
		note: "The capability approach. The reason a serious living index is not allowed to be only income."
	},
	{
		name: "Mariana Mazzucato",
		home: "UCL Institute for Innovation and Public Purpose",
		elements: [
			"Business",
			"Investing",
			"venture"
		],
		note: "The entrepreneurial state, mission finance, and public risk-taking behind private venture narratives."
	},
	{
		name: "Michael E. Porter",
		home: "Harvard Business School",
		elements: [
			"Business",
			"Investing",
			"Index"
		],
		note: "Clusters and competitive advantage. Older than the current papers, and still the footnote in place-based strategy."
	},
	{
		name: "Josh Lerner",
		home: "Harvard Business School",
		elements: [
			"Investing",
			"Business",
			"venture"
		],
		note: "Venture capital and innovation finance. The academic source behind 'is this a real venture market or a press release.'"
	},
	{
		name: "Nicholas Bloom",
		home: "Stanford",
		elements: [
			"Working",
			"remote",
			"unemployment"
		],
		note: "Management practices, uncertainty, and the work-from-home papers with Barrero and Davis."
	},
	{
		name: "Erik Brynjolfsson",
		home: "Stanford Digital Economy Lab",
		elements: [
			"Working",
			"Discourse",
			"Investing",
			"cyber",
			"venture"
		],
		note: "The productivity paradox, intangible capital, and the current measurement of generative AI at work."
	},
	{
		name: "Carl Benedikt Frey",
		home: "Oxford Martin School",
		elements: ["Working", "Discourse"],
		note: "The automation-exposure estimates that started the 'share of jobs at risk' argument. Read with the later corrections."
	},
	{
		name: "Ethan Mollick",
		home: "Wharton",
		elements: [
			"Working",
			"Discourse",
			"remote"
		],
		note: "The field experiments and field notes on how people actually use AI at work, as opposed to benchmark scores."
	},
	{
		name: "Richard Baldwin",
		home: "IMD",
		elements: [
			"Working",
			"Business",
			"Discourse",
			"Macro",
			"remote"
		],
		note: "Globalization's sequence (goods, then ideas, then people) and the 2020s papers on AI as a trade shock."
	},
	{
		name: "Max Roser",
		home: "Our World in Data, Oxford",
		elements: [
			"Demographics",
			"Living",
			"Macro",
			"Index"
		],
		note: "Not a theorist. The person who made the public long-run series legible, and who publishes the caveats next to the chart."
	},
	{
		name: "Wolfgang Lutz",
		home: "Wittgenstein Centre; IIASA",
		elements: [
			"Demographics",
			"medianAge",
			"popGrowth"
		],
		note: "Population projections that include education, not only headcount. The demographic alternative to a single UN variant used blindly."
	},
	{
		name: "Paul Collier",
		home: "Blavatnik School, Oxford",
		elements: [
			"Demographics",
			"Risk",
			"Living",
			"migration"
		],
		note: "Fragile states, natural resources, and migration. Cited when a conflict score and a living score have to sit in one paragraph."
	},
	{
		name: "Daniel Kaufmann",
		home: "Natural Resource Governance Institute",
		elements: [
			"Risk",
			"governance",
			"corruption"
		],
		note: "Co-creator of the Worldwide Governance Indicators. Also the person who warns against treating them as a precise ranking."
	},
	{
		name: "Hal R. Varian",
		home: "Google; UC Berkeley",
		elements: ["Discourse", "Macro"],
		note: "With Hyunyoung Choi, the paper that made Google Trends a citable series: predicting the present, not replacing official statistics."
	},
	{
		name: "Rand Fishkin",
		home: "SparkToro; formerly Moz",
		elements: ["Discourse"],
		note: "Search behavior outside the Google keyword box. The practitioner journals and SEO desks cite when Semrush or Ahrefs volume is being over-read."
	},
	{
		name: "Sandra González-Bailón",
		home: "University of Pennsylvania",
		elements: ["Discourse", "Psychographics"],
		note: "Networked publics and how platform samples distort what 'everyone is saying' means."
	}
];
var INSTITUTIONS = [
	{
		name: "International Monetary Fund",
		home: "Washington",
		elements: [
			"Macro",
			"Investing",
			"Risk",
			"sanctions",
			"inflation"
		],
		note: "World Economic Outlook, International Financial Statistics, and the Article IV staff reports. The comparison set for growth, inflation, and external balances."
	},
	{
		name: "World Bank",
		home: "Washington",
		elements: [
			"Macro",
			"Household",
			"Living",
			"Risk",
			"Index",
			"governance",
			"Business"
		],
		note: "World Development Indicators, the Poverty and Inequality Platform, Enterprise Surveys, B-READY, and the Worldwide Governance Indicators."
	},
	{
		name: "OECD",
		home: "Paris",
		elements: [
			"Macro",
			"Household",
			"Working",
			"Living",
			"Index",
			"tourism",
			"remote",
			"Business"
		],
		note: "Economic Outlook, Better Life, employment, housing prices, and the member-country series that stop at the edge of the membership."
	},
	{
		name: "International Labour Organization",
		home: "Geneva",
		elements: [
			"Working",
			"Demographics",
			"unemployment"
		],
		note: "ILOSTAT modelled estimates. The unemployment concept that is comparable when national definitions are not."
	},
	{
		name: "UN DESA Population Division",
		home: "New York",
		elements: [
			"Demographics",
			"popGrowth",
			"medianAge"
		],
		note: "World Population Prospects. The default global demographic vintage, medium variant unless a paper says otherwise."
	},
	{
		name: "United Nations Development Programme",
		home: "New York",
		elements: ["Index", "Living"],
		note: "Human Development Index and the Human Development Report. The composite this page is most often mistaken for."
	},
	{
		name: "World Health Organization",
		home: "Geneva",
		elements: ["Living", "health"],
		note: "Global Health Observatory. Life expectancy, coverage, and the health half of any living index that wants a unit."
	},
	{
		name: "UNESCO Institute for Statistics",
		home: "Montreal",
		elements: [
			"Living",
			"Working",
			"education",
			"talent"
		],
		note: "Schooling attainment and education spending. The series a talent index is supposed to resemble."
	},
	{
		name: "International Telecommunication Union",
		home: "Geneva",
		elements: [
			"Living",
			"Working",
			"Risk",
			"digital",
			"cyber"
		],
		note: "Connectivity facts and the Global Cybersecurity Index. Digital infrastructure and cyber capacity, which are not the same thing."
	},
	{
		name: "UNCTAD",
		home: "Geneva",
		elements: [
			"Investing",
			"Business",
			"fdi"
		],
		note: "World Investment Report. FDI flows and the policy restrictions around them."
	},
	{
		name: "Bank for International Settlements",
		home: "Basel",
		elements: [
			"Macro",
			"Risk",
			"debt",
			"housing",
			"sanctions"
		],
		note: "Credit, cross-border banking, and residential property prices. The series that shows a housing boom before the census does."
	},
	{
		name: "Eurostat",
		home: "Luxembourg",
		elements: [
			"Macro",
			"Demographics",
			"Household"
		],
		note: "The harmonized European statistical system. Used inside Europe when the IMF vintage is too coarse."
	},
	{
		name: "U.S. Bureau of Economic Analysis",
		home: "Suitland",
		elements: ["Macro", "gdpGrowth"],
		note: "US national accounts. The template other statistical offices are compared with, not a world dataset."
	},
	{
		name: "U.S. Bureau of Labor Statistics",
		home: "Washington",
		elements: [
			"Working",
			"Macro",
			"unemployment",
			"wage"
		],
		note: "CPS, CES, and CPI. The micro standard for jobs, wages, and prices in one large country."
	},
	{
		name: "U.S. Census Bureau",
		home: "Suitland",
		elements: ["Demographics", "Household"],
		note: "Population estimates, the ACS, and income. Cited whenever a US regional claim is finer than a nation."
	},
	{
		name: "Board of Governors of the Federal Reserve",
		home: "Washington",
		elements: ["Macro", "Investing"],
		note: "Financial accounts, the Senior Loan Officer survey, and the research staff's nowcasts."
	},
	{
		name: "European Central Bank",
		home: "Frankfurt",
		elements: [
			"Macro",
			"Investing",
			"inflation"
		],
		note: "Euro-area prices, bank lending, and the Sintra research conversation that follows the policy decision."
	},
	{
		name: "Gallup",
		home: "Washington",
		elements: [
			"Psychographics",
			"Living",
			"lifeSat"
		],
		note: "World Poll. The fieldwork under the World Happiness Report's ladder and a large share of global confidence items."
	},
	{
		name: "Pew Research Center",
		home: "Washington",
		elements: [
			"Psychographics",
			"Discourse",
			"Demographics"
		],
		note: "Repeated cross-national attitude surveys, including how people say they meet news and institutions."
	},
	{
		name: "Wellbeing Research Centre, University of Oxford",
		home: "Oxford",
		elements: [
			"Psychographics",
			"Index",
			"lifeSat"
		],
		note: "Current academic home of the World Happiness Report."
	},
	{
		name: "Our World in Data",
		home: "Oxford",
		elements: [
			"Demographics",
			"Living",
			"Macro",
			"Index"
		],
		note: "The public republisher and documenter of the long-run series above. A path to the source, not a replacement for it."
	},
	{
		name: "National Bureau of Economic Research",
		home: "Cambridge, Massachusetts",
		elements: [
			"Macro",
			"Working",
			"Investing",
			"venture",
			"Business"
		],
		note: "Working papers that become the journal articles. Where a new jobs or venture claim usually appears first."
	},
	{
		name: "Opportunity Insights",
		home: "Harvard",
		elements: ["Household", "Working"],
		note: "Chetty and coauthors' administrative-data lab. Neighborhood mobility, not another perception index."
	},
	{
		name: "World Inequality Lab",
		home: "Paris School of Economics",
		elements: [
			"Household",
			"Investing",
			"income"
		],
		note: "Distributional national accounts. The dataset behind the Piketty–Saez–Zucman public charts."
	},
	{
		name: "V-Dem Institute",
		home: "University of Gothenburg",
		elements: [
			"Risk",
			"Psychographics",
			"governance"
		],
		note: "Varieties of Democracy. The disaggregated political series journals use when Freedom House is too blunt."
	},
	{
		name: "Transparency International",
		home: "Berlin",
		elements: ["Risk", "corruption"],
		note: "Corruption Perceptions Index. The number the public quotes, with a methodology note the public skips."
	},
	{
		name: "ACLED",
		home: "Armed Conflict Location & Event Data Project",
		elements: ["Risk", "conflict"],
		note: "Event-level political violence and demonstrations. The conflict feed this page refuses to fake."
	},
	{
		name: "Uppsala Conflict Data Program",
		home: "Uppsala University",
		elements: ["Risk", "conflict"],
		note: "Battle deaths and organized violence. The other conflict citation, older and stricter than ACLED."
	},
	{
		name: "Intergovernmental Panel on Climate Change",
		home: "Geneva (WMO/UNEP)",
		elements: ["Living", "climate"],
		note: "Assessment reports. The climate literature a comfort index is not allowed to contradict without saying so."
	},
	{
		name: "Wittgenstein Centre for Demography and Global Human Capital",
		home: "Vienna",
		elements: ["Demographics", "education"],
		note: "Population by age, sex, and education. The projection set that refuses to treat people as identical."
	},
	{
		name: "J-PAL",
		home: "MIT",
		elements: ["Household", "Living"],
		note: "The evidence library for interventions. What you cite instead of a composite when the question is 'what works.'"
	},
	{
		name: "Stanford Institute for Human-Centered Artificial Intelligence",
		home: "Stanford",
		elements: [
			"Discourse",
			"Working",
			"cyber"
		],
		note: "AI Index and the research community around measurement of AI's economic footprint."
	},
	{
		name: "Brookings Institution",
		home: "Washington",
		elements: [
			"Macro",
			"Living",
			"Working",
			"Business"
		],
		note: "Hamilton Project, Hutchins, and the papers that sit between a statistical release and a legislature."
	},
	{
		name: "Peterson Institute for International Economics",
		home: "Washington",
		elements: [
			"Macro",
			"Investing",
			"sanctions"
		],
		note: "Trade, sanctions, and macro policy. Where a sanctions narrative is expected to show a balance-of-payments table."
	},
	{
		name: "Bruegel",
		home: "Brussels",
		elements: [
			"Macro",
			"Investing",
			"sanctions"
		],
		note: "European economic policy. The desk that translates an ECB decision into a distributional consequence."
	},
	{
		name: "World Economic Forum",
		home: "Geneva",
		elements: [
			"Business",
			"Investing",
			"Discourse",
			"tourism"
		],
		note: "Future of Jobs and the competitiveness successors. Widely cited by firms, treated carefully by journals."
	},
	{
		name: "Freedom House",
		home: "Washington",
		elements: ["Risk", "governance"],
		note: "Freedom in the World. The annual political-rights score newspapers use and political scientists often replace with V-Dem."
	},
	{
		name: "Legatum Institute",
		home: "London",
		elements: ["Index", "Living"],
		note: "Prosperity Index. One of the published composites a reader will confuse with this page's LWI."
	},
	{
		name: "World Values Survey Association",
		home: "Stockholm secretariat; global fieldwork",
		elements: ["Psychographics", "trust"],
		note: "The multi-decade values survey. Trust, secularization, and the items a psychographic index wishes it had asked."
	},
	{
		name: "Google",
		home: "Mountain View",
		elements: ["Discourse"],
		note: "Google Trends and Search. The only public, first-party window on search attention. Volume for an arbitrary keyword is not in the free RSS."
	},
	{
		name: "Semrush",
		home: "Boston",
		elements: ["Discourse"],
		note: "Commercial keyword volume, CPC, and competitive position. Practitioners cite it constantly. Journals cite it rarely, and only with a methods paragraph. No key is configured here."
	},
	{
		name: "Ahrefs",
		home: "Singapore",
		elements: ["Discourse"],
		note: "Keywords Explorer: search volume and keyword difficulty, plus the research Tim Soulo publishes from the company's data. No key is configured here."
	}
];
var CONFERENCES = [
	{
		name: "ASSA / American Economic Association Annual Meeting",
		home: "Rotating US city, early January",
		elements: [
			"Macro",
			"Working",
			"Household"
		],
		note: "The job-market and the sessions where a new macro or labor paper has to survive a room of specialists."
	},
	{
		name: "NBER Summer Institute",
		home: "Cambridge, Massachusetts",
		elements: [
			"Macro",
			"Working",
			"Investing",
			"venture"
		],
		note: "By invitation, by program (labor, growth, productivity, corporate finance). The workshop version of the NBER paper."
	},
	{
		name: "Brookings Papers on Economic Activity",
		home: "Washington, twice a year",
		elements: ["Macro"],
		note: "A journal that is also a conference. Applied macro with discussants who are expected to attack the identification."
	},
	{
		name: "Jackson Hole Economic Policy Symposium",
		home: "Federal Reserve Bank of Kansas City",
		elements: ["Macro", "inflation"],
		note: "Central bankers and a small research program. Where an inflation framework gets pressure-tested in public."
	},
	{
		name: "ECB Forum on Central Banking",
		home: "Sintra, Portugal",
		elements: [
			"Macro",
			"Investing",
			"inflation"
		],
		note: "The European counterpart to Jackson Hole. Prices, wages, and the transmission through banks."
	},
	{
		name: "IMF–World Bank Annual Meetings",
		home: "Rotating",
		elements: [
			"Macro",
			"Investing",
			"Risk",
			"sanctions"
		],
		note: "The October set-piece. WEO release, ministers, and the corridor conversation about who is in a program."
	},
	{
		name: "IMF–World Bank Spring Meetings",
		home: "Washington",
		elements: ["Macro"],
		note: "The April repeat, usually where the mid-year correction to the October story shows up."
	},
	{
		name: "Annual Bank Conference on Development Economics",
		home: "World Bank",
		elements: ["Household", "Living"],
		note: "Development economics with the Bank's operational staff in the room, not only the authors."
	},
	{
		name: "Royal Economic Society Annual Conference",
		home: "United Kingdom",
		elements: [
			"Macro",
			"Working",
			"Household"
		],
		note: "The main general-economics meeting outside the US circuit."
	},
	{
		name: "Econometric Society World Congress",
		home: "Rotating, every five years",
		elements: ["Macro"],
		note: "Methods. Cited when a paper's claim depends on a new estimator rather than a new dataset."
	},
	{
		name: "Society of Labor Economists Annual Meeting",
		home: "Rotating",
		elements: [
			"Working",
			"unemployment",
			"remote"
		],
		note: "The specialist labor meeting. Wages, job search, and the AI-and-tasks papers."
	},
	{
		name: "International Labour Conference",
		home: "ILO, Geneva",
		elements: ["Working", "labor"],
		note: "Governments, employers, and unions. Standards, not papers. Where a labor-protection score meets a negotiation."
	},
	{
		name: "Population Association of America Annual Meeting",
		home: "Rotating US city",
		elements: [
			"Demographics",
			"popGrowth",
			"medianAge"
		],
		note: "The main demographic meeting in the Americas. Fertility, mortality, migration, and formal demography."
	},
	{
		name: "IUSSP International Population Conference",
		home: "Rotating, every four years",
		elements: ["Demographics"],
		note: "The global population congress. Broader than PAA and slower."
	},
	{
		name: "European Population Conference",
		home: "EAPS, every two years",
		elements: ["Demographics"],
		note: "Europe's demographic meeting, including the low-fertility and migration arguments."
	},
	{
		name: "ISQOLS Annual Conference",
		home: "International Society for Quality-of-Life Studies",
		elements: [
			"Psychographics",
			"Living",
			"lifeSat",
			"Index"
		],
		note: "The specialist wellbeing meeting. Life satisfaction, social indicators, and the argument about what an index is allowed to add up."
	},
	{
		name: "Human Development and Capability Association Conference",
		home: "Rotating",
		elements: [
			"Living",
			"Psychographics",
			"Index"
		],
		note: "Sen's tradition, still organized. Capabilities, agency, and why HDI-style indexes keep being rewritten."
	},
	{
		name: "American Sociological Association Annual Meeting",
		home: "Rotating",
		elements: [
			"Psychographics",
			"Demographics",
			"Discourse"
		],
		note: "Inequality, culture, and media. Where a psychographic claim is treated as a social fact, not a utility residual."
	},
	{
		name: "American Political Science Association Annual Meeting",
		home: "Rotating",
		elements: ["Risk", "governance"],
		note: "Institutions, conflict, and regime measurement. V-Dem and governance papers land here."
	},
	{
		name: "International Studies Association Annual Convention",
		home: "Rotating",
		elements: [
			"Risk",
			"conflict",
			"sanctions"
		],
		note: "Conflict, sanctions, and international political economy. The IR room, as distinct from the economics room."
	},
	{
		name: "Munich Security Conference",
		home: "Munich",
		elements: [
			"Risk",
			"conflict",
			"sanctions"
		],
		note: "Policy, not a journal. The public meeting where a conflict or sanctions score becomes a government's sentence."
	},
	{
		name: "WTO Public Forum",
		home: "Geneva",
		elements: [
			"Business",
			"Investing",
			"openness"
		],
		note: "Trade rules with the secretariat in the building. Openness, as law, rather than as a sentiment."
	},
	{
		name: "UNCTAD World Investment Forum",
		home: "Rotating",
		elements: ["Investing", "fdi"],
		note: "Investment agreements and FDI. The institutional meeting that matches the World Investment Report."
	},
	{
		name: "World Urban Forum",
		home: "UN-Habitat",
		elements: [
			"Living",
			"Demographics",
			"tourism",
			"housing"
		],
		note: "Cities, housing, and the visitor economy as an urban system rather than a marketing budget."
	},
	{
		name: "UN Statistical Commission",
		home: "New York",
		elements: ["Macro", "Demographics"],
		note: "Where the definitions are adopted. If a concept is not a UN statistical standard, this is the room that says so."
	},
	{
		name: "UN World Data Forum",
		home: "Rotating",
		elements: ["Demographics", "Discourse"],
		note: "Official statistics meeting new sources: satellite, mobile, search. The diplomatic version of the methods fight."
	},
	{
		name: "NeurIPS",
		home: "Rotating",
		elements: ["Discourse", "Working"],
		note: "The main machine-learning meeting. Benchmarks and systems. Economic consequences are a side workshop, not the keynote."
	},
	{
		name: "International Conference on Machine Learning",
		home: "Rotating",
		elements: ["Discourse"],
		note: "The other flagship ML meeting. Cited for models, not for country scores."
	},
	{
		name: "ACM FAccT",
		home: "Rotating",
		elements: [
			"Discourse",
			"Risk",
			"cyber"
		],
		note: "Fairness, accountability, and transparency. Where AI measurement gets a political and legal argument."
	},
	{
		name: "AAAI/ACM Conference on AI, Ethics, and Society",
		home: "Rotating",
		elements: ["Discourse", "Working"],
		note: "AIES. The ethics-and-society meeting between the ML conferences and the labor conferences."
	},
	{
		name: "WSIS Forum",
		home: "ITU / UN, Geneva",
		elements: [
			"Living",
			"Discourse",
			"digital"
		],
		note: "World Summit on the Information Society. Connectivity policy, not model weights."
	},
	{
		name: "BrightonSEO",
		home: "Brighton, twice a year",
		elements: ["Discourse"],
		note: "The largest practitioner search conference. Where Semrush, Ahrefs, and Google search behavior are discussed in public by the people who buy the data."
	},
	{
		name: "MozCon",
		home: "Moz, usually Seattle",
		elements: ["Discourse"],
		note: "Search marketing. Older than the current tool market, still a place the measurement arguments are rehearsed."
	},
	{
		name: "Ahrefs Evolve",
		home: "Ahrefs",
		elements: ["Discourse"],
		note: "Ahrefs' own conference. Keyword demand, content, and the company's view of how search volume should be read."
	},
	{
		name: "SMX (Search Marketing Expo)",
		home: "Third Door Media",
		elements: ["Discourse"],
		note: "The long-running search-marketing expo. Practitioners, Google representatives, and tool vendors in one program."
	},
	{
		name: "Web Summit",
		home: "Lisbon",
		elements: [
			"Business",
			"Discourse",
			"Investing"
		],
		note: "Founders and platforms. A diffusion channel for AI-product claims, not a refereed session."
	},
	{
		name: "Slush",
		home: "Helsinki",
		elements: [
			"Investing",
			"Business",
			"venture"
		],
		note: "The European startup meeting. Venture mood, observed as a crowd, which is not the same as a funding total."
	},
	{
		name: "Lindau Nobel Laureate Meetings",
		home: "Lindau; economics in rotation",
		elements: ["Macro"],
		note: "Not an annual economics conference. Economics is one of the rotating disciplines. Useful for the canonical argument, not for a new dataset."
	},
	{
		name: "UN Climate Change Conference (COP)",
		home: "UNFCCC, rotating",
		elements: ["Living", "climate"],
		note: "The negotiation. Climate comfort on a map is not what is being signed here, but the physical papers cited in the side events are."
	},
	{
		name: "Paris Peace Forum",
		home: "Paris",
		elements: ["Risk", "governance"],
		note: "Governance and multilateral projects. A policy fair with a conflict and institutions agenda."
	},
	{
		name: "Academy of Management Annual Meeting",
		home: "Rotating",
		elements: ["Business", "Working"],
		note: "Strategy, entrepreneurship, and organizational behavior. The business-school citation circuit."
	},
	{
		name: "OECD World Forum on Statistics, Knowledge and Policy",
		home: "OECD, periodic",
		elements: [
			"Index",
			"Psychographics",
			"lifeSat"
		],
		note: "Not annual. The forum that pushed wellbeing statistics into statistical offices. The papers outlive the meeting."
	}
];
var JOURNAL_HOMES = {
	Index: "Argued in the Journal of Economic Perspectives, Social Indicators Research, and the Human Development Report's statistical annex.",
	Macro: "Argued in the American Economic Review, Quarterly Journal of Economics, Journal of Economic Perspectives, and the IMF World Economic Outlook analytical chapters.",
	Household: "Argued in the Quarterly Journal of Economics, Journal of Public Economics, Review of Income and Wealth, and the World Bank Policy Research Working Paper series.",
	Business: "Argued in the Journal of Finance, Journal of International Business Studies, Research Policy, and the World Bank's Enterprise Surveys methodology notes.",
	Demographics: "Argued in Demography, Population and Development Review, and the UN World Population Prospects methodological appendix.",
	Psychographics: "Argued in the Journal of Personality and Social Psychology, Journal of Economic Behavior and Organization, and the World Happiness Report's methods chapters.",
	Living: "Argued in The Lancet, BMJ, Nature Climate Change, and the WHO's indicator documentation.",
	Working: "Argued in the Quarterly Journal of Economics, Journal of Labor Economics, ILR Review, and the ILO's statistical manuals.",
	Investing: "Argued in the Journal of Finance, Journal of Financial Economics, and UNCTAD's World Investment Report.",
	Discourse: "Argued in Political Communication, Science, the Choi and Varian Google Trends note, and — for the commercial tools — Search Engine Journal and the vendors' own methodology pages, which are not refereed.",
	Risk: "Argued in the Journal of Peace Research, Journal of Conflict Resolution, World Development, and the Worldwide Governance Indicators methodology paper."
};
var ALSO_CITED = {
	Index: [
		{
			name: "UN Human Development Index",
			note: "UNDP. Health, schooling, and income, with published weights. The composite readers already know."
		},
		{
			name: "Legatum Prosperity Index",
			note: "Twelve pillars. Closer in ambition to this page than HDI is, and still a different formula."
		},
		{
			name: "Social Progress Index",
			note: "Social Progress Imperative. Basic needs, foundations, opportunity. Explicitly excludes GDP as an input."
		},
		{
			name: "OECD Better Life Index",
			note: "Eleven topics, member and partner countries only. The right idea and the wrong coverage for a world coastline file."
		},
		{
			name: "World Happiness Report ladder",
			note: "Gallup World Poll via Oxford. A survey mean, not a weighted pillar index."
		}
	],
	Macro: [
		{
			name: "Penn World Table",
			note: "University of Groningen and UC Davis. PPP output and productivity built for cross-country research, not for a news cycle."
		},
		{
			name: "Maddison Project",
			note: "Long-run GDP. What you cite for a century, not for 2022."
		},
		{
			name: "OECD Economic Outlook",
			note: "Member-country forecasts and accounts. Tighter than the WEO inside the membership, silent outside it."
		},
		{
			name: "IMF International Financial Statistics",
			note: "The high-frequency sibling of the WEO. Reserves, money, trade, prices."
		},
		{
			name: "Jordà–Schularick–Taylor Macrohistory Database",
			note: "Long-run credit, house prices, and crises for a limited set of rich countries."
		},
		{
			name: "BIS credit and property statistics",
			note: "The series that sees a leverage cycle before annual GDP does."
		},
		{
			name: "World Bank Global Economic Prospects",
			note: "The Bank's forecast book. Often the second citation next to the WEO."
		}
	],
	Household: [
		{
			name: "Luxembourg Income Study",
			note: "Harmonized microdata. The standard for a distributional claim."
		},
		{
			name: "World Bank Poverty and Inequality Platform",
			note: "Successor to PovcalNet. Survey means and poverty lines."
		},
		{
			name: "International Comparison Program",
			note: "The price survey underneath PPP. Without it, a dollar income ranking is an exchange-rate accident."
		},
		{
			name: "OECD Income Distribution Database",
			note: "Gini and poverty for members. Not a world file."
		},
		{
			name: "Demographia International Housing Affordability",
			note: "Median-multiple housing. A single method, a small city set, widely quoted."
		},
		{
			name: "Numbeo",
			note: "Crowdsourced prices. Rejected here as a spine because expats file the rows. Still the scrape many dashboards quietly use."
		}
	],
	Business: [
		{
			name: "World Bank Enterprise Surveys",
			note: "Firm-level obstacles, actually asked of firms. The right micro source for 'ease.'"
		},
		{
			name: "World Bank B-READY",
			note: "The replacement for Doing Business. New, narrower, and the series to watch."
		},
		{
			name: "Global Entrepreneurship Monitor",
			note: "Adult population surveys of startup intent and activity."
		},
		{
			name: "UNCTAD World Investment Report",
			note: "FDI magnitudes and policy. Not a sentiment score."
		},
		{
			name: "OECD FDI Regulatory Restrictiveness Index",
			note: "Statutory barriers. A rules measure, not a flow."
		},
		{
			name: "Fraser Institute Economic Freedom of the World",
			note: "A widely cited composite. Contested, and not imported here."
		},
		{
			name: "Heritage Index of Economic Freedom",
			note: "The other widely cited composite. Same warning."
		}
	],
	Demographics: [
		{
			name: "Wittgenstein Centre human-capital data",
			note: "Population by education. Changes the meaning of 'working age.'"
		},
		{
			name: "IPUMS International",
			note: "Harmonized census microdata. What a median age is made of."
		},
		{
			name: "UNHCR refugee statistics",
			note: "Forced displacement. Missing from a migration-pull index that only counts voluntary moves."
		},
		{
			name: "IOM World Migration Report",
			note: "The narrative compilation. Useful, and not a microdataset."
		},
		{
			name: "OECD International Migration Database",
			note: "Stocks and flows for members."
		},
		{
			name: "DHS and MICS",
			note: "USAID-era Demographic and Health Surveys, and UNICEF's MICS. The age and health microdata for poorer countries."
		}
	],
	Psychographics: [
		{
			name: "Gallup World Poll",
			note: "The fieldwork. National samples, repeated items, the ladder."
		},
		{
			name: "World Values Survey",
			note: "Values and trust across waves since 1981."
		},
		{
			name: "European Social Survey",
			note: "The highest-quality cross-national attitude survey inside Europe."
		},
		{
			name: "Afrobarometer, Latinobarómetro, Arab Barometer",
			note: "Regional attitude surveys. Better than stretching the ESS, and not global."
		},
		{
			name: "European Values Study",
			note: "The European partner tradition to the World Values Survey."
		},
		{
			name: "General Social Survey",
			note: "NORC. The US long-run attitude series. One country, deep."
		}
	],
	Living: [
		{
			name: "IHME Global Burden of Disease",
			note: "The health loss series The Lancet publishes. Heavier than a healthcare access index."
		},
		{
			name: "WHO Global Health Observatory",
			note: "Coverage and outcomes with a UN definition."
		},
		{
			name: "OECD PISA",
			note: "Learning outcomes at 15. Not years of schooling."
		},
		{
			name: "Yale Environmental Performance Index",
			note: "A published environment composite. One way to stop a climate-comfort sketch from pretending to be ecology."
		},
		{
			name: "ND-GAIN",
			note: "Notre Dame. Climate vulnerability and readiness."
		},
		{
			name: "WHO air-quality database",
			note: "Particulates. A unit, not a vibe."
		},
		{
			name: "Copernicus ERA5",
			note: "Reanalysis weather. The physical input a climate-comfort score should start from."
		},
		{
			name: "Global Peace Index",
			note: "Institute for Economics and Peace. A safety cousin, built from conflict and crime indicators."
		}
	],
	Working: [
		{
			name: "ILOSTAT",
			note: "Already the reference concept for unemployment. Also wages, hours, and informality."
		},
		{
			name: "OECD Employment Outlook",
			note: "The annual argument about jobs in member countries."
		},
		{
			name: "Eurofound",
			note: "Working conditions in Europe. Surveys, not a world map."
		},
		{
			name: "WFH Research (Barrero, Bloom, Davis)",
			note: "The work-from-home time series. The empirical remote-work source."
		},
		{
			name: "O*NET",
			note: "US task content. What Frey-style exposure scores are built on."
		},
		{
			name: "EF English Proficiency Index",
			note: "A commercial language ranking. Widely quoted, not a census of who can work in English."
		},
		{
			name: "WEF Future of Jobs",
			note: "Employer surveys of skill demand. A forecast of hiring talk, not of employment."
		}
	],
	Investing: [
		{
			name: "PitchBook",
			note: "The venture and private-capital ledger journals and investors both end up citing."
		},
		{
			name: "Preqin",
			note: "Private capital. Institutional, paid, and the other standard beside PitchBook."
		},
		{
			name: "UN Tourism (formerly UNWTO)",
			note: "Arrival counts and receipts. The unit this page's tourism yield does not claim to be."
		},
		{
			name: "BIS residential property prices",
			note: "Comparable house prices. A balance score is not this index."
		},
		{
			name: "MSCI and national equity indexes",
			note: "Prices and returns. Market mood is not a return."
		},
		{
			name: "PRS Group International Country Risk Guide",
			note: "The commercial political-risk scores. Paid, long, and not reproduced here."
		},
		{
			name: "S&P Capital IQ",
			note: "Firm financials. The micro foundation under a market-level story."
		}
	],
	Discourse: [
		{
			name: "Google Trends",
			note: "Live on this page as the daily trending RSS. Interest-over-time for an arbitrary term is a different, unofficial endpoint and is not filled in when Google refuses it."
		},
		{
			name: "Semrush",
			note: "Keyword volume and CPC. Called only if a server key exists. Otherwise the panel says so and does not invent a volume."
		},
		{
			name: "Ahrefs",
			note: "Search volume and keyword difficulty. Same rule: no key, no number."
		},
		{
			name: "Wikimedia pageviews",
			note: "Live here. Encyclopedia attention, monthly, which moves with search interest and is not search volume."
		},
		{
			name: "GDELT",
			note: "The open global news corpus. The right free news-frequency source. This host is currently rate-limited by GDELT, so it is not shown as a series."
		},
		{
			name: "Media Cloud",
			note: "Academic news corpus. The source a discourse paper uses when it wants a methods section."
		},
		{
			name: "Similarweb",
			note: "Site traffic estimates. Commercial, and a cousin of Semrush rather than a social feed."
		},
		{
			name: "Hacker News via Algolia",
			note: "Live here. A technical public, not a population."
		}
	],
	Risk: [
		{
			name: "V-Dem",
			note: "The disaggregated regime dataset. Preferred to a single democracy score in current journals."
		},
		{
			name: "Freedom House",
			note: "Freedom in the World. Annual, expert-coded, public."
		},
		{
			name: "Transparency International CPI",
			note: "The corruption number the public already uses. Not duplicated into this page's formula."
		},
		{
			name: "ACLED and UCDP",
			note: "Events and deaths. The two conflict citations."
		},
		{
			name: "OFAC sanctions lists",
			note: "The legal list. This page is not a screening tool."
		},
		{
			name: "Global Organized Crime Index",
			note: "Global Initiative Against Transnational Organized Crime. The public illicit-economy cousin."
		},
		{
			name: "Medina and Schneider informality estimates",
			note: "IMF working-paper tradition. The published informal-share numbers this index is not."
		},
		{
			name: "ITU Global Cybersecurity Index",
			note: "Commitment and capacity. Not an incident feed."
		},
		{
			name: "Fund for Peace Fragile States Index",
			note: "A public composite newspapers already know. Different weights, same temptation to over-read a rank."
		}
	]
};
function relates(row, group, metricId) {
	return row.elements.includes(group) || metricId != null && row.elements.includes(metricId);
}
function forumLine(group, metricId) {
	const people = PEOPLE.filter((row) => relates(row, group, metricId));
	const institutions = INSTITUTIONS.filter((row) => relates(row, group, metricId));
	const conferences = CONFERENCES.filter((row) => relates(row, group, metricId));
	const pick = (rows) => rows.length > 0 ? rows.slice(0, 3).map((row) => row.name).join("; ") : "none tagged";
	return `${people.length} of 42 people, ${institutions.length} of 42 institutions, and ${conferences.length} of 42 conferences are tagged to this element. People: ${pick(people)}. Institutions: ${pick(institutions)}. Conferences: ${pick(conferences)}. Shelf order is editorial, not a citation rank. The field guide lists all 42 of each.`;
}
/** Files this page actually executes. Nothing here is a live API pull. */
var LOADED_FILES = [
	"Coastlines and place attributes: public/geo/countries.json (Natural Earth 1:50m admin-0 countries, population attribute included).",
	"Subregional medians and about 98 country anchors: src/data/anchors.ts.",
	"Sparse macro pins for 28 economies, not a full country-year panel: src/data/anchors.ts (PIN).",
	"Global year shocks and country stories (pandemic, inflation, war, tech, energy): src/data/anchors.ts (GLOBAL, story).",
	"Every derived series and the discourse simulator: src/data/model.ts.",
	"Metric names, blurbs, and the 0–100 intensity maps: src/data/metrics.ts.",
	"Named zones and north/center/south belts: src/data/regions.ts."
];
var SOURCES = [
	{
		id: "ne",
		status: "loaded",
		name: "Natural Earth 1:50m Admin 0 — Countries",
		publisher: "Natural Earth",
		series: "Cultural vectors, version 5.1.1",
		published: "Version 5.1.1 listed on the Natural Earth 50m cultural download page (reviewed 19 October 2026). Public domain.",
		url: "https://www.naturalearthdata.com/downloads/50m-cultural-vectors/",
		why: "One file gives coastlines, ISO codes, continent, subregion, centroid, and a population attribute that matches the polygons. Joining a newer population file onto these split map units (overseas France, and similar) without an audited crosswalk would mis-weight the choropleth. Chosen for geometric consistency. The population field is a late-2010s estimate — the United States attribute is 328,239,523 — and is used only as a weight, not as a 2026 headcount."
	},
	{
		id: "model",
		status: "loaded",
		name: "Meridian formula module",
		publisher: "This page",
		series: "Constructed indexes, 2016–2026",
		published: "Ships with the page. Not a statistical release.",
		url: "",
		why: "Most readings are identities in code, not downloaded cells. The page can show the exact expression. A published composite that hid its weights would be worse for a definition-first atlas."
	},
	{
		id: "anchors",
		status: "loaded",
		name: "Hand anchors",
		publisher: "This page",
		series: "22 subregional medians and about 98 country overrides, aimed at a 2024-shaped level",
		published: "Compiled into the app. Not a vintage of any one table.",
		url: "",
		why: "Countries that sit far from their region (Singapore, South Africa, Argentina, Ukraine) cannot inherit a median. Overrides exist only where a public profile is widely known to differ. Everyone else stays on the subregional median on purpose, so the long tail is not fake precision."
	},
	{
		id: "pins",
		status: "loaded",
		name: "Macro pins",
		publisher: "This page, shaped to published national-accounts orders of magnitude",
		series: "Real GDP growth, CPI inflation, and sometimes unemployment for 28 economies and selected years",
		published: "Inside the app. 2019–2025 pins follow the public path of those crises. 2026 pins are a nowcast written earlier than, and not row-imported from, the IMF October 2026 World Economic Outlook.",
		url: "",
		why: "The pandemic drop and the 2022 price shock are large enough that a smooth anchor would be misleading. Pins override the formula only for those three macro fields, and only where a pin exists. They are not a claim that every decimal matches a later IMF vintage."
	},
	{
		id: "imf",
		status: "reference",
		name: "World Economic Outlook, October 2026",
		publisher: "International Monetary Fund",
		series: "Real GDP growth; inflation, average consumer prices; unemployment where the WEO reports it",
		published: "eLibrary record dated 12 October 2026. Public release page dated 13 October 2026. Title: Resilience Under Strain, Urgent Choices. ISBN 9798229055079. DOI 10.5089/9798229055079.081.",
		url: "https://www.imf.org/en/publications/weo/issues/2026/10/13/world-economic-outlook-october-2026",
		why: "Right family for real growth, CPI inflation, and a comparable unemployment concept across countries. The October 2026 edition puts world real GDP growth at 3.1% in 2026 and world inflation at 4.7%. Chosen over a single national statistical office because one source covers the map. Not row-imported: this page does not call the IMF API, and its 2026 country pins can differ from that vintage."
	},
	{
		id: "wdi",
		status: "reference",
		name: "World Development Indicators",
		publisher: "World Bank",
		series: "GDP per capita, PPP (the NY.GDP.PCAP.PP family); urban population share",
		published: "Continuously updated database. No single snapshot was downloaded into this build. Reviewed as the correct family on 19 October 2026.",
		url: "https://databank.worldbank.org/source/world-development-indicators",
		why: "PPP income is the right level concept for 'what a typical income buys' across countries. Current-dollar GDP was rejected as the income ladder because exchange rates move the ranking without moving local living standards. Not row-imported. The page compounds a 2024-shaped PPP anchor with its own real-growth path."
	},
	{
		id: "wpp",
		status: "reference",
		name: "World Population Prospects 2024",
		publisher: "UN DESA, Population Division",
		series: "Population, median age, population growth. Summary of Results, UN DESA/POP/2024/TR/NO. 9",
		published: "July 2024 (posted 11–12 July 2024). Twenty-eighth edition. Estimates draw on 1,910 censuses (1950–2023) and 3,189 nationally representative surveys. Medium variant is the usual projection.",
		url: "https://desapublications.un.org/publications/world-population-prospects-2024-summary-of-results",
		why: "The official global demographic set. Chosen over national statistical offices for coverage, and over Natural Earth population for recency. Not joined yet: the map weight still uses the Natural Earth attribute so weights and polygons stay one file. A later update can swap weights after an ISO crosswalk."
	},
	{
		id: "ilo",
		status: "reference",
		name: "ILOSTAT modelled estimates",
		publisher: "International Labour Organization",
		series: "Unemployment rate, modelled",
		published: "ILOSTAT is updated through the year. No ILO extract was loaded. Reviewed as the right labor-slack family on 19 October 2026.",
		url: "https://ilostat.ilo.org/",
		why: "National unemployment definitions differ (who counts as looking for work). ILO modelled estimates are the comparable series. Used as the concept the unemployment field is aiming at. Pins and anchors are not an ILO download. South Africa's very high reading is treated as structural, which is why its anchor barely moves with the global shock."
	},
	{
		id: "wgi",
		status: "reference",
		name: "Worldwide Governance Indicators, 2026 update",
		publisher: "World Bank",
		series: "Six perception composites, 1996–2025, from 35 sources and more than 400 underlying indicators",
		published: "2026 update. Cite as: Worldwide Governance Indicators, 2026 Update, World Bank (www.govindicators.org). Method note: World Bank (2026), “The Worldwide Governance Indicators: Methodology for Measuring Governance Using Perception Data.” Prior method: Kaufmann and Kraay (2024).",
		url: "https://www.worldbank.org/en/publication/worldwide-governance-indicators",
		why: "Best single public composite for 'are the rules predictable.' Governance, trust, ease of business, and corruption pressure on this page are formulas around an anchor, not a rescaled WGI estimate. WGI was not imported. The Bank's own advisory says the indicators are a lens, not a credit rating. This page treats them the same way."
	},
	{
		id: "whr",
		status: "reference",
		name: "World Happiness Report 2026",
		publisher: "Wellbeing Research Centre, University of Oxford, with Gallup, the UN Sustainable Development Solutions Network, and the WHR editorial board",
		series: "Cantril ladder life evaluation, Gallup World Poll, national samples in roughly 140 countries",
		published: "19 March 2026 (press release the same day; author event 20 March 2026). 14th edition. Finland's reported ladder average in that release is 7.764 out of 10.",
		url: "https://www.worldhappiness.report/",
		why: "The life-satisfaction number people mean when they say 'happiness ranking.' Chosen over social-media mood because it is a nationally representative survey question, asked the same way. Not imported. Life satisfaction here is a constructed index from living, safety, cost, and conflict. It will not match the ladder."
	},
	{
		id: "oecd",
		status: "reference",
		name: "OECD Better Life Index and national accounts companions",
		publisher: "OECD",
		series: "Work-life balance, housing, safety, education, among member and partner countries",
		published: "OECD.Stat / Better Life is updated by dataset. Not downloaded.",
		url: "https://www.oecdbetterlifeindex.org/",
		why: "Useful definitions for work-life and housing among rich countries. Rejected as the world map's spine because it does not cover most of the territories on this coastlines file."
	},
	{
		id: "itu",
		status: "reference",
		name: "ITU facts and figures / UN E-Government Survey family",
		publisher: "International Telecommunication Union; UN DESA for e-government",
		series: "Individuals using the internet, broadband, e-government development",
		published: "ITU publishes an annual facts-and-figures note. Not downloaded.",
		url: "https://www.itu.int/en/ITU-D/Statistics/Pages/facts/default.aspx",
		why: "Right concept for digital infrastructure. The page instead moves an anchor up a little each year, with a step in 2020. That is a trend assumption, not an ITU country score."
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
		notUsedBecause: "A weekly event feed needs a maintained pipeline, a geographic join, and a decision about protests versus battles. This page has none of that. Conflict is an anchored index plus a few story shocks (Ukraine from 2022, Israel and Palestine from 2023, Sahel from 2022, Ethiopia 2021–2023). It is not an incident map."
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
		notUsedBecause: "Sanctions friction here is a short fixed list (Russia, Iran, DPRK, Syria, Venezuela, Belarus, Myanmar, Cuba, Sudan, Afghanistan) plus a formula for everyone else. Russia is floored at 84 from 2022 and Belarus at 70 from 2022. It is not a compliance screen and it does not read the live list."
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
		notUsedBecause: "Importing it and also building corruption as 102 − 0.86×governance + 0.1×conflict would double-count one perception. The formula is disclosed instead. It is not the CPI score."
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
		notUsedBecause: "Contributors are whoever opens the site. Cities with many expats are over-sampled. Rejected as a primary series. Housing and cost on this page move off an anchor when inflation and the post-2021 housing nudge move. That is still a model, but it is not a scrape of restaurant menus."
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
		notUsedBecause: "No post was read in order to color the map. The source-blend sliders reweight a formula: social mood mixes the metric's own level with the sentiment index; news momentum exaggerates the year-to-year change. Discourse themes are the same formulas turned into word shares. A separate live panel does call Google Trends' daily RSS, Google News RSS, Wikipedia pageviews, the World Bank API, and Hacker News. Those responses are labeled and are not blended into the choropleth. Reddit and Bluesky returned 403 from this host. GDELT rate-limited the request."
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
		notUsedBecause: "Not connected, not shown, and not a source. Illicit-economy pressure is a public-style index from governance, income, and conflict. It is not a market listing. The live panel does not add a hidden-service crawl."
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
		notUsedBecause: "It does not recolor the map. Interest over time is the 12-month 0–100 index. The daily RSS is a separate today-list. A refusal is left blank."
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
		notUsedBecause: "Called only when a key is pasted in the briefing or set on the server. Volume is not estimated from Wikipedia or Google Trends."
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
		notUsedBecause: "Called only when a key is pasted in the briefing or set on the server. Keyword difficulty is not guessed."
	},
	{
		id: "wiki",
		status: "live",
		name: "Wikimedia pageviews",
		publisher: "Wikimedia Foundation",
		series: "English Wikipedia, user pageviews, monthly",
		published: "Fetched for artificial intelligence, large language model, ChatGPT, and the open metric's article.",
		url: "https://wikimedia.org/api/rest_v1/",
		why: "A public frequency series with a real trend. It moves with search interest. It is not search volume."
	},
	{
		id: "gnews",
		status: "live",
		name: "Google News RSS",
		publisher: "Google",
		series: "Headlines matching a query over seven days",
		published: "Fetched with the open metric and with 'artificial intelligence'.",
		url: "https://news.google.com/",
		why: "A live headline list. A count of headlines is not a tone model and is not a share of discourse."
	},
	{
		id: "hn",
		status: "live",
		name: "Hacker News search",
		publisher: "Y Combinator, via Algolia",
		series: "Stories matching the query, with points and comment counts",
		published: "Fetched live. A technical public.",
		url: "https://hn.algolia.com/api",
		why: "The social feed that answers from this host. Reddit and Bluesky returned 403, so they are not presented as empty success."
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
		notUsedBecause: "Not copied into the anchors. The map does not switch to these cells."
	}
];
var SEARCHES = [
	{
		when: "19 October 2026",
		engine: "Web index, then the publisher's own site",
		query: "IMF World Economic Outlook October 2026 release date GDP inflation",
		opened: "IMF eLibrary book 9798229055079; IMF publications page for the 13 October 2026 issue; IMF DataMapper WEO October 2026 profile.",
		kept: "Citation, ISBN, DOI, and the world aggregates (growth 3.1%, inflation 4.7%). Country rows were not copied in."
	},
	{
		when: "19 October 2026",
		engine: "Web index, then Gallup and worldhappiness.report",
		query: "World Happiness Report 2026 publication date Gallup World Poll",
		opened: "Gallup analytics page; WHR launch-events note (4 March 2026) announcing the 19 March 2026 release; the 19 March 2026 press release.",
		kept: "Publisher, date, survey name, and the fact that life satisfaction on this page is not that ladder."
	},
	{
		when: "19 October 2026",
		engine: "Web index, then naturalearthdata.com",
		query: "Natural Earth 50m admin 0 countries latest version",
		opened: "1:50m Cultural Vectors download page.",
		kept: "Version 5.1.1, public domain, de-facto boundaries. Confirms the coastline file's family."
	},
	{
		when: "19 October 2026",
		engine: "Web index, then UN DESA publications and a ReliefWeb mirror",
		query: "UN World Population Prospects 2024 revision",
		opened: "UN DESA publications page for the Summary of Results; ReliefWeb repost dated 12 July 2024.",
		kept: "July 2024 date, document number, census and survey counts. Population weights on the map were still not switched, for the join reason under Natural Earth."
	},
	{
		when: "19 October 2026",
		engine: "Web index, then worldbank.org",
		query: "World Bank Worldwide Governance Indicators update",
		opened: "WGI home, documentation, and updates pages.",
		kept: "2026 update exists, covers 1996–2025, 35 sources, 400+ indicators, and a usage advisory. Scores were not downloaded."
	},
	{
		when: "19 October 2026",
		engine: "Direct request from the page's host",
		query: "Google Trends RSS, Google News RSS, Wikipedia pageviews, World Bank indicator API, Hacker News Algolia, Google Trends explore, Reddit, Bluesky, GDELT",
		opened: "trends.google.com/trending/rss; news.google.com/rss; wikimedia pageviews; api.worldbank.org; hn.algolia.com; trends explore; reddit.com; public.api.bsky.app; api.gdeltproject.org.",
		kept: "RSS trends, news headlines, pageview counts, World Bank rows, and Hacker News stories are wired as live and labeled. Interest-over-time (explore, then the multiline widget) returned 200 after a warm GET to trends.google.com. Related queries use the same cookie jar and stay empty if Google answers 429. Reddit and Bluesky returned 403. GDELT returned a rate-limit message. Semrush and Ahrefs are called only after a key is pasted; none was present, so no volume was returned."
	}
];
var NOT_SEARCHED = [
	"No Scopus, Web of Science, PubMed, JSTOR, or Google Scholar systematic review. The field guide is a shelf of names those literatures already use. It is not a citation count.",
	"No X keyword search and no TikTok. Reddit and Bluesky were requested and returned 403. GDELT was requested and rate-limited. None of those failures was filled with a made-up count.",
	"No Semrush or Ahrefs volume without a key. A key can be pasted in the briefing and is not written into the share link. Volume and keyword difficulty stay blank until that call succeeds.",
	"No national statistical office bulk downloads (BEA, ONS, Destatis, and the rest) beyond the orders of magnitude already baked into pins. The live World Bank rows are separate and are not written back into the pins.",
	"No central-bank speech scrape and no earnings transcripts.",
	"No dark-web request."
];
var WORDS = {
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
	pin: "A typed-in macro number that replaces the formula for that country-year. Only growth, inflation, and unemployment can be pinned."
};
var FORMULAS = {
	lwi: {
		calc: "LWI = 0.36×living + 0.30×working + 0.34×investing, then clamped to 0–100. The weights are a choice: living slightly ahead of investing, working just behind. They are not estimated from a regression.",
		sources: ["model", "anchors"],
		notThis: "Not the UN Human Development Index, not the Legatum Prosperity Index, and not a World Bank score."
	},
	living: {
		calc: "Start at the living anchor. Add the global year nudge and any country story nudge. Add jitter of ±0.7. Clamp to 3–98. Safety is then pulled toward this result; living itself is not rebuilt from safety, health, and education each year (those are sibling fields).",
		sources: ["anchors", "model"],
		notThis: "Not a household survey of life quality."
	},
	working: {
		calc: "Working anchor + global nudge + story nudge + jitter ±0.7. Clamp 3–98.",
		sources: ["anchors", "model"],
		notThis: "Not the employment-to-population ratio and not average wages."
	},
	investing: {
		calc: "Investing anchor + global nudge + story nudge + jitter ±0.8. Clamp 2–98. Story shocks cut this hard for Ukraine (from 2022), Russia (from 2022), China property (from 2022), and the Sahel (from 2022).",
		sources: ["anchors", "model"],
		notThis: "Not a stock-market return and not FDI in dollars."
	},
	sentiment: {
		calc: "0.34×living + 0.22×working + 0.16×investing + 0.16×(100−conflict) + 0.024×(100−min(inflation, 45)) + global and story sentiment nudges + jitter ±0.8. Clamp 2–98. The inflation term is small on purpose: prices already move cost and wages elsewhere.",
		sources: ["model"],
		notThis: "Not a Gallup poll and not a count of posts."
	},
	momentum: {
		calc: "50 + 2.4×(this year's LWI − last year's LWI). Clamp 0–100. Fifty means 'no change.' The first year (2016) is 50 because there is no prior year inside the page.",
		sources: ["model"],
		notThis: "Not a purchasing-managers index."
	},
	gdpGrowth: {
		calc: "Anchor growth + global growth nudge + story nudge + jitter ±0.25 percentage points. Clamp −40 to 16. If a macro pin exists for that country-year, the pin replaces this result entirely.",
		sources: [
			"pins",
			"anchors",
			"imf"
		],
		notThis: "Not a live IMF print. World growth in the October 2026 WEO is 3.1%; this page does not force every country to add up to that."
	},
	inflation: {
		calc: "Anchor inflation + global nudge + story nudge + jitter ±0.18. Clamp −2 to 220. A pin replaces it. Tourist economies get an extra growth and tourism hit in 2020–21, not an extra inflation formula. Energy exporters get −1.2 on inflation in 2022–23 as a story nudge, before any pin.",
		sources: [
			"pins",
			"imf",
			"anchors"
		],
		notThis: "Not monthly CPI and not a consumer basket you can shop."
	},
	unemployment: {
		calc: "Anchor + (global nudge + story nudge) × slack + jitter ±0.18. Slack is 0.3 if the anchor is already above 18% (so South Africa does not absorb the global cycle twice) and 1 otherwise. Clamp 0.3–48. A pin replaces it.",
		sources: [
			"pins",
			"ilo",
			"anchors"
		],
		notThis: "Not the ILO modelled estimate line, and not a claimant count."
	},
	ppp: {
		calc: "Take the 2024 PPP anchor. Walk forward by multiplying by (1 + real GDP growth/100) for each later year. Walk backward by dividing by (1 + that year's growth/100). If a backward step would be −90% or worse, use −50% so a crisis does not explode the history. Clamp between $400 and $250,000.",
		sources: [
			"anchors",
			"wdi",
			"model"
		],
		notThis: "Not the World Bank's published PPP series. Nominal dollar GDP was rejected as the ladder."
	},
	debt: {
		calc: "If the country is in the hand table (Japan 88, Greece 80, Italy 74, United States 70, and a short list of others), use that. Otherwise 40 + 0.22×(100−governance). Add 4 points in 2020, 2021, and 2022. Clamp 8–96. Higher means heavier, so the color treats it as a burden.",
		sources: [
			"anchors",
			"model",
			"imf"
		],
		notThis: "Not the IMF general-government debt-to-GDP ratio. Japan's high reading is a level choice, not this year's fiscal outturn."
	},
	currency: {
		calc: "96 − 1.05×min(inflation, 60) − 0.10×conflict + 0.08×governance. Clamp 2–98. A price spike is most of the score. Higher means more stable.",
		sources: ["model"],
		notThis: "Not the exchange rate versus the dollar and not reserves in months of imports."
	},
	external: {
		calc: "52 + 8 if tourism is above 75, else 0; plus 0.20×(openness−50); minus 0.30×max(0, inflation−8). Clamp 6–94.",
		sources: ["model"],
		notThis: "Not the current-account balance in percent of GDP."
	},
	cost: {
		calc: "Cost anchor + 0.28×global housing nudge + 0.22×max(0, inflation−4). Clamp 8–98. Higher means more expensive relative to the way the index is built, which is why the map treats 'higher' as worse.",
		sources: ["anchors", "model"],
		notThis: "Not a Numbeo index and not a local CPI level."
	},
	housing: {
		calc: "0.70×cost anchor + global housing nudge + story housing nudge + 3 if the year is 2022 or later. Clamp 6–99. Higher means less affordable.",
		sources: ["anchors", "model"],
		notThis: "Not a price-to-income ratio from the OECD or the Dallas Fed housing series."
	},
	purchasing: {
		calc: "0.62×income level + 0.38×(100−cost). Clamp 0–100. Income is itself a log ladder of PPP.",
		sources: ["model", "wdi"],
		notThis: "Not household consumption per head from national accounts."
	},
	income: {
		calc: "Log ladder of PPP. Score = 100 × (ln(PPP) − ln(1100)) / (ln(120000) − ln(1100)), clamped 0–100. A log is used so a jump from $2,000 to $4,000 matters about as much as a jump from $40,000 to $80,000.",
		sources: ["model", "wdi"],
		notThis: "Not median household income and not wages."
	},
	confidence: {
		calc: "0.50×sentiment + 0.25×working + 0.25×currency stability. Clamp 2–98.",
		sources: ["model"],
		notThis: "Not the University of Michigan survey or the European Commission consumer confidence index."
	},
	ease: {
		calc: "0.34×governance + 0.28×openness + 0.22×SME credit + 0.16×(100−tax burden). Clamp 2–98.",
		sources: ["model", "wgi"],
		notThis: "Not the discontinued World Bank Doing Business score, and not its successor B-READY, which was not imported."
	},
	startups: {
		calc: "0.62×venture + 0.20×digital + 0.12×working. Clamp 2–98.",
		sources: ["model"],
		notThis: "Not new-firm registrations from a business registry."
	},
	fdi: {
		calc: "0.42×investing + 0.32×openness + 0.22×governance − 0.18×conflict. Clamp 2–98.",
		sources: ["model"],
		notThis: "Not UNCTAD FDI flows in dollars."
	},
	tax: {
		calc: "Tax anchor + jitter ±0.3. Clamp 4–92. Higher means a heavier take, so the color treats higher as worse. The anchor is a feel-of-burden score, not the statutory corporate rate.",
		sources: ["anchors"],
		notThis: "Not OECD tax-to-GDP and not a headline corporate tax rate."
	},
	credit: {
		calc: "0.48×governance + 0.24×openness + 0.16×(100−conflict). Clamp 4–96. This is SME credit access, not sovereign bond yields.",
		sources: ["model", "wgi"],
		notThis: "Not the IMF financial-access survey and not domestic credit to the private sector as a percent of GDP."
	},
	bizMomentum: {
		calc: "50 + 3×real GDP growth + 0.35×(investing−55). Clamp 2–98. Fifty is neutral.",
		sources: ["model"],
		notThis: "Not a PMI."
	},
	popGrowth: {
		calc: "Population-growth anchor, minus 0.12 percentage points in 2020 only. Clamp −1.6 to 4.2.",
		sources: ["anchors", "wpp"],
		notThis: "Not the UN World Population Prospects growth rate. The 2020 dip is a single assumption."
	},
	medianAge: {
		calc: "Age anchor + (year−2024)×pace. Pace is 0.05 years per calendar year if the anchor age is under 24, otherwise 0.13. Clamp 15–56. Young countries age more slowly in this formula because their age structure is still wide at the bottom.",
		sources: ["anchors", "wpp"],
		notThis: "Not the UN median age by year."
	},
	urban: {
		calc: "Urban anchor + 0.12×(year−2016). Clamp 0–100. A slow, even rise. No country is allowed to urbanize in a jump.",
		sources: ["anchors", "wdi"],
		notThis: "Not the World Bank urban-population percent series."
	},
	migration: {
		calc: "0.34×living + 0.24×working + 0.20×openness + 0.16×safety − 0.22×conflict. Clamp 0–100. Higher means more pull.",
		sources: ["model"],
		notThis: "Not net migration from UN WPP and not asylum applications."
	},
	workingAge: {
		calc: "A curve of median age, not a census tabulation. Under 22: 54 + 0.7×(age−16). From 22 to 36: 60 + 0.4×(age−22). After 36: 66 − 0.55×(age−36), clamped 50–70. The hump in the middle is the demographic dividend shape, drawn by hand.",
		sources: ["model", "wpp"],
		notThis: "Not the UN share of people aged 15–64."
	},
	lifeSat: {
		calc: "0.50×living + 0.22×safety + 0.12×(100−cost) + 0.16×(100−conflict). Clamp 2–98.",
		sources: ["model", "whr"],
		notThis: "Not the Gallup Cantril ladder and not the World Happiness Report rank. Finland's 7.764 in the 2026 report is a survey mean on a 0–10 scale; this field is a 0–100 construct."
	},
	trust: {
		calc: "0.72×governance + 0.18×safety − 0.16×conflict. Clamp 2–98.",
		sources: ["model", "wgi"],
		notThis: "Not the World Values Survey question on trusting parliament, and not a WGI estimate."
	},
	optimism: {
		calc: "0.62×sentiment + 0.24×investing + 0.14×working. Clamp 2–98.",
		sources: ["model"],
		notThis: "Not a consumer-expectations survey."
	},
	workLife: {
		calc: "0.40×living + 0.28×labor protections + 0.18×(100−housing pressure) + 0.08×(100−job-market heat). Clamp 4–96. Higher means more room outside work.",
		sources: ["model", "oecd"],
		notThis: "Not OECD hours worked."
	},
	riskAppetite: {
		calc: "0.40×investing + 0.30×venture + 0.10×(100−governance) + 0.40×(40−min(median age, 50)). Clamp 2–96. Younger and less rule-bound places score as more willing to take a chance. That is a cultural assumption, not a trading position.",
		sources: ["model"],
		notThis: "Not equity-risk premium and not a venture-capital survey."
	},
	cohesion: {
		calc: "0.40×safety + 0.35×trust + 0.25×(100−conflict). Clamp 2–98.",
		sources: ["model"],
		notThis: "Not a social-trust survey item."
	},
	safety: {
		calc: "Safety anchor + 0.22×(living − living anchor) − 0.18×max(0, conflict − conflict anchor). Clamp 3–98.",
		sources: ["anchors", "model"],
		notThis: "Not homicide rates from UNODC and not Numbeo crime."
	},
	health: {
		calc: "Health anchor, minus 6 in 2020 and minus 2 in 2021, otherwise unchanged. Clamp 4–98. The pandemic is a two-year notch, not a disease model.",
		sources: ["anchors", "model"],
		notThis: "Not healthy life expectancy, not hospital beds, and not a COVID death rate."
	},
	education: {
		calc: "Education anchor + jitter ±0.25. Clamp 4–98. Almost flat through time on purpose.",
		sources: ["anchors"],
		notThis: "Not PISA scores and not mean years of schooling from the UNDP."
	},
	environment: {
		calc: "68 − 0.22×(100−governance) − 0.10×urban − 0.08×conflict, plus 8 if the country is in Europe. China and India then lose 12. Clamp 6–96. A zone of type industrial or resource later loses 7 more; a tourist zone gains 3.",
		sources: ["model"],
		notThis: "Not PM2.5 from the WHO or IQAir, and not the Yale Environmental Performance Index."
	},
	transit: {
		calc: "0.28×urban + 0.32×governance, plus 16 for Japan, Korea, Singapore, Hong Kong, Switzerland, Netherlands, France, Germany, Spain, Taiwan; plus 8 for other European countries; minus 12 for the United States. Clamp 6–96.",
		sources: ["model"],
		notThis: "Not kilometers of rail and not a transit-agency ridership feed."
	},
	digital: {
		calc: "Digital anchor + 2.5 if the year is 2020 or later + 0.30×(year−2016) + jitter ±0.4. Clamp 4–99.",
		sources: ["anchors", "itu"],
		notThis: "Not ITU percent-of-people-online."
	},
	culture: {
		calc: "0.48×tourism + 0.28×living + 0.12×urban. Clamp 6–98.",
		sources: ["model"],
		notThis: "Not a count of museums, restaurants, or UNESCO sites."
	},
	climate: {
		calc: "A hand table for countries where latitude would lie (Britain, the Gulf, the Nordics, the Mediterranean). Otherwise 94 − 1.65×| |latitude| − 26 |, clamped 16–92. The formula prefers latitudes near 26 degrees. That is a comfort sketch, not heating-degree days.",
		sources: ["model"],
		notThis: "Not Copernicus climate reanalysis and not a wet-bulb temperature."
	},
	wage: {
		calc: "0.62×inflation + 0.28×max(real growth, −4). Clamp −4 to 80. Nominal wage pace. It can be high just because prices are high.",
		sources: ["model"],
		notThis: "Not an employer survey and not real wages. Real wages would subtract inflation; this field does not."
	},
	jobHeat: {
		calc: "78 − 1.55×unemployment + 1.8×real growth. Clamp 2–98. Higher means a tighter hiring market.",
		sources: ["model", "ilo"],
		notThis: "Not vacancies per unemployed person."
	},
	remote: {
		calc: "0.46×digital + 0.34×global-language access + 0.16×(100−conflict) + 5 if the year is 2020 or later. Clamp 0–100.",
		sources: ["model"],
		notThis: "Not a visa-policy database and not a count of coworking desks."
	},
	talent: {
		calc: "0.40×education + 0.28×working + 0.20×digital + 0.12×urban. Clamp 0–100.",
		sources: ["model"],
		notThis: "Not tertiary attainment from UNESCO and not a LinkedIn skills graph."
	},
	labor: {
		calc: "38 + 18 if the country is in Europe + 0.35×(governance−60). Clamp 12–92. The Europe step is a blunt legal-tradition assumption, not a reading of each labor code.",
		sources: ["model"],
		notThis: "Not ILO employment-protection legislation scores."
	},
	language: {
		calc: "The language anchor, unchanged across years. Clamp 0–100. It is 'can an outsider operate in a widely used business language,' not the number of languages spoken at home.",
		sources: ["anchors"],
		notThis: "Not Ethnologue and not EF English Proficiency Index ranks, which were not imported."
	},
	market: {
		calc: "48 + 3.1×real growth + 0.35×(investing−50) + 0.15×(sentiment−50). Clamp 2–98. Risk-asset mood. Not a price.",
		sources: ["model"],
		notThis: "Not an equity index return. Do not read it as a forecast."
	},
	realestate: {
		calc: "0.34×(100−housing pressure) + 0.26×governance + 0.20×tourism + 0.20×investing. Clamp 2–98. High means a balance of demand and rules, not 'prices will rise.'",
		sources: ["model"],
		notThis: "Not a house-price index and not a cap rate."
	},
	venture: {
		calc: "0.50×investing + 0.18×openness + 0.12×digital + global venture nudge + story venture nudge. Clamp 0–100. Tech-hub story adds +4 in 2023 and +6 from 2024 for a fixed set (United States, India, Singapore, Korea, Taiwan, Israel, and a short rich-country list).",
		sources: ["model"],
		notThis: "Not PitchBook, Crunchbase, or CB Insights dollars."
	},
	policy: {
		calc: "0.62×governance + 0.24×(100−conflict) + 0.14×openness. Clamp 2–98.",
		sources: ["model", "wgi"],
		notThis: "Not a political-risk vendor score (not PRS, not Eurasia Group)."
	},
	openness: {
		calc: "Openness anchor + story nudge + jitter ±0.4. Clamp 2–99. Russia loses 22 from 2022 via the story, before the sanctions floor is applied separately.",
		sources: ["anchors", "model"],
		notThis: "Not the Fraser Institute or Heritage economic-freedom index, and not the trade-openness ratio (exports+imports)/GDP."
	},
	tourism: {
		calc: "Tourism anchor + global nudge + story nudge + jitter ±0.8. Clamp 0–100. Places in the hand-kept tourist set take an extra −16 in 2020 and −8 in 2021.",
		sources: ["anchors", "model"],
		notThis: "Not UN Tourism arrival counts."
	},
	discourse: {
		calc: "22 + 7×log10(population + 50) + 12 in 2020 + 9 in 2022 + 0.12×conflict. Clamp 6–98. Louder places are larger, plus crisis years. The log stops China and India from owning the entire scale.",
		sources: ["model", "ne"],
		notThis: "Not a count of articles or posts. Population is the Natural Earth attribute, so this loudness is on the late-2010s headcount."
	},
	socialTone: {
		calc: "0.70×sentiment + 0.20×(100−conflict) − 0.35×min(inflation, 40). Clamp 2–98. Higher means warmer.",
		sources: ["model", "social"],
		notThis: "Not a sentiment model on text. No posts were read."
	},
	conflict: {
		calc: "Conflict anchor + global nudge + story nudge + jitter ±0.35. Clamp 0–100. Higher means more exposure. Story floors do the real work for active wars; the anchor does the rest.",
		sources: ["anchors", "acled"],
		notThis: "Not ACLED event counts and not battle deaths from UCDP."
	},
	corruption: {
		calc: "102 − 0.86×governance + 0.10×conflict. Clamp 3–98. Higher means more pressure. Almost the mirror of governance, by construction.",
		sources: [
			"model",
			"cpi",
			"wgi"
		],
		notThis: "Not the Transparency International CPI. If you need the CPI, use the CPI."
	},
	cyber: {
		calc: "After income exists: 0.40×digital + 0.30×income level + 0.22×(100−governance). Clamp 4–96. Rich, connected, lower-governance places score as more exposed. Higher means more exposure, so the color treats it as a burden.",
		sources: ["model"],
		notThis: "Not an incident feed (not Mandiant, not CSIS, not a CERT). The blurb on the metric says the same thing."
	},
	informal: {
		calc: "96 − 0.40×governance − 0.38×income level + 0.12×conflict. Clamp 4–97. Higher means a heavier informal and illegal share of economic life, as a public-style guess.",
		sources: ["model", "dark"],
		notThis: "Not a dark-web crawl and not IMF informality estimates, which were not imported."
	},
	sanctions: {
		calc: "A fixed score if the country is on the short list (DPRK 90, Syria 82, Russia 78, Iran 74, Belarus 66, Venezuela 58, Myanmar 50, Cuba 42, Sudan 40, Afghanistan 34). Otherwise 0.18×(100−openness) + 0.12×conflict, clamped 0–42 so unsanctioned countries cannot look like sanctioned ones. From 2022, Russia is at least 84 and Belarus at least 70.",
		sources: ["model", "ofac"],
		notThis: "Not the OFAC SDN list and not legal advice. A low score is not a license to transact."
	},
	governance: {
		calc: "Governance anchor + story nudge + jitter ±0.45. Clamp 4–98. Higher means more state capacity and more predictable rules.",
		sources: ["anchors", "wgi"],
		notThis: "Not a WGI estimate (those run roughly −2.5 to +2.5). Not rescaled onto that range."
	}
};
var GROUP_TIPS = {
	Index: {
		title: "Index group",
		definition: "The six summary scores. Three pillars, their weighted sum (LWI), a mood score that can disagree with the hard series, and a momentum score centered on 50.",
		words: [{
			word: "Pillar",
			meaning: "One of living, working, investing. A bundle, not a single official series."
		}, {
			word: "Index",
			meaning: WORDS.index
		}],
		calculation: "See each score's own question mark. LWI is 36/30/34 on the three pillars.",
		notThis: "Not a licensed product of any development bank.",
		why: "Grouped first because every other group is an ingredient or a cousin of these six.",
		sourceIds: ["model"]
	},
	Macro: {
		title: "Macro group",
		definition: "The national-accounts family: growth, prices, jobs, PPP income, debt feel, currency, and the external position.",
		words: [{
			word: "Macro",
			meaning: "The whole economy, not a household and not a firm."
		}, {
			word: "Real",
			meaning: "After inflation. Real GDP growth is volume, not the rise in prices."
		}],
		calculation: "Growth, inflation, and unemployment can be replaced by a pin. The other four are formulas. None are downloaded cells.",
		notThis: "Not the IMF WEO workbook.",
		why: "These are the only fields where a published number has a standard meaning, so the page is strictest here about what was not imported.",
		sourceIds: [
			"pins",
			"imf",
			"wdi",
			"ilo"
		]
	},
	Household: {
		title: "Household group",
		definition: "What day-to-day money feels like: costs, housing, what income buys, where income sits, and whether households will plan ahead.",
		words: [{
			word: "Household",
			meaning: "People spending and saving, not the government and not firms."
		}, {
			word: "Purchasing power",
			meaning: "Income after local costs, on the index scale. Not a FX conversion."
		}],
		calculation: "All five are formulas off anchors, inflation, and the PPP ladder. See each item.",
		notThis: "Not a household budget survey.",
		why: "Separated from macro so a high-GDP country can still read as expensive.",
		sourceIds: ["model", "anchors"]
	},
	Business: {
		title: "Business group",
		definition: "Operating climate for firms: rules, new-firm energy, foreign-capital pull, tax feel, small-firm credit, and whether that climate is heating.",
		words: [{
			word: "SME",
			meaning: "Small and medium-sized enterprises. Firms too small to tap bond markets."
		}, {
			word: "FDI",
			meaning: "Foreign direct investment: long-horizon money that buys or builds a lasting stake, not a short portfolio trade."
		}],
		calculation: "Formulas. Ease is not Doing Business. FDI attractiveness is not a dollar flow.",
		notThis: "Not a chamber-of-commerce survey.",
		why: "Kept apart from investing so 'easy to run a shop' is not the same claim as 'easy to raise venture money.'",
		sourceIds: ["model", "wgi"]
	},
	Demographics: {
		title: "Demographics group",
		definition: "People as a structure: growth, age, cities, pull on migrants, and the rough share in prime working years.",
		words: [{
			word: "Median age",
			meaning: "The age where half the people are younger and half are older. Not the average, which a few very old people can drag up."
		}, {
			word: "Urbanization",
			meaning: "Share of life organized in cities, on a 0–100 index. Not the official urban percent."
		}],
		calculation: "Anchors plus a slow time rule. The UN WPP 2024 is the reference and is not loaded.",
		notThis: "Not a census extract.",
		why: "Age structure changes too slowly to invent a crisis path. The formulas are almost flat on purpose.",
		sourceIds: [
			"anchors",
			"wpp",
			"ne"
		]
	},
	Psychographics: {
		title: "Psychographics group",
		definition: "Stated and implied mood: contentment, trust in institutions, optimism, room for a life outside work, willingness to take a chance, and trust among people.",
		words: [{
			word: "Psychographics",
			meaning: "Attitudes and preferences, as opposed to age or income. Here they are inferred from other scores, not asked."
		}, {
			word: "Institution",
			meaning: "Courts, the civil service, the police, the statistics office. Not a single politician."
		}],
		calculation: "Each is a weighted sum of pillars and risk scores. No microdata.",
		notThis: "Not the World Values Survey and not the Gallup World Poll.",
		why: "Included because living and investing conditions are not the same as how people feel about them. The gap is the point of having both.",
		sourceIds: [
			"model",
			"whr",
			"wgi"
		]
	},
	Living: {
		title: "Living group",
		definition: "The ingredients of the living pillar as their own map layers: safety, care, schooling, environment, transit, digital networks, culture, and climate comfort.",
		words: [{
			word: "Living",
			meaning: "Daily life outside the paycheck and outside the investment case."
		}],
		calculation: "Mostly anchors. Health has a pandemic notch. Digital drifts up. Climate is latitude plus a hand table.",
		notThis: "Not the living pillar itself. The pillar is a separate anchor, not the average of these eight.",
		why: "So you can see a safe country with a harsh climate, or a cultured city that is hard to cross without a car.",
		sourceIds: ["anchors", "model"]
	},
	Working: {
		title: "Working group",
		definition: "Labor-market texture: wage pace, hiring heat, remote practicality, talent thickness, formal protections, and language access.",
		words: [{
			word: "Nominal",
			meaning: "In money, before subtracting inflation. Wage growth here is nominal."
		}],
		calculation: "Wages are a function of inflation and growth, so they are not an independent survey.",
		notThis: "Not the working pillar. Same warning as living: the pillar is its own anchor.",
		why: "A tight job market can still pay wages that lose to prices. These fields can disagree, and should.",
		sourceIds: ["model"]
	},
	Investing: {
		title: "Investing group",
		definition: "Capital texture: market mood, property balance, venture activity, policy predictability, openness, and the visitor economy as an asset.",
		words: [{
			word: "Openness",
			meaning: "How freely capital, talent, and trade cross the border. Not a moral verdict."
		}],
		calculation: "Formulas off governance, conflict, tourism, and the investing anchor.",
		notThis: "Not the investing pillar, and not a return forecast.",
		why: "Split out so tourism yield is not mistaken for venture activity.",
		sourceIds: ["model", "anchors"]
	},
	Discourse: {
		title: "Discourse group",
		definition: "How loud a place is in the model's conversation, and whether that conversation is warm or hostile.",
		words: [{
			word: "Discourse",
			meaning: "Talk about a place. Here, a formula of population and conflict. Not a corpus of text."
		}, {
			word: "Tone",
			meaning: "Warm versus hostile, built from sentiment, conflict, and inflation."
		}],
		calculation: "See discourse volume and social tone. Themes lower on the page renormalize twelve topic scores into shares that add to 100.",
		notThis: "Not media monitoring.",
		why: "Kept visible so the social and news sliders have something they are honestly tied to — a formula, not a feed.",
		sourceIds: ["model", "social"]
	},
	Risk: {
		title: "Risk group",
		definition: "What can break a plan: violence, graft, cyber exposure, informal and illegal economic weight, sanctions drag, and the quality of the state (which is the one item here where higher is better).",
		words: [{
			word: "Exposure",
			meaning: "How much of the bad thing the model assigns. Not a probability and not a loss amount."
		}, {
			word: "Friction",
			meaning: "Extra cost and delay. Sanctions friction is not a count of designated persons."
		}],
		calculation: "See each item. Governance is an anchor. The other five are mostly mirrors of governance, income, conflict, and a sanctions list.",
		notThis: "Not a risk vendor's letter grade.",
		why: "Separated so a high living score cannot hide a sanctions or conflict problem unless you never click these.",
		sourceIds: [
			"model",
			"wgi",
			"ofac",
			"acled",
			"dark"
		]
	}
};
function groupTip(group) {
	return {
		...GROUP_TIPS[group] ?? {
			title: group,
			definition: "A family of map metrics.",
			words: [],
			calculation: "Open each metric.",
			notThis: "Not an official classification.",
			why: "Grouped so the sidebar is readable.",
			sourceIds: ["model"]
		},
		alsoCited: ALSO_CITED[group] ?? [],
		journals: JOURNAL_HOMES[group],
		forum: forumLine(group)
	};
}
function metricTip(metric) {
	const formula = FORMULAS[metric.id];
	const direction = metric.higherIsBetter ? "Higher is treated as more favorable. Brass on the map, in the level lens, means a higher reading." : "Higher is a heavier or less favorable reading. The color scale still paints high numbers in brass, so read the sign before cheering a bright country.";
	return {
		title: metric.label,
		definition: metric.blurb,
		words: [
			{
				word: "Index versus statistic",
				meaning: metric.scale === "index" ? WORDS.index : "A statistic here means the field has a real-world unit (percent, dollars, years). It is still produced by the model unless a pin replaced it."
			},
			{
				word: "Level intensity",
				meaning: "The 0–100 ink used for coloring and for the source blend. For indexes it is the score itself. For statistics it is a stretch between two hand-picked ends, so 0 and 100 are not observed minima and maxima."
			},
			{
				word: "Anchor",
				meaning: WORDS.anchor
			}
		],
		calculation: `${formula?.calc ?? "No separate expression is written down for this field."} ${direction} In the level lens, an index hero number is the source blend, while a statistic hero number stays on the unblended value. The map always uses the blend.`,
		notThis: formula?.notThis ?? "Not a downloaded official series.",
		why: "The expression is the method. If a reference source is listed, it is the series this field is trying to resemble. It was not pasted in cell by cell unless the status on that source says loaded. Live sources, when named, are fetched in the briefing and do not replace this expression.",
		sourceIds: formula?.sources ?? ["model"],
		alsoCited: ALSO_CITED[metric.group] ?? [],
		journals: JOURNAL_HOMES[metric.group],
		forum: forumLine(metric.group, metric.id)
	};
}
var UI = {
	brand: {
		title: "Meridian",
		definition: "One page for comparing places on living, work, and capital from 2016 through a 2026 nowcast. Every control recolors the same map.",
		words: [{
			word: "Meridian",
			meaning: "A line of longitude. Used here as a name for a worldwide cut through the same three questions, not as a surveying tool."
		}, {
			word: "Atlas",
			meaning: "A map plus the numbers that paint it. Not a printed book."
		}],
		calculation: "No score of its own. The world pill to the right is the population-weighted LWI of the current scope.",
		notThis: "Not a fund, not a government, and not a forecast house.",
		why: "A single page so a shared link can restore the year, metric, lens, weights, and place without an account.",
		sourceIds: ["model", "ne"]
	},
	worldLwi: {
		title: "Scope LWI",
		definition: "Population-weighted average of the LWI index for every non-thin territory inside the current map scope.",
		words: [
			{
				word: "Population-weighted",
				meaning: "Each country's LWI is multiplied by its Natural Earth population attribute, then divided by the sum of those populations. A large country moves the number more than a small one. Area does not."
			},
			{
				word: "LWI",
				meaning: "Living 36, working 30, investing 34."
			},
			{
				word: "Thin",
				meaning: WORDS.thin
			}
		],
		calculation: "Sum over countries of (LWI × population) / sum of population. Thin places and non-positive population are skipped. This pill does not use the source blend and does not use the time lens. It is the raw level.",
		notThis: "Not world GDP and not a UN regional aggregate.",
		why: "An unweighted mean would let microstates outvote India. Population weights are the least-bad public scale that already sits on the polygons.",
		sourceIds: ["ne", "model"]
	},
	play: {
		title: "Play the years",
		definition: "Steps the year from 2016 through 2026 and then loops. About 0.9 seconds per year.",
		words: [{
			word: "Year",
			meaning: "A calendar year, not a fiscal year and not a rolling twelve-month window."
		}],
		calculation: "No statistic. It only changes which precomputed year is drawn.",
		notThis: "Not a forecast animation. 2026 is already on the page as a nowcast; play does not compute a new one.",
		why: "Change is easier to see in motion than in a table. Pause by pressing the button again, or by touching the year slider.",
		sourceIds: ["model"]
	},
	year: {
		title: "Year slider",
		definition: "Selects which year of the 2016–2026 path is on the map and in the briefing.",
		words: [{
			word: "Nowcast",
			meaning: WORDS.nowcast
		}, {
			word: "Path",
			meaning: "The same formulas run once per year, with pins and story nudges applied where they exist."
		}],
		calculation: "Arrow keys move one year when focus is not in a field. The series are computed in the browser from the anchors. They are not fetched per year.",
		notThis: "Not a revision history. Changing the year does not show how the estimate was revised later. It shows the model's level for that year.",
		why: "Eleven years covers the pre-pandemic baseline (2019), the break (2020), the price shock (2022), and the current nowcast.",
		sourceIds: ["pins", "model"]
	},
	search: {
		title: "Find a place",
		definition: "Filters the place list already on the page. Countries match name or exact ISO code. Regions match once you have typed at least two characters, and only named zones (not the automatic north/center/south belts).",
		words: [{
			word: "ISO",
			meaning: "The three-letter code on the place file, close to ISO 3166-1 alpha-3, including some Natural Earth exceptions."
		}, {
			word: "Zone",
			meaning: "A focus area inside a country. Not a legal border."
		}],
		calculation: "A substring check. At most six countries and six regions are shown. No server search.",
		notThis: "Not a gazetteer and not Google.",
		why: "The list is finite and already loaded, so a local filter is complete and does not depend on a network.",
		sourceIds: ["ne"]
	},
	scope: {
		title: "Map scope",
		definition: "Limits which territories count as 'in view' for the average, the ranking, and the bright colors. Places outside the scope stay on the map, faded.",
		words: [{
			word: "Continent",
			meaning: "The continent attribute on the Natural Earth place file. Russia is filed under Europe there. Mexico is filed under Central America in that file's region scheme, not as part of Northern America."
		}, {
			word: "Subregion",
			meaning: "The UN-style subregion on the same file (Western Europe, Eastern Africa, and so on)."
		}],
		calculation: "A place matches a continent scope if its continent string equals the choice, or a subregion scope if its subregion string equals the choice. World matches all.",
		notThis: "Not a political bloc (not NATO, not ASEAN, not the EU). The EU is not a scope.",
		why: "Continent and subregion are already on every feature, so the filter cannot silently drop a country for lack of a join.",
		sourceIds: ["ne"]
	},
	population: {
		title: "Emphasis",
		definition: "Dims territories under the chosen population cutoff so large places read first. They stay clickable. Rankings use the same cutoff.",
		words: [{
			word: "Population",
			meaning: "The Natural Earth population attribute, late 2010s. Not a 2026 UN projection. Example: United States 328,239,523."
		}],
		calculation: "If the cutoff is 0, nothing is dimmed for size. Otherwise places under the cutoff are drawn at lower opacity. Thin places are dim regardless.",
		notThis: "Not a statement that small countries do not matter. It is a visual filter.",
		why: "A world map colored at equal intensity makes Luxembourg as loud as Indonesia. The default cutoff is 1 million so the eye lands on places where the public series are less empty.",
		sourceIds: ["ne"]
	},
	lensLevel: {
		title: "Level lens",
		definition: "Colors the map by where the metric stands in the selected year, after the source blend.",
		words: [{
			word: "Lens",
			meaning: "A way of looking at the same series. It does not change the stored year path."
		}, {
			word: "Blend",
			meaning: WORDS.blend
		}],
		calculation: "Map color runs from ink at 0 through green in the middle to brass at 100. For indexes the hero number is the rounded blend. For statistics (growth, inflation, unemployment, PPP, wages, age, population growth, working-age share) the hero stays in the statistic's own units and is not blended; the map is still the 0–100 intensity, blended.",
		notThis: "Not a ranking percentile. A score of 70 is not 'better than 70% of countries.'",
		why: "Level is the default because change lenses hide whether a country is actually a good or a bad place to start.",
		sourceIds: ["model"]
	},
	lensDelta: {
		title: "One-year change",
		definition: "Colors the map by this year's blended level minus last year's blended level.",
		words: [{
			word: "Change",
			meaning: "A difference of index points, not a percent change, even when the underlying statistic is a percent."
		}],
		calculation: "Score = blended level(year) − blended level(year−1). At 2016 the change is zero because there is no 2015 inside the page. Color runs from teal (fell, around −24) through flat gray (0) to brass (rose, around +24).",
		notThis: "Not a growth rate of the statistic. Unemployment going from 4% to 5% is a change in the intensity score, which you should read next to the level.",
		why: "A country can be poor and improving, or rich and slipping. Level alone hides that.",
		sourceIds: ["model"]
	},
	lens2019: {
		title: "Change since 2019",
		definition: "Colors the map by this year's blended level minus the 2019 blended level. 2019 is the last full pre-pandemic year in this model.",
		words: [{
			word: "Baseline",
			meaning: "The comparison year, fixed at 2019. Not each country's own peak."
		}],
		calculation: "Score = blended level(year) − blended level(2019). In 2019 itself the score is the difference against 2018's level only in the one-year lens; in this lens 2019 versus 2019 is zero.",
		notThis: "Not 'versus the pre-COVID trend.' There is no counterfactual path.",
		why: "2019 is the obvious shared baseline. Using each country's best year would reward different dates and make the map incomparable.",
		sourceIds: ["model", "pins"]
	},
	official: {
		title: "Official statistics weight",
		definition: "How much of the map color comes from the metric's own 0–100 intensity, before any mood or momentum remix.",
		words: [{
			word: "Official",
			meaning: "Official-style: the unblended model path, including pins where they exist. It does not mean a government published this cell."
		}, {
			word: "Weight",
			meaning: "A slider from 0 to 100. The three sliders are renormalized so they sum to 100% of the blend even if the raw numbers do not sum to 100."
		}],
		calculation: "Share = this slider / (official + social + news). If all three are zero, the map uses the unblended level.",
		notThis: "Not a claim about source quality. Turning this down does not 'remove the government data.' It turns down the unblended path.",
		why: "Default 70 because the page's promise is closer to national accounts than to conversation, and because the conversation layer is simulated.",
		sourceIds: ["model", "pins"]
	},
	social: {
		title: "Social mood weight",
		definition: "How much of the map color comes from a remix that pulls the metric toward the sentiment index.",
		words: [{
			word: "Social",
			meaning: "A formula named for mood. Not a social network."
		}, {
			word: "Sentiment index",
			meaning: "The constructed mood score. See that metric's question mark."
		}],
		calculation: "Social view = 0.48×(this metric's intensity) + 0.52×(sentiment intensity), clamped 0–100. The slider sets its vote in the blend. Default 20.",
		notThis: "Not X, Reddit, TikTok, or a survey. The live panel's feeds are not an input to this slider.",
		why: "Included so you can see how much a mood overlay would move the map, without pretending the overlay is measured.",
		sourceIds: ["model", "social"]
	},
	news: {
		title: "News momentum weight",
		definition: "How much of the map color comes from a remix that exaggerates the latest change.",
		words: [{
			word: "News",
			meaning: "A formula named for 'what just changed.' Not a wire service."
		}, {
			word: "Momentum",
			meaning: "This year's intensity minus last year's, scaled up."
		}],
		calculation: "News view = this year's intensity + 1.65×(this year's intensity − last year's intensity), clamped 0–100. Default slider 10. In 2016, last year equals this year, so the news view equals the level.",
		notThis: "Not a count of headlines. The Google News list in the live panel is a separate list and does not move this slider.",
		why: "News really does amplify change. The slider lets you add that bias on purpose and see it, instead of hiding it inside the level.",
		sourceIds: ["model", "social"]
	},
	blendNote: {
		title: "What the blend touches",
		definition: "The choropleth uses the blend. Hard figures in the briefing, when the metric is a statistic and the lens is level, stay on the unblended path.",
		words: [{
			word: "Choropleth",
			meaning: WORDS.choropleth
		}, {
			word: "Hard figure",
			meaning: "A number with a unit: percent, dollars, years. Shown as printed by the metric's formatter."
		}],
		calculation: "Blended level = (official view × official weight + social view × social weight + news view × news weight) / (sum of weights).",
		notThis: "Not a Bayesian model and not a polling average.",
		why: "Splitting the two keeps a 4.1% unemployment figure from being silently rewritten by a mood slider, while still letting the map answer 'what if conversation counted more.'",
		sourceIds: ["model"]
	},
	map: {
		title: "The map",
		definition: "Natural Earth 1:50m coastlines, drawn in the Natural Earth projection (a compromise projection, neither equal-area nor conformal).",
		words: [{
			word: "De facto",
			meaning: "Natural Earth draws who controls the ground, not every legal claim. Disputed areas follow that file."
		}, {
			word: "Projection",
			meaning: "A way to flatten a sphere. Shapes and areas are both a bit off. Do not compare country size by eye."
		}],
		calculation: "Fill is colorFor(blended score). Opacity fades places outside the scope, under the population cutoff, or marked thin. Click a country to open it. Click a disk inside an open country to open a zone.",
		notThis: "Not a navigation chart and not a statement of borders.",
		why: "50m is the middle Natural Earth scale: readable coastlines without the download weight of 10m. Version family 5.1.1 as listed by Natural Earth.",
		sourceIds: ["ne"]
	},
	legend: {
		title: "Color legend",
		definition: "How to read the paint. Level lens: low numbers are dark, high numbers are brass. Change lenses: falls are teal, no change is gray, rises are brass.",
		words: [{
			word: "Brass",
			meaning: "The accent color. It means 'high' or 'rose,' which is favorable only when the metric says higher is better."
		}, {
			word: "Teal",
			meaning: "Used only on change lenses, for a fall in the index intensity."
		}],
		calculation: "Level color is a two-part mix from 0 to 100. Change color is a two-part mix from −24 to +24. Values outside that are pinned to the end color. Missing numbers are dim.",
		notThis: "Not a diverging scale around the world average. The midpoint is the middle of the index, not the median country.",
		why: "One ramp, used everywhere, so a color means the same thing on the map and in your memory.",
		sourceIds: ["model"]
	},
	zoom: {
		title: "Zoom",
		definition: "Scales the map around its center. Scroll and pinch do the same. It does not change any number.",
		words: [{
			word: "Zoom",
			meaning: "A view control. Not a change of geographic resolution. The coastline detail stays 50m."
		}],
		calculation: "Each click multiplies the scale by 1.35 or by 1/1.35.",
		notThis: "Not a new dataset at closer zoom.",
		why: "Zones are small. You need to get close enough to click them.",
		sourceIds: ["ne"]
	},
	pillars: {
		title: "Three pillars",
		definition: "The living, working, and investing anchors (after the year path and, if a zone is open, after that zone's offsets). They are the ingredients of LWI.",
		words: [{
			word: "Offset",
			meaning: "A zone adds a fixed number of points to living, working, and investing, then related fields move with it. Prices and population stay national."
		}],
		calculation: "Shown as rounded levels, not blended. LWI on the map can disagree with 0.36×these three if you are looking at a blended index hero rather than these boxes.",
		notThis: "Not GDP shares.",
		why: "Always visible so the summary cannot hide which pillar is doing the work.",
		sourceIds: ["model"]
	},
	hero: {
		title: "The big number",
		definition: "The selected metric for the selected place (or the population-weighted scope if no place is selected), in the selected lens.",
		words: [{
			word: "Hero",
			meaning: "The primary figure. Everything else on the briefing is context for it."
		}],
		calculation: "Level + index: rounded blended intensity. Level + statistic: the formatted unblended value (percent, dollars, or years). One-year and since-2019: the change, formatted with a plus sign when positive. Scope aggregates weight countries by the Natural Earth population and skip thin places.",
		notThis: "Not a confidence interval. There is no standard error on these numbers.",
		why: "One number, with the formula one click away, beats a dashboard of unlabeled tiles.",
		sourceIds: ["model", "ne"]
	},
	history: {
		title: "Year path",
		definition: "The unblended metric for each year from 2016 through 2026, for this place or for the population-weighted scope.",
		words: [{
			word: "Unblended",
			meaning: "The source sliders do not move this line. It is the official-style path."
		}],
		calculation: "One point per year. The vertical scale is automatic, so a flat series still fills the chart. Do not compare slopes across metrics by eye.",
		notThis: "Not a forecast fan. 2026 is one nowcast point, not a range.",
		why: "The map is a single year. The line is there so a bright country can still show a break in 2020.",
		sourceIds: ["model", "pins"]
	},
	zones: {
		title: "Zones",
		definition: "Focus areas inside the open country: named metros, coasts, capitals, industrial belts, and, where no name was written, a north, center, and south belt.",
		words: [{
			word: "Named",
			meaning: "A place a person would recognize (a city or a coast). Unnamed belts are marked 'modeled.'"
		}, {
			word: "Disk",
			meaning: "The circle on the map is a marker of radius in kilometers, not the administrative boundary."
		}],
		calculation: "The zone copies the national year and then adds living, working, and investing offsets. Safety, tourism, cost, housing, venture, digital, environment, jobs, and sentiment move by smaller rules of the same offsets. Unemployment moves only slightly. PPP, inflation, and population stay national.",
		notThis: "Not a legal border and not a local statistical office.",
		why: "National averages hide the fact that the capital and the interior are different economies. The offsets are honest about being offsets.",
		sourceIds: ["model"]
	},
	rank: {
		title: "Highest and lowest",
		definition: "Territories in the current scope, at or above the population cutoff, not thin, sorted by the map score (blended, and in the current lens).",
		words: [{
			word: "Reading",
			meaning: "The number the sort uses. For an index lens-level view it is the blended 0–100 score. For a change lens it is the change in that score."
		}],
		calculation: "Sort descending. Show six at the top and four at the bottom. Ties keep a stable sort only by the order the filter produced, which is the place-file order. There is no second key.",
		notThis: "Not a published league table.",
		why: "The map makes spatial clusters obvious and ranks easy to miss. The list does the opposite.",
		sourceIds: ["model", "ne"]
	},
	themes: {
		title: "Discourse themes",
		definition: "Twelve topic scores, turned into shares of 100, from the same constructed indexes. The words under them are a fixed vocabulary, reweighted.",
		words: [{
			word: "Share",
			meaning: "This topic's score divided by the sum of all twelve topic scores. The shares add to 100 by construction. They are not the percent of posts."
		}, {
			word: "Term",
			meaning: "One of four fixed phrases per topic. Its bar is the topic share, times a hash wobble, times a penalty for being later in the list, times a loudness factor from discourse volume."
		}],
		calculation: "Topic scores are hand formulas: cost uses cost and inflation, housing uses housing, jobs uses unemployment and job heat, and so on. Then shares = score / sum(scores).",
		notThis: "Not a live social scrape and not a topic model (not LDA, not a neural classifier). No text was classified. The live panel below is a different object.",
		why: "A briefing that only shows indexes feels bloodless. These labels are a readable shadow of the indexes, marked as simulated so they are not mistaken for listening to a country.",
		sourceIds: ["model", "social"]
	},
	briefs: {
		title: "Atlas briefs",
		definition: "Short sentences generated from which fields moved, plus a fixed sentence about what that calendar year was in the model.",
		words: [{
			word: "Brief",
			meaning: "A template sentence. Not a reported article and not a model-written essay from a language model at read time."
		}],
		calculation: "The year sentence is a lookup. Other sentences fire when a field crosses a hand-set threshold between last year and this year (growth, inflation, sentiment, conflict, and LWI).",
		notThis: "Not journalism. There is no byline because nobody reported it from the field.",
		why: "Threshold sentences are auditable. A free-written paragraph would hide the rule.",
		sourceIds: ["model"]
	},
	thin: {
		title: "Thin public record",
		definition: "The place has under 8,000 people in the Natural Earth attribute, or it is Antarctica, or its subregion is an open-ocean unit.",
		words: [{
			word: "Thin",
			meaning: WORDS.thin
		}],
		calculation: "A boolean rule. Thin places are dropped from averages and rankings and painted dim.",
		notThis: "Not a judgement that the people there are unknowable. It is a rule about empty published series.",
		why: "Coloring a reef or a polar station with a full LWI implies a labor market that is not there.",
		sourceIds: ["ne"]
	},
	share: {
		title: "Share this view",
		definition: "Copies the address of this exact view: year, metric, lens, scope, place, zone, population cutoff, and the three weights. If you have just added a data type, that type is packed into the link too.",
		words: [{
			word: "Public link",
			meaning: "This is one page. After you publish it from the Grok app controls, the copied address is the address other people can open. Reader-added types travel inside the link; they are not an account."
		}],
		calculation: "The query string is the state. Nothing is saved on a server for the share itself.",
		notThis: "Not a login and not a private note. Anyone with the link sees that view.",
		why: "You asked for one shareable page. The state is in the URL so the page can be updated without a second site.",
		sourceIds: ["model"]
	},
	ledger: {
		title: "Sources and method",
		definition: "The full shelf: what is loaded, what was only used as a reference, what was rejected, which searches were run, and how to add a data type.",
		words: [
			{
				word: "Loaded",
				meaning: "The page would change if this file changed. Geometry, anchors, pins, and formulas."
			},
			{
				word: "Reference",
				meaning: "The published series a field is trying to resemble. Not copied in."
			},
			{
				word: "Rejected",
				meaning: "Considered, then not used, with a reason."
			}
		],
		calculation: "Counts on the ledger are the lengths of those lists. They are not a paper count.",
		notThis: "Not a systematic review. No journal database was queried.",
		why: "Hover cards define one object. The ledger is where the choice among sources is argued.",
		sourceIds: [
			"imf",
			"wpp",
			"wgi",
			"whr",
			"ne",
			"social"
		]
	},
	added: {
		title: "A data type you added",
		definition: "A reader-defined layer stored in this browser and, when you share, inside the link. It does not create a new measured series.",
		words: [{
			word: "Stand-in",
			meaning: "An existing metric whose map coloring is reused so the new type is visible. The briefing says which one. The new type's own text is yours."
		}],
		calculation: "The map score is the stand-in metric's score. Your definition, source, date, and query are shown as text. They are not fed into the formula.",
		notThis: "Not an automatic download of the URL you typed. The page does not fetch that source.",
		why: "You can extend the vocabulary of the page without inventing fake country numbers. When a real series is wired later, the stand-in can be replaced.",
		sourceIds: ["model"]
	},
	live: {
		title: "Live search and attention",
		definition: "Feeds fetched when you open a place or a metric. They sit beside the model. They do not recolor the map, change the year path, or move the source-blend sliders.",
		words: [
			{
				word: "Google Trends",
				meaning: "Two live series. Interest over time is a 0–100 index for the last 12 months, for artificial intelligence, ChatGPT, and this metric's search phrase, plus top and rising related queries. Trending today is the public daily RSS with Google's traffic buckets. Neither is a Semrush volume."
			},
			{
				word: "Semrush",
				meaning: "Monthly phrase volume, CPC, and competition. Called when you paste a key into the briefing. The key stays in this browser. With no key, the row stays empty. Volume is not copied from Trends or Wikipedia."
			},
			{
				word: "Ahrefs",
				meaning: "Search volume and keyword difficulty from Keywords Explorer. Same rule as Semrush: a key in the briefing, or no number."
			},
			{
				word: "Pageviews",
				meaning: "English Wikipedia monthly user pageviews for artificial intelligence, large language model, ChatGPT, and the metric's article. Frequency and the change versus last month and last year. Encyclopedia attention, not search volume."
			},
			{
				word: "World Bank rows",
				meaning: "Latest real GDP growth, consumer-price inflation, unemployment, and GDP per capita PPP for the open country. Official cells. They will not match the model."
			}
		],
		calculation: "One server request fans out to the public endpoints and returns whatever each one actually answered. Failures stay failures. A 15-minute cache avoids hammering the same country and metric.",
		notThis: "Not a blend, not a dark-web crawl, and not a claim that Reddit or Bluesky were read. Both returned 403. GDELT rate-limited the host, so it is named and not graphed.",
		why: "Search demand and AI-term attention were asked for by name. The three tools are not interchangeable, so each one reports its own state instead of a single 'interest' number.",
		sourceIds: [
			"gtrends",
			"semrush",
			"ahrefs",
			"wiki",
			"gnews",
			"hn",
			"wbapi"
		]
	},
	field: {
		title: "Field guide",
		definition: "Forty-two people, forty-two institutions, and forty-two conferences where this element's argument actually shows up. Filtered to the open metric's family. The full shelf is one toggle away.",
		words: [{
			word: "Tagged",
			meaning: "The name is used for this family of elements. A macroeconomist is not tagged to tourism just to inflate the count."
		}, {
			word: "Shelf order",
			meaning: "The order on the page. Not a rank, not an h-index, and not a Scopus query."
		}],
		calculation: "A name matches if its tags include the metric's group or the metric's own id. Counts are that filter's length out of 42.",
		notThis: "Not a systematic review and not a speaker list you can buy.",
		why: "The question marks say which sources the page uses. This list says where a person would go to hear the element argued with the sources the page does not use.",
		sourceIds: ["model"]
	}
};
function uiTip(id) {
	return UI[id] ?? UI.brand;
}
function sourceById(id) {
	return SOURCES.find((source) => source.id === id);
}
var LEDGER_COUNTS = {
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
	notSearchedNotes: NOT_SEARCHED.length
};
function A(partial) {
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
		...partial
	};
}
/** Regional medians. Country overrides pull well-known places off the median. */
var SUB = {
	"Western Europe": A({
		ppp: 64e3,
		growth: 1.1,
		inflation: 2.2,
		unemployment: 5.5,
		living: 82,
		working: 76,
		investing: 70,
		safety: 76,
		health: 84,
		education: 82,
		cost: 74,
		governance: 82,
		digital: 88,
		tourism: 76,
		conflict: 8,
		openness: 84,
		medianAge: 43,
		popGrowth: .3,
		urban: 80,
		language: 68,
		tax: 62
	}),
	"Northern Europe": A({
		ppp: 66e3,
		growth: 1.4,
		inflation: 2.3,
		unemployment: 6.2,
		living: 86,
		working: 78,
		investing: 74,
		safety: 82,
		health: 86,
		education: 86,
		cost: 76,
		governance: 88,
		digital: 90,
		tourism: 58,
		conflict: 6,
		openness: 86,
		medianAge: 42,
		popGrowth: .4,
		urban: 82,
		language: 84,
		tax: 68
	}),
	"Southern Europe": A({
		ppp: 42e3,
		growth: 1.6,
		inflation: 2.4,
		unemployment: 9.5,
		living: 74,
		working: 64,
		investing: 62,
		safety: 72,
		health: 78,
		education: 74,
		cost: 62,
		governance: 68,
		digital: 78,
		tourism: 84,
		conflict: 10,
		openness: 76,
		medianAge: 45,
		popGrowth: .1,
		urban: 74,
		language: 42,
		tax: 58
	}),
	"Eastern Europe": A({
		ppp: 36e3,
		growth: 2.4,
		inflation: 4.2,
		unemployment: 4.8,
		living: 64,
		working: 68,
		investing: 62,
		safety: 70,
		health: 68,
		education: 74,
		cost: 46,
		governance: 60,
		digital: 76,
		tourism: 52,
		conflict: 18,
		openness: 68,
		medianAge: 42,
		popGrowth: -.2,
		urban: 66,
		language: 46,
		tax: 46
	}),
	"Northern America": A({
		ppp: 62e3,
		growth: 2,
		inflation: 2.6,
		unemployment: 4.8,
		living: 78,
		working: 76,
		investing: 78,
		safety: 70,
		health: 76,
		education: 80,
		cost: 72,
		governance: 76,
		digital: 86,
		tourism: 64,
		conflict: 10,
		openness: 80,
		medianAge: 39,
		popGrowth: .6,
		urban: 82,
		language: 92,
		tax: 44
	}),
	"Central America": A({
		ppp: 14e3,
		growth: 3.2,
		inflation: 4,
		unemployment: 6,
		living: 52,
		working: 54,
		investing: 52,
		safety: 46,
		health: 54,
		education: 52,
		cost: 40,
		governance: 46,
		digital: 52,
		tourism: 58,
		conflict: 28,
		openness: 58,
		medianAge: 27,
		popGrowth: 1.2,
		urban: 62,
		language: 32,
		tax: 36
	}),
	Caribbean: A({
		ppp: 18e3,
		growth: 2.2,
		inflation: 3.6,
		unemployment: 8,
		living: 56,
		working: 52,
		investing: 48,
		safety: 52,
		health: 56,
		education: 56,
		cost: 52,
		governance: 52,
		digital: 58,
		tourism: 78,
		conflict: 16,
		openness: 60,
		medianAge: 33,
		popGrowth: .5,
		urban: 58,
		language: 70,
		tax: 34
	}),
	"South America": A({
		ppp: 18e3,
		growth: 2.2,
		inflation: 6,
		unemployment: 8,
		living: 54,
		working: 52,
		investing: 50,
		safety: 46,
		health: 58,
		education: 58,
		cost: 44,
		governance: 48,
		digital: 62,
		tourism: 56,
		conflict: 22,
		openness: 52,
		medianAge: 32,
		popGrowth: .8,
		urban: 78,
		language: 28,
		tax: 42
	}),
	"Eastern Asia": A({
		ppp: 28e3,
		growth: 3.4,
		inflation: 1.6,
		unemployment: 3.8,
		living: 68,
		working: 72,
		investing: 66,
		safety: 76,
		health: 74,
		education: 78,
		cost: 58,
		governance: 64,
		digital: 82,
		tourism: 60,
		conflict: 16,
		openness: 62,
		medianAge: 40,
		popGrowth: .1,
		urban: 72,
		language: 36,
		tax: 40
	}),
	"South-Eastern Asia": A({
		ppp: 14e3,
		growth: 4.6,
		inflation: 2.8,
		unemployment: 3.5,
		living: 56,
		working: 60,
		investing: 64,
		safety: 62,
		health: 58,
		education: 60,
		cost: 40,
		governance: 52,
		digital: 64,
		tourism: 68,
		conflict: 18,
		openness: 64,
		medianAge: 30,
		popGrowth: .9,
		urban: 52,
		language: 58,
		tax: 34
	}),
	"Southern Asia": A({
		ppp: 8e3,
		growth: 5.2,
		inflation: 6,
		unemployment: 6.5,
		living: 48,
		working: 52,
		investing: 58,
		safety: 52,
		health: 48,
		education: 52,
		cost: 32,
		governance: 46,
		digital: 52,
		tourism: 40,
		conflict: 32,
		openness: 48,
		medianAge: 27,
		popGrowth: 1.2,
		urban: 38,
		language: 62,
		tax: 34
	}),
	"Central Asia": A({
		ppp: 12e3,
		growth: 4.4,
		inflation: 7,
		unemployment: 5.5,
		living: 50,
		working: 54,
		investing: 52,
		safety: 62,
		health: 54,
		education: 64,
		cost: 34,
		governance: 42,
		digital: 58,
		tourism: 36,
		conflict: 18,
		openness: 46,
		medianAge: 28,
		popGrowth: 1.4,
		urban: 48,
		language: 28,
		tax: 32
	}),
	"Western Asia": A({
		ppp: 28e3,
		growth: 2.8,
		inflation: 4,
		unemployment: 7,
		living: 58,
		working: 58,
		investing: 60,
		safety: 64,
		health: 64,
		education: 64,
		cost: 52,
		governance: 52,
		digital: 70,
		tourism: 58,
		conflict: 28,
		openness: 60,
		medianAge: 31,
		popGrowth: 1.1,
		urban: 74,
		language: 52,
		tax: 22
	}),
	"Northern Africa": A({
		ppp: 12e3,
		growth: 3,
		inflation: 6,
		unemployment: 10,
		living: 48,
		working: 46,
		investing: 46,
		safety: 54,
		health: 50,
		education: 52,
		cost: 36,
		governance: 42,
		digital: 52,
		tourism: 58,
		conflict: 30,
		openness: 46,
		medianAge: 27,
		popGrowth: 1.5,
		urban: 58,
		language: 36,
		tax: 36
	}),
	"Western Africa": A({
		ppp: 4200,
		growth: 4.2,
		inflation: 8,
		unemployment: 5,
		living: 38,
		working: 42,
		investing: 44,
		safety: 44,
		health: 36,
		education: 40,
		cost: 34,
		governance: 40,
		digital: 40,
		tourism: 28,
		conflict: 36,
		openness: 46,
		medianAge: 18,
		popGrowth: 2.4,
		urban: 46,
		language: 52,
		tax: 32
	}),
	"Eastern Africa": A({
		ppp: 3200,
		growth: 5.2,
		inflation: 7,
		unemployment: 5,
		living: 38,
		working: 42,
		investing: 46,
		safety: 46,
		health: 38,
		education: 42,
		cost: 32,
		governance: 40,
		digital: 36,
		tourism: 40,
		conflict: 34,
		openness: 46,
		medianAge: 19,
		popGrowth: 2.5,
		urban: 34,
		language: 48,
		tax: 32
	}),
	"Middle Africa": A({
		ppp: 3800,
		growth: 3.4,
		inflation: 7,
		unemployment: 8,
		living: 34,
		working: 38,
		investing: 40,
		safety: 36,
		health: 32,
		education: 38,
		cost: 36,
		governance: 32,
		digital: 32,
		tourism: 24,
		conflict: 40,
		openness: 40,
		medianAge: 18,
		popGrowth: 2.6,
		urban: 48,
		language: 36,
		tax: 30
	}),
	"Southern Africa": A({
		ppp: 1e4,
		growth: 1.6,
		inflation: 5,
		unemployment: 18,
		living: 46,
		working: 40,
		investing: 46,
		safety: 40,
		health: 44,
		education: 52,
		cost: 40,
		governance: 48,
		digital: 52,
		tourism: 52,
		conflict: 22,
		openness: 54,
		medianAge: 26,
		popGrowth: 1.3,
		urban: 58,
		language: 62,
		tax: 40
	}),
	"Australia and New Zealand": A({
		ppp: 58e3,
		growth: 1.8,
		inflation: 2.8,
		unemployment: 4.2,
		living: 84,
		working: 76,
		investing: 72,
		safety: 80,
		health: 82,
		education: 82,
		cost: 74,
		governance: 84,
		digital: 86,
		tourism: 72,
		conflict: 6,
		openness: 82,
		medianAge: 38,
		popGrowth: 1.1,
		urban: 86,
		language: 94,
		tax: 52
	}),
	Melanesia: A({
		ppp: 4e3,
		growth: 3,
		inflation: 4,
		unemployment: 4,
		living: 42,
		working: 40,
		investing: 36,
		safety: 48,
		health: 36,
		education: 40,
		cost: 40,
		governance: 38,
		digital: 28,
		tourism: 36,
		conflict: 24,
		openness: 42,
		medianAge: 23,
		popGrowth: 1.8,
		urban: 22,
		language: 48,
		tax: 28
	}),
	Micronesia: A({
		ppp: 7e3,
		growth: 1.4,
		inflation: 3,
		unemployment: 6,
		living: 48,
		working: 44,
		investing: 36,
		safety: 62,
		health: 48,
		education: 52,
		cost: 52,
		governance: 50,
		digital: 42,
		tourism: 40,
		conflict: 8,
		openness: 50,
		medianAge: 26,
		popGrowth: .6,
		urban: 46,
		language: 60,
		tax: 24
	}),
	Polynesia: A({
		ppp: 8e3,
		growth: 1.6,
		inflation: 3,
		unemployment: 7,
		living: 54,
		working: 46,
		investing: 38,
		safety: 68,
		health: 56,
		education: 56,
		cost: 54,
		governance: 54,
		digital: 48,
		tourism: 62,
		conflict: 6,
		openness: 48,
		medianAge: 28,
		popGrowth: .5,
		urban: 42,
		language: 40,
		tax: 28
	}),
	Antarctica: A({
		ppp: 2e3,
		growth: 0,
		inflation: 0,
		unemployment: 0,
		living: 20,
		working: 10,
		investing: 5,
		safety: 40,
		health: 20,
		education: 20,
		cost: 30,
		governance: 40,
		digital: 20,
		tourism: 10,
		conflict: 2,
		openness: 20,
		medianAge: 35,
		popGrowth: 0,
		urban: 0,
		language: 40,
		tax: 10
	}),
	"Seven seas (open ocean)": A({
		ppp: 2e3,
		growth: 0,
		inflation: 1,
		unemployment: 2,
		living: 24,
		working: 16,
		investing: 10,
		safety: 40,
		health: 30,
		education: 30,
		cost: 40,
		governance: 40,
		digital: 24,
		tourism: 8,
		conflict: 4,
		openness: 30,
		medianAge: 36,
		popGrowth: 0,
		urban: 10,
		language: 40,
		tax: 10
	})
};
var WORLD = A({
	ppp: 12e3,
	growth: 2.4,
	living: 52,
	working: 52,
	investing: 50
});
var O = {
	USA: {
		ppp: 82e3,
		growth: 2.3,
		inflation: 2.8,
		unemployment: 4.1,
		living: 74,
		working: 78,
		investing: 86,
		safety: 58,
		health: 72,
		education: 80,
		cost: 78,
		governance: 74,
		digital: 88,
		tourism: 72,
		conflict: 14,
		openness: 82,
		medianAge: 38.5,
		popGrowth: .5,
		urban: 83,
		language: 98,
		tax: 46
	},
	CAN: {
		ppp: 6e4,
		growth: 1.5,
		inflation: 2.4,
		unemployment: 6.2,
		living: 82,
		working: 74,
		investing: 72,
		safety: 78,
		health: 80,
		education: 82,
		cost: 74,
		governance: 82,
		digital: 86,
		tourism: 68,
		conflict: 6,
		openness: 82,
		medianAge: 41,
		popGrowth: .9,
		urban: 82,
		language: 94,
		tax: 50
	},
	GRL: {
		ppp: 54e3,
		growth: 1.2,
		inflation: 2,
		unemployment: 5,
		living: 64,
		working: 48,
		investing: 34,
		safety: 82,
		health: 70,
		education: 64,
		cost: 72,
		governance: 78,
		digital: 62,
		tourism: 36,
		conflict: 4,
		openness: 60,
		medianAge: 34,
		popGrowth: 0,
		urban: 87,
		language: 50,
		tax: 42
	},
	MEX: {
		ppp: 23e3,
		growth: 2.1,
		inflation: 4.4,
		unemployment: 2.8,
		living: 52,
		working: 58,
		investing: 60,
		safety: 36,
		health: 56,
		education: 56,
		cost: 40,
		governance: 46,
		digital: 62,
		tourism: 74,
		conflict: 38,
		openness: 66,
		medianAge: 29,
		popGrowth: .8,
		urban: 81,
		language: 30,
		tax: 38
	},
	BRA: {
		ppp: 2e4,
		growth: 2.2,
		inflation: 4.4,
		unemployment: 7.4,
		living: 52,
		working: 52,
		investing: 54,
		safety: 40,
		health: 56,
		education: 56,
		cost: 42,
		governance: 48,
		digital: 68,
		tourism: 62,
		conflict: 20,
		openness: 54,
		medianAge: 34,
		popGrowth: .5,
		urban: 87,
		language: 24,
		tax: 52
	},
	ARG: {
		ppp: 26e3,
		growth: 2.4,
		inflation: 90,
		unemployment: 7.2,
		living: 54,
		working: 50,
		investing: 36,
		safety: 50,
		health: 64,
		education: 70,
		cost: 48,
		governance: 42,
		digital: 72,
		tourism: 58,
		conflict: 12,
		openness: 40,
		medianAge: 32,
		popGrowth: .4,
		urban: 92,
		language: 30,
		tax: 48
	},
	CHL: {
		ppp: 3e4,
		growth: 2.2,
		inflation: 3.8,
		unemployment: 8.2,
		living: 66,
		working: 60,
		investing: 62,
		safety: 58,
		health: 68,
		education: 70,
		cost: 56,
		governance: 68,
		digital: 76,
		tourism: 60,
		conflict: 12,
		openness: 74,
		medianAge: 36,
		popGrowth: .5,
		urban: 88,
		language: 28,
		tax: 40
	},
	COL: {
		ppp: 19e3,
		growth: 2.4,
		inflation: 5.4,
		unemployment: 10,
		living: 52,
		working: 50,
		investing: 52,
		safety: 42,
		health: 58,
		education: 56,
		cost: 38,
		governance: 48,
		digital: 64,
		tourism: 58,
		conflict: 36,
		openness: 58,
		medianAge: 32,
		popGrowth: .6,
		urban: 82,
		language: 24,
		tax: 40
	},
	PER: {
		ppp: 16e3,
		growth: 2.6,
		inflation: 2.6,
		unemployment: 6.2,
		living: 50,
		working: 52,
		investing: 52,
		safety: 44,
		health: 54,
		education: 56,
		cost: 38,
		governance: 46,
		digital: 58,
		tourism: 64,
		conflict: 22,
		openness: 60,
		medianAge: 30,
		popGrowth: .9,
		urban: 79,
		language: 22,
		tax: 36
	},
	GBR: {
		ppp: 56e3,
		growth: 1.1,
		inflation: 2.6,
		unemployment: 4.4,
		living: 76,
		working: 74,
		investing: 76,
		safety: 70,
		health: 78,
		education: 82,
		cost: 76,
		governance: 78,
		digital: 90,
		tourism: 74,
		conflict: 10,
		openness: 84,
		medianAge: 40.5,
		popGrowth: .5,
		urban: 84,
		language: 98,
		tax: 52
	},
	IRL: {
		ppp: 108e3,
		growth: 3.2,
		inflation: 2.2,
		unemployment: 4.4,
		living: 80,
		working: 80,
		investing: 78,
		safety: 78,
		health: 78,
		education: 84,
		cost: 78,
		governance: 82,
		digital: 88,
		tourism: 70,
		conflict: 6,
		openness: 90,
		medianAge: 39,
		popGrowth: 1,
		urban: 64,
		language: 98,
		tax: 42
	},
	FRA: {
		ppp: 55e3,
		growth: 1.1,
		inflation: 2.2,
		unemployment: 7.4,
		living: 80,
		working: 70,
		investing: 68,
		safety: 66,
		health: 84,
		education: 80,
		cost: 72,
		governance: 74,
		digital: 84,
		tourism: 88,
		conflict: 12,
		openness: 78,
		medianAge: 42,
		popGrowth: .3,
		urban: 81,
		language: 46,
		tax: 64
	},
	DEU: {
		ppp: 66e3,
		growth: .3,
		inflation: 2.4,
		unemployment: 3.4,
		living: 82,
		working: 78,
		investing: 66,
		safety: 76,
		health: 84,
		education: 82,
		cost: 70,
		governance: 82,
		digital: 86,
		tourism: 68,
		conflict: 8,
		openness: 82,
		medianAge: 45,
		popGrowth: .1,
		urban: 78,
		language: 62,
		tax: 60
	},
	NLD: {
		ppp: 72e3,
		growth: 1.2,
		inflation: 2.6,
		unemployment: 3.7,
		living: 84,
		working: 80,
		investing: 76,
		safety: 78,
		health: 84,
		education: 84,
		cost: 76,
		governance: 86,
		digital: 92,
		tourism: 70,
		conflict: 6,
		openness: 90,
		medianAge: 42,
		popGrowth: .4,
		urban: 92,
		language: 90,
		tax: 56
	},
	BEL: {
		ppp: 64e3,
		growth: 1.1,
		inflation: 2.5,
		unemployment: 5.6,
		living: 78,
		working: 72,
		investing: 68,
		safety: 68,
		health: 82,
		education: 82,
		cost: 72,
		governance: 76,
		digital: 86,
		tourism: 64,
		conflict: 8,
		openness: 84,
		medianAge: 42,
		popGrowth: .4,
		urban: 98,
		language: 72,
		tax: 60
	},
	CHE: {
		ppp: 92e3,
		growth: 1.3,
		inflation: 1.2,
		unemployment: 2.4,
		living: 90,
		working: 84,
		investing: 80,
		safety: 88,
		health: 90,
		education: 86,
		cost: 92,
		governance: 90,
		digital: 92,
		tourism: 78,
		conflict: 4,
		openness: 84,
		medianAge: 43,
		popGrowth: .7,
		urban: 74,
		language: 74,
		tax: 42
	},
	AUT: {
		ppp: 68e3,
		growth: .4,
		inflation: 2.8,
		unemployment: 5.2,
		living: 86,
		working: 76,
		investing: 70,
		safety: 84,
		health: 86,
		education: 82,
		cost: 74,
		governance: 82,
		digital: 84,
		tourism: 82,
		conflict: 6,
		openness: 82,
		medianAge: 44,
		popGrowth: .3,
		urban: 59,
		language: 64,
		tax: 58
	},
	SWE: {
		ppp: 64e3,
		growth: 1,
		inflation: 2.2,
		unemployment: 8.2,
		living: 86,
		working: 74,
		investing: 74,
		safety: 72,
		health: 86,
		education: 86,
		cost: 74,
		governance: 88,
		digital: 92,
		tourism: 56,
		conflict: 8,
		openness: 86,
		medianAge: 41,
		popGrowth: .5,
		urban: 88,
		language: 88,
		tax: 66
	},
	NOR: {
		ppp: 9e4,
		growth: 1.3,
		inflation: 2.8,
		unemployment: 4,
		living: 90,
		working: 80,
		investing: 74,
		safety: 86,
		health: 88,
		education: 86,
		cost: 84,
		governance: 90,
		digital: 92,
		tourism: 64,
		conflict: 6,
		openness: 82,
		medianAge: 40,
		popGrowth: .7,
		urban: 83,
		language: 88,
		tax: 60
	},
	DNK: {
		ppp: 74e3,
		growth: 1.6,
		inflation: 1.8,
		unemployment: 5.2,
		living: 88,
		working: 78,
		investing: 74,
		safety: 84,
		health: 86,
		education: 88,
		cost: 78,
		governance: 92,
		digital: 94,
		tourism: 58,
		conflict: 6,
		openness: 86,
		medianAge: 42,
		popGrowth: .4,
		urban: 88,
		language: 90,
		tax: 70
	},
	FIN: {
		ppp: 6e4,
		growth: .6,
		inflation: 1.8,
		unemployment: 8,
		living: 86,
		working: 72,
		investing: 70,
		safety: 86,
		health: 84,
		education: 88,
		cost: 72,
		governance: 92,
		digital: 92,
		tourism: 52,
		conflict: 8,
		openness: 84,
		medianAge: 43,
		popGrowth: .2,
		urban: 86,
		language: 82,
		tax: 64
	},
	ISL: {
		ppp: 72e3,
		growth: 2.2,
		inflation: 4.5,
		unemployment: 3.4,
		living: 88,
		working: 80,
		investing: 66,
		safety: 90,
		health: 84,
		education: 84,
		cost: 80,
		governance: 86,
		digital: 92,
		tourism: 86,
		conflict: 4,
		openness: 74,
		medianAge: 37,
		popGrowth: 1.2,
		urban: 94,
		language: 90,
		tax: 54
	},
	ESP: {
		ppp: 48e3,
		growth: 2.5,
		inflation: 2.6,
		unemployment: 11.2,
		living: 78,
		working: 64,
		investing: 66,
		safety: 74,
		health: 82,
		education: 76,
		cost: 60,
		governance: 70,
		digital: 84,
		tourism: 92,
		conflict: 8,
		openness: 78,
		medianAge: 45,
		popGrowth: .4,
		urban: 81,
		language: 40,
		tax: 54
	},
	ITA: {
		ppp: 54e3,
		growth: .7,
		inflation: 1.6,
		unemployment: 6.8,
		living: 76,
		working: 64,
		investing: 60,
		safety: 70,
		health: 80,
		education: 74,
		cost: 66,
		governance: 62,
		digital: 74,
		tourism: 90,
		conflict: 8,
		openness: 74,
		medianAge: 48,
		popGrowth: -.2,
		urban: 72,
		language: 38,
		tax: 62
	},
	PRT: {
		ppp: 44e3,
		growth: 1.9,
		inflation: 2.4,
		unemployment: 6.4,
		living: 78,
		working: 68,
		investing: 66,
		safety: 82,
		health: 78,
		education: 74,
		cost: 58,
		governance: 74,
		digital: 80,
		tourism: 88,
		conflict: 6,
		openness: 80,
		medianAge: 46,
		popGrowth: .2,
		urban: 67,
		language: 48,
		tax: 52
	},
	GRC: {
		ppp: 38e3,
		growth: 2.2,
		inflation: 2.6,
		unemployment: 10.2,
		living: 70,
		working: 58,
		investing: 58,
		safety: 70,
		health: 74,
		education: 76,
		cost: 56,
		governance: 60,
		digital: 72,
		tourism: 90,
		conflict: 10,
		openness: 70,
		medianAge: 46,
		popGrowth: -.3,
		urban: 80,
		language: 52,
		tax: 54
	},
	POL: {
		ppp: 45e3,
		growth: 3.1,
		inflation: 3.6,
		unemployment: 2.9,
		living: 68,
		working: 72,
		investing: 66,
		safety: 74,
		health: 68,
		education: 78,
		cost: 46,
		governance: 64,
		digital: 78,
		tourism: 58,
		conflict: 14,
		openness: 74,
		medianAge: 42,
		popGrowth: -.2,
		urban: 60,
		language: 52,
		tax: 46
	},
	CZE: {
		ppp: 5e4,
		growth: 1.4,
		inflation: 2.4,
		unemployment: 2.7,
		living: 74,
		working: 76,
		investing: 66,
		safety: 78,
		health: 76,
		education: 80,
		cost: 52,
		governance: 70,
		digital: 82,
		tourism: 68,
		conflict: 8,
		openness: 78,
		medianAge: 43,
		popGrowth: .1,
		urban: 74,
		language: 48,
		tax: 48
	},
	HUN: {
		ppp: 42e3,
		growth: 1.6,
		inflation: 3.8,
		unemployment: 4.3,
		living: 64,
		working: 68,
		investing: 58,
		safety: 72,
		health: 68,
		education: 74,
		cost: 44,
		governance: 54,
		digital: 76,
		tourism: 64,
		conflict: 10,
		openness: 70,
		medianAge: 43,
		popGrowth: -.3,
		urban: 72,
		language: 40,
		tax: 48
	},
	ROU: {
		ppp: 42e3,
		growth: 2.4,
		inflation: 5.2,
		unemployment: 5.4,
		living: 60,
		working: 64,
		investing: 60,
		safety: 70,
		health: 62,
		education: 70,
		cost: 40,
		governance: 56,
		digital: 74,
		tourism: 56,
		conflict: 10,
		openness: 72,
		medianAge: 42,
		popGrowth: -.4,
		urban: 54,
		language: 42,
		tax: 40
	},
	UKR: {
		ppp: 15e3,
		growth: 3.2,
		inflation: 8,
		unemployment: 12,
		living: 46,
		working: 44,
		investing: 34,
		safety: 42,
		health: 52,
		education: 74,
		cost: 32,
		governance: 42,
		digital: 70,
		tourism: 36,
		conflict: 78,
		openness: 58,
		medianAge: 41,
		popGrowth: -.6,
		urban: 70,
		language: 40,
		tax: 38
	},
	RUS: {
		ppp: 38e3,
		growth: 2.2,
		inflation: 7.5,
		unemployment: 2.6,
		living: 52,
		working: 58,
		investing: 40,
		safety: 56,
		health: 60,
		education: 74,
		cost: 40,
		governance: 36,
		digital: 74,
		tourism: 42,
		conflict: 48,
		openness: 34,
		medianAge: 40,
		popGrowth: -.2,
		urban: 75,
		language: 30,
		tax: 36
	},
	TUR: {
		ppp: 38e3,
		growth: 3.2,
		inflation: 42,
		unemployment: 8.8,
		living: 56,
		working: 54,
		investing: 48,
		safety: 58,
		health: 64,
		education: 64,
		cost: 42,
		governance: 44,
		digital: 72,
		tourism: 84,
		conflict: 28,
		openness: 52,
		medianAge: 33,
		popGrowth: .6,
		urban: 77,
		language: 32,
		tax: 38
	},
	CHN: {
		ppp: 24e3,
		growth: 4.8,
		inflation: .6,
		unemployment: 5.1,
		living: 62,
		working: 70,
		investing: 64,
		safety: 74,
		health: 72,
		education: 74,
		cost: 48,
		governance: 58,
		digital: 82,
		tourism: 62,
		conflict: 18,
		openness: 52,
		medianAge: 39,
		popGrowth: 0,
		urban: 64,
		language: 28,
		tax: 38
	},
	JPN: {
		ppp: 5e4,
		growth: .8,
		inflation: 2.2,
		unemployment: 2.5,
		living: 84,
		working: 78,
		investing: 62,
		safety: 92,
		health: 88,
		education: 86,
		cost: 70,
		governance: 84,
		digital: 86,
		tourism: 74,
		conflict: 8,
		openness: 70,
		medianAge: 49,
		popGrowth: -.4,
		urban: 92,
		language: 34,
		tax: 50
	},
	KOR: {
		ppp: 52e3,
		growth: 2.2,
		inflation: 2.2,
		unemployment: 2.8,
		living: 76,
		working: 74,
		investing: 72,
		safety: 80,
		health: 84,
		education: 88,
		cost: 64,
		governance: 74,
		digital: 94,
		tourism: 64,
		conflict: 16,
		openness: 74,
		medianAge: 45,
		popGrowth: 0,
		urban: 81,
		language: 40,
		tax: 44
	},
	TWN: {
		ppp: 72e3,
		growth: 3.4,
		inflation: 2,
		unemployment: 3.4,
		living: 80,
		working: 78,
		investing: 76,
		safety: 84,
		health: 82,
		education: 86,
		cost: 62,
		governance: 78,
		digital: 92,
		tourism: 58,
		conflict: 20,
		openness: 78,
		medianAge: 44,
		popGrowth: 0,
		urban: 80,
		language: 36,
		tax: 34
	},
	HKG: {
		ppp: 74e3,
		growth: 2.4,
		inflation: 1.6,
		unemployment: 3,
		living: 74,
		working: 76,
		investing: 78,
		safety: 86,
		health: 82,
		education: 82,
		cost: 88,
		governance: 74,
		digital: 94,
		tourism: 78,
		conflict: 12,
		openness: 92,
		medianAge: 46,
		popGrowth: .2,
		urban: 100,
		language: 70,
		tax: 28
	},
	SGP: {
		ppp: 125e3,
		growth: 2.8,
		inflation: 2.2,
		unemployment: 2.1,
		living: 84,
		working: 84,
		investing: 88,
		safety: 94,
		health: 86,
		education: 88,
		cost: 86,
		governance: 90,
		digital: 96,
		tourism: 76,
		conflict: 4,
		openness: 96,
		medianAge: 42,
		popGrowth: .8,
		urban: 100,
		language: 94,
		tax: 26
	},
	IND: {
		ppp: 11e3,
		growth: 6.6,
		inflation: 4.6,
		unemployment: 7.6,
		living: 50,
		working: 56,
		investing: 72,
		safety: 56,
		health: 48,
		education: 54,
		cost: 30,
		governance: 52,
		digital: 58,
		tourism: 52,
		conflict: 26,
		openness: 56,
		medianAge: 28,
		popGrowth: .9,
		urban: 36,
		language: 74,
		tax: 36
	},
	IDN: {
		ppp: 15e3,
		growth: 5,
		inflation: 2.4,
		unemployment: 4.8,
		living: 54,
		working: 58,
		investing: 66,
		safety: 62,
		health: 52,
		education: 56,
		cost: 34,
		governance: 52,
		digital: 62,
		tourism: 70,
		conflict: 16,
		openness: 60,
		medianAge: 30,
		popGrowth: .8,
		urban: 58,
		language: 42,
		tax: 32
	},
	VNM: {
		ppp: 15e3,
		growth: 6.2,
		inflation: 3.2,
		unemployment: 2.2,
		living: 58,
		working: 66,
		investing: 70,
		safety: 72,
		health: 58,
		education: 62,
		cost: 34,
		governance: 50,
		digital: 68,
		tourism: 66,
		conflict: 10,
		openness: 66,
		medianAge: 32,
		popGrowth: .7,
		urban: 40,
		language: 28,
		tax: 30
	},
	THA: {
		ppp: 22e3,
		growth: 2.6,
		inflation: 1.2,
		unemployment: 1.1,
		living: 62,
		working: 64,
		investing: 60,
		safety: 66,
		health: 68,
		education: 64,
		cost: 42,
		governance: 52,
		digital: 72,
		tourism: 86,
		conflict: 18,
		openness: 66,
		medianAge: 40,
		popGrowth: .1,
		urban: 52,
		language: 36,
		tax: 34
	},
	MYS: {
		ppp: 32e3,
		growth: 4.4,
		inflation: 2.2,
		unemployment: 3.3,
		living: 64,
		working: 66,
		investing: 66,
		safety: 66,
		health: 66,
		education: 68,
		cost: 42,
		governance: 62,
		digital: 76,
		tourism: 68,
		conflict: 12,
		openness: 74,
		medianAge: 31,
		popGrowth: 1,
		urban: 78,
		language: 70,
		tax: 32
	},
	PHL: {
		ppp: 12e3,
		growth: 5.6,
		inflation: 3.2,
		unemployment: 4.2,
		living: 50,
		working: 56,
		investing: 60,
		safety: 52,
		health: 50,
		education: 58,
		cost: 34,
		governance: 48,
		digital: 60,
		tourism: 62,
		conflict: 26,
		openness: 62,
		medianAge: 26,
		popGrowth: 1.4,
		urban: 48,
		language: 84,
		tax: 34
	},
	AUS: {
		ppp: 64e3,
		growth: 1.7,
		inflation: 2.8,
		unemployment: 4.2,
		living: 84,
		working: 76,
		investing: 72,
		safety: 78,
		health: 82,
		education: 82,
		cost: 76,
		governance: 84,
		digital: 86,
		tourism: 76,
		conflict: 6,
		openness: 80,
		medianAge: 38,
		popGrowth: 1.2,
		urban: 86,
		language: 98,
		tax: 50
	},
	NZL: {
		ppp: 52e3,
		growth: 1.2,
		inflation: 2.4,
		unemployment: 4.6,
		living: 86,
		working: 74,
		investing: 66,
		safety: 80,
		health: 80,
		education: 82,
		cost: 72,
		governance: 88,
		digital: 86,
		tourism: 80,
		conflict: 4,
		openness: 82,
		medianAge: 38,
		popGrowth: .8,
		urban: 87,
		language: 98,
		tax: 48
	},
	ZAF: {
		ppp: 16e3,
		growth: .8,
		inflation: 4.6,
		unemployment: 32,
		living: 46,
		working: 36,
		investing: 48,
		safety: 32,
		health: 48,
		education: 56,
		cost: 42,
		governance: 52,
		digital: 62,
		tourism: 64,
		conflict: 28,
		openness: 60,
		medianAge: 28,
		popGrowth: 1,
		urban: 68,
		language: 78,
		tax: 46
	},
	NGA: {
		ppp: 6200,
		growth: 3.2,
		inflation: 24,
		unemployment: 5.2,
		living: 36,
		working: 42,
		investing: 46,
		safety: 30,
		health: 32,
		education: 42,
		cost: 36,
		governance: 34,
		digital: 46,
		tourism: 24,
		conflict: 46,
		openness: 44,
		medianAge: 18,
		popGrowth: 2.4,
		urban: 53,
		language: 78,
		tax: 30
	},
	KEN: {
		ppp: 6500,
		growth: 5,
		inflation: 5.4,
		unemployment: 5.6,
		living: 44,
		working: 48,
		investing: 54,
		safety: 42,
		health: 42,
		education: 50,
		cost: 36,
		governance: 44,
		digital: 52,
		tourism: 58,
		conflict: 28,
		openness: 54,
		medianAge: 20,
		popGrowth: 1.9,
		urban: 29,
		language: 70,
		tax: 36
	},
	GHA: {
		ppp: 7e3,
		growth: 4.2,
		inflation: 16,
		unemployment: 3.6,
		living: 44,
		working: 46,
		investing: 50,
		safety: 54,
		health: 42,
		education: 50,
		cost: 36,
		governance: 50,
		digital: 52,
		tourism: 36,
		conflict: 14,
		openness: 56,
		medianAge: 21,
		popGrowth: 1.9,
		urban: 58,
		language: 72,
		tax: 34
	},
	RWA: {
		ppp: 3200,
		growth: 7,
		inflation: 5.5,
		unemployment: 13,
		living: 48,
		working: 50,
		investing: 56,
		safety: 74,
		health: 48,
		education: 48,
		cost: 34,
		governance: 62,
		digital: 48,
		tourism: 46,
		conflict: 16,
		openness: 58,
		medianAge: 20,
		popGrowth: 2.2,
		urban: 18,
		language: 36,
		tax: 32
	},
	ETH: {
		ppp: 3200,
		growth: 6.4,
		inflation: 18,
		unemployment: 4,
		living: 36,
		working: 40,
		investing: 44,
		safety: 42,
		health: 36,
		education: 40,
		cost: 30,
		governance: 38,
		digital: 32,
		tourism: 36,
		conflict: 42,
		openness: 40,
		medianAge: 19,
		popGrowth: 2.5,
		urban: 23,
		language: 36,
		tax: 28
	},
	EGY: {
		ppp: 17e3,
		growth: 3.6,
		inflation: 22,
		unemployment: 7,
		living: 46,
		working: 46,
		investing: 50,
		safety: 58,
		health: 50,
		education: 54,
		cost: 32,
		governance: 40,
		digital: 56,
		tourism: 70,
		conflict: 24,
		openness: 48,
		medianAge: 24,
		popGrowth: 1.6,
		urban: 43,
		language: 38,
		tax: 32
	},
	MAR: {
		ppp: 1e4,
		growth: 3.2,
		inflation: 1.8,
		unemployment: 9.2,
		living: 52,
		working: 48,
		investing: 56,
		safety: 66,
		health: 50,
		education: 50,
		cost: 34,
		governance: 50,
		digital: 62,
		tourism: 74,
		conflict: 14,
		openness: 58,
		medianAge: 30,
		popGrowth: 1,
		urban: 64,
		language: 42,
		tax: 36
	},
	ARE: {
		ppp: 76e3,
		growth: 3.8,
		inflation: 2.1,
		unemployment: 2.4,
		living: 74,
		working: 76,
		investing: 80,
		safety: 90,
		health: 78,
		education: 74,
		cost: 70,
		governance: 70,
		digital: 90,
		tourism: 82,
		conflict: 8,
		openness: 82,
		medianAge: 33,
		popGrowth: .8,
		urban: 87,
		language: 78,
		tax: 12
	},
	SAU: {
		ppp: 62e3,
		growth: 2.6,
		inflation: 1.8,
		unemployment: 4.8,
		living: 64,
		working: 62,
		investing: 72,
		safety: 78,
		health: 72,
		education: 70,
		cost: 48,
		governance: 58,
		digital: 84,
		tourism: 62,
		conflict: 16,
		openness: 64,
		medianAge: 30,
		popGrowth: 1.2,
		urban: 85,
		language: 52,
		tax: 14
	},
	QAT: {
		ppp: 114e3,
		growth: 2.2,
		inflation: 1.6,
		unemployment: .6,
		living: 74,
		working: 72,
		investing: 74,
		safety: 90,
		health: 78,
		education: 72,
		cost: 68,
		governance: 68,
		digital: 88,
		tourism: 64,
		conflict: 6,
		openness: 74,
		medianAge: 33,
		popGrowth: .6,
		urban: 99,
		language: 64,
		tax: 10
	},
	ISR: {
		ppp: 52e3,
		growth: 2,
		inflation: 3.2,
		unemployment: 3.4,
		living: 70,
		working: 74,
		investing: 74,
		safety: 60,
		health: 80,
		education: 84,
		cost: 74,
		governance: 68,
		digital: 90,
		tourism: 58,
		conflict: 42,
		openness: 74,
		medianAge: 30,
		popGrowth: 1.5,
		urban: 93,
		language: 78,
		tax: 46
	},
	IRN: {
		ppp: 18e3,
		growth: 2.4,
		inflation: 32,
		unemployment: 8.5,
		living: 42,
		working: 44,
		investing: 28,
		safety: 52,
		health: 58,
		education: 66,
		cost: 36,
		governance: 32,
		digital: 58,
		tourism: 40,
		conflict: 36,
		openness: 24,
		medianAge: 33,
		popGrowth: .8,
		urban: 76,
		language: 28,
		tax: 28
	},
	PAK: {
		ppp: 6500,
		growth: 2.6,
		inflation: 12,
		unemployment: 6.5,
		living: 38,
		working: 42,
		investing: 40,
		safety: 36,
		health: 38,
		education: 40,
		cost: 28,
		governance: 34,
		digital: 42,
		tourism: 28,
		conflict: 44,
		openness: 36,
		medianAge: 22,
		popGrowth: 1.8,
		urban: 38,
		language: 58,
		tax: 28
	},
	BGD: {
		ppp: 8500,
		growth: 5.4,
		inflation: 8,
		unemployment: 4.4,
		living: 44,
		working: 52,
		investing: 52,
		safety: 54,
		health: 44,
		education: 50,
		cost: 28,
		governance: 38,
		digital: 48,
		tourism: 22,
		conflict: 16,
		openness: 46,
		medianAge: 27,
		popGrowth: 1,
		urban: 40,
		language: 36,
		tax: 28
	},
	LKA: {
		ppp: 14e3,
		growth: 4,
		inflation: 3.5,
		unemployment: 4.8,
		living: 54,
		working: 50,
		investing: 46,
		safety: 64,
		health: 62,
		education: 70,
		cost: 36,
		governance: 48,
		digital: 52,
		tourism: 68,
		conflict: 12,
		openness: 50,
		medianAge: 33,
		popGrowth: .4,
		urban: 19,
		language: 48,
		tax: 34
	},
	VEN: {
		ppp: 8e3,
		growth: 3,
		inflation: 55,
		unemployment: 6,
		living: 28,
		working: 30,
		investing: 18,
		safety: 22,
		health: 36,
		education: 56,
		cost: 40,
		governance: 18,
		digital: 48,
		tourism: 28,
		conflict: 36,
		openness: 22,
		medianAge: 29,
		popGrowth: -.4,
		urban: 88,
		language: 20,
		tax: 24
	},
	CUB: {
		ppp: 1e4,
		growth: 1,
		inflation: 18,
		unemployment: 2.4,
		living: 42,
		working: 38,
		investing: 16,
		safety: 64,
		health: 68,
		education: 74,
		cost: 30,
		governance: 34,
		digital: 28,
		tourism: 58,
		conflict: 10,
		openness: 18,
		medianAge: 42,
		popGrowth: -.2,
		urban: 77,
		language: 24,
		tax: 40
	},
	HTI: {
		ppp: 3e3,
		growth: -1,
		inflation: 22,
		unemployment: 14,
		living: 18,
		working: 20,
		investing: 12,
		safety: 12,
		health: 22,
		education: 32,
		cost: 40,
		governance: 14,
		digital: 28,
		tourism: 18,
		conflict: 72,
		openness: 28,
		medianAge: 24,
		popGrowth: 1.2,
		urban: 58,
		language: 24,
		tax: 20
	},
	AFG: {
		ppp: 2e3,
		growth: -1.5,
		inflation: 8,
		unemployment: 12,
		living: 18,
		working: 16,
		investing: 10,
		safety: 14,
		health: 22,
		education: 24,
		cost: 28,
		governance: 12,
		digital: 22,
		tourism: 8,
		conflict: 90,
		openness: 16,
		medianAge: 18,
		popGrowth: 2.2,
		urban: 26,
		language: 16,
		tax: 12
	},
	SYR: {
		ppp: 3e3,
		growth: -.5,
		inflation: 40,
		unemployment: 16,
		living: 16,
		working: 18,
		investing: 8,
		safety: 18,
		health: 28,
		education: 40,
		cost: 36,
		governance: 12,
		digital: 30,
		tourism: 12,
		conflict: 86,
		openness: 12,
		medianAge: 23,
		popGrowth: 1,
		urban: 56,
		language: 24,
		tax: 16
	},
	YEM: {
		ppp: 2e3,
		growth: -1,
		inflation: 18,
		unemployment: 13,
		living: 14,
		working: 16,
		investing: 8,
		safety: 12,
		health: 20,
		education: 28,
		cost: 34,
		governance: 10,
		digital: 24,
		tourism: 10,
		conflict: 94,
		openness: 16,
		medianAge: 20,
		popGrowth: 2,
		urban: 38,
		language: 16,
		tax: 12
	},
	SDN: {
		ppp: 2500,
		growth: -2,
		inflation: 80,
		unemployment: 12,
		living: 16,
		working: 16,
		investing: 8,
		safety: 14,
		health: 22,
		education: 30,
		cost: 36,
		governance: 12,
		digital: 28,
		tourism: 12,
		conflict: 90,
		openness: 16,
		medianAge: 19,
		popGrowth: 2.2,
		urban: 36,
		language: 28,
		tax: 14
	},
	SSD: {
		ppp: 1200,
		growth: -1,
		inflation: 40,
		unemployment: 14,
		living: 12,
		working: 12,
		investing: 6,
		safety: 10,
		health: 14,
		education: 18,
		cost: 40,
		governance: 8,
		digital: 12,
		tourism: 6,
		conflict: 96,
		openness: 14,
		medianAge: 18,
		popGrowth: 1.6,
		urban: 20,
		language: 22,
		tax: 8
	},
	SOM: {
		ppp: 1500,
		growth: 3,
		inflation: 5,
		unemployment: 18,
		living: 16,
		working: 18,
		investing: 14,
		safety: 12,
		health: 16,
		education: 18,
		cost: 36,
		governance: 10,
		digital: 28,
		tourism: 8,
		conflict: 84,
		openness: 24,
		medianAge: 16,
		popGrowth: 2.8,
		urban: 46,
		language: 24,
		tax: 10
	},
	MMR: {
		ppp: 5e3,
		growth: 1,
		inflation: 18,
		unemployment: 4,
		living: 30,
		working: 32,
		investing: 22,
		safety: 28,
		health: 32,
		education: 42,
		cost: 28,
		governance: 18,
		digital: 40,
		tourism: 28,
		conflict: 76,
		openness: 28,
		medianAge: 29,
		popGrowth: .7,
		urban: 32,
		language: 18,
		tax: 16
	},
	PRK: {
		ppp: 1800,
		growth: .6,
		inflation: 4,
		unemployment: 3.5,
		living: 22,
		working: 24,
		investing: 8,
		safety: 40,
		health: 36,
		education: 48,
		cost: 20,
		governance: 16,
		digital: 8,
		tourism: 6,
		conflict: 36,
		openness: 6,
		medianAge: 35,
		popGrowth: .4,
		urban: 62,
		language: 4,
		tax: 20
	},
	IRQ: {
		ppp: 12e3,
		growth: 2.6,
		inflation: 4,
		unemployment: 15,
		living: 36,
		working: 38,
		investing: 34,
		safety: 30,
		health: 42,
		education: 46,
		cost: 32,
		governance: 28,
		digital: 48,
		tourism: 22,
		conflict: 48,
		openness: 40,
		medianAge: 21,
		popGrowth: 2.2,
		urban: 71,
		language: 24,
		tax: 16
	},
	LBN: {
		ppp: 14e3,
		growth: 1,
		inflation: 20,
		unemployment: 12,
		living: 40,
		working: 38,
		investing: 24,
		safety: 42,
		health: 58,
		education: 68,
		cost: 52,
		governance: 22,
		digital: 64,
		tourism: 48,
		conflict: 40,
		openness: 36,
		medianAge: 32,
		popGrowth: -.5,
		urban: 89,
		language: 62,
		tax: 24
	},
	JOR: {
		ppp: 11e3,
		growth: 2.4,
		inflation: 2.2,
		unemployment: 18,
		living: 52,
		working: 44,
		investing: 48,
		safety: 68,
		health: 64,
		education: 66,
		cost: 46,
		governance: 54,
		digital: 66,
		tourism: 62,
		conflict: 16,
		openness: 60,
		medianAge: 24,
		popGrowth: 1.4,
		urban: 92,
		language: 62,
		tax: 28
	},
	GEO: {
		ppp: 22e3,
		growth: 6,
		inflation: 2.4,
		unemployment: 14,
		living: 60,
		working: 56,
		investing: 62,
		safety: 72,
		health: 60,
		education: 72,
		cost: 40,
		governance: 60,
		digital: 74,
		tourism: 72,
		conflict: 24,
		openness: 70,
		medianAge: 37,
		popGrowth: -.2,
		urban: 60,
		language: 36,
		tax: 32
	},
	KAZ: {
		ppp: 32e3,
		growth: 4,
		inflation: 8,
		unemployment: 4.7,
		living: 54,
		working: 58,
		investing: 58,
		safety: 64,
		health: 60,
		education: 72,
		cost: 36,
		governance: 46,
		digital: 72,
		tourism: 32,
		conflict: 12,
		openness: 56,
		medianAge: 31,
		popGrowth: 1.2,
		urban: 58,
		language: 30,
		tax: 30
	},
	UZB: {
		ppp: 1e4,
		growth: 6,
		inflation: 9,
		unemployment: 5,
		living: 48,
		working: 54,
		investing: 54,
		safety: 70,
		health: 56,
		education: 68,
		cost: 28,
		governance: 40,
		digital: 58,
		tourism: 48,
		conflict: 10,
		openness: 42,
		medianAge: 28,
		popGrowth: 1.6,
		urban: 50,
		language: 22,
		tax: 28
	},
	MNG: {
		ppp: 15e3,
		growth: 4.5,
		inflation: 7,
		unemployment: 5.5,
		living: 48,
		working: 52,
		investing: 50,
		safety: 62,
		health: 54,
		education: 68,
		cost: 36,
		governance: 50,
		digital: 62,
		tourism: 40,
		conflict: 8,
		openness: 58,
		medianAge: 28,
		popGrowth: 1.2,
		urban: 69,
		language: 24,
		tax: 30
	},
	CRI: {
		ppp: 26e3,
		growth: 4,
		inflation: 1.8,
		unemployment: 8,
		living: 70,
		working: 60,
		investing: 58,
		safety: 64,
		health: 70,
		education: 68,
		cost: 56,
		governance: 68,
		digital: 74,
		tourism: 82,
		conflict: 8,
		openness: 70,
		medianAge: 34,
		popGrowth: .6,
		urban: 82,
		language: 36,
		tax: 38
	},
	PAN: {
		ppp: 38e3,
		growth: 4.2,
		inflation: 1.6,
		unemployment: 7,
		living: 64,
		working: 62,
		investing: 66,
		safety: 58,
		health: 66,
		education: 62,
		cost: 52,
		governance: 52,
		digital: 68,
		tourism: 64,
		conflict: 10,
		openness: 78,
		medianAge: 30,
		popGrowth: 1.3,
		urban: 69,
		language: 40,
		tax: 30
	},
	URY: {
		ppp: 3e4,
		growth: 2,
		inflation: 5,
		unemployment: 8,
		living: 70,
		working: 62,
		investing: 60,
		safety: 64,
		health: 72,
		education: 72,
		cost: 56,
		governance: 74,
		digital: 78,
		tourism: 66,
		conflict: 6,
		openness: 72,
		medianAge: 36,
		popGrowth: .2,
		urban: 96,
		language: 28,
		tax: 44
	},
	DOM: {
		ppp: 24e3,
		growth: 4.6,
		inflation: 3.8,
		unemployment: 5.2,
		living: 52,
		working: 56,
		investing: 58,
		safety: 48,
		health: 54,
		education: 52,
		cost: 40,
		governance: 48,
		digital: 60,
		tourism: 80,
		conflict: 14,
		openness: 62,
		medianAge: 28,
		popGrowth: .9,
		urban: 83,
		language: 28,
		tax: 32
	},
	JAM: {
		ppp: 12e3,
		growth: 1.8,
		inflation: 5,
		unemployment: 4.4,
		living: 50,
		working: 50,
		investing: 46,
		safety: 44,
		health: 56,
		education: 62,
		cost: 48,
		governance: 52,
		digital: 60,
		tourism: 82,
		conflict: 16,
		openness: 58,
		medianAge: 30,
		popGrowth: .1,
		urban: 57,
		language: 96,
		tax: 36
	},
	MUS: {
		ppp: 26e3,
		growth: 4,
		inflation: 3.5,
		unemployment: 6,
		living: 66,
		working: 62,
		investing: 60,
		safety: 70,
		health: 68,
		education: 70,
		cost: 48,
		governance: 68,
		digital: 70,
		tourism: 84,
		conflict: 4,
		openness: 72,
		medianAge: 38,
		popGrowth: .1,
		urban: 41,
		language: 70,
		tax: 30
	},
	MDV: {
		ppp: 24e3,
		growth: 5,
		inflation: 2,
		unemployment: 4,
		living: 62,
		working: 60,
		investing: 54,
		safety: 74,
		health: 68,
		education: 62,
		cost: 62,
		governance: 50,
		digital: 64,
		tourism: 94,
		conflict: 6,
		openness: 58,
		medianAge: 31,
		popGrowth: .4,
		urban: 41,
		language: 62,
		tax: 24
	},
	HRV: {
		ppp: 42e3,
		growth: 3,
		inflation: 3,
		unemployment: 5.4,
		living: 72,
		working: 66,
		investing: 62,
		safety: 76,
		health: 74,
		education: 76,
		cost: 54,
		governance: 64,
		digital: 78,
		tourism: 90,
		conflict: 8,
		openness: 74,
		medianAge: 44,
		popGrowth: -.4,
		urban: 58,
		language: 50,
		tax: 46
	},
	EST: {
		ppp: 46e3,
		growth: 1.4,
		inflation: 3.4,
		unemployment: 7,
		living: 76,
		working: 74,
		investing: 74,
		safety: 80,
		health: 76,
		education: 84,
		cost: 58,
		governance: 82,
		digital: 92,
		tourism: 56,
		conflict: 12,
		openness: 86,
		medianAge: 42,
		popGrowth: 0,
		urban: 69,
		language: 62,
		tax: 44
	},
	BLR: {
		ppp: 22e3,
		growth: 2,
		inflation: 6,
		unemployment: 3.4,
		living: 50,
		working: 54,
		investing: 28,
		safety: 64,
		health: 64,
		education: 74,
		cost: 32,
		governance: 28,
		digital: 70,
		tourism: 24,
		conflict: 22,
		openness: 24,
		medianAge: 41,
		popGrowth: -.4,
		urban: 80,
		language: 24,
		tax: 36
	},
	PSE: {
		ppp: 6e3,
		growth: -2,
		inflation: 12,
		unemployment: 28,
		living: 32,
		working: 24,
		investing: 16,
		safety: 22,
		health: 48,
		education: 62,
		cost: 42,
		governance: 28,
		digital: 56,
		tourism: 16,
		conflict: 84,
		openness: 22,
		medianAge: 20,
		popGrowth: 2.2,
		urban: 77,
		language: 48,
		tax: 18
	},
	LBY: {
		ppp: 18e3,
		growth: 2,
		inflation: 3,
		unemployment: 18,
		living: 36,
		working: 34,
		investing: 24,
		safety: 32,
		health: 46,
		education: 52,
		cost: 36,
		governance: 18,
		digital: 44,
		tourism: 22,
		conflict: 52,
		openness: 28,
		medianAge: 28,
		popGrowth: 1.2,
		urban: 81,
		language: 24,
		tax: 12
	},
	DZA: {
		ppp: 14e3,
		growth: 3.2,
		inflation: 5,
		unemployment: 12,
		living: 46,
		working: 42,
		investing: 40,
		safety: 58,
		health: 56,
		education: 58,
		cost: 32,
		governance: 38,
		digital: 54,
		tourism: 28,
		conflict: 18,
		openness: 34,
		medianAge: 28,
		popGrowth: 1.4,
		urban: 74,
		language: 24,
		tax: 36
	},
	TUN: {
		ppp: 12e3,
		growth: 1.4,
		inflation: 6,
		unemployment: 15,
		living: 52,
		working: 42,
		investing: 40,
		safety: 60,
		health: 60,
		education: 64,
		cost: 34,
		governance: 46,
		digital: 58,
		tourism: 64,
		conflict: 16,
		openness: 48,
		medianAge: 33,
		popGrowth: .7,
		urban: 70,
		language: 40,
		tax: 40
	},
	SEN: {
		ppp: 4500,
		growth: 5.5,
		inflation: 3,
		unemployment: 3.4,
		living: 44,
		working: 46,
		investing: 52,
		safety: 58,
		health: 40,
		education: 40,
		cost: 36,
		governance: 52,
		digital: 50,
		tourism: 42,
		conflict: 18,
		openness: 56,
		medianAge: 19,
		popGrowth: 2.5,
		urban: 49,
		language: 36,
		tax: 32
	},
	CIV: {
		ppp: 6500,
		growth: 6,
		inflation: 3.5,
		unemployment: 2.8,
		living: 42,
		working: 48,
		investing: 54,
		safety: 48,
		health: 38,
		education: 42,
		cost: 38,
		governance: 44,
		digital: 48,
		tourism: 28,
		conflict: 22,
		openness: 54,
		medianAge: 18,
		popGrowth: 2.4,
		urban: 52,
		language: 36,
		tax: 30
	},
	TZA: {
		ppp: 3600,
		growth: 5.4,
		inflation: 3.6,
		unemployment: 2.6,
		living: 42,
		working: 46,
		investing: 52,
		safety: 58,
		health: 40,
		education: 44,
		cost: 30,
		governance: 46,
		digital: 38,
		tourism: 62,
		conflict: 14,
		openness: 50,
		medianAge: 18,
		popGrowth: 2.8,
		urban: 36,
		language: 48,
		tax: 30
	}
};
var TOURISM = /* @__PURE__ */ new Set([
	"ESP",
	"ITA",
	"GRC",
	"THA",
	"HRV",
	"TUR",
	"PRT",
	"ISL",
	"JAM",
	"DOM",
	"CRI",
	"MDV",
	"MUS",
	"FJI",
	"SYC",
	"ATG",
	"CUB",
	"MAR",
	"EGY",
	"MEX",
	"FRA",
	"AUT",
	"CZE",
	"KHM",
	"LAO",
	"CPV",
	"BRB",
	"BHS",
	"LCA",
	"VUT"
]);
var TECH = /* @__PURE__ */ new Set([
	"USA",
	"IND",
	"SGP",
	"KOR",
	"TWN",
	"ISR",
	"SWE",
	"NLD",
	"GBR",
	"CAN",
	"DEU",
	"FRA",
	"JPN",
	"ARE",
	"EST",
	"IRL",
	"FIN",
	"AUS"
]);
var ENERGY_EXPORT = /* @__PURE__ */ new Set([
	"NOR",
	"QAT",
	"SAU",
	"ARE",
	"KAZ",
	"AGO",
	"AZE",
	"KWT",
	"OMN",
	"DZA",
	"LBY"
]);
var LOW_INFL = /* @__PURE__ */ new Set([
	"JPN",
	"CHE",
	"CHN"
]);
var PIN = {
	USA: {
		2019: {
			growth: 2.3,
			inflation: 1.8,
			unemployment: 3.7
		},
		2020: {
			growth: -2.2,
			inflation: 1.2,
			unemployment: 8.1
		},
		2021: {
			growth: 5.8,
			inflation: 4.7,
			unemployment: 5.4
		},
		2022: {
			growth: 1.9,
			inflation: 8,
			unemployment: 3.6
		},
		2023: {
			growth: 2.5,
			inflation: 4.1,
			unemployment: 3.6
		},
		2024: {
			growth: 2.8,
			inflation: 3,
			unemployment: 4.1
		},
		2025: {
			growth: 2.2,
			inflation: 2.6,
			unemployment: 4.2
		},
		2026: {
			growth: 2,
			inflation: 2.4,
			unemployment: 4.2
		}
	},
	CHN: {
		2016: {
			growth: 6.8,
			inflation: 2
		},
		2017: {
			growth: 6.9,
			inflation: 1.6
		},
		2018: {
			growth: 6.7,
			inflation: 2.1
		},
		2019: {
			growth: 6,
			inflation: 2.9
		},
		2020: {
			growth: 2.2,
			inflation: 2.5,
			unemployment: 5
		},
		2021: {
			growth: 8.4,
			inflation: .9
		},
		2022: {
			growth: 3,
			inflation: 2
		},
		2023: {
			growth: 5.2,
			inflation: .2
		},
		2024: {
			growth: 5,
			inflation: .2
		},
		2025: {
			growth: 4.8,
			inflation: .4
		},
		2026: {
			growth: 4.5,
			inflation: .8
		}
	},
	IND: {
		2019: {
			growth: 3.9,
			inflation: 3.7
		},
		2020: {
			growth: -5.8,
			inflation: 6.2
		},
		2021: {
			growth: 9.7,
			inflation: 5.5
		},
		2022: {
			growth: 7,
			inflation: 6.7
		},
		2023: {
			growth: 8.2,
			inflation: 5.4
		},
		2024: {
			growth: 6.5,
			inflation: 4.8
		},
		2025: {
			growth: 6.4,
			inflation: 4.2
		},
		2026: {
			growth: 6.3,
			inflation: 4
		}
	},
	DEU: {
		2020: {
			growth: -3.8,
			inflation: .4
		},
		2021: {
			growth: 3.2,
			inflation: 3.2
		},
		2022: {
			growth: 1.4,
			inflation: 8.7
		},
		2023: {
			growth: -.3,
			inflation: 6
		},
		2024: {
			growth: -.2,
			inflation: 2.4
		},
		2025: {
			growth: .4,
			inflation: 2.1
		},
		2026: {
			growth: .8,
			inflation: 2
		}
	},
	GBR: {
		2020: {
			growth: -10.3,
			inflation: .9
		},
		2021: {
			growth: 8.6,
			inflation: 2.6
		},
		2022: {
			growth: 4.8,
			inflation: 9.1
		},
		2023: {
			growth: .3,
			inflation: 6.8
		},
		2024: {
			growth: 1.1,
			inflation: 2.5
		},
		2026: {
			growth: 1.3,
			inflation: 2.2
		}
	},
	JPN: {
		2020: {
			growth: -4.2,
			inflation: 0
		},
		2021: {
			growth: 2.7,
			inflation: -.2
		},
		2022: {
			growth: 1,
			inflation: 2.5
		},
		2023: {
			growth: 1.5,
			inflation: 3.3
		},
		2024: {
			growth: .8,
			inflation: 2.7
		},
		2026: {
			growth: .7,
			inflation: 1.8
		}
	},
	FRA: {
		2020: {
			growth: -7.5,
			inflation: .5
		},
		2021: {
			growth: 6.4,
			inflation: 2.1
		},
		2022: {
			growth: 2.6,
			inflation: 5.9
		},
		2024: {
			growth: 1.1,
			inflation: 2.3
		},
		2026: {
			growth: 1,
			inflation: 1.8
		}
	},
	BRA: {
		2020: {
			growth: -3.3,
			inflation: 3.2
		},
		2021: {
			growth: 4.8,
			inflation: 8.3
		},
		2022: {
			growth: 3,
			inflation: 9.3
		},
		2024: {
			growth: 3.2,
			inflation: 4.4
		},
		2026: {
			growth: 2,
			inflation: 3.8
		}
	},
	TUR: {
		2018: {
			inflation: 16.3,
			growth: 3
		},
		2020: {
			growth: 1.9,
			inflation: 12.3
		},
		2021: {
			growth: 11.4,
			inflation: 19.6
		},
		2022: {
			growth: 5.5,
			inflation: 72
		},
		2023: {
			growth: 4.5,
			inflation: 54
		},
		2024: {
			growth: 3.2,
			inflation: 58
		},
		2025: {
			growth: 3.2,
			inflation: 34
		},
		2026: {
			growth: 3.4,
			inflation: 26
		}
	},
	ARG: {
		2018: {
			inflation: 34,
			growth: -2.6
		},
		2019: {
			inflation: 54,
			growth: -2
		},
		2020: {
			growth: -9.9,
			inflation: 42
		},
		2021: {
			growth: 10.4,
			inflation: 48
		},
		2022: {
			growth: 5,
			inflation: 72
		},
		2023: {
			growth: -1.6,
			inflation: 133
		},
		2024: {
			growth: -1.8,
			inflation: 118
		},
		2025: {
			growth: 4.5,
			inflation: 42
		},
		2026: {
			growth: 3.5,
			inflation: 28
		}
	},
	UKR: {
		2019: {
			growth: 3.2,
			inflation: 7.9,
			unemployment: 8.5
		},
		2020: {
			growth: -3.8,
			inflation: 2.7
		},
		2021: {
			growth: 3.4,
			inflation: 9.4
		},
		2022: {
			growth: -28.8,
			inflation: 20,
			unemployment: 21
		},
		2023: {
			growth: 5.3,
			inflation: 13,
			unemployment: 17
		},
		2024: {
			growth: 3.5,
			inflation: 6.5,
			unemployment: 14
		},
		2025: {
			growth: 3.2,
			inflation: 8,
			unemployment: 13
		},
		2026: {
			growth: 3.6,
			inflation: 7,
			unemployment: 12
		}
	},
	RUS: {
		2020: {
			growth: -2.7,
			inflation: 3.4
		},
		2021: {
			growth: 5.9,
			inflation: 6.7
		},
		2022: {
			growth: -1.2,
			inflation: 13.8
		},
		2023: {
			growth: 3.6,
			inflation: 5.9
		},
		2024: {
			growth: 4.1,
			inflation: 8.4
		},
		2025: {
			growth: 1.6,
			inflation: 7
		},
		2026: {
			growth: 1.3,
			inflation: 6
		}
	},
	NGA: {
		2020: {
			growth: -1.8,
			inflation: 13
		},
		2022: {
			inflation: 19,
			growth: 3.3
		},
		2023: {
			inflation: 25,
			growth: 2.9
		},
		2024: {
			inflation: 33,
			growth: 3.4
		},
		2025: {
			inflation: 23,
			growth: 3.2
		},
		2026: {
			inflation: 18,
			growth: 3.4
		}
	},
	ZAF: {
		2020: {
			growth: -6,
			unemployment: 29
		},
		2024: {
			growth: .6,
			unemployment: 32.1,
			inflation: 4.4
		},
		2026: {
			growth: 1.4,
			unemployment: 31.5,
			inflation: 4.2
		}
	},
	EGY: {
		2023: {
			inflation: 24,
			growth: 3.8
		},
		2024: {
			inflation: 28,
			growth: 2.4
		},
		2026: {
			inflation: 14,
			growth: 4.2
		}
	},
	ISR: {
		2020: { growth: -1.9 },
		2023: {
			growth: 2,
			inflation: 4.2
		},
		2024: {
			growth: .7,
			inflation: 3.1
		},
		2025: { growth: 2.4 },
		2026: { growth: 3.2 }
	},
	SGP: {
		2020: {
			growth: -3.9,
			inflation: -.2
		},
		2021: { growth: 9.7 },
		2024: {
			growth: 3.8,
			inflation: 2.4
		},
		2026: {
			growth: 2.6,
			inflation: 1.8
		}
	},
	ARE: {
		2020: { growth: -5 },
		2022: {
			growth: 7.5,
			inflation: 4.8
		},
		2024: {
			growth: 3.8,
			inflation: 2.2
		},
		2026: {
			growth: 4,
			inflation: 2
		}
	},
	VNM: {
		2020: { growth: 2.9 },
		2024: {
			growth: 7,
			inflation: 3.6
		},
		2026: {
			growth: 6.2,
			inflation: 3.2
		}
	},
	MEX: {
		2020: { growth: -8.4 },
		2022: {
			inflation: 7.9,
			growth: 3.7
		},
		2024: {
			growth: 1.5,
			inflation: 4.7
		},
		2026: {
			growth: 1.8,
			inflation: 3.6
		}
	},
	IDN: {
		2020: { growth: -2.1 },
		2024: {
			growth: 5,
			inflation: 2.3
		},
		2026: {
			growth: 5,
			inflation: 2.5
		}
	},
	KOR: {
		2020: { growth: -.7 },
		2022: {
			inflation: 5.1,
			growth: 2.7
		},
		2024: {
			growth: 2,
			inflation: 2.3
		},
		2026: {
			growth: 2.1,
			inflation: 2
		}
	},
	AUS: {
		2020: { growth: -2.1 },
		2022: {
			inflation: 6.6,
			growth: 4.1
		},
		2024: {
			growth: 1.1,
			inflation: 3.2
		},
		2026: {
			growth: 2,
			inflation: 2.6
		}
	},
	ESP: {
		2020: {
			growth: -11.2,
			unemployment: 15.5
		},
		2022: {
			inflation: 8.3,
			growth: 6.2
		},
		2024: {
			growth: 3.2,
			unemployment: 11.3,
			inflation: 2.8
		},
		2026: {
			growth: 2.1,
			unemployment: 10.6,
			inflation: 2.2
		}
	},
	ITA: {
		2020: { growth: -8.9 },
		2022: {
			inflation: 8.7,
			growth: 4.8
		},
		2024: {
			growth: .7,
			inflation: 1.1
		},
		2026: {
			growth: .8,
			inflation: 1.7
		}
	},
	CAN: {
		2020: { growth: -5.1 },
		2022: {
			inflation: 6.8,
			growth: 3.8
		},
		2024: {
			growth: 1.3,
			inflation: 2.4,
			unemployment: 6.3
		},
		2026: {
			growth: 1.6,
			inflation: 2,
			unemployment: 6.4
		}
	},
	POL: {
		2020: { growth: -2 },
		2022: {
			inflation: 14.4,
			growth: 5.3
		},
		2024: {
			growth: 2.9,
			inflation: 3.7
		},
		2026: {
			growth: 3.2,
			inflation: 3
		}
	},
	SAU: {
		2020: { growth: -4.3 },
		2022: {
			growth: 7.5,
			inflation: 2.5
		},
		2024: {
			growth: 1.4,
			inflation: 1.7
		},
		2026: {
			growth: 3.4,
			inflation: 1.8
		}
	}
};
function anchorFor(place) {
	const base = SUB[place.subregion] ?? WORLD;
	const patch = O[place.iso];
	return patch ? {
		...base,
		...patch
	} : base;
}
var GLOBAL = {
	2016: {
		growth: .4,
		inflation: -.8,
		unemployment: .5,
		housing: -8,
		sentiment: 2,
		venture: -6,
		tourism: -4
	},
	2017: {
		growth: .6,
		inflation: -.6,
		unemployment: .3,
		housing: -6,
		sentiment: 3,
		venture: -4,
		tourism: -2
	},
	2018: {
		growth: .4,
		inflation: -.3,
		unemployment: .1,
		housing: -4,
		sentiment: 1,
		venture: -2
	},
	2019: {
		growth: .2,
		inflation: -.5,
		unemployment: 0,
		housing: -2,
		sentiment: 1,
		venture: 0
	},
	2020: {
		growth: -5.5,
		inflation: -1.1,
		unemployment: 2.4,
		living: -8,
		working: -9,
		investing: -10,
		tourism: -34,
		sentiment: -16,
		housing: -3,
		venture: -8
	},
	2021: {
		growth: 3.6,
		inflation: .8,
		unemployment: .8,
		living: -2,
		working: -1,
		investing: -1,
		tourism: -14,
		sentiment: -3,
		housing: 3,
		venture: 5
	},
	2022: {
		growth: -.4,
		inflation: 4.8,
		unemployment: -.3,
		living: -2,
		sentiment: -6,
		housing: 8,
		investing: -3,
		venture: -2
	},
	2023: {
		growth: .1,
		inflation: 1.4,
		unemployment: -.2,
		housing: 5,
		sentiment: -1,
		venture: 2
	},
	2024: {},
	2025: {
		growth: .15,
		inflation: -.7,
		housing: 1,
		sentiment: 2,
		venture: 1
	},
	2026: {
		growth: .1,
		inflation: -.9,
		housing: 0,
		sentiment: 2,
		venture: 2
	}
};
function add(n, key, value) {
	n[key] = (n[key] ?? 0) + value;
}
function story(iso, year) {
	const n = {};
	if ((year === 2020 || year === 2021) && TOURISM.has(iso)) {
		add(n, "growth", year === 2020 ? -3.2 : -.8);
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
		add(n, "growth", -.6);
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
	if (iso === "LKA" && (year === 2022 || year === 2023)) {
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
function macroPin(iso, year) {
	return PIN[iso]?.[year];
}
var PLACE_NOTES = {
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
	CHE: "The stability benchmark. Almost everything is excellent and expensive."
};
var PLACES = [
	{
		iso: "AFG",
		name: "Afghanistan",
		continent: "Asia",
		subregion: "Southern Asia",
		pop: 38041754,
		lon: 67.564,
		lat: 34.941,
		bbox: [
			60.49,
			29.39,
			74.89,
			38.46
		]
	},
	{
		iso: "ALB",
		name: "Albania",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 2854191,
		lon: 20.103,
		lat: 41.091,
		bbox: [
			19.28,
			39.65,
			21.03,
			42.65
		]
	},
	{
		iso: "DZA",
		name: "Algeria",
		continent: "Africa",
		subregion: "Northern Africa",
		pop: 43053054,
		lon: 1.79,
		lat: 29.23,
		bbox: [
			-8.68,
			18.99,
			11.97,
			37.09
		]
	},
	{
		iso: "ASM",
		name: "American Samoa",
		continent: "Oceania",
		subregion: "Polynesia",
		pop: 55312,
		lon: -170.708,
		lat: -14.307,
		bbox: [
			-170.82,
			-14.36,
			-170.57,
			-14.26
		]
	},
	{
		iso: "AND",
		name: "Andorra",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 77142,
		lon: 1.563,
		lat: 42.53,
		bbox: [
			1.42,
			42.43,
			1.74,
			42.64
		]
	},
	{
		iso: "AGO",
		name: "Angola",
		continent: "Africa",
		subregion: "Middle Africa",
		pop: 31825295,
		lon: 18.124,
		lat: -11.659,
		bbox: [
			11.74,
			-18.02,
			24.05,
			-4.43
		]
	},
	{
		iso: "AIA",
		name: "Anguilla",
		continent: "North America",
		subregion: "Caribbean",
		pop: 14731,
		lon: -63.053,
		lat: 18.225,
		bbox: [
			-63.16,
			18.17,
			-62.98,
			18.27
		]
	},
	{
		iso: "ATA",
		name: "Antarctica",
		continent: "Antarctica",
		subregion: "Antarctica",
		pop: 4490,
		lon: -8.162,
		lat: -74.735,
		bbox: [
			-180,
			-90,
			180,
			-60.52
		]
	},
	{
		iso: "ATG",
		name: "Antigua and Barbuda",
		continent: "North America",
		subregion: "Caribbean",
		pop: 97118,
		lon: -61.762,
		lat: 17.073,
		bbox: [
			-61.89,
			17,
			-61.69,
			17.71
		]
	},
	{
		iso: "ARG",
		name: "Argentina",
		continent: "South America",
		subregion: "South America",
		pop: 44938712,
		lon: -65.391,
		lat: -36.231,
		bbox: [
			-73.58,
			-55.03,
			-53.67,
			-21.8
		]
	},
	{
		iso: "ARM",
		name: "Armenia",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 2957731,
		lon: 45.219,
		lat: 40.132,
		bbox: [
			43.44,
			38.87,
			46.59,
			41.29
		]
	},
	{
		iso: "ABW",
		name: "Aruba",
		continent: "North America",
		subregion: "Caribbean",
		pop: 106314,
		lon: -69.968,
		lat: 12.507,
		bbox: [
			-70.07,
			12.42,
			-69.9,
			12.61
		]
	},
	{
		iso: "ATC",
		name: "Ashmore and Cartier Islands",
		continent: "Oceania",
		subregion: "Australia and New Zealand",
		pop: 0,
		lon: 123.586,
		lat: -12.429,
		bbox: [
			123.57,
			-12.44,
			123.59,
			-12.42
		]
	},
	{
		iso: "AUS",
		name: "Australia",
		continent: "Oceania",
		subregion: "Australia and New Zealand",
		pop: 25364307,
		lon: 134.161,
		lat: -23.231,
		bbox: [
			112.91,
			-54.75,
			158.96,
			-10.05
		]
	},
	{
		iso: "AUT",
		name: "Austria",
		continent: "Europe",
		subregion: "Western Europe",
		pop: 8877067,
		lon: 13.446,
		lat: 47.575,
		bbox: [
			9.52,
			46.4,
			17.15,
			49
		]
	},
	{
		iso: "AZE",
		name: "Azerbaijan",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 10023318,
		lon: 47.271,
		lat: 40.288,
		bbox: [
			44.77,
			38.4,
			50.37,
			41.89
		]
	},
	{
		iso: "BHS",
		name: "Bahamas",
		continent: "North America",
		subregion: "Caribbean",
		pop: 389482,
		lon: -77.358,
		lat: 26.484,
		bbox: [
			-78.99,
			20.94,
			-72.75,
			26.94
		]
	},
	{
		iso: "BHR",
		name: "Bahrain",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 1641172,
		lon: 50.55,
		lat: 26.051,
		bbox: [
			50.45,
			25.81,
			50.62,
			26.25
		]
	},
	{
		iso: "BGD",
		name: "Bangladesh",
		continent: "Asia",
		subregion: "Southern Asia",
		pop: 163046161,
		lon: 90.365,
		lat: 23.735,
		bbox: [
			88.02,
			20.79,
			92.63,
			26.57
		]
	},
	{
		iso: "BRB",
		name: "Barbados",
		continent: "North America",
		subregion: "Caribbean",
		pop: 287025,
		lon: -59.546,
		lat: 13.161,
		bbox: [
			-59.65,
			13.06,
			-59.43,
			13.32
		]
	},
	{
		iso: "BLR",
		name: "Belarus",
		continent: "Europe",
		subregion: "Eastern Europe",
		pop: 9466856,
		lon: 28.129,
		lat: 53.52,
		bbox: [
			23.18,
			51.27,
			32.71,
			56.15
		]
	},
	{
		iso: "BEL",
		name: "Belgium",
		continent: "Europe",
		subregion: "Western Europe",
		pop: 11484055,
		lon: 4.727,
		lat: 50.596,
		bbox: [
			2.52,
			49.51,
			6.36,
			51.49
		]
	},
	{
		iso: "BLZ",
		name: "Belize",
		continent: "North America",
		subregion: "Central America",
		pop: 390353,
		lon: -88.685,
		lat: 17.357,
		bbox: [
			-89.24,
			15.89,
			-87.79,
			18.48
		]
	},
	{
		iso: "BEN",
		name: "Benin",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 11801151,
		lon: 2.346,
		lat: 9.697,
		bbox: [
			.76,
			6.22,
			3.83,
			12.38
		]
	},
	{
		iso: "BMU",
		name: "Bermuda",
		continent: "North America",
		subregion: "Northern America",
		pop: 63918,
		lon: -64.765,
		lat: 32.307,
		bbox: [
			-64.86,
			32.26,
			-64.67,
			32.39
		]
	},
	{
		iso: "BTN",
		name: "Bhutan",
		continent: "Asia",
		subregion: "Southern Asia",
		pop: 763092,
		lon: 90.584,
		lat: 27.403,
		bbox: [
			88.74,
			26.7,
			92.08,
			28.31
		]
	},
	{
		iso: "BOL",
		name: "Bolivia",
		continent: "South America",
		subregion: "South America",
		pop: 11513100,
		lon: -65.152,
		lat: -16.551,
		bbox: [
			-69.65,
			-22.89,
			-57.5,
			-9.71
		]
	},
	{
		iso: "BIH",
		name: "Bosnia and Herzegovina",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 3301e3,
		lon: 18.137,
		lat: 44.068,
		bbox: [
			15.74,
			42.56,
			19.58,
			45.28
		]
	},
	{
		iso: "BWA",
		name: "Botswana",
		continent: "Africa",
		subregion: "Southern Africa",
		pop: 2303697,
		lon: 24.585,
		lat: -22.523,
		bbox: [
			19.98,
			-26.85,
			29.36,
			-17.79
		]
	},
	{
		iso: "BRA",
		name: "Brazil",
		continent: "South America",
		subregion: "South America",
		pop: 211049527,
		lon: -56.309,
		lat: -10.397,
		bbox: [
			-74,
			-33.74,
			-34.8,
			5.26
		]
	},
	{
		iso: "IOT",
		name: "British Indian Ocean Territory",
		continent: "Seven seas (open ocean)",
		subregion: "Seven seas (open ocean)",
		pop: 3e3,
		lon: 72.449,
		lat: -7.321,
		bbox: [
			72.35,
			-7.43,
			72.5,
			-7.22
		]
	},
	{
		iso: "VGB",
		name: "British Virgin Islands",
		continent: "North America",
		subregion: "Caribbean",
		pop: 30030,
		lon: -64.332,
		lat: 18.734,
		bbox: [
			-64.69,
			18.4,
			-64.27,
			18.75
		]
	},
	{
		iso: "BRN",
		name: "Brunei Darussalam",
		continent: "Asia",
		subregion: "South-Eastern Asia",
		pop: 433285,
		lon: 114.625,
		lat: 4.525,
		bbox: [
			114.06,
			4.02,
			115.33,
			5.02
		]
	},
	{
		iso: "BGR",
		name: "Bulgaria",
		continent: "Europe",
		subregion: "Eastern Europe",
		pop: 6975761,
		lon: 24.961,
		lat: 42.615,
		bbox: [
			22.34,
			41.24,
			28.59,
			44.24
		]
	},
	{
		iso: "BFA",
		name: "Burkina Faso",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 20321378,
		lon: -1.603,
		lat: 11.974,
		bbox: [
			-5.52,
			9.43,
			2.39,
			15.08
		]
	},
	{
		iso: "BDI",
		name: "Burundi",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 11530580,
		lon: 29.996,
		lat: -3.054,
		bbox: [
			29.01,
			-4.46,
			30.81,
			-2.31
		]
	},
	{
		iso: "KHM",
		name: "Cambodia",
		continent: "Asia",
		subregion: "South-Eastern Asia",
		pop: 16486542,
		lon: 105.258,
		lat: 12.712,
		bbox: [
			102.32,
			10.41,
			107.61,
			14.71
		]
	},
	{
		iso: "CMR",
		name: "Cameroon",
		continent: "Africa",
		subregion: "Middle Africa",
		pop: 25876380,
		lon: 12.994,
		lat: 6.253,
		bbox: [
			8.53,
			1.68,
			16.18,
			13.08
		]
	},
	{
		iso: "CAN",
		name: "Canada",
		continent: "North America",
		subregion: "Northern America",
		pop: 37589262,
		lon: -94.48,
		lat: 60.304,
		bbox: [
			-141,
			41.67,
			-52.65,
			83.12
		]
	},
	{
		iso: "CYM",
		name: "Cayman Islands",
		continent: "North America",
		subregion: "Caribbean",
		pop: 64948,
		lon: -81.301,
		lat: 19.329,
		bbox: [
			-81.42,
			19.27,
			-79.74,
			19.77
		]
	},
	{
		iso: "CAF",
		name: "Central African Republic",
		continent: "Africa",
		subregion: "Middle Africa",
		pop: 4745185,
		lon: 20.085,
		lat: 6.394,
		bbox: [
			14.43,
			2.27,
			27.4,
			11
		]
	},
	{
		iso: "TCD",
		name: "Chad",
		continent: "Africa",
		subregion: "Middle Africa",
		pop: 15946876,
		lon: 18.978,
		lat: 12.79,
		bbox: [
			13.45,
			7.47,
			23.98,
			23.45
		]
	},
	{
		iso: "CHL",
		name: "Chile",
		continent: "South America",
		subregion: "South America",
		pop: 18952038,
		lon: -71.928,
		lat: -40.635,
		bbox: [
			-109.43,
			-55.89,
			-66.44,
			-17.51
		]
	},
	{
		iso: "CHN",
		name: "China",
		continent: "Asia",
		subregion: "Eastern Asia",
		pop: 1397715e3,
		lon: 106.121,
		lat: 36.191,
		bbox: [
			73.61,
			18.22,
			134.75,
			53.56
		]
	},
	{
		iso: "COL",
		name: "Colombia",
		continent: "South America",
		subregion: "South America",
		pop: 50339443,
		lon: -72.693,
		lat: 3.483,
		bbox: [
			-79.03,
			-4.24,
			-66.88,
			12.43
		]
	},
	{
		iso: "COM",
		name: "Comoros",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 850886,
		lon: 44.417,
		lat: -12.186,
		bbox: [
			43.23,
			-12.37,
			44.53,
			-11.37
		]
	},
	{
		iso: "COK",
		name: "Cook Islands",
		continent: "Oceania",
		subregion: "Polynesia",
		pop: 17459,
		lon: -159.785,
		lat: -21.225,
		bbox: [
			-159.84,
			-21.25,
			-159.74,
			-21.19
		]
	},
	{
		iso: "CRI",
		name: "Costa Rica",
		continent: "North America",
		subregion: "Central America",
		pop: 5047561,
		lon: -84.032,
		lat: 9.746,
		bbox: [
			-85.91,
			8.07,
			-82.56,
			11.19
		]
	},
	{
		iso: "HRV",
		name: "Croatia",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 4067500,
		lon: 16.599,
		lat: 45.125,
		bbox: [
			13.52,
			42.43,
			19.4,
			46.53
		]
	},
	{
		iso: "CUB",
		name: "Cuba",
		continent: "North America",
		subregion: "Caribbean",
		pop: 11333483,
		lon: -79.264,
		lat: 21.616,
		bbox: [
			-84.89,
			19.86,
			-74.14,
			23.19
		]
	},
	{
		iso: "CUW",
		name: "Curaçao",
		continent: "North America",
		subregion: "Caribbean",
		pop: 157538,
		lon: -68.965,
		lat: 12.209,
		bbox: [
			-69.16,
			12.04,
			-68.75,
			12.38
		]
	},
	{
		iso: "CYP",
		name: "Cyprus",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 1198575,
		lon: 33.207,
		lat: 34.955,
		bbox: [
			32.3,
			34.57,
			34.05,
			35.18
		]
	},
	{
		iso: "CZE",
		name: "Czech Republic",
		continent: "Europe",
		subregion: "Eastern Europe",
		pop: 10669709,
		lon: 15.441,
		lat: 49.878,
		bbox: [
			12.09,
			48.58,
			18.83,
			51.04
		]
	},
	{
		iso: "CIV",
		name: "Côte d'Ivoire",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 25716544,
		lon: -5.825,
		lat: 8.02,
		bbox: [
			-8.6,
			4.35,
			-2.51,
			10.72
		]
	},
	{
		iso: "PRK",
		name: "Dem. Rep. Korea",
		continent: "Asia",
		subregion: "Eastern Asia",
		pop: 25666161,
		lon: 127.405,
		lat: 40.41,
		bbox: [
			124.35,
			37.72,
			130.69,
			43
		]
	},
	{
		iso: "COD",
		name: "Democratic Republic of the Congo",
		continent: "Africa",
		subregion: "Middle Africa",
		pop: 86790567,
		lon: 23.716,
		lat: -4.547,
		bbox: [
			12.21,
			-13.45,
			31.27,
			5.31
		]
	},
	{
		iso: "DNK",
		name: "Denmark",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 5818553,
		lon: 9.471,
		lat: 56.189,
		bbox: [
			8.12,
			54.63,
			15.14,
			57.74
		]
	},
	{
		iso: "DJI",
		name: "Djibouti",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 973560,
		lon: 42.635,
		lat: 11.752,
		bbox: [
			41.77,
			10.94,
			43.41,
			12.71
		]
	},
	{
		iso: "DMA",
		name: "Dominica",
		continent: "North America",
		subregion: "Caribbean",
		pop: 71808,
		lon: -61.361,
		lat: 15.437,
		bbox: [
			-61.48,
			15.23,
			-61.25,
			15.63
		]
	},
	{
		iso: "DOM",
		name: "Dominican Republic",
		continent: "North America",
		subregion: "Caribbean",
		pop: 10738958,
		lon: -70.505,
		lat: 18.825,
		bbox: [
			-72,
			17.64,
			-68.34,
			19.91
		]
	},
	{
		iso: "ECU",
		name: "Ecuador",
		continent: "South America",
		subregion: "South America",
		pop: 17373662,
		lon: -78.579,
		lat: -2.016,
		bbox: [
			-91.65,
			-4.99,
			-75.25,
			1.46
		]
	},
	{
		iso: "EGY",
		name: "Egypt",
		continent: "Africa",
		subregion: "Northern Africa",
		pop: 100388073,
		lon: 30.804,
		lat: 27.639,
		bbox: [
			24.7,
			22,
			36.87,
			31.66
		]
	},
	{
		iso: "SLV",
		name: "El Salvador",
		continent: "North America",
		subregion: "Central America",
		pop: 6453553,
		lon: -88.816,
		lat: 13.851,
		bbox: [
			-90.11,
			13.16,
			-87.72,
			14.43
		]
	},
	{
		iso: "GNQ",
		name: "Equatorial Guinea",
		continent: "Africa",
		subregion: "Middle Africa",
		pop: 1355986,
		lon: 10.176,
		lat: 1.491,
		bbox: [
			8.43,
			.96,
			11.34,
			3.76
		]
	},
	{
		iso: "ERI",
		name: "Eritrea",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 6081196,
		lon: 39.213,
		lat: 15.063,
		bbox: [
			36.43,
			12.38,
			43.12,
			18
		]
	},
	{
		iso: "EST",
		name: "Estonia",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 1326590,
		lon: 25.864,
		lat: 58.514,
		bbox: [
			21.85,
			57.52,
			28.15,
			59.64
		]
	},
	{
		iso: "ETH",
		name: "Ethiopia",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 112078730,
		lon: 38.935,
		lat: 9.165,
		bbox: [
			33,
			3.46,
			47.98,
			14.85
		]
	},
	{
		iso: "FRO",
		name: "Faeroe Islands",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 48678,
		lon: -6.801,
		lat: 62.121,
		bbox: [
			-7.42,
			61.41,
			-6.41,
			62.36
		]
	},
	{
		iso: "FLK",
		name: "Falkland Islands / Malvinas",
		continent: "South America",
		subregion: "South America",
		pop: 3398,
		lon: -60.153,
		lat: -51.703,
		bbox: [
			-61.15,
			-52.31,
			-57.79,
			-51.27
		]
	},
	{
		iso: "FSM",
		name: "Federated States of Micronesia",
		continent: "Oceania",
		subregion: "Micronesia",
		pop: 113815,
		lon: 151.615,
		lat: 7.361,
		bbox: [
			138.06,
			5.28,
			162.99,
			9.59
		]
	},
	{
		iso: "FJI",
		name: "Fiji",
		continent: "Oceania",
		subregion: "Melanesia",
		pop: 889953,
		lon: 179.323,
		lat: -16.596,
		bbox: [
			-180,
			-21.71,
			180,
			-12.48
		]
	},
	{
		iso: "FIN",
		name: "Finland",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 5520314,
		lon: 25.363,
		lat: 64.826,
		bbox: [
			20.62,
			59.82,
			31.54,
			70.06
		]
	},
	{
		iso: "FRA",
		name: "France",
		continent: "Europe",
		subregion: "Western Europe",
		pop: 67059887,
		lon: 2.646,
		lat: 46.614,
		bbox: [
			-61.79,
			-21.37,
			55.84,
			51.1
		]
	},
	{
		iso: "PYF",
		name: "French Polynesia",
		continent: "Oceania",
		subregion: "Polynesia",
		pop: 279287,
		lon: -140.778,
		lat: -17.787,
		bbox: [
			-151.51,
			-20.88,
			-136.29,
			-8.78
		]
	},
	{
		iso: "ATF",
		name: "French Southern and Antarctic Lands",
		continent: "Seven seas (open ocean)",
		subregion: "Seven seas (open ocean)",
		pop: 140,
		lon: 69.563,
		lat: -49.284,
		bbox: [
			51.66,
			-49.71,
			70.56,
			-46.33
		]
	},
	{
		iso: "GAB",
		name: "Gabon",
		continent: "Africa",
		subregion: "Middle Africa",
		pop: 2172579,
		lon: 11.622,
		lat: -.863,
		bbox: [
			8.7,
			-3.92,
			14.48,
			2.3
		]
	},
	{
		iso: "GEO",
		name: "Georgia",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 3720382,
		lon: 43.852,
		lat: 42.059,
		bbox: [
			39.98,
			41.07,
			46.67,
			43.57
		]
	},
	{
		iso: "DEU",
		name: "Germany",
		continent: "Europe",
		subregion: "Western Europe",
		pop: 83132799,
		lon: 10.261,
		lat: 50.695,
		bbox: [
			5.86,
			47.28,
			15.02,
			55.06
		]
	},
	{
		iso: "GHA",
		name: "Ghana",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 30417856,
		lon: -1.079,
		lat: 8.298,
		bbox: [
			-3.24,
			4.76,
			1.19,
			11.17
		]
	},
	{
		iso: "GRC",
		name: "Greece",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 10716322,
		lon: 22.994,
		lat: 39.432,
		bbox: [
			19.65,
			34.93,
			28.23,
			41.74
		]
	},
	{
		iso: "GRL",
		name: "Greenland",
		continent: "North America",
		subregion: "Northern America",
		pop: 56225,
		lon: -41.777,
		lat: 72.469,
		bbox: [
			-72.82,
			59.81,
			-11.43,
			83.6
		]
	},
	{
		iso: "GRD",
		name: "Grenada",
		continent: "North America",
		subregion: "Caribbean",
		pop: 112003,
		lon: -61.703,
		lat: 12.098,
		bbox: [
			-61.78,
			12.01,
			-61.61,
			12.24
		]
	},
	{
		iso: "GUM",
		name: "Guam",
		continent: "Oceania",
		subregion: "Micronesia",
		pop: 167294,
		lon: 144.773,
		lat: 13.429,
		bbox: [
			144.65,
			13.26,
			144.94,
			13.62
		]
	},
	{
		iso: "GTM",
		name: "Guatemala",
		continent: "North America",
		subregion: "Central America",
		pop: 16604026,
		lon: -90.227,
		lat: 15.557,
		bbox: [
			-92.23,
			13.74,
			-88.23,
			17.82
		]
	},
	{
		iso: "GGY",
		name: "Guernsey",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 62792,
		lon: -2.56,
		lat: 49.479,
		bbox: [
			-2.65,
			49.43,
			-2.51,
			49.51
		]
	},
	{
		iso: "GIN",
		name: "Guinea",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 12771246,
		lon: -10.715,
		lat: 10.105,
		bbox: [
			-15.05,
			7.22,
			-7.68,
			12.67
		]
	},
	{
		iso: "GNB",
		name: "Guinea-Bissau",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 1920922,
		lon: -15.114,
		lat: 11.874,
		bbox: [
			-16.71,
			10.94,
			-13.67,
			12.68
		]
	},
	{
		iso: "GUY",
		name: "Guyana",
		continent: "South America",
		subregion: "South America",
		pop: 782766,
		lon: -58.817,
		lat: 4.374,
		bbox: [
			-61.39,
			1.2,
			-56.48,
			8.55
		]
	},
	{
		iso: "HTI",
		name: "Haiti",
		continent: "North America",
		subregion: "Caribbean",
		pop: 11263077,
		lon: -72.724,
		lat: 18.807,
		bbox: [
			-74.48,
			18.04,
			-71.64,
			20.09
		]
	},
	{
		iso: "HMD",
		name: "Heard I. and McDonald Islands",
		continent: "Seven seas (open ocean)",
		subregion: "Seven seas (open ocean)",
		pop: 0,
		lon: 73.51,
		lat: -53.076,
		bbox: [
			73.25,
			-53.19,
			73.84,
			-52.97
		]
	},
	{
		iso: "HND",
		name: "Honduras",
		continent: "North America",
		subregion: "Central America",
		pop: 9746117,
		lon: -86.248,
		lat: 14.624,
		bbox: [
			-89.36,
			12.98,
			-83.16,
			16.51
		]
	},
	{
		iso: "HKG",
		name: "Hong Kong",
		continent: "Asia",
		subregion: "Eastern Asia",
		pop: 7507400,
		lon: 114.142,
		lat: 22.46,
		bbox: [
			113.84,
			22.2,
			114.33,
			22.57
		]
	},
	{
		iso: "HUN",
		name: "Hungary",
		continent: "Europe",
		subregion: "Eastern Europe",
		pop: 9769949,
		lon: 19.424,
		lat: 47.232,
		bbox: [
			16.09,
			45.75,
			22.88,
			48.55
		]
	},
	{
		iso: "ISL",
		name: "Iceland",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 361313,
		lon: -19.867,
		lat: 65.308,
		bbox: [
			-24.48,
			63.41,
			-13.56,
			66.53
		]
	},
	{
		iso: "IND",
		name: "India",
		continent: "Asia",
		subregion: "Southern Asia",
		pop: 1366417754,
		lon: 82.7,
		lat: 24.932,
		bbox: [
			68.17,
			6.75,
			97.34,
			35.5
		]
	},
	{
		iso: "IOA",
		name: "Indian Ocean Territories",
		continent: "Asia",
		subregion: "Seven seas (open ocean)",
		pop: 2387,
		lon: 96.842,
		lat: -12.165,
		bbox: [
			96.83,
			-12.2,
			105.72,
			-10.43
		]
	},
	{
		iso: "IDN",
		name: "Indonesia",
		continent: "Asia",
		subregion: "South-Eastern Asia",
		pop: 270625568,
		lon: 114.259,
		lat: .306,
		bbox: [
			95.21,
			-10.91,
			140.98,
			5.91
		]
	},
	{
		iso: "IRN",
		name: "Iran",
		continent: "Asia",
		subregion: "Southern Asia",
		pop: 82913906,
		lon: 53.056,
		lat: 33.562,
		bbox: [
			44.02,
			25.1,
			63.3,
			39.77
		]
	},
	{
		iso: "IRQ",
		name: "Iraq",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 39309783,
		lon: 44.578,
		lat: 33.79,
		bbox: [
			38.77,
			29.06,
			48.55,
			37.37
		]
	},
	{
		iso: "IRL",
		name: "Ireland",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 4941444,
		lon: -8.39,
		lat: 53.483,
		bbox: [
			-10.39,
			51.47,
			-6.03,
			55.37
		]
	},
	{
		iso: "IMN",
		name: "Isle of Man",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 84584,
		lon: -4.545,
		lat: 54.222,
		bbox: [
			-4.79,
			54.06,
			-4.34,
			54.41
		]
	},
	{
		iso: "ISR",
		name: "Israel",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 9053300,
		lon: 35.212,
		lat: 31.894,
		bbox: [
			34.24,
			29.48,
			35.89,
			33.42
		]
	},
	{
		iso: "ITA",
		name: "Italy",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 60297396,
		lon: 11.902,
		lat: 43.859,
		bbox: [
			6.63,
			36.69,
			18.49,
			47.08
		]
	},
	{
		iso: "JAM",
		name: "Jamaica",
		continent: "North America",
		subregion: "Caribbean",
		pop: 2948279,
		lon: -77.28,
		lat: 18.117,
		bbox: [
			-78.34,
			17.71,
			-76.21,
			18.52
		]
	},
	{
		iso: "JPN",
		name: "Japan",
		continent: "Asia",
		subregion: "Eastern Asia",
		pop: 126264931,
		lon: 137.827,
		lat: 36.721,
		bbox: [
			123.68,
			24.27,
			145.83,
			45.51
		]
	},
	{
		iso: "JEY",
		name: "Jersey",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 107800,
		lon: -2.1,
		lat: 49.209,
		bbox: [
			-2.24,
			49.17,
			-2.01,
			49.27
		]
	},
	{
		iso: "JOR",
		name: "Jordan",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 10101694,
		lon: 36.712,
		lat: 31.336,
		bbox: [
			34.95,
			29.19,
			39.29,
			33.37
		]
	},
	{
		iso: "KAZ",
		name: "Kazakhstan",
		continent: "Asia",
		subregion: "Central Asia",
		pop: 18513930,
		lon: 66.177,
		lat: 47.964,
		bbox: [
			46.61,
			40.61,
			87.32,
			55.39
		]
	},
	{
		iso: "KEN",
		name: "Kenya",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 52573973,
		lon: 37.533,
		lat: .667,
		bbox: [
			33.9,
			-4.69,
			41.88,
			5.49
		]
	},
	{
		iso: "SWZ",
		name: "Kingdom of eSwatini",
		continent: "Africa",
		subregion: "Southern Africa",
		pop: 1148130,
		lon: 31.569,
		lat: -26.46,
		bbox: [
			30.79,
			-27.31,
			32.11,
			-25.74
		]
	},
	{
		iso: "KIR",
		name: "Kiribati",
		continent: "Oceania",
		subregion: "Micronesia",
		pop: 117606,
		lon: -171.68,
		lat: -2.806,
		bbox: [
			-174.54,
			-11.46,
			174.78,
			3.92
		]
	},
	{
		iso: "KOS",
		name: "Kosovo",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 1794248,
		lon: 20.84,
		lat: 42.593,
		bbox: [
			20.03,
			41.85,
			21.75,
			43.26
		]
	},
	{
		iso: "KWT",
		name: "Kuwait",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 4207083,
		lon: 47.693,
		lat: 29.341,
		bbox: [
			46.53,
			28.53,
			48.44,
			30.1
		]
	},
	{
		iso: "KGZ",
		name: "Kyrgyzstan",
		continent: "Asia",
		subregion: "Central Asia",
		pop: 6456900,
		lon: 73.361,
		lat: 41.023,
		bbox: [
			69.23,
			39.21,
			80.25,
			43.24
		]
	},
	{
		iso: "LAO",
		name: "Lao PDR",
		continent: "Asia",
		subregion: "South-Eastern Asia",
		pop: 7169455,
		lon: 103.796,
		lat: 18.437,
		bbox: [
			100.11,
			13.92,
			107.65,
			22.5
		]
	},
	{
		iso: "LVA",
		name: "Latvia",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 1912789,
		lon: 25.364,
		lat: 56.854,
		bbox: [
			21.02,
			55.67,
			28.2,
			58.06
		]
	},
	{
		iso: "LBN",
		name: "Lebanon",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 6855713,
		lon: 35.971,
		lat: 33.861,
		bbox: [
			35.11,
			33.08,
			36.59,
			34.68
		]
	},
	{
		iso: "LSO",
		name: "Lesotho",
		continent: "Africa",
		subregion: "Southern Africa",
		pop: 2125268,
		lon: 28.2,
		lat: -29.677,
		bbox: [
			27.05,
			-30.64,
			29.39,
			-28.58
		]
	},
	{
		iso: "LBR",
		name: "Liberia",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 4937374,
		lon: -9.107,
		lat: 6.986,
		bbox: [
			-11.51,
			4.35,
			-7.4,
			8.54
		]
	},
	{
		iso: "LBY",
		name: "Libya",
		continent: "Africa",
		subregion: "Northern Africa",
		pop: 6777452,
		lon: 17.633,
		lat: 28.18,
		bbox: [
			9.31,
			19.5,
			25.15,
			33.18
		]
	},
	{
		iso: "LIE",
		name: "Liechtenstein",
		continent: "Europe",
		subregion: "Western Europe",
		pop: 38019,
		lon: 9.547,
		lat: 47.143,
		bbox: [
			9.48,
			47.06,
			9.61,
			47.27
		]
	},
	{
		iso: "LTU",
		name: "Lithuania",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 2786844,
		lon: 24.264,
		lat: 55.05,
		bbox: [
			20.9,
			53.89,
			26.78,
			56.41
		]
	},
	{
		iso: "LUX",
		name: "Luxembourg",
		continent: "Europe",
		subregion: "Western Europe",
		pop: 619896,
		lon: 6.062,
		lat: 49.763,
		bbox: [
			5.72,
			49.45,
			6.49,
			50.17
		]
	},
	{
		iso: "MAC",
		name: "Macao",
		continent: "Asia",
		subregion: "Eastern Asia",
		pop: 640445,
		lon: 113.504,
		lat: 22.216,
		bbox: [
			113.48,
			22.2,
			113.55,
			22.25
		]
	},
	{
		iso: "MDG",
		name: "Madagascar",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 26969307,
		lon: 46.872,
		lat: -17.913,
		bbox: [
			43.26,
			-25.57,
			50.48,
			-12.08
		]
	},
	{
		iso: "MWI",
		name: "Malawi",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 18628747,
		lon: 34.049,
		lat: -12.794,
		bbox: [
			32.67,
			-17.13,
			35.89,
			-9.39
		]
	},
	{
		iso: "MYS",
		name: "Malaysia",
		continent: "Asia",
		subregion: "South-Eastern Asia",
		pop: 31949777,
		lon: 114.778,
		lat: 3.694,
		bbox: [
			99.65,
			.86,
			119.27,
			7.35
		]
	},
	{
		iso: "MDV",
		name: "Maldives",
		continent: "Seven seas (open ocean)",
		subregion: "Southern Asia",
		pop: 530953,
		lon: 73.505,
		lat: 4.197,
		bbox: [
			73.38,
			3.23,
			73.53,
			4.25
		]
	},
	{
		iso: "MLI",
		name: "Mali",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 19658031,
		lon: -5.434,
		lat: 14.818,
		bbox: [
			-12.28,
			10.14,
			4.24,
			25
		]
	},
	{
		iso: "MLT",
		name: "Malta",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 502653,
		lon: 14.474,
		lat: 35.88,
		bbox: [
			14.18,
			35.82,
			14.57,
			36.08
		]
	},
	{
		iso: "MHL",
		name: "Marshall Islands",
		continent: "Oceania",
		subregion: "Micronesia",
		pop: 58791,
		lon: 171.198,
		lat: 7.108,
		bbox: [
			166.84,
			5.8,
			171.76,
			11.17
		]
	},
	{
		iso: "MRT",
		name: "Mauritania",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 4525696,
		lon: -11.499,
		lat: 19.776,
		bbox: [
			-17.06,
			14.74,
			-4.82,
			27.29
		]
	},
	{
		iso: "MUS",
		name: "Mauritius",
		continent: "Seven seas (open ocean)",
		subregion: "Eastern Africa",
		pop: 1265711,
		lon: 57.545,
		lat: -20.297,
		bbox: [
			57.32,
			-20.51,
			57.79,
			-19.99
		]
	},
	{
		iso: "MEX",
		name: "Mexico",
		continent: "North America",
		subregion: "Central America",
		pop: 127575529,
		lon: -102.899,
		lat: 24.061,
		bbox: [
			-118.4,
			14.54,
			-86.7,
			32.72
		]
	},
	{
		iso: "MDA",
		name: "Moldova",
		continent: "Europe",
		subregion: "Eastern Europe",
		pop: 2657637,
		lon: 28.535,
		lat: 47.082,
		bbox: [
			26.62,
			45.45,
			30.13,
			48.48
		]
	},
	{
		iso: "MCO",
		name: "Monaco",
		continent: "Europe",
		subregion: "Western Europe",
		pop: 38964,
		lon: 7.412,
		lat: 43.755,
		bbox: [
			7.38,
			43.73,
			7.44,
			43.77
		]
	},
	{
		iso: "MNG",
		name: "Mongolia",
		continent: "Asia",
		subregion: "Eastern Asia",
		pop: 3225167,
		lon: 102.879,
		lat: 47.777,
		bbox: [
			87.74,
			41.6,
			119.9,
			52.12
		]
	},
	{
		iso: "MNE",
		name: "Montenegro",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 622137,
		lon: 19.258,
		lat: 42.817,
		bbox: [
			18.44,
			41.87,
			20.35,
			43.54
		]
	},
	{
		iso: "MSR",
		name: "Montserrat",
		continent: "North America",
		subregion: "Caribbean",
		pop: 4649,
		lon: -62.18,
		lat: 16.747,
		bbox: [
			-62.22,
			16.68,
			-62.15,
			16.81
		]
	},
	{
		iso: "MAR",
		name: "Morocco",
		continent: "Africa",
		subregion: "Northern Africa",
		pop: 36471769,
		lon: -9.028,
		lat: 28.486,
		bbox: [
			-17,
			21.42,
			-1.07,
			35.93
		]
	},
	{
		iso: "MOZ",
		name: "Mozambique",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 30366036,
		lon: 35.344,
		lat: -17.322,
		bbox: [
			30.22,
			-26.86,
			40.84,
			-10.46
		]
	},
	{
		iso: "MMR",
		name: "Myanmar",
		continent: "Asia",
		subregion: "South-Eastern Asia",
		pop: 54045420,
		lon: 96.937,
		lat: 19.972,
		bbox: [
			92.18,
			9.88,
			101.15,
			28.52
		]
	},
	{
		iso: "NAM",
		name: "Namibia",
		continent: "Africa",
		subregion: "Southern Africa",
		pop: 2494530,
		lon: 18.141,
		lat: -21.821,
		bbox: [
			11.72,
			-28.94,
			25.26,
			-16.97
		]
	},
	{
		iso: "NRU",
		name: "Nauru",
		continent: "Oceania",
		subregion: "Micronesia",
		pop: 12581,
		lon: 166.936,
		lat: -.517,
		bbox: [
			166.91,
			-.55,
			166.96,
			-.49
		]
	},
	{
		iso: "NPL",
		name: "Nepal",
		continent: "Asia",
		subregion: "Southern Asia",
		pop: 28608710,
		lon: 84.322,
		lat: 28.097,
		bbox: [
			80.05,
			26.36,
			88.16,
			30.39
		]
	},
	{
		iso: "NLD",
		name: "Netherlands",
		continent: "Europe",
		subregion: "Western Europe",
		pop: 17332850,
		lon: 5.588,
		lat: 51.806,
		bbox: [
			-68.37,
			12.03,
			7.2,
			53.62
		]
	},
	{
		iso: "NCL",
		name: "New Caledonia",
		continent: "Oceania",
		subregion: "Melanesia",
		pop: 287800,
		lon: 165.486,
		lat: -21.317,
		bbox: [
			159.93,
			-22.66,
			168.14,
			-19.11
		]
	},
	{
		iso: "NZL",
		name: "New Zealand",
		continent: "Oceania",
		subregion: "Australia and New Zealand",
		pop: 4917e3,
		lon: 170.779,
		lat: -43.651,
		bbox: [
			-176.85,
			-52.57,
			178.54,
			-8.55
		]
	},
	{
		iso: "NIC",
		name: "Nicaragua",
		continent: "North America",
		subregion: "Central America",
		pop: 6545502,
		lon: -84.819,
		lat: 13.076,
		bbox: [
			-87.67,
			10.73,
			-83.16,
			15.01
		]
	},
	{
		iso: "NER",
		name: "Niger",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 23310715,
		lon: 6.37,
		lat: 15.345,
		bbox: [
			.16,
			11.7,
			15.96,
			23.52
		]
	},
	{
		iso: "NGA",
		name: "Nigeria",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 200963599,
		lon: 7.762,
		lat: 8.634,
		bbox: [
			2.69,
			4.28,
			14.63,
			13.87
		]
	},
	{
		iso: "NIU",
		name: "Niue",
		continent: "Oceania",
		subregion: "Polynesia",
		pop: 1620,
		lon: -169.857,
		lat: -19.043,
		bbox: [
			-169.95,
			-19.14,
			-169.79,
			-18.97
		]
	},
	{
		iso: "NFK",
		name: "Norfolk Island",
		continent: "Oceania",
		subregion: "Australia and New Zealand",
		pop: 2169,
		lon: 167.943,
		lat: -29.057,
		bbox: [
			167.91,
			-29.1,
			167.99,
			-29.01
		]
	},
	{
		iso: "MKD",
		name: "North Macedonia",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 2083459,
		lon: 21.64,
		lat: 41.635,
		bbox: [
			20.45,
			40.85,
			23.01,
			42.36
		]
	},
	{
		iso: "CYN",
		name: "Northern Cyprus",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 326e3,
		lon: 33.533,
		lat: 35.203,
		bbox: [
			32.71,
			35,
			34.56,
			35.66
		]
	},
	{
		iso: "MNP",
		name: "Northern Mariana Islands",
		continent: "Oceania",
		subregion: "Micronesia",
		pop: 57216,
		lon: 145.753,
		lat: 15.175,
		bbox: [
			145.15,
			14.11,
			145.84,
			18.81
		]
	},
	{
		iso: "NOR",
		name: "Norway",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 5347896,
		lon: 15.105,
		lat: 65.25,
		bbox: [
			-9.1,
			58.02,
			33.63,
			80.48
		]
	},
	{
		iso: "OMN",
		name: "Oman",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 4974986,
		lon: 55.823,
		lat: 21.099,
		bbox: [
			51.98,
			16.65,
			59.84,
			26.36
		]
	},
	{
		iso: "PAK",
		name: "Pakistan",
		continent: "Asia",
		subregion: "Southern Asia",
		pop: 216565318,
		lon: 69.804,
		lat: 30.175,
		bbox: [
			60.84,
			23.75,
			77.05,
			37.04
		]
	},
	{
		iso: "PLW",
		name: "Palau",
		continent: "Oceania",
		subregion: "Micronesia",
		pop: 18008,
		lon: 134.588,
		lat: 7.52,
		bbox: [
			131.13,
			3.02,
			134.66,
			7.71
		]
	},
	{
		iso: "PSE",
		name: "Palestine",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 4685306,
		lon: 35.195,
		lat: 31.93,
		bbox: [
			34.2,
			31.21,
			35.57,
			32.53
		]
	},
	{
		iso: "PAN",
		name: "Panama",
		continent: "North America",
		subregion: "Central America",
		pop: 4246439,
		lon: -80.184,
		lat: 8.496,
		bbox: [
			-83.03,
			7.22,
			-77.2,
			9.6
		]
	},
	{
		iso: "PNG",
		name: "Papua New Guinea",
		continent: "Oceania",
		subregion: "Melanesia",
		pop: 8776109,
		lon: 145.346,
		lat: -7.622,
		bbox: [
			140.86,
			-11.63,
			155.96,
			-1.35
		]
	},
	{
		iso: "PRY",
		name: "Paraguay",
		continent: "South America",
		subregion: "South America",
		pop: 7044636,
		lon: -57.583,
		lat: -23.738,
		bbox: [
			-62.65,
			-27.55,
			-54.24,
			-19.29
		]
	},
	{
		iso: "PER",
		name: "Peru",
		continent: "South America",
		subregion: "South America",
		pop: 32510453,
		lon: -73.975,
		lat: -7.446,
		bbox: [
			-81.34,
			-18.35,
			-68.69,
			-.04
		]
	},
	{
		iso: "PHL",
		name: "Philippines",
		continent: "Asia",
		subregion: "South-Eastern Asia",
		pop: 108116615,
		lon: 121.863,
		lat: 15.08,
		bbox: [
			116.97,
			5.06,
			126.59,
			20.84
		]
	},
	{
		iso: "PCN",
		name: "Pitcairn Islands",
		continent: "Oceania",
		subregion: "Polynesia",
		pop: 54,
		lon: -128.313,
		lat: -24.371,
		bbox: [
			-128.35,
			-24.41,
			-128.29,
			-24.32
		]
	},
	{
		iso: "POL",
		name: "Poland",
		continent: "Europe",
		subregion: "Eastern Europe",
		pop: 37970874,
		lon: 19.099,
		lat: 51.401,
		bbox: [
			14.13,
			49.02,
			24.11,
			54.84
		]
	},
	{
		iso: "PRT",
		name: "Portugal",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 10269417,
		lon: -7.894,
		lat: 39.956,
		bbox: [
			-31.28,
			32.65,
			-6.21,
			42.14
		]
	},
	{
		iso: "PRI",
		name: "Puerto Rico",
		continent: "North America",
		subregion: "Caribbean",
		pop: 3193694,
		lon: -66.513,
		lat: 18.223,
		bbox: [
			-67.94,
			17.95,
			-65.3,
			18.52
		]
	},
	{
		iso: "QAT",
		name: "Qatar",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 2832067,
		lon: 51.193,
		lat: 25.199,
		bbox: [
			50.76,
			24.57,
			51.61,
			26.15
		]
	},
	{
		iso: "CPV",
		name: "Republic of Cabo Verde",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 549935,
		lon: -23.649,
		lat: 15.131,
		bbox: [
			-25.34,
			14.82,
			-22.68,
			17.19
		]
	},
	{
		iso: "KOR",
		name: "Republic of Korea",
		continent: "Asia",
		subregion: "Eastern Asia",
		pop: 51709098,
		lon: 127.372,
		lat: 36.091,
		bbox: [
			126.01,
			33.2,
			130.93,
			38.62
		]
	},
	{
		iso: "COG",
		name: "Republic of the Congo",
		continent: "Africa",
		subregion: "Middle Africa",
		pop: 5380508,
		lon: 14.375,
		lat: -1.144,
		bbox: [
			11.13,
			-5,
			18.62,
			3.69
		]
	},
	{
		iso: "ROU",
		name: "Romania",
		continent: "Europe",
		subregion: "Eastern Europe",
		pop: 19356544,
		lon: 24.529,
		lat: 45.845,
		bbox: [
			20.24,
			43.67,
			29.71,
			48.26
		]
	},
	{
		iso: "RUS",
		name: "Russian Federation",
		continent: "Europe",
		subregion: "Eastern Europe",
		pop: 144373535,
		lon: 94.071,
		lat: 59.637,
		bbox: [
			-180,
			41.2,
			180,
			81.85
		]
	},
	{
		iso: "RWA",
		name: "Rwanda",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 12626950,
		lon: 29.912,
		lat: -2.006,
		bbox: [
			28.86,
			-2.81,
			30.88,
			-1.06
		]
	},
	{
		iso: "SHN",
		name: "Saint Helena",
		continent: "Seven seas (open ocean)",
		subregion: "Western Africa",
		pop: 4534,
		lon: -14.368,
		lat: -7.938,
		bbox: [
			-14.41,
			-16,
			-5.66,
			-7.88
		]
	},
	{
		iso: "KNA",
		name: "Saint Kitts and Nevis",
		continent: "North America",
		subregion: "Caribbean",
		pop: 52834,
		lon: -62.736,
		lat: 17.311,
		bbox: [
			-62.84,
			17.1,
			-62.53,
			17.4
		]
	},
	{
		iso: "LCA",
		name: "Saint Lucia",
		continent: "North America",
		subregion: "Caribbean",
		pop: 182790,
		lon: -60.968,
		lat: 13.911,
		bbox: [
			-61.07,
			13.72,
			-60.89,
			14.09
		]
	},
	{
		iso: "SPM",
		name: "Saint Pierre and Miquelon",
		continent: "North America",
		subregion: "Northern America",
		pop: 5997,
		lon: -56.325,
		lat: 46.938,
		bbox: [
			-56.39,
			46.75,
			-56.14,
			47.1
		]
	},
	{
		iso: "VCT",
		name: "Saint Vincent and the Grenadines",
		continent: "North America",
		subregion: "Caribbean",
		pop: 110589,
		lon: -61.234,
		lat: 13.01,
		bbox: [
			-61.35,
			12.7,
			-61.12,
			13.36
		]
	},
	{
		iso: "BLM",
		name: "Saint-Barthélemy",
		continent: "North America",
		subregion: "Caribbean",
		pop: 9961,
		lon: -62.843,
		lat: 17.896,
		bbox: [
			-62.88,
			17.88,
			-62.8,
			17.92
		]
	},
	{
		iso: "MAF",
		name: "Saint-Martin",
		continent: "North America",
		subregion: "Caribbean",
		pop: 38002,
		lon: -63.051,
		lat: 18.09,
		bbox: [
			-63.12,
			18.07,
			-63.01,
			18.11
		]
	},
	{
		iso: "WSM",
		name: "Samoa",
		continent: "Oceania",
		subregion: "Polynesia",
		pop: 197097,
		lon: -171.708,
		lat: -13.951,
		bbox: [
			-172.78,
			-14.05,
			-171.45,
			-13.46
		]
	},
	{
		iso: "SMR",
		name: "San Marino",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 33860,
		lon: 12.465,
		lat: 43.937,
		bbox: [
			12.4,
			43.89,
			12.52,
			43.99
		]
	},
	{
		iso: "SAU",
		name: "Saudi Arabia",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 34268528,
		lon: 45.541,
		lat: 23.438,
		bbox: [
			34.62,
			16.37,
			55.64,
			32.12
		]
	},
	{
		iso: "SEN",
		name: "Senegal",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 16296364,
		lon: -14.381,
		lat: 14.033,
		bbox: [
			-17.54,
			12.33,
			-11.38,
			16.68
		]
	},
	{
		iso: "SRB",
		name: "Serbia",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 6944975,
		lon: 20.755,
		lat: 44.248,
		bbox: [
			18.84,
			42.24,
			22.98,
			46.17
		]
	},
	{
		iso: "SYC",
		name: "Seychelles",
		continent: "Seven seas (open ocean)",
		subregion: "Eastern Africa",
		pop: 97625,
		lon: 55.482,
		lat: -4.68,
		bbox: [
			55.38,
			-4.79,
			55.54,
			-4.56
		]
	},
	{
		iso: "KAS",
		name: "Siachen Glacier",
		continent: "Asia",
		subregion: "Southern Asia",
		pop: 6e3,
		lon: 77.236,
		lat: 35.394,
		bbox: [
			76.77,
			35.11,
			77.8,
			35.66
		]
	},
	{
		iso: "SLE",
		name: "Sierra Leone",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 7813215,
		lon: -11.869,
		lat: 8.626,
		bbox: [
			-13.29,
			6.91,
			-10.28,
			10
		]
	},
	{
		iso: "SGP",
		name: "Singapore",
		continent: "Asia",
		subregion: "South-Eastern Asia",
		pop: 5703569,
		lon: 103.867,
		lat: 1.366,
		bbox: [
			103.65,
			1.26,
			104,
			1.45
		]
	},
	{
		iso: "SXM",
		name: "Sint Maarten",
		continent: "North America",
		subregion: "Caribbean",
		pop: 40733,
		lon: -63.072,
		lat: 18.054,
		bbox: [
			-63.12,
			18.02,
			-63.01,
			18.07
		]
	},
	{
		iso: "SVK",
		name: "Slovakia",
		continent: "Europe",
		subregion: "Eastern Europe",
		pop: 5454073,
		lon: 19.621,
		lat: 48.838,
		bbox: [
			16.86,
			47.76,
			22.54,
			49.6
		]
	},
	{
		iso: "SVN",
		name: "Slovenia",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 2087946,
		lon: 14.844,
		lat: 46.123,
		bbox: [
			13.38,
			45.43,
			16.52,
			46.86
		]
	},
	{
		iso: "SLB",
		name: "Solomon Islands",
		continent: "Oceania",
		subregion: "Melanesia",
		pop: 669823,
		lon: 159.189,
		lat: -8.046,
		bbox: [
			155.68,
			-11.83,
			166.93,
			-6.61
		]
	},
	{
		iso: "SOM",
		name: "Somalia",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 10192317,
		lon: 46.511,
		lat: 5.965,
		bbox: [
			40.96,
			-1.7,
			51.39,
			11.98
		]
	},
	{
		iso: "SOL",
		name: "Somaliland",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 5096159,
		lon: 45.578,
		lat: 10.039,
		bbox: [
			42.66,
			8,
			48.94,
			11.5
		]
	},
	{
		iso: "ZAF",
		name: "South Africa",
		continent: "Africa",
		subregion: "Southern Africa",
		pop: 58558270,
		lon: 24.314,
		lat: -28.157,
		bbox: [
			16.45,
			-46.96,
			37.89,
			-22.15
		]
	},
	{
		iso: "SGS",
		name: "South Georgia and the Islands",
		continent: "Seven seas (open ocean)",
		subregion: "Seven seas (open ocean)",
		pop: 30,
		lon: -36.722,
		lat: -54.336,
		bbox: [
			-38.02,
			-58.49,
			-26.26,
			-53.98
		]
	},
	{
		iso: "SSD",
		name: "South Sudan",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 11062113,
		lon: 30.345,
		lat: 7.903,
		bbox: [
			24.15,
			3.49,
			35.27,
			12.22
		]
	},
	{
		iso: "ESP",
		name: "Spain",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 47076781,
		lon: -3.964,
		lat: 40.915,
		bbox: [
			-18.16,
			27.65,
			4.32,
			43.77
		]
	},
	{
		iso: "LKA",
		name: "Sri Lanka",
		continent: "Asia",
		subregion: "Southern Asia",
		pop: 21803e3,
		lon: 80.647,
		lat: 8.272,
		bbox: [
			79.71,
			5.95,
			81.88,
			9.81
		]
	},
	{
		iso: "SDN",
		name: "Sudan",
		continent: "Africa",
		subregion: "Northern Africa",
		pop: 42813238,
		lon: 30.13,
		lat: 13.965,
		bbox: [
			21.82,
			8.67,
			38.61,
			22.2
		]
	},
	{
		iso: "SUR",
		name: "Suriname",
		continent: "South America",
		subregion: "South America",
		pop: 581363,
		lon: -56.071,
		lat: 3.725,
		bbox: [
			-58.05,
			1.84,
			-53.99,
			5.99
		]
	},
	{
		iso: "SWE",
		name: "Sweden",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 10285453,
		lon: 17.46,
		lat: 62.557,
		bbox: [
			11.15,
			55.35,
			24.16,
			69.04
		]
	},
	{
		iso: "CHE",
		name: "Switzerland",
		continent: "Europe",
		subregion: "Western Europe",
		pop: 8574832,
		lon: 8.313,
		lat: 46.742,
		bbox: [
			5.97,
			45.83,
			10.46,
			47.78
		]
	},
	{
		iso: "SYR",
		name: "Syria",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 17070135,
		lon: 38,
		lat: 35.086,
		bbox: [
			35.76,
			32.32,
			42.36,
			37.3
		]
	},
	{
		iso: "STP",
		name: "São Tomé and Principe",
		continent: "Africa",
		subregion: "Middle Africa",
		pop: 215056,
		lon: 6.598,
		lat: .224,
		bbox: [
			6.47,
			.05,
			7.45,
			1.7
		]
	},
	{
		iso: "TWN",
		name: "Taiwan",
		continent: "Asia",
		subregion: "Eastern Asia",
		pop: 23568378,
		lon: 120.994,
		lat: 23.641,
		bbox: [
			118.29,
			21.93,
			121.93,
			25.28
		]
	},
	{
		iso: "TJK",
		name: "Tajikistan",
		continent: "Asia",
		subregion: "Central Asia",
		pop: 9321018,
		lon: 70.752,
		lat: 38.874,
		bbox: [
			67.35,
			36.68,
			75.12,
			41.03
		]
	},
	{
		iso: "TZA",
		name: "Tanzania",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 58005463,
		lon: 34.407,
		lat: -6.606,
		bbox: [
			29.32,
			-11.72,
			40.46,
			-.99
		]
	},
	{
		iso: "THA",
		name: "Thailand",
		continent: "Asia",
		subregion: "South-Eastern Asia",
		pop: 69625582,
		lon: 100.82,
		lat: 13.808,
		bbox: [
			97.37,
			5.64,
			105.64,
			20.42
		]
	},
	{
		iso: "GMB",
		name: "The Gambia",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 2347706,
		lon: -15.506,
		lat: 13.436,
		bbox: [
			-16.82,
			13.06,
			-13.83,
			13.81
		]
	},
	{
		iso: "TLS",
		name: "Timor-Leste",
		continent: "Asia",
		subregion: "South-Eastern Asia",
		pop: 1293119,
		lon: 125.847,
		lat: -8.877,
		bbox: [
			124.04,
			-9.51,
			127.3,
			-8.14
		]
	},
	{
		iso: "TGO",
		name: "Togo",
		continent: "Africa",
		subregion: "Western Africa",
		pop: 8082366,
		lon: .728,
		lat: 8.699,
		bbox: [
			-.09,
			6.09,
			1.78,
			11.12
		]
	},
	{
		iso: "TON",
		name: "Tonga",
		continent: "Oceania",
		subregion: "Polynesia",
		pop: 104494,
		lon: -175.209,
		lat: -21.149,
		bbox: [
			-175.36,
			-21.45,
			-173.92,
			-18.57
		]
	},
	{
		iso: "TTO",
		name: "Trinidad and Tobago",
		continent: "North America",
		subregion: "Caribbean",
		pop: 1394973,
		lon: -61.325,
		lat: 10.458,
		bbox: [
			-61.91,
			10.06,
			-60.52,
			11.32
		]
	},
	{
		iso: "TUN",
		name: "Tunisia",
		continent: "Africa",
		subregion: "Northern Africa",
		pop: 11694719,
		lon: 9.767,
		lat: 34.24,
		bbox: [
			7.5,
			30.23,
			11.54,
			37.34
		]
	},
	{
		iso: "TUR",
		name: "Turkey",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 83429615,
		lon: 35.777,
		lat: 38.644,
		bbox: [
			25.67,
			35.83,
			44.82,
			42.09
		]
	},
	{
		iso: "TKM",
		name: "Turkmenistan",
		continent: "Asia",
		subregion: "Central Asia",
		pop: 5942089,
		lon: 58.425,
		lat: 39.525,
		bbox: [
			52.49,
			35.17,
			66.63,
			42.78
		]
	},
	{
		iso: "TCA",
		name: "Turks and Caicos Islands",
		continent: "North America",
		subregion: "Caribbean",
		pop: 38191,
		lon: -71.942,
		lat: 21.884,
		bbox: [
			-72.34,
			21.75,
			-71.64,
			21.95
		]
	},
	{
		iso: "TUV",
		name: "Tuvalu",
		continent: "Oceania",
		subregion: "Polynesia",
		pop: 11646,
		lon: 179.206,
		lat: -8.506,
		bbox: [
			179.2,
			-8.54,
			179.22,
			-8.47
		]
	},
	{
		iso: "UGA",
		name: "Uganda",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 44269594,
		lon: 32.128,
		lat: 1.385,
		bbox: [
			29.56,
			-1.47,
			34.98,
			4.22
		]
	},
	{
		iso: "UKR",
		name: "Ukraine",
		continent: "Europe",
		subregion: "Eastern Europe",
		pop: 44385155,
		lon: 30.994,
		lat: 48.76,
		bbox: [
			22.13,
			45.23,
			40.13,
			52.35
		]
	},
	{
		iso: "ARE",
		name: "United Arab Emirates",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 9770529,
		lon: 54.484,
		lat: 24.186,
		bbox: [
			51.57,
			22.62,
			56.39,
			26.07
		]
	},
	{
		iso: "GBR",
		name: "United Kingdom",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 66834405,
		lon: -3.214,
		lat: 54.225,
		bbox: [
			-8.14,
			50.02,
			1.75,
			60.83
		]
	},
	{
		iso: "USA",
		name: "United States",
		continent: "North America",
		subregion: "Northern America",
		pop: 328239523,
		lon: -90.265,
		lat: 37.966,
		bbox: [
			-178.19,
			18.96,
			179.78,
			71.41
		]
	},
	{
		iso: "VIR",
		name: "United States Virgin Islands",
		continent: "North America",
		subregion: "Caribbean",
		pop: 106631,
		lon: -64.751,
		lat: 17.753,
		bbox: [
			-65.02,
			17.7,
			-64.58,
			18.39
		]
	},
	{
		iso: "URY",
		name: "Uruguay",
		continent: "South America",
		subregion: "South America",
		pop: 3461734,
		lon: -56.018,
		lat: -32.297,
		bbox: [
			-58.44,
			-34.93,
			-53.13,
			-30.1
		]
	},
	{
		iso: "UZB",
		name: "Uzbekistan",
		continent: "Asia",
		subregion: "Central Asia",
		pop: 33580650,
		lon: 65.738,
		lat: 41.26,
		bbox: [
			55.98,
			37.17,
			73.14,
			45.55
		]
	},
	{
		iso: "VUT",
		name: "Vanuatu",
		continent: "Oceania",
		subregion: "Melanesia",
		pop: 299882,
		lon: 166.874,
		lat: -15.15,
		bbox: [
			166.53,
			-20.24,
			169.9,
			-13.71
		]
	},
	{
		iso: "VAT",
		name: "Vatican",
		continent: "Europe",
		subregion: "Southern Europe",
		pop: 825,
		lon: 12.434,
		lat: 41.901,
		bbox: [
			12.43,
			41.9,
			12.44,
			41.91
		]
	},
	{
		iso: "VEN",
		name: "Venezuela",
		continent: "South America",
		subregion: "South America",
		pop: 28515829,
		lon: -66.091,
		lat: 7.129,
		bbox: [
			-73.37,
			.69,
			-59.83,
			12.18
		]
	},
	{
		iso: "VNM",
		name: "Vietnam",
		continent: "Asia",
		subregion: "South-Eastern Asia",
		pop: 96462106,
		lon: 106.08,
		lat: 16.601,
		bbox: [
			102.13,
			8.58,
			109.44,
			23.34
		]
	},
	{
		iso: "WLF",
		name: "Wallis and Futuna Islands",
		continent: "Oceania",
		subregion: "Polynesia",
		pop: 11558,
		lon: -178.113,
		lat: -14.288,
		bbox: [
			-178.19,
			-14.32,
			-176.13,
			-13.22
		]
	},
	{
		iso: "ESH",
		name: "Western Sahara",
		continent: "Africa",
		subregion: "Northern Africa",
		pop: 603253,
		lon: -12.376,
		lat: 24.431,
		bbox: [
			-17.1,
			20.81,
			-8.68,
			27.66
		]
	},
	{
		iso: "YEM",
		name: "Yemen",
		continent: "Asia",
		subregion: "Western Asia",
		pop: 29161922,
		lon: 47.069,
		lat: 16.079,
		bbox: [
			42.55,
			12.32,
			54.51,
			19
		]
	},
	{
		iso: "ZMB",
		name: "Zambia",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 17861030,
		lon: 28.806,
		lat: -12.521,
		bbox: [
			21.98,
			-18.04,
			33.66,
			-8.19
		]
	},
	{
		iso: "ZWE",
		name: "Zimbabwe",
		continent: "Africa",
		subregion: "Eastern Africa",
		pop: 14645468,
		lon: 29.641,
		lat: -19.148,
		bbox: [
			25.22,
			-22.4,
			33.01,
			-15.64
		]
	},
	{
		iso: "ALA",
		name: "Åland Islands",
		continent: "Europe",
		subregion: "Northern Europe",
		pop: 29884,
		lon: 19.954,
		lat: 60.267,
		bbox: [
			19.52,
			60.01,
			20.61,
			60.41
		]
	}
];
var PLACE_BY = Object.fromEntries(PLACES.map((p) => [p.iso, p]));
var YEARS = [
	2016,
	2017,
	2018,
	2019,
	2020,
	2021,
	2022,
	2023,
	2024,
	2025,
	2026
];
var YEAR_MIN = 2016;
var YEAR_MAX = 2026;
function unit(seed) {
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0) / 4294967296;
}
function jitter(iso, year, key, amp) {
	return (unit(`${iso}:${year}:${key}`) - .5) * 2 * amp;
}
function take(nudge, key) {
	return nudge[key] ?? 0;
}
var SANCTION = {
	RUS: 78,
	IRN: 74,
	PRK: 90,
	SYR: 82,
	VEN: 58,
	BLR: 66,
	MMR: 50,
	CUB: 42,
	SDN: 40,
	AFG: 34
};
var DEBT = {
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
	IND: 50
};
var CLIMATE = {
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
	URY: 72
};
function incomeLevel(ppp) {
	return clamp((Math.log(Math.max(700, ppp)) - Math.log(1100)) / (Math.log(12e4) - Math.log(1100)) * 100, 0, 100);
}
function workingAge(age) {
	if (age < 22) return 54 + (age - 16) * .7;
	if (age < 36) return 60 + (age - 22) * .4;
	return clamp(66 - (age - 36) * .55, 50, 70);
}
function isThin(place) {
	return place.pop < 8e3 || place.continent === "Antarctica" || place.subregion.startsWith("Seven");
}
function buildSeries(place) {
	const anchor = anchorFor(place);
	const drafts = [];
	let prevLwi = null;
	for (const year of YEARS) {
		const g = GLOBAL[year] ?? {};
		const s = story(place.iso, year);
		const shift = (base, key, amp = 0) => base + take(g, key) + take(s, key) + (amp ? jitter(place.iso, year, key, amp) : 0);
		let growth = clamp(shift(anchor.growth, "growth", .25), -40, 16);
		let inflation = clamp(shift(anchor.inflation, "inflation", .18), -2, 220);
		const slack = anchor.unemployment > 18 ? .3 : 1;
		let unemployment = clamp(anchor.unemployment + (take(g, "unemployment") + take(s, "unemployment")) * slack + jitter(place.iso, year, "unemployment", .18), .3, 48);
		const pin = macroPin(place.iso, year);
		if (pin?.growth != null) growth = pin.growth;
		if (pin?.inflation != null) inflation = pin.inflation;
		if (pin?.unemployment != null) unemployment = pin.unemployment;
		const living = clamp(shift(anchor.living, "living", .7), 3, 98);
		const working = clamp(shift(anchor.working, "working", .7), 3, 98);
		const investing = clamp(shift(anchor.investing, "investing", .8), 2, 98);
		const tourism = clamp(shift(anchor.tourism, "tourism", .8), 0, 100);
		const conflict = clamp(shift(anchor.conflict, "conflict", .35), 0, 100);
		const governance = clamp(anchor.governance + take(s, "governance") + jitter(place.iso, year, "gov", .45), 4, 98);
		const openness = clamp(anchor.openness + take(s, "openness") + jitter(place.iso, year, "open", .4), 2, 99);
		const digital = clamp(anchor.digital + (year >= 2020 ? 2.5 : 0) + (year - 2016) * .3 + jitter(place.iso, year, "digital", .4), 4, 99);
		const safety = clamp(anchor.safety + (living - anchor.living) * .22 - Math.max(0, conflict - anchor.conflict) * .18, 3, 98);
		const health = clamp(anchor.health + (year === 2020 ? -6 : year === 2021 ? -2 : 0), 4, 98);
		const education = clamp(anchor.education + jitter(place.iso, year, "edu", .25), 4, 98);
		const cost = clamp(anchor.cost + take(g, "housing") * .28 + Math.max(0, inflation - 4) * .22, 8, 98);
		const housing = clamp(anchor.cost * .7 + take(g, "housing") + take(s, "housing") + (year >= 2022 ? 3 : 0), 6, 99);
		const venture = clamp(investing * .5 + openness * .18 + digital * .12 + take(g, "venture") + take(s, "venture"), 0, 100);
		const sentiment = clamp(living * .34 + working * .22 + investing * .16 + (100 - conflict) * .16 + (100 - Math.min(inflation, 45)) * .12 * .2 + take(g, "sentiment") + take(s, "sentiment") + jitter(place.iso, year, "sent", .8), 2, 98);
		const lwi = clamp(living * .36 + working * .3 + investing * .34, 0, 100);
		const momentum = clamp(50 + (prevLwi == null ? 0 : (lwi - prevLwi) * 2.4), 0, 100);
		prevLwi = lwi;
		const language = clamp(anchor.language, 0, 100);
		const tax = clamp(anchor.tax + jitter(place.iso, year, "tax", .3), 4, 92);
		const popGrowth = clamp(anchor.popGrowth + (year === 2020 ? -.12 : 0), -1.6, 4.2);
		const medianAge = clamp(anchor.medianAge + (year - 2024) * (anchor.medianAge < 24 ? .05 : .13), 15, 56);
		const urban = clamp(anchor.urban + (year - 2016) * .12, 0, 100);
		const wage = clamp(inflation * .62 + Math.max(growth, -4) * .28, -4, 80);
		const credit = clamp(governance * .48 + openness * .24 + (100 - conflict) * .16, 4, 96);
		const startups = clamp(venture * .62 + digital * .2 + working * .12, 2, 98);
		const fdi = clamp(investing * .42 + openness * .32 + governance * .22 - conflict * .18, 2, 98);
		const ease = clamp(governance * .34 + openness * .28 + credit * .22 + (100 - tax) * .16, 2, 98);
		const bizMomentum = clamp(50 + growth * 3 + (investing - 55) * .35, 2, 98);
		const labor = clamp(38 + (place.continent === "Europe" ? 18 : 0) + (governance - 60) * .35, 12, 92);
		const remote = clamp(digital * .46 + language * .34 + (100 - conflict) * .16 + (year >= 2020 ? 5 : 0), 0, 100);
		const talent = clamp(education * .4 + working * .28 + digital * .2 + urban * .12, 0, 100);
		const jobHeat = clamp(78 - unemployment * 1.55 + growth * 1.8, 2, 98);
		const market = clamp(48 + growth * 3.1 + (investing - 50) * .35 + (sentiment - 50) * .15, 2, 98);
		const policy = clamp(governance * .62 + (100 - conflict) * .24 + openness * .14, 2, 98);
		const culture = clamp(tourism * .48 + living * .28 + urban * .12, 6, 98);
		let environment = clamp(68 - (100 - governance) * .22 - urban * .1 - conflict * .08 + (place.continent === "Europe" ? 8 : 0), 6, 96);
		if (place.iso === "CHN" || place.iso === "IND") environment = clamp(environment - 12, 6, 96);
		const transitBoost = [
			"JPN",
			"KOR",
			"SGP",
			"HKG",
			"CHE",
			"NLD",
			"FRA",
			"DEU",
			"ESP",
			"TWN"
		].includes(place.iso) ? 16 : place.continent === "Europe" ? 8 : 0;
		const transit = clamp(urban * .28 + governance * .32 + transitBoost - (place.iso === "USA" ? 12 : 0), 6, 96);
		const climate = CLIMATE[place.iso] ?? clamp(94 - Math.abs(Math.abs(place.lat) - 26) * 1.65, 16, 92);
		const ageShare = workingAge(medianAge);
		const migration = clamp(living * .34 + working * .24 + openness * .2 + safety * .16 - conflict * .22, 0, 100);
		const lifeSat = clamp(living * .5 + safety * .22 + (100 - cost) * .12 + (100 - conflict) * .16, 2, 98);
		const trust = clamp(governance * .72 + safety * .18 - conflict * .16, 2, 98);
		const optimism = clamp(sentiment * .62 + investing * .24 + working * .14, 2, 98);
		const workLife = clamp(living * .4 + labor * .28 + (100 - housing) * .18 + (100 - jobHeat) * .08, 4, 96);
		const riskAppetite = clamp(investing * .4 + venture * .3 + (100 - governance) * .1 + (40 - Math.min(medianAge, 50)) * .4, 2, 96);
		const cohesion = clamp(safety * .4 + trust * .35 + (100 - conflict) * .25, 2, 98);
		const currency = clamp(96 - Math.min(inflation, 60) * 1.05 - conflict * .1 + governance * .08, 2, 98);
		const debt = clamp((DEBT[place.iso] ?? 40 + (100 - governance) * .22) + (year >= 2020 && year <= 2022 ? 4 : 0), 8, 96);
		const external = clamp(52 + (tourism > 75 ? 8 : 0) + (openness - 50) * .2 - Math.max(0, inflation - 8) * .3, 6, 94);
		const corruption = clamp(102 - governance * .86 + conflict * .1, 3, 98);
		const informal = clamp(96 - governance * .42 - incomeLevel(anchor.ppp) * .38 + conflict * .12, 4, 97);
		const cyber = clamp(digital * .42 + incomeLevel(anchor.ppp) * .28 + (100 - governance) * .22, 4, 96);
		let sanctions = SANCTION[place.iso] ?? clamp((100 - openness) * .18 + conflict * .12, 0, 42);
		if (place.iso === "RUS" && year >= 2022) sanctions = Math.max(sanctions, 84);
		if (place.iso === "BLR" && year >= 2022) sanctions = Math.max(sanctions, 70);
		const discourse = clamp(22 + Math.log10(place.pop + 50) * 7 + (year === 2020 ? 12 : year === 2022 ? 9 : 0) + conflict * .12, 6, 98);
		const socialTone = clamp(sentiment * .7 + (100 - conflict) * .2 - Math.min(inflation, 40) * .35, 2, 98);
		const confidence = clamp(sentiment * .5 + working * .25 + currency * .25, 2, 98);
		const realestate = clamp((100 - housing) * .34 + governance * .26 + tourism * .2 + investing * .2, 2, 98);
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
			governance
		});
	}
	const anchorIdx = 2024 - YEAR_MIN;
	const growths = drafts.map((row) => row.gdpGrowth);
	for (let i = 0; i < drafts.length; i++) {
		let ppp = anchor.ppp;
		if (i >= anchorIdx) for (let k = anchorIdx; k < i; k++) ppp *= 1 + growths[k] / 100;
		else for (let k = anchorIdx - 1; k >= i; k--) {
			const g = growths[k];
			ppp /= 1 + (g <= -90 ? -.5 : g) / 100;
		}
		drafts[i].ppp = clamp(ppp, 400, 25e4);
		drafts[i].income = incomeLevel(drafts[i].ppp);
		drafts[i].purchasing = clamp(drafts[i].income * .62 + (100 - drafts[i].cost) * .38, 0, 100);
		drafts[i].informal = clamp(96 - drafts[i].governance * .4 - drafts[i].income * .38 + drafts[i].conflict * .12, 4, 97);
		drafts[i].cyber = clamp(drafts[i].digital * .4 + drafts[i].income * .3 + (100 - drafts[i].governance) * .22, 4, 96);
	}
	return drafts;
}
var cache = /* @__PURE__ */ new Map();
function seriesOf(iso) {
	const hit = cache.get(iso);
	if (hit) return hit;
	const place = PLACE_BY[iso];
	if (!place) return [];
	const built = buildSeries(place);
	cache.set(iso, built);
	return built;
}
function withRegion(raw, region) {
	const next = { ...raw };
	const bump = (key, delta, lo = 0, hi = 100) => {
		next[key] = clamp(Number(raw[key]) + delta, lo, hi);
	};
	bump("living", region.dL);
	bump("working", region.dW);
	bump("investing", region.dI);
	bump("safety", region.dL * .4);
	bump("tourism", region.kind === "tourist" || region.kind === "coast" ? 12 : region.dL * .15);
	bump("cost", region.kind === "metro" || region.kind === "capital" ? 8 : region.kind === "tourist" ? 6 : 0);
	bump("housing", region.kind === "metro" || region.kind === "capital" ? 9 : region.kind === "tourist" ? 7 : 0);
	bump("venture", region.dI * .65 + (region.kind === "metro" ? 4 : 0));
	bump("startups", region.dI * .5 + (region.kind === "metro" ? 3 : 0));
	bump("digital", region.kind === "metro" || region.kind === "capital" ? 4 : region.kind === "interior" ? -4 : 0);
	bump("environment", region.kind === "industrial" || region.kind === "resource" ? -7 : region.kind === "tourist" ? 3 : 0);
	bump("jobHeat", region.dW * .35);
	bump("remote", region.kind === "tourist" ? 6 : region.kind === "metro" ? 3 : 0);
	bump("talent", region.dW * .25);
	bump("sentiment", (region.dL + region.dW + region.dI) * .22);
	bump("optimism", (region.dL + region.dI) * .18);
	bump("lifeSat", region.dL * .3);
	bump("fdi", region.dI * .3);
	next.unemployment = clamp(raw.unemployment - region.dW * .05, .3, 50);
	next.lwi = clamp(next.living * .36 + next.working * .3 + next.investing * .34, 0, 100);
	return next;
}
function rawAt(iso, year, region) {
	const row = seriesOf(iso)[year - YEAR_MIN];
	if (!row) return null;
	return region ? withRegion(row, region) : row;
}
function readingAt(iso, year, metricId, region) {
	const raw = rawAt(iso, year, region);
	if (!raw) return null;
	return readingsOf(raw)[metricId] ?? null;
}
function blendedLevel(raw, prev, metricId, weights) {
	const now = readingsOf(raw)[metricId]?.level ?? 0;
	const before = prev ? readingsOf(prev)[metricId]?.level ?? now : now;
	const social = clamp(now * .48 + (readingsOf(raw).sentiment?.level ?? now) * .52, 0, 100);
	const news = clamp(now + (now - before) * 1.65, 0, 100);
	const sum = weights.official + weights.social + weights.news;
	if (sum <= 0) return now;
	return (now * weights.official + social * weights.social + news * weights.news) / sum;
}
var THEME_SPECS = [
	{
		id: "cost",
		label: "Cost of living",
		terms: [
			"rent",
			"groceries",
			"bills",
			"prices"
		],
		score: (r) => r.cost * .55 + Math.min(100, r.inflation * 2.4) * .45
	},
	{
		id: "housing",
		label: "Housing",
		terms: [
			"housing",
			"mortgage",
			"landlord",
			"affordability"
		],
		score: (r) => r.housing * .75 + r.cost * .25
	},
	{
		id: "jobs",
		label: "Jobs and wages",
		terms: [
			"jobs",
			"wages",
			"hiring",
			"layoffs"
		],
		score: (r) => Math.min(100, r.unemployment * 3) * .45 + (100 - r.jobHeat) * .25 + r.wage * 2
	},
	{
		id: "remote",
		label: "Remote work",
		terms: [
			"remote work",
			"nomad",
			"coworking",
			"visa"
		],
		score: (r) => r.remote * .7 + r.digital * .3
	},
	{
		id: "safety",
		label: "Safety",
		terms: [
			"safety",
			"crime",
			"policing",
			"protests"
		],
		score: (r) => (100 - r.safety) * .55 + r.conflict * .45
	},
	{
		id: "health",
		label: "Healthcare",
		terms: [
			"healthcare",
			"hospitals",
			"insurance",
			"pharmacies"
		],
		score: (r) => (100 - r.health) * .6 + (yearless(r) ? 20 : 20)
	},
	{
		id: "capital",
		label: "Startups and capital",
		terms: [
			"startup",
			"venture",
			"funding",
			"IPO"
		],
		score: (r) => r.venture * .5 + r.startups * .35 + r.fdi * .15
	},
	{
		id: "travel",
		label: "Travel and tourism",
		terms: [
			"tourism",
			"flights",
			"hotels",
			"beaches"
		],
		score: (r) => r.tourism * .7 + r.culture * .3
	},
	{
		id: "policy",
		label: "Policy and governance",
		terms: [
			"election",
			"policy",
			"tax",
			"regulation"
		],
		score: (r) => (100 - r.governance) * .4 + r.tax * .25 + 18
	},
	{
		id: "climate",
		label: "Climate and environment",
		terms: [
			"climate",
			"heat",
			"floods",
			"air quality"
		],
		score: (r) => (100 - r.environment) * .5 + (100 - r.climate) * .5
	},
	{
		id: "migration",
		label: "Migration",
		terms: [
			"immigration",
			"emigration",
			"borders",
			"visas"
		],
		score: (r) => Math.abs(r.migration - 48) * .9 + Math.abs(r.popGrowth) * 8 + 12
	},
	{
		id: "ai",
		label: "AI and tech work",
		terms: [
			"AI",
			"automation",
			"chips",
			"software jobs"
		],
		score: (r) => r.digital * .3 + r.venture * .45 + r.talent * .25
	}
];
function yearless(raw) {
	return raw.health > 0;
}
function themeShares(raw) {
	const scored = THEME_SPECS.map((spec) => ({
		...spec,
		value: Math.max(1, spec.score(raw))
	}));
	const total = scored.reduce((sum, row) => sum + row.value, 0);
	return scored.map((row) => ({
		id: row.id,
		label: row.label,
		share: row.value / total * 100
	})).sort((a, b) => b.share - a.share);
}
function topTerms(raw, limit = 8) {
	const shares = themeShares(raw);
	const byId = new Map(shares.map((row) => [row.id, row.share]));
	const terms = [];
	for (const spec of THEME_SPECS) {
		const share = byId.get(spec.id) ?? 0;
		spec.terms.forEach((term, index) => {
			const wobble = .72 + unit(`${term}:${Math.round(raw.discourse)}:${spec.id}`) * .5;
			terms.push({
				term,
				theme: spec.label,
				score: share * wobble * (1 - index * .12) * (.55 + raw.discourse / 180)
			});
		});
	}
	return terms.sort((a, b) => b.score - a.score).slice(0, limit);
}
var YEAR_CONTEXT = {
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
	2026: "Nowcast. South and Southeast Asia and the Gulf still add growth. Europe is steady. Conflict geographies stay discounted."
};
var WATCH = [
	{
		key: "gdpGrowth",
		label: "GDP growth"
	},
	{
		key: "inflation",
		label: "Inflation"
	},
	{
		key: "unemployment",
		label: "Unemployment"
	},
	{
		key: "sentiment",
		label: "Sentiment"
	},
	{
		key: "lwi",
		label: "The LWI index"
	},
	{
		key: "tourism",
		label: "Tourism"
	},
	{
		key: "housing",
		label: "Housing pressure"
	},
	{
		key: "venture",
		label: "Venture activity"
	},
	{
		key: "conflict",
		label: "Conflict exposure"
	},
	{
		key: "safety",
		label: "Safety"
	}
];
function briefsFor(name, year, current, previous) {
	const briefs = [{
		kicker: String(year),
		title: year === 2026 ? "Nowcast, not a final print" : "The year in context",
		detail: YEAR_CONTEXT[year] ?? ""
	}];
	if (!previous) return briefs;
	const moves = WATCH.map((item) => ({
		...item,
		delta: current[item.key] - previous[item.key]
	})).filter((item) => Math.abs(item.delta) >= .6).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, 3);
	for (const move of moves) {
		const dir = move.delta > 0 ? "rose" : "fell";
		const digits = move.key === "gdpGrowth" || move.key === "inflation" || move.key === "unemployment" ? 1 : 0;
		briefs.push({
			kicker: "Shift",
			title: `${move.label} ${dir}`,
			detail: `In ${name}, ${move.label.toLowerCase()} ${dir} ${Math.abs(move.delta).toFixed(digits)} from ${year - 1}. The atlas reads that as a modeled change, not a wire story.`
		});
	}
	return briefs;
}
function noteFor(place, raw) {
	return PLACE_NOTES[place.iso] ?? `${place.subregion}. Living ${Math.round(raw.living)}, working ${Math.round(raw.working)}, investing ${Math.round(raw.investing)} on the modeled index.`;
}
function weightedRaw(places, year) {
	let weight = 0;
	const acc = {};
	for (const place of places) {
		if (isThin(place) || place.pop <= 0) continue;
		const raw = rawAt(place.iso, year);
		if (!raw) continue;
		weight += place.pop;
		for (const key of Object.keys(raw)) acc[key] = (acc[key] ?? 0) + raw[key] * place.pop;
	}
	if (weight <= 0) return null;
	const out = {};
	for (const key of Object.keys(acc)) out[key] = (acc[key] ?? 0) / weight;
	return out;
}
function placesInScope(scope) {
	if (scope.startsWith("c:")) return PLACES.filter((place) => place.continent === scope.slice(2));
	if (scope.startsWith("s:")) return PLACES.filter((place) => place.subregion === scope.slice(2));
	return PLACES;
}
var FOCUS = {
	USA: [
		-125.5,
		24.2,
		-66.5,
		49.6
	],
	CAN: [
		-132,
		46.5,
		-59,
		62
	],
	RUS: [
		27,
		50,
		140,
		70
	],
	FRA: [
		-5.2,
		41.3,
		9.7,
		51.2
	],
	NOR: [
		4.4,
		57.9,
		31.2,
		71
	],
	NZL: [
		166.2,
		-47.4,
		178.6,
		-34.2
	],
	CHL: [
		-76.2,
		-55.5,
		-68.2,
		-17.4
	],
	GRL: [
		-62,
		60,
		-32,
		82
	],
	AUS: [
		112.5,
		-44,
		154,
		-12
	],
	IDN: [
		95,
		-9,
		141,
		6
	],
	CHN: [
		73.5,
		18,
		135,
		48
	],
	FJI: [
		176.9,
		-19.3,
		181.6,
		-16
	]
};
function focusBBox(place) {
	const special = FOCUS[place.iso];
	if (special) return special;
	const [x0, y0, x1, y1] = place.bbox;
	const width = x1 - x0;
	if (width > 80 || width < 0) return [
		place.lon - 12,
		Math.max(-56, place.lat - 10),
		place.lon + 12,
		Math.min(72, place.lat + 10)
	];
	return place.bbox;
}
var ROWS = `
USA|Northeast Corridor|metro|40.4|-74.4|160|2|8|8|Boston to Washington — jobs and capital, with housing as the tax
USA|Bay Area & Northern California|metro|37.8|-122.3|90|4|6|12|Venture, talent, and a cost of living that leads the country
USA|Southern California|metro|34.1|-118.3|110|6|4|6|Climate, entertainment, trade, and strained housing
USA|Texas Triangle|metro|30.6|-97.4|180|2|6|7|Dallas, Austin, Houston — in-migration and energy-to-tech capital
USA|South Florida|tourist|26.1|-80.2|90|6|2|6|Miami's mix of tourism, finance, and hurricane exposure
USA|Midwest|industrial|41.8|-87.8|160|2|4|2|Chicago and the Great Lakes production belt
USA|Pacific Northwest|metro|47.5|-122.3|100|6|4|6|Seattle and Portland — tech, ports, and rain
USA|Mountain West|interior|39.3|-111.5|200|4|2|3|Denver to Salt Lake — outdoors, growth, and thin transit
USA|Hawaii|tourist|20.6|-157.2|70|10|-2|2|A tourism economy with a housing wall for residents
USA|Alaska|resource|61.2|-149.9|120|-2|2|2|Resource wages, distance, and a hard climate
CAN|Toronto & Ontario|metro|43.7|-79.4|80|2|6|6|The country's job and immigration engine
CAN|Montreal & Quebec|metro|45.6|-73.6|70|4|2|3|Culture, aerospace, and a distinct language market
CAN|British Columbia|coast|49.3|-123.1|90|8|2|4|Vancouver and the coast — livable, expensive, trade-facing
CAN|Alberta|resource|51.2|-114.1|120|0|4|4|Energy wages and the Rockies visitor belt
CAN|Atlantic Canada|coast|45.2|-63.2|110|4|-2|0|Smaller cities, slower growth, a strong tourism summer
MEX|Mexico City|capital|19.4|-99.1|50|0|6|6|The corporate and cultural core
MEX|Riviera Maya|tourist|20.8|-87.1|70|8|-2|4|Cancún to Tulum — the visitor economy
MEX|Baja & Los Cabos|tourist|22.9|-109.9|60|6|0|3|Pacific resorts and a US weekend market
MEX|Monterrey & the north|industrial|25.7|-100.3|70|-2|6|6|Nearshoring factories and cross-border trade
MEX|Oaxaca & the south|tourist|17.0|-96.5|70|4|-4|-2|Culture and tourism, thinner job markets
GBR|London|metro|51.5|-0.12|40|2|8|10|Global services, extreme housing costs
GBR|Northern England|industrial|53.5|-2.2|70|-2|2|0|Manchester, Leeds, Liverpool — a cheaper, rebuilding north
GBR|Scotland|interior|56.5|-4.2|90|4|0|1|Edinburgh, Glasgow, and the Highlands visitor economy
GBR|Cornwall & the southwest|tourist|50.4|-4.7|60|6|-4|0|Coast, second homes, thin winter work
GBR|Wales|interior|52.1|-3.8|60|2|-2|-1|Landscape and a smaller urban job base
GBR|Northern Ireland|metro|54.6|-5.9|40|0|0|0|Belfast's services revival, still a small market
IRL|Dublin|metro|53.3|-6.3|30|2|8|8|Tech and pharma headquarters, a brutal housing market
IRL|Wild Atlantic Way|tourist|53.3|-9.4|70|8|-4|1|The visitor coast from Galway to Kerry
FRA|Île-de-France|metro|48.9|2.35|40|0|8|8|Paris — jobs, culture, and a commuter-cost machine
FRA|Provence & Côte d'Azur|tourist|43.6|5.4|70|10|-2|3|The southern visitor belt
FRA|French Alps|tourist|45.9|6.7|60|8|-2|2|Chamonix to the Savoie ski economy
FRA|Lyon & the Rhône|metro|45.8|4.8|50|2|4|3|France's second industrial and food city
FRA|Nouvelle-Aquitaine|tourist|44.8|-0.6|80|6|-2|1|Bordeaux, wine, and the Atlantic coast
FRA|Brittany|coast|48.2|-2.9|70|6|-4|0|A cooler coast with a strong local identity
FRA|Occitanie|interior|43.6|1.5|80|4|0|1|Toulouse aerospace and a wide south
DEU|Berlin|metro|52.5|13.4|35|4|4|6|Startups, culture, and still-cheaper rents than Munich
DEU|Bavaria|metro|48.1|11.6|70|4|6|6|Munich and the alpine south — high wages, high costs
DEU|Rhine-Ruhr|industrial|51.4|6.9|60|-2|4|2|Germany's industrial density
DEU|Hamburg & the north|metro|53.6|10.0|50|2|4|3|Port, media, and a looser housing market
DEU|Baden-Württemberg|industrial|48.7|9.2|60|2|6|5|Cars, Mittelstand, and export depth
NLD|Randstad|metro|52.2|4.7|40|2|8|7|Amsterdam, Rotterdam, Utrecht — one labor market
BEL|Brussels|capital|50.8|4.4|25|0|4|4|EU institutions and a bilingual services core
BEL|Flanders|industrial|51.1|3.7|40|2|4|3|Antwerp's port and a dense SME belt
CHE|Zurich|metro|47.4|8.5|25|2|8|8|Switzerland's financial and corporate center
CHE|Lake Geneva|metro|46.2|6.1|30|4|4|6|Geneva, Lausanne, and the international-org economy
CHE|Swiss Alps|tourist|46.6|8.0|50|8|-2|2|The visitor and second-home Alps
AUT|Vienna|metro|48.2|16.4|25|4|4|4|A livable capital with a slower venture scene
AUT|Tyrol & the Alps|tourist|47.3|11.4|50|8|-2|2|Ski, summer hiking, and a tight local housing market
ESP|Madrid|metro|40.4|-3.7|40|2|6|6|The political and corporate capital
ESP|Catalonia|metro|41.5|2.1|50|4|4|5|Barcelona — tourism, design, and a housing fight
ESP|Andalusia|tourist|37.4|-5.0|90|6|-2|2|Seville, Granada, Málaga, and the southern coast
ESP|Balearic Islands|tourist|39.6|2.9|40|8|-4|3|Mallorca and Ibiza — visitors and housing stress
ESP|Canary Islands|tourist|28.3|-15.6|50|8|-2|2|Year-round sun and a tourism monoculture
ESP|Valencia & the east|coast|39.5|-0.4|40|6|0|2|A more affordable Mediterranean city belt
ESP|Basque Country|industrial|43.3|-2.7|40|2|4|3|Industry, food, and high local incomes
ITA|Milan & Lombardy|metro|45.5|9.2|40|2|8|7|Italy's job and fashion-finance core
ITA|Rome & Lazio|capital|41.9|12.5|40|4|2|2|Government, tourism, and a slower private economy
ITA|Tuscany|tourist|43.4|11.2|50|10|-2|2|The archetype of a visitor landscape
ITA|Veneto|metro|45.4|12.2|40|4|4|3|Venice tourism plus a strong SME hinterland
ITA|Amalfi & Campania|tourist|40.6|14.5|40|8|-4|1|The coast people mean when they say southern Italy
ITA|Sicily|tourist|37.5|14.1|70|6|-6|-1|Tourism and a thin formal job market
ITA|Italian Alps|tourist|46.5|11.3|50|6|-2|1|Dolomites and the winter economy
PRT|Lisbon|metro|38.7|-9.1|25|6|4|5|A remote-work magnet with local housing anger
PRT|Porto & the north|metro|41.1|-8.6|30|4|2|2|Wine, industry, and a slightly kinder cost base
PRT|Algarve|tourist|37.1|-8.2|40|10|-6|2|The southern resort coast
PRT|Madeira|tourist|32.7|-16.9|20|8|-2|1|A year-round island climate
GRC|Athens|metro|38.0|23.7|30|2|4|3|Services, tourism spillover, and dense housing
GRC|Cyclades|tourist|37.1|25.2|40|10|-6|2|Santorini, Mykonos, and the island season
GRC|Crete|tourist|35.2|24.9|50|8|-2|1|A longer season than the small islands
GRC|Thessaloniki & the north|metro|40.6|22.9|40|0|2|1|Greece's second city
HRV|Dalmatian coast|tourist|43.2|16.7|60|10|-4|3|Split to Dubrovnik
HRV|Istria|tourist|45.2|13.9|40|8|-2|2|The northern Adriatic, closer to Italy
HRV|Zagreb|capital|45.8|16.0|25|0|4|2|The inland job market
TUR|Istanbul|metro|41.0|29.0|40|2|6|5|The country's commercial capital, split by the Bosphorus
TUR|Aegean & Izmir|tourist|38.4|27.0|50|6|0|2|A milder coast and a real city economy
TUR|Cappadocia|tourist|38.6|34.8|40|8|-6|1|Balloon-tourism country
TUR|Antalya coast|tourist|36.8|31.0|50|8|-4|2|The big resort south
TUR|Ankara|capital|39.9|32.8|30|-2|2|1|Government and universities, less visitor glow
POL|Warsaw|metro|52.2|21.0|30|0|6|6|The corporate and startup core
POL|Kraków & the south|metro|50.1|19.9|40|4|4|3|Tech offices and a dense visitor old town
POL|Gdańsk & the Baltic|coast|54.4|18.6|30|4|2|2|The port, beaches, and a shipyard history
CZE|Prague|metro|50.1|14.4|20|6|4|4|A visitor capital that is also the national job market
HUN|Budapest|metro|47.5|19.0|20|4|4|3|Most of Hungary's formal opportunity sits here
ROU|Bucharest|metro|44.4|26.1|25|0|6|4|Services and a fast private sector
ROU|Transylvania|tourist|46.8|23.6|50|6|0|1|Cluj, Brașov, and the visitor towns
SWE|Stockholm|metro|59.3|18.1|30|2|6|8|Sweden's venture and headquarters city
SWE|Malmö & the south|metro|55.6|13.0|30|2|2|2|A bridge to Copenhagen
SWE|Swedish Lapland|tourist|67.8|20.2|80|6|-6|0|Winter tourism and very thin population
NOR|Oslo|metro|59.9|10.7|25|2|6|5|Oil-wealth services and a costly city
NOR|Fjord Norway|tourist|61.0|6.6|70|10|-4|2|Bergen and the western visitor coast
NOR|Northern Norway|interior|69.4|19.5|80|2|-2|0|Fisheries, energy, and the midnight sun
DNK|Copenhagen|metro|55.7|12.6|20|4|6|6|Almost a city-state economy inside Denmark
FIN|Helsinki|metro|60.2|24.9|25|2|6|6|Tech, design, and the national labor market
FIN|Lapland|tourist|67.6|26.5|80|8|-6|1|Rovaniemi and the winter visitor season
ISL|Reykjavík & the south|metro|64.1|-21.9|40|4|4|3|Where almost everyone, and every visitor, actually is
CHE2|skip|metro|0|0|0|0|0|0|unused
NLD2|skip|metro|0|0|0|0|0|0|unused
`.trim();
var MORE = `
ARE|Dubai|metro|25.2|55.3|25|4|6|10|The region's air hub, tourism brand, and cost peak
ARE|Abu Dhabi|capital|24.5|54.4|30|2|4|6|Energy wealth and a quieter capital
SAU|Riyadh|capital|24.7|46.7|40|0|4|6|The reform and corporate center
SAU|Jeddah & the Red Sea|coast|21.5|39.2|40|4|2|4|The commercial coast and new resort bets
SAU|NEOM & Tabuk|tourist|28.0|35.2|50|-2|0|4|A project region more than a lived-in city, for now
QAT|Doha|metro|25.3|51.5|20|2|4|5|A compact, high-income capital
ISR|Tel Aviv|metro|32.1|34.8|20|2|8|12|Startups on a beach, with security always in the frame
ISR|Jerusalem|capital|31.8|35.2|15|-2|0|0|History, faith, and politics more than venture
JOR|Amman|capital|32.0|35.9|20|0|4|2|The stable services capital of the Levant
JOR|Petra & the south|tourist|30.3|35.4|40|8|-6|1|The visitor south, including Wadi Rum
EGY|Cairo|metro|30.0|31.2|30|-2|4|3|A megacity labor market
EGY|Red Sea resorts|tourist|27.4|33.8|60|8|-4|3|Hurghada and Sharm — the beach product
EGY|Luxor & Upper Egypt|tourist|25.7|32.6|40|6|-6|0|Antiquities tourism
EGY|Alexandria|coast|31.2|29.9|25|2|0|0|The Mediterranean second city
MAR|Casablanca|metro|33.6|-7.6|25|0|4|4|Business Morocco
MAR|Marrakech|tourist|31.6|-8.0|30|8|-2|3|The visitor city people fly to
MAR|Tangier|coast|35.8|-5.8|25|2|4|4|The strait, the port, and European industry
ZAF|Cape Town & Western Cape|tourist|-33.9|18.5|40|10|2|4|The country's livability and tourism brand
ZAF|Johannesburg & Gauteng|metro|-26.2|28.0|40|-4|6|5|Jobs and corporate HQs, with a safety discount
ZAF|Durban & KwaZulu-Natal|coast|-29.8|31.0|30|2|0|1|The Indian Ocean port city
ZAF|Garden Route|tourist|-34.0|23.0|50|8|-6|1|A thin, beautiful coastal strip
NGA|Lagos|metro|6.5|3.4|30|-2|8|6|West Africa's commercial capital
NGA|Abuja|capital|9.1|7.5|25|0|2|2|A planned capital, quieter than Lagos
NGA|Port Harcourt|resource|4.8|7.0|25|-4|2|2|Oil, and the security issues that follow it
KEN|Nairobi|metro|-1.3|36.8|25|0|6|6|Regional HQs, tech, and traffic
KEN|Mombasa & the coast|tourist|-4.0|39.6|30|6|-2|2|Beaches and the old port
KEN|Maasai Mara & Rift|tourist|-1.3|35.2|40|6|-6|1|The safari circuit
GHA|Accra|metro|5.6|-0.2|20|2|4|4|A stable coastal capital
RWA|Kigali|capital|-1.9|30.1|15|4|4|4|A small, carefully run capital
TZA|Dar es Salaam|metro|-6.8|39.2|20|0|4|3|The commercial city
TZA|Zanzibar|tourist|-6.1|39.3|20|10|-4|3|The island visitor economy
TZA|Arusha & the north|tourist|-3.4|36.7|30|6|-2|2|Safari logistics
ETH|Addis Ababa|capital|9.0|38.7|20|0|4|2|The highland capital and AU seat
IND|Delhi NCR|metro|28.6|77.2|40|-2|6|6|Government, corporates, and bad air
IND|Mumbai & Maharashtra|metro|19.1|72.9|35|0|8|8|Finance, film, and ports
IND|Bengaluru|metro|13.0|77.6|25|2|6|12|The country's tech and venture core
IND|Hyderabad|metro|17.4|78.5|25|2|6|8|Pharma, tech campuses, and a growing skyline
IND|Chennai & Tamil Nadu|industrial|13.1|80.3|30|0|4|4|Autos, electronics, and a drier south
IND|Goa|tourist|15.4|74.0|25|8|-2|2|Beaches and a long-stay visitor crowd
IND|Kerala|tourist|10.1|76.4|40|8|0|1|Backwaters, literacy, and remittances
IND|Rajasthan|tourist|26.9|75.8|60|6|-2|1|Jaipur and the desert circuit
IND|Kolkata|metro|22.6|88.4|25|0|2|1|The east's cultural and port city
CHN|Beijing|capital|39.9|116.4|40|0|4|4|Politics, universities, and headquarters
CHN|Shanghai|metro|31.2|121.5|35|2|8|8|The commercial capital
CHN|Pearl River Delta|industrial|22.8|113.8|50|0|8|8|Shenzhen, Guangzhou, and the factory-to-tech shift
CHN|Chengdu & Sichuan|interior|30.7|104.1|40|4|4|4|A western growth city with a slower cost base
CHN|Hainan|tourist|19.5|109.6|40|8|-4|2|The tropical island experiment
JPN|Tokyo|metro|35.7|139.7|40|2|8|8|The deepest urban job market in the country
JPN|Osaka & Kansai|metro|34.7|135.5|40|2|4|3|Japan's second commercial region
JPN|Kyoto|tourist|35.0|135.8|20|8|-2|2|Culture tourism sitting next to Kansai jobs
JPN|Hokkaido|tourist|43.1|141.4|70|6|-4|1|Sapporo, snow, and space
JPN|Okinawa|tourist|26.3|127.8|30|10|-4|1|A subtropical visitor economy
JPN|Fukuoka|metro|33.6|130.4|25|4|2|2|A more human-scaled Kyushu city
KOR|Seoul|metro|37.5|127.0|30|0|8|8|Almost half the country's opportunity
KOR|Busan|metro|35.2|129.1|25|2|2|2|The southern port
KOR|Jeju|tourist|33.4|126.5|25|10|-4|2|The honeymoon and hike island
TWN|Taipei|metro|25.0|121.5|20|2|6|8|Semiconductors' management city
TWN|Taichung|metro|24.1|120.7|20|2|4|3|A central industrial city
TWN|Kaohsiung|industrial|22.6|120.3|20|2|2|2|The southern port
HKG|Hong Kong Island & Kowloon|metro|22.3|114.2|12|0|6|8|Finance, a superb port, and impossible rents
SGP|Central Singapore|metro|1.3|103.85|8|0|6|8|The city-state's job core
SGP|East Coast & Sentosa|tourist|1.3|103.9|8|4|-2|2|The visitor and residential east
IDN|Jakarta|metro|-6.2|106.8|30|-4|6|6|The megacity — jobs, floods, and traffic
IDN|Bali|tourist|-8.4|115.2|30|12|-4|4|The world's default island brand
IDN|Yogyakarta|tourist|-7.8|110.4|20|6|-2|1|Culture and students
IDN|Bandung|metro|-6.9|107.6|20|4|2|2|A cooler highland city above Jakarta
THA|Bangkok|metro|13.8|100.5|30|2|6|6|The primate city
THA|Phuket & the Andaman|tourist|7.9|98.3|30|10|-6|4|Beach tourism and a real estate cycle
THA|Chiang Mai|tourist|18.8|99.0|25|8|0|2|The long-stay and digital-nomad north
THA|Pattaya & the east|tourist|12.9|100.9|25|4|-2|2|A heavier, closer-in resort coast
VNM|Hanoi|capital|21.0|105.8|20|0|4|3|The political capital
VNM|Ho Chi Minh City|metro|10.8|106.7|25|2|8|7|The commercial south
VNM|Da Nang & the central coast|tourist|16.0|108.2|30|8|2|3|Beaches between the two big cities
VNM|Ha Long|tourist|20.9|107.2|25|8|-6|1|The bay people come to see
MYS|Kuala Lumpur|metro|3.1|101.7|25|2|6|6|The national services core
MYS|Penang|industrial|5.4|100.3|20|4|4|5|Electronics and street food
MYS|Sabah|tourist|5.9|116.1|40|6|-2|1|Borneo's visitor side
PHL|Manila|metro|14.6|121.0|25|-2|6|5|The dense, complicated capital
PHL|Cebu|metro|10.3|123.9|20|4|4|3|The Visayas hub
PHL|Palawan|tourist|9.8|118.7|40|12|-8|2|A thin, famous island economy
AUS|Sydney|metro|-33.9|151.2|30|4|6|6|Harbor, finance, and housing stress
AUS|Melbourne|metro|-37.8|145.0|30|4|6|5|Culture, sport, and a broad job base
AUS|Brisbane & Gold Coast|tourist|-27.6|153.2|40|6|2|4|Sun, migration, and the 2032 Olympics build
AUS|Perth|resource|-31.9|115.9|25|2|4|4|Mining services and isolation
AUS|Cairns & the Reef|tourist|-16.8|145.7|40|10|-6|2|The reef gateway
AUS|Tasmania|tourist|-42.0|146.8|50|6|-4|0|A cooler, smaller island economy
NZL|Auckland|metro|-36.9|174.8|25|2|6|4|A third of the country, and the housing argument
NZL|Wellington|capital|-41.3|174.8|15|4|2|2|Government, film, and wind
NZL|Canterbury|metro|-43.5|172.6|25|2|2|1|Christchurch and the rebuild
NZL|Queenstown & Otago|tourist|-45.0|168.7|30|12|-6|3|The adventure-tourism capital
BRA|São Paulo|metro|-23.5|-46.6|30|0|8|8|The industrial and financial heart
BRA|Rio de Janeiro|tourist|-22.9|-43.2|30|6|2|3|Landscape, tourism, and a safety discount
BRA|Brasília|capital|-15.8|-47.9|25|-2|2|1|A planned capital of public jobs
BRA|Bahia & the northeast coast|tourist|-13.0|-38.5|50|6|-2|1|Salvador and the beach northeast
BRA|Manaus & the Amazon|interior|-3.1|-60.0|40|-4|0|0|A free-trade island in the forest
BRA|Florianópolis & the south|coast|-27.6|-48.5|25|8|2|3|A higher-income, beach-and-tech south
ARG|Buenos Aires|metro|-34.6|-58.4|30|2|6|4|Culture and services, priced in a volatile currency
ARG|Mendoza|tourist|-32.9|-68.8|30|6|0|2|Wine country
ARG|Bariloche & the lakes|tourist|-41.1|-71.3|30|8|-4|1|The Andean visitor belt
ARG|Patagonia|resource|-48.0|-68.0|80|2|0|1|Energy, sheep, and distance
CHL|Santiago|metro|-33.4|-70.6|25|0|6|5|Almost the whole formal economy
CHL|Valparaíso|coast|-33.0|-71.6|20|4|0|1|The port and a university coast
CHL|Atacama|tourist|-23.5|-68.2|50|6|-6|1|Desert tourism and mining
CHL|Chilean Patagonia|tourist|-51.0|-72.9|60|8|-8|0|Torres del Paine and very few residents
COL|Bogotá|metro|4.7|-74.1|25|-2|6|5|The highland capital
COL|Medellín|metro|6.2|-75.6|20|4|6|6|The turnaround city, now a remote-work magnet
COL|Cartagena & the Caribbean|tourist|10.4|-75.5|30|8|-2|3|The walled city and the coast
COL|Coffee Axis|tourist|4.8|-75.7|30|8|-4|1|The Andean coffee towns
PER|Lima|metro|-12.0|-77.0|25|0|6|4|The desert capital
PER|Cusco & the Sacred Valley|tourist|-13.5|-71.9|30|10|-6|3|Machu Picchu's gateway
PER|Arequipa|interior|-16.4|-71.5|20|4|0|1|The white city of the south
URY|Montevideo|metro|-34.9|-56.2|20|2|4|3|A calm capital
URY|Punta del Este|tourist|-34.9|-54.9|15|8|-6|3|A seasonal resort market
CRI|San José|metro|9.9|-84.1|20|0|4|2|The central-valley job market
CRI|Guanacaste|tourist|10.6|-85.4|30|8|-4|3|Pacific beaches and US flights
PAN|Panama City|metro|9.0|-79.5|20|0|6|6|The canal, banks, and towers
PAN|Bocas del Toro|tourist|9.3|-82.2|20|8|-6|1|A small Caribbean corner
DOM|Santo Domingo|metro|18.5|-69.9|20|0|4|2|The capital
DOM|Punta Cana|tourist|18.6|-68.4|25|10|-8|4|An all-inclusive factory coast
CUB|Havana|metro|23.1|-82.4|20|2|0|0|The city visitors are allowed to romanticize
CUB|Varadero|tourist|23.2|-81.3|15|6|-4|1|The resort strip
PRI|San Juan|metro|18.5|-66.1|15|2|4|3|A US-linked services and tourism capital
JAM|Kingston|metro|18.0|-76.8|15|-2|2|1|The capital, with a safety caveat
JAM|Montego Bay|tourist|18.5|-77.9|20|6|-2|2|The north-coast resort belt
CYM|Grand Cayman|metro|19.3|-81.4|10|4|6|8|Finance and beaches, very small
BHS|Nassau|tourist|25.1|-77.3|15|4|0|3|Cruise and offshore services
GEO|Tbilisi|metro|41.7|44.8|15|4|4|4|A walkable capital with a tourism boom
GEO|Batumi|tourist|41.6|41.6|15|6|0|2|The Black Sea resort
ARM|Yerevan|metro|40.2|44.5|15|2|2|2|A compact capital
AZE|Baku|metro|40.4|49.9|20|0|4|4|Oil, the Caspian, and a polished waterfront
KAZ|Almaty|metro|43.2|76.9|20|4|4|3|The more livable commercial city
KAZ|Astana|capital|51.1|71.4|20|-2|2|3|The planned capital on the steppe
UZB|Tashkent|metro|41.3|69.3|20|0|4|2|The region's largest capital
UZB|Samarkand|tourist|39.7|67.0|15|8|-4|1|The Silk Road visitor city
UKR|Kyiv|metro|50.4|30.5|20|-4|2|0|The capital under wartime conditions
UKR|Lviv|metro|49.8|24.0|15|2|2|1|The safer west, and a wartime services hub
UKR|Odesa|coast|46.5|30.7|20|-2|0|0|The Black Sea port, exposed
RUS|Moscow|metro|55.8|37.6|30|0|6|4|Where Russian money and jobs concentrate
RUS|Saint Petersburg|metro|59.9|30.3|20|4|2|2|The cultural second city
RUS|Sochi|tourist|43.6|39.7|20|6|-2|1|The Black Sea resort
PAK|Karachi|metro|24.9|67.0|25|-4|4|3|The port megacity
PAK|Lahore|metro|31.5|74.3|20|2|2|2|The cultural and industrial Punjab capital
PAK|Islamabad|capital|33.7|73.1|15|4|2|1|A planned, calmer capital
BGD|Dhaka|metro|23.8|90.4|20|-6|4|3|One of the densest job markets on earth
BGD|Chittagong|industrial|22.3|91.8|20|-2|4|3|The port and the garment coast
LKA|Colombo|metro|6.9|79.8|15|0|4|3|The commercial capital
LKA|South coast|tourist|6.0|80.3|20|8|-4|2|Galle and the beach towns
LKA|Hill country|tourist|7.1|80.7|25|6|-4|0|Kandy and the tea highlands
NPL|Kathmandu|metro|27.7|85.3|15|0|2|1|The valley capital
NPL|Pokhara|tourist|28.2|84.0|15|8|-4|1|Lakes and the Annapurna gateway
MDV|Malé atolls|tourist|3.8|73.4|30|6|2|4|The entire country is the visitor product
MUS|Mauritius coast|tourist|-20.2|57.5|20|8|0|3|A small, orderly island economy
KHM|Siem Reap|tourist|13.4|103.9|20|8|-6|2|Angkor
KHM|Phnom Penh|metro|11.6|104.9|15|0|4|2|The capital
LAO|Luang Prabang|tourist|19.9|102.1|15|8|-6|1|The heritage town
VUT|Port Vila|tourist|-17.7|168.3|10|4|0|1|A small Pacific capital
FJI|Viti Levu|tourist|-18.1|178.0|30|6|0|2|Most of Fiji's people and visitors
CPV|Santiago & Sal|tourist|16.0|-24.0|20|6|0|2|Island tourism off West Africa
SEN|Dakar|metro|14.7|-17.4|15|2|4|3|The most connected city in francophone West Africa
MAR2|skip|metro|0|0|0|0|0|0|unused
`.trim();
var KINDS = /* @__PURE__ */ new Set([
	"metro",
	"tourist",
	"industrial",
	"capital",
	"coast",
	"interior",
	"resource"
]);
function parseRows(block) {
	const out = [];
	for (const line of block.split("\n")) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.includes("|skip|")) continue;
		const [iso, name, kind, lat, lon, km, dL, dW, dI, note] = trimmed.split("|");
		if (!iso || !PLACE_BY[iso] || !KINDS.has(kind)) continue;
		const slug = name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
		out.push({
			id: `${iso}:${slug}`,
			iso,
			name,
			kind,
			lat: Number(lat),
			lon: Number(lon),
			km: Number(km),
			dL: Number(dL),
			dW: Number(dW),
			dI: Number(dI),
			note,
			named: true
		});
	}
	return out;
}
var NAMED = parseRows(`${ROWS}\n${MORE}`);
var NAMED_BY_ISO = /* @__PURE__ */ new Map();
for (const region of NAMED) {
	const list = NAMED_BY_ISO.get(region.iso);
	if (list) list.push(region);
	else NAMED_BY_ISO.set(region.iso, [region]);
}
function spanKm(place) {
	const [x0, y0, x1, y1] = focusBBox(place);
	const mid = (y0 + y1) / 2 * (Math.PI / 180);
	const dx = Math.abs(x1 - x0) * 111 * Math.max(.25, Math.cos(mid));
	const dy = Math.abs(y1 - y0) * 111;
	return Math.max(dx, dy);
}
function autoRegions(place) {
	const [x0, y0, x1, y1] = focusBBox(place);
	const cx = (x0 + x1) / 2;
	const cy = (y0 + y1) / 2;
	const km = Math.max(25, Math.min(160, spanKm(place) * .18));
	const belt = (id, name, lat, lon, dL, dW, dI, kind) => ({
		id: `${place.iso}:${id}`,
		iso: place.iso,
		name,
		kind,
		lat,
		lon,
		km,
		dL,
		dW,
		dI,
		note: "A modeled belt. Named cities are used where the public record is rich; elsewhere Meridian splits the territory into clear zones.",
		named: false
	});
	if (spanKm(place) < 180 || place.pop < 4e5) return [belt("core", `${place.name} core`, cy, cx, 0, 2, 1, "capital")];
	const dy = (y1 - y0) * .22;
	return [
		belt("north", `${place.name} — north`, cy + dy, cx, 1, 0, 0, "interior"),
		belt("center", `${place.name} — center`, cy, cx, 0, 3, 2, "metro"),
		belt("south", `${place.name} — south`, cy - dy, cx, 2, -1, 0, "coast")
	];
}
var ALL = /* @__PURE__ */ new Map();
for (const place of PLACES) ALL.set(place.iso, NAMED_BY_ISO.get(place.iso) ?? autoRegions(place));
function regionsFor(iso) {
	return ALL.get(iso) ?? [];
}
var cached = null;
function allRegions() {
	if (!cached) cached = PLACES.flatMap((place) => regionsFor(place.iso));
	return cached;
}
function regionById(id) {
	const iso = id.split(":")[0];
	return regionsFor(iso).find((region) => region.id === id);
}
function circleRing(lon, lat, km) {
	const ring = [];
	const d = km / 6371;
	const lat1 = lat * Math.PI / 180;
	const lon1 = lon * Math.PI / 180;
	for (let i = 0; i <= 36; i++) {
		const bearing = i / 36 * Math.PI * 2;
		const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(bearing));
		let deg = (lon1 + Math.atan2(Math.sin(bearing) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2))) * 180 / Math.PI;
		if (deg > 180) deg -= 360;
		if (deg < -180) deg += 360;
		ring.push([deg, lat2 * 180 / Math.PI]);
	}
	return ring;
}
var useAtlas = create((set) => ({
	year: 2026,
	metricId: "lwi",
	lens: "level",
	weights: {
		official: 70,
		social: 20,
		news: 10
	},
	popMin: 1e6,
	scope: "world",
	iso: null,
	regionId: null,
	playing: false,
	setYear: (year) => set({ year }),
	setMetric: (metricId) => set({ metricId }),
	setLens: (lens) => set({ lens }),
	setWeight: (key, value) => set((state) => ({ weights: {
		...state.weights,
		[key]: value
	} })),
	setPopMin: (popMin) => set({ popMin }),
	setScope: (scope) => set({
		scope,
		iso: null,
		regionId: null
	}),
	selectCountry: (iso) => set({
		iso,
		regionId: null
	}),
	selectRegion: (regionId) => set({ regionId }),
	openPlace: (iso, regionId = null) => set({
		iso,
		regionId,
		scope: "world"
	}),
	setPlaying: (playing) => set({ playing })
}));
var KEY = "meridian.added.v1";
function isKnownMetric(id) {
	return METRICS.some((metric) => metric.id === id);
}
function loadAdded() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(isAdded);
	} catch {
		return [];
	}
}
function saveAdded(rows) {
	window.localStorage.setItem(KEY, JSON.stringify(rows));
}
function isAdded(value) {
	if (!value || typeof value !== "object") return false;
	const row = value;
	return typeof row.id === "string" && typeof row.label === "string" && isKnownMetric(row.baseId);
}
function packAdded(row) {
	const bytes = new TextEncoder().encode(JSON.stringify(row));
	let binary = "";
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}
function unpackAdded(packed) {
	try {
		const binary = atob(packed.replaceAll("-", "+").replaceAll("_", "/"));
		const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
		const parsed = JSON.parse(new TextDecoder().decode(bytes));
		return isAdded(parsed) ? parsed : null;
	} catch {
		return null;
	}
}
function WithTip({ tip, children, className }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [pinned, setPinned] = (0, import_react.useState)(false);
	const wrapRef = (0, import_react.useRef)(null);
	const closeTimer = (0, import_react.useRef)(0);
	const labelId = (0, import_react.useId)();
	function show() {
		window.clearTimeout(closeTimer.current);
		setOpen(true);
	}
	function scheduleClose() {
		if (pinned) return;
		window.clearTimeout(closeTimer.current);
		closeTimer.current = window.setTimeout(() => setOpen(false), 160);
	}
	(0, import_react.useEffect)(() => () => window.clearTimeout(closeTimer.current), []);
	(0, import_react.useEffect)(() => {
		if (!pinned) return;
		const onKey = (event) => {
			if (event.key === "Escape") {
				setPinned(false);
				setOpen(false);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [pinned]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: className ? `inline-flex max-w-full items-center gap-0.5 ${className}` : "inline-flex max-w-full items-center gap-0.5",
		onMouseEnter: show,
		onMouseLeave: scheduleClose,
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "grid h-11 w-11 shrink-0 place-items-center rounded-md text-muted hover:text-fg",
				"aria-label": `Define ${tip.title}`,
				"aria-expanded": open,
				"aria-describedby": open ? labelId : void 0,
				onClick: (event) => {
					event.stopPropagation();
					event.preventDefault();
					setPinned((current) => {
						const next = !current;
						setOpen(next);
						return next;
					});
				},
				onMouseEnter: show,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4" })
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TipCard, {
				tip,
				id: labelId,
				anchor: wrapRef.current,
				onEnter: show,
				onLeave: scheduleClose
			}) : null
		]
	});
}
function TipCard({ tip, id, anchor, onEnter, onLeave }) {
	const cardRef = (0, import_react.useRef)(null);
	const [box, setBox] = (0, import_react.useState)({
		top: 8,
		left: 8,
		width: 320
	});
	(0, import_react.useEffect)(() => {
		function place() {
			const rect = anchor?.getBoundingClientRect();
			const width = Math.min(352, window.innerWidth - 16);
			let left = rect ? rect.left : 8;
			left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
			const cardHeight = cardRef.current?.offsetHeight ?? 280;
			let top = rect ? rect.bottom + 6 : 8;
			if (top + cardHeight > window.innerHeight - 8) {
				const above = (rect?.top ?? 0) - cardHeight - 6;
				top = above > 8 ? above : Math.max(8, window.innerHeight - cardHeight - 8);
			}
			setBox({
				top,
				left,
				width
			});
		}
		place();
		window.addEventListener("resize", place);
		window.addEventListener("scroll", place, true);
		return () => {
			window.removeEventListener("resize", place);
			window.removeEventListener("scroll", place, true);
		};
	}, [anchor, tip.title]);
	const sources = tip.sourceIds.map((sourceId) => sourceById(sourceId)).filter((source) => source != null);
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: cardRef,
		id,
		role: "tooltip",
		style: {
			top: box.top,
			left: box.left,
			width: box.width
		},
		className: "fixed z-50 max-h-[70dvh] overflow-y-auto rounded-lg border border-line bg-surface p-3 text-left shadow-none",
		onMouseEnter: onEnter,
		onMouseLeave: onLeave,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl leading-none text-fg",
				children: tip.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-pretty text-fg",
				children: tip.definition
			}),
			tip.words.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-3 grid gap-2",
				children: tip.words.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-sm text-accent",
					children: item.word
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-sm text-pretty text-muted",
					children: item.meaning
				})] }, item.word))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs tracking-wide text-muted uppercase",
				children: "Calculation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-pretty text-fg",
				children: tip.calculation
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs tracking-wide text-muted uppercase",
				children: "What it is not"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-pretty text-muted",
				children: tip.notThis
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs tracking-wide text-muted uppercase",
				children: "Why these sources"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-pretty text-muted",
				children: tip.why
			}),
			tip.alsoCited && tip.alsoCited.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-muted uppercase",
						children: "Also cited, not used for the map"
					}),
					tip.journals ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty text-muted",
						children: tip.journals
					}) : null,
					tip.alsoCited.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-pretty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-fg",
							children: [item.name, ". "]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: item.note
						})]
					}, item.name))
				]
			}) : null,
			tip.forum ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-muted uppercase",
					children: "Where this is discussed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-pretty text-muted",
					children: tip.forum
				})]
			}) : null,
			sources.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-2 border-t border-line pt-2",
				children: sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-pretty text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: source.status === "loaded" ? "Loaded. " : source.status === "reference" ? "Reference, not imported. " : source.status === "live" ? "Fetched live. Not used to color the map. " : "Considered, not used. "
						}),
						source.name,
						". ",
						source.publisher,
						". ",
						source.series,
						". ",
						source.published,
						" ",
						source.why,
						" ",
						source.notUsedBecause ?? "",
						" ",
						source.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-accent underline",
							href: source.url,
							target: "_blank",
							rel: "noreferrer",
							children: source.url.replace(/^https?:\/\//, "")
						}) : null
					]
				}, source.id))
			}) : null
		]
	}), document.body);
}
function AtlasMap({ features, failed, colors, selectedIso, selectedRegionId, regions, regionFill, caption, lens, onSelectCountry, onSelectRegion, onClear }) {
	const boxRef = (0, import_react.useRef)(null);
	const svgRef = (0, import_react.useRef)(null);
	const gRef = (0, import_react.useRef)(null);
	const zoomRef = (0, import_react.useRef)(null);
	const kRef = (0, import_react.useRef)(1);
	const [size, setSize] = (0, import_react.useState)({
		w: 0,
		h: 0
	});
	const [hover, setHover] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const el = boxRef.current;
		if (!el) return;
		const watch = new ResizeObserver(() => {
			const rect = el.getBoundingClientRect();
			setSize({
				w: Math.max(0, Math.round(rect.width)),
				h: Math.max(0, Math.round(rect.height))
			});
		});
		watch.observe(el);
		return () => watch.disconnect();
	}, []);
	const geo = (0, import_react.useMemo)(() => {
		if (!features || size.w < 40 || size.h < 40) return null;
		const projection = naturalEarth1_default();
		projection.fitExtent([[14, 14], [size.w - 14, size.h - 14]], {
			type: "Polygon",
			coordinates: [[
				[-168, -50],
				[178, -50],
				[178, 76],
				[-168, 76],
				[-168, -50]
			]]
		});
		const path = path_default(projection);
		const countries = features.map((feature) => ({
			iso: feature.properties.iso,
			name: feature.properties.name,
			d: path(feature) ?? ""
		})).filter((country) => country.d);
		return {
			path,
			sphere: path({ type: "Sphere" }) ?? "",
			countries
		};
	}, [
		features,
		size.w,
		size.h
	]);
	const regionPaths = (0, import_react.useMemo)(() => {
		if (!geo) return [];
		return regions.map((region) => {
			const feature = {
				type: "Feature",
				properties: {},
				geometry: {
					type: "Polygon",
					coordinates: [circleRing(region.lon, region.lat, region.km)]
				}
			};
			const d = geo.path(feature) ?? "";
			const center = geo.path.centroid(feature);
			return {
				region,
				d,
				x: center[0],
				y: center[1]
			};
		}).filter((row) => row.d && Number.isFinite(row.x) && Number.isFinite(row.y));
	}, [geo, regions]);
	(0, import_react.useEffect)(() => {
		const svg = svgRef.current;
		if (!svg || !geo) return;
		const behavior = zoom_default().scaleExtent([1, 12]).on("zoom", (event) => {
			kRef.current = event.transform.k;
			gRef.current?.setAttribute("transform", event.transform.toString());
			gRef.current?.querySelectorAll("[data-label]").forEach((node) => {
				node.setAttribute("transform", `scale(${1 / event.transform.k})`);
			});
		});
		zoomRef.current = behavior;
		const root = select_default(svg);
		root.call(behavior);
		root.on("dblclick.zoom", null);
		return () => {
			root.on(".zoom", null);
		};
	}, [geo]);
	(0, import_react.useEffect)(() => {
		const svg = svgRef.current;
		const behavior = zoomRef.current;
		if (!svg || !behavior || !geo) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const root = select_default(svg);
		if (!selectedIso) {
			root.transition().duration(reduced ? 0 : 650).call(behavior.transform, identity);
			return;
		}
		let bounds = null;
		let maxScale = 8;
		if (selectedRegionId) {
			const hit = regionPaths.find((row) => row.region.id === selectedRegionId);
			if (hit) {
				const feature = {
					type: "Feature",
					properties: {},
					geometry: {
						type: "Polygon",
						coordinates: [circleRing(hit.region.lon, hit.region.lat, hit.region.km)]
					}
				};
				bounds = geo.path.bounds(feature);
				maxScale = 10;
			}
		}
		if (!bounds) {
			const place = PLACE_BY[selectedIso];
			if (!place) return;
			const [x0, y0, x1, y1] = focusBBox(place);
			bounds = geo.path.bounds({
				type: "Polygon",
				coordinates: [[
					[x0, y0],
					[x1, y0],
					[x1, y1],
					[x0, y1],
					[x0, y0]
				]]
			});
		}
		if (!bounds) return;
		const [[left, top], [right, bottom]] = bounds;
		const dx = Math.max(16, right - left);
		const dy = Math.max(16, bottom - top);
		const scale = Math.max(1, Math.min(maxScale, .76 / Math.max(dx / size.w, dy / size.h)));
		const tx = size.w / 2 - scale * (left + right) / 2;
		const ty = size.h / 2 - scale * (top + bottom) / 2;
		root.transition().duration(reduced ? 0 : 700).call(behavior.transform, identity.translate(tx, ty).scale(scale));
	}, [
		geo,
		selectedIso,
		selectedRegionId,
		regionPaths,
		size.w,
		size.h
	]);
	(0, import_react.useLayoutEffect)(() => {
		const k = kRef.current || 1;
		gRef.current?.querySelectorAll("[data-label]").forEach((node) => {
			node.setAttribute("transform", `scale(${1 / k})`);
		});
	});
	const hoverName = hover ? PLACE_BY[hover]?.name : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: boxRef,
		className: "absolute inset-0 bg-water",
		children: [
			geo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				ref: svgRef,
				className: "h-full w-full touch-none",
				role: "img",
				"aria-label": "World map. Choose a territory to open its regions.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					ref: gRef,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: geo.sphere,
							fill: "var(--color-water)",
							stroke: "var(--color-line)",
							strokeWidth: 1,
							vectorEffect: "non-scaling-stroke"
						}),
						geo.countries.map((country) => {
							const paint = colors[country.iso];
							const active = country.iso === selectedIso || country.iso === hover;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: country.d,
								fill: paint?.fill ?? "var(--color-surface)",
								fillOpacity: paint?.opacity ?? .35,
								stroke: active ? "var(--color-accent)" : "var(--color-bg)",
								strokeWidth: country.iso === selectedIso ? 1.8 : .7,
								vectorEffect: "non-scaling-stroke",
								className: "cursor-pointer",
								onMouseEnter: () => setHover(country.iso),
								onMouseLeave: () => setHover((current) => current === country.iso ? null : current),
								onClick: () => onSelectCountry(country.iso),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: country.name })
							}, country.iso);
						}),
						regionPaths.map(({ region, d, x, y }) => {
							const selected = region.id === selectedRegionId;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d,
								fill: regionFill[region.id] ?? "transparent",
								fillOpacity: selected ? .72 : .28,
								stroke: selected ? "var(--color-accent)" : "var(--color-fg)",
								strokeWidth: selected ? 2 : 1.1,
								vectorEffect: "non-scaling-stroke",
								className: "cursor-pointer",
								onClick: (event) => {
									event.stopPropagation();
									onSelectRegion(region.id);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: region.name })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
								transform: `translate(${x}, ${y})`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
									"data-label": true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										textAnchor: "middle",
										className: "pointer-events-none fill-fg font-sans text-xs",
										stroke: "var(--color-bg)",
										strokeWidth: 3.5,
										paintOrder: "stroke",
										children: region.name
									})
								})
							})] }, region.id);
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full items-center justify-center px-6 text-center text-sm text-muted",
				children: failed ? "Coastlines didn't load. Filters and rankings still work." : "Drawing coastlines…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto max-w-xs rounded-lg bg-bg/90 px-3 py-2 text-sm text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("map"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-pretty",
							children: caption
						})
					}), hoverName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: hoverName
					}) : null]
				}), selectedIso ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClear,
					className: "pointer-events-auto min-h-11 rounded-lg bg-surface px-3 text-sm text-fg",
					children: "World view"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto absolute bottom-3 left-3 max-w-64 rounded-lg bg-surface px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 rounded-full",
						style: { background: lens === "level" ? "linear-gradient(90deg, var(--color-ramp-low), var(--color-ramp-mid), var(--color-accent))" : "linear-gradient(90deg, var(--color-ramp-neg), var(--color-flat), var(--color-accent))" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("legend"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: lens === "level" ? "Low reading to high" : "Fell, then rose"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("map"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Boundaries · Natural Earth"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-3 bottom-3 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("zoom"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Zoom"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Zoom in",
						className: "grid h-11 w-11 place-items-center rounded-lg bg-surface text-fg",
						onClick: () => scaleBy(svgRef.current, zoomRef.current, 1.35),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Zoom out",
						className: "grid h-11 w-11 place-items-center rounded-lg bg-surface text-fg",
						onClick: () => scaleBy(svgRef.current, zoomRef.current, 1 / 1.35),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-5" })
					})
				]
			})
		]
	});
}
function scaleBy(svg, behavior, factor) {
	if (!svg || !behavior) return;
	select_default(svg).transition().duration(180).call(behavior.scaleBy, factor);
}
function Ledger({ added, onAdd, onRemove, onClose }) {
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-end justify-center bg-bg/80 sm:items-center",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "ledger-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scroll-thin flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-y-auto rounded-t-lg border border-line bg-bg p-4 sm:rounded-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "One page · method"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "ledger-title",
						className: "font-serif text-4xl leading-none",
						children: "Sources and method"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "min-h-11 rounded-lg bg-surface px-3 text-sm",
						children: "Close"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-pretty text-muted",
					children: UI.ledger.definition
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
							label: "Metrics defined",
							value: LEDGER_COUNTS.metrics
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
							label: "Sources named",
							value: LEDGER_COUNTS.sourcesNamed
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
							label: "Loaded into the page",
							value: LEDGER_COUNTS.loadedSources
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
							label: "References, not imported",
							value: LEDGER_COUNTS.referenceSources
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
							label: "Rejected",
							value: LEDGER_COUNTS.rejectedSources
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
							label: "Searches logged",
							value: LEDGER_COUNTS.searchesLogged
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
							label: "Country anchors",
							value: LEDGER_COUNTS.countryAnchors
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
							label: "Economies with macro pins",
							value: LEDGER_COUNTS.pinnedEconomies
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm text-muted",
							children: "What is actually loaded"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-pretty",
							children: [LEDGER_COUNTS.loadedFiles, " files decide the map. Moving a slider does not call a database. The briefing's live panel does call Google Trends, Google News, Wikipedia, the World Bank, and Hacker News, and it leaves Semrush and Ahrefs blank unless a key is present. Those responses are not written back into the anchors."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2",
							children: LOADED_FILES.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-pretty text-muted",
								children: line
							}, line))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-pretty text-muted",
							children: [
								"About ",
								LEDGER_COUNTS.countryAnchors,
								" countries override their subregional median (",
								LEDGER_COUNTS.subregionalMedians,
								" medians). Everyone else inherits the median on purpose. Macro pins cover ",
								LEDGER_COUNTS.pinnedEconomies,
								" economies for selected years only. 2026 pins are a nowcast written into the model. They are not a row-level copy of the IMF World Economic Outlook published 12–13 October 2026."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm text-muted",
							children: "How the page was checked, and what was never searched"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-pretty",
							children: [
								"The searches below were run on 19 October 2026 to pin citations for this ledger. They are not a claim that each anchor was copied out of that search. ",
								LEDGER_COUNTS.notSearchedNotes,
								" gaps are listed so a paper count is not invented."
							]
						}),
						SEARCHES.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "grid gap-1 border-t border-line pt-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-accent",
									children: [
										hit.when,
										" · ",
										hit.engine
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: hit.query
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-pretty text-muted",
									children: ["Opened: ", hit.opened]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-pretty text-muted",
									children: ["Kept: ", hit.kept]
								})
							]
						}, hit.query)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2",
							children: NOT_SEARCHED.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-pretty text-muted",
								children: line
							}, line))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm text-muted",
						children: "Every named source, and why it won or lost"
					}), SOURCES.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "grid gap-1 border-t border-line pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-accent",
								children: source.status === "loaded" ? "Loaded" : source.status === "reference" ? "Reference, not imported" : source.status === "live" ? "Live, not in the map" : "Rejected"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-base",
								children: source.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-pretty text-muted",
								children: [
									source.publisher,
									". ",
									source.series,
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-pretty text-muted",
								children: source.published
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-pretty",
								children: source.why
							}),
							source.notUsedBecause ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-pretty text-muted",
								children: source.notUsedBecause
							}) : null,
							source.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-sm text-accent underline",
								href: source.url,
								target: "_blank",
								rel: "noreferrer",
								children: source.url
							}) : null
						]
					}, source.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm text-muted",
						children: "Every metric, in one place"
					}), METRICS.map((metric) => {
						const tip = metricTip(metric);
						const cites = tip.sourceIds.map((id) => sourceById(id)?.name ?? id).join("; ");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "grid gap-1 border-t border-line pt-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-accent",
									children: metric.group
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-base",
									children: metric.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-pretty",
									children: tip.definition
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-pretty text-muted",
									children: tip.calculation
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-pretty text-muted",
									children: tip.notThis
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-pretty text-muted",
									children: [
										"Sources: ",
										cites,
										"."
									]
								})
							]
						}, metric.id);
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddForm, {
					added,
					onAdd,
					onRemove
				})
			]
		})
	});
}
function Count({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface px-2 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-2xl leading-none tabular-nums",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-pretty text-muted",
			children: label
		})]
	});
}
function AddForm({ added, onAdd, onRemove }) {
	const [label, setLabel] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("news");
	const [definition, setDefinition] = (0, import_react.useState)("");
	const [calculation, setCalculation] = (0, import_react.useState)("");
	const [sourceName, setSourceName] = (0, import_react.useState)("");
	const [sourceUrl, setSourceUrl] = (0, import_react.useState)("");
	const [published, setPublished] = (0, import_react.useState)("");
	const [why, setWhy] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [baseId, setBaseId] = (0, import_react.useState)("lwi");
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 grid gap-3 border-t border-line pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm text-muted",
				children: "Add a news or data type"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-pretty text-muted",
				children: "This stays on one page. The new type is saved in this browser and copied into a share link. The map paints a stand-in metric you choose, and the briefing says so. The page does not fetch the URL. That would pretend a series exists before it is wired."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: label,
					onChange: (event) => setLabel(event.target.value),
					className: "h-11 rounded-lg border border-line bg-surface px-3",
					placeholder: "Port calls, or local rent filings"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Kind", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: kind,
					onChange: (event) => setKind(event.target.value),
					className: "h-11 rounded-lg border border-line bg-surface px-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "news",
							children: "News type"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "statistic",
							children: "Statistic"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "index",
							children: "Index"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Definition, including the words in the name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: definition,
					onChange: (event) => setDefinition(event.target.value),
					className: "min-h-20 rounded-lg border border-line bg-surface px-3 py-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["How it should be calculated, once a series exists", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: calculation,
					onChange: (event) => setCalculation(event.target.value),
					className: "min-h-16 rounded-lg border border-line bg-surface px-3 py-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Source", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: sourceName,
					onChange: (event) => setSourceName(event.target.value),
					className: "h-11 rounded-lg border border-line bg-surface px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Source URL", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: sourceUrl,
					onChange: (event) => setSourceUrl(event.target.value),
					className: "h-11 rounded-lg border border-line bg-surface px-3",
					placeholder: "https://"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Date published", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: published,
					onChange: (event) => setPublished(event.target.value),
					className: "h-11 rounded-lg border border-line bg-surface px-3",
					placeholder: "13 October 2026"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Why this source, and what you rejected", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: why,
					onChange: (event) => setWhy(event.target.value),
					className: "min-h-16 rounded-lg border border-line bg-surface px-3 py-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Query, engine, and what you opened", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: query,
					onChange: (event) => setQuery(event.target.value),
					className: "min-h-16 rounded-lg border border-line bg-surface px-3 py-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Stand-in already on the map", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: baseId,
					onChange: (event) => setBaseId(event.target.value),
					className: "h-11 rounded-lg border border-line bg-surface px-3",
					children: METRICS.map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: metric.id,
						children: [
							metric.group,
							" · ",
							metric.label
						]
					}, metric.id))
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-accent",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 rounded-lg bg-accent px-3 text-sm text-accent-ink",
				onClick: () => {
					const name = label.trim();
					if (name.length < 2) {
						setError("Name the type.");
						return;
					}
					if (!definition.trim() || !sourceName.trim() || !why.trim()) {
						setError("Definition, source, and why are required. A type without those is how fake precision starts.");
						return;
					}
					setError("");
					onAdd({
						id: `${Date.now().toString(36)}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 18)}`,
						label: name,
						kind,
						definition: definition.trim(),
						calculation: calculation.trim(),
						sourceName: sourceName.trim(),
						sourceUrl: sourceUrl.trim(),
						published: published.trim(),
						why: why.trim(),
						query: query.trim(),
						baseId
					});
					setLabel("");
					setDefinition("");
					setCalculation("");
					setSourceName("");
					setSourceUrl("");
					setPublished("");
					setWhy("");
					setQuery("");
				},
				children: "Add this type to the page"
			}),
			added.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2",
				children: added.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: row.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 shrink-0 text-muted",
						onClick: () => onRemove(row.id),
						children: "Remove"
					})]
				}, row.id))
			}) : null
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function clipKey(value) {
	return typeof value === "string" ? value.trim().slice(0, 200) : "";
}
var getLiveSignals = createServerFn({ method: "POST" }).validator((data) => {
	if (!data || typeof data.metricId !== "string" || typeof data.metricLabel !== "string") throw new Error("Metric is required");
	return {
		iso3: typeof data.iso3 === "string" ? data.iso3.slice(0, 8) : "",
		placeName: typeof data.placeName === "string" ? data.placeName.slice(0, 80) : "",
		metricId: data.metricId.slice(0, 40),
		metricLabel: data.metricLabel.slice(0, 80),
		semrushKey: clipKey(data.semrushKey),
		ahrefsKey: clipKey(data.ahrefsKey)
	};
}).handler(createSsrRpc("62e89519cd25b20c9616d37d1f53af5ff99bec1b14050fd581aacb1e9de847c7"));
var STROKES = [
	"var(--color-accent)",
	"var(--color-fg)",
	"var(--color-muted)",
	"var(--color-ramp-mid)"
];
function LiveFeeds({ iso3, placeName, metricId, metricLabel }) {
	const [bundle, setBundle] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(true);
	const [semrushKey, setSemrushKey] = (0, import_react.useState)("");
	const [ahrefsKey, setAhrefsKey] = (0, import_react.useState)("");
	const [keysReady, setKeysReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSemrushKey(localStorage.getItem("meridian.semrush") ?? "");
		setAhrefsKey(localStorage.getItem("meridian.ahrefs") ?? "");
		setKeysReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!keysReady) return;
		let cancel = false;
		setPending(true);
		setError("");
		getLiveSignals({ data: {
			iso3,
			placeName,
			metricId,
			metricLabel,
			semrushKey,
			ahrefsKey
		} }).then((next) => {
			if (!cancel) setBundle(next);
		}).catch((reason) => {
			if (!cancel) setError(reason instanceof Error ? reason.message : "The live feeds did not return.");
		}).finally(() => {
			if (!cancel) setPending(false);
		});
		return () => {
			cancel = true;
		};
	}, [
		iso3,
		placeName,
		metricId,
		metricLabel,
		keysReady,
		semrushKey,
		ahrefsKey
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-3 border-t border-line pt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
			tip: uiTip("live"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm text-muted",
				children: "Live search and attention"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-pretty text-muted",
			children: pending ? "Fetching the public feeds." : error ? error : bundle ? `Fetched ${bundle.fetchedAt.slice(0, 16).replace("T", " ")} UTC. Not blended into the map.` : ""
		})] }), bundle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BundleView, {
			bundle,
			semrushKey,
			ahrefsKey,
			onSemrush: setSemrushKey,
			onAhrefs: setAhrefsKey
		}) : null]
	});
}
function BundleView({ bundle, semrushKey, ahrefsKey, onSemrush, onAhrefs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm",
						children: "Google Trends, 12 months"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty text-muted",
						children: bundle.interest.note
					}),
					bundle.interest.points.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InterestChart, {
						terms: bundle.interest.terms,
						points: bundle.interest.points
					}) : null,
					bundle.interest.related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-1",
						children: bundle.interest.related.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								row.query,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: ["· ", row.term]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 tabular-nums text-muted",
								children: [
									row.kind === "rising" ? "rising" : "top",
									" ",
									row.value
								]
							})]
						}, `${row.term}-${row.kind}-${row.query}`))
					}) : bundle.interest.state === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Related queries were not returned. The 12-month index above is still the series Google sent. Nothing was filled in."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm",
						children: "Trending today"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty text-muted",
						children: bundle.googleTrends.geoNote
					}),
					bundle.googleTrends.state === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							bundle.googleTrends.aiMatches,
							" of ",
							bundle.googleTrends.items.length,
							" trending searches match AI terms or this metric."
						]
					}) : null,
					bundle.googleTrends.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: item.matches ? "text-fg" : "text-muted",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 tabular-nums text-muted",
							children: item.traffic || "—"
						})]
					}, item.title))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm",
						children: "Semrush and Ahrefs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vendor, {
						vendor: bundle.semrush,
						storageKey: "meridian.semrush",
						saved: semrushKey,
						onSave: onSemrush
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vendor, {
						vendor: bundle.ahrefs,
						storageKey: "meridian.ahrefs",
						saved: ahrefsKey,
						onSave: onAhrefs
					})
				]
			}),
			bundle.attention.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm",
						children: "Term frequency"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty text-muted",
						children: bundle.attentionNote
					}),
					bundle.attention.map((series) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: series.term }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 tabular-nums text-muted",
							children: [
								formatCount(series.last),
								series.mom != null ? ` · ${signedPct(series.mom)} mo` : "",
								series.yoy != null ? ` · ${signedPct(series.yoy)} yr` : ""
							]
						})]
					}, series.term)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttentionChart, { series: bundle.attention })
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Wikipedia pageviews did not return a series for these terms."
			}),
			bundle.official.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm",
						children: "Live official rows"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty text-muted",
						children: bundle.officialNote
					}),
					bundle.official.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 tabular-nums text-muted",
							children: [
								row.unit === "USD" ? `$${Math.round(row.value ?? 0).toLocaleString("en-US")}` : `${(row.value ?? 0).toFixed(1)}%`,
								" · ",
								row.date
							]
						})]
					}, row.label))
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-pretty text-muted",
				children: bundle.officialNote
			}),
			bundle.news.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm",
					children: "News, last 7 days"
				}), bundle.news.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: item.url,
					target: "_blank",
					rel: "noreferrer",
					className: "text-sm text-pretty",
					children: [
						item.title,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: item.source
						})
					]
				}, item.title))]
			}) : null,
			bundle.hackerNews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm",
					children: "Hacker News"
				}), bundle.hackerNews.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: item.url,
					target: "_blank",
					rel: "noreferrer",
					className: "text-sm text-pretty",
					children: [
						item.title,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								item.points,
								" points · ",
								item.comments,
								" comments"
							]
						})
					]
				}, item.title))]
			}) : null
		]
	});
}
function Vendor({ vendor, storageKey, saved, onSave }) {
	const [draft, setDraft] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: vendor.vendor
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-pretty text-muted",
				children: vendor.detail
			}),
			vendor.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm tabular-nums",
				children: [
					row.phrase,
					": ",
					row.volume || "—",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: row.extra
					})
				]
			}, row.phrase)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-1 flex items-center gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					const next = draft.trim();
					if (next.length < 8) return;
					localStorage.setItem(storageKey, next);
					setDraft("");
					onSave(next);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: draft,
						onChange: (event) => setDraft(event.target.value),
						autoComplete: "off",
						placeholder: saved ? "Key saved in this browser" : `${vendor.vendor} API key`,
						className: "h-11 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 shrink-0 rounded-lg bg-surface px-3 text-sm",
						children: "Save"
					}),
					saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 shrink-0 rounded-lg px-2 text-sm text-muted",
						onClick: () => {
							localStorage.removeItem(storageKey);
							onSave("");
						},
						children: "Clear"
					}) : null
				]
			})
		]
	});
}
function InterestChart({ terms, points }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	const data = points.map((point) => {
		const row = { label: point.label };
		point.values.forEach((value, index) => {
			row[`s${index}`] = value;
		});
		return row;
	});
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-24 w-full min-w-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
					data,
					margin: {
						top: 8,
						right: 4,
						left: 0,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "label",
							tick: {
								fill: "var(--color-muted)",
								fontSize: 11
							},
							axisLine: false,
							tickLine: false,
							interval: 8
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							hide: true,
							domain: [0, 100]
						}),
						terms.map((term, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							type: "monotone",
							dataKey: `s${index}`,
							stroke: STROKES[index % STROKES.length],
							strokeWidth: 2,
							dot: false,
							isAnimationActive: false
						}, term))
					]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-pretty text-muted",
			children: ["0–100 interest. ", terms.join(" · ")]
		})]
	});
}
function AttentionChart({ series }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	const data = (series[0]?.points.map((point) => point.month) ?? []).map((month, index) => {
		const row = { month: month.slice(2) };
		series.forEach((item, seriesIndex) => {
			const base = item.points[0]?.views || 1;
			const views = item.points[index]?.views;
			if (views != null) row[`s${seriesIndex}`] = Math.round(views / base * 100);
		});
		return row;
	});
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-24 w-full min-w-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
					data,
					margin: {
						top: 8,
						right: 4,
						left: 0,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "month",
							tick: {
								fill: "var(--color-muted)",
								fontSize: 11
							},
							axisLine: false,
							tickLine: false,
							interval: 5
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							hide: true,
							domain: ["auto", "auto"]
						}),
						series.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							type: "monotone",
							dataKey: `s${index}`,
							stroke: STROKES[index % STROKES.length],
							strokeWidth: 2,
							dot: false,
							isAnimationActive: false
						}, item.term))
					]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-pretty text-muted",
			children: ["Index, 100 = first month. ", series.map((item) => item.term).join(" · ")]
		})]
	});
}
function formatCount(value) {
	if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M views`;
	if (value >= 1e3) return `${Math.round(value / 1e3)}k views`;
	return `${value} views`;
}
function signedPct(value) {
	const pct = Math.round(value * 100);
	return `${pct > 0 ? "+" : ""}${pct}%`;
}
function FieldGuide({ metricId, group }) {
	const [all, setAll] = (0, import_react.useState)(false);
	const journals = JOURNAL_HOMES[group];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-3 border-t border-line pt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
					tip: uiTip("field"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm text-muted",
						children: "Field guide"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-pretty text-muted",
					children: [
						"42 people, 42 institutions, 42 conferences. ",
						all ? "Showing the full shelf." : `Showing who is tagged to ${group}.`,
						" Shelf order is not a citation rank. No Scopus count was run."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 text-left text-sm text-accent",
					onClick: () => setAll((value) => !value),
					children: all ? `Show only ${group}` : "Show all 42 of each"
				})
			] }),
			journals ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-pretty text-muted",
				children: journals
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShelfList, {
				title: "People",
				rows: PEOPLE,
				group,
				metricId,
				all
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShelfList, {
				title: "Institutions",
				rows: INSTITUTIONS,
				group,
				metricId,
				all
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShelfList, {
				title: "Conferences",
				rows: CONFERENCES,
				group,
				metricId,
				all
			})
		]
	});
}
function ShelfList({ title, rows, group, metricId, all }) {
	const tagged = rows.filter((row) => relates(row, group, metricId));
	const shown = rows.map((row, index) => ({
		row,
		index
	})).filter(({ row }) => all || relates(row, group, metricId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "text-sm",
			children: [
				title,
				" · ",
				tagged.length,
				" of ",
				rows.length,
				" tagged"
			]
		}), shown.map(({ row, index }) => {
			const on = relates(row, group, metricId);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "grid gap-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: on ? "text-sm" : "text-sm text-muted",
					children: [
						index + 1,
						". ",
						row.name
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-pretty text-muted",
					children: [
						row.home,
						". ",
						row.note
					]
				})]
			}, row.name);
		})]
	});
}
var EMPTY_REGIONS = [];
var POP_OPTIONS = [
	{
		value: 0,
		label: "All territories"
	},
	{
		value: 1e6,
		label: "1 million and up"
	},
	{
		value: 1e7,
		label: "10 million and up"
	}
];
function formatPop(pop) {
	if (pop >= 1e9) return `${(pop / 1e9).toFixed(2)}B`;
	if (pop >= 1e6) return `${(pop / 1e6).toFixed(1)}M`;
	if (pop >= 1e3) return `${Math.round(pop / 1e3)}k`;
	return String(pop);
}
function scopeLabel(scope) {
	return scope === "world" ? "World" : scope.slice(2);
}
function matchesScope(place, scope) {
	if (scope === "world") return true;
	if (scope.startsWith("c:")) return place.continent === scope.slice(2);
	if (scope.startsWith("s:")) return place.subregion === scope.slice(2);
	return true;
}
function viewScore(iso, year, metricId, weights, lens, region) {
	const raw = rawAt(iso, year, region);
	if (!raw) return NaN;
	const now = blendedLevel(raw, year > 2016 ? rawAt(iso, year - 1, region) : null, metricId, weights);
	if (lens === "level") return now;
	const base = lens === "since2019" ? 2019 : year - 1;
	if (base < 2016 || base === year) return 0;
	const baseRaw = rawAt(iso, base, region);
	if (!baseRaw) return 0;
	return now - blendedLevel(baseRaw, base > 2016 ? rawAt(iso, base - 1, region) : null, metricId, weights);
}
function weightedScore(places, year, metricId, weights, lens) {
	let weight = 0;
	let total = 0;
	for (const place of places) {
		if (isThin(place) || place.pop <= 0) continue;
		const score = viewScore(place.iso, year, metricId, weights, lens);
		if (!Number.isFinite(score)) continue;
		total += score * place.pop;
		weight += place.pop;
	}
	return weight > 0 ? total / weight : NaN;
}
function signed(value, digits = 1) {
	const text = value.toFixed(digits);
	return `${value > 0 ? "+" : ""}${text}`;
}
function MeridianApp() {
	const year = useAtlas((state) => state.year);
	const metricId = useAtlas((state) => state.metricId);
	const lens = useAtlas((state) => state.lens);
	const weights = useAtlas((state) => state.weights);
	const popMin = useAtlas((state) => state.popMin);
	const scope = useAtlas((state) => state.scope);
	const iso = useAtlas((state) => state.iso);
	const regionId = useAtlas((state) => state.regionId);
	const playing = useAtlas((state) => state.playing);
	const setYear = useAtlas((state) => state.setYear);
	const setPlaying = useAtlas((state) => state.setPlaying);
	const selectCountry = useAtlas((state) => state.selectCountry);
	const selectRegion = useAtlas((state) => state.selectRegion);
	const [features, setFeatures] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [pane, setPane] = (0, import_react.useState)("briefing");
	const [added, setAdded] = (0, import_react.useState)([]);
	const [ledgerOpen, setLedgerOpen] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [shareFallback, setShareFallback] = (0, import_react.useState)("");
	const [urlReady, setUrlReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
		const controller = new AbortController();
		fetch(`${prefix}/geo/countries.json`, { signal: controller.signal }).then((response) => {
			if (!response.ok) throw new Error("missing coastlines");
			return response.json();
		}).then((data) => setFeatures(data.features)).catch((error) => {
			if (error instanceof DOMException && error.name === "AbortError") return;
			setFailed(true);
		});
		return () => controller.abort();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const timer = window.setInterval(() => {
			const current = useAtlas.getState().year;
			useAtlas.getState().setYear(current >= 2026 ? YEAR_MIN : current + 1);
		}, 900);
		return () => window.clearInterval(timer);
	}, [playing]);
	(0, import_react.useEffect)(() => {
		const params = new URLSearchParams(window.location.search);
		const patch = {};
		const nextYear = Number(params.get("y"));
		if (nextYear >= 2016 && nextYear <= 2026) patch.year = nextYear;
		const nextMetric = params.get("m");
		if (nextMetric) patch.metricId = nextMetric;
		const nextLens = params.get("lens");
		if (nextLens === "level" || nextLens === "delta" || nextLens === "since2019") patch.lens = nextLens;
		const nextScope = params.get("scope");
		if (nextScope) patch.scope = nextScope;
		if (params.has("iso")) patch.iso = params.get("iso") || null;
		if (params.has("rid")) patch.regionId = params.get("rid") || null;
		const nextPop = Number(params.get("pop"));
		if (params.has("pop") && Number.isFinite(nextPop)) patch.popMin = nextPop;
		const wo = Number(params.get("wo"));
		const ws = Number(params.get("ws"));
		const wn = Number(params.get("wn"));
		if (params.has("wo") && params.has("ws") && params.has("wn") && [
			wo,
			ws,
			wn
		].every((value) => Number.isFinite(value))) patch.weights = {
			official: wo,
			social: ws,
			news: wn
		};
		if (Object.keys(patch).length > 0) useAtlas.setState(patch);
		const stored = loadAdded();
		const fromLink = params.get("layer") ? unpackAdded(params.get("layer") ?? "") : null;
		const merged = fromLink && !stored.some((row) => row.id === fromLink.id) ? [...stored, fromLink] : stored;
		setAdded(merged);
		if (fromLink) saveAdded(merged);
		setUrlReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!urlReady) return;
		const params = new URLSearchParams();
		params.set("y", String(year));
		params.set("m", metricId);
		params.set("lens", lens);
		params.set("scope", scope);
		params.set("pop", String(popMin));
		params.set("wo", String(weights.official));
		params.set("ws", String(weights.social));
		params.set("wn", String(weights.news));
		if (iso) params.set("iso", iso);
		if (regionId) params.set("rid", regionId);
		const shared = added.find((row) => metricId === `add:${row.id}`);
		if (shared) params.set("layer", packAdded(shared));
		const next = `${window.location.pathname}?${params.toString()}`;
		if (`${window.location.pathname}${window.location.search}` !== next) window.history.replaceState(null, "", next);
	}, [
		urlReady,
		year,
		metricId,
		lens,
		weights,
		popMin,
		scope,
		iso,
		regionId,
		added
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement) return;
			if (event.key === "ArrowRight") setYear(Math.min(YEAR_MAX, useAtlas.getState().year + 1));
			if (event.key === "ArrowLeft") setYear(Math.max(YEAR_MIN, useAtlas.getState().year - 1));
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [setYear]);
	const addedRow = added.find((row) => metricId === `add:${row.id}`) ?? null;
	const scoreMetricId = addedRow?.baseId ?? metricId;
	const metric = metricById(scoreMetricId);
	const region = regionId ? regionById(regionId) : void 0;
	const place = iso ? PLACE_BY[iso] : void 0;
	const colors = (0, import_react.useMemo)(() => {
		const paint = {};
		for (const country of PLACES) {
			const score = viewScore(country.iso, year, scoreMetricId, weights, lens);
			const inside = matchesScope(country, scope);
			if (isThin(country)) {
				paint[country.iso] = {
					fill: DIM,
					opacity: inside ? .9 : .2
				};
				continue;
			}
			let opacity = .94;
			if (!inside) opacity = .12;
			else if (popMin > 0 && country.pop < popMin) opacity = .38;
			paint[country.iso] = {
				fill: colorFor(score, lens),
				opacity
			};
		}
		return paint;
	}, [
		year,
		scoreMetricId,
		weights,
		lens,
		scope,
		popMin
	]);
	const activeRegions = place ? regionsFor(place.iso) : EMPTY_REGIONS;
	const regionFill = (0, import_react.useMemo)(() => {
		const fill = {};
		for (const item of activeRegions) fill[item.id] = colorFor(viewScore(item.iso, year, scoreMetricId, weights, lens, item), lens);
		return fill;
	}, [
		activeRegions,
		year,
		scoreMetricId,
		weights,
		lens
	]);
	const weightSum = weights.official + weights.social + weights.news || 1;
	const blendLabel = `Official ${Math.round(weights.official / weightSum * 100)} · social ${Math.round(weights.social / weightSum * 100)} · news ${Math.round(weights.news / weightSum * 100)}`;
	const lensLabel = lens === "level" ? "level" : lens === "delta" ? "1-year change" : "change since 2019";
	const caption = `${addedRow ? addedRow.label : metric.label} · ${year}${year === 2026 ? " nowcast" : ""} · ${lensLabel}${addedRow ? ` · stand-in ${metric.label}` : ""}`;
	const scoped = placesInScope(scope).filter((item) => matchesScope(item, scope));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "z-20 flex shrink-0 flex-col gap-2 border-b border-line bg-bg px-3 py-2 lg:flex-row lg:items-center lg:gap-5 lg:px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative grid h-8 w-8 place-items-center",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute h-5 w-5 rounded-full border border-fg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 w-1 rounded-full bg-accent" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
							tip: uiTip("brand"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-2xl leading-none",
								children: "Meridian"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "Living, work, and capital"
							})] })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldPill, {
								scope,
								year
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-lg px-2 text-sm text-muted",
								onClick: () => setLedgerOpen(true),
								children: "Sources"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-lg bg-surface px-3 text-sm",
								onClick: () => {
									const params = new URLSearchParams();
									params.set("y", String(year));
									params.set("m", metricId);
									params.set("lens", lens);
									params.set("scope", scope);
									params.set("pop", String(popMin));
									params.set("wo", String(weights.official));
									params.set("ws", String(weights.social));
									params.set("wn", String(weights.news));
									if (iso) params.set("iso", iso);
									if (regionId) params.set("rid", regionId);
									if (addedRow) params.set("layer", packAdded(addedRow));
									const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
									navigator.clipboard.writeText(url).then(() => {
										setShareFallback("");
										setCopied(true);
										window.setTimeout(() => setCopied(false), 1600);
									}, () => setShareFallback(url));
								},
								children: copied ? "Copied" : "Share"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
								tip: uiTip("share"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Share link"
								})
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
							tip: uiTip("play"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": playing ? "Pause the years" : "Play the years",
								"aria-pressed": playing,
								onClick: () => setPlaying(!playing),
								className: "grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-surface text-fg",
								children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
							tip: uiTip("year"),
							className: "min-w-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Year"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: YEAR_MIN,
									max: YEAR_MAX,
									step: 1,
									value: year,
									onChange: (event) => {
										setPlaying(false);
										setYear(Number(event.target.value));
									}
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-14 shrink-0 text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-2xl leading-none tabular-nums",
								children: year
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: year === 2026 ? "Nowcast" : "Year"
							})]
						})
					]
				})]
			}),
			shareFallback ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-b border-line px-3 py-2 text-xs break-all text-muted",
				children: shareFallback
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 border-b border-line lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: clsx("min-h-11 flex-1 text-sm", pane === "filters" ? "text-fg" : "text-muted"),
					onClick: () => setPane("filters"),
					children: "Filters"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: clsx("min-h-11 flex-1 text-sm", pane === "briefing" ? "text-fg" : "text-muted"),
					onClick: () => setPane("briefing"),
					children: "Briefing"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col lg:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: clsx("scroll-thin min-h-0 overflow-y-auto border-line lg:block lg:w-80 lg:flex-none lg:border-r lg:border-t-0", pane === "filters" ? "block flex-1 border-t" : "hidden"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filters, {
							added,
							onOpenLedger: () => setLedgerOpen(true)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative h-[46dvh] shrink-0 lg:h-auto lg:min-h-0 lg:flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasMap, {
							features,
							failed,
							colors,
							selectedIso: iso,
							selectedRegionId: region?.id ?? null,
							regions: activeRegions,
							regionFill,
							caption,
							lens,
							onSelectCountry: (next) => {
								selectCountry(next);
								setPane("briefing");
							},
							onSelectRegion: (id) => {
								selectRegion(id);
								setPane("briefing");
							},
							onClear: () => selectCountry(null)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: clsx("scroll-thin min-h-0 overflow-y-auto border-line lg:block lg:w-96 lg:flex-none lg:border-l lg:border-t-0", pane === "briefing" ? "block flex-1 border-t" : "hidden"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefing, {
							metricId: scoreMetricId,
							alias: addedRow,
							year,
							lens,
							weights,
							scope,
							place,
							region,
							places: scoped,
							popMin,
							blendLabel
						})
					})
				]
			}),
			ledgerOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ledger, {
				added,
				onClose: () => setLedgerOpen(false),
				onAdd: (row) => {
					const next = [...added.filter((item) => item.label !== row.label), row];
					setAdded(next);
					saveAdded(next);
					useAtlas.getState().setMetric(`add:${row.id}`);
					setLedgerOpen(false);
					setPane("briefing");
				},
				onRemove: (id) => {
					const next = added.filter((item) => item.id !== id);
					setAdded(next);
					saveAdded(next);
					if (useAtlas.getState().metricId === `add:${id}`) useAtlas.getState().setMetric("lwi");
				}
			}) : null
		]
	});
}
function WorldPill({ scope, year }) {
	const raw = weightedRaw(placesInScope(scope), year);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
		tip: uiTip("worldLwi"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-right",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [scopeLabel(scope), " LWI"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl leading-none tabular-nums",
				children: raw ? Math.round(raw.lwi) : "—"
			})]
		})
	});
}
function Filters({ added, onOpenLedger }) {
	const metricId = useAtlas((state) => state.metricId);
	const lens = useAtlas((state) => state.lens);
	const weights = useAtlas((state) => state.weights);
	const popMin = useAtlas((state) => state.popMin);
	const scope = useAtlas((state) => state.scope);
	const setMetric = useAtlas((state) => state.setMetric);
	const setLens = useAtlas((state) => state.setLens);
	const setWeight = useAtlas((state) => state.setWeight);
	const setPopMin = useAtlas((state) => state.setPopMin);
	const setScope = useAtlas((state) => state.setScope);
	const openPlace = useAtlas((state) => state.openPlace);
	const [query, setQuery] = (0, import_react.useState)("");
	const [openGroups, setOpenGroups] = (0, import_react.useState)({
		Index: true,
		Living: true,
		Working: true,
		Investing: true
	});
	(0, import_react.useEffect)(() => {
		if (metricId.startsWith("add:")) return;
		const group = metricById(metricId).group;
		setOpenGroups((current) => current[group] ? current : {
			...current,
			[group]: true
		});
	}, [metricId]);
	const q = query.trim().toLowerCase();
	const countryHits = q ? PLACES.filter((place) => place.name.toLowerCase().includes(q) || place.iso.toLowerCase() === q).slice(0, 6) : [];
	const regionHits = q.length > 1 ? allRegions().filter((region) => region.named && region.name.toLowerCase().includes(q)).slice(0, 6) : [];
	const continents = [...new Set(PLACES.map((place) => place.continent))].filter((name) => name !== "Antarctica" && !name.startsWith("Seven")).sort();
	const subregions = [...new Set(PLACES.map((place) => place.subregion))].filter((name) => name && !name.startsWith("Seven")).sort();
	const sum = weights.official + weights.social + weights.news || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 p-3 lg:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
							tip: uiTip("search"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: "Find a place"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex h-11 items-center gap-2 rounded-lg border border-line bg-surface px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Country or region",
								className: "w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
							})]
						})]
					}),
					q && (countryHits.length > 0 || regionHits.length > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute z-30 mt-1 w-full overflow-hidden rounded-lg border border-line bg-surface",
						children: [countryHits.map((place) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex min-h-11 w-full items-center justify-between px-3 text-left text-sm hover:bg-surface-2",
							onClick: () => {
								openPlace(place.iso);
								setQuery("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: place.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: place.iso
							})]
						}, place.iso)), regionHits.map((region) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-sm hover:bg-surface-2",
							onClick: () => {
								openPlace(region.iso, region.id);
								setQuery("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: region.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-muted",
								children: PLACE_BY[region.iso]?.name
							})]
						}, region.id))]
					}) : null,
					q && countryHits.length === 0 && regionHits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "No place matches that."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
					tip: uiTip("scope"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: "Map scope"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: scope,
					onChange: (event) => setScope(event.target.value),
					className: "h-11 rounded-lg border border-line bg-surface px-3 text-sm text-fg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "world",
							children: "World"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
							label: "Continents",
							children: continents.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: `c:${name}`,
								children: name
							}, name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
							label: "Major regions",
							children: subregions.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: `s:${name}`,
								children: name
							}, name))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
					tip: uiTip("population"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: "Emphasis on the map"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: String(popMin),
					onChange: (event) => setPopMin(Number(event.target.value)),
					className: "h-11 rounded-lg border border-line bg-surface px-3 text-sm text-fg",
					children: POP_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: option.value,
						children: option.label
					}, option.value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm text-muted",
					children: "Time lens"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-1",
					children: [
						[
							"level",
							"Level",
							"lensLevel"
						],
						[
							"delta",
							"1 year",
							"lensDelta"
						],
						[
							"since2019",
							"Since 2019",
							"lens2019"
						]
					].map(([id, label, tipId]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip(tipId),
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLens(id),
							className: clsx("min-h-11 flex-1 rounded-md px-2 text-left text-sm", lens === id ? "bg-accent text-accent-ink" : "bg-surface text-muted"),
							children: label
						})
					}, id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm text-muted",
						children: "Source blend"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Weight, {
						label: "Official statistics",
						tipId: "official",
						value: weights.official,
						share: Math.round(weights.official / sum * 100),
						onChange: (value) => setWeight("official", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Weight, {
						label: "Social mood",
						tipId: "social",
						value: weights.social,
						share: Math.round(weights.social / sum * 100),
						onChange: (value) => setWeight("social", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Weight, {
						label: "News momentum",
						tipId: "news",
						value: weights.news,
						share: Math.round(weights.news / sum * 100),
						onChange: (value) => setWeight("news", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("blendNote"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-pretty text-muted",
							children: "The choropleth uses this blend. Hard figures in the briefing stay on the official path."
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("ledger"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 text-left text-sm text-muted",
							onClick: onOpenLedger,
							children: "Metric on the map"
						})
					}),
					added.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
							tip: uiTip("added"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: "Added by you"
							})
						}), added.map((row) => {
							const active = metricId === `add:${row.id}`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
								tip: uiTip("added"),
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setMetric(`add:${row.id}`),
									className: clsx("min-h-11 flex-1 rounded-md border-l-2 px-2 text-left text-sm", active ? "border-accent bg-surface text-fg" : "border-transparent text-muted"),
									children: row.label
								})
							}, row.id);
						})]
					}) : null,
					GROUPS.map((group) => {
						const items = METRICS.filter((item) => item.group === group);
						const expanded = openGroups[group] ?? false;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-line pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex min-h-11 flex-1 items-center justify-between text-left text-sm",
									"aria-expanded": expanded,
									onClick: () => setOpenGroups((current) => ({
										...current,
										[group]: !expanded
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: group }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: expanded ? "Hide" : items.length
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
									tip: groupTip(group),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: group
									})
								})]
							}), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid pb-1",
								children: items.map((item) => {
									const active = item.id === metricId;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
										tip: metricTip(item),
										className: "w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setMetric(item.id),
											className: clsx("min-h-11 flex-1 rounded-md border-l-2 px-2 text-left text-sm", active ? "border-accent bg-surface text-fg" : "border-transparent text-muted hover:bg-surface hover:text-fg"),
											children: item.label
										})
									}, item.id);
								})
							}) : null]
						}, group);
					})
				]
			})
		]
	});
}
function Weight({ label, tipId, value, share, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center justify-between gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
				tip: uiTip(tipId),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums text-muted",
				children: [share, "%"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min: 0,
			max: 100,
			value,
			onChange: (event) => onChange(Number(event.target.value))
		})]
	});
}
function Briefing({ metricId, alias, year, lens, weights, scope, place, region, places, popMin, blendLabel }) {
	const metric = metricById(metricId);
	const label = alias?.label ?? metric.label;
	const blurb = alias?.definition || metric.blurb;
	const selectCountry = useAtlas((state) => state.selectCountry);
	const selectRegion = useAtlas((state) => state.selectRegion);
	const subjectRaw = place ? rawAt(place.iso, year, region) : weightedRaw(places, year);
	const prevRaw = place ? rawAt(place.iso, Math.max(YEAR_MIN, year - 1), region) : weightedRaw(places, Math.max(YEAR_MIN, year - 1));
	const baseYear = lens === "since2019" ? 2019 : year - 1;
	const official = subjectRaw ? readingsOf(subjectRaw)[metricId] : null;
	const previous = prevRaw && year > 2016 ? readingsOf(prevRaw)[metricId] : null;
	const blended = subjectRaw ? blendedLevel(subjectRaw, year > 2016 ? prevRaw : null, metricId, weights) : NaN;
	const mapScore = place ? viewScore(place.iso, year, metricId, weights, lens, region) : weightedScore(places, year, metricId, weights, lens);
	let hero = "—";
	if (official && subjectRaw) {
		if (lens === "level") hero = metric.scale === "index" ? String(Math.round(blended)) : official.display;
		else if (metric.scale === "index") hero = Number.isFinite(mapScore) ? signed(mapScore) : "—";
		else if (previous && lens === "delta") hero = formatDelta(metric, official.value, previous.value);
		else if (place && lens === "since2019") {
			const base = rawAt(place.iso, 2019, region);
			if (base) hero = formatDelta(metric, official.value, readingsOf(base)[metricId].value);
		} else if (!place && subjectRaw) {
			const baseRaw = weightedRaw(places, baseYear);
			if (baseRaw) hero = formatDelta(metric, official.value, readingsOf(baseRaw)[metricId].value);
		}
	}
	const title = region ? region.name : place ? place.name : scopeLabel(scope);
	const kicker = region ? place?.name : place ? `${place.subregion} · ${place.continent}` : "Population-weighted";
	const history = YEARS.map((item) => {
		const raw = place ? rawAt(place.iso, item, region) : weightedRaw(places, item);
		return {
			year: String(item),
			value: raw ? raw[metric.id] : 0
		};
	});
	const briefs = subjectRaw ? briefsFor(title, year, subjectRaw, year > 2016 ? prevRaw : null) : [];
	const themes = subjectRaw ? themeShares(subjectRaw).slice(0, 6) : [];
	const terms = subjectRaw ? topTerms(subjectRaw, 8) : [];
	const maxTerm = terms[0]?.score || 1;
	const regions = place ? regionsFor(place.iso) : [];
	const ranked = places.filter((item) => !isThin(item) && item.pop >= Math.max(popMin, 1)).map((item) => ({
		place: item,
		score: viewScore(item.iso, year, metricId, weights, lens)
	})).filter((item) => Number.isFinite(item.score)).sort((a, b) => b.score - a.score);
	const highest = ranked.slice(0, 6);
	const lowest = [...ranked].reverse().slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 p-3 lg:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
					tip: place && isThin(place) ? uiTip("thin") : uiTip("hero"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: kicker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-balance font-serif text-4xl leading-tight",
						children: title
					})] })
				}),
				place ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						formatPop(place.pop),
						" people",
						region ? ` · ${region.kind} zone` : "",
						isThin(place) ? " · thin public record" : ""
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [places.filter((item) => !isThin(item)).length, " territories in view"]
				}),
				place && subjectRaw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-pretty text-muted",
					children: region?.note ?? noteFor(place, subjectRaw)
				}) : null
			] }),
			subjectRaw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
				tip: uiTip("pillars"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pillar, {
							label: "Living",
							value: subjectRaw.living
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pillar, {
							label: "Working",
							value: subjectRaw.working
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pillar, {
							label: "Investing",
							value: subjectRaw.investing
						})
					]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
							tip: alias ? uiTip("added") : metricTip(metric),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-5xl leading-none tabular-nums",
								children: hero
							})] })
						}), official && previous && lens === "level" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "pb-1 text-right text-sm text-muted",
							children: [
								formatDelta(metric, official.value, previous.value),
								" vs ",
								year - 1
							]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty text-muted",
						children: blurb
					}),
					alias ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 text-sm text-pretty text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Stand-in on the map: ",
								metric.label,
								". This type does not have its own country series yet."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								alias.sourceName,
								alias.published ? ` · ${alias.published}` : "",
								". ",
								alias.why
							] }),
							alias.calculation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Intended calculation: ", alias.calculation] }) : null,
							alias.query ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["How it was found: ", alias.query] }) : null,
							alias.sourceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-accent underline",
								href: alias.sourceUrl,
								target: "_blank",
								rel: "noreferrer",
								children: alias.sourceUrl
							}) : null
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("blendNote"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								metric.higherIsBetter ? "Higher is more favorable." : "Higher is a heavier reading.",
								" ",
								lens === "level" ? "Brass on the map is a higher reading." : "Brass means the reading rose. Cool means it fell."
							]
						})
					}),
					metric.scale === "index" && official && Math.abs(blended - official.level) >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Official path ",
							Math.round(official.level),
							". The map is pulled by the source blend (",
							blendLabel,
							")."
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Map blend ",
							blendLabel,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("history"),
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { rows: history })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveFeeds, {
				iso3: place?.iso ?? "",
				placeName: place?.name ?? "",
				metricId: metric.id,
				metricLabel: label
			}),
			regions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("zones"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm text-muted",
							children: region ? "Zones in this country" : "Major zones"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-1",
						children: regions.map((item) => {
							const reading = readingAt(item.iso, year, metricId, item);
							const active = item.id === region?.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => selectRegion(active ? null : item.id),
								className: clsx("flex min-h-11 items-center justify-between gap-3 rounded-md px-2 text-left text-sm", active ? "bg-surface-2 text-fg" : "hover:bg-surface"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate",
									children: [item.name, !item.named ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: " · modeled"
									}) : null]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 tabular-nums text-muted",
									children: reading?.display
								})]
							}, item.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty text-muted",
						children: "Zones are focus areas, not legal borders. Local pillars shift off the national path. Prices and population stay national where no local series exists."
					})
				]
			}) : null,
			!place && highest.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("rank"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm text-muted",
							children: "Highest reading"
						})
					}),
					highest.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rank, {
						place: item.place,
						score: item.score,
						metricScale: metric.scale,
						onOpen: () => selectCountry(item.place.iso)
					}, item.place.iso)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("rank"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "pt-2 text-sm text-muted",
							children: "Lowest reading"
						})
					}),
					lowest.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rank, {
						place: item.place,
						score: item.score,
						metricScale: metric.scale,
						onOpen: () => selectCountry(item.place.iso)
					}, item.place.iso))
				]
			}) : null,
			themes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
						tip: uiTip("themes"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm text-muted",
							children: "Discourse themes"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-pretty text-muted",
						children: [
							"Relative mention index for ",
							year,
							", categorized. A formula, not the live feeds below."
						]
					})] }),
					themes.map((theme) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: theme.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-muted",
								children: [theme.share.toFixed(0), "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 rounded-full bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-accent",
								style: { width: `${Math.max(4, theme.share)}%` }
							})
						})]
					}, theme.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 pt-1",
						children: terms.map((term) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: term.term }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-muted",
									children: term.theme
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 rounded-full bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-fg",
									style: { width: `${Math.max(8, term.score / maxTerm * 100)}%` }
								})
							})]
						}, term.term))
					})
				]
			}) : null,
			briefs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithTip, {
					tip: uiTip("briefs"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm text-muted",
						children: "Atlas briefs"
					})
				}), briefs.map((brief) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "grid gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-accent",
							children: brief.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base",
							children: brief.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-pretty text-muted",
							children: brief.detail
						})
					]
				}, brief.title))]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "border-t border-line pt-3 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "min-h-11 cursor-pointer text-fg",
					children: "How to read this"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 pb-4 text-pretty",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every question mark is the definition, the formula, and the fine print. Sources and method is the full shelf, including how to add a news or data type. The page stays one address: Share copies this view." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Levels are a modeled synthesis anchored on public patterns — national accounts, prices, labor, governance, demography — with a year path for the pandemic, the inflation surge, disinflation, and conflict. 2026 is a nowcast." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Social themes are simulated volumes consistent with those shifts, grouped by subject. They are not the live feeds. The live feeds are labeled with the endpoint that returned them." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Google Trends on this page is two live series: a 12-month interest index, 0–100, for artificial intelligence, ChatGPT, and this metric, plus the daily trending list. Semrush and Ahrefs stay empty until a key is pasted in this briefing. The key stays in this browser and is not written into the share link. Wikipedia pageviews are attention, not keyword volume. World Bank rows are the official cells and are not the map." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Risk includes conflict, governance, cyber exposure, sanctions friction, and illicit-economy pressure in the style of published composites. Dark-web markets, stolen-data forums, and hidden services are not connected and are not shown." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Coastlines are Natural Earth, 50 meter. Named zones mark tourist coasts, capitals, and job corridors. Other territories are split into north, center, and south belts." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGuide, {
				metricId: metric.id,
				group: metric.group
			})
		]
	});
}
function Pillar({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface px-2 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl leading-none tabular-nums",
				children: Math.round(value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-1 rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-accent",
					style: { width: `${Math.max(0, Math.min(100, value))}%` }
				})
			})
		]
	});
}
function Rank({ place, score, metricScale, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpen,
		className: "flex min-h-11 items-center justify-between gap-3 rounded-md px-1 text-left text-sm hover:bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: place.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums text-muted",
			children: metricScale === "index" ? Math.round(score) : score.toFixed(1)
		})]
	});
}
function History({ rows }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-24 w-full min-w-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data: rows,
				margin: {
					top: 8,
					right: 4,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "year",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						interval: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						hide: true,
						domain: ["auto", "auto"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "value",
						stroke: "var(--color-accent)",
						strokeWidth: 2,
						dot: false,
						isAnimationActive: false
					})
				]
			})
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeridianApp, {});
}
//#endregion
export { Home as component };
