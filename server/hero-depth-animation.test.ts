import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Hero depth animation", () => {
  it("reveals the artist before the skyline and preserves reduced-motion behavior", () => {
    const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
    const css = readFileSync(resolve(projectRoot, "client/src/noirSequence.css"), "utf8");

    expect(home).toContain('className="hero-image hero-depth-image hero-skyline-layer"');
    expect(home).toContain('className="hero-image hero-depth-image hero-subject-layer"');
    expect(home).toContain('delay: reduceMotion ? 0 : 1.15');
    expect(home).toContain('duration: reduceMotion ? 0 : 0.46');
    expect(home).toContain('aria-hidden="true"');
    expect(css).toContain(".hero-skyline-layer");
    expect(css).toContain(".hero-subject-layer");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
