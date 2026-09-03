/** NOIR CUT LEGAL FRAME — structured public information without inventing personal details. */
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { assets, booking } from "@/data/artistData";
import { SubpageDualBrandHeader } from "@/components/SubpageDualBrandHeader";

type InfoKind = "booking" | "press" | "shop" | "impressum" | "datenschutz";
type InfoSection = { heading: string; copy: string; closingCopy?: string; value?: string };
type InfoContent = { label: string; title: string; copy: string; action: string; href?: string; notice?: string; sections?: InfoSection[] };

export const infoPageContent: Record<InfoKind, InfoContent> = {
  booking: {
    label: "Booking / business",
    title: "MAKE THE\nNEXT FRAME\nREAL.",
    copy: `Für Live-Shows, Kooperationen und Business-Anfragen. Das Booking-Formular übermittelt deine Angaben geschützt an den Projektkontakt; direkt erreichbar ist P34nuts außerdem unter ${booking.email}.`,
    action: "ZUM BOOKING-FORMULAR",
    href: "/#send-the-frame",
  },
  press: {
    label: "Press / EPK",
    title: "THE PRESS\nFRAME IS\nREADY.",
    copy: "Hier entstehen Bildwelten, Basisinformationen und alles rund um Presseberichte. Außerdem folgt ein Download-Bereich. Ein EPK wird erst nach Freigabe verlinkt.",
    action: "EPK / IN FREIGABE",
  },
  shop: {
    label: "Merch / independent storefront",
    title: "NO//SIGNAL\nMERCH\nARCHIVE.",
    copy: "Der P34nuts-Merch-Shop wird als eigenständige Storefront betrieben. Dieser Einstieg bleibt Teil des Artist-Universums, während Katalog, Warenkorb, Bestellungen und Fulfillment technisch getrennt und abgesichert laufen.",
    action: "BACK TO HOME",
    sections: [
      { heading: "Storefront", copy: "Die Shopanwendung erhält einen eigenen serverfähigen Betrieb. Dadurch bleiben der Artist-Auftritt, die Musikarchive und die Commerce-Prozesse voneinander getrennt." },
      { heading: "Katalog", copy: "Caps, T-Shirts und Hoodies werden über die eigenständige Merch-Storefront bereitgestellt. Der sichtbare SHOP-Einstieg auf dieser Website bleibt der direkte Zugangspunkt zur Kollektion." },
      { heading: "Checkout", copy: "Der Kaufstart erfolgt erst nach abgeschlossener Shop-Bereitstellung sowie geprüfter Zahlungs- und Fulfillment-Konfiguration. Bis dahin werden keine Zahlungs- oder Bestelldaten über die Künstlerhomepage verarbeitet." },
    ],
  },
  impressum: {
    label: "Legal / Impressum",
    title: "IMPRINT\nBY\nP34NUTS.",
    copy: "Angaben zur verantwortlichen Stelle und zum P34nuts-Projekt.",
    action: "BACK TO HOME",
    sections: [
      { heading: "Künstler- & Projekt-Hinweis: Über das Projekt „P34nuts“", copy: "Hinter dem Namen P34nuts steht kein klassischer Rapper aus Fleisch und Blut, sondern eine digitale Kunstfigur – konzipiert, erschaffen und gelenkt von Künstler und DJ Frank Horn." },
      { heading: "Die kreative Vision & der Einsatz von KI", copy: "Das Projekt „P34nuts“ verbindet moderne Technologie mit persönlicher Kreativität:" },
      { heading: "100 % Echte Texte", copy: "Sämtliche Songtexte, Geschichten, Konzepte und thematischen Botschaften stammen ausnahmslos und zu 100 % aus der Feder von Frank Horn. Hier fließt persönliche Lebenserfahrung, Herzblut, Gesellschaftskritik und Humor ein." },
      { heading: "KI-gestützte Produktion", copy: "Die finale musikalische Komposition und die stimmliche Umsetzung erfolgen über generative KI-Technologie (Suno AI)." },
      { heading: "Aufwand & Leidenschaft", copy: "Auch wenn künstliche Intelligenz als mächtiges Werkzeug dient, steckt in jedem fertigen Track unzählige Stunden an Songwriting, feinteiligem Prompt-Engineering, manuellem Arrangement, Kuration und Feinschliff. Es ist ein modernes Kunstprojekt, das neue digitale Wege im Musikbereich beschreitet." },
      { heading: "Buchungen & Live-Auftritte", copy: "Für Buchungen, Events und Live-Auftritte wird ausdrücklich der Künstler DJ Frank Horn (alias P34nuts) als Person und DJ verpflichtet. Das Live-Programm verbindet energiegeladene DJ-Sets mit den individuellen Sounds und Facetten des Projekts." },
      { heading: "Support & Wertschätzung", copy: "Ein eigenständiges Projekt dieser Art lebt von seiner Community. Ob durch das Streamen der Musik, Feedback, das Teilen der Songs, Merch-Käufe im Shop oder DJ-Buchungen: Jeder Support fließt direkt in die Weiterentwicklung des Sounds, neue Tracks und kommende Veröffentlichungen.", closingCopy: "Vielen Dank für jeden Support und das Begleiten dieser Reise!" },
      { heading: "Anbieter / verantwortliche Stelle", copy: "Frank Horn", value: "Frank Horn" },
      { heading: "Zustellfähige Anschrift", copy: "Hindenburgstraße 20\n88459 Tannheim\nDeutschland", value: "Hindenburgstraße 20 · 88459 Tannheim · Deutschland" },
      { heading: "Kontakt", copy: "Für direkte Anfragen und Booking:", value: booking.email },
    ],
  },
  datenschutz: {
    label: "Privacy / Datenschutz",
    title: "PRIVACY\nWITH\nCONTEXT.",
    copy: "Diese Datenschutzerklärung beschreibt die Verarbeitung personenbezogener Daten auf der offiziellen P34nuts-Website.",
    action: "BACK TO HOME",
    sections: [
      { heading: "Verantwortliche Stelle", copy: "Verantwortlich für die Verarbeitung personenbezogener Daten ist Frank Horn, Hindenburgstraße 20, 88459 Tannheim, Deutschland. Kontakt: P34nuts@mail.de." },
      { heading: "Aufruf der Website und Hosting", copy: "Beim Aufruf der Website können technisch erforderliche Verbindungsdaten wie IP-Adresse, Zeitpunkt, angeforderte Datei, Browsertyp und Betriebssystem durch den Hosting- und Auslieferungsdienst verarbeitet werden. Die Website wird über GitHub Pages bereitgestellt. Diese Verarbeitung dient der sicheren und stabilen Auslieferung der Website; es wird auf dieser Website kein eigenes Marketing- oder Analyseprofiling eingesetzt." },
      { heading: "Booking-Anfragen", copy: "Wenn du das Booking-Formular absendest, werden die von dir eingegebenen Angaben verarbeitet: Name, E-Mail-Adresse, Datum, Veranstaltungsort, Ort, Veranstaltungsformat sowie – sofern angegeben – Kapazität, Budget und Nachricht. Die Angaben werden zur Bearbeitung der Anfrage serverseitig gespeichert, dem Projekteigentümer gemeldet und an die Booking-Adresse P34nuts@mail.de übermittelt." },
      { heading: "E-Mail-Versand", copy: "Für den Versand der Booking-Benachrichtigung wird der verschlüsselte SMTP-Dienst von mail.de verwendet. Die E-Mail-Adresse der anfragenden Person wird als Antwortadresse eingesetzt. Die Daten werden nicht für Werbung verwendet und gelöscht, sobald sie für die Bearbeitung nicht mehr benötigt werden, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen." },
      { heading: "Eingebettete YouTube-Videos", copy: "Ein Video wird erst geladen, wenn du seine Karte aktiv öffnest. Der dann eingebettete Player verwendet die Domain youtube-nocookie.com. Beim Schließen des Fensters wird der Player wieder aus der Seite entfernt. Dabei können durch YouTube technische Verbindungsdaten verarbeitet werden." },
      { heading: "Cookies und Betroffenenrechte", copy: "Die Website verwendet nach dem aktuellen technischen Stand keine eigenen Werbe- oder Analyse-Cookies. Technisch notwendige Speicherungen können für die Funktion einzelner Seiten eingesetzt werden. Du hast insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch sowie Beschwerde bei einer Datenschutzaufsichtsbehörde. Anfragen kannst du an P34nuts@mail.de richten." },
    ],
  },
};

export default function InfoPage({ kind }: { kind: InfoKind }) {
  const page = infoPageContent[kind];
  const hasPortrait = kind === "booking" || kind === "shop";

  useEffect(() => {
    document.title = `${page.label} — P34nuts`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", page.copy);
  }, [page]);

  const content = <>
    <p className="eyebrow">{page.label}</p>
    <h1>{page.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h1>
    <p>{page.copy}</p>
    {page.notice ? <aside className="info-page-notice">{page.notice}</aside> : null}
    {page.sections ? <div className="info-page-details">{page.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.copy}</p>{section.closingCopy ? <p>{section.closingCopy}</p> : null}{section.value ? <code className="info-page-template-value">{section.value}</code> : null}</section>)}</div> : null}
    <Link href={page.href ?? "/"} className="info-page-action">{page.action}<ArrowUpRight size={17} /></Link>
  </>;

  return (
    <main className={`subpage-shell info-page ${hasPortrait ? "info-page--portrait" : ""}`}>
      <SubpageDualBrandHeader />
      <section className="info-page-content">
        {hasPortrait ? <><img className="info-page-portrait" src={assets.hero} alt="" /><div className="info-page-portrait-veil" /><div className="info-page-content-inner">{content}</div></> : content}
      </section>
    </main>
  );
}
