/** NOIR CUT FINAL AUDIT — The music landing is a focused discovery index, not a duplicate homepage. */
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { MusicFinder } from "@/components/MusicFinder";
import { assets, discoveryPaths, getFrameOfTheDay, getTrackBySlug, releases, themeMap } from "@/data/artistData";
import { SubpageDualBrandHeader } from "@/components/SubpageDualBrandHeader";

export default function MusicLanding() {
  useEffect(() => {
    document.title = "P34nuts — Music Archive / 23 Frames";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Entdecke 23 Trackframes von P34nuts nach Stimmung, Thema und visueller Linie.");
  }, []);
  const frameOfTheDay = getFrameOfTheDay();
  return <main className="subpage-shell music-landing"><SubpageDualBrandHeader /><section className="subpage-intro subpage-intro--portrait"><img className="subpage-intro-portrait" src={assets.hero} alt="" /><div className="subpage-intro-veil" /><div className="subpage-intro-content"><p className="eyebrow">Music / 23 frames</p><h1>START<br /><em>WITH A FEELING.</em></h1><p>Kein Katalog zum Abhaken. Ein Einstieg nach Stimmung, dann weiter durch die Kader.</p></div></section><section className="frame-of-day-section" aria-labelledby="frame-of-day-title"><div><p className="eyebrow">Frame of the day / archive sequence</p><h2 id="frame-of-day-title">TODAY'S<br /><em>ENTRY.</em></h2><p>Ein wechselnder Einstieg aus dem bestehenden Archiv. Keine Personalisierung, kein Tracking.</p></div><Link href={`/music/${frameOfTheDay.slug}`} className={`frame-of-day-card ${frameOfTheDay.coverStyle}`}>{frameOfTheDay.cover && <img src={frameOfTheDay.cover} alt="" loading="lazy" />}<span>{frameOfTheDay.id} / FULL TRACK</span><strong>{frameOfTheDay.title}</strong><small>{frameOfTheDay.note}</small><ArrowUpRight size={18} /></Link></section><section className="music-entry-section" aria-label="Kuratierten Einstieg wählen"><div className="entry-list">{discoveryPaths.map((path) => { const track = getTrackBySlug(path.trackSlug); if (!track) return null; return <Link href={`/music/${track.slug}`} key={path.label}>{track.cover && <img src={track.cover} alt="" loading="lazy" />}<span>{path.label}</span><strong>{track.title}</strong><ArrowUpRight size={17} /></Link>; })}</div></section><section className="theme-map-section" aria-labelledby="theme-map-title"><div className="theme-map-heading"><p className="eyebrow">Theme map / 05 routes</p><h2 id="theme-map-title">MAP<br /><em>THE SIGNAL.</em></h2></div><div className="theme-map-grid">{themeMap.map((route, index) => { const track = getTrackBySlug(route.trackSlug); if (!track) return null; return <Link href={`/music/${track.slug}`} key={route.label}><span>0{index + 1}</span><strong>{route.label}</strong><p>{route.description}</p><small>{track.title}</small><ArrowUpRight size={16} /></Link>; })}</div></section><MusicFinder tracks={releases} /></main>;
}
