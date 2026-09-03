import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, ExternalLink, FilePenLine, Github, LockKeyhole, Package, Rocket, ShieldCheck, Store, Workflow } from "lucide-react";
import { Link } from "wouter";

const GITHUB = "https://github.com/P34nuts";
const OFFICIAL_REPO = `${GITHUB}/p34nuts-official-website`;
const SHOP_REPO = `${GITHUB}/p34nuts-merch-store`;
const SHOP = "https://p34nuts-merch-store.onrender.com";
const CONTROL_WORKER = "https://p34nuts-control-center.frank-horn.workers.dev";
const HOMEPAGE_REPO = "P34nuts/p34nuts-official-website";
const EDITABLE_FILES = [
  { path: "client/src/data/artistData.ts", label: "Texte, Songs & Links", hint: "Inhalte der Homepage bearbeiten" },
  { path: "client/src/index.css", label: "Farben & Darstellung", hint: "Aussehen auf PC und Handy ändern" },
] as const;

type EditablePath = typeof EDITABLE_FILES[number]["path"];

function ActionLink({ href, children, external = true }: { href: string; children: React.ReactNode; external?: boolean }) {
  const className = "inline-flex min-h-11 items-center justify-between gap-3 rounded-none border border-white/15 bg-white/[.04] px-4 py-3 text-left text-sm text-[#f1eee5] transition hover:border-[#ff3b30] hover:bg-[#ff3b30] hover:text-[#101012] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff3b30]";
  if (external) return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" /></a>;
  return <Link className={className} href={href}>{children}<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" /></Link>;
}

function Section({ eyebrow, title, description, icon, children }: { eyebrow: string; title: string; description: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <section className="border-t border-white/15 pt-5"><div className="grid gap-5 lg:grid-cols-[minmax(15rem,.7fr)_minmax(0,1.3fr)]"><div><div className="flex items-center gap-2 font-mono text-[.62rem] uppercase tracking-[.2em] text-[#ff3b30]">{icon}{eyebrow}</div><h2 className="mt-3 text-2xl font-semibold tracking-[-.04em] text-[#f1eee5] sm:text-3xl">{title}</h2><p className="mt-3 max-w-md text-sm leading-6 text-white/55">{description}</p></div><div className="grid gap-3 sm:grid-cols-2">{children}</div></div></section>;
}

export default function ControlCenter() {
  const [session, setSession] = useState<"checking" | "signed-out" | "signed-in">("checking");
  const [editorPath, setEditorPath] = useState<EditablePath>(EDITABLE_FILES[0].path);
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [editorStatus, setEditorStatus] = useState("Noch keine Datei geladen.");
  const [commitMessage, setCommitMessage] = useState("P34nuts: Homepage-Inhalt aktualisieren");
  const [isBusy, setIsBusy] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const startLogin = () => { window.location.href = `${CONTROL_WORKER}/auth/start`; };

  const loadFile = async (path: EditablePath) => {
    setEditorPath(path);
    setIsBusy(true);
    setEditorStatus("Datei wird sicher vom Worker geladen …");
    try {
      const params = new URLSearchParams({ repository: HOMEPAGE_REPO, path });
      const response = await fetch(`${CONTROL_WORKER}/file?${params}`, { credentials: "include" });
      const value = await response.json() as { content?: string; error?: string };
      if (!response.ok || typeof value.content !== "string") throw new Error(value.error ?? "Datei konnte nicht geladen werden.");
      setContent(value.content);
      setOriginalContent(value.content);
      setEditorStatus("Geladen. Änderungen bleiben zunächst nur in dieser Vorschau.");
      setShowPreview(false);
    } catch (error) {
      setEditorStatus(error instanceof Error ? error.message : "Datei konnte nicht geladen werden.");
    } finally { setIsBusy(false); }
  };

  useEffect(() => {
    let cancelled = false;
    fetch(`${CONTROL_WORKER}/session`, { credentials: "include" })
      .then(response => response.ok ? response.json() : null)
      .then(value => {
        if (cancelled) return;
        const authenticated = Boolean(value?.authenticated);
        setSession(authenticated ? "signed-in" : "signed-out");
        if (authenticated) void loadFile(EDITABLE_FILES[0].path);
      })
      .catch(() => { if (!cancelled) setSession("signed-out"); });
    return () => { cancelled = true; };
  }, []);

  const commit = async () => {
    if (!content || content === originalContent) { setEditorStatus("Es gibt keine neue Änderung zum Committen."); return; }
    if (!/^P34nuts: /.test(commitMessage.trim())) { setEditorStatus("Die Commit-Nachricht muss mit „P34nuts: “ beginnen."); return; }
    if (!window.confirm(`Änderung wirklich sicher committen?\n\nDatei: ${editorPath}\nGeänderte Zeilen: ${changedLines}\n\nDanach startet automatisch der Veröffentlichungs-Workflow.`)) { setEditorStatus("Commit abgebrochen. Deine Änderungen bleiben als Entwurf erhalten."); return; }
    setIsBusy(true);
    setEditorStatus("Änderung wird serverseitig geprüft und als GitHub-Commit geschrieben …");
    try {
      const response = await fetch(`${CONTROL_WORKER}/commit`, { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: JSON.stringify({ repository: HOMEPAGE_REPO, path: editorPath, content, message: commitMessage.trim() }) });
      const value = await response.json() as { error?: string; ok?: boolean };
      if (!response.ok || !value.ok) throw new Error(value.error ?? "Commit fehlgeschlagen.");
      setOriginalContent(content);
      setEditorStatus("Commit erstellt. Der bestehende GitHub-Pages-Workflow veröffentlicht den geprüften Stand.");
    } catch (error) {
      setEditorStatus(error instanceof Error ? error.message : "Commit fehlgeschlagen.");
    } finally { setIsBusy(false); }
  };

  const changedLines = content && originalContent ? content.split("\n").filter((line, index) => line !== originalContent.split("\n")[index]).length : 0;
  const hasUnsavedChanges = Boolean(content && originalContent && content !== originalContent);
  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const warnBeforeLeave = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warnBeforeLeave);
    return () => window.removeEventListener("beforeunload", warnBeforeLeave);
  }, [hasUnsavedChanges]);

  return <main className="min-h-screen bg-[#101012] px-4 py-6 text-[#f1eee5] sm:px-8 sm:py-10 lg:px-14"><div className="mx-auto max-w-7xl">
    <header className="border-b border-white/15 pb-8"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="font-mono text-xs uppercase tracking-[.18em] text-white/60 transition hover:text-[#ff3b30]">← Zur Homepage</Link><div className="flex flex-wrap items-center gap-2">{session === "signed-in" ? <span className="inline-flex items-center gap-2 border border-emerald-400/30 bg-emerald-950/25 px-3 py-2 font-mono text-[.62rem] uppercase tracking-[.14em] text-emerald-200"><ShieldCheck className="size-3.5" aria-hidden="true" /> GitHub-Sitzung aktiv</span> : <button type="button" onClick={startLogin} className="inline-flex min-h-11 items-center gap-2 border border-[#ff3b30]/60 bg-[#ff3b30] px-3 py-2 font-mono text-[.62rem] uppercase tracking-[.14em] text-[#101012] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff3b30]">Mit GitHub anmelden <ArrowUpRight className="size-3.5" aria-hidden="true" /></button>}{session === "checking" && <span className="font-mono text-[.6rem] uppercase tracking-[.12em] text-white/40">Sitzung wird geprüft</span>}</div></div><p className="mt-12 font-mono text-xs uppercase tracking-[.28em] text-[#ff3b30]">P34NUTS / CONTROL CENTER</p><h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[.88] tracking-[-.09em] sm:text-7xl lg:text-8xl">Deine Seiten.<br /><em className="font-serif font-normal">Deine Kontrolle.</em></h1><p className="mt-7 max-w-2xl text-base leading-7 text-white/65">Hier startest du sichere Änderungen an der Artist-Homepage und am Shop. Jede Änderung bleibt nachvollziehbar und wird erst nach deinem Commit an GitHub übergeben.</p></header>

    <div className="my-7 grid gap-3 md:grid-cols-4"><div className="border border-[#ff3b30]/35 bg-[#ff3b30]/[.07] p-4"><Github className="size-5 text-[#ff3b30]" aria-hidden="true" /><p className="mt-4 font-semibold">Serverseitig geschützt</p><p className="mt-1 text-xs leading-5 text-white/50">{session === "signed-in" ? "GitHub hat deine Betreiber-Sitzung bestätigt." : "Melde dich mit GitHub an, bevor eine sichere Änderung ausgeführt wird."}</p><button type="button" onClick={startLogin} className="mt-4 font-mono text-[.62rem] uppercase tracking-[.12em] text-[#ff3b30] underline-offset-4 hover:underline">{session === "signed-in" ? "Erneut anmelden" : "Login starten"}</button></div><div className="border border-white/10 bg-white/[.035] p-4"><LockKeyhole className="size-5 text-[#ff3b30]" aria-hidden="true" /><p className="mt-4 font-semibold">Keine Schlüssel im Browser</p><p className="mt-1 text-xs leading-5 text-white/50">Private GitHub-, Stripe- und Printful-Daten werden nie in diese Seite eingebaut.</p></div><div className="border border-white/10 bg-white/[.035] p-4"><Workflow className="size-5 text-[#ff3b30]" aria-hidden="true" /><p className="mt-4 font-semibold">Versioniert</p><p className="mt-1 text-xs leading-5 text-white/50">Homepage-Änderungen bleiben als GitHub-Commit nachvollziehbar und rücksetzbar.</p></div><div className="border border-white/10 bg-white/[.035] p-4"><Rocket className="size-5 text-[#ff3b30]" aria-hidden="true" /><p className="mt-4 font-semibold">Kontrolliert live</p><p className="mt-1 text-xs leading-5 text-white/50">GitHub Actions veröffentlicht erst den geprüften Stand auf GitHub Pages.</p></div></div>

    <section className="mb-12 border border-[#ff3b30]/45 bg-[#ff3b30]/[.07] p-5 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2 font-mono text-[.62rem] uppercase tracking-[.2em] text-[#ff3b30]"><FilePenLine className="size-3.5" aria-hidden="true" /> 00 / Sicherer Editor</div><h2 className="mt-3 text-2xl font-semibold tracking-[-.04em] sm:text-3xl">Änderung vorbereiten</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">Wähle eine freigegebene Quelle, prüfe die lokale Vorschau und speichere erst danach sicher. Du musst keine Dateien außerhalb dieser Auswahl öffnen. Die privaten GitHub-App-Schlüssel bleiben ausschließlich im Cloudflare Worker.</p><div className="mt-5 border border-amber-300/25 bg-amber-950/15 p-3 text-xs leading-5 text-amber-100/80"><strong className="block text-amber-100">Hinweis für Einsteiger</strong><span>Dieser Bereich arbeitet mit freigegebenen Vorlagen. Wenn du nicht sicher bist, ändere nur den sichtbaren Text und nutze immer zuerst „Vorschau“.</span></div><div className="mt-5 grid gap-2 text-xs text-white/65 sm:grid-cols-3"><div className="border border-white/10 bg-black/15 p-3"><strong className="block text-[#f1eee5]">1. Datei auswählen</strong><span className="mt-1 block">Zum Beispiel „Artist-Daten“ für Songs und Texte.</span></div><div className="border border-white/10 bg-black/15 p-3"><strong className="block text-[#f1eee5]">2. Änderung prüfen</strong><span className="mt-1 block">„Vorschau“ zeigt, was vorbereitet wurde.</span></div><div className="border border-white/10 bg-black/15 p-3"><strong className="block text-[#f1eee5]">3. Sicher speichern</strong><span className="mt-1 block">Erst „Sicher committen“ übergibt die Änderung.</span></div></div></div><span className="border border-white/15 px-3 py-2 font-mono text-[.62rem] uppercase tracking-[.12em] text-white/55">{changedLines} geänderte Zeilen</span></div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[14rem_minmax(0,1fr)]"><div className="grid content-start gap-2">{EDITABLE_FILES.map(file => <button key={file.path} type="button" disabled={isBusy || session !== "signed-in"} onClick={() => void loadFile(file.path)} className={`border px-3 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${editorPath === file.path ? "border-[#ff3b30] bg-[#ff3b30] text-[#101012]" : "border-white/15 bg-white/[.04] hover:border-[#ff3b30]"}`}><strong className="block text-sm">{file.label}</strong><small className="mt-1 block text-xs opacity-65">{file.hint}</small></button>)}</div><div><textarea aria-label="Dateiinhalt" value={content} onChange={event => setContent(event.target.value)} disabled={isBusy || session !== "signed-in"} spellCheck={false} className="min-h-[22rem] w-full resize-y border border-white/15 bg-[#0b0b0d] p-4 font-mono text-xs leading-6 text-white/80 outline-none transition focus:border-[#ff3b30] disabled:opacity-50" placeholder={session === "signed-in" ? "Datei wird geladen …" : "Bitte zuerst mit GitHub anmelden."} /><div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]"><input aria-label="Commit-Nachricht" value={commitMessage} onChange={event => setCommitMessage(event.target.value)} className="min-h-11 border border-white/15 bg-[#0b0b0d] px-3 font-mono text-xs text-white/80 outline-none focus:border-[#ff3b30]" /><button type="button" onClick={() => setShowPreview(value => !value)} disabled={!content} className="min-h-11 border border-white/20 px-4 font-mono text-[.62rem] uppercase tracking-[.12em] transition hover:border-[#ff3b30] disabled:opacity-40">{showPreview ? "Vorschau schließen" : "Vorschau"}</button><button type="button" onClick={() => void commit()} disabled={isBusy || session !== "signed-in" || !content || content === originalContent} className="min-h-11 bg-[#ff3b30] px-4 font-mono text-[.62rem] uppercase tracking-[.12em] text-[#101012] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">{isBusy ? "Bitte warten …" : "Sicher committen"}</button></div><p role="status" className="mt-3 text-xs leading-5 text-white/55">{editorStatus}</p>{showPreview && <div className="mt-4 border border-emerald-300/25 bg-emerald-950/15 p-4"><p className="font-mono text-[.62rem] uppercase tracking-[.12em] text-emerald-200">Lokale Vorschau vor dem Commit</p><p className="mt-2 text-xs leading-5 text-white/65">Diese Vorschau verändert noch nichts auf GitHub. Der sichtbare Stand entspricht exakt dem Inhalt, der an den Worker gesendet würde.</p><pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap break-words border border-white/10 bg-black/25 p-3 font-mono text-[.68rem] leading-5 text-white/70">{content}</pre></div>}</div></div>
    </section>

    <div className="grid gap-12"><Section eyebrow="01 / Artist Homepage" title="Inhalte ändern" description="Die sicheren Quellen können direkt hier vorbereitet oder alternativ über die vorhandenen GitHub-Wege geöffnet werden." icon={<FilePenLine className="size-3.5" aria-hidden="true" />}><ActionLink href={`${OFFICIAL_REPO}/edit/main/client/src/data/artistData.ts`}><span><FilePenLine className="mb-1 size-4" aria-hidden="true" /><strong className="block">Songs & Seiteninhalte</strong><small className="text-xs opacity-60">Artist-Daten bearbeiten</small></span></ActionLink><ActionLink href={`${OFFICIAL_REPO}/edit/main/client/src/index.css`}><span><FilePenLine className="mb-1 size-4" aria-hidden="true" /><strong className="block">Design & Layout</strong><small className="text-xs opacity-60">Farben, Abstände, Mobile CSS</small></span></ActionLink><ActionLink href={`${OFFICIAL_REPO}/actions/workflows/deploy-pages.yml`}><span><Rocket className="mb-1 size-4" aria-hidden="true" /><strong className="block">Homepage veröffentlichen</strong><small className="text-xs opacity-60">GitHub-Pages-Workflow öffnen</small></span></ActionLink><ActionLink href={`${OFFICIAL_REPO}/issues/new`}><span><BookOpen className="mb-1 size-4" aria-hidden="true" /><strong className="block">Änderung beauftragen</strong><small className="text-xs opacity-60">Notiz oder Problem erfassen</small></span></ActionLink></Section><Section eyebrow="02 / Gästebuch & öffentliche Signale" title="Community verwalten" description="Das bestehende serverseitige Gästebuch bleibt geschützt. Öffne dafür den vorhandenen Adminweg; die öffentliche Homepage bleibt auf GitHub Pages." icon={<ShieldCheck className="size-3.5" aria-hidden="true" />}><ActionLink href={`${OFFICIAL_REPO}/tree/main/client/src/pages/Admin.tsx`}><span><ShieldCheck className="mb-1 size-4" aria-hidden="true" /><strong className="block">Bestehenden Admincode</strong><small className="text-xs opacity-60">Sicherheitslogik einsehen</small></span></ActionLink><ActionLink href={`${OFFICIAL_REPO}/issues`}><span><BookOpen className="mb-1 size-4" aria-hidden="true" /><strong className="block">Änderungsübersicht</strong><small className="text-xs opacity-60">Offene GitHub-Aufgaben</small></span></ActionLink></Section><Section eyebrow="03 / Merch Shop" title="Shop öffnen" description="Der Shop läuft als getrennte Render-Anwendung. Checkout, Clerk, Stripe, Printful, Bestellungen und TiDB bleiben dort geschützt und werden nicht über GitHub-Dateien manipuliert." icon={<Store className="size-3.5" aria-hidden="true" />}><ActionLink href={`${SHOP}/admin`}><span><Store className="mb-1 size-4" aria-hidden="true" /><strong className="block">Shop-Administration</strong><small className="text-xs opacity-60">Clerk-geschützter Adminbereich</small></span></ActionLink><ActionLink href={`${SHOP}/admin/printful-catalog`}><span><Package className="mb-1 size-4" aria-hidden="true" /><strong className="block">Printful-Katalog</strong><small className="text-xs opacity-60">Vorschau & kontrollierter Import</small></span></ActionLink><ActionLink href={`${SHOP_REPO}/actions`}><span><Workflow className="mb-1 size-4" aria-hidden="true" /><strong className="block">Shop-Deploys</strong><small className="text-xs opacity-60">GitHub-Quellstand & Actions</small></span></ActionLink><ActionLink href={`${SHOP}/healthz`}><span><ShieldCheck className="mb-1 size-4" aria-hidden="true" /><strong className="block">Shop-Status</strong><small className="text-xs opacity-60">Öffentliche Gesundheitsprüfung</small></span></ActionLink></Section><section className="border border-[#ff3b30]/45 bg-[#ff3b30]/[.07] p-5 sm:p-7"><div className="flex items-start gap-4"><Github className="mt-1 size-6 shrink-0 text-[#ff3b30]" aria-hidden="true" /><div><h2 className="text-xl font-semibold">Sicherheitsgrenze</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">Die Oberfläche kennt keine privaten Schlüssel. Sie sendet nur eine authentifizierte Anfrage an den Worker; der Worker prüft Sitzung, Repository, Zielpfad, Größe und Commit-Nachricht, bevor GitHub angesprochen wird. Private GitHub-App-Schlüssel werden niemals in diesem Pages-Bundle ausgeliefert.</p><a className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[.12em] text-[#ff3b30] hover:text-white" href="https://github.com/settings/apps/p34nuts-control-center" target="_blank" rel="noreferrer">GitHub-App verwalten <ExternalLink className="size-3.5" aria-hidden="true" /></a></div></div></section></div>
  </div></main>;
}
