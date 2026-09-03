import { describe, expect, it } from "vitest";

describe("VITE_SHOP_URL", () => {
  it("verweist auf eine erreichbare HTTPS-Storefront mit Health-Endpunkt", async () => {
    const configuredShopUrl = process.env.VITE_SHOP_URL;
    const shopUrl = new URL(configuredShopUrl!);

    expect(configuredShopUrl).toBe("https://p34nuts-merch-store.onrender.com/shop");
    expect(shopUrl.protocol).toBe("https:");
    expect(shopUrl.pathname).toBe("/shop");

    const response = await fetch(new URL("/healthz", shopUrl.origin));

    expect(response.ok).toBe(true);
  });
});
