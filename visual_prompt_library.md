# P34nuts — Visual Prompt Library

Alle Prompts verwenden das Master-System aus `visual_style_guide.md`. Generierte Bilder enthalten **keinen lesbaren Text, keine Logos und keine Wasserzeichen**; Wordmark, Tracktitel und Metadaten liegen im Website-Layer. Personen sind bewusst fiktive Platzhalterfiguren, nicht die reale Person P34nuts.

## Portrait and Campaign Assets

| Asset | Format | Zweck | Kernmotiv |
| --- | --- | --- | --- |
| Hero Portrait | 16:9 | Hero, Web-Preview, EPK wide | Fiktiver Artist im Betonuntergang, negative Fläche links, hartes Seitenlicht. |
| Editorial Portrait | 2:3 | Gallery, EPK portrait | Fiktiver Artist hinter Rauchglas, modisch, still, präzise. |
| Raw Portrait | 4:5 | Gallery, Social | Körniger Nachtkader an nasser Betonwand, roter Reflex. |
| Shadow / About | 4:5 | About, „Wer bin ich?“ | Spiegelbild passt nicht ganz zur Figur; Schatten und Doppeldeutigkeit. |
| Human Portrait | 4:5 | EPK, Gallery | Ruhiger, weniger inszenierter Fensterlicht-Moment. |
| Performance | 16:9 | Visuals, press wide | Fiktive Bühne in Club-Schatten, keine Crowd-Überzeichnung. |
| OG Key Visual | 1.91:1 | OG / Website share | Hero-Motiv mit freier Papierfläche für HTML-Overlay. |

## Cover Series

| Nr. | Track | Visual motif | Mood |
| --- | --- | --- | --- |
| 01 | Dein Name auf nem Stein | Einzelner glattgeschliffener dunkler Stein auf nassem Asphalt, kaltes Seitenlicht. | Erinnerung / Stille |
| 02 | Was? | Absurde akademische Diagrammfläche, rot markierter Fehler in präzisem technischen Layout. | Intellekt / Humor |
| 03 | P34nuts regelt das | Charmant absurdes Kontrollpult aus anonymen Schaltern, eine Hand löst scheinbar alles. | Selbstvertrauen / Satire |
| 04 | Maskenball | Elegante dunkle Maske hinter beschlagenem Glas, weiter leerer Raum. | Einsamkeit / Rolle |
| 05 | Ich hasse dich (..zu lieben) | Zwei Figuren im kalten Apartmentlicht, Rücken nah, emotionale Distanz. | Liebe / Konflikt |
| 06 | Scheiss auf das Wetter | Durchnässte Festivallichter und Stiefel im Schlamm, Freude statt Katastrophe. | Freiheit / Energie |
| 07 | Ungefiltert | Gesichtsreflexion im gesprungenen Smartphoneglas, reale Schatten stören die Perfektion. | Realität / Fassade |
| 08 | Zündschnur | Ein glühender roter Faden durch schwarzen Industriestaub, ohne Waffe oder Explosion. | Druck / Spannung |
| 09 | Urlaub-Burnout | Verlassener Pool bei grellem Mittag, überforderte Figur im Schatten eines Sonnenschirms. | Humor / Erschöpfung |
| 10 | Zeitlupe | Eine ruhige Figur im Zentrum, lange Lichtspuren ziehen um sie herum. | Melancholie / Stillstand |
| 11 | Diamanten im Staub | Winziger ungeschliffener Diamant in Betonstaub, schmaler Lichtpunkt. | Wert / Widerstand |
| 12 | Was wäre wenn? | Zwei sich teilende, nasse Korridore mit zwei Schatten derselben Figur. | Möglichkeit / Entscheidung |
| 13 | Wie sagt man Lebewohl? | Leerer Stuhl, ausgeblichenes Foto ohne lesbare Details, Fensterlicht. | Familie / Abschied |
| 14 | P34nuts | Monumentales, humorvoll überhöhtes Schattenporträt als Plakat-Silhouette, aber ohne Text. | Mythos / Selbstironie |
| 15 | VIP ohne Namen | Dunkle Samtseparée, Anzugfigur rückwärts im Gegenlicht, Gesicht unsichtbar. | Status / Anonymität |
| 16 | Guten Morgen Sonnenschein | Off-White Frühstückstisch und perfektes Licht, ein irritierender tiefer Schatten. | Süße / Unruhe |
| 17 | Die Therapie wirkt | Entspannte Figur im Sessel, dahinter absolut geordnete Objekte kurz vor dem Umkippen. | Ironie / Chaos |
| 18 | Handwerker des Jahres | Präzise Werkbank, reflektierender Helm, humorvoll überernste Komposition ohne Anzüglichkeit. | Handwerk / Comedy |
| 19 | Auf Rezept | Abstrakte leere Rezeptblöcke und Apotheker-Glasgefäße ohne Text, zunehmend absurd angeordnet. | Satire / Kontrolle |
| 20 | Dreckig und in Tränen | Leeres Schlafzimmer in Nacht, Telefonlicht auf zerknittertem Laken. | Verlust / Leere |
| 21 | Tunnelblick | Nasse Tunnelwand und rot-weiße Lichtspuren, Blick aus statischer Kamera. | Adrenalin / Geschwindigkeit |
| 22 | Wer bin ich? | Spiegel zeigt eine leicht versetzte, andere Kopfhaltung derselben fiktiven Figur. | Identität / Wahrheit |
| 23 | Zyklus der Gewalt (Gym) | Beton-Gym, Eisen, Dampf und harte Seitenbeleuchtung, kein Fitness-Werbelook. | Disziplin / Kraft |

## Prompt Skeleton

> Create an original square album-cover visual for a contemporary German rap artist brand. Subject: **[motif]**. Composition: single iconic motif, central but with controlled negative space for a website title overlay, square 1:1. Style: dark editorial cinema, analogue 35mm texture only where appropriate, Ink Black and Paper White palette with one small Cut Red detail, physically believable hard side light, premium independent label art direction. Text/content: no text, no letters, no logos, no watermark. Constraints: original, no celebrity likeness, no brand marks, no generic rap tropes, no artificial-looking skin, no malformed hands, no floating objects, no surreal anatomy.

## Production Notes

Use one purpose-built asset per important image role rather than generating decorative filler. Track titles and the P34nuts wordmark are supplied through HTML/CSS, preserving responsive crops and accessibility. Generated cover images are connected through central data fields: `title`, `cover`, `visualTheme`, `mood`, and `themes`.
