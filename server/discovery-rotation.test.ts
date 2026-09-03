import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  DISCOVERY_ROTATION_INTERVAL_MS,
  DISCOVERY_SLOT_COUNT,
  discoveryPaths,
  getRotatingDiscoveryPaths,
  releases,
} from "../client/src/data/artistData";

const projectRoot = resolve(import.meta.dirname, "..");

describe("FIND YOUR ENTRY rotation", () => {
  it("creates six unique tracks and replaces the current six when the catalog allows it", () => {
    const previousSlugs = discoveryPaths.map((path) => path.trackSlug);
    const nextPaths = getRotatingDiscoveryPaths(previousSlugs, () => 0);

    expect(nextPaths).toHaveLength(DISCOVERY_SLOT_COUNT);
    expect(new Set(nextPaths.map((path) => path.trackSlug)).size).toBe(DISCOVERY_SLOT_COUNT);
    expect(nextPaths.every((path) => releases.some((track) => track.slug === path.trackSlug))).toBe(true);
    expect(nextPaths.every((path) => !previousSlugs.includes(path.trackSlug))).toBe(true);
  });

  it("uses a ten-second client-side interval and does not rotate for reduced motion", () => {
    const component = readFileSync(resolve(projectRoot, "client/src/components/DiscoveryRail.tsx"), "utf8");

    expect(DISCOVERY_ROTATION_INTERVAL_MS).toBe(10_000);
    expect(component).toContain("useReducedMotion");
    expect(component).toContain("if (reduceMotion) {");
    expect(component).toContain("getRotatingDiscoveryPaths");
  });

  it("flips cards one at a time, swaps each song at the midpoint, and keeps motion off for reduced motion", () => {
    const component = readFileSync(resolve(projectRoot, "client/src/components/DiscoveryRail.tsx"), "utf8");
    const sequenceCss = readFileSync(resolve(projectRoot, "client/src/noirSequence.css"), "utf8");

    expect(component).toContain("index * 500");
    expect(component).toContain("setFlippingSlots");
    expect(component).toContain("}, 280);");
    expect(component).toContain("}, 560);");
    expect(component).toContain("if (reduceMotion)");
    expect(sequenceCss).toContain("discovery-card-flip");
    expect(sequenceCss).toContain("rotateY(-90deg)");
  });
});
