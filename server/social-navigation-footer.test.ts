import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { assets, primaryNav, socialLinks } from "../client/src/data/artistData";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Social navigation and footer mark", () => {
  it("maps Social to the FIND THE SIGNAL anchor and uses the transparent mark in the footer", () => {
    const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");

    expect(primaryNav).toContainEqual({ label: "Social", href: "/#social" });
    expect(home).toContain('id="social" className="social-contact-panel"');
    expect(home).toContain('["send-the-frame", "social"].includes(targetId)');
    expect(home).toContain('className="footer-wordmark"><img src={assets.mark} alt="P34nuts" />');
    expect(assets.mark).toMatch(/^\/manus-storage\/p34nuts-watermark-transparent_/);
    expect(socialLinks).toContainEqual({
      label: "TikTok",
      detail: "@p34nuts_official",
      href: "https://pro.tiktok.com/t/ZG9BFUgVXkFkN-8sClc/",
    });
  });
});
