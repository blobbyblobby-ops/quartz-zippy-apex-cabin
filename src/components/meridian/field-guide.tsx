import { useState } from "react";
import { CONFERENCES, INSTITUTIONS, JOURNAL_HOMES, PEOPLE, relates, type Shelf } from "@/data/canon";
import { uiTip } from "@/data/ledger";
import { WithTip } from "./explain";

type Props = {
  metricId: string;
  group: string;
};

export function FieldGuide({ metricId, group }: Props) {
  const [all, setAll] = useState(false);
  const journals = JOURNAL_HOMES[group];
  return (
    <section className="grid gap-3 border-t border-line pt-3">
      <div>
        <WithTip tip={uiTip("field")}>
          <h2 className="text-sm text-muted">Field guide</h2>
        </WithTip>
        <p className="text-sm text-pretty text-muted">
          42 people, 42 institutions, 42 conferences. {all ? "Showing the full shelf." : `Showing who is tagged to ${group}.`} Shelf order is not a citation rank. No Scopus count was run.
        </p>
        <button type="button" className="min-h-11 text-left text-sm text-accent" onClick={() => setAll((value) => !value)}>
          {all ? `Show only ${group}` : "Show all 42 of each"}
        </button>
      </div>
      {journals ? <p className="text-sm text-pretty text-muted">{journals}</p> : null}
      <ShelfList title="People" rows={PEOPLE} group={group} metricId={metricId} all={all} />
      <ShelfList title="Institutions" rows={INSTITUTIONS} group={group} metricId={metricId} all={all} />
      <ShelfList title="Conferences" rows={CONFERENCES} group={group} metricId={metricId} all={all} />
    </section>
  );
}

function ShelfList({
  title,
  rows,
  group,
  metricId,
  all,
}: {
  title: string;
  rows: Shelf[];
  group: string;
  metricId: string;
  all: boolean;
}) {
  const tagged = rows.filter((row) => relates(row, group, metricId));
  const shown = rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => all || relates(row, group, metricId));
  return (
    <div className="grid gap-2">
      <h3 className="text-sm">
        {title} · {tagged.length} of {rows.length} tagged
      </h3>
      {shown.map(({ row, index }) => {
        const on = relates(row, group, metricId);
        return (
          <article key={row.name} className="grid gap-0.5">
            <p className={on ? "text-sm" : "text-sm text-muted"}>
              {index + 1}. {row.name}
            </p>
            <p className="text-xs text-pretty text-muted">
              {row.home}. {row.note}
            </p>
          </article>
        );
      })}
    </div>
  );
}
