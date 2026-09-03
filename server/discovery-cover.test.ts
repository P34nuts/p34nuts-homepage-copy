import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { discoveryPaths, getTrackBySlug } from "../client/src/data/artistData";

const projectRoot = resolve(import.meta.dirname, "..");

describe("FIND YOUR ENTRY original covers", () => {
  it("renders the six centrally mapped original covers on the entry cards", () => {
    const component = readFileSync(resolve(projectRoot, "client/src/components/DiscoveryRail.tsx"), "utf8");

    expect(discoveryPaths).toHaveLength(6);
    expect(component).toContain('className="discovery-card-cover"');
    for (const path of discoveryPaths) {
      expect(getTrackBySlug(path.trackSlug)?.cover).toMatch(/^\/manus-storage\//);
    }
  });
});
