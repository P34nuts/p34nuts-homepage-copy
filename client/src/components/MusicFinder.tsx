import { ArrowUpRight, Search, Shuffle, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { type Track } from "@/data/artistData";
import { getRecentTracks } from "@/lib/musicHistory";

type MusicFinderProps = { tracks: readonly Track[] };

export function MusicFinder({ tracks }: MusicFinderProps) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("Alle Themen");
  const [recent, setRecent] = useState(getRecentTracks);
  const themes = useMemo(() => ["Alle Themen", ...Array.from(new Set(tracks.flatMap((track) => track.themes))).sort((a, b) => a.localeCompare(b, "de"))], [tracks]);
  const filtered = useMemo(() => tracks.filter((track) => {
    const haystack = `${track.title} ${track.mood} ${track.themes.join(" ")}`.toLocaleLowerCase("de");
    return haystack.includes(query.trim().toLocaleLowerCase("de")) && (theme === "Alle Themen" || track.themes.includes(theme));
  }), [query, theme, tracks]);
  const pickFrame = () => {
    const pool = filtered.length ? filtered : tracks;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    window.location.assign(`${import.meta.env.BASE_URL.replace(/\/$/, "")}/music/${selected.slug}`);
  };
  const refreshRecent = () => setRecent(getRecentTracks());

  return <section className="music-finder" aria-labelledby="music-finder-title">
    <div className="music-finder-heading"><div><p className="eyebrow">Music finder / full source online</p><h2 id="music-finder-title">FIND<br /><em>YOUR FRAME.</em></h2></div><p>Alle 23 Tracks sind direkt als vollständige Suno-Version verfügbar. Suche nach Gefühl, Thema oder Titel – ohne externe Plattformwechsel.</p></div>
    <div className="music-finder-controls">
      <label className="music-search"><Search size={16} aria-hidden="true" /><span className="sr-only">Tracks durchsuchen</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Titel, Stimmung oder Thema" /></label>
      <label className="music-theme"><span className="sr-only">Thema filtern</span><select value={theme} onChange={(event) => setTheme(event.target.value)}>{themes.map((entry) => <option key={entry}>{entry}</option>)}</select></label>
      <button type="button" className="music-random" onClick={pickFrame}><Shuffle size={15} /> START A FRAME</button>
      {(query || theme !== "Alle Themen") && <button type="button" className="music-reset" onClick={() => { setQuery(""); setTheme("Alle Themen"); }}><X size={14} /> RESET</button>}
    </div>
    <p className="music-finder-count" role="status">{filtered.length} {filtered.length === 1 ? "FRAME" : "FRAMES"} GEFUNDEN</p>
    {filtered.length > 0 ? <div className="music-finder-grid">{filtered.map((track) => <Link href={`/music/${track.slug}`} key={track.id} className={`music-finder-track ${track.coverStyle}`} onClick={refreshRecent}>{track.cover && <img src={track.cover} alt="" loading="lazy" />}<span>{track.id} / FULL TRACK</span><strong>{track.title}</strong><small>{track.themes.slice(0, 2).join(" · ")}</small><ArrowUpRight size={16} /></Link>)}</div> : <div className="music-finder-empty"><p>NO FRAME IN THIS CUT.</p><span>Versuche einen anderen Titel, eine Stimmung oder ein Thema.</span><button type="button" onClick={() => { setQuery(""); setTheme("Alle Themen"); }}>ALLE FRAMES ZEIGEN</button></div>}
    {recent.length > 0 && <aside className="music-recent" aria-labelledby="recent-tracks-title"><p className="eyebrow">Local history / only this device</p><h3 id="recent-tracks-title">RETURN TO<br /><em>THE CUT.</em></h3><div>{recent.map((track) => <Link href={`/music/${track.slug}`} key={track.slug}>{track.cover && <img src={track.cover} alt="" loading="lazy" />}<span>{track.id}</span><strong>{track.title}</strong><ArrowUpRight size={15} /></Link>)}</div></aside>}
  </section>;
}
