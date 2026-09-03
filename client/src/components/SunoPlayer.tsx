/**
 * A Suno player is mounted only after a deliberate listen action. This prevents third-party
 * player requests while visitors are simply browsing the music archive.
 */
import { Play, X } from "lucide-react";
import { useState } from "react";
import type { Track } from "@/data/artistData";

export function SunoPlayer({ track }: { track: Track }) {
  const [loaded, setLoaded] = useState(false);
  if (!track.sunoId) return null;

  const embedUrl = `https://suno.com/embed/${track.sunoId}`;
  return loaded ? (
    <div className="suno-player-frame">
      <iframe
        src={embedUrl}
        title={`${track.title} – Suno-Player von P34nuts`}
        allow="autoplay"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <button type="button" className="suno-player-remove" onClick={() => setLoaded(false)}>
        <X size={13} /> PLAYER ENTFERNEN
      </button>
    </div>
  ) : (
    <button type="button" className="suno-player-trigger" onClick={() => setLoaded(true)}>
      <Play size={14} fill="currentColor" /> PLAY FULL TRACK / SUNO
    </button>
  );
}
