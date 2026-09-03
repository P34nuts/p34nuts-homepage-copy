/** NOIR CUT FINAL AUDIT — Shareable, accessible music detail pages with a clear discovery continuation. */
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { SunoPlayer } from "@/components/SunoPlayer";
import { ShareTrackButton } from "@/components/ShareTrackButton";
import { DISCOVERY_ROTATION_INTERVAL_MS, getAdjacentTracks, getRelatedTracks, getTrackBySlug, getTrackStory, assets } from "@/data/artistData";
import { rememberTrack } from "@/lib/musicHistory";
import { shopHref } from "@/lib/shopLink";
import NotFound from "@/pages/NotFound";

export default function TrackDetail() {
  const [, params] = useRoute("/music/:slug");
  const track = getTrackBySlug(params?.slug);
  useEffect(() => {
    if (!track) return;
    document.title = `${track.title} — P34nuts`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", `${track.title} von P34nuts: ${track.note}`);
    // Wouter keeps the SPA document alive between detail routes. Reset immediately
    // and once after the next paint so every discovery card starts at the top,
    // including on mobile browsers that restore the previous scroll position.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const resetAfterPaint = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    rememberTrack(track);
    return () => window.cancelAnimationFrame(resetAfterPaint);
  }, [track]);
  const reduceMotion = useReducedMotion();
  const relatedPool = track ? getRelatedTracks(track, 12) : [];
  const [relatedItems, setRelatedItems] = useState(() => relatedPool.slice(0, 3));
  const [flippingSlots, setFlippingSlots] = useState<number[]>([]);
  const relatedStartRef = useRef(0);
  const relatedTimeoutsRef = useRef<number[]>([]);
  useEffect(() => {
    const initialItems = relatedPool.slice(0, 3);
    relatedStartRef.current = 0;
    setRelatedItems(initialItems);
    setFlippingSlots([]);
  }, [track?.id]);
  useEffect(() => {
    relatedTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    relatedTimeoutsRef.current = [];
    if (relatedPool.length <= 3) return;
    const runRotation = () => {
      const nextStart = (relatedStartRef.current + 3) % relatedPool.length;
      const nextItems = Array.from({ length: 3 }, (_, index) => relatedPool[(nextStart + index) % relatedPool.length]);
      nextItems.forEach((nextItem, index) => {
        const startTimeout = window.setTimeout(() => {
          setFlippingSlots((slots) => Array.from(new Set([...slots, index])));
          const swapTimeout = window.setTimeout(() => {
            setRelatedItems((currentItems) => currentItems.map((item, itemIndex) => itemIndex === index ? nextItem : item));
          }, 280);
          const finishTimeout = window.setTimeout(() => {
            setFlippingSlots((slots) => slots.filter((slot) => slot !== index));
          }, 560);
          relatedTimeoutsRef.current.push(swapTimeout, finishTimeout);
        }, index * 500);
        relatedTimeoutsRef.current.push(startTimeout);
      });
      relatedStartRef.current = nextStart;
    };
    const interval = window.setInterval(() => {
      if (!reduceMotion) runRotation();
      else {
        const nextStart = (relatedStartRef.current + 3) % relatedPool.length;
        const nextItems = Array.from({ length: 3 }, (_, index) => relatedPool[(nextStart + index) % relatedPool.length]);
        relatedStartRef.current = nextStart;
        setRelatedItems(nextItems);
      }
    }, DISCOVERY_ROTATION_INTERVAL_MS);
    return () => {
      window.clearInterval(interval);
      relatedTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      relatedTimeoutsRef.current = [];
    };
  }, [relatedPool.length, track?.id, reduceMotion]);
  const related = relatedItems;
  if (!track) return <NotFound />;
  const story = getTrackStory(track);
  const { previous, next } = getAdjacentTracks(track);
  return <main className="subpage-shell track-page"><header className="subpage-header"><div className="header-brand-group"><Link href="/" className="brand-lockup brand-home-wordmark" aria-label="P34nuts, zur Startseite"><img src={assets.headerWordmark} alt="P34nuts" /></Link><a href={shopHref} className="brand-lockup brand-shop-wordmark" aria-label="P34nuts Shop, zur Shop-Startseite"><img src={assets.shopHeaderWordmark} alt="P34nuts Shop" /></a></div><Link href="/music" className="subpage-back"><ArrowLeft size={16} /> ALL MUSIC</Link></header><section className="track-page-hero"><div className={`track-page-art ${track.coverStyle}`}>{track.cover ? <img src={track.cover} alt={`Cover-Artwork für ${track.title}`} fetchPriority="high" /> : <span className="release-generated-art" aria-hidden="true" />}<span>{track.id} / 23</span></div><div className="track-page-copy"><p className="eyebrow">{track.visualTheme} / track archive</p><h1>{track.title}</h1><p className="track-page-mood">{track.mood}</p><p className="track-page-note">{track.note}</p><div className="track-theme-list">{track.themes.map((theme) => <span key={theme}>{theme}</span>)}</div>{track.sunoId ? <><span className="track-source-badge">FULL TRACK AVAILABLE / SUNO</span><SunoPlayer track={track} /></> : <div className="track-listen-status"><Play size={16} fill="currentColor" /><span>STREAMING / QUELLE AUSSTEHEND</span><small>Die Audio- und Plattformquelle wird nach Freigabe ergänzt.</small></div>}<ShareTrackButton track={track} /></div></section><nav className="track-sequence" aria-label="Archivnavigation">{previous ? <Link href={`/music/${previous.slug}`}><ChevronLeft size={17} /><span>PREV / {previous.id}</span><strong>{previous.title}</strong></Link> : <span className="track-sequence-edge">01 / FIRST FRAME</span>}<Link href="/music" className="track-sequence-index">ALL / 23</Link>{next ? <Link href={`/music/${next.slug}`}><span>NEXT / {next.id}</span><strong>{next.title}</strong><ChevronRight size={17} /></Link> : <span className="track-sequence-edge">23 / LAST FRAME</span>}</nav><section className="track-story-section" aria-labelledby="track-story-title"><div className="track-story-heading"><p className="eyebrow">Track profile / {track.id}</p><h2 id="track-story-title">IN<br /><em>CONTEXT.</em></h2><span>{story.genre}</span></div><div className="track-story-copy"><p className="track-story-lede">{story.story}</p><p><strong>Gedanke des Rappers.</strong>{story.perspective}</p><p><strong>Kernbotschaft.</strong>{story.message}</p>{story.contentNote && <p className="track-story-note">{story.contentNote}</p>}</div></section><section className="related-section" aria-labelledby="related-title"><div className="related-heading"><p className="eyebrow">Continue the line</p><h2 id="related-title">MORE<br /><em>LIKE THIS.</em></h2></div><div className="related-grid" aria-live="polite">{related.map((item, index) => <Link href={`/music/${item.slug}`} className={`related-track ${item.coverStyle} related-track--rotating ${flippingSlots.includes(index) ? "related-track--flipping" : ""}`} key={`${item.id}-${index}`}>{item.cover && <img src={item.cover} alt="" loading="lazy" />}<span>{item.id} / {item.mood}</span><strong>{item.title}</strong><ArrowUpRight size={17} /></Link>)}</div></section></main>;
}
