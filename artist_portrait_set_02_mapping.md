# Second Artist Portrait Set — Bildredaktion

Die zweite Serie erweitert die bestehende Bilddramaturgie um **Disziplin, Zielorientierung, Nacht und Größe**. Sie ersetzt weitere bislang generierte Flächen oder leere Bildräume, ohne Songcover, offizielle Videoquellen oder die bereits eingesetzten zehn Portraitmotive doppelt zu verwenden.

| Datei | Visuelle Analyse | Zugeordneter Bereich | Begründung der Platzierung |
| --- | --- | --- | --- |
| `37730.png` | Kniende Pose im Regen vor einem Container-Set; sichtbare „Disziplin“-Botschaft und reflektierender Asphalt. | Image Archive: Discipline | Der ruhige, bodennahe Kader erweitert die Galerie um Konsequenz und Materialität. |
| `37731.png` | Sitzende Pose vor Fahrzeug, Hafenkran und Berliner Sonnenuntergang; großzügiger Himmel und klare Stadtweite. | Live / Announcements | Die offene Skyline gibt dem bisher textlichen Live-Kader einen zukunftsgerichteten Hintergrund, ohne nicht bestätigte Termine vorzutäuschen. |
| `37732.png` | Zentraler Stand zwischen Fahrzeug, Motorrad und Helikopter vor dramatischem Himmel; prägnante Disziplin-Botschaft. | Current Frame / Release | Die energische, zentrale Komposition ersetzt das generierte Platzhalterbild als Künstlerportrait für den noch unbetitelten aktuellen Kader; sie wird ausdrücklich nicht als Songcover ausgegeben. |
| `37733.png` | Sitzende Pose mit Löwe, Adler und Sonnenuntergang; markanter, heroischer Bildraum. | Press / EPK | Die starke, emblematische Inszenierung gibt dem vorbereiteten Press-Kader ein klares visuelles Leitmotiv. |
| `37734.png` | Sitzende Nachtpose in einer nassen Neon-Gasse; ruhiger Blick nach innen und tiefe Raumflucht. | Image Archive: Night | Die dichte, farbige Nachtatmosphäre ergänzt die Galerie um einen intimen, urbanen Schlusskader. |

Die Erweiterung folgt auf die erste Serie mit einem neuen Bogen: **Konsequenz → Perspektive → Energie → Signatur → Nacht**. Alle fünf Rollen erhalten eine eigene Bildquelle; die eingeblendeten Texte in den gelieferten Bildern werden nicht als zusätzliche Tatsachenbehauptungen der Website ausgegeben.

## Ladeverhalten

Im Browser lädt das Current-Frame-Motiv sofort, weil es im ersten Seitenabschnitt steht. Die vier tiefer liegenden Galerie-, Live- und Press-Motive verwenden bewusst `loading="lazy"`; außerhalb des Sichtbereichs melden sie deshalb zunächst keine natürliche Bildgröße. Dieses Verhalten hält die erste Seite schlank und lädt die vollauflösenden Künstlerbilder erst beim jeweiligen Scrollabschnitt nach.

## Visueller und technischer Abschluss

Die erweiterte Startseite wurde bei **1280 × 720 px** und **375 × 812 px** geprüft. Current Frame, Live, Press und Image Archive behalten ihre jeweiligen Texte, Kontrastflächen und Handlungsoptionen; die neuen Motive erweitern die Kader, ohne unbestätigte Release- oder Showdaten zu suggerieren. Die zentrale Registry und die Platzierungsrollen der zweiten Serie sind durch einen eigenen Test abgedeckt. Der Gesamtlauf bestätigte **26 Tests in 16 Testdateien**, die TypeScript-Prüfung und den Produktions-Build ohne Fehler.
