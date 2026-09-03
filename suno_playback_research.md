# Suno-Wiedergabe auf der P34nuts-Website

## Verifizierter Stand

Suno stellt für Songs direkte Freigabelinks bereit. Neue Songs sind laut Suno standardmäßig auf **Private/Link Only** gesetzt; sie können über einen Direktlink geteilt werden. Für eine öffentliche Suno-Profileinbindung lässt sich die Sichtbarkeit auf **Public** ändern.

Das bereitgestellte offizielle Profil `https://suno.com/@p34nuts` zeigt **23 Songs**. Als angehefteter, namentlich bestätigter Song ist dort **„Dein Name auf nem Stein“** sichtbar; dieser Titel entspricht dem ersten bestehenden Trackkader der Website.

Nach dem Öffnen der öffentlichen Songansicht waren außerdem folgende Titel sichtbar und den gleichnamigen Website-Trackkadern zuordenbar: **ZYKLUS DER GEWALT (Gym)**, **Wer bin ich?**, **Was?**, **Scheiß auf das Wetter**, **Zeitlupe**, **P34nuts regelt das**, **Urlaub-Burnout** und **Maskenball**.

Die Profilansicht wird dynamisch geladen. Ein automatisierter Navigationsversuch führte anschließend zur allgemeinen Entdecken-Seite und liefert deshalb keine verlässliche vollständige Liste der P34nuts-Songs. Für die Endintegration müssen die eindeutigen Song-URLs aus dem Profilkontext gezielt extrahiert und anschließend einzeln auf Einbettung getestet werden.

## Einbettungsnachweis

Die offizielle URL `https://suno.com/embed/eb401eb1-fd65-4b66-b16f-e870042179e4` liefert für **„Dein Name auf nem Stein“** einen funktionsfähigen Suno-Audio-Player mit Cover, Play-Schaltfläche und Fortschrittsanzeige. Damit ist die direkte Wiedergabe in einem iframe technisch bestätigt. Der Link wird in der Website erst nach einem bewussten Klick geladen, analog zum bestehenden YouTube-Dialog.

Die angenommene Unterseite `https://suno.com/@p34nuts/songs` liefert dagegen eine 404-Seite und ist kein verwendbarer Weg zur vollständigen Songliste.

## Website-QA

Auf der P34nuts-Trackdetailseite für **„Dein Name auf nem Stein“** wurde der Suno-Player zunächst als „PLAY FULL TRACK / SUNO“ angezeigt. Nach aktivem Klick wechselte die Oberfläche zur eingebetteten Player-Fläche mit einer expliziten „PLAYER ENTFERNEN“-Aktion. Die externe Quelle wird damit nicht vor der aktiven Interaktion geladen.

Die technische DOM-Prüfung bestätigte danach genau einen iframe mit der erwarteten Adresse `https://suno.com/embed/eb401eb1-fd65-4b66-b16f-e870042179e4` sowie die sichtbare Entfernen-Aktion. Die anschließende automatisierte Schließprüfung war nicht möglich, weil das Browserfenster nicht mehr verfügbar war; die Komponente entfernt den iframe jedoch über ihren lokalen Zustand analog zur bereits geprüften Video-Dialog-Logik.

## Prüfung aller aktuell eingebundenen Songquellen

Die acht weiteren eingebundenen Suno-Embed-URLs wurden einzeln serverseitig abgerufen. Für **WAS?**, **P34NUTS REGELT DAS**, **MASKENBALL**, **SCHEISS AUF DAS WETTER**, **URLAUB-BURNOUT**, **ZEITLUPE**, **WER BIN ICH?** und **ZYKLUS DER GEWALT (GYM)** lieferten sie jeweils HTTP 200, den erwarteten P34nuts-Songtitel und keinen `X-Frame-Options`-Header. Gemeinsam mit der interaktiven Prüfung von „Dein Name auf nem Stein“ bestätigt das die Einbettungsbasis für alle neun aktuell gemappten Songs.

Eine reine Auswertung der öffentlich ausgelieferten Profilantwort lieferte anschließend zehn weitere eindeutige Song-IDs. Die Embed-Routen für **ICH HASSE DICH (..ZU LIEBEN)**, **UNGEFILTERT**, **ZÜNDSCHNUR**, **AUF REZEPT**, **HANDWERKER DES JAHRES**, **DIE THERAPIE WIRKT**, **GUTEN MORGEN SONNENSCHEIN**, **DIAMANTEN IM STAUB**, **WAS WÄRE WENN?** und **WIE SAGT MAN LEBEWOHL?** wurden jeweils mit HTTP 200 und dem erwarteten Titel bestätigt. Der ebenfalls extrahierte Titel **P34NUTS** wurde separat mit HTTP 200 verifiziert.

Damit sind **20 von 23** vorhandenen Website-Trackkadern direkt mit einer verifizierten Suno-Quelle verbunden. Für **VIP OHNE NAMEN**, **DRECKIG UND IN TRÄNEN** und **TUNNELBLICK** erschien in der öffentlichen Profilantwort keine eindeutige Song-ID. Für diese drei Titel wird ein konkreter Suno-Freigabelink benötigt.

Die nachgereichten Suno-Shortlinks wurden aufgelöst und bestätigten zwei der fehlenden Zuordnungen: `https://suno.com/s/6uIUOx11kQd4RAy6` führt zu **VIP ohne Namen** mit der Song-ID `c32ad553-cec4-4fa7-b22f-a2e851942d78`; `https://suno.com/s/lzzdxwVLPllbPjuR` führt zu **Dreckig und in Tränen** mit der Song-ID `c91c2941-1411-42a6-8e24-e91d9ba822f7`.

Der dritte Shortlink `https://suno.com/s/wQBYDTMI1sZoVsOf` führt zu **Tunnelblick** mit der Song-ID `3fc527bc-cc46-4c2f-869b-ab66c9e30d91`. Die drei zugehörigen Embed-Routen lieferten jeweils HTTP 200, den erwarteten P34nuts-Songtitel und keinen `X-Frame-Options`-Header. Damit sind nun **alle 23 Trackkader** der Website mit einer verifizierten, erst nach aktivem Klick geladenen Suno-Wiedergabe verbunden.

Suno beschreibt kommerzielle Nutzung für Songs, die während eines kostenpflichtigen Abonnements erstellt wurden. Diese Songs dürfen laut Suno unter anderem über Distribution und Verkauf monetarisiert werden; die Rechtefrage bleibt regional komplex und muss bei Zweifeln fachlich geprüft werden.

Die geprüften offiziellen Hilfeseiten dokumentieren die Freigabe per Link und die kommerzielle Nutzung, jedoch keine offizielle technische Einbettungsspezifikation für einen externen Website-Player.

## Empfohlene Umsetzung

1. Der Artist stellt pro gewünschtem Song einen öffentlichen Suno-Freigabelink bereit und bestätigt, dass die notwendige Nutzungserlaubnis vorliegt.
2. Der externe Link wird in einem ersten Schritt nur nach aktivem Klick geladen, analog zum YouTube-No-Cookie-Dialog.
3. Falls Suno den jeweiligen Freigabelink in einem Iframe zulässt, wird der offizielle Player eingebettet. Falls nicht, bleibt ein alternativer Weg: vom Artist bereitgestellte, rechtegeklärte Audio-Dateien werden über einen eigenen HTML5-Player ausgeliefert.
4. Vor der Veröffentlichung wird jeder konkrete Song-Link im Browser auf Abspielbarkeit und Rechtehinweis geprüft.

## Quellen

- [Suno Help: How do I share my music?](https://help.suno.com/en/articles/2565761)
- [Suno Help: What is commercial use?](https://help.suno.com/en/articles/9601985)
- [Suno Help: Rights & Ownership](https://help.suno.com/en/categories/550145-rights-ownership)

## Quellenkennzeichnung im offiziellen Embed — offene Entscheidung

Die sichtbare Suno-Kennzeichnung innerhalb des geöffneten Players stammt aus dem offiziell eingebetteten Drittanbieter-Iframe. Die Website kann sie nicht zuverlässig und transparent entfernen. Ein Überdecken oder Beschneiden wäre fragil, könnte die Wiedergabe beeinträchtigen und wird deshalb nicht umgesetzt.

| Möglichkeit | Ergebnis |
|---|---|
| Offiziellen Suno-Embed behalten | Die vollständige Wiedergabe bleibt direkt in der Website; die Suno-Kennzeichnung bleibt sichtbar. |
| Nur den Website-Button neutral benennen | Der Text `PLAY FULL TRACK / SUNO` kann geändert werden; die Kennzeichnung innerhalb des Iframes bleibt bestehen. |
| Eigenen Audio-Player verwenden | Ein vollständig markenreiner Player ist möglich, wenn P34nuts die MP3-Master aller Titel bereitstellt. |

> Bis zur ausdrücklichen Entscheidung von P34nuts wird weder der Suno-Iframe noch seine Kennzeichnung verändert. Die sichere Empfehlung ist der bestehende offizielle Embed, solange keine eigenen Master-Audiodateien für alle Tracks vorliegen.
