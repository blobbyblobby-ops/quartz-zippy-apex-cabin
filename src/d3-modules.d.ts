declare module "d3-geo" {
  export type GeoPermissibleObjects = unknown;

  export function geoNaturalEarth1(): {
    fitExtent(extent: [[number, number], [number, number]], object: unknown): void;
  };

  export function geoPath(projection?: unknown): {
    (object: unknown): string | null;
    bounds(object: unknown): [[number, number], [number, number]];
    centroid(object: unknown): [number, number];
  };
}

declare module "d3-selection" {
  export interface TransitionLike {
    duration(ms: number): this;
    call(fn: (...args: any[]) => void, ...args: any[]): this;
  }

  export interface SelectionLike {
    call(fn: (...args: any[]) => void, ...args: any[]): this;
    on(typenames: string, listener: null): this;
    transition(): TransitionLike;
  }

  export function select<T extends Element>(node: T | null): SelectionLike;
}

declare module "d3-zoom" {
  export interface ZoomTransform {
    k: number;
    toString(): string;
    translate(x: number, y: number): ZoomTransform;
    scale(k: number): ZoomTransform;
  }

  export const zoomIdentity: ZoomTransform;

  export interface ZoomBehavior<TElement, TDatum> {
    (selection: unknown): void;
    scaleExtent(extent: [number, number]): this;
    on(type: string, listener: (event: { transform: ZoomTransform }) => void): this;
    transform(selection: unknown, transform: ZoomTransform): void;
    scaleBy(selection: unknown, k: number): void;
  }

  export function zoom<TElement, TDatum>(): ZoomBehavior<TElement, TDatum>;
}

declare module "d3-transition";
