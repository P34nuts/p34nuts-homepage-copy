import { describe, expect, it } from "vitest";
import { artistPortraitSet, assets, gallery } from "../client/src/data/artistData";

describe("first artist portrait set", () => {
  it("registers all ten supplied artist frames exactly once", () => {
    const frames = Object.values(artistPortraitSet);
    expect(frames).toHaveLength(10);
    expect(new Set(frames).size).toBe(10);
  });

  it("assigns the analysed frames to the intended hero, portrait, gallery and booking roles", () => {
    expect(assets.hero).toBe(artistPortraitSet.skylineHero);
    expect(assets.bookingStage).toBe(artistPortraitSet.stageBooking);
    expect(assets.mirror).toBe(artistPortraitSet.studioProfile);
    expect(assets.raw).toBe(artistPortraitSet.rainPressure);
    expect(assets.human).toBe(artistPortraitSet.transitIntrospection);
    expect(gallery.slice(0, 4).map((image) => image.src)).toEqual([
      artistPortraitSet.throneEditorial,
      artistPortraitSet.streetRaw,
      artistPortraitSet.bridgeConcept,
      artistPortraitSet.studioMicrophone,
    ]);
  });
});
