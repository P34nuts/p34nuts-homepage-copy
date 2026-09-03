# P34nuts — Spezifikationsabgleich

- [x] Bestehende Seitensektionen, Datenstruktur und Platzhalter mit allen Vorgaben aus `pasted_content.txt` abgleichen.
- [x] Fehlende Anforderungen mit Priorität auf Musik, Visuals, Booking, Presse, Legal und Datenschutz ergänzen.
- [x] Navigation, Dialoge, Mobile Experience, SEO-Metadaten und Build erneut prüfen.
- [x] Überarbeitete Version dokumentieren, sichern und bereitstellen.

## Visual Master Production

- [x] Vollständige Visual-Master-Spezifikation auswerten und in eine verbindliche Artist-Bildsprache überführen.
- [x] Verfügbare Master-Assets mit einem datenbasierten 23-Cover-Websystem zusammenführen.
- [x] Artist-Portraits, visuelle Kapitel, Releasewelt und Coverdaten konsistent in die Artist-Website integrieren.
- [x] Desktop und Mobile visuell sowie technisch prüfen, die Version sichern und bereitstellen.

## Final Agency Audit

- [x] Vollständige Final-Audit-Spezifikation auswerten und Prüfkriterien konsolidieren.
- [x] Hero, Artist Identity, Musikentdeckung, Conversion, Accessibility, SEO und Performance kritisch bewerten.
- [x] Priorisierte Verbesserungen eigenständig implementieren und alle Ansichten erneut prüfen.
- [x] Publikationsreife Audit-Version sichern und bereitstellen.

## Final Project Archive

- [x] Finalen Quellstand in ein sauberes Projektarchiv überführen.
- [x] ZIP-Archiv auf Inhalt und Integrität prüfen und bereitstellen.

## GitHub and Publishing
- [x] Verfügbarkeit einer autorisierten GitHub-Verbindung und des Ziel-Repositorys prüfen; effektive Schreibzugriffe wurden trotz gemeldeter Berechtigung mit 403 abgewiesen.
- [x] Übergabe in ein GitHub-Repository sowie den passenden Hostingweg vorbereiten; GitHub-Pages-Build und kontrollierter API-Endpunkt sind vorbereitet.
- [x] Autorisierte Veröffentlichung prüfen und Repository- beziehungsweise Veröffentlichungsdetails bereitstellen; die Browser-Freigabe ermöglichte die Übertragung in das neue öffentliche Repository und die erfolgreiche GitHub-Pages-Bereitstellung.

## GitHub Code Alternative

- [x] Schreibbare, bestehende GitHub-Repositories als codebasiertes Veröffentlichungsziel prüfen; `P34nuts/Mondfall` ist lesbar, Git-Push und API-Write waren jedoch nicht verfügbar.
- [x] Geeignetes Repository ohne Datenverlust für die P34nuts-Website vorbereiten oder eine sichere Alternative benennen; der produktive Manus-Stand bleibt bis zur finalen GitHub-Freigabe die sichere Alternative.

## Mondfall Replacement and Pages

- [x] Einen nachweisbaren unveränderbaren Backup-Stand von `P34nuts/Mondfall` anlegen oder dokumentieren (z. B. Backup-Branch, Tag oder Archiv) und die Sicherung verifizieren; das lokale Archiv `/home/ubuntu/archives/p34nuts-mondfall-2026-08-17.tar.gz` wurde mit SHA-256 `3cfd7a1d2d12cabc607777bb1c209d35b7d683ab47a8263d2f1c90b710ce9f27` geprüft.
- [x] Den freigegebenen P34nuts-Stand als Hauptbranch übertragen und GitHub Pages auf den neuen Stand ausrichten; dieser Punkt wurde durch das separate Repository `P34nuts/p34nuts-official-website` ersetzt.
- [x] Bereitstellung und öffentliche URL prüfen; die neue GitHub-Pages-Version ist unter `https://p34nuts.github.io/p34nuts-official-website/` erreichbar.
- [x] Die GitHub-Pages-Origin kontrolliert für die öffentliche Booking-Mutation freigeben und den Frontend-Endpunkt konfigurierbar machen.
- [x] Den statischen GitHub-Pages-Build außerhalb des Fullstack-Quellstands erzeugen, ohne die verwaltete Bereitstellung zu beeinträchtigen.

## Original Albumcovers

- [x] Alle vom Nutzer bereitgestellten Songcover mit den 23 vorhandenen Tracktiteln abgleichen.
- [x] Originalcover in die projektgebundene Webausgabe überführen und zentral in den Trackdaten hinterlegen.
- [x] Musikarchiv, Detailseiten und responsive Darstellung mit allen Originalcovern prüfen.

## Artist Profile and Track Stories

- [x] Freigegebenes Artistprofil und die Songbriefings in eine konsistente, zentrale Inhaltsstruktur überführen.
- [x] About-Bereich, Musikarchiv und Trackdetailseiten mit Themen, Vibe, Hintergründen und Kernbotschaften aktualisieren.
- [x] Inhalte zu Verlust, Suizidtrauer, psychischem Druck und toxischen Beziehungen sensibel sowie klar einordnen und auf Desktop und Mobile prüfen.

## Booking and Social Contact Area

- [x] Bestätigte Booking-E-Mail und Social-URLs zentral hinterlegen.
- [x] Eigenständigen Kontaktbereich für Booking-Anfragen und Social-Media-Kanäle in die Startseite integrieren.
- [x] Direkte Links, E-Mail-Aktion und responsive Kontaktansicht prüfen.

## Interactive Booking Form

- [x] Veranstaltungsrelevante Formularfelder und den sicheren E-Mail-Übergabefluss festlegen.
- [x] Interaktives, zugängliches Booking-Formular mit Validierung in den Kontaktbereich integrieren.
- [x] Formularvalidierung, mobile Bedienung und vorbefüllte E-Mail-Anfrage prüfen.

## Video, Booking Delivery and Legal

- [x] YouTube-URLs oder Video-IDs den vorhandenen Visual-Kadern zuordnen und die benötigten rechtlichen Angaben erfassen.
- [x] Projekt nach dem Fullstack-Upgrade stabilisieren und die bestehende Noir-Cut-Navigation sowie Startseite erhalten.
- [x] Öffentliche Booking-Anfragen serverseitig validieren, datensparsam speichern und als Eigentümerhinweis melden.
- [x] YouTube-Dialoge mit datensparsamem Start erst nach ausdrücklichem Klick direkt in der Website abspielen.
- [x] Impressum und Datenschutz mit den noch ausstehenden Pflichtangaben zur rechtlichen Freigabe vorbereiten.
- [x] Datenschutz, Video-Consent, Versandfluss und Routen auf Desktop und Mobile prüfen.
- [x] Booking-Route als mobile Einstiegs- und CTA-Seite prüfen; das aktive Formular bleibt bewusst im Kontaktkader der Startseite verlinkt.
- [x] YouTube-Dialog auf Desktop aktiv öffnen sowie den Click-to-load- und Close-Flow des No-Cookie-Players verifizieren; mobiles Kartenlayout separat prüfen.
- [x] Booking-Versandfluss im Browser mit einem Fehlerfall prüfen und die Rückmeldung der Oberfläche dokumentieren.
- [x] Browser-QA-Ergebnis des Booking-Fehlerfalls in einer eigenständigen Projektnotiz mit der gemessenen Rückfallmeldung sichern.

## Finalisation Before GitHub Pages

- [ ] Bestätigte Anbieter- und Datenschutzangaben für die rechtsverbindliche Fassung von Impressum und Datenschutzhinweisen einholen.
- [x] Die vom Betreiber erteilte finale Inhalts- und Releasefreigabe der öffentlichen Website dokumentieren; die aktuelle Fassung bleibt öffentlich freigeschaltet.
- [x] GitHub-Pages-Übertragung bis zur expliziten finalen Freigabe zurückstellen.
- [x] Impressum als klar gekennzeichnete Vorlage mit nur noch auszufüllenden personenbezogenen Pflichtangaben fertigstellen.
- [x] Datenschutzhinweise um die tatsächliche Speicherung, Eigentümerbenachrichtigung und den SMTP-E-Mail-Versand ergänzen.
- [x] Mail.de-Zugang nach sicherer Passwort-Erneuerung als Projektgeheimnis hinterlegen und den Booking-E-Mail-Versand serverseitig integrieren.
- [x] Suno-Freigabelinks, Einbettungsoptionen und Nutzungsrechte für die neun derzeit öffentlich aus dem Profil erfassten Song-Wiedergaben prüfen.
- [x] Die neun derzeit öffentlich verifizierten Suno-Songs als direkte, klickbasierte Audio-Player in die jeweiligen Trackkader integrieren.
- [x] Öffentliche Songs aus `suno.com/@p34nuts` erfassen und anhand der Titel den 20 eindeutig verfügbaren Trackkadern zuordnen.
- [x] Die konkreten Suno-Wiedergabe-URLs der neun gemappten Songs auf Iframe-Kompatibilität sowie auf datensparsames Laden erst nach aktivem Klick prüfen.
- [x] Für die drei verbleibenden Trackkader „VIP OHNE NAMEN“, „DRECKIG UND IN TRÄNEN“ und „TUNNELBLICK“ konkrete öffentliche Suno-Freigabelinks erfassen.
- [x] Die drei bereitgestellten Suno-Shortlinks auf Zieltitel, Embed-ID und Iframe-Kompatibilität prüfen und eindeutig den verbleibenden Trackkadern zuordnen.

## Optional Improvements Without Additional Artist Input

- [x] Bestehende Musik-, Video-, Booking- und Navigationsflüsse auf autonome Verbesserungen mit hoher Wirkung prüfen.
- [x] Optionale Verbesserungen nach Nutzerwert, Aufwand, Datenschutz- und Inhaltsabhängigkeiten priorisieren und die sofort möglichen Verbesserungen direkt umsetzen.
- [x] Einen umsetzungsreifen Vorschlag mit klarer Trennung zwischen sofort möglichen und später freizugebenden Erweiterungen als Projektdokumentation bereitstellen.

## Autonomous Professional Upgrade

- [x] Music Finder mit Such- und Themenfilter für die 23 bestehenden Trackkader implementieren.
- [x] Trackseiten um native Teilen-/Link-kopieren-Aktion und klare Full-Track-Verfügbarkeit erweitern.
- [x] Browsing-Erlebnis mit einem datensparsamen Bereich für zuletzt geöffnete Tracks verbessern.
- [x] Booking-Formular um einen Honeypot-Schutz und eine serverseitige Anfragebegrenzung ergänzen.
- [x] Dialoge auf Fokusführung, Escape-/Close-Verhalten und Reduced-Motion-Verhalten gezielt prüfen und bei Bedarf nachschärfen.
- [x] Nicht kritische Routen dynamisch laden, um den initialen JavaScript-Umfang zu reduzieren.
- [x] Nicht kritische Dialoge dynamisch laden oder die Route-Splitting-Entscheidung technisch begründet dokumentieren.
- [x] Native Share-Aktion auf Trackseiten bei fehlendem `navigator.share` im Browser prüfen und den tatsächlichen Fallback dokumentieren.
- [x] Die QA-Matrix für Booking ausdrücklich auf browserseitigen Honeypot und automatisierte serverseitige Rate-Limit-Tests abgrenzen.
- [x] Eine vollständige QA-Matrix für Music Finder, Share/Copy, Booking-Schutz, Suno-/YouTube-Dialoge sowie Desktop und Mobile nachreichen.

## Autonomous Narrative and Archive Upgrade

- [x] Kurzen Artist-Manifest-Kader ausschließlich aus dem freigegebenen Artist-Profil entwickeln und als eigenständige inhaltliche Orientierung integrieren.
- [x] Eine visuelle Themen-Landkarte aus den vorhandenen Songthemen erstellen, die zu passenden Trackdetailseiten führt.
- [x] Direkte Vor-/Zurück-Navigation auf Trackdetailseiten anhand der bestehenden 23-Track-Reihenfolge ergänzen.
- [x] Einen datenbasierten „Frame of the Day“-Einstieg aus den bestehenden Tracks ohne neue Behauptungen oder Besuchstracking umsetzen.
- [x] Zweite Ausbauwelle auf Desktop und Mobile prüfen sowie in Tests und QA-Protokoll dokumentieren.
- [x] Root-Basisroute so korrigieren, dass interne Wouter-Links nicht als protokollrelative `//music/...`-URLs gerendert werden.

## Cover Corrections

- [x] Die vertauschten Originalcover von ZÜNDSCHNUR und WIE SAGT MAN LEBEWOHL? in der zentralen Trackdatenquelle korrekt zuordnen.
- [x] Das bisherige Cover von GUTEN MORGEN SONNENSCHEIN entfernen und das bereitgestellte Originalcover als Web-Asset integrieren.
- [x] Die drei betroffenen Trackseiten und ihre Archivkacheln auf korrekte Coverdarstellung prüfen sowie die Korrektur sichern.

## Brand Asset Integration

- [x] Das bereitgestellte P34nuts-Titelmotiv als neue Hero-Bildwelt für die Startseite integrieren, ohne die bestehende Noir-Cut-Lesbarkeit zu beeinträchtigen.
- [x] Das bereitgestellte P34nuts-Markensymbol zentral als wiederverwendbares Markenasset hinterlegen.
- [x] Eine reduzierte, barrierearme Seitenübergangsanimation mit dem Markensymbol entwickeln und an Navigationen einbinden.
- [x] Hero und Markentransition auf Desktop und Mobil visuell prüfen sowie technisch absichern.
- [x] Aktivierung der Markentransition bei echten internen Routenwechseln im Browser nachweisen und bei Bedarf robust nachschärfen.
- [x] Markentransition bei einem echten internen SPA-Linkklick nachweisen und die Auslösung bei Bedarf zusätzlich an Wouter-Routenänderungen binden.

## Wordmark Integration

- [x] Den kompakten P34nuts-Schriftzug als visuelles Home-Signal im Header integrieren.
- [x] Den großen P34nuts-Schriftzug als Hauptwortmarke im Hero anstelle der gesetzten P34nuts-Typografie einsetzen.
- [x] Die Hero-Bildschicht als klar gekennzeichneten, später austauschbaren Slot für kommende Künstlerportraits vorbereiten.
- [x] Header- und Hero-Wortmarke auf Desktop und Mobil prüfen sowie technisch absichern.

## Wordmark Assignment Correction

- [x] Den ersten bereitgestellten Schriftzug korrekt als Hero-Wortmarke und den zweiten bereitgestellten Schriftzug korrekt als Header-Home-Signal zuordnen.
- [x] Die korrigierte Header- und Hero-Darstellung auf Desktop und Mobil prüfen sowie technisch absichern.

## First Artist Portrait Set

- [x] Alle zehn bereitgestellten P34nuts-Bilder nach Szene, Blickrichtung, Licht, Textfreiraum und passendem Website-Kontext analysieren.
- [x] Die zehn Bilder als langlebige Web-Assets hochladen und zentral mit beschreibenden Platzierungshinweisen registrieren.
- [x] Generierte Hero-, About-, Kontrast-, Visual-, Galerie- und Booking-Bildkader durch die passend zugeordneten Künstlerbilder ersetzen.
- [x] Das Bühnenmotiv mit Mikrofon für den Booking-Kontext einsetzen, sofern die Bildanalyse die passende Buchungsdramaturgie bestätigt.
- [x] Alle neuen Bildkader auf Desktop und Mobil visuell prüfen sowie die Asset-Zuordnungen automatisiert absichern.

## Second Artist Portrait Set

- [x] Alle fünf weiteren P34nuts-Bilder nach Motiv, Licht, Textfreiraum und geeignetem Homepage-Kontext analysieren.
- [x] Die fünf Bilder als langlebige Web-Assets hochladen und zentral mit eindeutigen Platzierungsrollen registrieren.
- [x] Die bestehende Bilddramaturgie mit fünf zusätzlichen, nicht redundanten Kadern in Musik, Live, Presse oder Bildarchiv erweitern.
- [x] Die erweiterten Bildkader auf Desktop und Mobil visuell prüfen sowie die Asset-Zuordnungen automatisiert absichern.

## Album Intro

- [x] Den bisherigen NEXT-FRAME-Kader sichtbar als ALBUM INTRO umbenennen.
- [x] Die bereitgestellte Intro-Audiodatei als langlebiges Web-Asset hochladen und zentral registrieren.
- [x] Einen direkten, erst nach Klick ladenden Album-Intro-Player in den Kader integrieren.
- [x] Wiedergabe, Darstellung und Reduced-Motion-/Mobilverhalten prüfen sowie technisch absichern.

## Header Wordmark Refresh

- [x] Die bereitgestellte transparente P34nuts-Wortmarke als Header-Home-Signal hochladen und zentral zuordnen.
- [x] Die aktualisierte Header-Wortmarke auf Desktop und Mobil visuell prüfen sowie technisch absichern.

## Watermark Refresh

- [x] Das bereitgestellte transparente P34nuts-Wasserzeichen als zentrales Markenasset hochladen und zuordnen.
- [x] Intro, Seitenwechsel und weitere Verwendungen auf das neue Wasserzeichen umstellen und auf Desktop sowie Mobil prüfen.
- [x] Das Intro-Overlay mit dem neuen transparenten Wasserzeichen auf Desktop und Mobil explizit öffnen, visuell prüfen und im QA-Protokoll nachweisen.
- [x] Eine nicht verlinkte `?intro=1`-Vorschauoption für die reproduzierbare Intro-Overlay-QA ergänzen und nach der Prüfung dokumentieren.

## Technical Professionalism Audit

- [x] Gesamte Website auf Architektur, Sicherheit, Datenschutz, Performance, SEO, Barrierefreiheit, Medienauslieferung, Monitoring und Veröffentlichungsreife prüfen und die technischen Restpunkte priorisiert dokumentieren.

## Complete Project Archive

- [x] Vollständiges ZIP-Archiv mit Quellcode, Konfiguration, Dokumentation sowie allen lokal verfügbaren projektzugehörigen Bildern und Audio-Dateien erstellen, prüfen und bereitstellen.

## Restored Navigation and Suno Review

- [x] Startseitenabfolge nach dem Hero wieder so anordnen, dass ALBUM INTRO vor FIND YOUR ENTRY erscheint und die bestehende Schwarz–Weiß–Schwarz-Dramaturgie erhalten bleibt.
- [x] Die Einstiege der Menüziele MUSIC und BOOKING wieder mit dem P34nuts-Portrait statt einer isolierten Wortmarke ausstatten.
- [x] Die sichtbare Suno-Quellenkennzeichnung, zulässige Alternativen und den tatsächlichen Schutzumfang erneut prüfen und vor jeder Playeränderung mit P34nuts abstimmen; auf ausdrücklichen Wunsch bleibt der offizielle Suno-Player unverändert.
- [x] Die durch die Wiederherstellung zurückgekehrten TypeScript-Fehler der Diagrammkomponente beheben, damit die Homepage nach den Layoutanpassungen wieder vollständig gebaut und getestet werden kann.
- [x] Bild- und Album-Intro-Assets auf projektgebundene, dauerhaft auslieferbare Storage-URLs umstellen, damit Portraitkader und Audio nicht vom aktuellen Live-Domain-Proxy abhängen.
- [x] Die Startseitenreihenfolge zusätzlich als durchgängige Schwarz–Weiß–Schwarz-Dramaturgie visuell und im CSS nachweisen.
- [x] Die Sequenz ALBUM INTRO → FIND YOUR ENTRY → dunkler Manifest-Kader als klar getrennte Schwarz–Weiß–Schwarz-Dramaturgie im CSS explizit absichern.
- [x] Einen automatisierten Quelltest ergänzen, der Reihenfolge und Hintergrunddramaturgie der betroffenen Homepage-Kader eindeutig bestätigt.
- [x] Die auf relative `/manus-storage`-Pfade umgestellten Hero-, Booking- und Album-Intro-Assets nach der Veröffentlichung auf der Live-Website explizit prüfen.
- [x] Die veröffentlichte `/booking`-Route auf der Live-Domain auf den portraitierten Einstieg und korrekte relative Asset-Auslieferung prüfen.
- [x] Die veröffentlichten `/music`- und `/booking`-Routen in der Live-Browseransicht gegen die relativen Asset-Pfade verifizieren.

## Booking CTA Anchor Fix

- [x] Den Booking-CTA der `/booking`-Route auf den konkreten SEND-THE-FRAME-Formularabschnitt der Startseite ausrichten und den Sprung prüfen.

## Platform Attribution Review

- [x] Den Plattformhinweis auditieren: Im Artist-Quellstand gibt es keinen „Made with Manus“-Text; ein möglicher verwalteter Hostinghinweis liegt außerhalb des Websitecodes und wurde nicht in die Homepage integriert.

## Find Your Entry Cover Correction

- [x] Die sechs FIND-YOUR-ENTRY-Kacheln mit den jeweils korrekten Originalsongcovern aus der zentralen Release-Zuordnung versehen und die Darstellung prüfen.

## Social Navigation and Footer Mark

- [x] Einen Header-Menüpunkt SOCIAL ergänzen, der direkt zum FIND-THE-SIGNAL-Socialbereich der Startseite springt.
- [x] Den P34nuts-Schriftzug links unten im Footer durch das transparente P34nuts-Wasserzeichen ersetzen und die Darstellung prüfen.
- [x] Den Social-Hash nach dem Headerklick programmgesteuert zum sichtbaren FIND-THE-SIGNAL-Bereich scrollen lassen.
- [x] Den Link ENTER THE ARCHIVE im hellen Manifestbereich mit klar lesbarer schwarzer Schrift darstellen und die Kontrastwirkung prüfen.

## Social Sharing Preview

- [x] Das Open-Graph- und Twitter-Vorschaubild auf das aktuelle Hintergrundbild der Titelseite umstellen und die ausgelieferten Metadaten prüfen.

## Hero Depth Animation

- [x] Die P34nuts-Figur im Hero schnell und die Skyline deutlich zeitversetzt sanft einblenden; Reduced-Motion-Verhalten, Desktop und Mobil prüfen.

## Header Home Image Consistency

- [x] Alle Routen und Track-Archivseiten auf verbleibende Header-Schriftzüge prüfen und den Home-Link einheitlich mit dem P34nuts-Bild ausstatten.

## Favicon Watermark

- [x] Das Browser-Tab-Symbol auf das transparente P34nuts-Wasserzeichen umstellen und die ausgelieferte Favicon-Referenz prüfen.

## Final Project Archive Refresh

- [x] Ein aktualisiertes vollständiges ZIP-Archiv mit Quellcode, Konfiguration, Dokumentation, allen lokal verfügbaren Bildern und Audio-Dateien sowie den Medienreferenzen erstellen und auf Integrität prüfen.

## GitHub Full Transfer Refresh

- [x] Den aktuellen P34nuts-Stand 1:1 in das freigegebene GitHub-Zielrepository übertragen, den Schreibzugriff prüfen und den Repository- sowie Bereitstellungsstand verifizieren.

## New GitHub Repository Transfer

- [x] Ein neues separates GitHub-Repository für den aktuellen P34nuts-Homepage-Stand anlegen, den geprüften Stand 1:1 übertragen und die Repository- sowie Bereitstellungsadresse prüfen; `Mondfall` bleibt unverändert.

## Find Your Entry Song Rotation

- [x] Die sechs FIND-YOUR-ENTRY-Kacheln alle zehn Sekunden zufällig, ohne Duplikate und mit reduzierter Bewegungseinstellung aus dem vollständigen Songkatalog neu zusammenstellen.

## Find Your Entry Staggered Card Transition

- [x] Den Songwechsel der sechs FIND-YOUR-ENTRY-Kacheln mit einem gestaffelten Umblättereffekt veredeln; jede Kachel soll etwa eine halbe Sekunde nach der vorherigen erscheinen und Reduced Motion respektieren.

## Find Your Entry Sequential Card Flip
- [x] Den Songwechsel als echten sequenziellen Karten-Flip über die vertikale Achse umsetzen: Während eine Kachel umblättert, bleiben die anderen sichtbar; die nächste Kachel startet jeweils 0,5 Sekunden später und Reduced Motion bleibt ohne Flip.
## GitHub Pages Sequential Card Flip Sync
- [x] Den finalen echten sequenziellen FIND-YOUR-ENTRY-Karten-Flip in das öffentliche GitHub-Pages-Repository übertragen, den Actions-Deploymentlauf prüfen und die Live-Seite verifizieren.
- [x] Die GitHub-Schreibberechtigung für das Zielrepository über eine erneute Browser-Anmeldung wiederherstellen, da Git-Push und GitHub-API trotz sichtbarer Repositoryrechte mit HTTP 403 blockiert wurden.

## Free GitHub Pages Short URL
- [x] Eine kostenlose kurze GitHub-Pages-Adresse für die öffentliche P34nuts-Homepage einrichten, die vorhandene Website darauf ausrichten und die Erreichbarkeit prüfen; der Root-Pages-Workflow stellt den aktuellen Stand unter `https://p34nuts.github.io/` bereit und der erfolgreiche Deploymentlauf sowie die Live-Startseite sind bestätigt.

## Custom Domain Availability Review
- [x] Die frühere Domain-Anforderung `p34nuts.net.rich` dokumentiert als vom Betreiber verworfen; es wurde keine Buchung, Verfügbarkeitsprüfung oder kostenpflichtige Aktion ausgelöst.

- [x] Sichtbaren SHOP-Einstieg zur unabhängigen Hybrid-Storefront ergänzen, ohne bestehende Artist-Routen, Medien oder Commerce-Code zu verändern.
- [x] SHOP-Einstieg auf Desktop und Mobil sowie Rückweg zur Künstlerhomepage nach der Ergänzung prüfen.
- [x] Zentrale Shoplink-Konfiguration mit sicherem `/shop`-Gateway-Fallback ergänzen, damit Header, Mobilnavigation und Footer nach dem Shop-Deployment gleichzeitig auf die echte Storefront umgestellt werden können.
- [x] Den aktuellen SHOP-Menüeintrag samt sicherem Übergangslink in den separaten GitHub-Pages-Quellstand synchronisieren und die Live-Seite unter `https://p34nuts.github.io/` prüfen.
- [x] Die zentrale `VITE_SHOP_URL` auf die verifizierte Render-Storefront `https://p34nuts-merch-store.onrender.com` umstellen und den öffentlichen `/health`-Endpunkt per Vitest bestätigen.
- [x] Die GitHub-Pages-Route `https://p34nuts.github.io/shop` als markenkonforme Übergangsseite mit automatischer Weiterleitung und manuellem Render-Shop-Fallback verbinden; Root- und Unterpfadroute leiten live zu `https://p34nuts-merch-store.onrender.com/shop` weiter.
- [x] Ein gemeinsames, vollständiges und geheimnisfreies Übergabe-ZIP für Künstlerhomepage und Merch-Shop mit allen zulässigen Quellen, lokal verfügbaren Medien, Daten-/Medienreferenzen und Betriebsdokumentationen erzeugen, prüfen und bereitstellen.
- [x] Alle Shop-Einstiege der Künstlerhomepage und die GitHub-Pages-Route `/shop` so korrigieren, dass sie direkt auf die Noir-Cut-Storefront `https://p34nuts-merch-store.onrender.com/shop` statt auf eine unpassende Render-Startansicht führen; anschließend live prüfen.
- [x] Den Shoplink-Fallback der verwalteten Künstlerhomepage auf die feste Render-Storefront `/shop` setzen, damit das veröffentlichte Gateway bei fehlender Build-Variable nicht im internen Informationskader stehen bleibt; anschließend den automatischen Übergang live prüfen.

## PayPal Support Frame

- [x] Öffentlichen PayPal-Geldsammel-Link über das geschützte `VITE_PAYPAL_DONATION_URL`-Secret validieren.
- [x] Supportbereich unterhalb von MAKE CONTACT im Noir-Cut-Stil einbauen.
- [x] Linkstruktur so vorbereiten, dass der spätere PayPal.Me-Link ohne Layoutumbau ersetzt werden kann.
- [x] Finale URL nach der PayPal-Veröffentlichung im Browser gegen den konkreten Pool-Link prüfen.

## Queued Homepage Extensions

- [x] Moderiertes Gästebuch im Chat-Stil mit gastbasierten Herz-Reaktionen, Datenschutz-/Moderationshinweis und datensparsamer Betreiberbenachrichtigung umsetzen.
- [x] FAQ-Bereich mit den 21 bereitgestellten P34nuts-Fragen und Antworten im Noir-Cut-Stil implementieren.
- [x] Responsive und barrierearme Browser-QA für PayPal-Bereich, Gästebuch und FAQ durchführen und einen neuen Homepage-Checkpoint veröffentlichen.
- [ ] Später den PayPal-Geldsammel-Link durch den PayPal.Me-Link ersetzen, sobald der Business-Account bereitsteht.

- [x] GitHub-Pages-Synchronisierung des neuen PayPal-, Gästebuch- und FAQ-Stands abschließen; der vollständige aktuelle Quell- und Medienstand wurde über einen einmaligen verifizierten Import nach `P34nuts/p34nuts-official-website` übertragen und öffentlich gebaut.

- [x] Geschützten Adminbereich für Gästebuchmoderation, Homepage-Einstellungen und klar abgegrenzte Shop-Verwaltung konzipieren, implementieren und testen.

- [x] Adminbereich auf einfache deutsche Sprache, klare Schritt-für-Schritt-Hinweise, Vorschau, sichere Löschbestätigung, verständliche Statusanzeigen und mobile Bedienbarkeit ausrichten.

- [x] Schwarzen Bildschirm auf `/admin` reproduzieren, Ursache diagnostizieren und die Adminroute mit verständlicher Lade-/Fehleransicht reparieren.

- [x] GitHub Pages als dauerhafte Hauptseite dokumentieren und den Gästebuch-Datenfluss für die statische Auslieferung mit dem serverfähigen Backend verifizieren.
- [x] Gästebuch auf sofortige Veröffentlichung ohne Moderationsfreigabe umstellen.
- [x] Mehrere datensparsame Gästebuchreaktionen wie Herz, Smilies und Daumen ergänzen und testen.
- [x] Den aktuellen Homepage-, Gästebuch- und Medienstand auf die dauerhafte GitHub-Root-Adresse `https://p34nuts.github.io/` übertragen und öffentlich verifizieren.

- [x] Vorläufigen PayPal-Link auf der dauerhaften GitHub-Pages-Homepage wieder sichtbar machen, Root-Build aktualisieren und Live-Ausgabe verifizieren. Root-Workflow-Commit `6459bb6` erfolgreich; Live-Homepage zeigt `GELD SAMMELN / PAYPAL`.

- [x] FIND-YOUR-ENTRY-Songbuttons beim Wechsel auf Songdetailseiten zuverlässig an den Seitenanfang setzen und Desktop-/Mobile-Verhalten testen. Regressionstest und Produktionsbuild erfolgreich; ein vollständiger Testlauf blieb bei bestehenden externen Store-, PayPal- und SMTP-Prüfungen hängen.

- [x] Merch-Storefront fachlich auditieren: öffentliche Nutzerführung, Produktdetailseiten, Warenkorb, Login, Stripe-Sandbox, Printful-Grenzen, Mobile UX, Barrierefreiheit und sichere Verbesserungsroadmap dokumentieren. Bericht: `premium-streetwear-shop/docs/merch-store-improvement-audit-2026-08-17.md`; Live-Prüfung war wegen eines temporären Render-Proxy-/Firewallfehlers eingeschränkt.

- [x] FIND-YOUR-ENTRY-Klickpfad in der realen Homepage reproduzieren und jeden Wechsel auf eine Songdetailseite zuverlässig am oberen Seitenanfang starten lassen. Der reale Browserklick landete auf `/music/dein-name-auf-nem-stein` mit `scrollY = 0`; globaler Routenreset, Klickschutz und Regressionstest sichern den Flow.
- [x] Gästebuch um sichtbaren Namen sowie lokales Datum und Uhrzeit jedes Beitrags erweitern und den Eintragsfeed mit zugänglicher, scrollbar begrenzter Höhe versehen. Migration `0005_mixed_maddog.sql` ergänzt den rückwärtskompatiblen Standardnamen `Gast`; QA-Notiz: `docs/find-entry-guestbook-qa-2026-08-17.md`.
- [x] Den mobilen FIND-YOUR-ENTRY-Scroll-Sprung bei bloßer Berührung einer rotierenden Karte unterbinden: Die Top-Position wird nur noch bei einem echten Klick vorbereitet. Regressionstest und GitHub-Pages-Build erfolgreich.
