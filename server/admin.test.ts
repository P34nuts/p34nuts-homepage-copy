import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

describe("Adminbereich", () => {
  it("schützt Admin-Aktionen serverseitig über adminProcedure", () => {
    const router = readFileSync(path.join(root, "server/routers.ts"), "utf8");
    expect(router).toContain("adminList: adminProcedure");
    expect(router).toContain("delete: adminProcedure");
    expect(router).toContain("adminUpdate: adminProcedure");
  });

  it("begrenzt Homepage-Einstellungen auf die freigegebenen Schlüssel", () => {
    const router = readFileSync(path.join(root, "server/routers.ts"), "utf8");
    expect(router).toContain('"supportUrl", "shopUrl", "announcementText", "announcementEnabled"');
    expect(router).toContain('value.startsWith("https://")');
  });

  it("erklärt die Moderation in deutscher, selbsterklärender Sprache", () => {
    const page = readFileSync(path.join(root, "client/src/pages/Admin.tsx"), "utf8");
    expect(page).toContain("Gästebuch moderieren");
    expect(page).toContain("Freigeben");
    expect(page).toContain("Diese Aktion kann nicht rückgängig gemacht werden.");
    expect(page).toContain("Der Shop ist eine getrennte Render-Anwendung");
  });
});
