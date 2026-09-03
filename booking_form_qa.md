# Booking Form — QA Note

| Prüfung | Ergebnis |
| --- | --- |
| Pflichtfelder | Name/Organisation, E-Mail, Datum, Veranstaltungsort, Stadt/Land, Format und Einwilligung sind als Pflichtangaben vorhanden. |
| Leere Übermittlung | Die Formularübermittlung bleibt in der nativen Browser-Validierung und öffnet keinen E-Mail-Entwurf. |
| Versandpfad | Erst nach erfolgreicher Validierung erzeugt das Formular einen vorbefüllten `mailto:`-Entwurf an `P34nuts@mail.de`; eingegebene Daten werden nicht serverseitig gespeichert. |
| Responsive Sichtung | Die mobile Reihenfolge bleibt einspaltig und die Formularfelder, Einwilligung sowie die Sendeaktion sind im Touch-Kontext erreichbar. |
| Styling | Der Request-Kader führt Paper White, Ink Black und den diagonalen Cut Mark als funktionale Registerelemente fort. |
