import { int, mysqlEnum, mysqlTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const bookingSubmissions = mysqlTable("booking_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  eventDate: varchar("event_date", { length: 10 }).notNull(),
  venue: varchar("venue", { length: 240 }).notNull(),
  location: varchar("location", { length: 240 }).notNull(),
  eventFormat: varchar("event_format", { length: 80 }).notNull(),
  capacity: varchar("capacity", { length: 80 }),
  budget: varchar("budget", { length: 160 }),
  message: text("message"),
  ownerNotificationDelivered: int("owner_notification_delivered").notNull().default(0),
  emailDelivered: int("email_delivered").notNull().default(0),
  deliveryCheckedAt: timestamp("delivery_checked_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type BookingSubmission = typeof bookingSubmissions.$inferSelect;
export type InsertBookingSubmission = typeof bookingSubmissions.$inferInsert;

export const guestbookEntries = mysqlTable("guestbook_entries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 80 }).notNull().default("Gast"),
  message: varchar("message", { length: 600 }).notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  heartCount: int("heart_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  moderatedAt: timestamp("moderated_at"),
});

export type GuestbookEntry = typeof guestbookEntries.$inferSelect;
export type InsertGuestbookEntry = typeof guestbookEntries.$inferInsert;

export const siteSettings = mysqlTable("site_settings", {
  key: varchar("key", { length: 64 }).primaryKey(),
  value: text("value").notNull(),
  updatedBy: int("updated_by").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;

export const guestbookHearts = mysqlTable("guestbook_hearts", {
  entryId: int("entry_id").notNull(),
  fingerprint: varchar("fingerprint", { length: 64 }).notNull(),
}, table => ({
  primaryKey: primaryKey({ columns: [table.entryId, table.fingerprint] }),
}));

export const guestbookReactions = mysqlTable("guestbook_reactions", {
  entryId: int("entry_id").notNull(),
  reaction: mysqlEnum("reaction", ["heart", "love", "laugh", "fire", "thumbsUp", "wow", "sad"]).notNull(),
  fingerprint: varchar("fingerprint", { length: 64 }).notNull(),
}, table => ({
  primaryKey: primaryKey({ columns: [table.entryId, table.reaction, table.fingerprint] }),
}));

export type GuestbookReaction = typeof guestbookReactions.$inferSelect;
export type InsertGuestbookReaction = typeof guestbookReactions.$inferInsert;

/**
 * Stores only a salted, irreversible booking-request fingerprint. It allows the
 * public form to keep one consistent limit across server instances without
 * retaining an IP address or other raw network identifier.
 */
export const bookingRateLimitWindows = mysqlTable("booking_rate_limit_windows", {
  fingerprint: varchar("fingerprint", { length: 64 }).primaryKey(),
  windowStartedAt: timestamp("window_started_at").notNull(),
  requestCount: int("request_count").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
