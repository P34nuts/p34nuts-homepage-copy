import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const trackDetail = readFileSync(new URL("../client/src/pages/TrackDetail.tsx", import.meta.url), "utf8");
const app = readFileSync(new URL("../client/src/App.tsx", import.meta.url), "utf8");
const discoveryRail = readFileSync(new URL("../client/src/components/DiscoveryRail.tsx", import.meta.url), "utf8");

describe("track detail scroll reset", () => {
  it("resets retained scroll globally and only after an intentional rotating discovery-card click", () => {
    expect(trackDetail).toContain('window.scrollTo({ top: 0, left: 0, behavior: "auto" });');
    expect(app).toContain('window.history.scrollRestoration = "manual"');
    expect(app).toContain("useLayoutEffect");
    expect(discoveryRail).not.toContain("onPointerDown={prepareTopNavigation}");
    expect(discoveryRail).toContain("onClick={handleDiscoveryClick}");
    expect(discoveryRail).toContain("setNavigationLocked(true)");
  });
});
