import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const page = readFileSync(resolve(process.cwd(), "client/src/pages/ControlCenter.tsx"), "utf8");

describe("GitHub Control Center", () => {
  it("is registered at a separate route without replacing public routes", () => {
    expect(app).toContain('const ControlCenter = lazy(() => import("@/pages/ControlCenter"));');
    expect(app).toContain('<Route path="/control">');
    expect(app).toContain('<Route path="/" component={Home} />');
    expect(app).toContain('<Route path="/shop">');
  });

  it("exposes only safe editing paths and states the backend boundary", () => {
    expect(page).toContain("/edit/main/client/src/data/artistData.ts");
    expect(page).toContain("/actions/workflows/deploy-pages.yml");
    expect(page).not.toContain("/actions/workflows/deploy-root-pages.yml");
    expect(page).toContain("/file?");
    expect(page).toContain("/commit");
    expect(page).toContain("Lokale Vorschau vor dem Commit");
    expect(page).toContain("/admin/printful-catalog");
    expect(page).toContain("Private GitHub-, Stripe- und Printful-Daten");
    expect(page).toContain("Private GitHub-App-Schlüssel werden niemals in diesem Pages-Bundle ausgeliefert");
    expect(page).not.toContain("P34NUTS_GITHUB_APP_PRIVATE_KEY");
  });
});
