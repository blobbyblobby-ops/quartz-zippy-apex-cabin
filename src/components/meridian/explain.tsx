import { sourceById, type Tip } from "@/data/ledger";
import { CircleHelp } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  tip: Tip;
  children: ReactNode;
  className?: string;
};

export function WithTip({ tip, children, className }: Props) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>(0);
  const labelId = useId();

  function show() {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function scheduleClose() {
    if (pinned) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  }

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!pinned) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPinned(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinned]);

  return (
    <div
      ref={wrapRef}
      className={className ? `inline-flex max-w-full items-center gap-0.5 ${className}` : "inline-flex max-w-full items-center gap-0.5"}
      onMouseEnter={show}
      onMouseLeave={scheduleClose}
    >
      {children}
      <button
        type="button"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-md text-muted hover:text-fg"
        aria-label={`Define ${tip.title}`}
        aria-expanded={open}
        aria-describedby={open ? labelId : undefined}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          setPinned((current) => {
            const next = !current;
            setOpen(next);
            return next;
          });
        }}
        onMouseEnter={show}
      >
        <CircleHelp className="size-4" />
      </button>
      {open ? (
        <TipCard
          tip={tip}
          id={labelId}
          anchor={wrapRef.current}
          onEnter={show}
          onLeave={scheduleClose}
        />
      ) : null}
    </div>
  );
}

function TipCard({
  tip,
  id,
  anchor,
  onEnter,
  onLeave,
}: {
  tip: Tip;
  id: string;
  anchor: HTMLElement | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ top: 8, left: 8, width: 320 });

  useEffect(() => {
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
      setBox({ top, left, width });
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

  return createPortal(
    <div
      ref={cardRef}
      id={id}
      role="tooltip"
      style={{ top: box.top, left: box.left, width: box.width }}
      className="fixed z-50 max-h-[70dvh] overflow-y-auto rounded-lg border border-line bg-surface p-3 text-left shadow-none"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <p className="font-serif text-2xl leading-none text-fg">{tip.title}</p>
      <p className="mt-2 text-sm text-pretty text-fg">{tip.definition}</p>
      {tip.words.length > 0 ? (
        <dl className="mt-3 grid gap-2">
          {tip.words.map((item) => (
            <div key={item.word}>
              <dt className="text-sm text-accent">{item.word}</dt>
              <dd className="text-sm text-pretty text-muted">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <p className="mt-3 text-xs tracking-wide text-muted uppercase">Calculation</p>
      <p className="mt-1 text-sm text-pretty text-fg">{tip.calculation}</p>
      <p className="mt-3 text-xs tracking-wide text-muted uppercase">What it is not</p>
      <p className="mt-1 text-sm text-pretty text-muted">{tip.notThis}</p>
      <p className="mt-3 text-xs tracking-wide text-muted uppercase">Why these sources</p>
      <p className="mt-1 text-sm text-pretty text-muted">{tip.why}</p>
      {tip.alsoCited && tip.alsoCited.length > 0 ? (
        <div className="mt-3 grid gap-2">
          <p className="text-xs tracking-wide text-muted uppercase">Also cited, not used for the map</p>
          {tip.journals ? <p className="text-sm text-pretty text-muted">{tip.journals}</p> : null}
          {tip.alsoCited.map((item) => (
            <p key={item.name} className="text-sm text-pretty">
              <span className="text-fg">{item.name}. </span>
              <span className="text-muted">{item.note}</span>
            </p>
          ))}
        </div>
      ) : null}
      {tip.forum ? (
        <div className="mt-3 grid gap-1">
          <p className="text-xs tracking-wide text-muted uppercase">Where this is discussed</p>
          <p className="text-sm text-pretty text-muted">{tip.forum}</p>
        </div>
      ) : null}
      {sources.length > 0 ? (
        <div className="mt-3 grid gap-2 border-t border-line pt-2">
          {sources.map((source) => (
            <p key={source.id} className="text-xs text-pretty text-muted">
              <span className="text-fg">{source.status === "loaded" ? "Loaded. " : source.status === "reference" ? "Reference, not imported. " : source.status === "live" ? "Fetched live. Not used to color the map. " : "Considered, not used. "}</span>
              {source.name}. {source.publisher}. {source.series}. {source.published} {source.why}{" "}
              {source.notUsedBecause ?? ""}{" "}
              {source.url ? (
                <a className="text-accent underline" href={source.url} target="_blank" rel="noreferrer">
                  {source.url.replace(/^https?:\/\//, "")}
                </a>
              ) : null}
            </p>
          ))}
        </div>
      ) : null}
    </div>,
    document.body,
  );
}
