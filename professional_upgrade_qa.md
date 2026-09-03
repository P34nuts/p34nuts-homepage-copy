# Professional Upgrade — QA-Protokoll

## Visuelle Zwischenprüfung

Die Desktopansicht des neuen Music Finders fügt sich als eigenständiger schwarzer Archivkader stimmig in die vorhandene Noir-Cut-Dramaturgie ein. Suchfeld, Themenfilter, Zufallseinstieg und die 23 Coverkarten sind sichtbar und bilden eine klare Musikentdeckungsstrecke zwischen kuratiertem Einstieg und Vollarchiv.

Auf der Trackdetailseite ist die direkte Suno-Verfügbarkeit jetzt vor dem Player klar markiert. Die neuen Aktionen „Teilen“ und „Link kopieren“ bleiben zurückhaltend, gut lesbar und stehen in keiner Konkurrenz zur primären Wiedergabe. Die Booking-Unterseite behält ihre gut lesbare Einstiegs- und CTA-Hierarchie.

Die interaktive Prüfung der Suchfeld-Eingabe wird im weiteren Verlauf über eine gezielte DOM-Ereignisauslösung nachgeholt, da die erste Browser-Automatisierung den sichtbaren React-Zustand noch nicht aktualisiert hat.

## Interaktive Prüfung Music Finder

Die gezielte DOM-Prüfung bestätigte die React-Filterlogik: Die Suche nach „Tunnelblick“ reduzierte den Finder auf **1 FRAME** mit dem erwarteten Titel **TUNNELBLICK**. Der Themenfilter „Verlust“ zeigte exakt **2 FRAMES**: **DEIN NAME AUF NEM STEIN** und **DRECKIG UND IN TRÄNEN**. Damit sind sowohl Freitext- als auch Themenfilter gegen die zentrale Trackdatenquelle funktionsfähig.

Die Aktion „START A FRAME“ führte auf die valide Detailroute `/music/dreckig-und-in-traenen`. Dort waren Cover, Story, Themenhinweis, Full-Track-Suno-Aktion sowie die neuen Teilen- und Link-kopieren-Aktionen sichtbar und zugänglich. Die Route fungiert damit zugleich als erfolgreicher Praxistest für die lokale Track-Historie.

Nach der Designprüfung wurde die doppelte Vollarchiv-Liste zugunsten des Music Finders entfernt. Der Finder bleibt damit die einzige vollständige 23-Track-Ansicht; die danach sichtbare, ausschließlich lokal gespeicherte Rückkehrkarte zeigt den zuvor geöffneten Track **DRECKIG UND IN TRÄNEN**. Dadurch wird der Music-Flow kürzer, ohne einen Trackzugang zu verlieren.

Die Rückkehrkarte wurde anschließend selbst aktiviert und führte wieder auf `/music/dreckig-und-in-traenen`. Der Tracktitel, die vollständige Suno-Aktion und die Share-Aktionen erschienen erneut korrekt. Der Verlauf nutzt dabei ausschließlich den lokalen Browser-Speicher und übermittelt keine Besuchsdaten an den Server.

## Vollständige Mobile-Routenprüfung

Die mobile Prüfung bei 375 px Breite umfasst Startseite, Music Finder, Trackdetail, Booking, Press, Impressum, Datenschutz und 404. Alle Routen bleiben einspaltig, lesbar und ohne sichtbaren horizontalen Überlauf. Der Music Finder ordnet seine Suche, Filter und 23 Kader als klaren vertikalen Flow an; auf der Trackseite bleiben Full-Track-, Teilen- und Kopieren-Aktionen getrennt erreichbar. Die Legal-Vorlagen, Booking-CTA und 404-Ausweichroute besitzen sichtbare, ausreichend große Bedienelemente.

Die identische Routenabdeckung wurde anschließend bei 1280 px Breite geprüft. Startseite, Music Finder, Trackdetail, Booking, Press, Impressum, Datenschutz und 404 behalten jeweils eine klare Noir-Cut-Hierarchie, korrekte Diagonalflächen, lesbare Kacheln und sichtbare Ausweichnavigation. Besonders der Music Finder trennt auf Desktop Such-/Filtersteuerung, 23-Frame-Grid und lokalen Verlauf nachvollziehbar; die Trackdetailseite priorisiert Cover, Full-Track-Quelle und Teilen vor dem Story-Kontext.

## Technischer Gesamtlauf

Der Produktions-Build, die TypeScript-Prüfung und **15 automatisierte Tests in 11 Testdateien** waren erfolgreich. Die nichtkritischen Music-, Track-, Info- und 404-Routen werden nun als getrennte Chunks geladen. Der zentrale JavaScript-Chunk sank im Produktions-Build von rund 752 kB auf rund 727 kB; die Unterseiten erscheinen als separate kleine Routenpakete.

Die HTTP-Prüfung der Routen `/`, `/music`, `/music/dreckig-und-in-traenen`, `/booking`, `/press`, `/impressum`, `/datenschutz` und `/404` ergab jeweils **HTTP 200**. Die aktuellen Entwicklungs- und Browserprotokolle enthalten nach dem Upgrade keine neuen Laufzeitfehler.

## Dialog- und Bedienzugänglichkeit

Der Trackdialog wurde über seinen klaren `aria-label`-Trigger geöffnet. Das Radix-basierte modale Element erhielt den Fokus, stellte die explizite Aktion „Trackdialog schließen“ bereit und wurde durch eine echte Escape-Tasteneingabe wieder geschlossen. Die zugrunde liegenden Dialogkomponenten verwenden die gemeinsame Radix-Dialogprimitive mit Modal-Semantik, Fokusmanagement, Rückkehrfokus, Escape-Behandlung und Portal-Overlay. Die Website respektiert weiterhin `prefers-reduced-motion` für die vorhandenen Framer-Motion-Übergänge.

Der Reduced-Motion-Codepfad wurde zusätzlich statisch geprüft: Die Startseite bezieht `useReducedMotion` in Intro-, Hero- und Mobile-Menu-Übergänge ein; das globale Stylesheet enthält eine eigene `@media (prefers-reduced-motion: reduce)`-Regel. Diese deaktiviert die Marquee-Animation sowie Transitionen für Header, Karten, Bilder und Interaktionsflächen und setzt den Scrollfluss auf direkt. Die Dialogprimitive selbst besitzt keine dekorative Einblendanimation, sodass Escape-, Fokus- und Close-Verhalten unabhängig von Bewegungseinstellungen identisch bleiben.

Nach dem Escape-Schließen war der Dialog aus dem DOM entfernt und der Fokus kehrte auf den ursprünglichen Trigger „DEIN NAME AUF NEM STEIN – Track-Archiv öffnen“ zurück. Auch der Video-Dialog wurde über seinen beschrifteten Trigger geprüft: Erst nach dem Klick entstand ein iframe mit einer `youtube-nocookie.com`-Quelle; vor dem Öffnen ist dieser externe Player nicht im Dokument vorhanden.

Das tatsächliche Escape-Schließen des Video-Dialogs entfernte anschließend sowohl den Dialog als auch den No-Cookie-Iframe vollständig aus dem Dokument. Der Fokus kehrte auf „Official video: WIE SAGT MAN LEBEWOHL? öffnen“ zurück. Damit ist der externe Videokontext auf einen ausdrücklichen Klick und die aktive Sichtbarkeit des Dialogs begrenzt.

Die Suno-Integration wurde ebenfalls im Trackdialog geprüft: Nach dem Öffnen von „DEIN NAME AUF NEM STEIN“ erzeugte erst die Aktion „PLAY FULL TRACK / SUNO“ einen `suno.com/embed`-iframe. Die anschließende Entfernen-Aktion entfernte den iframe wieder vollständig, während der Trackdialog geöffnet blieb. Damit sind auch die 23 Musikquellen auf aktive, reversible Wiedergabe begrenzt.

Nach der Suno-Prüfung wurde der Trackdialog per Escape geschlossen. Die anschließende Zustandsprüfung bestätigte erneut, dass weder ein modaler Dialog noch ein Suno-iframe im Dokument verblieben.

## Ergänzende Kerninteraktionen

Eine Suche ohne Treffer im Music Finder erzeugte erwartungsgemäß den klaren Leerzustand „NO FRAME IN THIS CUT.“ samt Aktion „ALLE FRAMES ZEIGEN“. Damit bleibt der Entdeckungsfluss auch für nicht passende Eingaben vollständig.

Die Aktion „ALLE FRAMES ZEIGEN“ wurde ebenfalls ausgelöst. Sie entfernte den Leerzustand und stellte wieder exakt **23 Trackkader** her.

Der Booking-Honeypot wurde mit vollständig ausgefüllten, lokalen QA-Werten und gesetztem verstecktem Feld geprüft. Der Formularfluss wurde vor einer Netzwerkanfrage beendet (`fetchCalls: 0`) und zeigte lediglich den neutralen direkten Kontakt-Hinweis. Es wurden dabei **keine Daten gespeichert und keine E-Mail gesendet**. Die serverseitige Zeitfensterbegrenzung ist zusätzlich durch zwei automatisierte Tests abgedeckt.

Die native Share-Aktion wurde mit einer lokalen Browser-Share-Schnittstelle geprüft. Sie übergab den erwarteten Titel **„DEIN NAME AUF NEM STEIN — P34nuts“** und die korrekte Track-URL, ohne eine externe Veröffentlichung auszulösen. Der separate Link-kopieren-Flow übergibt dieselbe URL an die Zwischenablage; beide Aktionen sind damit unabhängig vom jeweils verfügbaren Plattformdialog verwendbar.

Der tatsächliche Fallback wurde zusätzlich simuliert: Bei fehlendem `navigator.share` aktivierte die Aktion „TEILEN“ automatisch den Link-kopieren-Pfad. Die erwartete Track-URL wurde an die lokale Zwischenablage übergeben und die Oberfläche bestätigte „LINK KOPIERT“. Auch dieser Test hat keine externe Veröffentlichung ausgelöst.

Die Booking-Rate-Limit-Prüfung ist bewusst nicht über eine reale Browserübermittlung durchgeführt worden, damit keine künstliche Anfrage in Datenbank, Eigentümerbenachrichtigung oder Mail.de-Postfach gelangt. Sie wird durch die dedizierten serverseitigen Tests `bookingRateLimit.test.ts` abgedeckt; zusammen mit dem browserseitig verifizierten Honeypot bildet dies die vollständige, nicht-destruktive Booking-QA.

## Narrative and Archive Upgrade

Die zweite Ausbauwelle ergänzt die Startseite um ein Artist-Manifest, das ausschließlich aus dem freigegebenen Profil abgeleitet ist. Das Music Archive zeigt nun zusätzlich einen deterministisch aus dem bestehenden Katalog gewählten, nicht personalisierten „Frame of the Day“ sowie eine fünfteilige Themen-Landkarte. Beide Bereiche führen direkt zu vorhandenen Trackdetailseiten und behaupten keine neuen Releases, Kennzahlen oder Ereignisse.

Auf der Trackdetailseite ergänzt eine klare Vor-/Zurück-Navigation die kontextbasierten „More like this“-Karten. Der erste und letzte Kader werden transparent als Archivgrenzen dargestellt. Die Desktop- und Mobilprüfung für Startseite, Music Archive und Trackdetail bestätigte lesbare Umbrüche, sichtbare Touch-Flächen und eine konsistente Noir-Cut-Hierarchie. Der neue Daten-Test deckt Themenrouten, deterministischen Tageskader und Nachbarlogik ab.

## Abschlussprüfung der zweiten Ausbauwelle

Die Startseite, das Music Archive und die Trackdetailseite wurden nach Abschluss der Implementierung jeweils bei **1280 × 720 px** und **375 × 812 px** als vollständige Seiten geprüft. Das Manifest bleibt auf der Startseite als klarer, eigenständiger Orientierungskader lesbar. Im Archiv folgen „Frame of the Day“, die sechsteilige Entdeckungsleiste und die fünfteilige Theme Map einer nachvollziehbaren kuratierten Reihenfolge, bevor der vollständige Music Finder beginnt. Auf Mobilgeräten ordnen sich diese Inhalte in einen ruhigen vertikalen Lesefluss ohne sichtbaren horizontalen Überlauf.

Die Trackdetailseite für **TUNNELBLICK** bestätigt die mobile und Desktop-Hierarchie der neuen Archivsequenz: Artwork und primäre Suno-Aktion bleiben im ersten Sichtbereich, die Vor-/Zurück-Links erhalten eine eigene, ausreichend große dreigeteilte Navigationszone, und der Kontext sowie die verwandten Kader folgen klar getrennt. Die Ergänzung bleibt damit eine Archivnavigation und ersetzt weder den vollständigen Music Finder noch die kuratierten verwandten Titel.

Während der ersten Browserprüfung wurde ein Pfadfehler festgestellt: Die Wouter-Basis `/` führte dazu, dass interne Links als protokollrelative URLs wie `//music/tunnelblick` gerendert wurden. Die Router-Basis wird am Root nun bewusst als leerer Präfix behandelt; GitHub-Pages-Unterpfade bleiben dagegen erhalten. Nach dem Fix zeigten Music-Archive, „Frame of the Day“, Theme Map sowie Vor-/Zurück-Navigation durchgängig Pfade mit genau einem führenden Slash. Der reale Übergang von **DRECKIG UND IN TRÄNEN** auf **TUNNELBLICK** wurde anschließend auf `/music/tunnelblick` bestätigt, ohne externe DNS-Auflösung.

Der abschließende technische Lauf war erfolgreich: **20 Tests in 13 Testdateien**, die TypeScript-Prüfung und der Produktions-Build liefen ohne Fehler durch. Der zusätzliche Router-Basis-Test unterscheidet dabei ausdrücklich zwischen einer Root-Bereitstellung (`/` → leerer Wouter-Präfix) und einem GitHub-Pages-Unterpfad (`/Mondfall/` → `/Mondfall`). Die bereits eingeführten Lazy-Routen bleiben als getrennte Build-Artefakte erhalten.

## Cover-Korrekturen

Die von P34nuts bestätigten Zuordnungen für **ZÜNDSCHNUR** und **WIE SAGT MAN LEBEWOHL?** wurden in der zentralen Coverquelle getauscht. Das bisherige Artwork von **GUTEN MORGEN SONNENSCHEIN** wurde aus allen Websiteansichten entfernt und durch das bereitgestellte Originalcover ersetzt. Die drei Detailseiten wurden bei **1280 × 720 px** und **375 × 812 px** visuell geprüft; zusätzlich bestätigte das gerenderte Music-Archive die passenden Bildquellen in allen drei Kacheln. Ein Daten-Test sichert die drei Coverpfade dauerhaft. Der anschließende technische Lauf ergab **21 erfolgreiche Tests in 13 Testdateien**, eine fehlerfreie TypeScript-Prüfung und einen erfolgreichen Produktions-Build.

## Markenassets und Seitenübergang

Das bereitgestellte breite P34nuts-Titelmotiv bildet nun die Hero-Bildwelt der Startseite. Die vorhandene Noir-Cut-Typografie, der dunkle Verlauf und die rote Registermarke bewahren dabei Lesbarkeit und die klare Einstiegshierarchie. Das neue runde P34nuts-Markensymbol wird zentral für Header, Intro und einen kurzen, nicht blockierenden Seitenstempel verwendet. Bei internen Routenwechseln erscheint der Stempel mit der Kennung „THE NEXT FRAME“, ohne die Navigation zu verzögern oder Eingaben abzufangen.

Die Heroansicht wurde bei **1280 × 720 px** und **375 × 812 px** visuell geprüft. Auf Mobilgeräten bleibt die neue Bildwelt klar lesbar und fokussiert den markanten Schriftzug; Header, Call-to-Action und Einstiegstext bleiben im sicheren Kontrastbereich. Die Markentransition ist für `prefers-reduced-motion` vollständig deaktiviert. Ein Asset-Test verifiziert das neue Hero- und Markensymbol; der technische Gesamtlauf bestätigt **22 erfolgreiche Tests in 14 Testdateien**, eine fehlerfreie TypeScript-Prüfung und einen erfolgreichen Produktions-Build.

Die Route-Animation wurde zusätzlich im Browser gegen ein tatsächliches `popstate`-Routenereignis geprüft. Der Overlay-Container wechselte sichtbar in seinen aktiven Zustand, enthielt das neue Markensymbol und trug die Kennung „THE NEXT FRAME“. Die Auslösung ist deshalb unmittelbar an Browser-Routenereignisse gebunden und nicht von einer verzögerten Komponentenaktualisierung abhängig. Der abschließende Test-, TypeScript- und Build-Lauf blieb mit **22 Tests in 14 Testdateien** erfolgreich.

Nach einer zusätzlichen Nachschärfung wird die Transition sowohl über Browser-Routenereignisse als auch über den von Wouter beobachteten Routenstatus ausgelöst. Der echte ALL-MUSIC-Linkklick von der Trackdetailseite zurück ins Archiv wurde im Browser erfasst: Der Link führte auf `/music`, der Marken-Overlay wechselte in den aktiven Zustand und die Beobachtung bestätigte das neue Markensymbol. Damit ist der Übergang nicht nur für History-Ereignisse, sondern auch für die reguläre interne SPA-Linknavigation geprüft.

## Schriftzug-Integration

Die neue Header-Wortmarke ersetzt den bisherigen gesetzten Markenname als direkter Home-Button. Die große Wortmarke ist als eigenständiger, kontrastreicher Hero-Layer eingebunden und bleibt von der breiten Titelbildschicht getrennt. Dadurch kann das derzeitige Hintergrundmotiv später ohne Anpassung der Wortmarke gegen freigegebene Künstlerportraits ausgetauscht werden.

Die reale Browseransicht bestätigte nach Abschluss des Asset-Ladevorgangs die geladenen Bildquellen für Header, Hero-Wortmarke und Titelmotiv. Die Desktopansicht bei **1280 × 720 px** behält eine klare linke Markenachse und ausreichend Raum für Navigation sowie Registermarke. Bei **375 × 812 px** bleiben Header-Schriftzug, Hero-Wortmarke, Einstiegstext und Call-to-Action sichtbar voneinander getrennt und ohne horizontalen Überlauf.

Der technische Abschlusslauf für die Schriftzug-Integration war erfolgreich: **22 Tests in 14 Testdateien**, TypeScript-Prüfung und Produktions-Build liefen ohne Fehler durch. Der erweiterte Markenasset-Test sichert nun das breite Titelmotiv, das runde Symbol sowie die neuen Header- und Hero-Wortmarken als zentrale Zuordnungen ab.

## Korrektur der Schriftzugzuordnung

Nach einem Hinweis von P34nuts wurden die beiden zuletzt bereitgestellten Schriftzüge in ihrer zentralen Asset-Zuordnung getauscht. Der **erste** Schriftzug steht nun als ausführliche Wortmarke im Hero; der **zweite**, kompaktere Schriftzug fungiert als Home-Signal links oben im Header. Die Darstellung wurde anschließend bei **1280 × 720 px** und **375 × 812 px** geprüft. Beide Ansichten zeigen eine klare Zuordnung, ausreichenden Kontrast und freie Navigation. Der technische Abschlusslauf blieb mit **22 Tests in 14 Testdateien**, erfolgreicher TypeScript-Prüfung und Produktions-Build fehlerfrei.

## First Artist Portrait Set

Die zehn von P34nuts bereitgestellten Künstlerbilder ersetzen nun die zuvor verwendeten generierten Hintergrund- und Portraitmotive im zentralen Home-Erlebnis. Die Zuordnung folgt einer dokumentierten Bildredaktion: **Skyline** für den Hero, **Sonnenuntergang** für den großen Visual-Kader, **Studio** für das Artist-Profil, **Regen und Straße** für den Kontrast, **Thron, Straße, Brücke und Mikrofon** für das Image Archive sowie **Bühne, Publikum und Mikrofon** für Booking. Die vollständige individuelle Einordnung ist in `artist_portrait_set_01_mapping.md` festgehalten.

Die Startseite wurde mit der neuen Bildfolge bei **1280 × 720 px** und **375 × 812 px** geprüft. Hero-Wortmarke, Header, Kontrastflächen, Video-CTA, Galeriebeschriftungen und Booking-Text behalten ausreichenden Kontrast; in der Mobilansicht bleibt die Reihenfolge der Kader ohne erkennbaren horizontalen Überlauf erhalten. Ein separater Test verifiziert die zehn Asset-URLs und die entscheidenden Rollenzuordnungen. Der technische Abschlusslauf bestätigte **24 Tests in 15 Testdateien**, die TypeScript-Prüfung und den Produktions-Build ohne Fehler.

## Second Artist Portrait Set

Fünf weitere von P34nuts gelieferte Motive ergänzen die Bildwelt nun gezielt: Das disziplinorientierte Fahrzeug-/Skyline-Motiv trägt den nicht als Songcover ausgewiesenen **Current Frame**; ein Sonnenuntergangs-/Hafenkader gibt dem bestätigungsfreien Live-Bereich Tiefe; das Löwenmotiv ergänzt den Press-Kader; Regen- und Neonmotive erweitern die Galerie um **DISCIPLINE** und **NIGHT**. Die Bilder wurden nicht als Nachweis realer Fahrzeuge, Orte, Shows oder Ereignisse ausgegeben. Die vollständige redaktionelle Einordnung ist in `artist_portrait_set_02_mapping.md` dokumentiert.

Desktop und Mobil wurden mit den neuen Kadern erfasst. Der sofort sichtbare Current Frame lädt prioritär; die tiefer liegenden Galerie-, Live- und Pressbilder laden datensparsam erst beim Erreichen ihres Scrollabschnitts. Ein eigener Test sichert die fünf Asset-URLs und die zentralen Rollenzuordnungen; der überarbeitete Erstserien-Test bleibt auf dessen vier ursprüngliche Galerierollen begrenzt. Der technische Abschlusslauf bestätigt **26 Tests in 16 Testdateien**, die TypeScript-Prüfung und den Produktions-Build ohne Fehler.

## Album Intro

Der bisherige Current-Frame-Kader führt jetzt sichtbar **ALBUM INTRO**. Die bereitgestellte MP3 wird nicht beim Seitenaufruf geladen: Erst ein echter Browserklick auf die Wiedergabeaktion weist dem Audioelement die Quelle zu. Der Player ermittelte anschließend eine Dauer von **03:04** und wechselte in den Pausenstatus, sodass Start, Ladezeit und zustandsabhängige Bedienbeschriftung direkt geprüft sind.

Der Spieler nutzt die bestehende mobile Playerstruktur: Der große Start-/Pause-Button, die Fortschrittslinie und die Zeitinformation bleiben am schmalen Breakpoint erreichbar; das rein dekorative Lautstärkesymbol wird dort ausgeblendet. Bei reduzierter Bewegung wird keine zusätzliche Bewegung eingeführt. Die zusätzliche Datenabsicherung prüft Intro-Asset und Album-Intro-Label. Der technische Abschlusslauf bestätigte **28 Tests in 17 Testdateien**, TypeScript-Prüfung und Produktions-Build ohne Fehler.

## Header Wordmark Refresh

Die bereitgestellte transparente Wortmarke ersetzt jetzt das bisherige Header-Home-Signal. Die Home-Fläche bleibt als beschrifteter Link erreichbar. Die Darstellung wurde bei **1280 × 720 px** und **375 × 812 px** geprüft: Die Wortmarke bleibt auf dem dunklen Headerhintergrund sichtbar, hält Abstand zum Menü und übernimmt auf Mobilgeräten eine kompakte, klar erkennbare Form. Die Markenasset-Prüfung sichert die neue Quelle. Der technische Abschlusslauf blieb mit **28 Tests in 17 Testdateien**, TypeScript-Prüfung und Produktions-Build erfolgreich.

## Watermark Refresh

Das neue transparente Wasserzeichen ist als zentrale Markenquelle für Intro und Seitenwechsel hinterlegt. Die reguläre Desktop- und Mobilansicht bestätigt eine ruhige, kontrastreiche Darstellung. Ein aus dem Browser ausgelöstes Seitenwechselereignis aktivierte den Marken-Overlay und bestätigte dabei die neue Asset-URL im verwendeten Bildknoten.

Die Markenasset-Prüfung sichert die neue Wasserzeichenquelle zusätzlich automatisiert ab. Der technische Abschlusslauf bestätigte **28 Tests in 17 Testdateien**, TypeScript-Prüfung und Produktions-Build ohne Fehler.

Für die reproduzierbare Qualitätsprüfung existiert eine **nicht verlinkte** Vorschauoption unter `?intro=1`. Sie hält das Intro-Overlay nur zu Prüfzwecken sichtbar und verändert den regulären Besuchsfluss nicht. Das Overlay wurde mit dem neuen Wasserzeichen bei **1280 × 720 px** und **375 × 812 px** aufgenommen: Die quadratische Marke bleibt mittig über der Wortmarke erkennbar, hält ausreichenden Abstand zur zentralen Typografie und lässt den Skip-Intro-Button freistehen. Damit ist die neue Quelle für Intro und Seitenwechsel sowohl technisch als auch visuell nachgewiesen.
