/** NOIR CUT FINAL AUDIT — The missing route is another branded frame, never a generic template exit. */
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { SubpageDualBrandHeader } from "@/components/SubpageDualBrandHeader";

export default function NotFound() {
  useEffect(() => {
    document.title = "Lost in the Static — P34nuts";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Dieser Kader existiert nicht. Zurück zum Music Archive von P34nuts.");
  }, []);
  return <div className="subpage-shell"><SubpageDualBrandHeader /><main className="not-found-page"><div className="not-found-mark">404 / LOST FRAME</div><section><p className="eyebrow">Signal interrupted</p><h1>LOST IN<br /><em>THE STATIC.</em></h1><p>Dieser Kader existiert nicht. Die Musik schon.</p><div><Link href="/music"><ArrowUpRight size={17} /> GO TO MUSIC</Link><Link href="/"><ArrowLeft size={17} /> HOME</Link></div></section><span className="not-found-index">P34NUTS / NO DEAD ENDS</span></main></div>;
}
