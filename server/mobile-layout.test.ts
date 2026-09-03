import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
const trackDialog = readFileSync(
  resolve(process.cwd(), "client/src/components/TrackDialog.tsx"),
  "utf8",
);

describe("mobile homepage layout resilience", () => {
  it("keeps the track dialog inside the viewport with an internal scroll area", () => {
    expect(trackDialog).toContain('className="track-dialog"');
    expect(css).toContain("max-height: calc(100dvh - 1rem)");
    expect(css).toContain("overflow-y: auto");
    expect(css).toContain("overscroll-behavior: contain");
    expect(css).toContain("grid-template-columns: 1fr;");
  });

  it("stacks the contrast heading and copy on narrow screens", () => {
    expect(css).toContain(".contrast-head {");
    expect(css).toContain("grid-template-columns: minmax(0, 1fr);");
    expect(css).toContain(".contrast-head h2,");
    expect(css).toContain("max-width: none;");
  });
});
