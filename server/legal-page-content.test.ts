import { describe, expect, it } from "vitest";
import { infoPageContent } from "../client/src/pages/InfoPage";

describe("legal page content", () => {
  it("contains the confirmed provider details and concrete privacy sections", () => {
    expect(infoPageContent.impressum.label).toBe("Legal / Impressum");
    expect(infoPageContent.datenschutz.label).toBe("Privacy / Datenschutz");
    expect(infoPageContent.impressum.sections?.find(section => section.heading === "Anbieter / verantwortliche Stelle")?.value).toBe("Frank Horn");
    expect(infoPageContent.impressum.sections?.find(section => section.heading === "Zustellfähige Anschrift")?.value).toContain("88459 Tannheim");
    expect(infoPageContent.impressum.sections?.some(section => section.heading === "Vertretung, Register & Steuerangaben")).toBe(false);
    expect(infoPageContent.datenschutz.sections).toHaveLength(6);
    expect(infoPageContent.datenschutz.sections?.[0]?.copy).toContain("Frank Horn");
    expect(infoPageContent.datenschutz.sections?.some(section => section.copy.includes("Angaben ergänzen"))).toBe(false);
  });
});
