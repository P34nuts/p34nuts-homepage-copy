import { describe, expect, it } from "vitest";
import { getRouterBase } from "../client/src/lib/routerBase";

describe("router base", () => {
  it("keeps root deployments free of a duplicate slash", () => {
    expect(getRouterBase("/")).toBe("");
  });

  it("preserves a repository subpath for GitHub Pages", () => {
    expect(getRouterBase("/Mondfall/")).toBe("/Mondfall");
  });
});
