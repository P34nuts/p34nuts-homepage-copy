import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { infoPageContent } from "../client/src/pages/InfoPage";

const projectRoot = resolve(import.meta.dirname, "..");

describe("booking CTA anchor", () => {
  it("targets the SEND THE FRAME form rather than the top of the contact section", () => {
    const bookingForm = readFileSync(resolve(projectRoot, "client/src/components/BookingForm.tsx"), "utf8");

    expect(infoPageContent.booking.href).toBe("/#send-the-frame");
    expect(bookingForm).toContain('id="send-the-frame"');
    const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain('["send-the-frame", "social"].includes(targetId)');
    expect(home).toContain("document.getElementById(targetId)?.scrollIntoView");
  });
});
