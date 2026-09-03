import nodemailer from "nodemailer";

const bookingInbox = "P34nuts@mail.de";

export type BookingMailInput = {
  name: string;
  email: string;
  eventDate: string;
  venue: string;
  location: string;
  eventFormat: string;
  capacity?: string;
  budget?: string;
  message?: string;
};

export function createBookingMail(input: BookingMailInput) {
  const optional = (value?: string) => value || "nicht angegeben";
  const text = [
    "BOOKING-ANFRAGE / P34NUTS",
    "",
    `Name / Organisation: ${input.name}`,
    `E-Mail: ${input.email}`,
    `Datum: ${input.eventDate}`,
    `Veranstaltungsort: ${input.venue}`,
    `Stadt / Land: ${input.location}`,
    `Format: ${input.eventFormat}`,
    `Kapazität: ${optional(input.capacity)}`,
    `Budgetrahmen: ${optional(input.budget)}`,
    `Nachricht: ${optional(input.message)}`,
  ].join("\n");

  return {
    from: `P34nuts Booking <${bookingInbox}>`,
    to: bookingInbox,
    replyTo: input.email,
    subject: `Booking-Anfrage P34nuts / ${input.eventDate} / ${input.venue}`,
    text,
  };
}

export async function sendBookingMail(input: BookingMailInput) {
  const password = process.env.MAIL_DE_PASSWORD;
  if (!password) {
    console.warn("[Booking] SMTP password is not configured; booking email delivery skipped.");
    return false;
  }

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.mail.de",
      port: 465,
      secure: true,
      auth: { user: bookingInbox, pass: password },
    });

    await transport.sendMail(createBookingMail(input));
    return true;
  } catch (error) {
    console.error("[Booking] SMTP delivery failed", error);
    return false;
  }
}
