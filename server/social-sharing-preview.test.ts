import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { assets } from "../client/src/data/artistData";

const projectRoot = resolve(import.meta.dirname, "..");
const publicSiteUrl = "https://p34nutsart-jjmeco2k.manus.space";

describe("Social sharing preview", () => {
  it("uses the current Skyline Hero image for Open Graph and Twitter previews", () => {
    const document = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
    const previewImage = `${publicSiteUrl}${assets.hero}`;

    expect(assets.hero).toBe("/manus-storage/02-skyline-hero_311b4fb6.png");
    expect(document).toContain(`<meta property="og:url" content="${publicSiteUrl}/" />`);
    expect(document).toContain(`<meta property="og:image" content="${previewImage}" />`);
    expect(document).toContain(`<meta name="twitter:image" content="${previewImage}" />`);
    expect(document).toContain(`<link rel="canonical" href="${publicSiteUrl}/" />`);
    expect(document).not.toContain("p34nuts-hero_874f19db.jpg");
  });
});
