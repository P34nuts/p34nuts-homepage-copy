import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { assets } from "@/data/artistData";
import { shopHref } from "@/lib/shopLink";

export function SubpageDualBrandHeader() {
  return (
    <header className="subpage-header">
      <div className="header-brand-group">
        <Link href="/" className="brand-lockup brand-home-wordmark" aria-label="P34nuts, zur Startseite">
          <img src={assets.headerWordmark} alt="P34nuts" />
        </Link>
        <a href={shopHref} className="brand-lockup brand-shop-wordmark" aria-label="P34nuts Shop, zur Shop-Startseite">
          <img src={assets.shopHeaderWordmark} alt="P34nuts Shop" />
        </a>
      </div>
      <Link href="/" className="subpage-back"><ArrowLeft size={16} /> HOME</Link>
    </header>
  );
}
