# Shoplink-Konfiguration

Die Künstlerhomepage verwendet `shopHref` aus `client/src/lib/shopLink.ts` als zentrale Zieladresse für den SHOP-Einstieg in Header, mobiler Navigation und Footer.

| Konfiguration | Verhalten |
| --- | --- |
| Keine `VITE_SHOP_URL` | Der Einstieg führt sicher zur internen Noir-Cut-Gateway-Route `/shop`. |
| Gültige HTTPS-`VITE_SHOP_URL` | Alle sichtbaren SHOP-Einstiege führen unmittelbar zur eigenständigen Shop-Storefront. |
| Ungültige oder nicht-HTTPS-Adresse | Die Homepage fällt auf `/shop` zurück. |

Nach erfolgreichem Shop-Deployment wird ausschließlich `VITE_SHOP_URL` in der sicheren Projektkonfiguration auf die feste Storefront-Adresse gesetzt. Es ist keine erneute Änderung an Header, Footer oder Navigation erforderlich.
