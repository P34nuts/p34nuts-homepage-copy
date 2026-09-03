/**
 * NOIR CUT FINAL AUDIT — The single source of truth for public-facing P34nuts content.
 * Confirmed URLs and legal data remain intentionally empty until supplied by the artist.
 */

import { shopHref } from "@/lib/shopLink";

export const sitePath = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;

const masterAsset = (path: string) => sitePath(path);

/** First artist-approved portrait set. Each frame has a distinct editorial job on the homepage. */
export const artistPortraitSet = {
  throneEditorial: masterAsset("/manus-storage/01-throne-editorial_5b96d963.png"),
  skylineHero: masterAsset("/manus-storage/p34nuts-hero-storm-city_43d245f7.png"),
  heroPersonLayer: masterAsset("/manus-storage/p34nuts-hero-person-layer-v2_89a5e72c.png"),
  heroStormLayer: masterAsset("/manus-storage/p34nuts-left-sky-storm-overlay_0b197bdf.png"),
  studioMicrophone: masterAsset("/manus-storage/03-studio-microphone_2b56f5ad.png"),
  stageBooking: masterAsset("/manus-storage/04-stage-booking_5ba2e741.png"),
  rainPressure: masterAsset("/manus-storage/05-rain-car-pressure_b380ff7c.png"),
  studioProfile: masterAsset("/manus-storage/06-studio-profile_b1eab756.png"),
  transitIntrospection: masterAsset("/manus-storage/07-transit-introspection_1a0e558b.png"),
  streetRaw: masterAsset("/manus-storage/08-car-raw_892c0407.png"),
  sunsetFeature: masterAsset("/manus-storage/09-sunset-featured_a0ab26b3.png"),
  bridgeConcept: masterAsset("/manus-storage/10-bridge-concept_f3f37888.png"),
} as const;

/** Second artist-approved portrait set: discipline, perspective, signature and night. */
export const artistPortraitSet02 = {
  disciplineRain: masterAsset("/manus-storage/11-discipline-rain_3303d59b.png"),
  liveHarborSunset: masterAsset("/manus-storage/12-live-harbor-sunset_5abd013a.png"),
  currentFrameDiscipline: masterAsset("/manus-storage/13-current-frame-discipline_e10a433d.png"),
  pressLionSunset: masterAsset("/manus-storage/14-press-lion-sunset_26341d26.png"),
  nightNeonAlley: masterAsset("/manus-storage/15-night-neon-alley_4d0be05c.png"),
} as const;

export const assets = {
  hero: artistPortraitSet.skylineHero,
  heroPersonLayer: artistPortraitSet.heroPersonLayer,
  heroStormLayer: artistPortraitSet.heroStormLayer,
  headerWordmark: masterAsset("/manus-storage/p34nuts-header-wordmark-transparent_40231558.png"),
  shopHeaderWordmark: masterAsset("/manus-storage/p34nuts-shop-header.png"),
  heroWordmark: masterAsset("/manus-storage/p34nuts-header-wordmark_60ae815f.png"),
  releaseCover: artistPortraitSet02.currentFrameDiscipline,
  featuredVideo: artistPortraitSet.sunsetFeature,
  mark: masterAsset("/manus-storage/p34nuts-watermark-transparent_a8f921d2.png"),
  editorial: artistPortraitSet.throneEditorial,
  raw: artistPortraitSet.rainPressure,
  mirror: artistPortraitSet.studioProfile,
  human: artistPortraitSet.transitIntrospection,
  galleryRaw: artistPortraitSet.streetRaw,
  performance: artistPortraitSet.bridgeConcept,
  studioMicrophone: artistPortraitSet.studioMicrophone,
  bookingStage: artistPortraitSet.stageBooking,
  galleryDiscipline: artistPortraitSet02.disciplineRain,
  galleryNight: artistPortraitSet02.nightNeonAlley,
  liveFrame: artistPortraitSet02.liveHarborSunset,
  pressFrame: artistPortraitSet02.pressLionSunset,
  albumIntro: masterAsset("/manus-storage/p34nuts-album-intro_7d20998b.mp3"),
} as const;

/** Original album art supplied by the artist. Keep these mappings aligned with the numbered release archive. */
export const originalCovers = {
  "01": masterAsset("/manus-storage/01-dein-name-auf-nem-stein_e71370aa.webp"),
  "02": masterAsset("/manus-storage/02-was_2f5b885d.webp"),
  "03": masterAsset("/manus-storage/03-p34nuts-regelt-das_51aae206.webp"),
  "04": masterAsset("/manus-storage/04-maskenball_fc2d0593.webp"),
  "05": masterAsset("/manus-storage/05-ich-hasse-dich-zu-lieben_3207626a.webp"),
  "06": masterAsset("/manus-storage/06-scheiss-auf-das-wetter_191e2bd2.webp"),
  "07": masterAsset("/manus-storage/07-ungefiltert_6968cf5a.webp"),
  "08": masterAsset("/manus-storage/13-wie-sagt-man-lebewohl_8bf4c002.webp"),
  "09": masterAsset("/manus-storage/09-urlaub-burnout_91570229.webp"),
  "10": masterAsset("/manus-storage/10-zeitlupe_de3296a6.webp"),
  "11": masterAsset("/manus-storage/11-diamanten-im-staub_1ace7538.webp"),
  "12": masterAsset("/manus-storage/12-was-waere-wenn_74a850fa.webp"),
  "13": masterAsset("/manus-storage/08-zuendschnur_463c2458.webp"),
  "14": masterAsset("/manus-storage/14-p34nuts_7f260045.webp"),
  "15": masterAsset("/manus-storage/15-vip-ohne-namen_0b453a59.webp"),
  "16": masterAsset("/manus-storage/guten-morgen-sonnenschein-original_2036d39d.png"),
  "17": masterAsset("/manus-storage/17-die-therapie-wirkt_1b857467.webp"),
  "18": masterAsset("/manus-storage/18-handwerker-des-jahres_70ee5cc5.webp"),
  "19": masterAsset("/manus-storage/19-auf-rezept_df3b5964.webp"),
  "20": masterAsset("/manus-storage/20-dreckig-und-in-traenen_7799d6cb.webp"),
  "21": masterAsset("/manus-storage/21-tunnelblick_aed2b52f.webp"),
  "22": masterAsset("/manus-storage/22-wer-bin-ich_339a0e42.webp"),
  "23": masterAsset("/manus-storage/23-zyklus-der-gewalt-gym_38ef1305.webp"),
} as const;

export const primaryNav = [
  { label: "Music", href: sitePath("/music") },
  { label: "Shop", href: shopHref },
  { label: "Visuals", href: sitePath("/#visuals") },
  { label: "About", href: sitePath("/#about") },
  { label: "Booking", href: sitePath("/booking") },
  { label: "Social", href: sitePath("/#social") },
] as const;

export const latestRelease = {
  eyebrow: "Album intro / direct playback",
  title: "ALBUM INTRO",
  artist: "P34nuts",
  date: "Direct audio / click to play",
  description: "Ein Einstieg in den Albumkader. Das Intro startet direkt hier nach deinem Klick – ohne Plattformwechsel und ohne Autoplay.",
  links: [
    { label: "Spotify", href: "", note: "Der Spotify-Link wird nach der Freigabe ergänzt." },
    { label: "Apple Music", href: "", note: "Der Apple-Music-Link wird nach der Freigabe ergänzt." },
    { label: "YouTube", href: "", note: "Der YouTube-Link wird nach der Freigabe ergänzt." },
  ],
} as const;

export type Track = {
  id: string;
  slug: string;
  title: string;
  mood: string;
  themes: readonly string[];
  visualTheme: string;
  coverStyle: string;
  cover?: string;
  note: string;
  sunoId?: string;
};

export const artistProfile = {
  intro: "P34nuts bewegt sich im deutschen Rap zwischen emotionaler Verletzlichkeit, intellektueller Wortgewalt und dem unverfälschten Charme des Berliner Alltags.",
  positioning: "Wo andere mit Statussymbolen oder Härte posieren, verbindet P34nuts Systeme, Satire und Situationen aus dem echten Leben – vom Katerfrühstück bis zur späten Clubnacht.",
  pillars: [
    { title: "Radikale Emotion", text: "Er macht Platz für Gefühle, Einsamkeit, Depressionen bei Männern und Suizidtrauer – gegen das Dogma, dass Männer nicht weinen dürften." },
    { title: "Linguistische Dominanz", text: "Mit Fremdwörtern, Systemtheorie und scharfer Satire dekodiert er hohle Deutschrap-Posen, ohne den Witz aus dem Blick zu verlieren." },
    { title: "Berliner Lebenskünstler", text: "Unperfekt, humorvoll und ungekünstelt: Festivalregen, Gym-Disziplin, Bäckereibesuch und Nachtclub stehen im selben Kader." },
  ],
} as const;

/** Short manifest assembled exclusively from the approved artist profile. */
export const artistManifest = {
  eyebrow: "Artist statement / 60 seconds",
  title: "NO BOX.\nNO MASK.\nNO FILTER.",
  lede: "P34nuts verbindet emotionale Offenheit, präzise Sprache und Berliner Alltagsbeobachtung zu einer eigenen Rap-Perspektive.",
  principles: [
    "Gefühle dürfen sichtbar sein.",
    "Haltung braucht keinen Filter.",
    "Humor bleibt Teil der Wahrheit.",
  ],
} as const;

/** Curated routes through confirmed, already public track themes. */
export const themeMap = [
  { label: "LOSS / MEMORY", description: "Wenn Erinnerung mehr Raum braucht als Lärm.", trackSlug: "dein-name-auf-nem-stein" },
  { label: "MASK / IDENTITY", description: "Zwischen Rolle, Spiegel und dem, was darunter bleibt.", trackSlug: "maskenball" },
  { label: "PRESSURE / MOTION", description: "Druck wird nicht versteckt, sondern in Bewegung gesetzt.", trackSlug: "zuendschnur" },
  { label: "HUMOR / CONTROL", description: "Zu viel Ordnung kippt irgendwann ins Absurde.", trackSlug: "p34nuts-regelt-das" },
  { label: "NIGHT / SIGNAL", description: "Nacht, Status und der Blick hinter die Oberfläche.", trackSlug: "vip-ohne-namen" },
] as const;

export type TrackStory = {
  genre: string;
  story: string;
  perspective: string;
  message: string;
  contentNote?: string;
};

/**
 * Freigegebene Inhaltsnotizen des Artists. Die Einträge 21 und 22 bleiben transparent
 * als redaktionell ausstehend markiert, weil sie im gelieferten Songbriefing nicht vorkamen.
 */
export const trackStories: Record<string, TrackStory> = {
  "01": { genre: "Emotionaler Conscious Rap / Piano & Trap Ballade", story: "Der Track verarbeitet den Verlust eines besten Freundes durch Suizid: unbeschwerte Erinnerungen an Partys und Autofahrten stehen neben der Gewissheit am Grab.", perspective: "Er gibt Ohnmacht und Schuldgefühlen Raum – auch der Frage, ob Anzeichen übersehen wurden.", message: "Gefühle dürfen sichtbar sein. Hilferufe müssen nicht aus Stolz verschwiegen werden.", contentNote: "Themenhinweis: Suizidverlust und Trauer." },
  "02": { genre: "German Gangsta Rap Pop Fusion / 140 BPM Trap & Melodic Auto-Tune", story: "Ein intellektueller Flex-Track, der klassische Rap-Klischees mit wissenschaftlichen und philosophischen Begriffen wie Nexus, Isomorphismus und Determinismus verschiebt.", perspective: "Die Überhöhung bleibt bewusst humorvoll und parodiert hohles Angeben.", message: "Echte Dominanz entsteht im Kopf – Bildung und Eloquenz wiegen schwerer als vorgetäuschte Härte." },
  "03": { genre: "Berlin Funk / Storytelling Rap", story: "Ein verkateter Berliner Lebenskünstler scheitert morgens beim Bäcker, füttert nachmittags Tauben im Park und öffnet abends der Schickeria die Clubtür.", perspective: "Die Story feiert Gelassenheit, Witz und die eigene Berlin-Logik.", message: "Authentizität, Herzlichkeit und Humor öffnen mehr Türen als Marken oder Geld." },
  "04": { genre: "Deep Conscious Rap / melancholisch", story: "Maskenball handelt von der sozialen Rolle, die im Alltag funktionieren soll, und davon, wie Gefühle hinter einer Fassade verschwinden.", perspective: "Der Track schaut auf die Leistungsgesellschaft, in der Glück oft nur gespielt wird.", message: "Dauerndes Maskentragen isoliert – Nähe beginnt dort, wo Rollen nicht mehr alles verdecken." },
  "05": { genre: "Dark Dramatic Duett / orchestral Trap", story: "Eine toxische On-Off-Beziehung voller Vorwürfe, Eifersucht, Gaslighting und ungesunder Leidenschaft.", perspective: "Die emotionale Abhängigkeit wird gezeigt, ohne sie zu romantisieren.", message: "Toxische Bindungen können süchtig machen und das eigene Ich Stück für Stück beschädigen.", contentNote: "Themenhinweis: toxische Beziehung und emotionale Abhängigkeit." },
  "06": { genre: "2000s Synth Rock / Indie Anthem / 148 BPM", story: "Ein Festival droht im Regen zu versinken und wird durch kaltes Dosenbier und Zusammenhalt zur Party des Jahres.", perspective: "Die Energie entsteht nicht trotz, sondern aus den Umständen.", message: "Lass deine Laune nicht von äußeren Bedingungen diktieren – mach aus dem Tag etwas Eigenes." },
  "07": { genre: "Modern Pop Rap / Conscious", story: "Ungefiltert blickt auf eine Social-Media-Welt, in der sich Menschen permanent inszenieren, optimieren und vergleichen.", perspective: "Der Track versteht sich als Befreiungsschlag aus Selbstdarstellung und Konsumzwang.", message: "Das echte Leben ist wertvoller als jeder Algorithmus." },
  "08": { genre: "Hard Aggressive Rap", story: "Kleine Alltagsprovokationen werden zum Pulverfass im Kopf, bis aufgestaute Frustration und Kontrollverlust ein Ventil suchen.", perspective: "Der Song vertont Druck, bevor er sich gegen die falschen Menschen richtet.", message: "Ungelöster innerer Druck findet irgendwann ein Ventil – meist nicht das richtige." },
  "09": { genre: "Humoresker Rap / satirischer Beat", story: "Ein First-World-Problems-Szenario über den All-inclusive-Stress: Pool oder Strand, Mojito oder Piña Colada.", perspective: "Die Überforderung bleibt selbstironisch und nimmt Wohlstandssorgen auf die Schippe.", message: "Nimm dich und deine kleinen Luxusprobleme nicht zu ernst." },
  "10": { genre: "Duett Pop Rap / 100 BPM", story: "Zeitlupe erzählt vom Alltagstrott und dem Versuch, das Hamsterrad zu verlassen, um wieder Erinnerungen zu sammeln.", perspective: "Die verlangsamte Perspektive wird zum Gegenentwurf gegen das bloße Funktionieren.", message: "Verschwende keinen Tag – sammle Momente, nicht Verpflichtungen." },
  "11": { genre: "High Energy Harddance Rap / 140 BPM Trance-Riddim", story: "Nach Enttäuschungen und Krisen wird Resilienz zur Haltung: Aus den Narben der Vergangenheit entsteht Stärke.", perspective: "Der Song ist ein Mutmacher für Menschen in schweren Phasen.", message: "Unter Druck entstehen Diamanten; das innere Licht erlischt nicht." },
  "12": { genre: "Uplifting Club Rap / Melodic House / 116 BPM", story: "Was wäre wenn? setzt gegen Overthinking, Zukunftsangst und Katastrophendenken eine offene, positive Möglichkeit.", perspective: "Der Track will Sorgen nicht kleinreden, sondern den Blick wieder ins Jetzt holen.", message: "Was wäre, wenn es gelingt? Lass die Sorgen los und lebe im Moment." },
  "13": { genre: "Orchestrale Trauer-Ballade / Deep Rap", story: "Ein emotionaler Blick auf den Abschied von den Eltern, die einen großgezogen, geprägt und getragen haben.", perspective: "Dankbarkeit, Ehrfurcht und Liebe treffen auf den Schmerz des Loslassens.", message: "Ehre die Menschen, die dein Fundament geschaffen haben, solange sie da sind." },
  "14": { genre: "Ego-Boost Rap / arrogant & punchy", story: "P34nuts erzählt augenzwinkernd vom Weg des unverstandenen Inselbegabten mit großem IQ zum Rap-Boss.", perspective: "Die Selbstüberhöhung bleibt bewusst spielerisch und mit Witz gesetzt.", message: "Steh zu deiner Andersartigkeit – sie kann deine größte Superkraft sein." },
  "15": { genre: "Late-Night Atmospheric Rap / Dark 808s", story: "VIP ohne Namen handelt von Erfolg und Verträgen im Verborgenen, ohne den Billighype sozialer Netzwerke zu suchen.", perspective: "Der Track kritisiert Follower-Sucht und Scheinruhm.", message: "Echte Macht und Erfolg brauchen keine Kameras und keinen öffentlichen Applaus." },
  "16": { genre: "Boom Bap / schwarzer Humor", story: "Eine sarkastische Liebeserklärung an eine Partnerin, die am Morgen schon an den Rand des Wahnsinns treibt.", perspective: "Trockener Humor macht aus den Macken einer langen Beziehung eine gemeinsame Szene.", message: "Echte Liebe hält auch den nervigsten Alltag aus." },
  "17": { genre: "Psychologischer Rap / Dark Comedy", story: "Die Therapie wirkt zeigt den inneren Kampf zwischen gut gemeinten Empfehlungen wie Tee trinken und ruhig bleiben – und dem Lärm im Kopf.", perspective: "Die scheinbare Gelassenheit wird ironisch gebrochen.", message: "Der Weg zu innerem Frieden kann chaotisch sein." },
  "18": { genre: "Funky Boom Bap / erotische Comedy", story: "Ein Handwerker repariert vermeintliche Notfälle bei Kundinnen; doppeldeutige Begriffe und klassisches Storytelling treiben den Humor.", perspective: "Der Track bleibt frech und augenzwinkernd.", message: "Ein humorvoller, doppeldeutiger Story-Track zum Schmunzeln." },
  "19": { genre: "Satirischer Workout & Business Rap", story: "Ein Alltag, der von morgens bis abends mit Pillen, Boostern, Ritalin und Optimierungsdruck getaktet wird.", perspective: "Der Song kritisiert Leistungsgesellschaft und die Medikalisierung des Funktionierens.", message: "Wenn Funktionieren nur noch über Doping gelingt, ist das System krank." },
  "20": { genre: "Melancholischer Trap / Nightlife", story: "Als nächtliche Notlösung gebraucht zu werden, wenn jemand einsam ist, und danach wieder allein zurückzubleiben.", perspective: "Der Song benennt die schmerzhafte Erfahrung emotionalen Ausgenutztwerdens.", message: "Zerbrich dich nicht für jemanden, der dich nur im Dunkeln haben will.", contentNote: "Themenhinweis: emotionale Ausnutzung und Einsamkeit." },
  "21": { genre: "Trackprofil ausstehend", story: "Für Tunnelblick liegt im bereitgestellten Songbriefing noch keine freigegebene ausführliche Inhaltsbeschreibung vor.", perspective: "Die bestehende Archivnotiz und das Artwork bleiben sichtbar, bis eine autorisierte Trackbeschreibung folgt.", message: "Hintergrund und Kernbotschaft werden nach freigegebenem Briefing ergänzt." },
  "22": { genre: "Trackprofil ausstehend", story: "Für Wer bin ich? liegt im bereitgestellten Songbriefing noch keine freigegebene ausführliche Inhaltsbeschreibung vor.", perspective: "Die bestehende Archivnotiz und das Artwork bleiben sichtbar, bis eine autorisierte Trackbeschreibung folgt.", message: "Hintergrund und Kernbotschaft werden nach freigegebenem Briefing ergänzt." },
  "23": { genre: "Brutaler Gym-Phonk / Hardcore Rap", story: "Ein unerbittlicher Push-Pull-Legs-Trainingsplan wird zum Ventil für Wut und Schmerz.", perspective: "Das Fitnessstudio erscheint als Ort von Transformation und Disziplin.", message: "Wandle Wut in Eisen um: Disziplin schlägt Schmerz." },
};

export function getTrackStory(track: Track) {
  return trackStories[track.id];
}

export const releases: readonly Track[] = [
  { id: "01", slug: "dein-name-auf-nem-stein", title: "DEIN NAME AUF NEM STEIN", mood: "Night / memory", themes: ["Verlust", "Freundschaft", "Stille"], visualTheme: "loss", coverStyle: "track-stone", cover: originalCovers["01"], note: "Ein stiller Kader für Erinnerung ohne Pathos.", sunoId: "eb401eb1-fd65-4b66-b16f-e870042179e4" },
  { id: "02", slug: "was", title: "WAS?", mood: "Academic / absurd", themes: ["Ego", "Ironie", "Überlegenheit"], visualTheme: "ego", coverStyle: "track-was", cover: originalCovers["02"], note: "Präzision kippt mit Absicht ins Absurde.", sunoId: "26b45c1f-01d5-4ea9-b457-bd589793f3e0" },
  { id: "03", slug: "p34nuts-regelt-das", title: "P34NUTS REGELT DAS", mood: "Control / comic", themes: ["Charisma", "Selbstironie", "Kontrolle"], visualTheme: "control", coverStyle: "track-controls", cover: originalCovers["03"], note: "Ein überernster Problemlöser in einer viel zu großen Geste.", sunoId: "ed79a111-18bf-4476-ad9d-0b01fabc7df3" },
  { id: "04", slug: "maskenball", title: "MASKENBALL", mood: "Elegant / alone", themes: ["Maske", "Einsamkeit", "Rolle"], visualTheme: "mask", coverStyle: "track-mask", cover: originalCovers["04"], note: "Außen ein Ritual, innen ein leerer Raum.", sunoId: "6fc6cffd-60cc-4440-81e0-4dfde2bd575a" },
  { id: "05", slug: "ich-hasse-dich-zu-lieben", title: "ICH HASSE DICH (..ZU LIEBEN)", mood: "Cold / close", themes: ["Liebe", "Konflikt", "Distanz"], visualTheme: "conflict", coverStyle: "track-distance", cover: originalCovers["05"], note: "Nähe bleibt sichtbar, Einigkeit nicht.", sunoId: "b17a773d-3f48-47de-b196-aecd07c1bf2d" },
  { id: "06", slug: "scheiss-auf-das-wetter", title: "SCHEISS AUF DAS WETTER", mood: "Wet / free", themes: ["Regen", "Freiheit", "Energie"], visualTheme: "weather", coverStyle: "track-weather", cover: originalCovers["06"], note: "Nasser Asphalt, keine Ausrede.", sunoId: "ec5d49f0-1b60-48ac-ad9a-5b062aee773a" },
  { id: "07", slug: "ungefiltert", title: "UNGEFILTERT", mood: "Polished / broken", themes: ["Realität", "Fassade", "Social media"], visualTheme: "filter", coverStyle: "track-filter", cover: originalCovers["07"], note: "Die Oberfläche ist glatt. Die Reflexion nicht.", sunoId: "32dab6d3-798d-47ad-85c8-e35ebcfa6e8f" },
  { id: "08", slug: "zuendschnur", title: "ZÜNDSCHNUR", mood: "Tense / industrial", themes: ["Druck", "Spannung", "Grenze"], visualTheme: "pressure", coverStyle: "track-fuse", cover: originalCovers["08"], note: "Ein roter Faden, der nicht ewig hält.", sunoId: "6091bf0f-5db5-45b1-be96-6f548ba96e55" },
  { id: "09", slug: "urlaub-burnout", title: "URLAUB-BURNOUT", mood: "Bright / exhausted", themes: ["Humor", "Überforderung", "Luxus"], visualTheme: "burnout", coverStyle: "track-pool", cover: originalCovers["09"], note: "Erholung ist nur ein anderer Hintergrund.", sunoId: "af159a14-5f9a-46d7-87a8-49165fd5dc86" },
  { id: "10", slug: "zeitlupe", title: "ZEITLUPE", mood: "Slow / moving", themes: ["Zeit", "Stillstand", "Melancholie"], visualTheme: "time", coverStyle: "track-time", cover: originalCovers["10"], note: "Alles zieht vorbei. Ein Kader bleibt stehen.", sunoId: "9dea2819-94e4-4c9c-a298-8d4dc8427d12" },
  { id: "11", slug: "diamanten-im-staub", title: "DIAMANTEN IM STAUB", mood: "Dust / light", themes: ["Wert", "Druck", "Widerstand"], visualTheme: "value", coverStyle: "track-diamond", cover: originalCovers["11"], note: "Ein Lichtpunkt in Betonstaub.", sunoId: "44dff979-c72c-48e7-8cda-38fff8719434" },
  { id: "12", slug: "was-waere-wenn", title: "WAS WÄRE WENN?", mood: "Split / possible", themes: ["Entscheidung", "Hoffnung", "Alternative"], visualTheme: "choice", coverStyle: "track-choice", cover: originalCovers["12"], note: "Zwei Wege. Kein neutraler Blick zurück.", sunoId: "3278b841-77a3-449d-a4a7-83d005634486" },
  { id: "13", slug: "wie-sagt-man-lebewohl", title: "WIE SAGT MAN LEBEWOHL?", mood: "Quiet / warm", themes: ["Familie", "Abschied", "Erinnerung"], visualTheme: "farewell", coverStyle: "track-chair", cover: originalCovers["13"], note: "Ein leerer Stuhl hält den Raum zusammen.", sunoId: "9e6325b3-77d2-41fa-93a6-825abf56311b" },
  { id: "14", slug: "p34nuts", title: "P34NUTS", mood: "Myth / playful", themes: ["Mythos", "Humor", "Selbstbild"], visualTheme: "myth", coverStyle: "track-myth", cover: originalCovers["14"], note: "Zu groß für den Rahmen. Genau deshalb im Rahmen.", sunoId: "8e9441ed-6c77-418b-bc38-3b75876b08b3" },
  { id: "15", slug: "vip-ohne-namen", title: "VIP OHNE NAMEN", mood: "Velvet / anonymous", themes: ["Nacht", "Status", "Identität"], visualTheme: "vip", coverStyle: "track-vip", cover: originalCovers["15"], note: "Ein Zugang ohne Gesicht.", sunoId: "c32ad553-cec4-4fa7-b22f-a2e851942d78" },
  { id: "16", slug: "guten-morgen-sonnenschein", title: "GUTEN MORGEN SONNENSCHEIN", mood: "Sweet / wrong", themes: ["Kontrast", "Unruhe", "Oberfläche"], visualTheme: "sunshine", coverStyle: "track-sun", cover: originalCovers["16"], note: "Zu hell, um beruhigend zu sein.", sunoId: "dadc52f8-b985-4ff4-8ddd-941c53c6d31d" },
  { id: "17", slug: "die-therapie-wirkt", title: "DIE THERAPIE WIRKT", mood: "Calm / chaos", themes: ["Ironie", "Ordnung", "Chaos"], visualTheme: "therapy", coverStyle: "track-therapy", cover: originalCovers["17"], note: "Alles ist völlig entspannt. Fast.", sunoId: "018ede07-c894-4e31-accc-e6991141939a" },
  { id: "18", slug: "handwerker-des-jahres", title: "HANDWERKER DES JAHRES", mood: "Workshop / dry", themes: ["Handwerk", "Selbstbewusstsein", "Comedy"], visualTheme: "craft", coverStyle: "track-workshop", cover: originalCovers["18"], note: "Eine Werkbank, eine Haltung, kein Prahlen.", sunoId: "744cbaeb-9d43-4132-863a-93c472a000bb" },
  { id: "19", slug: "auf-rezept", title: "AUF REZEPT", mood: "Clinical / absurd", themes: ["Satire", "Kontrolle", "Absurdität"], visualTheme: "prescription", coverStyle: "track-script", cover: originalCovers["19"], note: "Keine Medizin. Nur eine absurd exakte Ordnung.", sunoId: "d5bbe87a-ff93-4897-8dd5-1d2e1c58561b" },
  { id: "20", slug: "dreckig-und-in-traenen", title: "DRECKIG UND IN TRÄNEN", mood: "Night / empty", themes: ["Verlust", "Leere", "Nähe"], visualTheme: "absence", coverStyle: "track-bedroom", cover: originalCovers["20"], note: "Nach dem Licht bleibt das Zimmer.", sunoId: "c91c2941-1411-42a6-8e24-e91d9ba822f7" },
  { id: "21", slug: "tunnelblick", title: "TUNNELBLICK", mood: "Fast / dark", themes: ["Adrenalin", "Nacht", "Geschwindigkeit"], visualTheme: "motion", coverStyle: "track-tunnel", cover: originalCovers["21"], note: "Licht zieht vorbei, der Blick bleibt eng.", sunoId: "3fc527bc-cc46-4c2f-869b-ab66c9e30d91" },
  { id: "22", slug: "wer-bin-ich", title: "WER BIN ICH?", mood: "Mirror / split", themes: ["Identität", "Zweifel", "Wahrheit"], visualTheme: "identity", coverStyle: "track-mirror", cover: originalCovers["22"], note: "Die Reflexion stimmt nicht ganz mit dir überein.", sunoId: "72153de1-a135-4d6d-b7b7-601ac88e915e" },
  { id: "23", slug: "zyklus-der-gewalt-gym", title: "ZYKLUS DER GEWALT (GYM)", mood: "Iron / force", themes: ["Disziplin", "Kraft", "Kreislauf"], visualTheme: "strength", coverStyle: "track-gym", cover: originalCovers["23"], note: "Eisen, Atem, Wiederholung. Kein Werbeversprechen.", sunoId: "aa77f9ba-5263-454e-a263-c23e96a4b041" },
];

export type DiscoveryPath = {
  label: string;
  title: string;
  trackSlug: string;
};

export const discoveryPaths: readonly DiscoveryPath[] = [
  { label: "Emotional", title: "Für den Moment, der hängen bleibt.", trackSlug: "dein-name-auf-nem-stein" },
  { label: "Dark", title: "Wenn die Rolle mehr Platz braucht als der Raum.", trackSlug: "maskenball" },
  { label: "Unfiltered", title: "Für den Blick hinter die glatte Oberfläche.", trackSlug: "ungefiltert" },
  { label: "Humor", title: "Wenn Kontrolle zu ernst genommen wird.", trackSlug: "p34nuts-regelt-das" },
  { label: "Identity", title: "Für den Unterschied zwischen Spiegel und Gesicht.", trackSlug: "wer-bin-ich" },
  { label: "Drive", title: "Wenn Widerstand wieder nach vorne zieht.", trackSlug: "diamanten-im-staub" },
] as const;

export const DISCOVERY_ROTATION_INTERVAL_MS = 10_000;
export const DISCOVERY_SLOT_COUNT = 6;

/**
 * Creates a fresh six-track discovery edit. The previous six tracks are excluded when
 * possible, so the next cut is visibly different and never repeats a card in the same grid.
 */
export function getRotatingDiscoveryPaths(
  previousSlugs: readonly string[] = [],
  random: () => number = Math.random,
): readonly DiscoveryPath[] {
  const previous = new Set(previousSlugs);
  const candidates = releases.filter((track) => !previous.has(track.slug));
  const source = candidates.length >= DISCOVERY_SLOT_COUNT ? candidates : releases;
  const shuffled = [...source];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const selectedIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[selectedIndex]] = [shuffled[selectedIndex]!, shuffled[index]!];
  }

  return shuffled.slice(0, DISCOVERY_SLOT_COUNT).map((track) => ({
    label: track.mood.split("/")[0]!.trim().toUpperCase(),
    title: track.note,
    trackSlug: track.slug,
  }));
}

export function getTrackBySlug(slug?: string) {
  return releases.find((track) => track.slug === slug);
}

/** A deterministic daily entry point. No visitor data is stored or transmitted. */
export function getFrameOfTheDay(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return releases[day % releases.length];
}

export function getAdjacentTracks(track: Track) {
  const index = releases.findIndex((candidate) => candidate.id === track.id);
  return {
    previous: index > 0 ? releases[index - 1] : undefined,
    next: index >= 0 && index < releases.length - 1 ? releases[index + 1] : undefined,
  };
}

export function getRelatedTracks(track: Track, limit = 3) {
  const related = releases
    .filter((candidate) => candidate.id !== track.id)
    .map((candidate) => ({ candidate, score: candidate.themes.filter((theme) => track.themes.includes(theme)).length }))
    .sort((a, b) => b.score - a.score || a.candidate.id.localeCompare(b.candidate.id))
    .filter((entry) => entry.score > 0)
    .map((entry) => entry.candidate);
  const fallback = releases.filter((candidate) => candidate.id !== track.id && !related.includes(candidate));
  return [...related, ...fallback].slice(0, Math.max(3, limit));
}

export const featuredVisual = {
  category: "Official video",
  title: "WIE SAGT MAN LEBEWOHL?",
  poster: assets.featuredVideo,
  youtubeId: "h_bt_480qmg",
} as const;

export const visuals = [
  { id: "01", category: "Official video", title: "WAS WÄRE WENN?", poster: originalCovers["12"], youtubeId: "OBaE9ZOwVwA", size: "visual-featured" },
  { id: "02", category: "Official video", title: "DRECKIG UND IN TRÄNEN", poster: originalCovers["20"], youtubeId: "NXtU02ODW9Y", size: "visual-half" },
  { id: "03", category: "Official video", title: "VIP OHNE NAMEN", poster: originalCovers["15"], youtubeId: "wgMI-aRa27I", size: "visual-half" },
  { id: "04", category: "Official video", title: "P34NUTS", poster: originalCovers["14"], youtubeId: "MCFwHBUY_3I", size: "visual-half" },
  { id: "05", category: "Official video", title: "TUNNELBLICK", poster: originalCovers["21"], youtubeId: "dAiglv-XJVw", size: "visual-half" },
] as const;

export const gallery = [
  { id: "01", caption: "Crown / smoke portrait", src: assets.editorial, className: "gallery-portrait", category: "EDITORIAL" },
  { id: "02", caption: "Rain / city reflection", src: assets.galleryRaw, className: "gallery-stage", category: "RAW" },
  { id: "03", caption: "Bridge / after dark", src: assets.performance, className: "gallery-detail", category: "CONCEPT" },
  { id: "04", caption: "Studio / microphone", src: assets.studioMicrophone, className: "gallery-landscape", category: "MUSIC" },
  { id: "05", caption: "Discipline / rain study", src: assets.galleryDiscipline, className: "gallery-discipline", category: "DISCIPLINE" },
  { id: "06", caption: "Night / neon alley", src: assets.galleryNight, className: "gallery-night", category: "NIGHT" },
] as const;

export const socialLinks = [
  { label: "Instagram", detail: "@p34nuts_official", href: "https://www.instagram.com/p34nuts_official?igsh=MTI1cW4xMXd2cGFrdA==" },
  { label: "YouTube", detail: "@p34nuts_official", href: "https://youtube.com/@p34nuts_official" },
  { label: "X", detail: "@p34nutsofficial", href: "https://x.com/p34nutsofficial" },
  { label: "TikTok", detail: "@p34nuts_official", href: "https://pro.tiktok.com/t/ZG9BFUgVXkFkN-8sClc/" },
] as const;

export const booking = {
  email: "P34nuts@mail.de",
  management: "",
  note: "Direkte Booking-Anfragen werden per E-Mail entgegengenommen. Weitere Managementdaten folgen nur nach bestätigter Freigabe.",
} as const;

export const pressKitItems = ["Hero portrait", "Editorial portrait", "Raw portrait", "Logo mark", "Release system", "Booking contact"] as const;
