import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("GitHub Pages standalone build", () => {
  it("uses the Vite base path, carries referenced media into the Pages artifact and preserves the public API origin", () => {
    const artistData = readFileSync(resolve(projectRoot, "client/src/data/artistData.ts"), "utf8");
    const packageJson = readFileSync(resolve(projectRoot, "package.json"), "utf8");
    const workflow = readFileSync(resolve(projectRoot, ".github/workflows/deploy-pages.yml"), "utf8");
    const prepareScript = readFileSync(resolve(projectRoot, "scripts/prepare-github-pages.mjs"), "utf8");

    expect(artistData).toContain("const masterAsset = (path: string) => sitePath(path);");
    expect(packageJson).toContain('"build:github-pages": "vite build && node scripts/prepare-github-pages.mjs"');
    expect(workflow).toContain("VITE_BASE_PATH: /${{ github.event.repository.name }}/");
    expect(workflow).toContain("VITE_TRPC_API_ORIGIN: https://p34nuts-merch-store.onrender.com");
    expect(prepareScript).toContain('const mediaRoot = process.env.GITHUB_PAGES_MEDIA_DIR || path.join(projectRoot, "github-pages-media");');
    expect(prepareScript).toContain("Missing GitHub Pages media");
    expect(prepareScript).toContain("index.replaceAll(manusOrigin, siteOrigin)");
  });
});
