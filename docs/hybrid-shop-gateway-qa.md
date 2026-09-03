# Hybrid-Shop-Gateway: QA-Nachweis

## Ziel

Die Künstlerhomepage bleibt unter `https://p34nutsart-jjmeco2k.manus.space/` eigenständig. Der neue interne Einstieg `/shop` macht die geplante Merch-Storefront sichtbar, ohne Warenkorb-, Checkout-, Zahlungs- oder Fulfillment-Code in die Artist-Anwendung zu übertragen.

## Geprüfte Ansichten

| Ansicht | Ergebnis |
| --- | --- |
| Desktop, 1280 × 720 | Der neue SHOP-Einstieg ist in der Hauptnavigation sichtbar. Die Gateway-Route folgt dem Noir-Cut-Design, bleibt lesbar über dem Portrait und zeigt eine klar erkennbare HOME-Rückkehr. |
| Mobil, 375 × 812 | Wortmarke, HOME-Rückweg, Titel, erklärender Text, drei Informationskader und die Rückkehraktion bleiben ohne horizontalen Überlauf erreichbar und lesbar. |

## Technische Grenze

Das Gateway ist ausschließlich eine Marken- und Navigationsbrücke. Der produktive Shop wird separat serverfähig bereitgestellt. Bis zu dessen eigener HTTPS-Adresse sowie einer verifizierten Stripe-/Printful-Konfiguration verarbeitet diese Künstlerhomepage keine Shop-Zahlungs- oder Bestelldaten.
