import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getRelatedTracks, getTrackBySlug } from "../client/src/data/artistData";

const projectRoot = resolve(import.meta.dirname, "..");

describe("More like this rotation", () => {
  it("keeps the default related recommendation contract at three tracks and supports multiple authentic tracks", () => {
    const track = getTrackBySlug("maskenball");
    expect(track).toBeDefined();
    const defaults = getRelatedTracks(track!);
    const pool = getRelatedTracks(track!, 12);
    expect(defaults).toHaveLength(3);
    expect(pool.length).toBeGreaterThan(3);
    expect(pool.every((candidate) => candidate.id !== track!.id)).toBe(true);
    expect(new Set(pool.map((candidate) => candidate.id)).size).toBe(pool.length);
  });

  it("uses the requested ten-second interval and live related content", () => {
    const component = readFileSync(resolve(projectRoot, "client/src/pages/TrackDetail.tsx"), "utf8");
    expect(component).toContain("getRelatedTracks(track, 12)");
    expect(component).toContain("}, 10_000);");
    expect(component).toContain('aria-live="polite"');
  });

  it("moves the mobile close control below the fixed header safe area", () => {
    const css = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
    expect(css).toContain(".track-dialog .dialog-close");
    expect(css).toContain("calc(env(safe-area-inset-top) + 1.85rem)");
    expect(css).toContain("related-track--rotating");
  });
});
