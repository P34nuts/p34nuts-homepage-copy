/**
 * NOIR CUT DESIGN REMINDER — Media opens as a quiet cinematic frame. The No-Cookie
 * player is created only after a visitor actively opens this dialog and is removed on close.
 */

import { Play, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type VideoDialogProps = {
  title: string;
  category: string;
  poster?: string;
  youtubeId: string;
  className?: string;
};

export function VideoDialog({ title, category, poster, youtubeId, className = "" }: VideoDialogProps) {
  const [open, setOpen] = useState(false);
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={`visual-card ${className}`} aria-label={`${category}: ${title} öffnen`}>
          {poster ? <img src={poster} alt="" loading="lazy" /> : <span className="visual-art" aria-hidden="true" />}
          <span className="visual-dim" aria-hidden="true" />
          <span className="visual-card-meta">
            <span>{category}</span>
            <strong>{title}</strong>
          </span>
          <span className="visual-play" aria-hidden="true"><Play size={18} fill="currentColor" /></span>
        </button>
      </DialogTrigger>
      <DialogContent className="video-dialog">
        <DialogClose className="dialog-close" aria-label="Dialog schließen"><X size={18} /></DialogClose>
        <div className="video-dialog-player">
          {open ? (
            <iframe
              src={embedUrl}
              title={`${title} – offizielles YouTube-Video von P34nuts`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : null}
        </div>
        <div className="video-dialog-copy">
          <p className="eyebrow">{category} / direct player</p>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Das Video wird erst durch deinen Klick geladen und direkt hier auf der Seite wiedergegeben. Beim Schließen wird der Player wieder entfernt.
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
