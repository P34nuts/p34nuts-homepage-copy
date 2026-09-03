import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(process.cwd(), "src/index.ts"), "utf8");
const config = readFileSync(resolve(process.cwd(), "wrangler.toml"), "utf8");

describe("P34nuts Control Worker security contract", () => {
  it("allows only the two intended repositories", () => {
    expect(source).toContain('"P34nuts/p34nuts-official-website"');
    expect(source).toContain('"P34nuts/p34nuts-merch-store"');
    expect(source).not.toContain("P34nuts/*");
  });

  it("keeps private-key values out of source and uses runtime secret names", () => {
    expect(source).toContain("GITHUB_APP_PRIVATE_KEY: string");
    expect(source).toContain("CONTROL_SESSION_SECRET: string");
    expect(source).not.toMatch(/GITHUB_APP_PRIVATE_KEY\s*[:=]\s*["'`][^"'`]+["'`]/);
    expect(source).not.toMatch(/MI[A-Za-z0-9+/]{80,}/);
    expect(config).not.toContain("[secrets]");
  });

  it("rejects commits outside the explicit content path whitelist", () => {
    expect(source).toContain('"content/homepage.json"');
    expect(source).toContain('"content/homepage-links.json"');
    expect(source).toContain('"client/src/index.css"');
    expect(source).toContain('url.pathname === "/file" && request.method === "GET"');
    expect(source).toContain('if (!body.path || !ALLOWED_PATHS.has(body.path))');
    expect(source).toContain('if (!body.repository || !ALLOWED_REPOSITORIES.has(body.repository))');
  });

  it("requires the operator identity to be P34nuts", () => {
    expect(source).toContain('user.login !== "P34nuts"');
    expect(source).toContain('session.login === "P34nuts"');
  });
});
