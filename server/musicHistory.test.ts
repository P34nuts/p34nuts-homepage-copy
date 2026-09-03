import { describe, expect, it } from "vitest";
import { mergeRecentTracks } from "../client/src/lib/musicHistory";

const stone = { id: "01", slug: "dein-name-auf-nem-stein", title: "DEIN NAME AUF NEM STEIN", mood: "Night / memory", coverStyle: "track-stone" };
const was = { id: "02", slug: "was", title: "WAS?", mood: "Academic / absurd", coverStyle: "track-was" };

describe("local music history", () => {
  it("keeps the newest track first and avoids duplicate routes", () => {
    expect(mergeRecentTracks([stone], was).map((track) => track.slug)).toEqual(["was", "dein-name-auf-nem-stein"]);
    expect(mergeRecentTracks([stone, was], stone).map((track) => track.slug)).toEqual(["dein-name-auf-nem-stein", "was"]);
  });
});
