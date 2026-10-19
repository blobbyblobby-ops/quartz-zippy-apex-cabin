import { createServerFn } from "@tanstack/react-start";
import { loadSignals, type LiveBundle } from "./signals.server";

export type SignalRequest = {
  iso3: string;
  placeName: string;
  metricId: string;
  metricLabel: string;
  semrushKey?: string;
  ahrefsKey?: string;
};

function clipKey(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 200) : "";
}

export const getLiveSignals = createServerFn({ method: "POST" })
  .validator((data: SignalRequest) => {
    if (!data || typeof data.metricId !== "string" || typeof data.metricLabel !== "string") {
      throw new Error("Metric is required");
    }
    return {
      iso3: typeof data.iso3 === "string" ? data.iso3.slice(0, 8) : "",
      placeName: typeof data.placeName === "string" ? data.placeName.slice(0, 80) : "",
      metricId: data.metricId.slice(0, 40),
      metricLabel: data.metricLabel.slice(0, 80),
      semrushKey: clipKey(data.semrushKey),
      ahrefsKey: clipKey(data.ahrefsKey),
    };
  })
  .handler(async ({ data }): Promise<LiveBundle> => loadSignals(data));
