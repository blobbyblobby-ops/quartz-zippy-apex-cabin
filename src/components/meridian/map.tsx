import { geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { select } from "d3-selection";
import { zoom, zoomIdentity, type ZoomBehavior } from "d3-zoom";
import { Minus, Plus } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "d3-transition";
import { uiTip } from "@/data/ledger";
import { WithTip } from "./explain";
import { circleRing, focusBBox } from "@/data/regions";
import { PLACE_BY } from "@/data/places";
import type { Lens, Region } from "@/data/types";

export type MapFeature = {
  type: "Feature";
  geometry: GeoPermissibleObjects;
  properties: { iso: string; name: string };
};

type Props = {
  features: MapFeature[] | null;
  failed: boolean;
  colors: Record<string, { fill: string; opacity: number }>;
  selectedIso: string | null;
  selectedRegionId: string | null;
  regions: Region[];
  regionFill: Record<string, string>;
  caption: string;
  lens: Lens;
  onSelectCountry: (iso: string) => void;
  onSelectRegion: (id: string) => void;
  onClear: () => void;
};

export function AtlasMap({
  features,
  failed,
  colors,
  selectedIso,
  selectedRegionId,
  regions,
  regionFill,
  caption,
  lens,
  onSelectCountry,
  onSelectRegion,
  onClear,
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const kRef = useRef(1);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const watch = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ w: Math.max(0, Math.round(rect.width)), h: Math.max(0, Math.round(rect.height)) });
    });
    watch.observe(el);
    return () => watch.disconnect();
  }, []);

  const geo = useMemo(() => {
    if (!features || size.w < 40 || size.h < 40) return null;
    const projection = geoNaturalEarth1();
    const frame = {
      type: "Polygon" as const,
      coordinates: [
        [
          [-168, -50],
          [178, -50],
          [178, 76],
          [-168, 76],
          [-168, -50],
        ],
      ],
    };
    projection.fitExtent(
      [
        [14, 14],
        [size.w - 14, size.h - 14],
      ],
      frame,
    );
    const path = geoPath(projection);
    const countries = features
      .map((feature) => ({
        iso: feature.properties.iso,
        name: feature.properties.name,
        d: path(feature as unknown as GeoPermissibleObjects) ?? "",
      }))
      .filter((country) => country.d);
    return {
      path,
      sphere: path({ type: "Sphere" }) ?? "",
      countries,
    };
  }, [features, size.w, size.h]);

  const regionPaths = useMemo(() => {
    if (!geo) return [];
    return regions
      .map((region) => {
        const feature = {
          type: "Feature" as const,
          properties: {},
          geometry: { type: "Polygon" as const, coordinates: [circleRing(region.lon, region.lat, region.km)] },
        };
        const d = geo.path(feature as unknown as GeoPermissibleObjects) ?? "";
        const center = geo.path.centroid(feature as unknown as GeoPermissibleObjects);
        return { region, d, x: center[0], y: center[1] };
      })
      .filter((row) => row.d && Number.isFinite(row.x) && Number.isFinite(row.y));
  }, [geo, regions]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !geo) return;
    const behavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 12])
      .on("zoom", (event) => {
        kRef.current = event.transform.k;
        gRef.current?.setAttribute("transform", event.transform.toString());
        gRef.current?.querySelectorAll<SVGGElement>("[data-label]").forEach((node) => {
          node.setAttribute("transform", `scale(${1 / event.transform.k})`);
        });
      });
    zoomRef.current = behavior;
    const root = select(svg);
    root.call(behavior);
    root.on("dblclick.zoom", null);
    return () => {
      root.on(".zoom", null);
    };
  }, [geo]);

  useEffect(() => {
    const svg = svgRef.current;
    const behavior = zoomRef.current;
    if (!svg || !behavior || !geo) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = select(svg);
    if (!selectedIso) {
      root.transition().duration(reduced ? 0 : 650).call(behavior.transform, zoomIdentity);
      return;
    }
    let bounds: [[number, number], [number, number]] | null = null;
    let maxScale = 8;
    if (selectedRegionId) {
      const hit = regionPaths.find((row) => row.region.id === selectedRegionId);
      if (hit) {
        const feature = {
          type: "Feature" as const,
          properties: {},
          geometry: {
            type: "Polygon" as const,
            coordinates: [circleRing(hit.region.lon, hit.region.lat, hit.region.km)],
          },
        };
        bounds = geo.path.bounds(feature as unknown as GeoPermissibleObjects);
        maxScale = 10;
      }
    }
    if (!bounds) {
      const place = PLACE_BY[selectedIso];
      if (!place) return;
      const [x0, y0, x1, y1] = focusBBox(place);
      bounds = geo.path.bounds({
        type: "Polygon",
        coordinates: [
          [
            [x0, y0],
            [x1, y0],
            [x1, y1],
            [x0, y1],
            [x0, y0],
          ],
        ],
      });
    }
    if (!bounds) return;
    const [[left, top], [right, bottom]] = bounds;
    const dx = Math.max(16, right - left);
    const dy = Math.max(16, bottom - top);
    const scale = Math.max(1, Math.min(maxScale, 0.76 / Math.max(dx / size.w, dy / size.h)));
    const tx = size.w / 2 - (scale * (left + right)) / 2;
    const ty = size.h / 2 - (scale * (top + bottom)) / 2;
    root
      .transition()
      .duration(reduced ? 0 : 700)
      .call(behavior.transform, zoomIdentity.translate(tx, ty).scale(scale));
  }, [geo, selectedIso, selectedRegionId, regionPaths, size.w, size.h]);

  useLayoutEffect(() => {
    const k = kRef.current || 1;
    gRef.current?.querySelectorAll<SVGGElement>("[data-label]").forEach((node) => {
      node.setAttribute("transform", `scale(${1 / k})`);
    });
  });

  const hoverName = hover ? PLACE_BY[hover]?.name : null;

  return (
    <div ref={boxRef} className="absolute inset-0 bg-water">
      {geo ? (
        <svg
          ref={svgRef}
          className="h-full w-full touch-none"
          role="img"
          aria-label="World map. Choose a territory to open its regions."
        >
          <g ref={gRef}>
            <path d={geo.sphere} fill="var(--color-water)" stroke="var(--color-line)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            {geo.countries.map((country) => {
              const paint = colors[country.iso];
              const active = country.iso === selectedIso || country.iso === hover;
              return (
                <path
                  key={country.iso}
                  d={country.d}
                  fill={paint?.fill ?? "var(--color-surface)"}
                  fillOpacity={paint?.opacity ?? 0.35}
                  stroke={active ? "var(--color-accent)" : "var(--color-bg)"}
                  strokeWidth={country.iso === selectedIso ? 1.8 : 0.7}
                  vectorEffect="non-scaling-stroke"
                  className="cursor-pointer"
                  onMouseEnter={() => setHover(country.iso)}
                  onMouseLeave={() => setHover((current) => (current === country.iso ? null : current))}
                  onClick={() => onSelectCountry(country.iso)}
                >
                  <title>{country.name}</title>
                </path>
              );
            })}
            {regionPaths.map(({ region, d, x, y }) => {
              const selected = region.id === selectedRegionId;
              return (
                <g key={region.id}>
                  <path
                    d={d}
                    fill={regionFill[region.id] ?? "transparent"}
                    fillOpacity={selected ? 0.72 : 0.28}
                    stroke={selected ? "var(--color-accent)" : "var(--color-fg)"}
                    strokeWidth={selected ? 2 : 1.1}
                    vectorEffect="non-scaling-stroke"
                    className="cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelectRegion(region.id);
                    }}
                  >
                    <title>{region.name}</title>
                  </path>
                  <g transform={`translate(${x}, ${y})`}>
                    <g data-label>
                      <text
                        textAnchor="middle"
                        className="pointer-events-none fill-fg font-sans text-xs"
                        stroke="var(--color-bg)"
                        strokeWidth={3.5}
                        paintOrder="stroke"
                      >
                        {region.name}
                      </text>
                    </g>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      ) : (
        <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted">
          {failed ? "Coastlines didn't load. Filters and rankings still work." : "Drawing coastlines…"}
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
        <div className="pointer-events-auto max-w-xs rounded-lg bg-bg/90 px-3 py-2 text-sm text-fg">
          <WithTip tip={uiTip("map")}>
            <p className="text-pretty">{caption}</p>
          </WithTip>
          {hoverName ? <p className="mt-1 text-muted">{hoverName}</p> : null}
        </div>
        {selectedIso ? (
          <button type="button" onClick={onClear} className="pointer-events-auto min-h-11 rounded-lg bg-surface px-3 text-sm text-fg">
            World view
          </button>
        ) : null}
      </div>

      <div className="pointer-events-auto absolute bottom-3 left-3 max-w-64 rounded-lg bg-surface px-3 py-2">
        <div
          className="h-2 rounded-full"
          style={{
            background:
              lens === "level"
                ? "linear-gradient(90deg, var(--color-ramp-low), var(--color-ramp-mid), var(--color-accent))"
                : "linear-gradient(90deg, var(--color-ramp-neg), var(--color-flat), var(--color-accent))",
          }}
        />
        <WithTip tip={uiTip("legend")}>
          <p className="mt-1 text-xs text-muted">{lens === "level" ? "Low reading to high" : "Fell, then rose"}</p>
        </WithTip>
        <WithTip tip={uiTip("map")}>
          <p className="text-xs text-muted">Boundaries · Natural Earth</p>
        </WithTip>
      </div>

      <div className="absolute right-3 bottom-3 flex flex-col gap-2">
        <WithTip tip={uiTip("zoom")}>
          <span className="sr-only">Zoom</span>
        </WithTip>
        <button type="button" aria-label="Zoom in" className="grid h-11 w-11 place-items-center rounded-lg bg-surface text-fg" onClick={() => scaleBy(svgRef.current, zoomRef.current, 1.35)}>
          <Plus className="size-5" />
        </button>
        <button type="button" aria-label="Zoom out" className="grid h-11 w-11 place-items-center rounded-lg bg-surface text-fg" onClick={() => scaleBy(svgRef.current, zoomRef.current, 1 / 1.35)}>
          <Minus className="size-5" />
        </button>
      </div>
    </div>
  );
}

function scaleBy(svg: SVGSVGElement | null, behavior: ZoomBehavior<SVGSVGElement, unknown> | null, factor: number) {
  if (!svg || !behavior) return;
  select(svg).transition().duration(180).call(behavior.scaleBy, factor);
}
