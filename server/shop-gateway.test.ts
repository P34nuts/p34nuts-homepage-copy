import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { primaryNav } from "../client/src/data/artistData";
import { isExternalShopHref, shopHref } from "../client/src/lib/shopLink";

const projectRoot = resolve(import.meta.dirname, "..");

describe("hybrid storefront gateway", () => {
  it("exposes the configured external SHOP entry while keeping the internal gateway and commerce boundary intact", () => {
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
    const configuredShopUrl = process.env.VITE_SHOP_URL?.trim();
    const expectedShopHref = configuredShopUrl ? new URL(configuredShopUrl).toString() : "https://p34nuts-merch-store.onrender.com/shop";

    expect(shopHref).toBe(expectedShopHref);
    expect(isExternalShopHref).toBe(true);
    expect(primaryNav).toContainEqual({ label: "Shop", href: shopHref });
    expect(app).toContain('<Route path="/shop"><Suspense fallback={<RouteFallback />}><ShopRedirect /></Suspense></Route>');
    expect(home).toContain('href={shopHref}>Shop</a>');
  });

  it("requires the concrete storefront route when an external shop URL is configured", () => {
    expect(process.env.VITE_SHOP_URL).toBe("https://p34nuts-merch-store.onrender.com/shop");
    expect(shopHref).toBe("https://p34nuts-merch-store.onrender.com/shop");
  });
});
