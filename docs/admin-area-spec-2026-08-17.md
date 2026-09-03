# Adminbereich – Spezifikation

Der Adminbereich wird ausschließlich über Manus OAuth geschützt und zusätzlich serverseitig auf `users.role = admin` begrenzt. Eine sichtbare Route oder ein Frontend-Check allein gilt nicht als Zugriffsschutz. Nicht-Admins erhalten von jeder Admin-tRPC-Prozedur `FORBIDDEN`.

## V1-Funktionen

| Bereich | Funktion | Datenquelle | Schreibwirkung |
|---|---|---|---|
| Gästebuch | Pending-Einträge anzeigen | `guestbook_entries` | keine |
| Gästebuch | Freigeben oder ablehnen | `guestbook_entries` | Status und Moderationszeitpunkt |
| Gästebuch | Moderierte Einträge löschen | `guestbook_entries` | gezieltes Löschen |
| Homepage | öffentliche, datenbankgestützte Einstellungen lesen/ändern | neue `site_settings`-Tabelle | nur freigegebene Schlüssel |
| Shop | Storefront öffnen, Status-/Health-Link und Betriebsnotizen | externe Render-Storefront | keine direkte Katalog- oder Zahlungsänderung |

## Site-Settings-Schlüssel

V1 erlaubt nur `supportUrl`, `shopUrl`, `announcementText` und `announcementEnabled`. Secrets, Stripe-/Printful-Schlüssel, Clerk-/Manus-Konfiguration, Datenbank-URLs und rechtliche Pflichtangaben werden nicht über diese UI gespeichert. `supportUrl` und `shopUrl` werden als HTTPS-URLs validiert; Texte werden serverseitig begrenzt.

## Shop-Grenze

Die Artist-Homepage und der Merch-Shop bleiben getrennte Anwendungen. Der Homepage-Admin darf den Shop nicht direkt mutieren, weil Warenkorb, Stripe, Printful, Webhooks und TiDB im separaten Render-Projekt liegen. V1 stellt deshalb nur sichere Links und einen Health-/Betriebsstatus bereit. Eine echte Shop-Adminverwaltung wäre ein separates Projektfeature mit eigener Auth- und Berechtigungsprüfung.

## Audit-Grundsätze

Jede Änderung wird mit `updatedBy` und `updatedAt` gespeichert. Gästebuchmoderation erhält `moderatedAt`; der öffentliche Status bleibt standardmäßig `pending`. Es werden keine IP-Adressen oder Roh-Fingerprints im Adminbereich angezeigt.

## Browser-QA-Hinweis

Die geschützte `/admin`-Route wurde in der verbundenen Sitzung geöffnet. Das Eigentümerkonto „Frank Horn“ sah die drei klar beschrifteten Bereiche „Gästebuch“, „Homepage“ und „Shop“ sowie einen wartenden Eintrag mit den Aktionen „Freigeben“, „Ablehnen“ und „Löschen“. Die Darstellung blieb im Noir-Cut-Stil und enthielt keine technischen Datenbankbegriffe.
