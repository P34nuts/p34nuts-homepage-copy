import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { assets } from "../client/src/data/artistData";

const projectRoot = resolve(import.meta.dirname, "..");
const publicSiteUrl = "https://p34nutsart-jjmeco2k.manus.space";

describe("Favicon watermark", () => {
  it("uses the transparent P34nuts watermark as the browser-tab icon", () => {
    const document = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

    expect(assets.mark).toBe("/manus-storage/p34nuts-watermark-transparent_a8f921d2.png");
    expect(document).toContain(`<link rel="icon" type="image/png" href="${publicSiteUrl}${assets.mark}" />`);
    expect(document).not.toContain("p34nuts-mark_a631867c.png");
  });
});
