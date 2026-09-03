import { describe, expect, it } from "vitest";
import { getAdjacentTracks, getFrameOfTheDay, getTrackBySlug, releases, themeMap } from "../client/src/data/artistData";

describe("narrative archive data", () => {
  it("maps every curated theme route to a confirmed track", () => {
    expect(themeMap).toHaveLength(5);
    expect(themeMap.every((route) => Boolean(getTrackBySlug(route.trackSlug)))).toBe(true);
  });

  it("selects a deterministic frame without visitor data", () => {
    expect(getFrameOfTheDay(new Date(2026, 0, 1))).toBe(getFrameOfTheDay(new Date(2026, 0, 1)));
    expect(releases).toContain(getFrameOfTheDay(new Date(2026, 0, 1)));
  });

  it("returns only valid chronological neighbors", () => {
    const first = getAdjacentTracks(releases[0]);
    const middle = getAdjacentTracks(releases[10]);
    const last = getAdjacentTracks(releases[releases.length - 1]);
    expect(first.previous).toBeUndefined();
    expect(first.next?.id).toBe("02");
    expect(middle.previous?.id).toBe("10");
    expect(middle.next?.id).toBe("12");
    expect(last.next).toBeUndefined();
  });

  it("keeps artist-confirmed cover corrections on their intended tracks", () => {
    expect(getTrackBySlug("zuendschnur")?.cover).toContain("13-wie-sagt-man-lebewohl_8bf4c002.webp");
    expect(getTrackBySlug("wie-sagt-man-lebewohl")?.cover).toContain("08-zuendschnur_463c2458.webp");
    expect(getTrackBySlug("guten-morgen-sonnenschein")?.cover).toContain("guten-morgen-sonnenschein-original_2036d39d.png");
  });
});
