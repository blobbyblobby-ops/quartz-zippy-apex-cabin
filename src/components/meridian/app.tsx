import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Pause, Play, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { GROUPS, METRICS, formatDelta, metricById, readingsOf } from "@/data/metrics";
import { groupTip, metricTip, uiTip } from "@/data/ledger";
import { briefsFor, blendedLevel, isThin, noteFor, placesInScope, rawAt, readingAt, themeShares, topTerms, weightedRaw } from "@/data/model";
import { DIM, colorFor } from "@/data/palette";
import { PLACE_BY, PLACES } from "@/data/places";
import { previewPathPrefix } from "@/lib/preview-path-prefix";
import { allRegions, regionById, regionsFor } from "@/data/regions";
import type { Lens, Place, Region, Weights } from "@/data/types";
import { YEAR_MAX, YEAR_MIN, YEARS } from "@/data/types";
import { useAtlas } from "@/state/atlas";
import { loadAdded, packAdded, saveAdded, unpackAdded, type AddedType } from "@/state/layers";
import { AtlasMap, type MapFeature } from "./map";
import { WithTip } from "./explain";
import { Ledger } from "./ledger";
import { LiveFeeds } from "./signals";
import { FieldGuide } from "./field-guide";

const EMPTY_REGIONS: Region[] = [];

const POP_OPTIONS = [
  { value: 0, label: "All territories" },
  { value: 1_000_000, label: "1 million and up" },
  { value: 10_000_000, label: "10 million and up" },
];

function formatPop(pop: number): string {
  if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(2)}B`;
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${Math.round(pop / 1_000)}k`;
  return String(pop);
}

function scopeLabel(scope: string): string {
  return scope === "world" ? "World" : scope.slice(2);
}

function matchesScope(place: Place, scope: string): boolean {
  if (scope === "world") return true;
  if (scope.startsWith("c:")) return place.continent === scope.slice(2);
  if (scope.startsWith("s:")) return place.subregion === scope.slice(2);
  return true;
}

function viewScore(iso: string, year: number, metricId: string, weights: Weights, lens: Lens, region?: Region | null): number {
  const raw = rawAt(iso, year, region);
  if (!raw) return Number.NaN;
  const prevYear = year > YEAR_MIN ? rawAt(iso, year - 1, region) : null;
  const now = blendedLevel(raw, prevYear, metricId, weights);
  if (lens === "level") return now;
  const base = lens === "since2019" ? 2019 : year - 1;
  if (base < YEAR_MIN || base === year) return 0;
  const baseRaw = rawAt(iso, base, region);
  if (!baseRaw) return 0;
  const basePrev = base > YEAR_MIN ? rawAt(iso, base - 1, region) : null;
  return now - blendedLevel(baseRaw, basePrev, metricId, weights);
}

function weightedScore(places: Place[], year: number, metricId: string, weights: Weights, lens: Lens): number {
  let weight = 0;
  let total = 0;
  for (const place of places) {
    if (isThin(place) || place.pop <= 0) continue;
    const score = viewScore(place.iso, year, metricId, weights, lens);
    if (!Number.isFinite(score)) continue;
    total += score * place.pop;
    weight += place.pop;
  }
  return weight > 0 ? total / weight : Number.NaN;
}

function signed(value: number, digits = 1): string {
  const text = value.toFixed(digits);
  return `${value > 0 ? "+" : ""}${text}`;
}

export function MeridianApp() {
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
  const [features, setFeatures] = useState<MapFeature[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [pane, setPane] = useState<"filters" | "briefing">("briefing");
  const [added, setAdded] = useState<AddedType[]>([]);
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareFallback, setShareFallback] = useState("");
  const [urlReady, setUrlReady] = useState(false);

  useEffect(() => {
    const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
    const controller = new AbortController();
    fetch(`${prefix}/geo/countries.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("missing coastlines");
        return response.json() as Promise<{ features: MapFeature[] }>;
      })
      .then((data) => setFeatures(data.features))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      const current = useAtlas.getState().year;
      useAtlas.getState().setYear(current >= YEAR_MAX ? YEAR_MIN : current + 1);
    }, 900);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const patch: Partial<{ year: number; metricId: string; lens: Lens; scope: string; iso: string | null; regionId: string | null; popMin: number; weights: Weights }> = {};
    const nextYear = Number(params.get("y"));
    if (nextYear >= YEAR_MIN && nextYear <= YEAR_MAX) patch.year = nextYear;
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
    if (params.has("wo") && params.has("ws") && params.has("wn") && [wo, ws, wn].every((value) => Number.isFinite(value))) patch.weights = { official: wo, social: ws, news: wn };
    if (Object.keys(patch).length > 0) useAtlas.setState(patch);

    const stored = loadAdded();
    const fromLink = params.get("layer") ? unpackAdded(params.get("layer") ?? "") : null;
    const merged = fromLink && !stored.some((row) => row.id === fromLink.id) ? [...stored, fromLink] : stored;
    setAdded(merged);
    if (fromLink) saveAdded(merged);
    setUrlReady(true);
  }, []);

  useEffect(() => {
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
    if (`${window.location.pathname}${window.location.search}` !== next) {
      window.history.replaceState(null, "", next);
    }
  }, [urlReady, year, metricId, lens, weights, popMin, scope, iso, regionId, added]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
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
  const region = regionId ? regionById(regionId) : undefined;
  const place = iso ? PLACE_BY[iso] : undefined;

  const colors = useMemo(() => {
    const paint: Record<string, { fill: string; opacity: number }> = {};
    for (const country of PLACES) {
      const score = viewScore(country.iso, year, scoreMetricId, weights, lens);
      const inside = matchesScope(country, scope);
      if (isThin(country)) {
        paint[country.iso] = { fill: DIM, opacity: inside ? 0.9 : 0.2 };
        continue;
      }
      let opacity = 0.94;
      if (!inside) opacity = 0.12;
      else if (popMin > 0 && country.pop < popMin) opacity = 0.38;
      paint[country.iso] = { fill: colorFor(score, lens), opacity };
    }
    return paint;
  }, [year, scoreMetricId, weights, lens, scope, popMin]);

  const activeRegions = place ? regionsFor(place.iso) : EMPTY_REGIONS;
  const regionFill = useMemo(() => {
    const fill: Record<string, string> = {};
    for (const item of activeRegions) {
      fill[item.id] = colorFor(viewScore(item.iso, year, scoreMetricId, weights, lens, item), lens);
    }
    return fill;
  }, [activeRegions, year, scoreMetricId, weights, lens]);

  const weightSum = weights.official + weights.social + weights.news || 1;
  const blendLabel = `Official ${Math.round((weights.official / weightSum) * 100)} · social ${Math.round((weights.social / weightSum) * 100)} · news ${Math.round((weights.news / weightSum) * 100)}`;
  const lensLabel = lens === "level" ? "level" : lens === "delta" ? "1-year change" : "change since 2019";
  const shownLabel = addedRow ? addedRow.label : metric.label;
  const caption = `${shownLabel} · ${year}${year === 2026 ? " nowcast" : ""} · ${lensLabel}${addedRow ? ` · stand-in ${metric.label}` : ""}`;

  const scoped = placesInScope(scope).filter((item) => matchesScope(item, scope));

  return (
    <div className="flex h-dvh flex-col bg-bg text-fg">
      <header className="z-20 flex shrink-0 flex-col gap-2 border-b border-line bg-bg px-3 py-2 lg:flex-row lg:items-center lg:gap-5 lg:px-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative grid h-8 w-8 place-items-center" aria-hidden="true">
              <span className="absolute h-5 w-5 rounded-full border border-fg" />
              <span className="h-5 w-1 rounded-full bg-accent" />
            </span>
            <WithTip tip={uiTip("brand")}>
              <div>
                <p className="font-serif text-2xl leading-none">Meridian</p>
                <p className="text-xs text-muted">Living, work, and capital</p>
              </div>
            </WithTip>
          </div>
          <div className="flex items-center gap-1">
            <WorldPill scope={scope} year={year} />
            <button type="button" className="min-h-11 rounded-lg px-2 text-sm text-muted" onClick={() => setLedgerOpen(true)}>
              Sources
            </button>
            <button
              type="button"
              className="min-h-11 rounded-lg bg-surface px-3 text-sm"
              onClick={() => {
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
                void navigator.clipboard.writeText(url).then(
                  () => {
                    setShareFallback("");
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1600);
                  },
                  () => setShareFallback(url),
                );
              }}
            >
              {copied ? "Copied" : "Share"}
            </button>
            <WithTip tip={uiTip("share")}>
              <span className="sr-only">Share link</span>
            </WithTip>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <WithTip tip={uiTip("play")}>
            <button
              type="button"
              aria-label={playing ? "Pause the years" : "Play the years"}
              aria-pressed={playing}
              onClick={() => setPlaying(!playing)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-surface text-fg"
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
          </WithTip>
          <WithTip tip={uiTip("year")} className="min-w-0 flex-1">
            <label className="min-w-0 flex-1">
              <span className="sr-only">Year</span>
              <input
                type="range"
                min={YEAR_MIN}
                max={YEAR_MAX}
                step={1}
                value={year}
                onChange={(event) => {
                  setPlaying(false);
                  setYear(Number(event.target.value));
                }}
              />
            </label>
          </WithTip>
          <div className="w-14 shrink-0 text-right">
            <p className="font-serif text-2xl leading-none tabular-nums">{year}</p>
            <p className="text-xs text-muted">{year === 2026 ? "Nowcast" : "Year"}</p>
          </div>
        </div>
      </header>
      {shareFallback ? <p className="border-b border-line px-3 py-2 text-xs break-all text-muted">{shareFallback}</p> : null}

      <div className="flex shrink-0 border-b border-line lg:hidden">
        <button
          type="button"
          className={clsx("min-h-11 flex-1 text-sm", pane === "filters" ? "text-fg" : "text-muted")}
          onClick={() => setPane("filters")}
        >
          Filters
        </button>
        <button
          type="button"
          className={clsx("min-h-11 flex-1 text-sm", pane === "briefing" ? "text-fg" : "text-muted")}
          onClick={() => setPane("briefing")}
        >
          Briefing
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside
          className={clsx(
            "scroll-thin min-h-0 overflow-y-auto border-line lg:block lg:w-80 lg:flex-none lg:border-r lg:border-t-0",
            pane === "filters" ? "block flex-1 border-t" : "hidden",
          )}
        >
          <Filters added={added} onOpenLedger={() => setLedgerOpen(true)} />
        </aside>
        <div className="relative h-[46dvh] shrink-0 lg:h-auto lg:min-h-0 lg:flex-1">
          <AtlasMap
            features={features}
            failed={failed}
            colors={colors}
            selectedIso={iso}
            selectedRegionId={region?.id ?? null}
            regions={activeRegions}
            regionFill={regionFill}
            caption={caption}
            lens={lens}
            onSelectCountry={(next) => {
              selectCountry(next);
              setPane("briefing");
            }}
            onSelectRegion={(id) => {
              selectRegion(id);
              setPane("briefing");
            }}
            onClear={() => selectCountry(null)}
          />
        </div>
        <aside
          className={clsx(
            "scroll-thin min-h-0 overflow-y-auto border-line lg:block lg:w-96 lg:flex-none lg:border-l lg:border-t-0",
            pane === "briefing" ? "block flex-1 border-t" : "hidden",
          )}
        >
          <Briefing
            metricId={scoreMetricId}
            alias={addedRow}
            year={year}
            lens={lens}
            weights={weights}
            scope={scope}
            place={place}
            region={region}
            places={scoped}
            popMin={popMin}
            blendLabel={blendLabel}
          />
        </aside>
      </div>
      {ledgerOpen ? (
        <Ledger
          added={added}
          onClose={() => setLedgerOpen(false)}
          onAdd={(row) => {
            const next = [...added.filter((item) => item.label !== row.label), row];
            setAdded(next);
            saveAdded(next);
            useAtlas.getState().setMetric(`add:${row.id}`);
            setLedgerOpen(false);
            setPane("briefing");
          }}
          onRemove={(id) => {
            const next = added.filter((item) => item.id !== id);
            setAdded(next);
            saveAdded(next);
            if (useAtlas.getState().metricId === `add:${id}`) useAtlas.getState().setMetric("lwi");
          }}
        />
      ) : null}
    </div>
  );
}

function WorldPill({ scope, year }: { scope: string; year: number }) {
  const raw = weightedRaw(placesInScope(scope), year);
  return (
    <WithTip tip={uiTip("worldLwi")}>
      <div className="text-right">
        <p className="text-xs text-muted">{scopeLabel(scope)} LWI</p>
        <p className="font-serif text-2xl leading-none tabular-nums">{raw ? Math.round(raw.lwi) : "—"}</p>
      </div>
    </WithTip>
  );
}

function Filters({ added, onOpenLedger }: { added: AddedType[]; onOpenLedger: () => void }) {
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
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Index: true,
    Living: true,
    Working: true,
    Investing: true,
  });

  useEffect(() => {
    if (metricId.startsWith("add:")) return;
    const group = metricById(metricId).group;
    setOpenGroups((current) => (current[group] ? current : { ...current, [group]: true }));
  }, [metricId]);

  const q = query.trim().toLowerCase();
  const countryHits = q
    ? PLACES.filter((place) => place.name.toLowerCase().includes(q) || place.iso.toLowerCase() === q).slice(0, 6)
    : [];
  const regionHits =
    q.length > 1
      ? allRegions()
          .filter((region) => region.named && region.name.toLowerCase().includes(q))
          .slice(0, 6)
      : [];

  const continents = [...new Set(PLACES.map((place) => place.continent))]
    .filter((name) => name !== "Antarctica" && !name.startsWith("Seven"))
    .sort();
  const subregions = [...new Set(PLACES.map((place) => place.subregion))]
    .filter((name) => name && !name.startsWith("Seven"))
    .sort();
  const sum = weights.official + weights.social + weights.news || 1;

  return (
    <div className="grid gap-5 p-3 lg:p-4">
      <div className="relative">
        <label className="grid gap-1">
          <WithTip tip={uiTip("search")}>
            <span className="text-sm text-muted">Find a place</span>
          </WithTip>
          <span className="flex h-11 items-center gap-2 rounded-lg border border-line bg-surface px-3">
            <Search className="size-4 shrink-0 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Country or region"
              className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
            />
          </span>
        </label>
        {q && (countryHits.length > 0 || regionHits.length > 0) ? (
          <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-lg border border-line bg-surface">
            {countryHits.map((place) => (
              <button
                key={place.iso}
                type="button"
                className="flex min-h-11 w-full items-center justify-between px-3 text-left text-sm hover:bg-surface-2"
                onClick={() => {
                  openPlace(place.iso);
                  setQuery("");
                }}
              >
                <span>{place.name}</span>
                <span className="text-muted">{place.iso}</span>
              </button>
            ))}
            {regionHits.map((region) => (
              <button
                key={region.id}
                type="button"
                className="flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-sm hover:bg-surface-2"
                onClick={() => {
                  openPlace(region.iso, region.id);
                  setQuery("");
                }}
              >
                <span className="truncate">{region.name}</span>
                <span className="shrink-0 text-muted">{PLACE_BY[region.iso]?.name}</span>
              </button>
            ))}
          </div>
        ) : null}
        {q && countryHits.length === 0 && regionHits.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No place matches that.</p>
        ) : null}
      </div>

      <label className="grid gap-1">
        <WithTip tip={uiTip("scope")}>
          <span className="text-sm text-muted">Map scope</span>
        </WithTip>
        <select
          value={scope}
          onChange={(event) => setScope(event.target.value)}
          className="h-11 rounded-lg border border-line bg-surface px-3 text-sm text-fg"
        >
          <option value="world">World</option>
          <optgroup label="Continents">
            {continents.map((name) => (
              <option key={name} value={`c:${name}`}>
                {name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Major regions">
            {subregions.map((name) => (
              <option key={name} value={`s:${name}`}>
                {name}
              </option>
            ))}
          </optgroup>
        </select>
      </label>

      <label className="grid gap-1">
        <WithTip tip={uiTip("population")}>
          <span className="text-sm text-muted">Emphasis on the map</span>
        </WithTip>
        <select
          value={String(popMin)}
          onChange={(event) => setPopMin(Number(event.target.value))}
          className="h-11 rounded-lg border border-line bg-surface px-3 text-sm text-fg"
        >
          {POP_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="grid gap-2">
        <legend className="text-sm text-muted">Time lens</legend>
        <div className="grid grid-cols-1 gap-1">
          {(
            [
              ["level", "Level", "lensLevel"],
              ["delta", "1 year", "lensDelta"],
              ["since2019", "Since 2019", "lens2019"],
            ] as const
          ).map(([id, label, tipId]) => (
            <WithTip key={id} tip={uiTip(tipId)} className="w-full">
              <button
                type="button"
                onClick={() => setLens(id)}
                className={clsx("min-h-11 flex-1 rounded-md px-2 text-left text-sm", lens === id ? "bg-accent text-accent-ink" : "bg-surface text-muted")}
              >
                {label}
              </button>
            </WithTip>
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-3">
        <legend className="text-sm text-muted">Source blend</legend>
        <Weight
          label="Official statistics"
          tipId="official"
          value={weights.official}
          share={Math.round((weights.official / sum) * 100)}
          onChange={(value) => setWeight("official", value)}
        />
        <Weight
          label="Social mood"
          tipId="social"
          value={weights.social}
          share={Math.round((weights.social / sum) * 100)}
          onChange={(value) => setWeight("social", value)}
        />
        <Weight
          label="News momentum"
          tipId="news"
          value={weights.news}
          share={Math.round((weights.news / sum) * 100)}
          onChange={(value) => setWeight("news", value)}
        />
        <WithTip tip={uiTip("blendNote")}>
          <p className="text-sm text-pretty text-muted">
            The choropleth uses this blend. Hard figures in the briefing stay on the official path.
          </p>
        </WithTip>
      </fieldset>

      <div className="grid gap-2">
        <WithTip tip={uiTip("ledger")}>
          <button type="button" className="min-h-11 text-left text-sm text-muted" onClick={onOpenLedger}>
            Metric on the map
          </button>
        </WithTip>
        {added.length > 0 ? (
          <div className="border-t border-line pt-2">
            <WithTip tip={uiTip("added")}>
              <p className="text-sm">Added by you</p>
            </WithTip>
            {added.map((row) => {
              const active = metricId === `add:${row.id}`;
              return (
                <WithTip key={row.id} tip={uiTip("added")} className="w-full">
                  <button
                    type="button"
                    onClick={() => setMetric(`add:${row.id}`)}
                    className={clsx(
                      "min-h-11 flex-1 rounded-md border-l-2 px-2 text-left text-sm",
                      active ? "border-accent bg-surface text-fg" : "border-transparent text-muted",
                    )}
                  >
                    {row.label}
                  </button>
                </WithTip>
              );
            })}
          </div>
        ) : null}
        {GROUPS.map((group) => {
          const items = METRICS.filter((item) => item.group === group);
          const expanded = openGroups[group] ?? false;
          return (
            <div key={group} className="border-t border-line pt-2">
              <div className="flex items-center">
                <button
                  type="button"
                  className="flex min-h-11 flex-1 items-center justify-between text-left text-sm"
                  aria-expanded={expanded}
                  onClick={() => setOpenGroups((current) => ({ ...current, [group]: !expanded }))}
                >
                  <span>{group}</span>
                  <span className="text-muted">{expanded ? "Hide" : items.length}</span>
                </button>
                <WithTip tip={groupTip(group)}>
                  <span className="sr-only">{group}</span>
                </WithTip>
              </div>
              {expanded ? (
                <div className="grid pb-1">
                  {items.map((item) => {
                    const active = item.id === metricId;
                    return (
                      <WithTip key={item.id} tip={metricTip(item)} className="w-full">
                        <button
                          type="button"
                          onClick={() => setMetric(item.id)}
                          className={clsx(
                            "min-h-11 flex-1 rounded-md border-l-2 px-2 text-left text-sm",
                            active ? "border-accent bg-surface text-fg" : "border-transparent text-muted hover:bg-surface hover:text-fg",
                          )}
                        >
                          {item.label}
                        </button>
                      </WithTip>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Weight({
  label,
  tipId,
  value,
  share,
  onChange,
}: {
  label: string;
  tipId: string;
  value: number;
  share: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-1">
      <span className="flex items-center justify-between gap-3 text-sm">
        <WithTip tip={uiTip(tipId)}>
          <span>{label}</span>
        </WithTip>
        <span className="tabular-nums text-muted">{share}%</span>
      </span>
      <input type="range" min={0} max={100} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function Briefing({
  metricId,
  alias,
  year,
  lens,
  weights,
  scope,
  place,
  region,
  places,
  popMin,
  blendLabel,
}: {
  metricId: string;
  alias: AddedType | null;
  year: number;
  lens: Lens;
  weights: Weights;
  scope: string;
  place?: Place;
  region?: Region;
  places: Place[];
  popMin: number;
  blendLabel: string;
}) {
  const metric = metricById(metricId);
  const label = alias?.label ?? metric.label;
  const blurb = alias?.definition || metric.blurb;
  const selectCountry = useAtlas((state) => state.selectCountry);
  const selectRegion = useAtlas((state) => state.selectRegion);
  const subjectRaw = place ? rawAt(place.iso, year, region) : weightedRaw(places, year);
  const prevRaw = place
    ? rawAt(place.iso, Math.max(YEAR_MIN, year - 1), region)
    : weightedRaw(places, Math.max(YEAR_MIN, year - 1));
  const baseYear = lens === "since2019" ? 2019 : year - 1;
  const official = subjectRaw ? readingsOf(subjectRaw)[metricId] : null;
  const previous = prevRaw && year > YEAR_MIN ? readingsOf(prevRaw)[metricId] : null;
  const blended = subjectRaw ? blendedLevel(subjectRaw, year > YEAR_MIN ? prevRaw : null, metricId, weights) : Number.NaN;
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
    return { year: String(item), value: raw ? raw[metric.id] : 0 };
  });
  const briefs = subjectRaw ? briefsFor(title, year, subjectRaw, year > YEAR_MIN ? prevRaw : null) : [];
  const themes = subjectRaw ? themeShares(subjectRaw).slice(0, 6) : [];
  const terms = subjectRaw ? topTerms(subjectRaw, 8) : [];
  const maxTerm = terms[0]?.score || 1;
  const regions = place ? regionsFor(place.iso) : [];

  const ranked = places
    .filter((item) => !isThin(item) && item.pop >= Math.max(popMin, 1))
    .map((item) => ({ place: item, score: viewScore(item.iso, year, metricId, weights, lens) }))
    .filter((item) => Number.isFinite(item.score))
    .sort((a, b) => b.score - a.score);
  const highest = ranked.slice(0, 6);
  const lowest = [...ranked].reverse().slice(0, 4);

  return (
    <div className="grid gap-5 p-3 lg:p-4">
      <div>
        <WithTip tip={place && isThin(place) ? uiTip("thin") : uiTip("hero")}>
          <div>
            <p className="text-sm text-muted">{kicker}</p>
            <h1 className="text-balance font-serif text-4xl leading-tight">{title}</h1>
          </div>
        </WithTip>
        {place ? (
          <p className="mt-1 text-sm text-muted">
            {formatPop(place.pop)} people
            {region ? ` · ${region.kind} zone` : ""}
            {isThin(place) ? " · thin public record" : ""}
          </p>
        ) : (
          <p className="mt-1 text-sm text-muted">{places.filter((item) => !isThin(item)).length} territories in view</p>
        )}
        {place && subjectRaw ? <p className="mt-3 text-sm text-pretty text-muted">{region?.note ?? noteFor(place, subjectRaw)}</p> : null}
      </div>

      {subjectRaw ? (
        <WithTip tip={uiTip("pillars")}>
          <div className="grid grid-cols-3 gap-2">
            <Pillar label="Living" value={subjectRaw.living} />
            <Pillar label="Working" value={subjectRaw.working} />
            <Pillar label="Investing" value={subjectRaw.investing} />
          </div>
        </WithTip>
      ) : null}

      <section className="grid gap-2">
        <div className="flex items-end justify-between gap-3">
          <WithTip tip={alias ? uiTip("added") : metricTip(metric)}>
            <div>
              <p className="text-sm text-muted">{label}</p>
              <p className="font-serif text-5xl leading-none tabular-nums">{hero}</p>
            </div>
          </WithTip>
          {official && previous && lens === "level" ? (
            <p className="pb-1 text-right text-sm text-muted">{formatDelta(metric, official.value, previous.value)} vs {year - 1}</p>
          ) : null}
        </div>
        <p className="text-sm text-pretty text-muted">{blurb}</p>
        {alias ? (
          <div className="grid gap-1 text-sm text-pretty text-muted">
            <p>
              Stand-in on the map: {metric.label}. This type does not have its own country series yet.
            </p>
            <p>
              {alias.sourceName}
              {alias.published ? ` · ${alias.published}` : ""}. {alias.why}
            </p>
            {alias.calculation ? <p>Intended calculation: {alias.calculation}</p> : null}
            {alias.query ? <p>How it was found: {alias.query}</p> : null}
            {alias.sourceUrl ? (
              <a className="text-accent underline" href={alias.sourceUrl} target="_blank" rel="noreferrer">
                {alias.sourceUrl}
              </a>
            ) : null}
          </div>
        ) : null}
        <WithTip tip={uiTip("blendNote")}>
          <p className="text-sm text-muted">
            {metric.higherIsBetter ? "Higher is more favorable." : "Higher is a heavier reading."} {lens === "level" ? "Brass on the map is a higher reading." : "Brass means the reading rose. Cool means it fell."}
          </p>
        </WithTip>
        {metric.scale === "index" && official && Math.abs(blended - official.level) >= 2 ? (
          <p className="text-sm text-muted">Official path {Math.round(official.level)}. The map is pulled by the source blend ({blendLabel}).</p>
        ) : (
          <p className="text-sm text-muted">Map blend {blendLabel}.</p>
        )}
        <WithTip tip={uiTip("history")} className="w-full">
          <History rows={history} />
        </WithTip>
      </section>

      <LiveFeeds iso3={place?.iso ?? ""} placeName={place?.name ?? ""} metricId={metric.id} metricLabel={label} />

      {regions.length > 0 ? (
        <section className="grid gap-2">
          <WithTip tip={uiTip("zones")}>
            <h2 className="text-sm text-muted">{region ? "Zones in this country" : "Major zones"}</h2>
          </WithTip>
          <div className="grid gap-1">
            {regions.map((item) => {
              const reading = readingAt(item.iso, year, metricId, item);
              const active = item.id === region?.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectRegion(active ? null : item.id)}
                  className={clsx(
                    "flex min-h-11 items-center justify-between gap-3 rounded-md px-2 text-left text-sm",
                    active ? "bg-surface-2 text-fg" : "hover:bg-surface",
                  )}
                >
                  <span className="truncate">
                    {item.name}
                    {!item.named ? <span className="text-muted"> · modeled</span> : null}
                  </span>
                  <span className="shrink-0 tabular-nums text-muted">{reading?.display}</span>
                </button>
              );
            })}
          </div>
          <p className="text-sm text-pretty text-muted">
            Zones are focus areas, not legal borders. Local pillars shift off the national path. Prices and population stay national where no local series exists.
          </p>
        </section>
      ) : null}

      {!place && highest.length > 0 ? (
        <section className="grid gap-2">
          <WithTip tip={uiTip("rank")}>
            <h2 className="text-sm text-muted">Highest reading</h2>
          </WithTip>
          {highest.map((item) => (
            <Rank key={item.place.iso} place={item.place} score={item.score} metricScale={metric.scale} onOpen={() => selectCountry(item.place.iso)} />
          ))}
          <WithTip tip={uiTip("rank")}>
            <h2 className="pt-2 text-sm text-muted">Lowest reading</h2>
          </WithTip>
          {lowest.map((item) => (
            <Rank key={item.place.iso} place={item.place} score={item.score} metricScale={metric.scale} onOpen={() => selectCountry(item.place.iso)} />
          ))}
        </section>
      ) : null}

      {themes.length > 0 ? (
        <section className="grid gap-3">
          <div>
            <WithTip tip={uiTip("themes")}>
              <h2 className="text-sm text-muted">Discourse themes</h2>
            </WithTip>
            <p className="text-sm text-pretty text-muted">Relative mention index for {year}, categorized. A formula, not the live feeds below.</p>
          </div>
          {themes.map((theme) => (
            <div key={theme.id} className="grid gap-1">
              <div className="flex justify-between text-sm">
                <span>{theme.label}</span>
                <span className="tabular-nums text-muted">{theme.share.toFixed(0)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(4, theme.share)}%` }} />
              </div>
            </div>
          ))}
          <div className="grid gap-2 pt-1">
            {terms.map((term) => (
              <div key={term.term} className="grid gap-1">
                <div className="flex justify-between gap-3 text-sm">
                  <span>{term.term}</span>
                  <span className="truncate text-muted">{term.theme}</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-fg" style={{ width: `${Math.max(8, (term.score / maxTerm) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {briefs.length > 0 ? (
        <section className="grid gap-3">
          <WithTip tip={uiTip("briefs")}>
            <h2 className="text-sm text-muted">Atlas briefs</h2>
          </WithTip>
          {briefs.map((brief) => (
            <article key={brief.title} className="grid gap-1">
              <p className="text-xs text-accent">{brief.kicker}</p>
              <h3 className="text-base">{brief.title}</h3>
              <p className="text-sm text-pretty text-muted">{brief.detail}</p>
            </article>
          ))}
        </section>
      ) : null}

      <details className="border-t border-line pt-3 text-sm text-muted">
        <summary className="min-h-11 cursor-pointer text-fg">How to read this</summary>
        <div className="grid gap-2 pb-4 text-pretty">
          <p>
            Every question mark is the definition, the formula, and the fine print. Sources and method is the full shelf, including how to add a news or data type. The page stays one address: Share copies this view.
          </p>
          <p>
            Levels are a modeled synthesis anchored on public patterns — national accounts, prices, labor, governance, demography — with a year path for the pandemic, the inflation surge, disinflation, and conflict. 2026 is a nowcast.
          </p>
          <p>
            Social themes are simulated volumes consistent with those shifts, grouped by subject. They are not the live feeds. The live feeds are labeled with the endpoint that returned them.
          </p>
          <p>
            Google Trends on this page is two live series: a 12-month interest index, 0–100, for artificial intelligence, ChatGPT, and this metric, plus the daily trending list. Semrush and Ahrefs stay empty until a key is pasted in this briefing. The key stays in this browser and is not written into the share link. Wikipedia pageviews are attention, not keyword volume. World Bank rows are the official cells and are not the map.
          </p>
          <p>
            Risk includes conflict, governance, cyber exposure, sanctions friction, and illicit-economy pressure in the style of published composites. Dark-web markets, stolen-data forums, and hidden services are not connected and are not shown.
          </p>
          <p>Coastlines are Natural Earth, 50 meter. Named zones mark tourist coasts, capitals, and job corridors. Other territories are split into north, center, and south belts.</p>
        </div>
      </details>
      <FieldGuide metricId={metric.id} group={metric.group} />
    </div>
  );
}

function Pillar({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-surface px-2 py-2">
      <p className="text-xs text-muted">{label}</p>
      <p className="font-serif text-2xl leading-none tabular-nums">{Math.round(value)}</p>
      <div className="mt-2 h-1 rounded-full bg-surface-2">
        <div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}

function Rank({
  place,
  score,
  metricScale,
  onOpen,
}: {
  place: Place;
  score: number;
  metricScale: "index" | "stat";
  onOpen: () => void;
}) {
  return (
    <button type="button" onClick={onOpen} className="flex min-h-11 items-center justify-between gap-3 rounded-md px-1 text-left text-sm hover:bg-surface">
      <span className="truncate">{place.name}</span>
      <span className="tabular-nums text-muted">{metricScale === "index" ? Math.round(score) : score.toFixed(1)}</span>
    </button>
  );
}

function History({ rows }: { rows: { year: string; value: number }[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="h-24" />;
  return (
    <div className="h-24 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
          <XAxis dataKey="year" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
          <YAxis hide domain={["auto", "auto"]} />
          <Line type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
