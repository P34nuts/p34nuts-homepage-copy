/**
 * NOIR CUT VISUAL MASTER — A track opens as an archive entry: cover first, then mood and
 * themes. It reuses the template dialog primitive and never requires a fake release URL.
 */

import { ArrowUpRight, Play, X } from "lucide-react";
import { Link } from "wouter";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SunoPlayer } from "@/components/SunoPlayer";
import { getTrackStory, type Track } from "@/data/artistData";

type TrackDialogProps = {
  track: Track;
  onListenRequest: (track: Track) => void;
};

export function TrackDialog({ track, onListenRequest }: TrackDialogProps) {
  const story = getTrackStory(track);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={`release-tile ${track.coverStyle}`} aria-label={`${track.title} – Track-Archiv öffnen`}>
          {track.cover ? <img src={track.cover} alt="" className="release-tile-image" loading="lazy" /> : <span className="release-generated-art" aria-hidden="true" />}
          <span className="tile-number">{track.id}</span>
          <span className="tile-state">ARCHIVE / 23</span>
          <span className="tile-title">{track.title}</span>
          <span className="tile-mood">{track.mood}</span>
          <span className="tile-listen">VIEW FRAME <ArrowUpRight size={15} /></span>
        </button>
      </DialogTrigger>
      <DialogContent className="track-dialog">
        <DialogClose className="dialog-close" aria-label="Trackdialog schließen"><X size={18} /></DialogClose>
        <div className={`track-dialog-cover ${track.coverStyle}`}>
          {track.cover ? <img src={track.cover} alt="" /> : <span className="release-generated-art" aria-hidden="true" />}
          <span className="track-dialog-index">{track.id} / 23</span>
        </div>
        <div className="track-dialog-copy">
          <p className="eyebrow">{track.visualTheme} / visual archive</p>
          <DialogTitle>{track.title}</DialogTitle>
          <p className="track-dialog-genre">{story.genre}</p>
          <DialogDescription>{story.story}</DialogDescription>
          <div className="track-theme-list" aria-label="Themen">
            {track.themes.map((theme) => <span key={theme}>{theme}</span>)}
          </div>
          <p className="track-dialog-message"><span>KERN</span>{story.message}</p>
          {track.sunoId && <span className="track-source-badge">FULL TRACK / SUNO</span>}
          <Link href={`/music/${track.slug}`} className="text-link">TRACK PAGE <ArrowUpRight size={14} /></Link>
          {track.sunoId ? <SunoPlayer track={track} /> : <button type="button" className="track-pending-link" onClick={() => onListenRequest(track)}><Play size={14} fill="currentColor" /> STREAMING / QUELLE AUSSTEHEND</button>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
