import { describe, expect, it } from "vitest";
import { assets, latestRelease } from "../client/src/data/artistData";

describe("album intro", () => {
  it("uses the supplied audio source as a direct album intro asset", () => {
    expect(assets.albumIntro).toContain("p34nuts-album-intro_7d20998b.mp3");
  });

  it("replaces the former next-frame copy with the album intro label", () => {
    expect(latestRelease.title).toBe("ALBUM INTRO");
    expect(latestRelease.eyebrow).toContain("Album intro");
  });
});
