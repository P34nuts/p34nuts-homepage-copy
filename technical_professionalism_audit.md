# Technischer Professionalitätsaudit — P34nuts

**Prüfstand:** 15. August 2026  
**Gegenstand:** Öffentliche Manus-Bereitstellung, React-/tRPC-/MySQL-Anwendung, Booking-Flow, Medienauslieferung und Suchmaschinen-Grundlagen.

## Kurzfazit

Die Website ist als **künstlerische Web-Erfahrung bereits ungewöhnlich weit**: Die zentralen Routen, das Music Archive, klickbasiertes Audio und Video, serverseitig gespeicherte Booking-Anfragen, Original-Artwork, die neue Bildwelt, responsive Ansichten und ein umfassender Testlauf sind vorhanden. Für einen dauerhaft professionellen öffentlichen Betrieb fehlen vor allem **Publikations- und Betriebsdetails**, nicht die kreative Kernwebsite.

Die unmittelbar wichtigsten Punkte sind die **Korrektur der Suchmaschinen-Domainangaben**, die **rechtsverbindliche Finalisierung der Pflichtseiten**, die **Behebung der Abhängigkeitswarnungen** sowie eine **produktionsfähige Absicherung des öffentlichen Booking-Endpunkts über mehrere Instanzen hinweg**.

## Bereits belastbar umgesetzt

| Bereich | Bestätigter Stand | Auditbewertung |
|---|---|---|
| Routing und Musikarchiv | Die öffentliche Route `/music` lädt nach dem vorgesehenen Lazy-Route-Skeleton vollständig und führt die 23 Trackrouten aus. | Solide |
| Booking-Grundschutz | Serverseitige Zod-Validierung, Einwilligung, Honeypot und Begrenzung pro Fingerprint sind vorhanden. | Gute Basis |
| Transportgrundlage | Die Live-Antwort liefert HTTPS-Absicherung via HSTS sowie `X-Content-Type-Options: nosniff`. | Gute Grundlage |
| Tests und Build | Zuletzt erfolgreich: 29 Tests in 18 Testdateien, TypeScript-Prüfung und Produktions-Build. | Solide |
| Medien | Audio und Video laden erst nach bewusster Interaktion; tiefer liegende Bildkader laden bewusst verzögert. | Professionell |

Die Live-Prüfung bestätigte außerdem, dass das **Music Archive** nach dem vorgesehenen Lazy-Route-Skeleton vollständig lädt und alle 23 Trackkader erreichbar ausliefert. Die öffentliche **Booking-Route** ist ebenfalls erreichbar, verweist klar auf das Formular im Kontaktkader und nennt zusätzlich die direkte Booking-E-Mail. Dies sind belastbare Grundlagen; die folgenden Restpunkte betreffen deshalb vor allem Domainkonsistenz, Sicherheit und Betrieb.

## Priorität P0 — vor breiter externer Promotion erledigen

| Befund | Warum es zählt | Konkrete Maßnahme | Evidenz |
|---|---|---|---|
| **Canonical-, Sitemap-, Robots- und JSON-LD-Domain zeigen noch auf GitHub Pages.** | Suchmaschinen und Social-Crawler werden auf `https://p34nuts.github.io/Mondfall/` statt auf die aktuell live geschaltete Manus-Domain verwiesen. Das kann Indexierung, kanonische Zuordnung und spätere Sharing-Signale spalten. | Bei einer final festgelegten Hauptdomain alle vier Stellen auf exakt diese Domain umstellen; anschließend Google Search Console/Bing Webmaster anmelden und Sitemap einreichen. | `client/index.html`, `client/public/robots.txt`, `client/public/sitemap.xml`; Live-Abruf am 15.08.2026 |
| **Impressum und Datenschutz sind fachlich vorbereitet, aber noch nicht rechtsverbindlich vollständig.** | Die noch offenen Verantwortlichen-/Anbieterdaten und die finale Prüfung der Datenflüsse sind keine gestalterischen Platzhalter, sondern Voraussetzung für eine endgültige öffentliche Freigabe. | Pflichtangaben vom Verantwortlichen liefern, Texte final prüfen und einen verbindlichen Freigabestand dokumentieren. | `todo.md`, Abschnitt „Finalisation Before GitHub Pages“ |
| **Produktionsabhängigkeiten haben offene Sicherheitswarnungen.** | `pnpm audit --prod` meldet aktuell 72 Hinweise: 8 niedrig, 47 moderat und 17 hoch. Ein Teil ist transitiv; dennoch gehört ein Update- und Regressionstest-Zyklus vor eine größere Promotion. | Lockfile und direkte Pakete gezielt aktualisieren, insbesondere die von Audit betroffenen Ketten rund um `streamdown`/`mermaid`, `axios` und Express-Transitive; danach vollständige Medien- und Booking-QA. | `pnpm audit --prod`, 15.08.2026 |

## Priorität P1 — nächster professioneller Ausbau

| Befund | Nutzen | Empfohlene Umsetzung | Evidenz |
|---|---|---|---|
| **Booking-Rate-Limit lebt nur im Speicher einer Serverinstanz.** | Nach Neustart ist die Begrenzung zurückgesetzt; bei mehreren Autoscale-Instanzen wird sie nicht gemeinsam gezählt. | Persistentes/edge-nahes Rate Limit (z. B. Redis oder verwalteter Rate-Limit-Dienst) mit IP-/Fingerprint- und Bot-Schutz einsetzen. | `server/bookingRateLimit.ts` |
| **Booking-Endpunkt akzeptiert pauschal bis zu 50 MB JSON/URL-encoded Body.** | Das Formular benötigt nur wenige KB. Ein enges Limit senkt unnötige Last und Angriffsfläche. | Globales Limit reduzieren oder für den Booking-Pfad ein kleines, explizites JSON-Limit verwenden. | `server/_core/index.ts` |
| **HTTP-Sicherheitsrichtlinien sind noch nicht explizit definiert.** | HSTS und `nosniff` sind vorhanden; eine projektspezifische CSP, `Referrer-Policy`, `Permissions-Policy` und Clickjacking-Schutz sind nicht sichtbar. | Mit einer restriktiven CSP starten und die erlaubten Suno-/YouTube-NoCookie-/Storage-/Google-Font-Quellen bewusst aufnehmen; danach via Report-Only prüfen und durchsetzen. | Live-Header; `server/_core/index.ts` |
| **Booking-Betrieb hat keinen dokumentierten Ausfall-/Nachbearbeitungsprozess.** | Speicherung plus SMTP ist gut; für echte Veranstaltungsanfragen fehlen eine Inbox-Ansicht, Status/Notiz, Export, Wiederholungsversand oder Alarmierung bei fehlgeschlagener Mailzustellung. | Kleines geschütztes Booking-Backoffice oder mindestens eine Admin-Ansicht mit Status, Export und Versandprotokoll ergänzen. | `drizzle/schema.ts`, `server/routers.ts`, `server/bookingMailer.ts` |
| **Externe API-Herkünfte sind nur auf die vorbereitete GitHub-Pages-Origin begrenzt.** | Das ist für die aktuelle Same-Origin-Manus-Seite unkritisch. Bei Wechsel auf eine eigene Domain oder GitHub Pages muss die Freigabeliste bewusst angepasst und getestet werden. | Produktionsdomain als konfigurierte Allowlist führen; keine Wildcards verwenden; Preflight und Booking-Endpunkt nach Domainwechsel prüfen. | `server/_core/publicCors.ts` |
| **Route-spezifische Such- und Share-Metadaten sind nur clientseitig.** | Die statische HTML-Antwort enthält generische Startseiten-Metadaten. Crawler erhalten deshalb nicht zuverlässig individuelle Titel, Beschreibungen und Social-Cards je Trackroute. | Statisches Prerendering oder SSR für Home, Archive, Trackdetail-, Booking- und Press-Routen einführen; dann route-spezifische canonical/OG/JSON-LD ausliefern. | `client/index.html`, SPA-Routenstruktur |

## Priorität P2 — Qualitäts- und Wachstumsschicht

| Befund | Wirkung | Umsetzung |
|---|---|---|
| **Initiales JavaScript bleibt relativ groß.** | Der zuletzt gebaute Hauptchunk liegt bei rund 735 KB minifiziert beziehungsweise 208 KB gzip. Die Nebenrouten sind bereits gesplittet, doch die Startseite kann auf langsamen Mobilnetzen weiter optimiert werden. | Nicht benötigte Bibliotheken aus dem Startchunk prüfen, Code auf Startseite weiter kapseln und reale Core-Web-Vitals messen. |
| **Keine formale End-to-End-Teststrecke.** | Unit- und Integrationsprüfungen sind vorhanden; ausgelieferte DOM-, Medien-, Formular- und Fehlerflüsse sollten zusätzlich automatisiert gegen die Live- oder Staging-Umgebung laufen. | Playwright-Tests für Startseite, Trackroute, Suno-/YouTube-Klickstart, Booking-Success/Rate-Limit und Rechtsseiten einführen. |
| **Kein dokumentiertes Fehler- und Uptime-Monitoring.** | Analytics allein erkennt keine JS-Fehler, nicht erreichbare Medien oder API-Ausfälle zuverlässig. | Fehlertracking, Uptime-Check für Startseite und Booking-Endpoint sowie Alarmkanal hinzufügen. |
| **Keine explizite Web-Vitals-/SEO-Messbasis.** | Ohne Feld- oder Lab-Messungen bleiben LCP, INP und CLS trotz guter Gestaltung Annahmen. | Lighthouse-/PageSpeed-Baseline, monatliche Messung und Search-Console-Berichte etablieren. |
| **Barrierefreiheit braucht automatische und redaktionelle Abdeckung.** | Skip-Link, semantische Links und bewusste Player existieren. Ergänzend fehlen automatisierte Axe-Prüfungen sowie Untertitel/Transkripte für bewegte und reine Audioinhalte. | Axe in CI, manuelle Tastaturprüfung nach Releases sowie Texttranskripte für Album Intro und Videos ergänzen. |
| **Datenaufbewahrung und Wiederherstellung sind nicht als Betriebskonzept dokumentiert.** | Booking-Daten sind personenbezogen. Ein klarer Löschrhythmus, Exportprozess und Backup-/Wiederherstellungslauf erhöhen Datenschutz- und Betriebsreife. | Aufbewahrungsfrist entscheiden, Löschjob/Prozess, kontrollierter Export und Wiederherstellungstest dokumentieren. |

## Reihenfolge für die Umsetzung

Zuerst sollte die endgültige öffentliche Hauptdomain entschieden werden. Darauf folgen in einem kompakten Freigabepaket die Korrektur von Canonical/Sitemap/Robots/JSON-LD, die finalen Rechtsangaben und ein Dependency-Update mit kompletter Regression. Danach lohnt sich das Booking-Betriebspaket aus persistentem Rate Limit, kleinem Request-Limit und Bearbeitungs-/Ausfallprozess. SSR/Prerendering, Monitoring, Web Vitals und End-to-End-Tests bilden die professionelle Wachstumsstufe.

> **Einordnung:** Die Punkte P0 sind die relevanten Lücken für eine offensiv beworbene öffentliche Veröffentlichung. P1 und P2 machen aus der bereits starken Artist-Website einen langfristig wartbaren, messbaren und belastbaren Betrieb.
