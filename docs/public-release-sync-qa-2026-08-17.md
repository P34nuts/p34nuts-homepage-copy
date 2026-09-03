# Öffentliche Veröffentlichung – Standprüfung

Am 17. August 2026 wurde die öffentliche Auslieferung verglichen.

`https://p34nuts.github.io/` zeigte zunächst den älteren GitHub-Pages-Stand ohne PayPal-, Gästebuch- und FAQ-Erweiterungen.

`https://p34nutsart-jjmeco2k.manus.space/?v=7961748a` lieferte nach Cache-Bypass den neuen Artist-Stand aus. Die extrahierte Seite enthielt `SIGN THE WALL.`, den leeren moderierten Gästebuchzustand, das Einreichungsformular und `SIGNAL SENDEN`. Damit ist die Ursache eine getrennte Veröffentlichung beziehungsweise ein alter GitHub-Pages-Stand, nicht ein fehlender Homepage-Code.


Das Root-Pages-Repository `P34nuts/P34nuts.github.io` baut aus `P34nuts/p34nuts-official-website`. Das offizielle Repository zeigte weiterhin 7 Commits und den älteren Quellstand. Der lokale CLI-Push auf `P34nuts/p34nuts-official-website` wurde mit HTTP 403 abgewiesen; der GitHub-Webdienst war beim direkten Datei-Editor kurzfristig nicht verfügbar, die Repositoryübersicht war danach wieder sichtbar. Die neue Manus-Veröffentlichung ist damit bestätigt, die GitHub-Pages-Synchronisierung bleibt ein separater Veröffentlichungsblocker.

Die GitHub-Kontoseite für die autorisierte Anwendung „GitHub CLI“ wurde geprüft. Sichtbar sind Berechtigungen für Gists, Organisations-/Teaminformationen, volle Kontrolle über private Repositories und das Aktualisieren von GitHub-Actions-Workflows. Eine explizite `Contents: Read and write`-Berechtigung wird in dieser OAuth-Ansicht nicht angezeigt. Die Repository-API meldet zwar `admin/maintain/push: true`, der Git-Transport weist den Push dennoch mit HTTP 403 zurück.

## Gästebuch: Direktveröffentlichung und Reaktionen

Neue Gästebuchnachrichten werden serverseitig sofort mit dem Status `approved` gespeichert. Der bisherige Rate-Limit-, Honeypot- und Eingabevalidierungs-Schutz bleibt bestehen; lediglich die redaktionelle Freigabestufe entfällt. Bestehende wartende Einträge wurden einmalig in den sichtbaren Status überführt.

Die öffentliche Seite bietet jetzt sieben anonyme Reaktionen: Herz, Liebe, Lachen, Feuer, Daumen hoch, Wow und Berührt. Pro Eintrag, Reaktion und Browser-Fingerprint wird höchstens eine Reaktion gespeichert. Es werden keine Roh-IP-Adressen persistiert.

GitHub Pages bleibt die dauerhafte Hauptseite. Der Pages-Build ist so konfiguriert, dass tRPC-Anfragen an `https://p34nutsart-jjmeco2k.manus.space/api/trpc` gehen und CORS ausschließlich die öffentliche GitHub-Pages-Origin zulässt. Die Daten- und Moderationslogik bleibt damit serverseitig; der noch offene Repository-Push ist ein Veröffentlichungsproblem, keine Architekturänderung.
