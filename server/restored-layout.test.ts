import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("restored navigation layout", () => {
  it("places the album intro before the discovery rail", () => {
    const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
    const styles = [
      readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8"),
      readFileSync(resolve(projectRoot, "client/src/noirSequence.css"), "utf8"),
    ].join("\n");

    expect(home.indexOf('className="release-section section-wrap"')).toBeLessThan(home.indexOf("<DiscoveryRail />"));
    expect(home.indexOf("<DiscoveryRail />")).toBeLessThan(home.indexOf('className="manifest-section"'));
    expect(styles).toContain(".discovery-section { position: relative; overflow: hidden; padding: clamp(5rem, 10vw, 10rem) 0; background: #e9e4d9");
    expect(styles).toMatch(/\.manifest-section\s*\{\s*background:\s*#101012;\s*color:\s*#f1eee5;/);
  });

  it("uses the P34nuts hero portrait on music and booking entry routes", () => {
    const music = readFileSync(resolve(projectRoot, "client/src/pages/MusicLanding.tsx"), "utf8");
    const info = readFileSync(resolve(projectRoot, "client/src/pages/InfoPage.tsx"), "utf8");

    expect(music).toContain('src={assets.hero}');
    expect(music).toContain("subpage-intro--portrait");
    expect(info).toContain('kind === "booking"');
    expect(info).toContain('src={assets.hero}');
  });
});
