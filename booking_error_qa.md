# Booking-Fehlerfall — Browser-QA

## Prüfaufbau

Der Fehlerfall wurde ausschließlich im Browser der Entwicklungsumgebung simuliert. Dafür wurde die Netzwerkanfrage des Formulars lokal abgefangen; es wurde keine Booking-Anfrage an den Server gesendet und keine Testanfrage gespeichert.

## Gemessenes Ergebnis

Nach vollständig ausgefüllten Pflichtfeldern und einer aktivierten Einwilligung zeigte das Formular bei simuliertem Netzwerkfehler diese Rückfallmeldung an:

> Die Anfrage konnte gerade nicht sicher übermittelt werden. Bitte versuche es erneut oder schreibe direkt an P34nuts@mail.de.

Die Oberfläche gibt damit keinen technischen Fehlertext aus und stellt einen direkten alternativen Kontaktweg bereit.
