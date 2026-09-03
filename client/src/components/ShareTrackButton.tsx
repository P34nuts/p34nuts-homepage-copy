import { Check, Link2, Share2 } from "lucide-react";
import { useState } from "react";
import type { Track } from "@/data/artistData";

export function ShareTrackButton({ track }: { track: Track }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${track.title} — P34nuts`, text: `${track.title} von P34nuts`, url: window.location.href });
        return;
      } catch (error) {
        if ((error as DOMException).name === "AbortError") return;
      }
    }
    await copyLink();
  };

  return <div className="track-share-actions" aria-label={`${track.title} teilen`}>
    <button type="button" onClick={share}><Share2 size={14} /> TEILEN</button>
    <button type="button" onClick={copyLink}>{copied ? <Check size={14} /> : <Link2 size={14} />}{copied ? "LINK KOPIERT" : "LINK KOPIEREN"}</button>
  </div>;
}
