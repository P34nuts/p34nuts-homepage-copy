import { and, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { bookingSubmissions, guestbookEntries, guestbookHearts, guestbookReactions, InsertBookingSubmission, InsertGuestbookEntry, InsertUser, siteSettings, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function listApprovedGuestbookEntries() {
  const db = await getDb();
  if (!db) throw new Error("Guestbook storage is temporarily unavailable");
  const entries = await db.select({
    id: guestbookEntries.id,
    name: guestbookEntries.name,
    message: guestbookEntries.message,
    heartCount: guestbookEntries.heartCount,
    createdAt: guestbookEntries.createdAt,
  }).from(guestbookEntries)
    .where(eq(guestbookEntries.status, "approved"))
    .orderBy(desc(guestbookEntries.createdAt))
    .limit(60);
  const reactions = await db.select({ entryId: guestbookReactions.entryId, reaction: guestbookReactions.reaction }).from(guestbookReactions);
  const counts = new Map<number, Record<string, number>>();
  for (const reaction of reactions) {
    const entryCounts = counts.get(reaction.entryId) ?? {};
    entryCounts[reaction.reaction] = (entryCounts[reaction.reaction] ?? 0) + 1;
    counts.set(reaction.entryId, entryCounts);
  }
  return entries.map(entry => ({ ...entry, reactions: counts.get(entry.id) ?? {} }));
}

export async function createGuestbookEntry(input: InsertGuestbookEntry) {
  const db = await getDb();
  if (!db) throw new Error("Guestbook storage is temporarily unavailable");
  const result = await db.insert(guestbookEntries).values(input);
  return { id: Number(result[0].insertId) };
}

export async function addGuestbookReaction(entryId: number, reaction: "heart" | "love" | "laugh" | "fire" | "thumbsUp" | "wow" | "sad", fingerprint: string) {
  const db = await getDb();
  if (!db) throw new Error("Guestbook storage is temporarily unavailable");
  const existing = await db.select({ entryId: guestbookReactions.entryId })
    .from(guestbookReactions)
    .where(and(eq(guestbookReactions.entryId, entryId), eq(guestbookReactions.reaction, reaction), eq(guestbookReactions.fingerprint, fingerprint)))
    .limit(1);
  if (existing.length > 0) return { added: false };
  await db.insert(guestbookReactions).values({ entryId, reaction, fingerprint });
  return { added: true };
}

export async function addGuestbookHeart(entryId: number, fingerprint: string) {
  const db = await getDb();
  if (!db) throw new Error("Guestbook storage is temporarily unavailable");
  const existing = await db.select({ entryId: guestbookHearts.entryId })
    .from(guestbookHearts)
    .where(and(eq(guestbookHearts.entryId, entryId), eq(guestbookHearts.fingerprint, fingerprint)))
    .limit(1);
  if (existing.length > 0) return { added: false };
  const result = await db.insert(guestbookHearts).values({ entryId, fingerprint });
  if (result[0].affectedRows > 0) {
    await db.update(guestbookEntries)
      .set({ heartCount: sql`${guestbookEntries.heartCount} + 1` })
      .where(eq(guestbookEntries.id, entryId));
    return { added: true };
  }
  return { added: false };
}

export async function listGuestbookEntriesForAdmin() {
  const db = await getDb();
  if (!db) throw new Error("Guestbook storage is temporarily unavailable");
  return db.select().from(guestbookEntries).orderBy(desc(guestbookEntries.createdAt)).limit(200);
}

export async function deleteGuestbookEntry(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Guestbook storage is temporarily unavailable");
  await db.delete(guestbookEntries).where(eq(guestbookEntries.id, id));
  return { id };
}

export async function listSiteSettings() {
  const db = await getDb();
  if (!db) throw new Error("Settings storage is temporarily unavailable");
  return db.select().from(siteSettings).orderBy(siteSettings.key);
}

export async function upsertSiteSetting(key: string, value: string, updatedBy: number) {
  const db = await getDb();
  if (!db) throw new Error("Settings storage is temporarily unavailable");
  await db.insert(siteSettings).values({ key, value, updatedBy }).onDuplicateKeyUpdate({ set: { value, updatedBy, updatedAt: new Date() } });
  return { key, value };
}

export async function moderateGuestbookEntry(id: number, status: "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Guestbook storage is temporarily unavailable");
  await db.update(guestbookEntries)
    .set({ status, moderatedAt: new Date() })
    .where(eq(guestbookEntries.id, id));
  return { id, status };
}

export async function createBookingSubmission(input: InsertBookingSubmission) {
  const db = await getDb();
  if (!db) {
    throw new Error("Booking storage is temporarily unavailable");
  }

  const result = await db.insert(bookingSubmissions).values(input);
  return { id: Number(result[0].insertId) };
}
