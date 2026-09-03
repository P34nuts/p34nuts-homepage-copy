import { describe, expect, it } from "vitest";
import { bookingSubmissionSchema } from "./routers";

const validSubmission = {
  name: "Veranstaltung Muster",
  email: "kontakt@example.com",
  eventDate: "2026-10-10",
  venue: "Musterhalle",
  location: "Berlin, Deutschland",
  eventFormat: "Clubshow",
  consent: true as const,
};

describe("bookingSubmissionSchema", () => {
  it("accepts a complete public booking submission", () => {
    expect(bookingSubmissionSchema.safeParse(validSubmission).success).toBe(true);
  });

  it("requires consent and a valid contact email", () => {
    expect(bookingSubmissionSchema.safeParse({ ...validSubmission, consent: false }).success).toBe(false);
    expect(bookingSubmissionSchema.safeParse({ ...validSubmission, email: "not-an-email" }).success).toBe(false);
  });
});
