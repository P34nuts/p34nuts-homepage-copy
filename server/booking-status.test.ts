import { describe, expect, it } from "vitest";
import { getBookingErrorMessage } from "../client/src/lib/bookingStatus";

describe("booking status message", () => {
  it("keeps a server-side submission error actionable", () => {
    expect(getBookingErrorMessage("INTERNAL_SERVER_ERROR", "Servermeldung")).toBe("Servermeldung");
  });

  it("replaces technical network errors with a clear direct-contact fallback", () => {
    expect(getBookingErrorMessage(undefined, "Failed to fetch")).toContain("P34nuts@mail.de");
  });
});
