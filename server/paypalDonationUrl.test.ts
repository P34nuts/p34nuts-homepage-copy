import { describe, expect, it } from "vitest";

describe("PayPal donation URL", () => {
  it("is an HTTPS URL and responds without a client error", async () => {
    const rawUrl = process.env.VITE_PAYPAL_DONATION_URL;
    expect(rawUrl).toBeTruthy();

    const url = new URL(rawUrl!);
    expect(url.protocol).toBe("https:");

    const response = await fetch(url, { redirect: "manual" });
    expect(response.status).toBeLessThan(400);
  }, 20_000);
});

export {};
