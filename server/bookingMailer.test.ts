import { describe, expect, it } from "vitest";
import { createBookingMail } from "./bookingMailer";

describe("booking mail", () => {
  it("addresses the booking inbox and keeps the enquirer as the reply-to contact", () => {
    const mail = createBookingMail({
      name: "Testveranstalter",
      email: "kontakt@example.com",
      eventDate: "2026-12-01",
      venue: "Testhalle",
      location: "Berlin",
      eventFormat: "Clubshow",
    });

    expect(mail.to).toBe("P34nuts@mail.de");
    expect(mail.replyTo).toBe("kontakt@example.com");
    expect(mail.subject).toContain("2026-12-01");
    expect(mail.text).toContain("Kapazität: nicht angegeben");
  });
});
