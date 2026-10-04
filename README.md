# Rom: Vom Dorf zum Weltreich

Interaktive Lernseite für Geschichte, Klasse 8 (Deutsch als Fremdsprache), zum Schulbuch-Kapitel 5
„Vom Dorf zum Weltreich – Menschen im Römischen Reich“ (Seiten 108–111):

- Die Landschaft Roms (D1) als interaktive Karte
- Latiner, Etrusker und Griechen
- Handel und Wachstum, Stadt und Land
- Die Sage von Romulus und Remus (D2) als Bildergeschichte
- Sage oder Wissenschaft? Sortierspiel
- Völker Italiens im 6. Jh. v. Chr. mit Entfernungsrechner
- Methode: Geschichtskarten lesen (6 Schritte, Redemittel-Baukasten, Operatoren)
- Prüfungstraining: Hausaufgaben-Tabelle, Aufgaben aus dem Buch, großer Test
- Vokabular Deutsch → Spanisch mit Karteikarten
- Erklärfilm (ca. 6 Minuten): Deutsch gesprochen mit spanischen Untertiteln, und umgekehrt; Text zum Anklicken

Deutsch ist die Prüfungssprache; jeder Abschnitt hat einen ES-Knopf für die Erklärung auf Spanisch.
Schwierige Wörter sind unterstrichen und erklären sich beim Antippen.

## Technik

Statische Seite ohne Build: `index.html`, `css/style.css`, `js/data.js` (alle Inhalte),
`js/maps.js` (SVG-Karten), `js/app.js` (Logik). Fortschritt und Notizen bleiben im `localStorage`.

Lokal testen:

```
python3 -m http.server 8765
```

und `http://127.0.0.1:8765/` öffnen.

## Film neu erzeugen

Der Film wird aus SVG-Einzelbildern und der macOS-Sprachausgabe gebaut (braucht `say`, `rsvg-convert`, `ffmpeg`):

```
python3 film/build.py --lang de --preview   # ein Bild pro Szene zur Kontrolle
python3 film/build.py --lang de             # Anna (Deutsch) + spanische Untertitel
python3 film/build.py --lang es             # Paulina (Spanisch) + deutsche Untertitel
python3 film/export_script.py               # film/script.js für den Text zum Film
```

Drehbuch und Szenen stehen in `film/build.py`.
