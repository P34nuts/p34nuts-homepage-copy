import { describe, expect, it } from "vitest";
import { createBookingRateLimiter, getRequestFingerprint } from "./bookingRateLimit";

describe("booking rate limiter", () => {
  it("permits a bounded number of submissions per request fingerprint and resets the window", () => {
    const limiter = createBookingRateLimiter(2, 1_000);
    expect(limiter.canAccept("203.0.113.7", 100)).toBe(true);
    expect(limiter.canAccept("203.0.113.7", 200)).toBe(true);
    expect(limiter.canAccept("203.0.113.7", 300)).toBe(false);
    expect(limiter.canAccept("203.0.113.7", 1_101)).toBe(true);
  });

  it("prefers the proxied client address where available", () => {
    expect(getRequestFingerprint({ headers: { "x-forwarded-for": "198.51.100.4, 10.0.0.1" } })).toBe("198.51.100.4");
  });
});
