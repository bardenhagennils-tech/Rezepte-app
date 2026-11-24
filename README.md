# Rezepte-App

Eigenständige, offline-fähige PWA für die Rezepte-Verwaltung im privaten Repo
[bardenhagennils-tech/Rezepte-](https://github.com/bardenhagennils-tech/Rezepte-).
Läuft komplett ohne Netlify oder einen Build-Schritt: statische Dateien, gehostet via GitHub Pages.

## Funktionen

- Rezepte ansehen, suchen, filtern (Kategorie, Tags, Zeit)
- Portionen skalieren, Koch-Modus mit abhakbaren Schritten
- Rezepte werden lokal gespeichert; beim Öffnen gleicht die App per GitHub-API mit dem Repo ab (nur geänderte Dateien werden neu geladen)
- **Voll offline nutzbar** (Service Worker + lokaler Cache), auch auf dem Handy installierbar
- Neue Rezepte aus der App heraus: Formular erzeugt eine FORMAT.md-konforme Markdown-Datei und committet auf `main`. Offline wird das Rezept gepuffert und automatisch committet, sobald wieder Internet da ist.

## Setup

1. GitHub Pages aktivieren: Repo-Settings → Pages → Source „Deploy from a branch“ → Branch `main`, Ordner `/ (root)`.
2. Fine-grained PAT erzeugen (nur Repo `Rezepte-`, Permissions → Contents: Read and write) und in der App unter „Mehr → Einstellungen“ hinterlegen (nur lokal im Browser).

## Dateien

- `index.html` – die gesamte App (kein Framework, keine Abhängigkeiten)
- `sw.js` – Service Worker für Offline-Fähigkeit
- `manifest.json`, `icon.svg` – PWA-Installation