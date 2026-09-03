# P34nuts Artist Homepage — vollständiges Projektarchiv

Dieses Archiv enthält den vollständigen wiederherstellbaren Quellstand der P34nuts-Artist-Website sowie die lokal verfügbaren, projektzugehörigen Originalmedien.

## Enthaltene Bestandteile

| Bereich | Inhalt |
|---|---|
| Website-Quellcode | React-/TypeScript-Frontend, Express-/tRPC-Backend, Datenmodell, Tests, Konfiguration und Projektdokumentation. |
| Bildmaterial | Alle lokal vorhandenen Originalcover, Künstlerportraits, Markenassets und transparenten Wortmarken/Wasserzeichen. |
| Direktes Audio | Die lokal vorhandene Datei `p34nuts-album-intro.mp3`, die als Album Intro in die Homepage integriert ist. |
| Suno-Musikarchiv | Die vollständige Zuordnung der 23 bestehenden Tracks und ihrer Suno-IDs in `client/src/data/artistData.ts`. Die Website lädt diese Titel als externe, klickbasierte Suno-Einbettungen. |

## Bewusst nicht enthalten

Node-Module, Build-Ausgaben, lokale Caches, Git-Metadaten und Geheimnisse wie SMTP- oder Datenbankzugangsdaten sind nicht Bestandteil des Archivs. Sie werden für eine sichere Wiederherstellung erneut über Paketinstallation und geschützte Umgebungsvariablen eingerichtet.

Die 23 Suno-Titel liegen im Projekt als öffentliche Einbettungsreferenzen vor, nicht als lokal gespeicherte MP3-Master. Dieses Archiv enthält daher alle IDs, Titel, Cover und die vollständige Website-Verknüpfung, aber keine nicht lokal vorhandenen Drittanbieter-Audiodateien. Für ein unabhängiges Master-Audioarchiv müssen die 23 MP3-Exporte aus dem eigenen Suno-Konto zusätzlich bereitgestellt werden.

## Wiederherstellung

1. Das Archiv entpacken und in den enthaltenen Projektordner wechseln.
2. `pnpm install` ausführen.
3. Die notwendigen geschützten Umgebungsvariablen in der vorgesehenen Hosting-Umgebung setzen; keine Geheimnisse in Dateien ablegen.
4. Für die lokale Entwicklung `pnpm run dev` und für eine Produktionsprüfung `pnpm run build` ausführen.

> Die Mediendateien liegen im Archiv zusätzlich in `media/`. Für eine erneute Veröffentlichung müssen sie in einen dauerhaft erreichbaren Storage hochgeladen und die registrierten URLs in `client/src/data/artistData.ts` entsprechend hinterlegt werden.
