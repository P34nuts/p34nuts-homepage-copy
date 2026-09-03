import { describe, expect, it } from "vitest";
import { assets } from "../client/src/data/artistData";

describe("artist brand assets", () => {
  it("uses the supplied title motif and brand mark as the primary identity assets", () => {
    expect(assets.hero).toMatch(/^\/manus-storage\//);
    expect(assets.albumIntro).toMatch(/^\/manus-storage\//);
    expect(assets.hero).toContain("02-skyline-hero_311b4fb6.png");
    expect(assets.mark).toContain("p34nuts-watermark-transparent_a8f921d2.png");
    expect(assets.headerWordmark).toContain("p34nuts-header-wordmark-transparent_40231558.png");
    expect(assets.heroWordmark).toContain("p34nuts-header-wordmark_60ae815f.png");
  });
});
