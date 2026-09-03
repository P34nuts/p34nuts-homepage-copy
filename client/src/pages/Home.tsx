/**
 * NOIR CUT DESIGN REMINDER — Treat this page as a vertical film edit: black frames,
 * high-contrast editorial typography, Cut Red registers, intentionally irregular pacing,
 * and accessible motion that never obscures the artist or calls to action.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "../noirSequence.css";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Download,
  Flame,
  Frown,
  Heart,
  Laugh,
  Menu,
  Plus,
  Send,
  Sparkles,
  ThumbsUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AlbumIntroPlayer } from "@/components/AlbumIntroPlayer";
import { shouldShowIntroPreview } from "@/lib/introPreview";
import { shopHref } from "@/lib/shopLink";
import { Marquee } from "@/components/Marquee";
import { DiscoveryRail } from "@/components/DiscoveryRail";
import { BookingForm } from "@/components/BookingForm";
import { SectionLabel } from "@/components/SectionLabel";
import { TrackDialog } from "@/components/TrackDialog";
import { VideoDialog } from "@/components/VideoDialog";
import { trpc } from "@/lib/trpc";
import { faqItems } from "@/data/faqData";
import {
  assets,
  artistProfile,
  artistManifest,
  booking,
  featuredVisual,
  gallery,
  latestRelease,
  pressKitItems,
  primaryNav,
  releases,
  sitePath,
  socialLinks,
  visuals,
} from "@/data/artistData";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const paypalDonationUrl = import.meta.env.VITE_PAYPAL_DONATION_URL as string | undefined;
const guestbookReactions = [
  { key: "heart", label: "Herz", symbol: "♥", Icon: Heart },
  { key: "love", label: "Liebe", symbol: "❤", Icon: Sparkles },
  { key: "laugh", label: "Lachen", symbol: "☺", Icon: Laugh },
  { key: "fire", label: "Feuer", symbol: "🔥", Icon: Flame },
  { key: "thumbsUp", label: "Daumen hoch", symbol: "👍", Icon: ThumbsUp },
  { key: "wow", label: "Wow", symbol: "✦", Icon: Sparkles },
  { key: "sad", label: "Berührt", symbol: "☹", Icon: Frown },
] as const;

export default function Home() {
  const reduceMotion = useReducedMotion();
  const introPreview = typeof window !== "undefined" && shouldShowIntroPreview(window.location.search);
  const [introVisible, setIntroVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [guestbookName, setGuestbookName] = useState("");
  const [guestbookMessage, setGuestbookMessage] = useState("");
  const [guestbookWebsite, setGuestbookWebsite] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const trpcUtils = trpc.useUtils();
  const guestbookQuery = trpc.guestbook.list.useQuery();
  const settingsQuery = trpc.settings.public.useQuery();
  const publicSettings = settingsQuery.data ?? [];
  const publicSupportUrl = publicSettings.find(item => item.key === "supportUrl")?.value || paypalDonationUrl;
  const announcementEnabled = publicSettings.find(item => item.key === "announcementEnabled")?.value === "true";
  const announcementText = publicSettings.find(item => item.key === "announcementText")?.value;
  const submitGuestbook = trpc.guestbook.submit.useMutation({
    onSuccess: () => {
      setGuestbookName("");
      setGuestbookMessage("");
      setGuestbookWebsite("");
      setNotice("Danke. Dein Eintrag ist jetzt sichtbar.");
    },
    onError: error => setNotice(error.message),
  });
  const reactGuestbook = trpc.guestbook.react.useMutation({
    onSuccess: () => trpcUtils.guestbook.list.invalidate(),
    onError: error => setNotice(error.message),
  });

  useEffect(() => {
    if (introPreview || (!reduceMotion && window.sessionStorage.getItem("p34nuts-intro-seen") !== "true")) {
      setIntroVisible(true);
    }
  }, [introPreview, reduceMotion]);

  useEffect(() => {
    if (!introVisible || introPreview) return;
    const introTimer = window.setTimeout(() => {
      window.sessionStorage.setItem("p34nuts-intro-seen", "true");
      setIntroVisible(false);
    }, 1250);
    return () => window.clearTimeout(introTimer);
  }, [introPreview, introVisible]);

  useEffect(() => {
    const scrollToHashTarget = () => {
      const targetId = window.location.hash.slice(1);
      if (!targetId || introVisible || !["send-the-frame", "social"].includes(targetId)) return;
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    };

    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);
    return () => window.removeEventListener("hashchange", scrollToHashTarget);
  }, [introVisible, reduceMotion]);

  useEffect(() => {
    const onScroll = () => setHeaderSolid(window.scrollY > 36);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const showPlaceholder = (message: string) => setNotice(message);

  const dismissIntro = () => {
    window.sessionStorage.setItem("p34nuts-intro-seen", "true");
    setIntroVisible(false);
  };

  return (
    <div className="site-shell">
      <AnimatePresence>
        {introVisible && (
          <motion.div
            className="intro-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.38 } }}
          >
            <div className="intro-mark"><img src={assets.mark} alt="" /></div>
            <div className="intro-wordmark" aria-label="P34nuts"><span>P34</span><i>nuts</i></div>
            <button type="button" onClick={dismissIntro}>SKIP INTRO</button>
          </motion.div>
        )}
      </AnimatePresence>

        <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
        <header className={`site-header ${headerSolid || menuOpen ? "site-header-solid" : ""}`}>
        <div className="header-brand-group">
          <a href={sitePath("/")} className="brand-lockup brand-home-wordmark" aria-label="P34nuts, zur Startseite">
            <img src={assets.headerWordmark} alt="P34nuts" />
          </a>
          <a href={shopHref} className="brand-lockup brand-shop-wordmark" aria-label="P34nuts Shop, zur Shop-Startseite">
            <img src={assets.shopHeaderWordmark} alt="P34nuts Shop" />
          </a>
        </div>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {primaryNav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <button type="button" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu">
          <span>{menuOpen ? "Close" : "Menu"}</span>{menuOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile Hauptnavigation"
            initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.46, ease: [0.77, 0, 0.175, 1] }}
          >
            <p>Navigate / P34nuts</p>
            <div>
              {primaryNav.map((item, index) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  <span>0{index + 1}</span>{item.label}<ArrowUpRight size={22} />
                </a>
              ))}
            </div>
            <small>NO BOX. NO MASK. NO FILTER.</small>
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <motion.img
            className="hero-image hero-depth-image hero-skyline-layer"
            src={assets.hero}
            alt="Regennasse Skyline bei Nacht mit rotem Blitz am Himmel"
            fetchPriority="high"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.12, ease: [0.23, 1, 0.32, 1] }}
          />
          <div className="hero-stormlight" aria-hidden="true">
            <img className="hero-storm-clouds" src={assets.heroStormLayer} alt="" />
            <span className="hero-storm-flash hero-storm-flash-primary" />
            <span className="hero-storm-flash hero-storm-flash-secondary" />
            <span className="hero-storm-flash hero-storm-flash-distant" />
            <span className="hero-storm-flash hero-storm-flash-wide" />
            <span className="hero-storm-flash hero-storm-flash-far" />
          </div>
          <div className="hero-veil" aria-hidden="true" />
          <motion.img
            className="hero-image hero-subject-layer"
            src={assets.heroPersonLayer}
            alt=""
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 1.008 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 10, delay: reduceMotion ? 0 : 2, ease: "linear" }}
          />
          <div className="hero-register">00 / opening frame <span /></div>
          <motion.div
            className="hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: reduceMotion ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <p id="hero-title" className="eyebrow">Independent artist / music archive</p>
            <p className="hero-line">Musik zwischen Maske, <i>Wahrheit und Frequenz.</i></p>
            <a href="#start-here" className="hero-cta">START WITH MUSIC <ArrowDown size={17} /></a>
          </motion.div>
          <div className="hero-bottom"><span>Scroll to enter</span><span>01:01 / no autoplay</span></div>
        </section>

        <Marquee text="P34NUTS — NEW MUSIC — NO FILTER —" />

        <section className="release-section section-wrap" id="release" aria-labelledby="release-title">
          <SectionLabel index="01" label="Album intro / direct playback" />
          <motion.div className="release-layout" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} transition={{ staggerChildren: 0.1 }}>
            <motion.div className="release-cover-wrap" variants={reveal} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
              <img src={assets.releaseCover} alt="P34nuts vor industrieller Kulisse bei dramatischem Himmel" className="release-cover" />
              <span className="cover-stamp">ALBUM INTRO / AUDIO</span>
            </motion.div>
            <motion.div className="release-copy" variants={reveal} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
              <p className="eyebrow">{latestRelease.eyebrow}</p>
              <h2 id="release-title">{latestRelease.title}</h2>
              <div className="release-meta"><span>{latestRelease.artist}</span><span>{latestRelease.date}</span></div>
              <p className="release-description">{latestRelease.description}</p>
              <AlbumIntroPlayer src={assets.albumIntro} />
            </motion.div>
          </motion.div>
        </section>

        <DiscoveryRail />

        <section className="statement-section" aria-label="Artist statement">
          <div className="statement-rule" />
          <p>Zwischen <em>Gefühl</em>, Systemtheorie<br />und Berliner <em>Alltag.</em></p>
          <span className="statement-note">Kein Posen um des Posens willen: Haltung, Humor und das, was darunter liegt.</span>
        </section>

        <section className="manifest-section" aria-labelledby="manifest-title">
          <div className="section-wrap manifest-layout">
            <div className="manifest-intro"><p className="eyebrow">{artistManifest.eyebrow}</p><h2 id="manifest-title">NO BOX.<br /><em>NO MASK.</em><br />NO FILTER.</h2></div>
            <div className="manifest-copy"><p>{artistManifest.lede}</p><ol>{artistManifest.principles.map((principle, index) => <li key={principle}><span>0{index + 1}</span>{principle}</li>)}</ol><a href={sitePath("/music")} className="text-link">ENTER THE ARCHIVE <ArrowUpRight size={14} /></a></div>
          </div>
        </section>

        <section id="music" className="music-section section-wrap" aria-labelledby="music-title">
          <SectionLabel index="02" label="Music / structure ready" align="right" />
          <div className="section-heading split-heading">
            <h2 id="music-title">ALL<br /><em>FRAMES.</em></h2>
            <p>23 visuelle Trackkader: Jeder Song ist direkt als vollständige Suno-Version verfügbar – ohne Plattformwechsel.</p>
          </div>
          <div className="release-grid visual-discography">
            {releases.map((release) => (
              <TrackDialog key={release.id} track={release} onListenRequest={(track) => showPlaceholder(`${track.title}: Streaming-Link wird nach Bestätigung ergänzt.`)} />
            ))}
          </div>
        </section>

        <section className="featured-section" aria-labelledby="featured-title">
          <img src={featuredVisual.poster} alt="" />
          <div className="featured-veil" />
          <div className="featured-caption">
            <p className="eyebrow">Featured video / official upload</p>
            <h2 id="featured-title">WATCH<br /><em>THE CUT.</em></h2>
          </div>
          <VideoDialog {...featuredVisual} className="featured-open" />
        </section>

        <section id="about" className="about-section section-wrap" aria-labelledby="about-title">
          <SectionLabel index="03" label="About / Artist profile" />
          <div className="about-layout">
            <motion.h2 id="about-title" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}>NOT<br />A <em>NOISE.</em></motion.h2>
            <figure className="about-visual"><img src={assets.mirror} alt="P34nuts im Studio mit konzentrierter, nachdenklicher Pose" loading="lazy" /><figcaption>WHO AM I / STUDIO STUDY</figcaption></figure>
            <div className="about-copy">
              <p className="about-lede">{artistProfile.intro}</p>
              <p>{artistProfile.positioning}</p>
              <div className="about-pillars" aria-label="Drei Säulen der Kunst von P34nuts">
                {artistProfile.pillars.map((pillar, index) => <article key={pillar.title}><span>0{index + 1}</span><h3>{pillar.title}</h3><p>{pillar.text}</p></article>)}
              </div>
              <span className="draft-tag"><Plus size={13} /> ARTIST PROFILE / APPROVED</span>
            </div>
          </div>
        </section>

        <section className="contrast-section" aria-labelledby="contrast-title">
          <div className="section-wrap contrast-layout">
            <SectionLabel index="03.5" label="The contrast / human behind the mask" align="right" />
            <div className="contrast-head"><h2 id="contrast-title">LOUD<br /><em>/ QUIET</em></h2><p>Haltung und Zweifel müssen nicht erklärt werden. Sie teilen sich einen Kader.</p></div>
            <div className="contrast-frames"><figure><img src={assets.raw} alt="P34nuts neben einem Fahrzeug auf nasser Straße bei Nacht" loading="lazy" /><figcaption>PRESSURE / OUTSIDE</figcaption></figure><figure><img src={assets.human} alt="P34nuts in nach innen gerichteter Pose vor nächtlicher Stadt und Transit" loading="lazy" /><figcaption>TRUTH / INSIDE</figcaption></figure></div>
          </div>
        </section>

        <Marquee text="THE NEXT FRAME IS ALREADY RUNNING —" reverse />

        <section id="visuals" className="visuals-section section-wrap" aria-labelledby="visuals-title">
          <SectionLabel index="04" label="Visual archive" align="right" />
          <div className="section-heading compact-heading"><h2 id="visuals-title">VISUALS</h2><p>Offizielle Musikvideos als bewegte Kader. Der Player wird erst durch deinen Klick geladen und bleibt direkt in diesem Fenster.</p></div>
          <div className="visual-grid">
            {visuals.map((visual) => (
              <VideoDialog key={visual.id} {...visual} className={visual.size} />
            ))}
          </div>
        </section>

        <section className="gallery-section" aria-labelledby="gallery-title">
          <div className="section-wrap gallery-heading"><SectionLabel index="05" label="Image archive" /><h2 id="gallery-title">NO<br /><em>STATIC.</em></h2></div>
          <div className="gallery-grid">
            {gallery.map((image) => (
              <figure className={image.className} key={image.id} data-frame={image.id}>
                <img src={image.src} alt={image.caption} loading="lazy" />
                <figcaption><span>{image.id}</span>{image.category} / {image.caption}</figcaption>
              </figure>
            ))}
          </div>

        </section>

        <section id="live" className="live-section section-wrap" aria-labelledby="live-title">
          <img className="live-frame-art" src={assets.liveFrame} alt="" loading="lazy" />
          <SectionLabel index="06" label="Live / announcements" />
          <div className="live-layout">
            <h2 id="live-title">LIVE<br /><em>FRAMES.</em></h2>
            <div className="show-empty">
              <span>NO DATES ANNOUNCED</span>
              <p>No date stamp yet. Neue Städte, Venues und Ticketlinks erscheinen erst, wenn der Termin wirklich steht.</p>
              <button type="button" onClick={() => showPlaceholder("Aktuell sind keine bestätigten Shows hinterlegt.")}>GET SHOW UPDATES <ArrowUpRight size={16} /></button>
            </div>
          </div>
        </section>

      {announcementEnabled && announcementText ? <div className="section-wrap" role="status"><div className="rounded-sm border border-red-400/40 bg-red-950/20 px-5 py-4 text-sm text-white">{announcementText}</div></div> : null}

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="section-wrap contact-layout">
            <SectionLabel index="07" label="Contact / booking + social" />
            <div className="contact-headline"><h2 id="contact-title">BOOK<br /><em>/ FOLLOW.</em></h2><p>Für Live-Bookings, Kollaborationen und Business-Anfragen. Ein direkter Kontaktweg und die offiziellen Kanäle – ohne Umwege.</p></div>
            <div className="contact-grid">
              <article className="booking-panel">
                <img className="booking-panel-art" src={assets.bookingStage} alt="" loading="lazy" />
                <p className="contact-kicker">Direct booking / email</p>
                <h3>MAKE<br /><em>CONTACT.</em></h3>
                <a href={`mailto:${booking.email}?subject=Booking-Anfrage%20P34nuts`} className="booking-mail"><span>{booking.email}</span><ArrowUpRight size={23} /></a>
                <p>{booking.note}</p>
              </article>
              <article id="social" className="social-contact-panel">
                <p className="contact-kicker">Official channels / 03</p>
                <h3>FIND THE<br /><em>SIGNAL.</em></h3>
                <div className="contact-social-list">
                  {socialLinks.map((item, index) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer"><span>0{index + 1}</span><strong>{item.label}</strong><small>{item.detail}</small><ArrowUpRight size={17} /></a>)}
                </div>
              </article>
            </div>
            <article className="donation-panel" aria-labelledby="donation-title">
              <div className="donation-panel-copy">
                <SectionLabel index="07.1" label="Support / independent release" />
                <p className="contact-kicker">Keep the signal alive</p>
                <h3 id="donation-title">SUPPORT<br /><em>THE FRAME.</em></h3>
              </div>
              <div className="donation-panel-action">
                <p>Neue Musik braucht Zeit, Energie und viele Nächte. Wenn dir P34nuts etwas gibt, kannst du die nächsten Releases freiwillig unterstützen. Jeder Beitrag hilft, neue Tracks und Visuals unabhängig zu realisieren – danke für deinen Support.</p>
                {publicSupportUrl ? (
                  <a className="donation-link" href={publicSupportUrl} target="_blank" rel="noreferrer" data-paypal-donation-link>
                    <span>GELD SAMMELN / PAYPAL</span><ArrowUpRight size={20} />
                  </a>
                ) : (
                  <button className="donation-link donation-link-disabled" type="button" onClick={() => showPlaceholder("Der PayPal-Link wird gerade vorbereitet.")}>PAYPAL LINK FOLGT <ArrowUpRight size={20} /></button>
                )}
                <small>Freiwillige Unterstützung über PayPal. Kein Kauf und keine Gegenleistung erforderlich.</small>
              </div>
            </article>
            <BookingForm recipient={booking.email} />
          </div>
        </section>

        <section id="guestbook" className="guestbook-section section-wrap" aria-labelledby="guestbook-title">
          <SectionLabel index="08" label="Guestbook / moderated signal" />
          <div className="guestbook-heading">
            <div><p className="eyebrow">Leave a trace / no registration</p><h2 id="guestbook-title">SIGN<br /><em>THE WALL.</em></h2></div>
            <p>Hinterlasse etwas Nettes. Neue Einträge werden direkt sichtbar. Du brauchst dafür kein Konto; Reaktionen sind ebenfalls ohne Registrierung möglich.</p>
          </div>
          <div className="guestbook-layout">
            <div className="guestbook-stream" aria-live="polite" aria-label="Veröffentlichte Gästebuch-Einträge" tabIndex={0}>
              {guestbookQuery.isLoading && <p className="guestbook-state">Lade veröffentlichte Einträge …</p>}
              {!guestbookQuery.isLoading && guestbookQuery.data?.length === 0 && <p className="guestbook-state">Noch keine Einträge. Vielleicht bist du der erste gute Vibe.</p>}
              {guestbookQuery.data?.map(entry => (
                <article className="guestbook-entry" key={entry.id}>
                  <div className="guestbook-entry-meta"><span>ENTRY / {String(entry.id).padStart(3, "0")}</span><time dateTime={new Date(entry.createdAt).toISOString()}>{new Date(entry.createdAt).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" })}</time></div>
                  <p className="guestbook-entry-name">{entry.name}</p>
                  <p>{entry.message}</p>
                  <div className="guestbook-reactions" aria-label={`Reaktionen für Eintrag ${entry.id}`}>
                    {guestbookReactions.map(({ key, label, symbol, Icon }) => <button key={key} className="guestbook-reaction" type="button" onClick={() => reactGuestbook.mutate({ entryId: entry.id, reaction: key })} disabled={reactGuestbook.isPending} aria-label={`${label} für Eintrag ${entry.id} geben`}><Icon size={14} aria-hidden="true" /><span>{symbol}</span><strong>{entry.reactions?.[key] ?? 0}</strong></button>)}
                  </div>
                </article>
              ))}
            </div>
            <form className="guestbook-form" onSubmit={event => { event.preventDefault(); submitGuestbook.mutate({ name: guestbookName, message: guestbookMessage, website: guestbookWebsite }); }}>
              <p className="contact-kicker">Drop a line / direct signal</p>
              <label htmlFor="guestbook-name">Dein Name</label>
              <input id="guestbook-name" className="guestbook-name-input" value={guestbookName} onChange={event => setGuestbookName(event.target.value)} maxLength={80} minLength={2} required autoComplete="name" placeholder="Wie dürfen wir dich nennen?" />
              <label htmlFor="guestbook-message">Deine Nachricht</label>
              <textarea id="guestbook-message" value={guestbookMessage} onChange={event => setGuestbookMessage(event.target.value)} maxLength={600} minLength={2} required placeholder="Etwas Nettes, ein Gedanke, ein Signal …" />
              <label className="guestbook-honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={guestbookWebsite} onChange={event => setGuestbookWebsite(event.target.value)} /></label>
              <div className="guestbook-submit-row"><small>Dein Eintrag wird direkt sichtbar. Bitte nenne nur den Namen, unter dem du erscheinen möchtest, und poste keine privaten Daten.</small><button type="submit" disabled={submitGuestbook.isPending || guestbookName.trim().length < 2 || guestbookMessage.trim().length < 2}><span>{submitGuestbook.isPending ? "WIRD GESENDET" : "SIGNAL SENDEN"}</span><Send size={16} /></button></div>
            </form>
          </div>
        </section>

        <section className="faq-section section-wrap" aria-labelledby="faq-title">
          <SectionLabel index="09" label="FAQ / no box no mask" align="right" />
          <details className="faq-disclosure">
            <summary className="faq-disclosure-summary">
              <div className="faq-heading"><h2 id="faq-title">ASK<br /><em>P34NUTS.</em></h2><p>Zwischen Adiletten, Abgründen und 126 BPM: die Antworten auf die Fragen, die sowieso irgendwann kommen.</p></div>
              <span className="faq-disclosure-action" aria-hidden="true"><span /><ChevronDown size={18} /></span>
            </summary>
            <div className="faq-list">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return <article className={`faq-item${isOpen ? " is-open" : ""}`} key={item.question}>
                  <button type="button" className="faq-trigger" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? null : index)}><span>0{index + 1}</span><strong>{item.question}</strong><ChevronDown size={18} /></button>
                  <div id={`faq-answer-${index}`} className="faq-answer" hidden={!isOpen}><p>{item.answer}</p></div>
                </article>;
              })}
            </div>
          </details>
        </section>

        <section className="press-section section-wrap" aria-labelledby="press-title">
          <div className="press-box">
            <img className="press-frame-art" src={assets.pressFrame} alt="" loading="lazy" />
            <div><p className="eyebrow">Press / epk archive</p><h2 id="press-title">PRESS<br /><em>KIT.</em></h2></div>
            <div className="press-content"><div className="press-items">{pressKitItems.map((item) => <span key={item}>{item}</span>)}</div><a href={sitePath("/press")}>OPEN PRESS FRAME <Download size={15} /></a></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-wordmark"><img src={assets.mark} alt="P34nuts" /></div>
        <div className="footer-meta"><strong>NO BOX. NO MASK. NO FILTER.</strong><span>© {new Date().getFullYear()} P34nuts / official digital home</span></div>
        <div className="footer-legal"><a href={sitePath("/music")}>Music</a><a href={shopHref}>Shop</a><a href={sitePath("/booking")}>Booking</a><a href={sitePath("/press")}>Press</a><a href={sitePath("/impressum")}>Impressum</a><a href={sitePath("/datenschutz")}>Datenschutz</a></div>
      </footer>

      <AnimatePresence>
        {notice && <motion.div className="notice" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>{notice}<button type="button" onClick={() => setNotice(null)} aria-label="Hinweis schließen"><X size={15} /></button></motion.div>}
      </AnimatePresence>
    </div>
  );
}
