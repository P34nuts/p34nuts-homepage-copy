import nodemailer from "nodemailer";
import { describe, expect, it } from "vitest";

describe("mail.de SMTP credentials", () => {
  it("authenticates the configured booking mailbox without sending an email", async () => {
    const password = process.env.MAIL_DE_PASSWORD;
    expect(password).toBeTruthy();

    const transport = nodemailer.createTransport({
      host: "smtp.mail.de",
      port: 465,
      secure: true,
      auth: { user: "P34nuts@mail.de", pass: password },
    });

    await expect(transport.verify()).resolves.toBe(true);
  }, 30_000);
});
