# QA Notes — Fullstack, Video und Legal Update

## Visuelle Prüfung

Die Desktop-Prüfung der Startseite sowie der Routen `/booking`, `/impressum` und `/datenschutz` zeigt eine konsistente Noir-Cut-Darstellung. Die neuen Legal-Karten bleiben innerhalb der diagonalen Komposition lesbar; die Booking-Unterseite verweist klar auf das aktive Formular und den bestätigten E-Mail-Kontakt.

Die mobile Prüfung bei 375 px Breite bestätigt die einspaltige Lesereihenfolge für Impressum und Datenschutzhinweise. Überschriften, Hinweise, Karten und Rückkehr-CTA bleiben sichtbar und mit ausreichender Touch-Fläche erreichbar. Die Startseite behält ihre vertikale Schnittdramaturgie und das Visual-Archiv ist ohne überlaufende Karten angeordnet.

Die mobile Booking-Route zeigt die Einstiegsseite mit lesbarer Headline, Kontakttext und CTA ohne abgeschnittene Bedienelemente. Das Formular selbst bleibt bewusst im Kontaktkader der Startseite verlinkt.

## Technische Prüfung

Der vollständige Testlauf, die TypeScript-Prüfung und der Produktions-Build waren erfolgreich. Die zentrale Zuordnung deckt sechs bestätigte YouTube-IDs ab. Die Booking-Mutation validiert Eingaben serverseitig, persistiert die Anfrage und stößt eine Eigentümerbenachrichtigung an.

Der interaktive Desktop-Test des Featured-Videos hat nach aktivem Auslösen einen Dialog und genau einen Iframe mit der erwarteten `youtube-nocookie.com`-Quelle erzeugt. Das Schließen des Dialogs hat sowohl Dialog als auch Iframe wieder aus dem DOM entfernt. Der Browser-Automatismus konnte denselben Dialog im mobilen Kontext nicht separat auslösen; die mobile Darstellung der Video-Karten wurde per 375-px-Screenshot geprüft.

Für den Booking-Fehlerpfad wurde der Netzwerkanruf ausschließlich im Browser für einen QA-Lauf lokal abgefangen; es wurde keine Anfrage gespeichert oder übertragen. Die Oberfläche zeigte anschließend die verständliche Rückfallmeldung mit direktem E-Mail-Kontakt statt eines technischen Fehlertexts.

## Offener Freigabepunkt

Für eine rechtlich vollständige Veröffentlichung sind weiterhin die bestätigten Angaben zur verantwortlichen Stelle, zustellfähigen Anschrift und gegebenenfalls Register- oder Steuerdaten erforderlich. Bis dahin sind die Legal-Seiten ausdrücklich als Prüffassung gekennzeichnet.

## Legal- und SMTP-Update

Die aktualisierte Impressumsseite zeigt alle noch auszufüllenden Pflichtbereiche als klar erkennbare Freifelder; die bestätigte Booking-E-Mail bleibt sichtbar. Die Datenschutzhinweise dokumentieren jetzt die serverseitige Speicherung, Eigentümerbenachrichtigung, den verschlüsselten Mail.de-SMTP-Versand und das aktive Laden der YouTube-No-Cookie-Player. Desktop- und Mobilprüfungen bestätigen lesbare Karten, Freifelder und Rückkehr-CTA ohne sichtbaren Überlauf.

Die Mail.de-Zugangsdaten wurden ohne E-Mail-Versand per verschlüsselter SMTP-Verbindungsprüfung erfolgreich authentifiziert.

## Suno-Player-Update

Die Trackdetailseite für „Dein Name auf nem Stein“ wurde auf Desktop und bei 375 px Breite geprüft. Der neue CTA „PLAY FULL TRACK / SUNO“ ist vor dem Einbetten sichtbar, gut lesbar und bleibt im mobilen Layout als eigenständige Touch-Aktion erhalten. Die Trackdramaturgie, Cover-Hierarchie und sensiblen Inhaltsnotizen bleiben dabei intakt.

Der Player wird erst nach einem bewussten Klick erzeugt. Die Browser-DOM-Prüfung bestätigte danach den erwarteten `suno.com/embed/...`-iframe und die Aktion zum Entfernen des Players. Alle neun aktuell gemappten Suno-Embed-URLs wurden zusätzlich einzeln mit HTTP 200, passendem P34nuts-Songtitel und ohne `X-Frame-Options`-Header geprüft.
