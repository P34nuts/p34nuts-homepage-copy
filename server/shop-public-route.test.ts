import { describe, expect, it } from "vitest";

const configuredShopUrl = process.env.VITE_SHOP_URL?.trim();

describe("configured public shop route", () => {
  it("serves the Noir-Cut storefront at the configured /shop route", async () => {
    expect(configuredShopUrl).toBe("https://p34nuts-merch-store.onrender.com/shop");

    const response = await fetch(configuredShopUrl!, {
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
    });

    expect(response.status).toBe(200);
    expect(response.url).toBe(configuredShopUrl);
    expect(await response.text()).toContain('<div id="root"></div>');
  }, 25_000);
});
