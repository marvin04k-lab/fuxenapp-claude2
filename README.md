# Fuchsenskript – Lernapp (K.a.V. Bajuvaria)

Lernhelfer für **Branderprüfung** und **Burschenprüfung** als Android-App (Capacitor) und als installierbare Web-App (PWA). Läuft komplett offline, der Lernfortschritt wird auf dem Gerät gespeichert.

## Funktionen
- Start mit zwei Reitern: **Branderprüfung** / **Burschenprüfung**
- Je Teilgebiet des Fuchsenskripts drei Stufen:
  1. **Entdecken** – spannend aufbereitete Lernkapitel + vollständiger, durchsuchbarer Originaltext (Fuchsenskript, Komment, Satzungen, Statuten, GO)
  2. **Vertiefen** – alle Leitfragen des Skripts mit automatisch gefundenen Skript-Stellen und Selbsteinschätzung
  3. **Verinnerlichen** – Quiz, Karteikarten (Leitner, 5 Fächer), Lückentext, Reihenfolge, Farben-Trainer (Band ↔ Verbindung), Text-Trainer für Lieder & Gebete (Lesen → Lücken → Aufsagen), Diskussionstrainer
- **Prüfungsmodus** pro Prüfung: Multiple Choice je Teilgebiet, optional mündliche Leitfrage und Zeitlimit, Auswertung je Gebiet mit Übungs-Kalkül (bestanden / bene / cum laude)
- Fortschrittsanzeige, **Reset** (je Prüfung oder komplett), Export/Import des Fortschritts, Hell/Dunkel

## APK bauen über GitHub (ohne eigenen Rechner-Setup)
1. Neues (privates) Repository auf GitHub anlegen und den Inhalt dieses Ordners hochladen (inkl. `.github`).
2. Reiter **Actions** → Workflow **„Android-APK bauen“** startet automatisch bei jedem Push auf `main` (oder manuell über „Run workflow“).
3. Nach ca. 5–8 Minuten im Workflow-Lauf unter **Artifacts** → `Fuchsenskript-APK` herunterladen, entpacken, `app-debug.apk` aufs Handy kopieren und installieren („Installation aus unbekannten Quellen“ erlauben).

## Web-App (iPhone & Android) über GitHub Pages
Settings → Pages → Source: **GitHub Actions**. Der Workflow „Web-App auf GitHub Pages veröffentlichen“ stellt den Ordner `www` online. Am Handy im Browser öffnen → „Zum Home-Bildschirm hinzufügen“.
> Achtung: Bei öffentlichem Pages-Hosting sind die Verbindungstexte für jeden mit dem Link lesbar.

## Lokal bauen (optional)
```bash
npm install
npx cap add android
npm run icons        # App-Icon aus assets/icon-only.png
npx cap sync android
cd android && ./gradlew assembleDebug
```
Voraussetzungen: Node 20, JDK 17, Android SDK. Lokal testen: `npm run serve` → http://localhost:8080

## Inhalte pflegen
- `www/data/content-brander.js`, `www/data/content-burschen.js` – aufbereitete Kapitel, Quizfragen, Karteikarten, Lückentexte, Reihenfolgen, Farben, Lied- und Gebetstexte
- `www/data/skript.js` – automatisch aus den PDFs erzeugt (Volltext + Leitfragen). Neu erzeugen nach einer neuen Skript-Fassung:
  ```bash
  python3 tools/build_skript.py Fuchsenskript.pdf Komment.pdf Rechtstexte.pdf www/data/skript.js
  ```
  (benötigt `pdftotext`/`pdfinfo` aus poppler-utils)
- Nach Änderungen in `www/sw.js` die Versionsnummer `CACHE` erhöhen, damit die Web-App aktualisiert wird.

Maßgeblich sind immer die Originaltexte des Fuchsenskripts, des Komments und der Rechtstexte.
