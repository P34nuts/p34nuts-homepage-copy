import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Header home image consistency", () => {
  it("uses the shared P34nuts header image for every route-level home link", () => {
    const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
    const music = readFileSync(resolve(projectRoot, "client/src/pages/MusicLanding.tsx"), "utf8");
    const info = readFileSync(resolve(projectRoot, "client/src/pages/InfoPage.tsx"), "utf8");
    const detail = readFileSync(resolve(projectRoot, "client/src/pages/TrackDetail.tsx"), "utf8");

    [home, music, info, detail].forEach((page) => {
      expect(page).toContain('src={assets.headerWordmark}');
      expect(page).toContain('className="brand-lockup brand-home-wordmark"');
    });
    expect(detail).not.toContain('<span><b>P34</b><i>nuts</i></span>');
  });
});
