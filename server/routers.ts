import { createHash, randomUUID } from "node:crypto";
import { parse as parseCookieHeader } from "cookie";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { sendBookingMail } from "./bookingMailer";
import { createBookingRateLimiter, getRequestFingerprint } from "./bookingRateLimit";
import { addGuestbookHeart, addGuestbookReaction, createBookingSubmission, createGuestbookEntry, deleteGuestbookEntry, listApprovedGuestbookEntries, listGuestbookEntriesForAdmin, listSiteSettings, moderateGuestbookEntry, upsertSiteSetting } from "./db";

export const guestbookEntrySchema = z.object({
  name: z.string().trim().min(2).max(80),
  message: z.string().trim().min(2).max(600),
  website: z.string().max(0).optional(),
});

const guestbookRateLimiter = createBookingRateLimiter(4, 15 * 60 * 1000);
const guestbookVisitorCookie = "p34nuts_guestbook_visitor";
const guestbookReactionSchema = z.enum(["heart", "love", "laugh", "fire", "thumbsUp", "wow", "sad"]);

function getGuestbookFingerprint(ctx: { req: { headers: { cookie?: string }; }; res: { cookie: Function } }) {
  const cookies = parseCookieHeader(ctx.req.headers.cookie ?? "");
  const visitorId = cookies[guestbookVisitorCookie] || randomUUID();
  if (!cookies[guestbookVisitorCookie]) {
    ctx.res.cookie(guestbookVisitorCookie, visitorId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: ONE_YEAR_MS,
      path: "/",
    });
  }
  return createHash("sha256")
    .update(`${process.env.JWT_SECRET || "p34nuts-guestbook"}:${visitorId}`)
    .digest("hex");
}

export const bookingSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  venue: z.string().trim().min(2).max(240),
  location: z.string().trim().min(2).max(240),
  eventFormat: z.enum(["Clubshow", "Festival", "Support", "Privates Event", "Business / Kooperation", "Sonstiges"]),
  capacity: z.string().trim().max(80).optional(),
  budget: z.string().trim().max(160).optional(),
  message: z.string().trim().max(4000).optional(),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
});

const bookingRateLimiter = createBookingRateLimiter();
const editableSettingSchema = z.object({
  key: z.enum(["supportUrl", "shopUrl", "announcementText", "announcementEnabled"]),
  value: z.string().trim().max(2000),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  guestbook: router({
    list: publicProcedure.query(async () => {
      try {
        return await listApprovedGuestbookEntries();
      } catch (error) {
        console.error("[Guestbook] Failed to list approved entries", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Das Gästebuch ist gerade nicht verfügbar." });
      }
    }),
    submit: publicProcedure.input(guestbookEntrySchema).mutation(async ({ input, ctx }) => {
      if (input.website) return { accepted: true } as const;
      if (!guestbookRateLimiter.canAccept(getRequestFingerprint(ctx.req))) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Bitte versuche es später erneut." });
      }
      try {
        const entry = await createGuestbookEntry({ name: input.name, message: input.message, status: "approved" });
        await notifyOwner({
          title: "Neuer Gästebuch-Eintrag · P34nuts",
          content: `${input.name} hat einen Gästebuch-Eintrag direkt veröffentlicht: ${input.message.slice(0, 600)}`,
        });
        return { accepted: true, entryId: entry.id } as const;
      } catch (error) {
        console.error("[Guestbook] Failed to store entry", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Der Eintrag konnte gerade nicht sicher übermittelt werden." });
      }
    }),
    heart: publicProcedure.input(z.object({ entryId: z.number().int().positive() })).mutation(async ({ input, ctx }) => {
      try {
        return await addGuestbookHeart(input.entryId, getGuestbookFingerprint(ctx));
      } catch (error) {
        console.error("[Guestbook] Failed to add heart", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Die Reaktion konnte gerade nicht gespeichert werden." });
      }
    }),
    react: publicProcedure.input(z.object({ entryId: z.number().int().positive(), reaction: guestbookReactionSchema })).mutation(async ({ input, ctx }) => {
      try {
        return await addGuestbookReaction(input.entryId, input.reaction, getGuestbookFingerprint(ctx));
      } catch (error) {
        console.error("[Guestbook] Failed to add reaction", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Die Reaktion konnte gerade nicht gespeichert werden." });
      }
    }),
    moderate: adminProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["approved", "rejected"]) })).mutation(async ({ input }) => {
      return moderateGuestbookEntry(input.id, input.status);
    }),
    adminList: adminProcedure.query(() => listGuestbookEntriesForAdmin()),
    delete: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => deleteGuestbookEntry(input.id)),
  }),
  settings: router({
    public: publicProcedure.query(async () => listSiteSettings()),
    adminList: adminProcedure.query(() => listSiteSettings()),
    adminUpdate: adminProcedure.input(editableSettingSchema).mutation(({ input, ctx }) => {
      if (input.key === "supportUrl" || input.key === "shopUrl") {
        const url = z.string().url().refine(value => value.startsWith("https://"), "Nur HTTPS-Links sind erlaubt").parse(input.value);
        return upsertSiteSetting(input.key, url, ctx.user.id);
      }
      return upsertSiteSetting(input.key, input.value, ctx.user.id);
    }),
  }),
  booking: router({
    create: publicProcedure.input(bookingSubmissionSchema).mutation(async ({ input, ctx }) => {
      try {
        if (!bookingRateLimiter.canAccept(getRequestFingerprint(ctx.req))) {
          throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Zu viele Anfragen in kurzer Zeit." });
        }
        const submission = await createBookingSubmission({
          name: input.name,
          email: input.email,
          eventDate: input.eventDate,
          venue: input.venue,
          location: input.location,
          eventFormat: input.eventFormat,
          capacity: input.capacity || null,
          budget: input.budget || null,
          message: input.message || null,
        });

        const [notificationDelivered, emailDelivered] = await Promise.all([
          notifyOwner({
            title: "Neue Booking-Anfrage · P34nuts",
            content: `${input.name} · ${input.eventFormat} · ${input.eventDate} · ${input.venue}, ${input.location} · ${input.email}`,
          }),
          sendBookingMail(input),
        ]);

        return { submissionId: submission.id, notificationDelivered, emailDelivered };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Booking] Failed to store submission", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Die Anfrage konnte gerade nicht sicher übermittelt werden. Bitte versuche es erneut oder schreibe direkt an P34nuts@mail.de." });
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
