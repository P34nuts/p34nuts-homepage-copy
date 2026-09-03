import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { faqItems } from "../client/src/data/faqData";
import { guestbookEntrySchema } from "./routers";

describe("guestbook safeguards", () => {
  it("accepts a public name, short message and optional empty honeypot", () => {
    expect(guestbookEntrySchema.parse({ name: "Mika", message: "Danke für die Musik", website: "" })).toEqual({
      name: "Mika",
      message: "Danke für die Musik",
      website: "",
    });
  });

  it("rejects a filled honeypot and oversized messages", () => {
    expect(() => guestbookEntrySchema.parse({ name: "M", message: "Guter Vibe", website: "" })).toThrow();
    expect(() => guestbookEntrySchema.parse({ name: "Mika", message: "Guter Vibe", website: "https://spam.example" })).toThrow();
    expect(() => guestbookEntrySchema.parse({ name: "Mika", message: "x".repeat(601) })).toThrow();
  });

  it("publishes new messages immediately and exposes the reaction band", () => {
    const router = readFileSync(path.join(process.cwd(), "server/routers.ts"), "utf8");
    const home = readFileSync(path.join(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(router).toContain('status: "approved"');
    expect(router).toContain('"heart", "love", "laugh", "fire", "thumbsUp", "wow", "sad"');
    expect(home).toContain("Dein Eintrag wird direkt sichtbar");
    expect(home).toContain("guestbook-reactions");
    expect(home).toContain("guestbook-name");
    expect(home).toContain('timeStyle: "short"');
    expect(home).toContain("guestbook-entry-name");
    expect(readFileSync(path.join(process.cwd(), "client/src/index.css"), "utf8")).toContain("overflow-y: auto");
  });

  it("keeps the FAQ corpus complete without fabricated guest content", () => {
    expect(faqItems).toHaveLength(21);
    expect(faqItems.every(item => item.question.length > 10 && item.answer.length > 20)).toBe(true);
    expect(faqItems.some(item => /review|rating|testimonial/i.test(`${item.question} ${item.answer}`))).toBe(false);
  });
});
