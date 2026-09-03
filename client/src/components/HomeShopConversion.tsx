import { ArrowUpRight, ShoppingBag, Sparkles } from "lucide-react";
import { shopHref } from "@/lib/shopLink";
import "../homepageConversion.css";

const shopEntries = [
  { code: "01", title: "T-Shirts", text: "P34nuts-Motive direkt im Shop entdecken und deine Variante auswählen.", href: `${shopHref}/tshirts` },
  { code: "02", title: "Hoodies", text: "Hoodies aus dem aktuellen P34nuts-Katalog – direkt auswählen und konfigurieren.", href: `${shopHref}/hoodies` },
  { code: "03", title: "Caps", text: "Caps und kleine Pieces aus dem P34nuts-Katalog für den Look ohne Uniform.", href: `${shopHref}/caps` },
] as const;

export function HomeShopConversion() {
  return (
    <section className="home-shop-conversion" aria-labelledby="home-shop-title">
      <div className="home-shop-conversion__noise" aria-hidden="true" />
      <div className="section-wrap home-shop-conversion__inner">
        <div className="home-shop-conversion__intro">
          <div>
            <p className="eyebrow">P34nuts Shop / Wear the frame</p>
            <h2 id="home-shop-title">NO BOX.<br /><em>NOW WEAR IT.</em></h2>
          </div>
          <div className="home-shop-conversion__lead">
            <span className="home-shop-conversion__icon"><ShoppingBag size={18} /></span>
            <p>Die Musik ist der Frame. Der Shop macht daraus etwas, das du mitnehmen kannst – direkt aus dem P34nuts-Katalog.</p>
            <a className="home-shop-conversion__primary" href={shopHref}>
              SHOP ALLE PRODUKTE <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="home-shop-conversion__grid">
          {shopEntries.map((entry) => (
            <a key={entry.code} href={entry.href} className="home-shop-conversion__card">
              <span className="home-shop-conversion__code">{entry.code} / SHOP</span>
              <div className="home-shop-conversion__card-title"><h3>{entry.title}</h3><ArrowUpRight size={20} /></div>
              <p>{entry.text}</p>
              <span className="home-shop-conversion__link">ENTDECKEN <ArrowUpRight size={13} /></span>
            </a>
          ))}
        </div>

        <div className="home-shop-conversion__bottom">
          <span><Sparkles size={14} /> ORIGINAL P34NUTS FRAMES</span>
          <span>Varianten direkt im Shop auswählen</span>
          <a href={shopHref}>SHOP ÖFFNEN <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}
