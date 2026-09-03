import type { Track } from "@/data/artistData";

const RECENT_TRACKS_KEY = "p34nuts-recent-tracks";
const RECENT_TRACKS_LIMIT = 4;

export type RecentTrack = Pick<Track, "id" | "slug" | "title" | "mood" | "cover" | "coverStyle">;

export function mergeRecentTracks(current: RecentTrack[], track: RecentTrack) {
  return [track, ...current.filter((entry) => entry.slug !== track.slug)].slice(0, RECENT_TRACKS_LIMIT);
}

export function getRecentTracks(): RecentTrack[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(RECENT_TRACKS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.slice(0, RECENT_TRACKS_LIMIT) as RecentTrack[] : [];
  } catch {
    return [];
  }
}

export function rememberTrack(track: Track) {
  if (typeof window === "undefined") return;
  const compact: RecentTrack = {
    id: track.id,
    slug: track.slug,
    title: track.title,
    mood: track.mood,
    cover: track.cover,
    coverStyle: track.coverStyle,
  };
  window.localStorage.setItem(RECENT_TRACKS_KEY, JSON.stringify(mergeRecentTracks(getRecentTracks(), compact)));
}
