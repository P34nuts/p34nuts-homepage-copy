import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Manifest archive link contrast", () => {
  it("uses black archive-link text on a light contrast surface", () => {
    const styles = readFileSync(resolve(projectRoot, "client/src/noirSequence.css"), "utf8");

    expect(styles).toContain(".manifest-section .text-link");
    expect(styles).toContain("background: #e9e4d9;");
    expect(styles).toContain("color: #101012;");
  });
});
