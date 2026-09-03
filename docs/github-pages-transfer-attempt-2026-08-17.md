# GitHub-Pages-Transfer – Actions-Importversuch

Der einmalige GitHub-Actions-Importlauf `32043196256` wurde am 17. August 2026 manuell gestartet. Der Download und das Entpacken des bereitgestellten, SHA-256-geprüften Quellarchivs starteten erfolgreich; die vollständige Ursache des abschließenden Fehlers wird aus dem Job-Protokoll weiter isoliert.

Der Versuch verwendete ausschließlich das öffentliche Transferarchiv ohne Zugangsdaten. Ein fehlerhaft verschachtelter Workflow-Entwurf unter `.github/workflows/one-time-source-import.yml/` soll durch den korrekten Importlauf bereinigt werden.

Der Quellimport war im dritten Lauf erfolgreich und erzeugte Commit `8a11abb`. Der manuell gestartete Pages-Build brach anschließend nur ab, weil der Medienordner `github-pages-media` nicht im ersten Quellarchiv enthalten war. Der vollständige Medienbestand wurde deshalb separat als `github-pages-media-2026-08-17.zip` bereitgestellt und mit SHA-256 `3bd49af8dcdea9ab10353d8000a3f27598aa815e7c69a0d6f076c9007a6a7e85` geprüft.

Der vierte Importlauf ergänzte den Medienordner erfolgreich. Der nächste Schritt ist der manuelle Start des bereits vorhandenen GitHub-Pages-Workflows, weil Commits eines GitHub-Actions-Tokens nach GitHub-Sicherheitsmodell keine weiteren Workflows automatisch auslösen.

Der projektspezifische Pages-Build für den vollständigen Quell- und Medienstand lief erfolgreich. Anschließend wurde auch der vorhandene Root-Pages-Workflow des Benutzerrepositorys `P34nuts/P34nuts.github.io` gezielt gestartet; Lauf `32044321886` endete erfolgreich. Damit kann die dauerhafte Hauptadresse `https://p34nuts.github.io/` den aktuellen Stand aus dem zentralen Quellrepository beziehen.
