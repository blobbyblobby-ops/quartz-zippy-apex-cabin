import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { uiTip } from "@/data/ledger";
import { getLiveSignals } from "@/lib/signals.functions";
import type { AttentionSeries, LiveBundle } from "@/lib/signals.server";
import { WithTip } from "./explain";

const STROKES = ["var(--color-accent)", "var(--color-fg)", "var(--color-muted)", "var(--color-ramp-mid)"];

type Props = {
  iso3: string;
  placeName: string;
  metricId: string;
  metricLabel: string;
};

export function LiveFeeds({ iso3, placeName, metricId, metricLabel }: Props) {
  const [bundle, setBundle] = useState<LiveBundle | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(true);
  const [semrushKey, setSemrushKey] = useState("");
  const [ahrefsKey, setAhrefsKey] = useState("");
  const [keysReady, setKeysReady] = useState(false);

  useEffect(() => {
    setSemrushKey(localStorage.getItem("meridian.semrush") ?? "");
    setAhrefsKey(localStorage.getItem("meridian.ahrefs") ?? "");
    setKeysReady(true);
  }, []);

  useEffect(() => {
    if (!keysReady) return;
    let cancel = false;
    setPending(true);
    setError("");
    getLiveSignals({ data: { iso3, placeName, metricId, metricLabel, semrushKey, ahrefsKey } })
      .then((next) => {
        if (!cancel) setBundle(next);
      })
      .catch((reason: unknown) => {
        if (!cancel) setError(reason instanceof Error ? reason.message : "The live feeds did not return.");
      })
      .finally(() => {
        if (!cancel) setPending(false);
      });
    return () => {
      cancel = true;
    };
  }, [iso3, placeName, metricId, metricLabel, keysReady, semrushKey, ahrefsKey]);

  return (
    <section className="grid gap-3 border-t border-line pt-3">
      <div>
        <WithTip tip={uiTip("live")}>
          <h2 className="text-sm text-muted">Live search and attention</h2>
        </WithTip>
        <p className="text-sm text-pretty text-muted">
          {pending ? "Fetching the public feeds." : error ? error : bundle ? `Fetched ${bundle.fetchedAt.slice(0, 16).replace("T", " ")} UTC. Not blended into the map.` : ""}
        </p>
      </div>
      {bundle ? <BundleView bundle={bundle} semrushKey={semrushKey} ahrefsKey={ahrefsKey} onSemrush={setSemrushKey} onAhrefs={setAhrefsKey} /> : null}
    </section>
  );
}

function BundleView({
  bundle,
  semrushKey,
  ahrefsKey,
  onSemrush,
  onAhrefs,
}: {
  bundle: LiveBundle;
  semrushKey: string;
  ahrefsKey: string;
  onSemrush: (value: string) => void;
  onAhrefs: (value: string) => void;
}) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <h3 className="text-sm">Google Trends, 12 months</h3>
        <p className="text-sm text-pretty text-muted">{bundle.interest.note}</p>
        {bundle.interest.points.length > 0 ? <InterestChart terms={bundle.interest.terms} points={bundle.interest.points} /> : null}
        {bundle.interest.related.length > 0 ? (
          <div className="grid gap-1">
            {bundle.interest.related.map((row) => (
              <div key={`${row.term}-${row.kind}-${row.query}`} className="flex items-baseline justify-between gap-3 text-sm">
                <span>
                  {row.query} <span className="text-muted">· {row.term}</span>
                </span>
                <span className="shrink-0 tabular-nums text-muted">{row.kind === "rising" ? "rising" : "top"} {row.value}</span>
              </div>
            ))}
          </div>
        ) : bundle.interest.state === "ok" ? (
          <p className="text-sm text-muted">Related queries were not returned. The 12-month index above is still the series Google sent. Nothing was filled in.</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <h3 className="text-sm">Trending today</h3>
        <p className="text-sm text-pretty text-muted">{bundle.googleTrends.geoNote}</p>
        {bundle.googleTrends.state === "ok" ? (
          <p className="text-sm text-muted">
            {bundle.googleTrends.aiMatches} of {bundle.googleTrends.items.length} trending searches match AI terms or this metric.
          </p>
        ) : null}
        {bundle.googleTrends.items.map((item) => (
          <div key={item.title} className="flex items-baseline justify-between gap-3 text-sm">
            <span className={item.matches ? "text-fg" : "text-muted"}>{item.title}</span>
            <span className="shrink-0 tabular-nums text-muted">{item.traffic || "—"}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-3">
        <h3 className="text-sm">Semrush and Ahrefs</h3>
        <Vendor vendor={bundle.semrush} storageKey="meridian.semrush" saved={semrushKey} onSave={onSemrush} />
        <Vendor vendor={bundle.ahrefs} storageKey="meridian.ahrefs" saved={ahrefsKey} onSave={onAhrefs} />
      </div>

      {bundle.attention.length > 0 ? (
        <div className="grid gap-2">
          <h3 className="text-sm">Term frequency</h3>
          <p className="text-sm text-pretty text-muted">{bundle.attentionNote}</p>
          {bundle.attention.map((series) => (
            <div key={series.term} className="flex items-baseline justify-between gap-3 text-sm">
              <span>{series.term}</span>
              <span className="shrink-0 tabular-nums text-muted">
                {formatCount(series.last)}
                {series.mom != null ? ` · ${signedPct(series.mom)} mo` : ""}
                {series.yoy != null ? ` · ${signedPct(series.yoy)} yr` : ""}
              </span>
            </div>
          ))}
          <AttentionChart series={bundle.attention} />
        </div>
      ) : (
        <p className="text-sm text-muted">Wikipedia pageviews did not return a series for these terms.</p>
      )}

      {bundle.official.length > 0 ? (
        <div className="grid gap-2">
          <h3 className="text-sm">Live official rows</h3>
          <p className="text-sm text-pretty text-muted">{bundle.officialNote}</p>
          {bundle.official.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-3 text-sm">
              <span>{row.label}</span>
              <span className="shrink-0 tabular-nums text-muted">
                {row.unit === "USD" ? `$${Math.round(row.value ?? 0).toLocaleString("en-US")}` : `${(row.value ?? 0).toFixed(1)}%`} · {row.date}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-pretty text-muted">{bundle.officialNote}</p>
      )}

      {bundle.news.length > 0 ? (
        <div className="grid gap-2">
          <h3 className="text-sm">News, last 7 days</h3>
          {bundle.news.map((item) => (
            <a key={item.title} href={item.url} target="_blank" rel="noreferrer" className="text-sm text-pretty">
              {item.title} <span className="text-muted">{item.source}</span>
            </a>
          ))}
        </div>
      ) : null}

      {bundle.hackerNews.length > 0 ? (
        <div className="grid gap-2">
          <h3 className="text-sm">Hacker News</h3>
          {bundle.hackerNews.map((item) => (
            <a key={item.title} href={item.url} target="_blank" rel="noreferrer" className="text-sm text-pretty">
              {item.title} <span className="text-muted">{item.points} points · {item.comments} comments</span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Vendor({
  vendor,
  storageKey,
  saved,
  onSave,
}: {
  vendor: LiveBundle["semrush"];
  storageKey: string;
  saved: string;
  onSave: (value: string) => void;
}) {
  const [draft, setDraft] = useState("");
  return (
    <div className="grid gap-1">
      <p className="text-sm">{vendor.vendor}</p>
      <p className="text-sm text-pretty text-muted">{vendor.detail}</p>
      {vendor.rows.map((row) => (
        <p key={row.phrase} className="text-sm tabular-nums">
          {row.phrase}: {row.volume || "—"} <span className="text-muted">{row.extra}</span>
        </p>
      ))}
      <form
        className="mt-1 flex items-center gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const next = draft.trim();
          if (next.length < 8) return;
          localStorage.setItem(storageKey, next);
          setDraft("");
          onSave(next);
        }}
      >
        <input
          type="password"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          autoComplete="off"
          placeholder={saved ? "Key saved in this browser" : `${vendor.vendor} API key`}
          className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-sm"
        />
        <button type="submit" className="h-11 shrink-0 rounded-lg bg-surface px-3 text-sm">
          Save
        </button>
        {saved ? (
          <button
            type="button"
            className="h-11 shrink-0 rounded-lg px-2 text-sm text-muted"
            onClick={() => {
              localStorage.removeItem(storageKey);
              onSave("");
            }}
          >
            Clear
          </button>
        ) : null}
      </form>
    </div>
  );
}

function InterestChart({ terms, points }: { terms: string[]; points: { label: string; values: number[] }[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const data = points.map((point) => {
    const row: Record<string, string | number> = { label: point.label };
    point.values.forEach((value, index) => {
      row[`s${index}`] = value;
    });
    return row;
  });
  if (!ready) return <div className="h-24" />;
  return (
    <div className="grid gap-1">
      <div className="h-24 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
            <XAxis dataKey="label" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} interval={8} />
            <YAxis hide domain={[0, 100]} />
            {terms.map((term, index) => (
              <Line key={term} type="monotone" dataKey={`s${index}`} stroke={STROKES[index % STROKES.length]} strokeWidth={2} dot={false} isAnimationActive={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-pretty text-muted">0–100 interest. {terms.join(" · ")}</p>
    </div>
  );
}

function AttentionChart({ series }: { series: AttentionSeries[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const months = series[0]?.points.map((point) => point.month) ?? [];
  const data = months.map((month, index) => {
    const row: Record<string, string | number> = { month: month.slice(2) };
    series.forEach((item, seriesIndex) => {
      const base = item.points[0]?.views || 1;
      const views = item.points[index]?.views;
      if (views != null) row[`s${seriesIndex}`] = Math.round((views / base) * 100);
    });
    return row;
  });
  if (!ready) return <div className="h-24" />;
  return (
    <div className="grid gap-1">
      <div className="h-24 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} interval={5} />
            <YAxis hide domain={["auto", "auto"]} />
            {series.map((item, index) => (
              <Line key={item.term} type="monotone" dataKey={`s${index}`} stroke={STROKES[index % STROKES.length]} strokeWidth={2} dot={false} isAnimationActive={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-pretty text-muted">Index, 100 = first month. {series.map((item) => item.term).join(" · ")}</p>
    </div>
  );
}

function formatCount(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M views`;
  if (value >= 1_000) return `${Math.round(value / 1000)}k views`;
  return `${value} views`;
}

function signedPct(value: number): string {
  const pct = Math.round(value * 100);
  return `${pct > 0 ? "+" : ""}${pct}%`;
}
