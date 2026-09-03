import { describe, expect, it } from "vitest";
import { featuredVisual, visuals } from "../client/src/data/artistData";

describe("P34nuts YouTube catalog", () => {
  it("maps all six confirmed videos to exactly one embedded player slot", () => {
    const ids = [featuredVisual.youtubeId, ...visuals.map((visual) => visual.youtubeId)];

    expect(ids).toHaveLength(6);
    expect(new Set(ids).size).toBe(6);
    expect(ids).toEqual(["h_bt_480qmg", "OBaE9ZOwVwA", "NXtU02ODW9Y", "wgMI-aRa27I", "MCFwHBUY_3I", "dAiglv-XJVw"]);
  });
});
