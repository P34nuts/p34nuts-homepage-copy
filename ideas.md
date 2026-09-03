# P34nuts — Gestaltungsnotizen

## Drei mögliche Richtungen

### Theme Name: **Noir Cut**
**Very Brief Intro:** Eine reduzierte, filmische Bildsprache verbindet Schwarz, Papierweiß und einen präzisen Rotton. Sie übersetzt den Sound in Spannung, Rhythmus und starke Ausschnitte statt in Rap-Klischees.
**Probability:** 0.07

### Theme Name: **Concrete Archive**
**Very Brief Intro:** Brutalistisches Editorial trifft auf das Gefühl eines handverlesenen Fotoarchivs. Typografische Stempel und klare Raster erzeugen eine körperliche, urbane Präsenz.
**Probability:** 0.04

### Theme Name: **Silver Frequency**
**Very Brief Intro:** Kühles Chrom, Nachtschatten und abstrakte Audiowellen formen eine luxuriöse, fast technische Artist-Identität. Der Auftritt wäre präzise, abstrahiert und distanziert.
**Probability:** 0.09

---

## Gewählte Richtung: **Noir Cut**

### Design Movement
**Noir Cut** verbindet Editorial Fashion, analoges Filmmaterial und die Spannung einer Musikvideo-Titelsequenz. Das Design verzichtet bewusst auf dekorative Rap-Symbole und gewinnt Charakter durch entschlossene Typografie, harte Bildkanten, Schwarzflächen und gezielte Unterbrechungen.

### Core Principles
1. **Kader statt Karten:** Flächen verhalten sich wie Filmkader – groß, offen, angeschnitten und bewusst gewichtet.
2. **Rhythmus durch Kontrast:** Extreme Schriftgrößen und variable Abstände lassen Inhalte wie Verse und Pausen wirken.
3. **Unverstellte Materialität:** Feines Grain, Haarlinien und warmes Papierweiß schaffen Tiefe ohne Glanz oder Effekthascherei.
4. **Eine kontrollierte Störung:** Der akzentuierte Rotton signalisiert Energie, aber immer nur als präzise Markierung.

### Color Philosophy
Die Basis ist ein nahezu schwarzes **Ink Black**, damit Fotografien und helle Typografie wie beleuchtete Kader wirken. **Paper White** nimmt dem Kontrast die digitale Härte und erinnert an Druck. **Signal Red** ist keine Dekoration, sondern ein Taktgeber für Status, Marker, Hover und einzelne grafische Einschnitte. So wirkt der Auftritt rau, kontrolliert und exklusiv.

### Layout Paradigm
Die Seite folgt einem **vertikalen Schnittplan** statt eines gleichmäßigen Rasterlayouts. Abschnitte wechseln zwischen Full-Bleed-Bildmomenten, asymmetrischen Dreiteilungen, langen Laufzeilen und redaktionellen Randnotizen. Jede Sektion hat eine eigene Bild- und Texthierarchie, bleibt aber durch dieselben Kaderlinien verbunden.

### Signature Elements
1. **Crop Bars:** Dünne rote Registermarken und weiße Laufnummern strukturieren die Seite wie einen Schnittbogen.
2. **Frame Captions:** Kleine Monospace-Beschriftungen an Bild- und Abschnittsrändern geben jeder Fläche dokumentarische Präzision.
3. **Kinetic Type Strips:** Großformatige, langsam gleitende Wortbänder bilden Übergänge zwischen den Kapiteln.

### Interaction Philosophy
Interaktionen wirken wie das Bedienen eines gut kuratierten Archivs: klar, direkt und taktil. Cover reagieren mit kontrollierter Skalierung und einer Listen-Einblendung; Videos öffnen sich ohne Seitenwechsel; ein Desktop-Cursor benennt die verfügbare Handlung. Jede Interaktion gibt eindeutiges Feedback, ohne den Inhalt zu übertönen.

### Animation
Der erste Aufruf beginnt mit einer sehr kurzen zweistufigen Wortmarken-Reveal (maximal 1,2 Sekunden), danach bleibt die Bewegung zurückhaltend. Überschriften werden beim Eintritt aus einer Maskierung freigelegt, Bilder erscheinen über Opazität und leichte Translation, und Textstrips gleiten konstant, aber sparsam. Die Dauer liegt grundsätzlich zwischen 180 und 700 ms; beim Systemwunsch nach reduzierter Bewegung werden alle nicht essenziellen Bewegungen ausgeschaltet.

### Typography System
**Space Grotesk** ist die funktionale Sans für Navigation, Metadaten und Fließtext. **Bodoni Moda** liefert die dramatische, modische Display-Stimme für Headlines und Statements; ihre Kursiven werden punktuell als Gegenrhythmus eingesetzt. Großbuchstaben bleiben den Interface- und Archivinformationen vorbehalten, während Headlines in klarer Groß-/Kleinschreibung atmen dürfen. Große Titel skalieren mit `clamp()` und füllen an ausgewählten Stellen fast den gesamten Kader.

### Brand Essence
**P34nuts ist ein kompromisslos inszenierter Artist-Auftritt für Hörerinnen und Hörer, die Klang als Atmosphäre, Haltung und Bild verstehen.**

Die Persönlichkeit ist **präzise**, **unverstellt** und **nächtlich**.

### Brand Voice
Headlines sind knapp und schneiden sofort in den Inhalt. Calls-to-Action benennen Handlungen klar; Mikrocopy klingt wie eine Produktionsnotiz, nicht wie Werbung.

> „Kein Filter. Nur Frequenz.“

> „Der nächste Kader läuft bereits.“

### Wordmark & Logo
Die Wortmarke setzt **P34** in einer engen Grotesk gegen ein kursives, gestrecktes **nuts**. Ein roter diagonaler Einschnitt zwischen den Teilen bildet die wiederkehrende Marke und kann als abstrahiertes Einzelzeichen eingesetzt werden. Die finale Umsetzung bleibt bewusst vektoriell und austauschbar.

### Signature Brand Color
**Cut Red — #FF3B30.** Ein warmer, unmissverständlicher Rotton, der sich wie eine Schnittmarke durch das gesamte System zieht.

## Style Decisions

- Keine Marken- oder Leistungsbehauptungen ohne bestätigte Daten.
- Noch fehlende Releases, Videos, Kontakte, Social-URLs und Press-Material werden als klar erkennbare, zentral gepflegte Platzhalter angelegt.
- Auf extern eingebettete Medien wird zunächst über einen kontextuellen Öffnungsdialog hingewiesen; kein Tracking oder Audio startet selbsttätig.
- **Cut Red** bleibt ein chirurgischer Schnitt: kinetische Strips, Registermarken und schmale Felder dürfen dominieren; große Flächen erhalten immer einen Ink-Black- oder Paper-White-Gegenkader.
- Unveröffentlichte Archivbilder bleiben als nummerierte Filmkader mit Metadaten, Crop Bars und Registerlinien erkennbar; sie erscheinen nicht als leere Standardflächen.
- Die Sans-/Serif-Spannung ist die Stimme des Auftritts, doch jeder Kapitelwechsel verändert Dichte, Zuschnitt oder Orientierung, damit die Seite wie ein Schnittplan statt wie eine Abfolge identischer Poster wirkt.
- Die Sans-/Serif-Headline ist ein wiederkehrender Refrain, aber keine Standardlösung: aufeinanderfolgende Kapitel wechseln über Kadernummern, Crop Bars, Bilddominanz, Randnotizen oder horizontale Archivelemente.
- Fehlende Releases, Videos, Kontakte und Press-Material erscheinen als nummerierte Produktionskader mit Registermarke und Cut-Red-Signal; sie wirken nie wie generische Leer- oder Adminmodule.
- Englisch trägt kurze Titel und Chorus-Energie; Deutsch liefert konkrete Archiv-, Quellen- und Freigabehinweise. Platzhalter sprechen wie Produktionsnotizen, nicht wie Systemmeldungen.
- Originalcover erscheinen als **archivierte Quellmaterialien**: Ein dunkler Contact-Sheet-Rahmen, reduzierte Sättigung, eingebrannte Metadaten und eine präzise Cut-Red-Kante halten die individuelle Artwork-Sprache innerhalb der Noir-Cut-Welt.
- Verfügbare und ausstehende Medien unterscheiden sich wie Produktionskader: fehlende Quellen tragen klare Statuszeilen, Registermarkierungen und archivische Kanten statt generischer Leerflächen.
- Auf Unterseiten führt die Wortmarke einen schmalen roten Schnitt und eine kleine Archive-Metazeile; sie bleibt damit wiedererkennbar, ohne die eigentliche Inhaltsdramaturgie zu übertönen.
- Der **diagonale Cut Mark** wiederholt sich als kleinste, präzise Markenhandlung in Header, Kontaktformular, Medienrahmen, Live-Status und Footer. Er folgt immer einer Funktion – Register, Frame-Schnitt oder Quellennachweis – und wird nie zur dekorativen Fläche.
- Späte Kapitel brechen die Poster-Rhythmik durch unterschiedliche Frame-Logiken: das Booking-Formular als Paper-White-Request-Quelle, Live als horizontale Statuslinie, Visuals als mediale Quellennummern und Press als Endkader.
