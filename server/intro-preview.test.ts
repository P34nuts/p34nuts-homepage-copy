import { describe, expect, it } from "vitest";
import { shouldShowIntroPreview } from "../client/src/lib/introPreview";

describe("intro preview", () => {
  it("only enables the non-linked QA overlay for the explicit intro query", () => {
    expect(shouldShowIntroPreview("?intro=1")).toBe(true);
    expect(shouldShowIntroPreview("?intro=0")).toBe(false);
    expect(shouldShowIntroPreview("")).toBe(false);
  });
});
