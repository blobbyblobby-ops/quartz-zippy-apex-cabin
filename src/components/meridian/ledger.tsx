import { LEDGER_COUNTS, LOADED_FILES, NOT_SEARCHED, SEARCHES, SOURCES, UI, metricTip, sourceById } from "@/data/ledger";
import { METRICS } from "@/data/metrics";
import type { AddedType } from "@/state/layers";
import { useEffect, useState } from "react";

type Props = {
  added: AddedType[];
  onAdd: (row: AddedType) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
};

export function Ledger({ added, onAdd, onRemove, onClose }: Props) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-bg/80 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="ledger-title">
      <div className="scroll-thin flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-y-auto rounded-t-lg border border-line bg-bg p-4 sm:rounded-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted">One page · method</p>
            <h2 id="ledger-title" className="font-serif text-4xl leading-none">
              Sources and method
            </h2>
          </div>
          <button type="button" onClick={onClose} className="min-h-11 rounded-lg bg-surface px-3 text-sm">
            Close
          </button>
        </div>

        <p className="mt-3 text-sm text-pretty text-muted">{UI.ledger.definition}</p>

        <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Count label="Metrics defined" value={LEDGER_COUNTS.metrics} />
          <Count label="Sources named" value={LEDGER_COUNTS.sourcesNamed} />
          <Count label="Loaded into the page" value={LEDGER_COUNTS.loadedSources} />
          <Count label="References, not imported" value={LEDGER_COUNTS.referenceSources} />
          <Count label="Rejected" value={LEDGER_COUNTS.rejectedSources} />
          <Count label="Searches logged" value={LEDGER_COUNTS.searchesLogged} />
          <Count label="Country anchors" value={LEDGER_COUNTS.countryAnchors} />
          <Count label="Economies with macro pins" value={LEDGER_COUNTS.pinnedEconomies} />
        </dl>

        <section className="mt-6 grid gap-2">
          <h3 className="text-sm text-muted">What is actually loaded</h3>
          <p className="text-sm text-pretty">
            {LEDGER_COUNTS.loadedFiles} files decide the map. Moving a slider does not call a database. The briefing's live panel does call Google Trends, Google News, Wikipedia, the World Bank, and Hacker News, and it leaves Semrush and Ahrefs blank unless a key is present. Those responses are not written back into the anchors.
          </p>
          <ul className="grid gap-2">
            {LOADED_FILES.map((line) => (
              <li key={line} className="text-sm text-pretty text-muted">
                {line}
              </li>
            ))}
          </ul>
          <p className="text-sm text-pretty text-muted">
            About {LEDGER_COUNTS.countryAnchors} countries override their subregional median ({LEDGER_COUNTS.subregionalMedians} medians). Everyone else inherits the median on purpose. Macro pins cover {LEDGER_COUNTS.pinnedEconomies} economies for selected years only. 2026 pins are a nowcast written into the model. They are not a row-level copy of the IMF World Economic Outlook published 12–13 October 2026.
          </p>
        </section>

        <section className="mt-6 grid gap-3">
          <h3 className="text-sm text-muted">How the page was checked, and what was never searched</h3>
          <p className="text-sm text-pretty">
            The searches below were run on 19 October 2026 to pin citations for this ledger. They are not a claim that each anchor was copied out of that search. {LEDGER_COUNTS.notSearchedNotes} gaps are listed so a paper count is not invented.
          </p>
          {SEARCHES.map((hit) => (
            <article key={hit.query} className="grid gap-1 border-t border-line pt-3">
              <p className="text-xs text-accent">{hit.when} · {hit.engine}</p>
              <p className="text-sm">{hit.query}</p>
              <p className="text-sm text-pretty text-muted">Opened: {hit.opened}</p>
              <p className="text-sm text-pretty text-muted">Kept: {hit.kept}</p>
            </article>
          ))}
          <ul className="grid gap-2">
            {NOT_SEARCHED.map((line) => (
              <li key={line} className="text-sm text-pretty text-muted">
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 grid gap-3">
          <h3 className="text-sm text-muted">Every named source, and why it won or lost</h3>
          {SOURCES.map((source) => (
            <article key={source.id} className="grid gap-1 border-t border-line pt-3">
              <p className="text-xs text-accent">
                {source.status === "loaded" ? "Loaded" : source.status === "reference" ? "Reference, not imported" : source.status === "live" ? "Live, not in the map" : "Rejected"}
              </p>
              <h4 className="text-base">{source.name}</h4>
              <p className="text-sm text-pretty text-muted">
                {source.publisher}. {source.series}.
              </p>
              <p className="text-xs text-pretty text-muted">{source.published}</p>
              <p className="text-sm text-pretty">{source.why}</p>
              {source.notUsedBecause ? <p className="text-sm text-pretty text-muted">{source.notUsedBecause}</p> : null}
              {source.url ? (
                <a className="text-sm text-accent underline" href={source.url} target="_blank" rel="noreferrer">
                  {source.url}
                </a>
              ) : null}
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-3">
          <h3 className="text-sm text-muted">Every metric, in one place</h3>
          {METRICS.map((metric) => {
            const tip = metricTip(metric);
            const cites = tip.sourceIds.map((id) => sourceById(id)?.name ?? id).join("; ");
            return (
              <article key={metric.id} className="grid gap-1 border-t border-line pt-3">
                <p className="text-xs text-accent">{metric.group}</p>
                <h4 className="text-base">{metric.label}</h4>
                <p className="text-sm text-pretty">{tip.definition}</p>
                <p className="text-sm text-pretty text-muted">{tip.calculation}</p>
                <p className="text-sm text-pretty text-muted">{tip.notThis}</p>
                <p className="text-xs text-pretty text-muted">Sources: {cites}.</p>
              </article>
            );
          })}
        </section>

        <AddForm added={added} onAdd={onAdd} onRemove={onRemove} />
      </div>
    </div>
  );
}

function Count({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-surface px-2 py-2">
      <p className="font-serif text-2xl leading-none tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-pretty text-muted">{label}</p>
    </div>
  );
}

function AddForm({ added, onAdd, onRemove }: { added: AddedType[]; onAdd: (row: AddedType) => void; onRemove: (id: string) => void }) {
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState<AddedType["kind"]>("news");
  const [definition, setDefinition] = useState("");
  const [calculation, setCalculation] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [published, setPublished] = useState("");
  const [why, setWhy] = useState("");
  const [query, setQuery] = useState("");
  const [baseId, setBaseId] = useState("lwi");
  const [error, setError] = useState("");

  return (
    <section className="mt-6 grid gap-3 border-t border-line pt-4">
      <h3 className="text-sm text-muted">Add a news or data type</h3>
      <p className="text-sm text-pretty text-muted">
        This stays on one page. The new type is saved in this browser and copied into a share link. The map paints a stand-in metric you choose, and the briefing says so. The page does not fetch the URL. That would pretend a series exists before it is wired.
      </p>
      <label className="grid gap-1 text-sm">
        Name
        <input value={label} onChange={(event) => setLabel(event.target.value)} className="h-11 rounded-lg border border-line bg-surface px-3" placeholder="Port calls, or local rent filings" />
      </label>
      <label className="grid gap-1 text-sm">
        Kind
        <select value={kind} onChange={(event) => setKind(event.target.value as AddedType["kind"])} className="h-11 rounded-lg border border-line bg-surface px-3">
          <option value="news">News type</option>
          <option value="statistic">Statistic</option>
          <option value="index">Index</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        Definition, including the words in the name
        <textarea value={definition} onChange={(event) => setDefinition(event.target.value)} className="min-h-20 rounded-lg border border-line bg-surface px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm">
        How it should be calculated, once a series exists
        <textarea value={calculation} onChange={(event) => setCalculation(event.target.value)} className="min-h-16 rounded-lg border border-line bg-surface px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm">
        Source
        <input value={sourceName} onChange={(event) => setSourceName(event.target.value)} className="h-11 rounded-lg border border-line bg-surface px-3" />
      </label>
      <label className="grid gap-1 text-sm">
        Source URL
        <input value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} className="h-11 rounded-lg border border-line bg-surface px-3" placeholder="https://" />
      </label>
      <label className="grid gap-1 text-sm">
        Date published
        <input value={published} onChange={(event) => setPublished(event.target.value)} className="h-11 rounded-lg border border-line bg-surface px-3" placeholder="13 October 2026" />
      </label>
      <label className="grid gap-1 text-sm">
        Why this source, and what you rejected
        <textarea value={why} onChange={(event) => setWhy(event.target.value)} className="min-h-16 rounded-lg border border-line bg-surface px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm">
        Query, engine, and what you opened
        <textarea value={query} onChange={(event) => setQuery(event.target.value)} className="min-h-16 rounded-lg border border-line bg-surface px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm">
        Stand-in already on the map
        <select value={baseId} onChange={(event) => setBaseId(event.target.value)} className="h-11 rounded-lg border border-line bg-surface px-3">
          {METRICS.map((metric) => (
            <option key={metric.id} value={metric.id}>
              {metric.group} · {metric.label}
            </option>
          ))}
        </select>
      </label>
      {error ? <p className="text-sm text-accent">{error}</p> : null}
      <button
        type="button"
        className="min-h-11 rounded-lg bg-accent px-3 text-sm text-accent-ink"
        onClick={() => {
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
            baseId,
          });
          setLabel("");
          setDefinition("");
          setCalculation("");
          setSourceName("");
          setSourceUrl("");
          setPublished("");
          setWhy("");
          setQuery("");
        }}
      >
        Add this type to the page
      </button>
      {added.length > 0 ? (
        <ul className="grid gap-2">
          {added.map((row) => (
            <li key={row.id} className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate">{row.label}</span>
              <button type="button" className="min-h-11 shrink-0 text-muted" onClick={() => onRemove(row.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
