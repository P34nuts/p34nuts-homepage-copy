import { describe, expect, it } from "vitest";
import { artistPortraitSet02, assets, gallery } from "../client/src/data/artistData";

describe("second artist portrait set", () => {
  it("registers all five supplied extension frames exactly once", () => {
    const frames = Object.values(artistPortraitSet02);
    expect(frames).toHaveLength(5);
    expect(new Set(frames).size).toBe(5);
  });

  it("assigns the current, live, press and archive roles to their analysed frames", () => {
    expect(assets.releaseCover).toBe(artistPortraitSet02.currentFrameDiscipline);
    expect(assets.liveFrame).toBe(artistPortraitSet02.liveHarborSunset);
    expect(assets.pressFrame).toBe(artistPortraitSet02.pressLionSunset);
    expect(gallery.slice(-2).map((image) => image.src)).toEqual([
      artistPortraitSet02.disciplineRain,
      artistPortraitSet02.nightNeonAlley,
    ]);
  });
});
