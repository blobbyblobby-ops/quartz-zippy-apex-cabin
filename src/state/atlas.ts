import { create } from "zustand";
import type { Lens, Weights } from "@/data/types";

type AtlasState = {
  year: number;
  metricId: string;
  lens: Lens;
  weights: Weights;
  popMin: number;
  scope: string;
  iso: string | null;
  regionId: string | null;
  playing: boolean;
  setYear: (year: number) => void;
  setMetric: (metricId: string) => void;
  setLens: (lens: Lens) => void;
  setWeight: (key: keyof Weights, value: number) => void;
  setPopMin: (popMin: number) => void;
  setScope: (scope: string) => void;
  selectCountry: (iso: string | null) => void;
  selectRegion: (regionId: string | null) => void;
  openPlace: (iso: string, regionId?: string | null) => void;
  setPlaying: (playing: boolean) => void;
};

export const useAtlas = create<AtlasState>((set) => ({
  year: 2026,
  metricId: "lwi",
  lens: "level",
  weights: { official: 70, social: 20, news: 10 },
  popMin: 1_000_000,
  scope: "world",
  iso: null,
  regionId: null,
  playing: false,
  setYear: (year) => set({ year }),
  setMetric: (metricId) => set({ metricId }),
  setLens: (lens) => set({ lens }),
  setWeight: (key, value) => set((state) => ({ weights: { ...state.weights, [key]: value } })),
  setPopMin: (popMin) => set({ popMin }),
  setScope: (scope) => set({ scope, iso: null, regionId: null }),
  selectCountry: (iso) => set({ iso, regionId: null }),
  selectRegion: (regionId) => set({ regionId }),
  openPlace: (iso, regionId = null) => set({ iso, regionId, scope: "world" }),
  setPlaying: (playing) => set({ playing }),
}));
