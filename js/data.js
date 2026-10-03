/* =====================================================================
   INHALT / CONTENIDO
   Alle Texte der Lern-Seite. Deutsch = Prüfungssprache, Spanisch = Hilfe.
   Markierung im deutschen Text:  [[furt]]  oder  [[furt|an der Furt]]
   -> Wort bekommt eine Erklärung (siehe GLOSSAR unten).
   ===================================================================== */

/* ---------- GLOSSAR / VOCABULARIO ---------- */
const GLOSSAR = {
  // Geschichte: Rom
  sage:        { de: "die Sage", es: "la leyenda", def: "Eine alte Erzählung, die weitergegeben wurde. Sie erklärt etwas, ist aber nicht bewiesen.", ex: "Die Sage erzählt, dass Romulus Rom gründete.", tag: "rom" },
  wissenschaft:{ de: "die Wissenschaft", es: "la ciencia", def: "Wissen, das man mit Beweisen (Funden, Quellen) prüfen kann.", ex: "Die Wissenschaft sagt: Rom entstand langsam aus Dörfern.", tag: "rom" },
  voraussetzung:{ de: "die Voraussetzung", es: "la condición, el requisito", def: "Etwas, das vorher da sein muss, damit etwas anderes passieren kann.", ex: "Der Tiber war eine Voraussetzung für den Handel.", tag: "methode" },
  gegebenheiten:{ de: "die (natürlichen) Gegebenheiten", es: "las condiciones naturales", def: "Die Natur eines Ortes: Fluss, Hügel, Boden, Klima.", ex: "Die natürlichen Gegebenheiten in Rom waren günstig.", tag: "rom" },
  furt:        { de: "die Furt", es: "el vado", def: "Eine flache Stelle im Fluss. Dort kann man zu Fuß oder mit dem Wagen hindurchgehen.", ex: "An der Tiberfurt entstand ein Markt.", tag: "rom" },
  sumpf:       { de: "der Sumpf (die Sümpfe)", es: "el pantano", def: "Nasses, weiches Land, in dem man nicht bauen kann.", ex: "Die Sümpfe zwischen den Hügeln wurden trockengelegt.", tag: "rom" },
  trockenlegen:{ de: "trockenlegen", es: "drenar, desecar", def: "Das Wasser aus einem Sumpf ableiten, damit der Boden trocken wird.", ex: "Die Römer legten die Sümpfe Stück für Stück trocken.", tag: "rom" },
  forum:       { de: "das Forum", es: "el foro (plaza central)", def: "Der große öffentliche Platz in der Mitte der Stadt. Hier trafen sich die Bürger, hier war der Markt.", ex: "Das Forum entstand auf dem trockengelegten Sumpf.", tag: "rom" },
  feldherr:    { de: "der Feldherr", es: "el general, jefe del ejército", def: "Der Anführer der Armee.", ex: "Der König war auch Feldherr.", tag: "rom" },
  priester:    { de: "der Priester", es: "el sacerdote", def: "Ein Mann, der die Opfer und Feste für die Götter leitet.", ex: "Der König war der oberste Priester.", tag: "rom" },
  adlige:      { de: "die Adligen (der Adlige)", es: "los nobles", def: "Reiche, mächtige Familien mit besonderen Rechten.", ex: "Adlige Etrusker übernahmen das Amt des Königs.", tag: "rom" },
  herrschaft:  { de: "die Herrschaft", es: "el dominio, el gobierno", def: "Die Macht, über Menschen und ein Gebiet zu bestimmen.", ex: "Die Herrschaft in Rom hatte zuerst ein König.", tag: "rom" },
  gesellschaft:{ de: "die Gesellschaft", es: "la sociedad", def: "Alle Menschen, die zusammen in einem Ort oder Staat leben, und wie sie geordnet sind.", ex: "In der Gesellschaft Roms waren die meisten Menschen Bauern.", tag: "rom" },
  wirtschaft:  { de: "die Wirtschaft", es: "la economía", def: "Alles, was mit Arbeit, Handel und Geld zu tun hat.", ex: "Die Wirtschaft Roms lebte vom Salzhandel.", tag: "rom" },
  einwanderer: { de: "der Einwanderer", es: "el inmigrante", def: "Ein Mensch, der aus einem anderen Gebiet kommt und sich neu ansiedelt.", ex: "Die Latiner waren Einwanderer.", tag: "rom" },
  siedlung:    { de: "die Siedlung / sich ansiedeln", es: "el asentamiento / establecerse", def: "Ein Ort, an dem Menschen Häuser bauen und bleiben.", ex: "Die Siedlungen der Latiner lagen auf den Hügeln.", tag: "rom" },
  handel:      { de: "der Handel / Handel treiben", es: "el comercio / comerciar", def: "Waren kaufen und verkaufen.", ex: "Rom trieb Handel mit Salz.", tag: "rom" },
  rohstoffe:   { de: "die Rohstoffe", es: "las materias primas", def: "Dinge aus der Natur, die man braucht oder verkauft: Salz, Holz, Metall.", ex: "Salz war ein wichtiger Rohstoff.", tag: "rom" },
  ackerboden:  { de: "der Ackerboden / der Ackerbau", es: "la tierra de cultivo / la agricultura", def: "Fruchtbarer Boden, auf dem man Getreide und Gemüse anbaut.", ex: "Um Rom gab es fruchtbare Ackerböden.", tag: "rom" },
  fruchtbar:   { de: "fruchtbar", es: "fértil", def: "Ein Boden, auf dem Pflanzen gut wachsen.", ex: "Der Boden am Tiber war fruchtbar.", tag: "rom" },
  nahtstelle:  { de: "die Nahtstelle", es: "el punto de unión, la frontera entre dos zonas", def: "Die Stelle, an der zwei Gebiete zusammentreffen.", ex: "Rom lag an der Nahtstelle zwischen Etruskern und Italikern.", tag: "rom" },
  stadtstaat:  { de: "der Stadtstaat", es: "la ciudad-estado", def: "Eine Stadt, die ein eigener kleiner Staat ist, mit eigener Regierung.", ex: "Die griechischen Städte in Süditalien waren Stadtstaaten.", tag: "rom" },
  kolonie:     { de: "die Kolonie", es: "la colonia", def: "Eine neue Stadt, die Menschen weit weg von ihrer Heimat gründen.", ex: "Neapolis war eine griechische Kolonie.", tag: "rom" },
  verbuendete: { de: "die Verbündeten", es: "los aliados", def: "Gruppen, die zusammenhalten und sich gegenseitig helfen.", ex: "Die Etruskerstädte waren gleichberechtigte Verbündete.", tag: "rom" },
  konkurrenten:{ de: "die Konkurrenten", es: "los rivales, los competidores", def: "Gruppen, die um dasselbe kämpfen (Land, Handel, Macht).", ex: "Die Latiner waren Nachbarn und Konkurrenten Roms.", tag: "rom" },
  gruendung:   { de: "die Gründung / gründen", es: "la fundación / fundar", def: "Der Anfang einer Stadt oder eines Staates.", ex: "Die Gründung Roms soll 753 v. Chr. gewesen sein.", tag: "rom" },
  entmachten:  { de: "entmachten", es: "quitar el poder, destituir", def: "Jemandem die Macht wegnehmen.", ex: "Amulius hatte seinen Bruder entmachtet.", tag: "rom" },
  vertreiben:  { de: "vertreiben", es: "expulsar", def: "Jemanden zwingen wegzugehen.", ex: "Der König wurde vertrieben.", tag: "rom" },
  aussetzen:   { de: "aussetzen", es: "abandonar (a un niño)", def: "Ein Kind irgendwo zurücklassen, damit es nicht mehr zur Familie gehört.", ex: "Die Zwillinge wurden am Tiber ausgesetzt.", tag: "rom" },
  saeugen:     { de: "säugen", es: "amamantar", def: "Ein Tier oder eine Mutter gibt einem Baby Milch.", ex: "Eine Wölfin säugte Romulus und Remus.", tag: "rom" },
  verspotten:  { de: "verspotten", es: "burlarse de", def: "Sich über jemanden lustig machen.", ex: "Remus verspottete Romulus und sprang über die Mauer.", tag: "rom" },
  nachfahren:  { de: "die Nachfahren", es: "los descendientes", def: "Kinder, Enkel, Urenkel ... einer Person.", ex: "Romulus und Remus waren Nachfahren des Aeneas.", tag: "rom" },
  kriegsgott:  { de: "der Kriegsgott", es: "el dios de la guerra", def: "Der Gott des Krieges. Bei den Römern: Mars.", ex: "Mars war der Kriegsgott.", tag: "rom" },
  thron:       { de: "der Thron / streitig machen", es: "el trono / disputar", def: "Der Sitz des Königs = die Macht. 'Den Thron streitig machen' = um die Macht kämpfen.", ex: "Amulius hatte Angst um seinen Thron.", tag: "rom" },
  hirte:       { de: "der Hirte", es: "el pastor", def: "Ein Mann, der Schafe oder Ziegen hütet.", ex: "Ein Hirte fand die Zwillinge.", tag: "rom" },
  woelfin:     { de: "die Wölfin", es: "la loba", def: "Ein weiblicher Wolf.", ex: "Die Wölfin ist das Symbol Roms.", tag: "rom" },
  muenze:      { de: "die Münze / prägen", es: "la moneda / acuñar", def: "Ein Geldstück aus Metall. Prägen = das Bild auf die Münze drücken.", ex: "Die Römer prägten die Wölfin auf ihre Münzen.", tag: "rom" },
  tonurne:     { de: "die Tonurne", es: "la urna de barro", def: "Ein Gefäß aus gebranntem Ton. Darin bewahrte man die Asche von Toten auf.", ex: "Die Tonurne sieht aus wie eine Hütte.", tag: "rom" },
  huette:      { de: "die Hütte", es: "la cabaña, la choza", def: "Ein einfaches, kleines Haus aus Holz, Lehm und Stroh.", ex: "Die ersten Römer lebten in Hütten.", tag: "rom" },
  mauer:       { de: "die Mauer", es: "la muralla", def: "Eine hohe Wand aus Stein um eine Stadt. Sie schützt die Stadt.", ex: "Romulus baute eine Mauer um die Stadt.", tag: "rom" },
  weltreich:   { de: "das Weltreich", es: "el imperio mundial", def: "Ein riesiger Staat, der viele Länder und Völker beherrscht.", ex: "Aus dem Dorf wurde ein Weltreich.", tag: "rom" },
  jungsteinzeit:{ de: "die Jungsteinzeit", es: "el Neolítico", def: "Die Zeit, in der die Menschen begannen, Ackerbau zu treiben und in Dörfern zu leben (ab ca. 10.000 v. Chr.).", ex: "Seit der Jungsteinzeit suchten Menschen günstige Orte für Siedlungen.", tag: "rom" },
  schiffsverkehr:{ de: "der Schiffsverkehr", es: "el tráfico de barcos, la navegación", def: "Schiffe fahren auf einem Fluss oder Meer und bringen Waren.", ex: "Der Tiber war für den Schiffsverkehr geeignet.", tag: "rom" },
  landesinnere:{ de: "das Landesinnere", es: "el interior del país", def: "Das Gebiet weit weg von der Küste.", ex: "Waren kamen vom Meer ins Landesinnere.", tag: "rom" },
  umland:      { de: "das Umland / das umliegende Land", es: "los alrededores, la región cercana", def: "Das Land rund um eine Stadt.", ex: "Der König regierte die Stadt und das Umland.", tag: "rom" },
  buerger:     { de: "der Bürger", es: "el ciudadano", def: "Ein Mensch, der zu einer Stadt gehört und dort Rechte hat.", ex: "Die Bürger Roms trafen sich auf dem Forum.", tag: "rom" },
  tibermuendung:{ de: "die Tibermündung", es: "la desembocadura del Tíber", def: "Die Stelle, wo der Fluss Tiber ins Meer fließt (heute Ostia).", ex: "Von Neapel bis zur Tibermündung sind es etwa 200 km.", tag: "karte" },
  kleinasien:  { de: "Kleinasien", es: "Asia Menor (hoy Turquía)", def: "Das Gebiet der heutigen Türkei.", ex: "Ein Teil der Etrusker stammte wohl aus Kleinasien.", tag: "rom" },
  // Methode / Karten
  geschichtskarte:{ de: "die Geschichtskarte", es: "el mapa histórico", def: "Eine Karte, die zeigt, wie ein Gebiet in der Vergangenheit war.", ex: "Die Geschichtskarte zeigt die Völker Italiens im 6. Jh. v. Chr.", tag: "methode" },
  legende:     { de: "die Legende (Karte)", es: "la leyenda (del mapa)", def: "Der kleine Kasten auf der Karte, der die Farben und Zeichen erklärt.", ex: "In der Legende steht: Orange = Etrusker.", tag: "methode" },
  massstab:    { de: "der Maßstab / die Maßstabsleiste", es: "la escala (del mapa)", def: "Zeigt, wie viele Kilometer in Wirklichkeit ein Stück auf der Karte ist.", ex: "Mit der Maßstabsleiste kann man Entfernungen messen.", tag: "methode" },
  zeichensprache:{ de: "die Zeichensprache", es: "el lenguaje de signos (símbolos del mapa)", def: "Alle Farben, Linien, Punkte und Symbole, die eine Karte benutzt.", ex: "Um eine Karte zu verstehen, muss man ihre Zeichensprache kennen.", tag: "methode" },
  zeitraum:    { de: "der Zeitraum / der Zeitpunkt", es: "el período / el momento", def: "Zeitraum = eine Zeitspanne (600–500 v. Chr.). Zeitpunkt = ein bestimmter Moment (753 v. Chr.).", ex: "Die Karte zeigt den Zeitraum von 600 bis 500 v. Chr.", tag: "methode" },
  ausschnitt:  { de: "der Ausschnitt", es: "el recorte, la sección", def: "Der Teil der Welt, den die Karte zeigt.", ex: "Der Ausschnitt der Karte zeigt Mittelitalien.", tag: "methode" },
  leitfrage:   { de: "die Leitfrage", es: "la pregunta guía", def: "Die Hauptfrage, die man mit der Karte beantworten will.", ex: "Leitfrage: Wie entsteht die römische Kultur?", tag: "methode" },
  gesamtaussage:{ de: "die Gesamtaussage", es: "el mensaje principal", def: "Das Wichtigste, was die Karte insgesamt sagt.", ex: "Die Gesamtaussage: Italien war in viele Gebiete aufgeteilt.", tag: "methode" },
  schlussfolgerung:{ de: "die Schlussfolgerung", es: "la conclusión", def: "Was man aus den Informationen logisch ableiten kann.", ex: "Schlussfolgerung: Rom hatte mächtige Nachbarn.", tag: "methode" },
  vermutung:   { de: "die Vermutung / vermuten", es: "la suposición / suponer", def: "Etwas, das wahrscheinlich ist, aber nicht bewiesen.", ex: "Wir vermuten, dass der Name Rom etruskisch ist.", tag: "methode" },
  stichpunkte: { de: "die Stichpunkte", es: "las palabras clave, apuntes breves", def: "Kurze Notizen ohne ganze Sätze.", ex: "Schreibe die Informationen in Stichpunkten.", tag: "methode" },
  deuten:      { de: "deuten", es: "interpretar", def: "Erklären, was etwas bedeutet.", ex: "Schritt 3: die Karte deuten.", tag: "operator" },
  untersuchen: { de: "untersuchen", es: "examinar, analizar", def: "Etwas genau anschauen und die Einzelheiten herausfinden.", ex: "Schritt 2: die Karte untersuchen.", tag: "operator" },
  beschreiben: { de: "beschreiben", es: "describir", def: "Sagen, was man sieht. Ohne Erklärung, ohne Meinung. (AFB I)", ex: "Beschreibe die Lage Roms.", tag: "operator" },
  erlaeutern:  { de: "erläutern", es: "explicar con detalle", def: "Etwas genau erklären, mit Beispielen und Gründen. (AFB II)", ex: "Erläutere die Vorteile der Lage.", tag: "operator" },
  vergleichen: { de: "vergleichen", es: "comparar", def: "Gemeinsamkeiten und Unterschiede finden. (AFB II)", ex: "Vergleiche die Sage mit der Wissenschaft.", tag: "operator" },
  nennen:      { de: "nennen", es: "nombrar, mencionar", def: "Kurz aufzählen, ohne Erklärung. (AFB I)", ex: "Nenne den Zeitraum der Karte.", tag: "operator" },
  zusammenfassen:{ de: "zusammenfassen", es: "resumir", def: "Das Wichtigste kurz in eigenen Worten sagen. (AFB I/II)", ex: "Fasse die Aussagen der Karte zusammen.", tag: "operator" },
  herausarbeiten:{ de: "herausarbeiten", es: "extraer, identificar", def: "Die wichtigen Informationen aus einem Text oder Bild holen. (AFB II)", ex: "Arbeite die Voraussetzungen heraus.", tag: "operator" },
  beurteilen:  { de: "beurteilen", es: "valorar, juzgar", def: "Eine eigene Meinung mit Gründen sagen. (AFB III)", ex: "Beurteile die Lage Roms.", tag: "operator" },
  afb:         { de: "AFB (Anforderungsbereich)", es: "nivel de exigencia de la tarea", def: "AFB I = wiedergeben (nennen, beschreiben). AFB II = erklären (erläutern, vergleichen). AFB III = bewerten (beurteilen, Stellung nehmen).", ex: "Aufgabe 3 ist AFB III.", tag: "operator" },
  vt:          { de: "VT (Verfassertext)", es: "texto del autor (del libro)", def: "Der Text, den die Autoren des Schulbuchs geschrieben haben. Er erklärt die Geschichte aus heutiger Sicht.", ex: "Lies den VT 'Stadt und Land'.", tag: "methode" },
  quelle:      { de: "Q (Quelle)", es: "fuente histórica", def: "Etwas aus der Vergangenheit selbst: ein Gegenstand, ein Bild, ein Text von damals.", ex: "Q2 ist eine Münze aus dem Jahr 137 v. Chr.", tag: "methode" },
  darstellung: { de: "D (Darstellung)", es: "representación (hecha hoy)", def: "Ein Bild, eine Karte oder ein Text, der heute gemacht wurde, um die Vergangenheit zu zeigen.", ex: "D1 ist eine Rekonstruktionszeichnung.", tag: "methode" },
  rekonstruktion:{ de: "die Rekonstruktionszeichnung", es: "el dibujo de reconstrucción", def: "Eine Zeichnung, die zeigt, wie ein Ort früher wahrscheinlich aussah.", ex: "D1 ist eine Rekonstruktionszeichnung der Landschaft Roms.", tag: "methode" },
  vchr:        { de: "v. Chr. / n. Chr.", es: "a. C. / d. C.", def: "vor Christus / nach Christus. Achtung: Bei v. Chr. zählen die Jahre rückwärts! 753 v. Chr. ist früher als 500 v. Chr.", ex: "Rom wurde 753 v. Chr. gegründet.", tag: "methode" },
  jahrhundert: { de: "das Jahrhundert (Jh.)", es: "el siglo", def: "100 Jahre. Das 6. Jh. v. Chr. = die Jahre 600 bis 501 v. Chr.", ex: "Die Karte zeigt das 6. Jahrhundert v. Chr.", tag: "methode" },
  redemittel:  { de: "die Redemittel", es: "expresiones útiles, frases modelo", def: "Fertige Satzanfänge, die man beim Schreiben benutzen kann.", ex: "Redemittel: 'Die Karte mit dem Titel … zeigt …'", tag: "methode" },
  durchschnittsgeschwindigkeit:{ de: "die Durchschnittsgeschwindigkeit", es: "la velocidad media", def: "Wie schnell man im Durchschnitt ist, z. B. 10 km in einer Stunde.", ex: "Das Schiff hatte eine Durchschnittsgeschwindigkeit von 10 km/h.", tag: "karte" },
  wegzeit:     { de: "die Wegzeit", es: "el tiempo de viaje", def: "Wie lange man für einen Weg braucht. Wegzeit = Entfernung : Geschwindigkeit.", ex: "Die Wegzeit von Veji nach Rom war ca. 4 Stunden.", tag: "karte" },
  bedrohung:   { de: "die Bedrohung", es: "la amenaza", def: "Eine Gefahr.", ex: "Die Etrusker waren eine Bedrohung für Rom.", tag: "karte" },
  ausdehnung:  { de: "die Ausdehnung", es: "la extensión", def: "Wie groß ein Gebiet ist.", ex: "Die Nord-Süd-Ausdehnung betrug 500 km.", tag: "karte" },
  gleichberechtigt:{ de: "gleichberechtigt", es: "con los mismos derechos", def: "Alle haben die gleichen Rechte, keiner ist der Chef.", ex: "Die Etruskerstädte waren gleichberechtigte Verbündete.", tag: "rom" },
  laendlich:   { de: "ländlich", es: "rural", def: "Auf dem Land, ohne große Städte.", ex: "Das Gebiet der Italiker war ländlich geprägt.", tag: "rom" },
  gemeinsamkeiten:{ de: "die Gemeinsamkeiten / die Unterschiede", es: "las similitudes / las diferencias", def: "Was gleich ist / was anders ist.", ex: "Finde Gemeinsamkeiten und Unterschiede.", tag: "methode" },
  ueberliefern:{ de: "überliefern", es: "transmitir (una historia)", def: "Eine Geschichte von Generation zu Generation weitergeben.", ex: "Livius hat die Sage überliefert.", tag: "rom" },
  entstehung:  { de: "die Entstehung / entstehen", es: "el origen, el surgimiento / surgir", def: "Wie etwas anfängt und sich bildet.", ex: "Die Entstehung Roms begann auf dem Dorf.", tag: "rom" },
  guenstig:    { de: "günstig", es: "favorable, ventajoso", def: "Gut, vorteilhaft.", ex: "Rom lag an einem günstigen Ort.", tag: "rom" },
};

/* ---------- ZEITLEISTE ---------- */
const TIMELINE = [
  { year: -1000, label: "um 1000 v. Chr.", de: "Latiner siedeln auf den Hügeln am Tiber. Einfache Hütten aus Holz und Lehm.", es: "Los latinos se asientan en las colinas junto al Tíber. Cabañas sencillas." },
  { year: -753,  label: "753 v. Chr.",     de: "Laut Sage gründet Romulus die Stadt Rom.", es: "Según la leyenda, Rómulo funda Roma." },
  { year: -700,  label: "um 700 v. Chr.",  de: "Die Etrusker kommen. Die Dörfer wachsen zu einer Stadt zusammen.", es: "Llegan los etruscos. Las aldeas se unen en una ciudad." },
  { year: -600,  label: "600–500 v. Chr.", de: "Etruskische Könige. Mauer, Forum, Handel. Italien ist in viele Gebiete geteilt.", es: "Reyes etruscos. Muralla, foro, comercio. Italia está dividida en muchas zonas." },
  { year: -500,  label: "um 500 v. Chr.",  de: "Rom ist eine der größten Städte Italiens.", es: "Roma es una de las ciudades más grandes de Italia." },
  { year: 400,   label: "5. Jh. n. Chr.",  de: "Ende des Römischen Weltreichs (Ende des Kapitels 5).", es: "Fin del Imperio romano (fin del capítulo 5)." },
];

/* ---------- KARTE: DIE LANDSCHAFT ROMS (D1) ---------- */
const ROME_SPOTS = [
  { id: "tiber", name: "der Tiber", x: 300, y: 150, de: "Der Fluss. Schiffe bringen Waren vom Mittelmeer ins [[landesinnere|Landesinnere]]. Der Tiber ist auch die Grenze zwischen Etrurien und Latium.", es: "El río. Los barcos traen mercancías del Mediterráneo hacia el interior. El Tíber es también la frontera entre Etruria y Lacio." },
  { id: "insel", name: "die Tiberinsel", x: 395, y: 262, de: "Eine kleine Insel im Fluss. Hier ist der Fluss schmal und flach: der beste Platz für einen Übergang.", es: "Una pequeña isla en el río. Aquí el río es estrecho y poco profundo: el mejor lugar para cruzar." },
  { id: "furt", name: "die Furt", x: 440, y: 300, de: "Die [[furt|Furt]] ist eine flache Stelle. Händler und Reisende gehen hier durch den Fluss. Darum entstand hier früh ein Markt.", es: "El vado es un lugar poco profundo. Comerciantes y viajeros cruzan el río aquí. Por eso surgió pronto un mercado." },
  { id: "kapitol", name: "das Kapitol", x: 505, y: 195, de: "Ein Hügel mit steilen Seiten. Er bietet Schutz vor Feinden und vor Hochwasser.", es: "Una colina con laderas empinadas. Ofrece protección contra enemigos e inundaciones." },
  { id: "palatin", name: "der Palatin", x: 560, y: 330, de: "Der Hügel, auf dem die ersten [[huette|Hütten]] standen. Laut [[sage|Sage]] baute Romulus hier die erste Mauer.", es: "La colina donde estaban las primeras cabañas. Según la leyenda, Rómulo construyó aquí la primera muralla." },
  { id: "sumpf", name: "Sumpf → Forum", x: 540, y: 262, de: "Zwischen den Hügeln lag ein [[sumpf|Sumpf]]. Die Römer legten ihn [[trockenlegen|trocken]]. So entstand das [[forum|Forum]], der Hauptplatz.", es: "Entre las colinas había un pantano. Los romanos lo drenaron. Así surgió el Foro, la plaza principal." },
  { id: "salz", name: "die Salzstraße", x: 190, y: 330, de: "Am Meer gewann man Salz. Über die Salzstraße brachte man es ins Landesinnere. Salz war sehr wertvoll (zum Haltbarmachen von Fleisch). Rom verdiente am Salzhandel.", es: "Junto al mar se obtenía sal. Por la vía de la sal se llevaba al interior. La sal era muy valiosa (para conservar carne). Roma ganaba con el comercio de sal." },
  { id: "meer", name: "ca. 15 km zum Mittelmeer", x: 95, y: 420, de: "Das Meer ist nah: gut für den Handel. Aber nicht zu nah: Schutz vor Piraten und Angriffen vom Meer.", es: "El mar está cerca: bueno para el comercio. Pero no demasiado cerca: protección contra piratas y ataques desde el mar." },
  { id: "etrurien", name: "Etrurien", x: 150, y: 90, de: "Nördlich des Tibers: das Land der Etrusker. Reiche Städte wie Veji, nur ca. 16 km von Rom entfernt. Nachbar, Lehrer und Gefahr zugleich.", es: "Al norte del Tíber: la tierra de los etruscos. Ciudades ricas como Veyes, a solo 16 km de Roma. Vecino, maestro y peligro a la vez." },
  { id: "latium", name: "Latium", x: 690, y: 110, de: "Südlich und östlich des Tibers: das Land der Latiner. Rom ist eine latinische Stadt.", es: "Al sur y al este del Tíber: la tierra de los latinos. Roma es una ciudad latina." },
  { id: "boden", name: "fruchtbarer Boden", x: 660, y: 420, de: "[[fruchtbar|Fruchtbarer]] Boden in den Ebenen: gut für [[ackerboden|Ackerbau]]. Die Bauern können viele Menschen ernähren.", es: "Suelo fértil en las llanuras: bueno para la agricultura. Los campesinos pueden alimentar a mucha gente." },
  { id: "klima", name: "mildes Klima", x: 720, y: 40, de: "Nicht zu heiß, nicht zu kalt, genug Regen. Gut für Menschen, Tiere und Pflanzen.", es: "Ni demasiado calor ni demasiado frío, suficiente lluvia. Bueno para personas, animales y plantas." },
];

/* ---------- KARTE: ITALIEN ---------- */
// Koordinaten: [Längengrad, Breitengrad]
const ITALY = {
  bounds: { lonMin: 6.8, lonMax: 19.2, latMin: 36.4, latMax: 46.6 },
  land: [
    [6.8,46.6],[19.2,46.6],[19.2,42.3],[18.1,42.65],[17.2,43.0],[16.25,43.5],[15.2,44.1],[14.45,45.33],[13.85,44.87],[13.5,45.5],[13.77,45.65],[12.35,45.43],[12.5,44.95],[12.3,44.42],[12.6,44.06],[13.5,43.62],[14.2,42.47],[15.0,42.0],[16.2,41.88],[15.9,41.6],[16.85,41.13],[17.95,40.65],[18.5,40.15],[18.35,39.8],[18.0,40.05],[17.25,40.47],[16.8,40.37],[16.5,39.75],[17.15,39.1],[17.1,38.9],[16.05,37.92],[15.65,38.1],[15.65,38.65],[16.0,39.4],[15.6,40.0],[14.8,40.65],[14.4,40.6],[14.25,40.85],[13.6,41.2],[12.6,41.45],[12.28,41.73],[11.8,42.1],[10.9,42.7],[10.5,42.95],[10.3,43.5],[9.8,44.1],[8.9,44.4],[7.6,43.8],[7.1,43.6],[6.8,43.6]
  ],
  islands: [
    [[12.45,38.0],[12.75,38.2],[13.35,38.2],[14.2,38.0],[15.25,38.2],[15.6,38.25],[15.1,37.5],[15.1,36.7],[14.5,36.75],[12.9,37.55]],
    [[8.4,41.0],[9.7,40.9],[9.7,39.2],[9.1,39.1],[8.4,38.9],[8.4,40.3],[8.2,40.8]],
    [[8.6,43.0],[9.45,42.7],[9.4,41.6],[9.1,41.4],[8.7,41.9],[8.6,42.5]]
  ],
  regions: [
    { group: "italiker", name: "Italiker", pts: [[12.2,43.6],[13.2,43.7],[13.6,43.0],[14.3,42.4],[15.0,42.0],[16.2,41.85],[16.0,41.55],[17.0,41.1],[18.4,40.0],[18.0,39.9],[17.3,40.5],[16.8,40.5],[16.5,39.8],[16.3,39.5],[15.9,39.6],[15.7,40.0],[15.3,40.2],[14.8,40.6],[14.4,40.75],[14.2,41.0],[13.6,41.25],[12.8,41.4],[12.3,41.7],[12.4,41.95],[12.5,42.4],[12.6,42.9],[12.3,43.4]] },
    { group: "etrusker", name: "Etrusker", pts: [[10.3,43.7],[10.8,44.0],[11.6,43.9],[12.3,43.4],[12.6,42.9],[12.5,42.4],[12.4,41.95],[12.1,41.9],[11.7,42.1],[11.0,42.6],[10.5,43.0]] },
    { group: "etrusker", name: "Etrusker (Poebene)", pts: [[10.6,44.9],[11.0,45.1],[12.1,44.9],[12.2,44.5],[11.3,44.3],[10.7,44.5]] },
    { group: "etrusker", name: "Etrusker (Kampanien)", pts: [[13.9,41.35],[14.6,41.35],[14.6,40.95],[14.1,40.95]] },
    { group: "griechen", name: "Griechen", pts: [[13.9,40.95],[14.5,40.95],[14.5,40.6],[14.0,40.75]] },
    { group: "griechen", name: "Griechen", pts: [[16.4,39.6],[16.9,40.5],[17.5,40.6],[17.4,40.3],[16.8,40.2],[16.6,39.7]] },
    { group: "griechen", name: "Griechen", pts: [[17.2,39.2],[17.0,38.8],[16.1,37.9],[15.6,38.0],[15.7,38.4],[16.5,38.8],[17.0,39.2]] },
    { group: "griechen", name: "Griechen", pts: [[15.3,37.9],[15.3,36.7],[14.6,36.75],[14.9,37.5]] },
    { group: "griechen", name: "Griechen", pts: [[12.9,37.45],[14.5,36.7],[14.3,37.2],[13.3,37.55]] },
  ],
  labels: [
    { text: "Etrusker", lon: 10.9, lat: 42.75, group: "etrusker", big: true },
    { text: "Umbrer", lon: 13.05, lat: 43.15, group: "italiker" },
    { text: "Sabiner", lon: 13.15, lat: 42.4, group: "italiker" },
    { text: "Aequer", lon: 13.55, lat: 42.05, group: "italiker" },
    { text: "Latiner", lon: 12.8, lat: 41.62, group: "italiker" },
    { text: "Volsker", lon: 13.45, lat: 41.35, group: "italiker" },
    { text: "Samniten", lon: 14.4, lat: 41.6, group: "italiker" },
    { text: "Osker", lon: 15.6, lat: 40.6, group: "italiker" },
    { text: "Messapier", lon: 18.0, lat: 40.78, group: "italiker" },
    { text: "Ligurer", lon: 8.6, lat: 44.75, group: "andere" },
    { text: "Veneter", lon: 12.0, lat: 45.7, group: "andere" },
    { text: "Illyrer", lon: 16.6, lat: 44.2, group: "andere" },
    { text: "Griechen", lon: 16.6, lat: 38.3, group: "griechen", big: true },
    { text: "Tyrrhenisches Meer", lon: 12.3, lat: 39.6, group: "meer" },
    { text: "Adriatisches Meer", lon: 15.2, lat: 43.4, group: "meer", rotate: -42 },
    { text: "Ligurisches Meer", lon: 8.9, lat: 43.15, group: "meer" },
    { text: "Golf von Tarent", lon: 17.35, lat: 39.8, group: "meer" },
    { text: "Korsika", lon: 9.0, lat: 42.2, group: "insel" },
    { text: "Sardinien", lon: 9.0, lat: 40.0, group: "insel" },
    { text: "Sizilien", lon: 14.0, lat: 37.5, group: "insel" },
  ],
  cities: [
    { id: "rom", name: "Rom", lon: 12.49, lat: 41.89, group: "latiner", de: "Rom: Stadt der Latiner am Tiber, an der [[nahtstelle|Nahtstelle]] zwischen Etruskern und Italikern. Um 500 v. Chr. eine der größten Städte Italiens.", es: "Roma: ciudad de los latinos junto al Tíber, en el punto de unión entre etruscos e itálicos." },
    { id: "ostia", name: "Tibermündung", lon: 12.28, lat: 41.73, group: "ort", de: "Hier fließt der Tiber ins Meer. Hier gab es Salz. Ca. 15 km von Rom.", es: "Aquí el Tíber desemboca en el mar. Aquí había sal. A unos 15 km de Roma." },
    { id: "veji", name: "Veji", lon: 12.39, lat: 42.02, group: "etrusker", de: "Etruskerstadt, nur ca. 16 km nördlich von Rom. Der große Konkurrent Roms. Rom eroberte Veji erst 396 v. Chr.", es: "Ciudad etrusca a solo 16 km al norte de Roma. El gran rival de Roma. Roma conquistó Veyes en 396 a. C." },
    { id: "caere", name: "Caere", lon: 12.10, lat: 42.00, group: "etrusker", de: "Etruskische Hafenstadt nahe der Küste.", es: "Ciudad portuaria etrusca cerca de la costa." },
    { id: "tarquinii", name: "Tarquinii", lon: 11.76, lat: 42.25, group: "etrusker", de: "Eine der wichtigsten Etruskerstädte. Die letzten Könige Roms (Tarquinius) kamen angeblich von hier.", es: "Una de las ciudades etruscas más importantes. Los últimos reyes de Roma (Tarquinio) venían supuestamente de aquí." },
    { id: "volsinii", name: "Volsinii", lon: 11.99, lat: 42.65, group: "etrusker", de: "Etruskerstadt mit einem wichtigen Heiligtum.", es: "Ciudad etrusca con un santuario importante." },
    { id: "clusium", name: "Clusium", lon: 11.95, lat: 43.06, group: "etrusker", de: "Etruskerstadt im Landesinneren.", es: "Ciudad etrusca del interior." },
    { id: "aritim", name: "Aritim", lon: 11.88, lat: 43.46, group: "etrusker", de: "Etruskerstadt im Norden Etruriens (heute Arezzo).", es: "Ciudad etrusca en el norte de Etruria (hoy Arezzo)." },
    { id: "felsina", name: "Felsina", lon: 11.34, lat: 44.49, group: "etrusker", de: "Etruskerstadt in der Poebene (heute Bologna).", es: "Ciudad etrusca en la llanura del Po (hoy Bolonia)." },
    { id: "kyme", name: "Kyme", lon: 14.05, lat: 40.85, group: "griechen", de: "Die nördlichste Griechenstadt in Italien. Gegründet um 750 v. Chr. Über Kyme kam das Alphabet zu den Etruskern und Römern.", es: "La ciudad griega más al norte de Italia. Fundada hacia 750 a. C. A través de Cumas llegó el alfabeto a etruscos y romanos." },
    { id: "neapolis", name: "Neapolis", lon: 14.25, lat: 40.85, group: "griechen", de: "'Neue Stadt' (griechisch). Heute Neapel. Griechische Handelsstadt am Meer.", es: "'Ciudad nueva' (en griego). Hoy Nápoles. Ciudad comercial griega junto al mar." },
    { id: "tarent", name: "Tarent", lon: 17.24, lat: 40.47, group: "griechen", de: "Reiche griechische Hafenstadt am Golf von Tarent.", es: "Rica ciudad portuaria griega en el golfo de Tarento." },
    { id: "metapont", name: "Metapont", lon: 16.82, lat: 40.38, group: "griechen", de: "Griechische Stadt am Golf von Tarent. Hier lebte der Mathematiker Pythagoras.", es: "Ciudad griega en el golfo de Tarento. Aquí vivió el matemático Pitágoras." },
    { id: "syrakus", name: "Syrakus", lon: 15.29, lat: 37.08, group: "griechen", de: "Die mächtigste Griechenstadt auf Sizilien.", es: "La ciudad griega más poderosa de Sicilia." },
    { id: "antipolis", name: "Antipolis", lon: 7.12, lat: 43.58, group: "griechen", de: "Griechische Kolonie an der Küste (heute Antibes, Frankreich).", es: "Colonia griega en la costa (hoy Antibes, Francia)." },
    { id: "tragurium", name: "Tragurium", lon: 16.25, lat: 43.52, group: "griechen", de: "Griechische Kolonie an der Ostküste der Adria (heute Trogir, Kroatien).", es: "Colonia griega en la costa este del Adriático (hoy Trogir, Croacia)." },
    { id: "epidaurus", name: "Epidaurus", lon: 18.21, lat: 42.58, group: "griechen", de: "Griechische Kolonie an der Adria (heute Cavtat, Kroatien).", es: "Colonia griega en el Adriático (hoy Cavtat, Croacia)." },
  ]
};

/* ---------- SAGE: STORY-KARTEN ---------- */
const SAGE_CARDS = [
  { icon: "ship", title: "1. Aeneas", de: "Alles beginnt mit dem Helden Aeneas. Er flieht aus Troja und kommt nach Latium. Romulus und Remus sind seine [[nachfahren|Nachfahren]].", es: "Todo empieza con el héroe Eneas. Huye de Troya y llega al Lacio. Rómulo y Remo son sus descendientes." },
  { icon: "crown", title: "2. Der böse Onkel", de: "Der König der Latiner wird von seinem Bruder Amulius [[entmachten|entmachtet]] und [[vertreiben|vertrieben]]. Amulius hat Angst: Die Enkel seines Bruders könnten ihm den [[thron|Thron streitig machen]].", es: "El rey de los latinos es destituido y expulsado por su hermano Amulio. Amulio tiene miedo: los nietos de su hermano podrían disputarle el trono." },
  { icon: "mars", title: "3. Zwillinge mit göttlichem Vater", de: "Rhea Silvia, die Tochter des Königs, bekommt Zwillinge: Romulus und Remus. Ihr Vater soll der [[kriegsgott|Kriegsgott]] Mars sein.", es: "Rea Silvia, la hija del rey, tiene gemelos: Rómulo y Remo. Su padre, dicen, es el dios de la guerra Marte." },
  { icon: "basket", title: "4. Ausgesetzt am Tiber", de: "Amulius befiehlt, die Babys zu töten. Doch der Diener bringt es nicht übers Herz. Er [[aussetzen|setzt]] sie in einem Korb am Fluss Tiber aus.", es: "Amulio ordena matar a los bebés. Pero el sirviente no tiene corazón para hacerlo. Los abandona en una cesta junto al río Tíber." },
  { icon: "wolf", title: "5. Die Wölfin", de: "Eine [[woelfin|Wölfin]] findet die Zwillinge und [[saeugen|säugt]] sie. Darum ist die Wölfin bis heute das Symbol Roms.", es: "Una loba encuentra a los gemelos y los amamanta. Por eso la loba es hasta hoy el símbolo de Roma." },
  { icon: "shepherd", title: "6. Der Hirte", de: "Ein [[hirte|Hirte]] findet die Kinder und zieht sie mit seiner Frau auf. Sie werden stark und mutig.", es: "Un pastor encuentra a los niños y los cría con su esposa. Se hacen fuertes y valientes." },
  { icon: "sword", title: "7. Rache", de: "Als Erwachsene töten die Brüder den unrechtmäßigen König Amulius. Dann wollen sie eine eigene Stadt gründen, dort, wo die Wölfin sie fand.", es: "De adultos, los hermanos matan al rey ilegítimo Amulio. Luego quieren fundar su propia ciudad, donde la loba los encontró." },
  { icon: "wall", title: "8. Streit um die Mauer", de: "Im Jahr 753 v. Chr. beginnt Romulus, eine [[mauer|Mauer]] zu bauen. Die Brüder streiten. Remus [[verspotten|verspottet]] Romulus und springt einfach über die niedrige Mauer.", es: "En el año 753 a. C. Rómulo empieza a construir una muralla. Los hermanos discuten. Remo se burla de Rómulo y salta por encima de la muralla baja." },
  { icon: "rome", title: "9. Rom", de: "Romulus bringt seinen Bruder um. Er wird der erste König und gibt der Stadt seinen Namen: Rom. (Erzählt nach Livius, 'Ab urbe condita'.)", es: "Rómulo mata a su hermano. Se convierte en el primer rey y da su nombre a la ciudad: Roma. (Contado según Livio, 'Ab urbe condita'.)" },
];

/* ---------- SORTIERSPIEL: SAGE ODER WISSENSCHAFT ---------- */
const SORT_GAME = {
  bins: [
    { id: "sage", label: "Nur die Sage (D2)", es: "Solo la leyenda" },
    { id: "beide", label: "Beide sagen das", es: "Ambas lo dicen" },
    { id: "wiss", label: "Nur die Wissenschaft (VT)", es: "Solo la ciencia" },
  ],
  cards: [
    { de: "Romulus gründet die Stadt genau im Jahr 753 v. Chr.", es: "Rómulo funda la ciudad exactamente en 753 a. C.", bin: "sage" },
    { de: "Die Stadt entsteht im 8. Jahrhundert v. Chr.", es: "La ciudad surge en el siglo VIII a. C.", bin: "beide" },
    { de: "Die Stadt liegt am Fluss Tiber.", es: "La ciudad está junto al río Tíber.", bin: "beide" },
    { de: "Eine Wölfin säugt die Zwillinge.", es: "Una loba amamanta a los gemelos.", bin: "sage" },
    { de: "Latiner siedeln ab ca. 1000 v. Chr. auf den Hügeln.", es: "Los latinos se asientan en las colinas desde ca. 1000 a. C.", bin: "wiss" },
    { de: "Der Name 'Rom' kommt von Romulus.", es: "El nombre 'Roma' viene de Rómulo.", bin: "sage" },
    { de: "Der Name 'Rom' kommt vermutlich vom etruskischen Wort 'Ruma'.", es: "El nombre 'Roma' viene probablemente de la palabra etrusca 'Ruma'.", bin: "wiss" },
    { de: "Am Anfang herrscht ein König über die Stadt.", es: "Al principio un rey gobierna la ciudad.", bin: "beide" },
    { de: "Adlige Etrusker werden Könige von Rom.", es: "Nobles etruscos se convierten en reyes de Roma.", bin: "wiss" },
    { de: "Der Kriegsgott Mars ist der Vater der Gründer.", es: "El dios Marte es el padre de los fundadores.", bin: "sage" },
    { de: "Die Stadt bekommt eine Mauer.", es: "La ciudad recibe una muralla.", bin: "beide" },
    { de: "Funde (Tonurnen) zeigen: Um 1000 v. Chr. gab es einfache Hütten.", es: "Hallazgos (urnas) muestran: hacia 1000 a. C. había cabañas sencillas.", bin: "wiss" },
    { de: "Romulus tötet seinen Bruder Remus.", es: "Rómulo mata a su hermano Remo.", bin: "sage" },
    { de: "Handel mit Salz und die Tiberfurt lassen die Stadt wachsen.", es: "El comercio de sal y el vado del Tíber hacen crecer la ciudad.", bin: "wiss" },
  ],
  summary: {
    gemein: ["Entstehung im 8. Jh. v. Chr.", "Lage am Fluss Tiber, auf Hügeln", "Am Anfang ein König", "Eine Mauer schützt die Stadt"],
    unterschiede: [
      ["Gründer", "Romulus (Sohn des Mars)", "Latiner, die ihre Dörfer vereinen; später Etrusker"],
      ["Zeitpunkt", "genau 753 v. Chr.", "langsam, Ende des 8. Jh. v. Chr."],
      ["Name", "von Romulus", "vermutlich vom etruskischen 'Ruma'"],
      ["Erste Könige", "Romulus", "latinische, dann etruskische Könige"],
      ["Beweise", "Erzählung (Livius), Götter", "Funde: Tonurnen, Hütten, Mauerreste"],
    ]
  }
};

/* ---------- VORAUSSETZUNGEN-TABELLE (Hausaufgabe) ---------- */
const VORAUSSETZUNGEN = [
  { key: "A", title: "A) Natürliche Gegebenheiten", es: "Condiciones naturales", src: "VT: Landschaft … und D1",
    points: ["Hügel (Palatin, Kapitol) → Schutz vor Feinden und Hochwasser", "Fluss Tiber mit Furt und Tiberinsel → Übergang, Verkehrsweg", "fruchtbarer Boden + mildes Klima → Ackerbau", "ca. 15 km zum Mittelmeer → Schiffsverkehr, Handel, aber Schutz vor Piraten", "Salz an der Küste → Rohstoff", "Sümpfe zwischen den Hügeln (Nachteil, später trockengelegt)"],
    esPoints: ["colinas → protección", "río Tíber con vado e isla → paso, vía de transporte", "suelo fértil + clima suave → agricultura", "15 km al mar → comercio pero protección", "sal en la costa", "pantanos (desventaja, luego drenados)"] },
  { key: "B", title: "B) Wirtschaft", es: "Economía", src: "VT: Einwanderer und D1",
    points: ["Handel mit Salz über die Salzstraße", "Markt an der Tiberfurt (vermutlich schon früh)", "Waren vom Mittelmeer kommen über den Tiber ins Landesinnere", "Latiner = Bauern (Ackerbau, Vieh); Etrusker bringen Handel und Handwerk", "griechische Städte in Süditalien = Handelspartner und Vorbild"],
    esPoints: ["comercio de sal", "mercado en el vado", "mercancías del Mediterráneo por el Tíber", "latinos = campesinos; etruscos = comercio y artesanía", "ciudades griegas = socios comerciales"] },
  { key: "C", title: "C) Gesellschaft", es: "Sociedad", src: "VT: Stadt und Land",
    points: ["Latiner (seit ca. 1000 v. Chr.) + Etrusker (seit ca. 700 v. Chr.) leben zusammen", "die Mehrheit der Bürger sind Bauern und leben rund um Rom", "Bürger der Stadt treffen sich auf dem Forum (Markt, Versammlung)", "adlige Etrusker = Oberschicht", "Einfluss der Griechen auf Kultur (Schrift, Götter)"],
    esPoints: ["latinos + etruscos viven juntos", "mayoría = campesinos", "ciudadanos se reúnen en el foro", "nobles etruscos = clase alta", "influencia griega en la cultura"] },
  { key: "D", title: "D) Herrschaft", es: "Dominio, gobierno", src: "VT: Stadt und Land",
    points: ["ein König regiert; er ist auch Feldherr und oberster Priester", "adlige Etrusker übernehmen das Amt des Königs", "der König regiert die Stadt und das Umland", "Grenzen der Stadt werden festgelegt, Mauer gebaut", "erfolgreiche Kriege → bis 500 v. Chr. eine der größten Städte Italiens"],
    esPoints: ["un rey gobierna; es también general y sumo sacerdote", "nobles etruscos toman el cargo de rey", "gobierna ciudad y alrededores", "fronteras fijadas, muralla", "guerras exitosas → gran ciudad hacia 500 a. C."] },
  { key: "R", title: "Religion", es: "Religión", src: "D2",
    points: ["die Götter greifen ein: der Kriegsgott Mars ist der Vater von Romulus und Remus", "göttliche Herkunft macht die Stadt und ihre Könige besonders wichtig", "Aeneas (Held aus Troja) als Vorfahre", "die Wölfin als Zeichen der Götter → Symbol auf Münzen", "der König ist auch oberster Priester (VT)"],
    esPoints: ["los dioses intervienen: Marte es el padre", "origen divino = importancia de la ciudad", "Eneas como antepasado", "la loba como señal divina → símbolo en monedas", "el rey también es sumo sacerdote"] },
  { key: "S", title: "Sage", es: "Leyenda", src: "D2",
    points: ["Romulus und Remus, Nachfahren des Aeneas; Mutter Rhea Silvia, Vater Mars", "Onkel Amulius will sie töten lassen → am Tiber ausgesetzt", "Wölfin säugt sie, Hirte zieht sie auf", "sie töten Amulius und gründen 753 v. Chr. eine Stadt", "Streit um die Mauer: Romulus tötet Remus", "Romulus = erster König, gibt der Stadt den Namen Rom", "überliefert von Livius ('Ab urbe condita')"],
    esPoints: ["Rómulo y Remo, descendientes de Eneas", "el tío Amulio quiere matarlos → abandonados en el Tíber", "loba los amamanta, pastor los cría", "matan a Amulio y fundan la ciudad en 753 a. C.", "pelea por la muralla: Rómulo mata a Remo", "Rómulo = primer rey, da nombre a la ciudad", "transmitido por Livio"] },
];

/* ---------- REDEMITTEL ---------- */
const REDEMITTEL = [
  { step: "Schritt 1–2: Titel, Thema, Zeit", es: "Título, tema, tiempo", items: [
    "Die Karte mit dem Titel „…“ zeigt … im Jahr / im … Jahrhundert v. Chr.",
    "Die Karte beschäftigt sich mit (+ Dativ) …",
    "Der dargestellte Zeitraum umspannt etwa … Jahre, also die Zeit von … bis … v. Chr.",
    "Die Karte zeigt das heutige Land …",
    "Der Ausschnitt der Karte zeigt …" ] },
  { step: "Schritt 3: Legende", es: "Leyenda", items: [
    "Die Farben bedeuten: Orange steht für …, Beige für …, Grün für …",
    "Die roten Punkte bedeuten …",
    "In der Legende wird gezeigt, welche …",
    "Mithilfe der Maßstabsleiste lässt sich erkennen, dass …" ] },
  { step: "Schritt 4: Beschreiben und untersuchen", es: "Describir y analizar", items: [
    "Im Norden / nördlich von … liegt / liegen …",
    "Im Süden / südlich von … befinden sich …",
    "Im Osten / östlich … – Im Westen / westlich …",
    "An der Küste des Mittelmeeres …",
    "Das Gebiet der … stellt eine flächenmäßig größere Einheit dar.",
    "Auffällig ist, dass …",
    "Rom lag am Rand des etruskischen Machtbereichs und grenzte an …" ] },
  { step: "Schritt 5: Zusammenfassen und deuten", es: "Resumir e interpretar", items: [
    "Zusammenfassend lässt sich festhalten, dass …",
    "Insgesamt kann man feststellen, dass …",
    "Insgesamt ist …",
    "Daraus lässt sich schließen, dass …",
    "Das frühe Rom lag an der Nahtstelle zwischen … und …" ] },
  { step: "Schritt 6: Offene Fragen", es: "Preguntas abiertas", items: [
    "Die Frage … bleibt unbeantwortet.",
    "Von der Karte nicht ablesbar ist, wie …",
    "Hierzu benötigt man Informationen über die Karte hinaus." ] },
];

const MUSTERTEXT = "Die Karte mit dem Titel „Völker Italiens im 6. Jahrhundert v. Chr.“ zeigt die Verbreitung der Völker in Mittel- und Süditalien in der Zeit von 600 bis 500 v. Chr. Die Farben bedeuten: Orange steht für die Etrusker, Beige für die Italiker und Grün für die Griechen. Die roten Punkte bedeuten wichtige Orte.\n\nIm Norden, nördlich des Tibers, liegt das große Gebiet der Etrusker mit vielen Städten wie Veji, Caere und Tarquinii. Südlich und östlich davon befinden sich die Gebiete der Italiker: Latiner, Sabiner, Aequer, Volsker, Samniten und Osker. Sie haben keine großen Städte. An der Küste des Mittelmeeres, im Süden, liegen die griechischen Stadtstaaten wie Kyme, Neapolis und Tarent. Auffällig ist, dass Rom genau an der Grenze zwischen Etruskern und Latinern liegt.\n\nInsgesamt kann man feststellen, dass Italien im 6. Jahrhundert v. Chr. in ganz unterschiedliche Gebiete aufgeteilt war. Das frühe Rom lag an der Nahtstelle zwischen den Etruskern und den Völkern der Italiker. Die Frage, ob die Völker verbündet waren oder Kriege führten, bleibt unbeantwortet.";

const BUILDER_CHECKS = [
  { re: /Die Karte mit dem Titel/i, de: "Titel der Karte genannt", es: "título mencionado" },
  { re: /(Jahr|Jahrhundert|v\.\s?Chr)/i, de: "Zeit genannt", es: "tiempo mencionado" },
  { re: /Farben bedeuten/i, de: "Legende erklärt (Farben)", es: "leyenda explicada" },
  { re: /(Norden|nördlich|Süden|südlich|Osten|östlich|Westen|westlich)/i, de: "Himmelsrichtung benutzt", es: "punto cardinal usado" },
  { re: /(Etrusker|Italiker|Griechen)/i, de: "Völker genannt", es: "pueblos mencionados" },
  { re: /(Insgesamt|Zusammenfassend|Daraus lässt sich)/i, de: "Zusammenfassung (Schritt 5)", es: "resumen" },
  { re: /(bleibt unbeantwortet|nicht ablesbar)/i, de: "Offene Frage (Schritt 6)", es: "pregunta abierta" },
];

/* ---------- KAPITEL ---------- */
const CHAPTERS = [
  /* 0 ---------------------------------------------------------------- */
  { id: "start", num: 0, short: "Start", title: "Vom Dorf zum Weltreich", sub: "Die Reise beginnt",
    blocks: [
      { type: "text", title: "Worum geht es?",
        de: "Roms Geschichte begann auf dem Dorf. Einfache [[huette|Hütten]] von Bauernfamilien standen dort, wo wenige Jahrhunderte später eine Großstadt mit riesigen Palästen stand. Wie kam es zur [[gruendung|Gründung]]? Und wie war diese erstaunliche [[entstehung|Entwicklung]] zur Großstadt möglich?\n\nAuf dieser Seite reist du durch die Zeit: von den ersten Hütten am Tiber bis zur Stadt Rom um 500 v. Chr. Du lernst die Landschaft, die Menschen, die [[sage|Sage]] von Romulus und Remus und die Methode, wie man eine [[geschichtskarte|Geschichtskarte]] liest.",
        es: "La historia de Roma empezó en una aldea. Cabañas sencillas de familias campesinas estaban donde pocos siglos después se levantó una gran ciudad con palacios enormes. ¿Cómo se fundó? ¿Y cómo fue posible este desarrollo asombroso?\n\nEn esta página viajas en el tiempo: desde las primeras cabañas junto al Tíber hasta la ciudad de Roma hacia 500 a. C. Aprendes el paisaje, la gente, la leyenda de Rómulo y Remo y el método para leer un mapa histórico." },
      { type: "howto" },
      { type: "timeline" },
      { type: "tip", de: "Achtung bei v. Chr.: Die Zahlen werden kleiner, je näher wir an heute kommen. 1000 v. Chr. ist älter als 753 v. Chr., und 753 v. Chr. ist älter als 500 v. Chr.", es: "Cuidado con 'a. C.': los números bajan cuando nos acercamos al presente. 1000 a. C. es más antiguo que 753 a. C., y 753 a. C. es más antiguo que 500 a. C." },
      { type: "text", title: "Lernziele",
        de: "Nach dieser Reise kannst du:\n\n• die [[voraussetzung|Voraussetzungen]] für die Entstehung Roms nennen (Natur, [[wirtschaft|Wirtschaft]], [[gesellschaft|Gesellschaft]], [[herrschaft|Herrschaft]], Religion, Sage)\n• die Sage von Romulus und Remus erzählen\n• Sage und [[wissenschaft|Wissenschaft]] [[vergleichen]]\n• eine Geschichtskarte in 6 Schritten lesen und auswerten\n• Entfernungen und [[wegzeit|Wegzeiten]] mit dem [[massstab|Maßstab]] berechnen",
        es: "Después de este viaje puedes:\n\n• nombrar las condiciones para el surgimiento de Roma (naturaleza, economía, sociedad, dominio, religión, leyenda)\n• contar la leyenda de Rómulo y Remo\n• comparar leyenda y ciencia\n• leer y evaluar un mapa histórico en 6 pasos\n• calcular distancias y tiempos de viaje con la escala" },
    ] },

  /* 1 ---------------------------------------------------------------- */
  { id: "landschaft", num: 1, short: "Landschaft", title: "Die Landschaft Roms", sub: "Warum genau hier? (D1)",
    blocks: [
      { type: "text", title: "Ein günstiger Ort",
        de: "Seit der [[jungsteinzeit|Jungsteinzeit]] suchten Menschen [[guenstig|günstige]] Orte für ihre [[siedlung|Siedlungen]]. Gute Gründe für die Wahl eines Ortes waren: Flussübergänge, leichte Erhöhungen in Ebenen, [[fruchtbar|fruchtbare]] Böden oder [[rohstoffe|Rohstoffe]].\n\nIn Rom fanden die Menschen alles zusammen: den Fluss Tiber mit einer [[furt|Furt]], fruchtbare [[ackerboden|Ackerböden]] und Hügel, die Schutz boten. Tippe auf die Punkte in der Karte und finde heraus, warum jeder Teil der Landschaft wichtig war.",
        es: "Desde el Neolítico la gente buscaba lugares favorables para sus asentamientos. Buenas razones para elegir un lugar: pasos de río, pequeñas elevaciones en llanuras, suelos fértiles o materias primas.\n\nEn Roma la gente encontró todo junto: el río Tíber con un vado, tierras fértiles y colinas que daban protección. Toca los puntos del mapa y descubre por qué cada parte del paisaje era importante." },
      { type: "map", map: "rome" },
      { type: "tip", de: "Für die Hausaufgabe, Zeile A (Natürliche Gegebenheiten): Du brauchst mindestens Hügel, Tiber + Furt, fruchtbarer Boden, Nähe zum Meer. Schreibe in [[stichpunkte|Stichpunkten]]!", es: "Para la tarea, fila A (condiciones naturales): necesitas al menos colinas, Tíber + vado, suelo fértil, cercanía al mar. ¡Escribe en palabras clave!" },
      { type: "cards", title: "Vorteile und Nachteile der Lage", items: [
        { title: "Vorteile", good: true, de: "• Furt und Tiberinsel: einziger guter Flussübergang weit und breit\n• Hügel: Schutz, trocken, gute Sicht\n• Tiber: Schiffe bringen Waren vom Meer\n• Salz von der Küste\n• fruchtbarer Boden, mildes Klima", es: "• vado e isla: el único buen paso del río en la zona\n• colinas: protección, seco, buena vista\n• Tíber: barcos traen mercancías del mar\n• sal de la costa\n• suelo fértil, clima suave" },
        { title: "Nachteile", good: false, de: "• Sümpfe zwischen den Hügeln (Krankheiten, kein Platz zum Bauen)\n• Hochwasser des Tibers\n• mächtige Nachbarn: Etrusker (Veji) direkt gegenüber\n• keine natürlichen Grenzen wie Berge zum Schutz", es: "• pantanos entre las colinas (enfermedades, sin espacio para construir)\n• inundaciones del Tíber\n• vecinos poderosos: etruscos (Veyes) justo enfrente\n• sin fronteras naturales como montañas" } ] },
      { type: "quiz", questions: [
        { q: "Was ist eine Furt?", options: ["Eine Brücke aus Stein", "Eine flache Stelle im Fluss, wo man hindurchgehen kann", "Ein Hafen für große Schiffe", "Eine Insel im Fluss"], answer: 1, explain: "Die Furt ist flach. Händler konnten dort den Tiber überqueren, darum entstand ein Markt." },
        { q: "Wie weit war Rom vom Mittelmeer entfernt?", options: ["ca. 1 km", "ca. 15 km", "ca. 150 km", "ca. 500 km"], answer: 1, explain: "Ca. 15 km: nah genug für den Handel, weit genug für Schutz vor Angriffen vom Meer." },
        { q: "Welches Gebiet lag nördlich des Tibers?", options: ["Latium", "Etrurien", "Griechenland", "Samnium"], answer: 1, explain: "Etrurien, das Land der Etrusker, lag nördlich des Tibers. Latium lag südlich." },
        { q: "Welche Hügel nennt die Zeichnung D1?", options: ["Palatin und Kapitol", "Olymp und Ätna", "Akropolis und Forum", "Vesuv und Palatin"], answer: 0, explain: "Palatin und Kapitol sind die beiden Hügel, die in D1 beschriftet sind." },
        { type: "cloze", q: "Zwischen den Hügeln lag ein ___, den die Römer später trockenlegten.", answers: ["Sumpf", "sumpf", "Sümpfe"], explain: "Der Sumpf wurde trockengelegt. Dort entstand das Forum." },
      ] },
    ] },

  /* 2 ---------------------------------------------------------------- */
  { id: "einwanderer", num: 2, short: "Einwanderer", title: "Latiner und Etrusker", sub: "Wer kam nach Rom?",
    blocks: [
      { type: "text", title: "Die Latiner (um 1000 v. Chr.)",
        de: "Bereits um das Jahr 1000 v. Chr. hatte sich ein neu eingewandertes Volk am Tiber angesiedelt: die **Latiner**. Sie zählten zu den Italikern. Ihre [[siedlung|Siedlungen]] lagen auf den Hügeln in der Nähe des Flusses. Bis zum Ende des 8. Jahrhunderts v. Chr. wuchsen diese Dörfer zu einer Stadt zusammen.\n\nDer Zusammenschluss hatte nicht nur wirtschaftliche, sondern auch militärische Vorteile: Gemeinsam konnte man sich besser gegen Feinde wehren. Es gab einen **König**. Er war [[feldherr|Feldherr]] und oberster [[priester|Priester]] zugleich.\n\nWie die Hütten der Latiner aussahen, wissen wir von **Tonurnen** (Q1): kleine Gefäße in der Form einer Hütte, die man an der Stelle gefunden hat, an der Romulus angeblich seine Stadt gründete.",
        es: "Ya hacia el año 1000 a. C. un pueblo recién inmigrado se había asentado junto al Tíber: los **latinos**. Pertenecían a los itálicos. Sus asentamientos estaban en las colinas cerca del río. Hacia finales del siglo VIII a. C. estas aldeas se unieron en una ciudad.\n\nLa unión tenía ventajas económicas y también militares: juntos podían defenderse mejor. Había un **rey**. Era general y sumo sacerdote a la vez.\n\nSabemos cómo eran las cabañas de los latinos por las **urnas de barro** (Q1): pequeños recipientes con forma de cabaña, encontrados en el lugar donde supuestamente Rómulo fundó su ciudad." },
      { type: "text", title: "Die Etrusker (um 700 v. Chr.)",
        de: "Um das Jahr 700 v. Chr. kam eine weitere Gruppe von [[einwanderer|Einwanderern]] hinzu: die **Etrusker**. Das Volk der Etrusker ist vermutlich aus dem Zusammenschluss verschiedener Gruppen entstanden. Ein Teil stammte wohl aus [[kleinasien|Kleinasien]], dem Gebiet der heutigen Türkei.\n\nAus dem Etruskischen stammt [[vermutung|vermutlich]] auch der Name der Stadt: **Ruma**. Die Etrusker hatten großen Einfluss auf den [[handel|Handel]], die Kultur und die politische Ordnung Roms.\n\nEinfluss hatten auch die von **Griechen** gegründeten Städte in Mittel- und Süditalien, zum Beispiel Kyme und Neapolis.",
        es: "Hacia el año 700 a. C. llegó otro grupo de inmigrantes: los **etruscos**. El pueblo etrusco surgió probablemente de la unión de varios grupos. Una parte venía seguramente de Asia Menor, la actual Turquía.\n\nDel etrusco viene probablemente también el nombre de la ciudad: **Ruma**. Los etruscos tuvieron gran influencia en el comercio, la cultura y el orden político de Roma.\n\nTambién influyeron las ciudades fundadas por **griegos** en el centro y sur de Italia, por ejemplo Cumas y Nápoles." },
      { type: "map", map: "arrivals" },
      { type: "tip", de: "Merke dir die drei Völker und ihre Zeiten: Latiner um 1000 v. Chr. (Bauern auf den Hügeln), Etrusker um 700 v. Chr. (Handel, Kultur, Könige), Griechen an den Küsten (Städte, Schrift).", es: "Memoriza los tres pueblos y sus fechas: latinos hacia 1000 a. C. (campesinos en las colinas), etruscos hacia 700 a. C. (comercio, cultura, reyes), griegos en las costas (ciudades, escritura)." },
      { type: "quiz", questions: [
        { q: "Wann siedelten sich die Latiner am Tiber an?", options: ["um 1000 v. Chr.", "um 753 v. Chr.", "um 700 v. Chr.", "um 500 v. Chr."], answer: 0, explain: "Die Latiner kamen schon um 1000 v. Chr. Die Etrusker folgten um 700 v. Chr." },
        { q: "Welche zwei Ämter hatte der König der Latiner?", options: ["Richter und Lehrer", "Feldherr und oberster Priester", "Händler und Bauer", "Bürgermeister und Hirte"], answer: 1, explain: "Der König führte die Armee (Feldherr) und leitete die Opfer für die Götter (oberster Priester)." },
        { q: "Woher kommt vermutlich der Name 'Rom'?", options: ["von Romulus", "vom griechischen Wort für 'Stadt'", "vom etruskischen Wort 'Ruma'", "vom Fluss Tiber"], answer: 2, explain: "Die Wissenschaft vermutet: 'Ruma' ist etruskisch. Die Sage sagt: von Romulus." },
        { q: "Woher wissen wir, wie die Hütten der Latiner aussahen?", options: ["aus Fotos", "aus der Sage von Livius", "aus Tonurnen in Hüttenform (Q1)", "aus griechischen Karten"], answer: 2, explain: "Die Tonurnen sehen aus wie kleine Hütten. Wissenschaftler nehmen an, dass die echten Hütten so aussahen." },
        { type: "cloze", q: "Um 700 v. Chr. kamen die ___ nach Rom. Ein Teil von ihnen stammte wohl aus Kleinasien.", answers: ["Etrusker", "etrusker"], explain: "Die Etrusker kamen um 700 v. Chr." },
      ] },
    ] },

  /* 3 ---------------------------------------------------------------- */
  { id: "wachstum", num: 3, short: "Wachstum", title: "Handel und Wachstum", sub: "Vom Dorf zur Stadt",
    blocks: [
      { type: "text", title: "Landschaft, Handel, Wachstum",
        de: "Auf dem Gebiet der späteren Stadt Rom fanden die Menschen günstige Gegebenheiten vor: den Fluss Tiber mit einem Übergang (einer [[furt|Furt]]), fruchtbare Ackerböden und Schutz bietende Hügel.\n\nDurch das römische Gebiet verlief ein Weg für den Gewinn bringenden Handel mit **Salz**. Hinzu kam der für den [[schiffsverkehr|Schiffsverkehr]] geeignete Tiber, auf dem Waren vom Mittelmeer ins [[landesinnere|Landesinnere]] transportiert werden konnten. Vermutlich entstand an der Tiberfurt schon früh ein **Markt**, auf dem Waren von nah und fern gehandelt wurden.",
        es: "En el territorio de la futura ciudad de Roma la gente encontró condiciones favorables: el río Tíber con un paso (un vado), tierras fértiles y colinas protectoras.\n\nPor el territorio romano pasaba una ruta para el lucrativo comercio de **sal**. Además, el Tíber era navegable, y por él se podían transportar mercancías del Mediterráneo hacia el interior. Probablemente surgió pronto un **mercado** en el vado del Tíber, donde se comerciaba con productos de cerca y de lejos." },
      { type: "flow", title: "So wächst eine Stadt", items: [
        { icon: "river", de: "Furt + Tiber", es: "vado + río" },
        { icon: "salt", de: "Salzhandel", es: "comercio de sal" },
        { icon: "market", de: "Markt", es: "mercado" },
        { icon: "people", de: "mehr Menschen", es: "más gente" },
        { icon: "city", de: "Stadt", es: "ciudad" } ] },
      { type: "text", title: "Stadt und Land",
        de: "Unter dem Einfluss der Etrusker entwickelte sich die Stadt weiter: Die Grenzen des Stadtgebiets wurden bestimmt, und es wurde mit dem Bau einer [[mauer|Mauer]] begonnen. Die [[sumpf|Sümpfe]] zwischen den Hügeln wurden Stück für Stück [[trockenlegen|trockengelegt]], sodass Raum für einen großen öffentlichen Platz, das [[forum|Forum]], entstand. Hier versammelten sich die [[buerger|Bürger]] der Stadt Rom, hier wurde auch Handel getrieben.\n\nHandel, aber auch erfolgreiche Kriege machten Rom bis zum Jahr 500 v. Chr. zu einer der größten Städte Italiens. Mächtige [[adlige|adlige]] Etrusker übernahmen das Amt des Königs; sie verwalteten und regierten die wachsende Stadt und das [[umland|umliegende Land]].\n\nWährend die Mehrzahl der Bürger als Bauern in der unmittelbaren Umgebung Roms lebte, lag das politische und wirtschaftliche Zentrum in der Stadt Rom.",
        es: "Bajo la influencia de los etruscos la ciudad siguió desarrollándose: se fijaron los límites del territorio urbano y se empezó a construir una muralla. Los pantanos entre las colinas se drenaron poco a poco, y así surgió espacio para una gran plaza pública, el Foro. Aquí se reunían los ciudadanos de Roma, aquí también se comerciaba.\n\nEl comercio, pero también guerras exitosas, hicieron de Roma hacia el año 500 a. C. una de las ciudades más grandes de Italia. Poderosos nobles etruscos asumieron el cargo de rey; administraban y gobernaban la ciudad creciente y las tierras de alrededor.\n\nMientras la mayoría de los ciudadanos vivía como campesinos en los alrededores inmediatos de Roma, el centro político y económico estaba en la ciudad de Roma." },
      { type: "tip", de: "Diese zwei Abschnitte sind deine Quelle für die Hausaufgabe, Zeilen B (Wirtschaft), C (Gesellschaft) und D (Herrschaft). Wirtschaft = Salz, Markt, Tiber. Gesellschaft = Bauern, Bürger, Forum, Adlige. Herrschaft = König, Etrusker, Mauer, Kriege.", es: "Estos dos párrafos son tu fuente para la tarea, filas B (economía), C (sociedad) y D (dominio). Economía = sal, mercado, Tíber. Sociedad = campesinos, ciudadanos, foro, nobles. Dominio = rey, etruscos, muralla, guerras." },
      { type: "quiz", questions: [
        { q: "Welche Ware brachte Rom früh Gewinn?", options: ["Gold", "Salz", "Seide", "Wein"], answer: 1, explain: "Salz. Man gewann es an der Küste und handelte es über die Salzstraße." },
        { q: "Was entstand auf dem trockengelegten Sumpf?", options: ["der Palatin", "die Mauer", "das Forum", "der Hafen"], answer: 2, explain: "Das Forum, der große öffentliche Platz der Stadt." },
        { q: "Wer übernahm das Amt des Königs in Rom?", options: ["griechische Händler", "latinische Bauern", "mächtige adlige Etrusker", "Hirten"], answer: 2, explain: "Adlige Etrusker wurden Könige von Rom." },
        { q: "Wo lebte die Mehrzahl der Bürger Roms?", options: ["in Palästen in der Stadt", "als Bauern in der Umgebung Roms", "auf Schiffen", "in Griechenland"], answer: 1, explain: "Die meisten Bürger waren Bauern rund um Rom. Das Zentrum war aber die Stadt." },
        { type: "cloze", q: "Bis zum Jahr ___ v. Chr. wurde Rom eine der größten Städte Italiens.", answers: ["500"], explain: "Um 500 v. Chr. war Rom schon eine der größten Städte Italiens." },
      ] },
    ] },

  /* 4 ---------------------------------------------------------------- */
  { id: "sage", num: 4, short: "Sage", title: "Romulus und Remus", sub: "Die Sage von der Entstehung Roms (D2)",
    blocks: [
      { type: "text", title: "Warum eine Sage?",
        de: "Vielerorts erklärten sich die Menschen die Entstehung ihrer Städte durch das Eingreifen von Göttern oder sagenhaften Helden. So auch in Rom. Der römische Geschichtsschreiber **Livius** hat die [[sage|Sage]] in seinem Werk 'Ab urbe condita' ('Seit der Gründung der Stadt') [[ueberliefern|überliefert]].\n\nKlicke dich durch die neun Stationen der Geschichte.",
        es: "En muchos lugares la gente explicaba el origen de sus ciudades por la intervención de dioses o héroes legendarios. Así también en Roma. El historiador romano **Livio** transmitió la leyenda en su obra 'Ab urbe condita' ('Desde la fundación de la ciudad').\n\nRecorre las nueve estaciones de la historia." },
      { type: "story" },
      { type: "coin", title: "Q2: Die Wölfin auf der Münze (137 v. Chr.)",
        de: "Fast 600 Jahre nach der angeblichen Gründung prägten die Römer die Wölfin mit den Zwillingen auf ihre Münzen. Warum? Die Münze erzählt jedem, der sie in die Hand nimmt: Rom hat eine göttliche Herkunft (Mars), die Götter haben die Gründer gerettet, und Rom ist alt und mächtig. Eine Münze war wie Werbung für die Stadt.\n\nDie Münze ist eine **[[quelle|Quelle]] (Q)**: Sie stammt wirklich aus der Vergangenheit. Sie beweist aber nicht, dass die Sage wahr ist. Sie beweist nur, dass die Römer im Jahr 137 v. Chr. an diese Geschichte glaubten und stolz darauf waren.",
        es: "Casi 600 años después de la supuesta fundación, los romanos acuñaron la loba con los gemelos en sus monedas. ¿Por qué? La moneda cuenta a quien la toma: Roma tiene un origen divino (Marte), los dioses salvaron a los fundadores, y Roma es antigua y poderosa. Una moneda era como publicidad de la ciudad.\n\nLa moneda es una **fuente (Q)**: viene realmente del pasado. Pero no demuestra que la leyenda sea verdad. Solo demuestra que los romanos en 137 a. C. creían en esta historia y estaban orgullosos de ella." },
      { type: "tip", de: "Für die Hausaufgabe: Zeile 'Religion' = Mars als Vater, göttliche Herkunft, Wölfin als Zeichen, König = Priester. Zeile 'Sage' = die Geschichte in 5–6 Stichpunkten (Aeneas → Amulius → Wölfin → Hirte → 753 → Brudermord → Name).", es: "Para la tarea: fila 'Religión' = Marte como padre, origen divino, loba como señal, rey = sacerdote. Fila 'Leyenda' = la historia en 5–6 palabras clave." },
      { type: "quiz", questions: [
        { q: "Wer ist laut Sage der Vater von Romulus und Remus?", options: ["Aeneas", "Amulius", "der Kriegsgott Mars", "Livius"], answer: 2, explain: "Mars, der Kriegsgott. Die Mutter ist Rhea Silvia." },
        { q: "Warum wollte Amulius die Zwillinge töten lassen?", options: ["Sie hatten Salz gestohlen.", "Er hatte Angst, dass sie ihm den Thron streitig machen.", "Sie waren Etrusker.", "Er mochte keine Kinder."], answer: 1, explain: "Amulius hatte seinen Bruder entmachtet und fürchtete die Enkel seines Bruders." },
        { q: "Wer zog die Zwillinge groß?", options: ["die Wölfin allein", "ein Hirte und seine Frau", "König Amulius", "griechische Händler"], answer: 1, explain: "Die Wölfin säugte sie, aber ein Hirte und seine Frau zogen sie auf." },
        { q: "Warum tötete Romulus seinen Bruder?", options: ["Remus wollte König von Veji werden.", "Remus verspottete ihn und sprang über die neue Mauer.", "Remus hatte die Wölfin getötet.", "Es war ein Unfall beim Bau des Forums."], answer: 1, explain: "Remus sprang über die fertige Mauer und verspottete Romulus. Daraufhin brachte Romulus ihn um." },
        { type: "cloze", q: "Laut Sage wurde Rom im Jahr ___ v. Chr. gegründet.", answers: ["753"], explain: "753 v. Chr. ist das sagenhafte Gründungsjahr." },
        { q: "Was ist die Münze Q2 für den Historiker?", options: ["eine Darstellung (D) von heute", "eine Quelle (Q) aus der Vergangenheit", "ein Verfassertext (VT)", "eine Sage"], answer: 1, explain: "Die Münze stammt wirklich aus dem Jahr 137 v. Chr. Sie ist eine Quelle." },
      ] },
    ] },

  /* 5 ---------------------------------------------------------------- */
  { id: "vergleich", num: 5, short: "Vergleich", title: "Sage oder Wissenschaft?", sub: "Was wissen wir wirklich?",
    blocks: [
      { type: "text", title: "Drei Arten von Material im Buch",
        de: "**Q = [[quelle|Quelle]]**: etwas aus der Vergangenheit selbst (die Tonurne Q1, die Münze Q2).\n\n**D = [[darstellung|Darstellung]]**: heute gemacht, um die Vergangenheit zu zeigen (die Zeichnung D1, der Sagentext D2 nach Livius).\n\n**VT = [[vt|Verfassertext]]**: der Text der Buchautoren. Er erklärt, was die Wissenschaft heute weiß oder [[vermutung|vermutet]].\n\nAchte im VT auf Signalwörter: **'vermutlich', 'wohl', 'angeblich', 'Wissenschaftler nehmen an'** = Vermutung. Ohne diese Wörter = sicheres Wissen (zum Beispiel aus Funden).",
        es: "**Q = fuente**: algo del pasado mismo (la urna Q1, la moneda Q2).\n\n**D = representación**: hecha hoy para mostrar el pasado (el dibujo D1, el texto de la leyenda D2 según Livio).\n\n**VT = texto del autor**: el texto de los autores del libro. Explica lo que la ciencia sabe o supone hoy.\n\nFíjate en el VT en palabras señal: **'vermutlich', 'wohl', 'angeblich', 'Wissenschaftler nehmen an'** = suposición. Sin estas palabras = conocimiento seguro (por ejemplo de hallazgos)." },
      { type: "compare", title: "Vermuten oder wissen?", left: { title: "Das vermuten wir nur", items: ["Der Name Rom kommt von 'Ruma' (vermutlich).", "Ein Teil der Etrusker kam aus Kleinasien (wohl).", "An der Furt gab es früh einen Markt (vermutlich).", "Die Hütten sahen aus wie die Tonurnen (Wissenschaftler nehmen an).", "Romulus gründete die Stadt dort (angeblich)."] },
        right: { title: "Das wissen wir sicher (Funde)", items: ["Um 1000 v. Chr. lebten Latiner auf den Hügeln (Tonurnen).", "Um 700 v. Chr. kamen die Etrusker.", "Die Stadt bekam eine Mauer und ein Forum.", "Etruskische Adlige waren Könige.", "Um 500 v. Chr. war Rom eine der größten Städte Italiens."] } },
      { type: "text", title: "Sortiere die Aussagen",
        de: "Deine Partnerarbeit hatte zwei Spalten: [[gemeinsamkeiten|Gemeinsamkeiten und Unterschiede]]. Hier sortierst du zuerst: Sagt das nur die Sage (D2)? Nur die Wissenschaft (VT)? Oder beide? Alles, was 'beide' sagen, ist eine Gemeinsamkeit. Der Rest sind Unterschiede.",
        es: "Tu trabajo en pareja tenía dos columnas: similitudes y diferencias. Aquí primero clasificas: ¿lo dice solo la leyenda (D2)? ¿Solo la ciencia (VT)? ¿O ambas? Todo lo que dicen 'ambas' es una similitud. El resto son diferencias." },
      { type: "sort" },
      { type: "quiz", questions: [
        { q: "Was ist ein Verfassertext (VT)?", options: ["ein Text aus der Antike", "der Text der Schulbuchautoren", "eine Sage", "eine Münze"], answer: 1, explain: "VT = Verfassertext, geschrieben von den Autoren des Buches." },
        { q: "Welches Wort zeigt eine Vermutung an?", options: ["vermutlich", "immer", "sicher", "bewiesen"], answer: 0, explain: "'Vermutlich', 'wohl', 'angeblich' zeigen: Das ist nicht bewiesen." },
        { q: "Was ist eine Gemeinsamkeit von Sage und Wissenschaft?", options: ["Eine Wölfin rettet die Gründer.", "Die Stadt entsteht am Tiber auf Hügeln.", "Der Name kommt von Romulus.", "Mars ist der Vater."], answer: 1, explain: "Beide sagen: Rom entsteht am Tiber auf den Hügeln. Die Wölfin und Mars sind nur Sage." },
        { q: "Was sagt nur die Wissenschaft?", options: ["Rom wurde 753 v. Chr. gegründet.", "Romulus tötete Remus.", "Adlige Etrusker wurden Könige.", "Aeneas kam aus Troja."], answer: 2, explain: "Die etruskischen Könige kennt nur die Wissenschaft. Die Sage spricht von Romulus." },
      ] },
    ] },

  /* 6 ---------------------------------------------------------------- */
  { id: "italien", num: 6, short: "Italien", title: "Völker Italiens im 6. Jh. v. Chr.", sub: "Die Karte D1 (Seite 110)",
    blocks: [
      { type: "text", title: "Die Karte lesen",
        de: "Die Karte zeigt Mittel- und Süditalien im **6. Jahrhundert v. Chr.** (600 bis 500 v. Chr.). Drei Farben, drei Völkergruppen:\n\n• **Orange = Etrusker**: ein großes, zusammenhängendes Gebiet nördlich des Tibers mit vielen Städten (Veji, Caere, Tarquinii, Volsinii, Clusium, Aritim). Keine Hauptstadt: Die Etruskerstädte waren [[gleichberechtigt|gleichberechtigte]] [[verbuendete|Verbündete]].\n\n• **Beige = Italiker**: viele verschiedene Volksgruppen (Umbrer, Sabiner, Aequer, Volsker, Latiner, Samniten, Osker). Ihr Gebiet war [[laendlich|ländlich]]: keine großen Städte. Sie lebten als Bauern.\n\n• **Grün = Griechen**: [[stadtstaat|Stadtstaaten]] an den Küsten Süditaliens (Kyme, Neapolis, Tarent, Metapont). Kein zusammenhängendes Gebiet, nur wenige Kilometer ins Landesinnere. Handelsstädte, ausgerichtet auf das Meer.\n\n**Rom** lag am Rand des etruskischen Machtbereichs und grenzte an die Gebiete der Italiker: an der [[nahtstelle|Nahtstelle]].\n\nSchalte die Ebenen ein und aus, tippe auf die roten Punkte.",
        es: "El mapa muestra el centro y sur de Italia en el **siglo VI a. C.** (600 a 500 a. C.). Tres colores, tres grupos de pueblos:\n\n• **Naranja = etruscos**: un territorio grande y continuo al norte del Tíber con muchas ciudades. Sin capital: las ciudades etruscas eran aliadas con los mismos derechos.\n\n• **Beige = itálicos**: muchos grupos diferentes (umbros, sabinos, ecuos, volscos, latinos, samnitas, oscos). Su territorio era rural: sin grandes ciudades. Vivían como campesinos.\n\n• **Verde = griegos**: ciudades-estado en las costas del sur de Italia. Sin territorio continuo, solo unos kilómetros hacia el interior. Ciudades comerciales, orientadas al mar.\n\n**Roma** estaba en el borde del poder etrusco y limitaba con los itálicos: en el punto de unión.\n\nActiva y desactiva las capas, toca los puntos rojos." },
      { type: "map", map: "italy" },
      { type: "distance" },
      { type: "text", title: "Die Lage Roms: Vorteile und Gefahren",
        de: "**Vorteile**: Rom konnte mit beiden Seiten [[handel|Handel treiben]]. Von den Etruskern lernte Rom Technik (Mauern, Sümpfe trockenlegen), Kultur und Schrift (die wiederum von den Griechen kam). Der Tiber und die Nähe zum Meer brachten Waren.\n\n**Gefahren**: Die mächtigen Etrusker waren direkt gegenüber (Veji nur ca. 16 km, das ist ein halber Tagesmarsch!). Die Latiner, Sabiner, Aequer und Volsker waren [[konkurrenten|Konkurrenten]] um Land. Rom hatte keine Berge oder Meere als Schutz.\n\n**Kriege im 6. und 5. Jh. v. Chr.**: Rom kämpfte gegen die Etrusker von **Veji** (lange Kriege, Veji wurde 396 v. Chr. zerstört), gegen die anderen **Latiner** (Schlacht am See Regillus um 496 v. Chr.), gegen die **Sabiner**, **Aequer** und **Volsker** (immer wieder im 5. Jh.).",
        es: "**Ventajas**: Roma podía comerciar con ambos lados. De los etruscos aprendió técnica (murallas, drenar pantanos), cultura y escritura (que a su vez venía de los griegos). El Tíber y la cercanía del mar traían mercancías.\n\n**Peligros**: los poderosos etruscos estaban justo enfrente (Veyes a solo 16 km, ¡medio día de marcha!). Latinos, sabinos, ecuos y volscos eran rivales por la tierra. Roma no tenía montañas ni mares como protección.\n\n**Guerras en los siglos VI y V a. C.**: Roma luchó contra los etruscos de **Veyes** (guerras largas, Veyes fue destruida en 396 a. C.), contra los otros **latinos** (batalla del lago Regilo hacia 496 a. C.), contra **sabinos**, **ecuos** y **volscos** (una y otra vez en el siglo V)." },
      { type: "quiz", questions: [
        { q: "Welche Farbe haben die Etrusker auf der Karte?", options: ["Grün", "Beige", "Orange", "Blau"], answer: 2, explain: "Orange = Etrusker, Beige = Italiker, Grün = Griechen." },
        { q: "Welchen Zeitraum zeigt die Karte?", options: ["1000–900 v. Chr.", "600–500 v. Chr.", "500–400 v. Chr.", "100–1 v. Chr."], answer: 1, explain: "Das 6. Jahrhundert v. Chr. = die Jahre 600 bis 500 v. Chr." },
        { q: "Wo lagen die griechischen Städte?", options: ["im Landesinneren", "an den Küsten Süditaliens", "nördlich des Tibers", "in den Alpen"], answer: 1, explain: "Die Griechen gründeten Handelsstädte an den Küsten, zum Beispiel Kyme und Tarent." },
        { q: "Warum sagt man, Rom lag an einer 'Nahtstelle'?", options: ["Rom lag am Meer.", "Rom lag genau zwischen Etruskern und Italikern.", "Rom lag auf einer Insel.", "Rom lag in Griechenland."], answer: 1, explain: "Rom lag am Rand des Etruskergebiets und grenzte an die Latiner und andere Italiker." },
        { q: "Ein Schiff fährt 10 km/h. Wie lange braucht es für 200 km?", options: ["2 Stunden", "10 Stunden", "20 Stunden", "200 Stunden"], answer: 2, explain: "Wegzeit = Entfernung : Geschwindigkeit = 200 km : 10 km/h = 20 Stunden." },
        { type: "cloze", q: "Die Italiker hatten im 6. Jh. v. Chr. keine großen ___ gegründet; sie lebten als Bauern.", answers: ["Städte", "städte", "Stadt"], explain: "Die Italiker lebten ländlich, ohne große Städte." },
      ] },
    ] },

  /* 7 ---------------------------------------------------------------- */
  { id: "methode", num: 7, short: "Methode", title: "Geschichtskarten lesen", sub: "Die Methode in 6 Schritten",
    blocks: [
      { type: "text", title: "Warum Karten?",
        de: "Mit Karten können wir uns im Raum orientieren. Nicht nur die heutige Erde lässt sich mit Karten erkunden, auch vergangene Welten. Im Geschichtsunterricht erfährst du mithilfe von Karten, wo sich Ereignisse abspielten, wer welche Gebiete besaß, welche Reiche und Völker Nachbarn, [[verbuendete|Verbündete]] oder [[konkurrenten|Konkurrenten]] waren und wer mit wem Handel trieb.\n\nUm Karten zu verstehen, muss man ihre [[zeichensprache|Zeichensprache]] kennen. Dein Arbeitsblatt hat 6 Schritte, das Buch hat 3 (Beschreiben, Untersuchen, Deuten). Beide passen zusammen:",
        es: "Con mapas podemos orientarnos en el espacio. No solo la Tierra actual se puede explorar con mapas, también mundos pasados. En clase de Historia los mapas te muestran dónde ocurrieron los hechos, quién poseía qué territorios, qué reinos y pueblos eran vecinos, aliados o rivales, y quién comerciaba con quién.\n\nPara entender mapas hay que conocer su lenguaje de signos. Tu hoja de trabajo tiene 6 pasos, el libro tiene 3 (describir, analizar, interpretar). Los dos encajan:" },
      { type: "steps", items: [
        { n: 1, book: "Beschreiben", title: "Leitfrage festlegen", de: "Wir legen fest, welche Frage wir beantworten wollen. Zum Beispiel: Wie entsteht die römische Kultur?", es: "Fijamos qué pregunta queremos responder. Por ejemplo: ¿Cómo surge la cultura romana?" },
        { n: 2, book: "Beschreiben", title: "Thema benennen", de: "Welches Thema hat die Karte? Tipp: Die Überschrift der Karte gibt schon entscheidende Hinweise. Nenne auch den [[zeitraum|Zeitraum]] und den [[ausschnitt|Ausschnitt]].", es: "¿Qué tema tiene el mapa? Consejo: el título del mapa ya da pistas decisivas. Nombra también el período y la sección." },
        { n: 3, book: "Beschreiben", title: "Kartenlegende erfassen", de: "Welche Farben, Linien, Zeichen, Symbole werden in der [[legende|Legende]] verwendet und erklärt? 'Die Farben bedeuten …'", es: "¿Qué colores, líneas, signos y símbolos se usan y explican en la leyenda? 'Los colores significan…'" },
        { n: 4, book: "Untersuchen", title: "Karte beschreiben und auswerten", de: "Welchen Raum zeigt die Karte? Über welchen Zeitpunkt / Zeitraum sagt sie etwas aus? Welche Informationen liefert sie im Einzelnen? Wo sind welche Völker? Welche [[schlussfolgerung|Schlussfolgerungen]] lassen sich ziehen? Was ist die [[gesamtaussage|Gesamtaussage]]?", es: "¿Qué espacio muestra el mapa? ¿Sobre qué momento / período informa? ¿Qué información da en detalle? ¿Dónde está cada pueblo? ¿Qué conclusiones se pueden sacar? ¿Cuál es el mensaje principal?" },
        { n: 5, book: "Deuten", title: "Zusammenfassenden Text schreiben", de: "In einem Text zusammenfassende Antworten auf die [[leitfrage|Leitfrage]] formulieren. Wir fassen alle Untersuchungsergebnisse zusammen. Benutze die [[redemittel|Redemittel]]!", es: "Formular en un texto respuestas resumidas a la pregunta guía. Resumimos todos los resultados. ¡Usa las frases modelo!" },
        { n: 6, book: "Deuten", title: "Neue, offene Fragen notieren", de: "Geschichtskarten liefern nicht nur Antworten, sondern werfen auch Fragen auf. Zum Beispiel: Wie schafften es die Römer, ein solches Weltreich zu errichten?", es: "Los mapas históricos no solo dan respuestas, también plantean preguntas. Por ejemplo: ¿Cómo lograron los romanos construir un imperio así?" } ] },
      { type: "text", title: "Die Musterlösung aus dem Buch (kurz)",
        de: "**Beschreiben**: Die Karte zeigt die Verbreitung der Völker Italiens im 6. Jh. v. Chr. Der Zeitraum umspannt etwa 100 Jahre (600–500 v. Chr.). Der Ausschnitt zeigt Mittelitalien; Norden und Süden sind nicht ganz abgebildet.\n\n**Untersuchen**: Die Legende zeigt die farbigen Flächen. Griechische Kolonien liegen an den Küsten Süditaliens, kein zusammenhängendes Ganzes, nur wenige Kilometer ins Landesinnere. Das Etruskergebiet ist eine flächenmäßig größere Einheit, Nord-Süd-[[ausdehnung|Ausdehnung]] über 500 km, viele Städte, keine Hauptstadt. Die Italiker: viele Volksgruppen, keine größeren Städte. Rom liegt am Rand des etruskischen Machtbereichs.\n\n**Deuten**: Italien war im 6. Jh. v. Chr. in ganz unterschiedliche Gebiete aufgeteilt. Das frühe Rom lag an der Nahtstelle zwischen Etruskern und Italikern. Nicht ablesbar: wie Rom zu seinen Nachbarn stand (verbündet, abgegrenzt oder Krieg?). Hierzu benötigt man Informationen über die Karte hinaus.",
        es: "**Describir**: el mapa muestra la distribución de los pueblos de Italia en el siglo VI a. C. El período abarca unos 100 años. La sección muestra el centro de Italia.\n\n**Analizar**: la leyenda muestra las zonas de color. Colonias griegas en las costas del sur, sin territorio continuo. El territorio etrusco es una unidad mayor, más de 500 km de norte a sur, muchas ciudades, sin capital. Los itálicos: muchos grupos, sin grandes ciudades. Roma en el borde del poder etrusco.\n\n**Interpretar**: Italia estaba dividida en zonas muy diferentes. La Roma temprana estaba en el punto de unión entre etruscos e itálicos. No se puede leer: cómo se relacionaba Roma con sus vecinos. Para eso se necesita información más allá del mapa." },
      { type: "builder" },
      { type: "operators", title: "Operatoren: Was will die Aufgabe von mir?", items: [
        { afb: "AFB I", color: "ok", ops: ["nennen", "beschreiben", "zusammenfassen", "wiedergeben"], de: "Wiedergeben, was da ist. Keine eigene Meinung.", es: "Reproducir lo que hay. Sin opinión propia." },
        { afb: "AFB II", color: "mid", ops: ["erläutern", "erklären", "vergleichen", "herausarbeiten", "einordnen"], de: "Zusammenhänge erklären, mit Gründen und Beispielen.", es: "Explicar relaciones, con razones y ejemplos." },
        { afb: "AFB III", color: "hi", ops: ["beurteilen", "bewerten", "Stellung nehmen", "überprüfen", "Vermutungen formulieren"], de: "Eigene begründete Meinung. 'Ich denke, dass …, weil …'", es: "Opinión propia con argumentos. 'Pienso que…, porque…'" } ] },
      { type: "quiz", questions: [
        { q: "Was ist Schritt 1 der Methode?", options: ["Legende erfassen", "Leitfrage festlegen", "Text schreiben", "Offene Fragen notieren"], answer: 1, explain: "Zuerst die Leitfrage: Welche Frage wollen wir mit der Karte beantworten?" },
        { q: "Wo findest du die Bedeutung der Farben?", options: ["in der Legende", "im Titel", "in der Maßstabsleiste", "im Verfassertext"], answer: 0, explain: "Die Legende erklärt Farben, Linien und Symbole." },
        { q: "Welcher Operator gehört zu AFB III?", options: ["nennen", "beschreiben", "beurteilen", "zusammenfassen"], answer: 2, explain: "Beurteilen = eigene Meinung mit Gründen = AFB III." },
        { q: "Welches Redemittel passt zu Schritt 6 (offene Fragen)?", options: ["Die Farben bedeuten …", "Die Frage … bleibt unbeantwortet.", "Die Karte mit dem Titel … zeigt …", "Im Norden liegt …"], answer: 1, explain: "Schritt 6 notiert, was die Karte NICHT beantworten kann." },
        { q: "Was gehört zum Schritt 'Beschreiben' im Buch?", options: ["Thema, Zeitraum, Ausschnitt nennen", "eine Meinung begründen", "neue Fragen stellen", "langfristige Entwicklungen erläutern"], answer: 0, explain: "Beschreiben = Thema, Zeitraum, Ausschnitt, Zustand oder Entwicklung." },
      ] },
    ] },

  /* 8 ---------------------------------------------------------------- */
  { id: "training", num: 8, short: "Training", title: "Prüfungstraining", sub: "Hausaufgaben-Check und Aufgaben aus dem Buch",
    blocks: [
      { type: "text", title: "So übst du hier",
        de: "1. Fülle die Tabelle 'Voraussetzungen' selbst aus (in [[stichpunkte|Stichpunkten]]). Dann vergleiche mit der Lösung.\n2. Beantworte die Aufgaben aus dem Buch mündlich oder schriftlich. Dann öffne die Lösung.\n3. Mache den großen Test am Ende.",
        es: "1. Rellena tú misma la tabla 'condiciones' (en palabras clave). Luego compara con la solución.\n2. Responde las tareas del libro oralmente o por escrito. Luego abre la solución.\n3. Haz el gran test al final." },
      { type: "table" },
      { type: "tasks", title: "Nachgefragt, Seite 109", items: [
        { q: "1. Fasse mithilfe der Zeichnung D1 und des VT die Voraussetzungen für die Entstehung und die weitere Entwicklung der Stadt Rom zusammen.", afb: "I",
          de: "Rom entstand an einem günstigen Ort: Der Tiber hatte dort eine Furt und eine Insel, also einen guten Flussübergang. Hügel wie Palatin und Kapitol boten Schutz. Der Boden war fruchtbar, das Klima mild. Das Meer war nur 15 km entfernt, sodass Schiffe Waren über den Tiber ins Landesinnere bringen konnten. Über die Salzstraße lief der Handel mit Salz. An der Furt entstand ein Markt. Um 1000 v. Chr. siedelten Latiner auf den Hügeln; um 700 v. Chr. kamen die Etrusker. Unter ihrem Einfluss wurden die Sümpfe trockengelegt, das Forum und eine Mauer gebaut. Ein König, später adlige Etrusker, regierte Stadt und Umland. Handel und Kriege machten Rom bis 500 v. Chr. zu einer der größten Städte Italiens.",
          es: "Roma surgió en un lugar favorable: el Tíber tenía allí un vado y una isla, un buen paso. Colinas como el Palatino y el Capitolio daban protección. Suelo fértil, clima suave. El mar a 15 km: barcos traían mercancías por el Tíber. Comercio de sal por la vía de la sal. Mercado en el vado. Hacia 1000 a. C. latinos; hacia 700 a. C. etruscos. Bajo su influencia se drenaron pantanos, se construyeron foro y muralla. Un rey, luego nobles etruscos, gobernaba. Comercio y guerras hicieron de Roma una gran ciudad hacia 500 a. C." },
        { q: "2. Arbeite heraus, was wir heute zur Entstehung Roms nur vermuten können, aber nicht sicher wissen (VT).", afb: "II",
          de: "Nur Vermutungen (Signalwörter 'vermutlich', 'wohl', 'angeblich', 'nehmen an'): dass die Hütten so aussahen wie die Tonurnen; dass Romulus die Stadt an dieser Stelle gründete; dass die Etrusker aus verschiedenen Gruppen entstanden und ein Teil aus Kleinasien stammte; dass der Name Rom vom etruskischen 'Ruma' kommt; dass an der Tiberfurt schon früh ein Markt entstand.\n\nSicher (aus Funden): die Tonurnen selbst; Latiner um 1000 v. Chr.; Etrusker um 700 v. Chr.; Mauer, Forum, trockengelegte Sümpfe; etruskische Könige; Rom um 500 v. Chr. eine der größten Städte.",
          es: "Solo suposiciones (palabras señal 'vermutlich', 'wohl', 'angeblich', 'nehmen an'): que las cabañas eran como las urnas; que Rómulo fundó la ciudad allí; el origen de los etruscos de Asia Menor; que el nombre viene de 'Ruma'; que hubo pronto un mercado en el vado.\n\nSeguro (hallazgos): las urnas; latinos hacia 1000 a. C.; etruscos hacia 700 a. C.; muralla, foro, pantanos drenados; reyes etruscos; gran ciudad hacia 500 a. C." },
        { q: "3. Vergleiche die Sage von der Gründung Roms mit dem, was wir heute über die Entstehung Roms wissen und vermuten. Überlege dir zunächst die Vergleichspunkte und trage die Ergebnisse in eine Tabelle ein.", afb: "II",
          de: "Vergleichspunkte: Gründer / Zeitpunkt / Ort / Name / erste Herrscher / Beweise.\n\n• Gründer: Sage = Romulus, Sohn des Mars. Wissenschaft = Latiner, die ihre Dörfer vereinten; später Etrusker.\n• Zeitpunkt: Sage = genau 753 v. Chr. Wissenschaft = langsam, Ende des 8. Jh. v. Chr. (Gemeinsamkeit: 8. Jahrhundert!)\n• Ort: beide = Hügel am Tiber (Gemeinsamkeit).\n• Name: Sage = von Romulus. Wissenschaft = vermutlich etruskisch 'Ruma'.\n• Herrscher: beide = ein König (Gemeinsamkeit); Sage = Romulus; Wissenschaft = latinische, dann etruskische Könige.\n• Beweise: Sage = Erzählung des Livius, Götter. Wissenschaft = Funde (Tonurnen, Mauerreste).",
          es: "Puntos de comparación: fundador / momento / lugar / nombre / primeros gobernantes / pruebas.\n\n• Fundador: leyenda = Rómulo, hijo de Marte. Ciencia = latinos que unen sus aldeas; luego etruscos.\n• Momento: leyenda = exactamente 753 a. C. Ciencia = lentamente, fines del siglo VIII (¡similitud: siglo VIII!)\n• Lugar: ambas = colinas junto al Tíber.\n• Nombre: leyenda = de Rómulo. Ciencia = probablemente 'Ruma' etrusco.\n• Gobernantes: ambas = un rey; leyenda = Rómulo; ciencia = reyes latinos, luego etruscos.\n• Pruebas: leyenda = relato de Livio, dioses. Ciencia = hallazgos." },
        { q: "4. Schreibe einen Brief: Ein römischer Händler erklärt seinem griechischen Geschäftspartner, warum die Römer eine Wölfin mit zwei Kleinkindern auf ihre Münzen prägen (Q2).", afb: "III",
          de: "Bausteine für den Brief:\n\n**Anrede**: 'Lieber Nikos, …' / 'Sei gegrüßt, mein Freund!'\n**Anlass**: 'Du hast mich nach dem Bild auf unserer Münze gefragt.'\n**Die Sage kurz**: 'Bei uns erzählt man, dass unsere Stadt von Romulus und Remus gegründet wurde. Ihr Vater war der Kriegsgott Mars. Ein böser König ließ sie am Tiber aussetzen, aber eine Wölfin fand und säugte sie. Später gründete Romulus im Jahr 753 v. Chr. unsere Stadt.'\n**Warum auf der Münze**: 'Die Wölfin zeigt, dass die Götter Rom beschützen. Jeder, der mit unserem Geld bezahlt, sieht: Rom ist alt, stark und von den Göttern gewollt.'\n**Schluss**: 'Ich hoffe, der Handel mit dem Salz läuft gut. Dein Freund Marcus.'",
          es: "Piezas para la carta:\n\n**Saludo**: 'Querido Nikos…'\n**Motivo**: 'Me preguntaste por la imagen de nuestra moneda.'\n**La leyenda en breve**: 'Entre nosotros se cuenta que nuestra ciudad fue fundada por Rómulo y Remo. Su padre era Marte. Un rey malvado los abandonó en el Tíber, pero una loba los encontró y amamantó. Luego Rómulo fundó nuestra ciudad en 753 a. C.'\n**Por qué en la moneda**: 'La loba muestra que los dioses protegen a Roma. Quien paga con nuestro dinero ve: Roma es antigua, fuerte y querida por los dioses.'\n**Despedida**: 'Espero que el comercio de sal vaya bien. Tu amigo Marcus.'" } ] },
      { type: "tasks", title: "Nachgefragt, Seite 111", items: [
        { q: "1. Errechne die ungefähren Wegzeiten: Händler per Schiff von Neapel bis zur Tibermündung (10 km/h)? Armee aus Veji nach Rom (4 km/h)?", afb: "I",
          de: "Direkte Linie Neapel → Tibermündung: ca. 190–200 km auf der Karte (Maßstabsleiste: 200 km). Wegzeit = 200 km : 10 km/h = **ca. 20 Stunden** (fast einen Tag und eine Nacht ohne Pause).\n\nVeji → Rom: ca. 16 km. Wegzeit = 16 km : 4 km/h = **ca. 4 Stunden**. Eine feindliche Armee konnte also an einem Vormittag vor Rom stehen!",
          es: "Línea directa Nápoles → desembocadura del Tíber: unos 190–200 km. Tiempo = 200 : 10 = **unas 20 horas**.\n\nVeyes → Roma: unos 16 km. Tiempo = 16 : 4 = **unas 4 horas**. ¡Un ejército enemigo podía estar frente a Roma en una mañana!" },
        { q: "2. Beschreibe die Lage Roms und erläutere die damit verbundenen Vor- und Nachteile. Von welchen Nachbarn konnte Rom profitieren? Welche Bedrohungen entstanden aus der Lage?", afb: "II",
          de: "**Lage**: Rom liegt am Tiber, etwa 15 km vom Meer, am südlichen Rand des Etruskergebiets und am Rand des Gebiets der Latiner. Es liegt also an der Nahtstelle zwischen Etruskern und Italikern.\n\n**Vorteile**: Handel mit beiden Seiten; Lernen von den Etruskern (Technik, Kultur) und über sie von den Griechen (Schrift); Tiber als Verkehrsweg; Salz von der Küste.\n\n**Profitieren** konnte Rom besonders von den Etruskern (Nachbarn direkt am Tiber) und von den Griechen (Handel über das Meer, Neapolis und Kyme).\n\n**Bedrohungen**: Die Etrusker waren mächtig und sehr nah (Veji 16 km). Latiner, Sabiner, Aequer und Volsker waren Konkurrenten um Land. Rom hatte keine natürlichen Grenzen (Berge, Meer) als Schutz. Rom musste sich ständig verteidigen.",
          es: "**Situación**: Roma junto al Tíber, a 15 km del mar, en el borde sur del territorio etrusco y en el borde del territorio latino: en el punto de unión.\n\n**Ventajas**: comercio con ambos lados; aprender de los etruscos (técnica, cultura) y de los griegos (escritura); Tíber como vía; sal de la costa.\n\n**Beneficio** sobre todo de etruscos y griegos.\n\n**Amenazas**: etruscos poderosos y muy cerca (Veyes 16 km). Latinos, sabinos, ecuos y volscos rivales por la tierra. Sin fronteras naturales. Roma tenía que defenderse constantemente." },
        { q: "3. Informiere dich, mit welchen auf der Karte genannten Nachbarn die junge Stadt Rom im 6. und 5. Jahrhundert v. Chr. Kriege führte.", afb: "II",
          de: "• **Etrusker (Veji)**: Erbfeind direkt gegenüber. Mehrere Kriege; Veji wurde 396 v. Chr. nach langer Belagerung zerstört.\n• **Etrusker (Clusium)**: Der Etruskerkönig Porsenna aus Clusium griff Rom um 508 v. Chr. an.\n• **Latiner**: Nach dem Ende der Könige (509 v. Chr.) Krieg gegen den Latinerbund; Schlacht am See Regillus um 496 v. Chr.; danach Bündnis.\n• **Sabiner**: Kämpfe im 5. Jh. v. Chr.\n• **Aequer und Volsker**: Immer wieder Kriege im 5. Jh. v. Chr. um das Land südöstlich von Rom.",
          es: "• **Etruscos (Veyes)**: enemigo justo enfrente. Varias guerras; Veyes destruida en 396 a. C.\n• **Etruscos (Clusium)**: el rey Porsena atacó Roma hacia 508 a. C.\n• **Latinos**: guerra contra la liga latina; batalla del lago Regilo hacia 496 a. C.; luego alianza.\n• **Sabinos**: luchas en el siglo V.\n• **Ecuos y volscos**: guerras repetidas en el siglo V por las tierras al sureste de Roma." } ] },
      { type: "quiz", big: true, title: "Der große Test", questions: [
        { q: "Welches Volk siedelte um 1000 v. Chr. auf den Hügeln am Tiber?", options: ["Etrusker", "Griechen", "Latiner", "Samniten"], answer: 2, explain: "Die Latiner kamen um 1000 v. Chr." },
        { q: "Was ist das Forum?", options: ["ein Hügel", "der große öffentliche Platz der Stadt", "die Stadtmauer", "ein Tempel in Griechenland"], answer: 1, explain: "Das Forum entstand auf dem trockengelegten Sumpf." },
        { q: "Welche zwei Gebiete trennt der Tiber bei Rom?", options: ["Etrurien und Latium", "Griechenland und Italien", "Samnium und Kampanien", "Sizilien und Sardinien"], answer: 0, explain: "Nördlich Etrurien, südlich Latium." },
        { q: "Welche Aussage gehört NUR zur Sage?", options: ["Es gab einen König.", "Die Stadt liegt am Tiber.", "Eine Wölfin säugte die Gründer.", "Die Stadt bekam eine Mauer."], answer: 2, explain: "Die Wölfin ist reine Sage." },
        { q: "Wer hat die Sage von Romulus und Remus überliefert?", options: ["Homer", "Livius", "Aeneas", "Pythagoras"], answer: 1, explain: "Der römische Geschichtsschreiber Livius in 'Ab urbe condita'." },
        { q: "Was bedeutet 'Q' im Schulbuch?", options: ["Quiz", "Quelle", "Qualität", "Querverweis"], answer: 1, explain: "Q = Quelle, etwas aus der Vergangenheit selbst." },
        { q: "Welche Farbe haben die Griechen auf der Karte D1 (S. 110)?", options: ["Orange", "Beige", "Grün", "Rot"], answer: 2, explain: "Grün = Griechen." },
        { q: "Wie lange braucht eine Armee mit 4 km/h für 16 km?", options: ["1 Stunde", "4 Stunden", "16 Stunden", "64 Stunden"], answer: 1, explain: "16 : 4 = 4 Stunden." },
        { q: "Welcher Operator verlangt eine eigene begründete Meinung?", options: ["nennen", "beschreiben", "beurteilen", "wiedergeben"], answer: 2, explain: "Beurteilen = AFB III." },
        { q: "Was ist der letzte Schritt der Methode 'Geschichtskarten lesen'?", options: ["Leitfrage festlegen", "Legende erfassen", "Neue, offene Fragen notieren", "Thema benennen"], answer: 2, explain: "Schritt 6: offene Fragen notieren." },
        { type: "cloze", q: "Die Etruskerstadt ___ lag nur ca. 16 km nördlich von Rom.", answers: ["Veji", "veji"], explain: "Veji, der große Konkurrent Roms." },
        { type: "cloze", q: "Der König der Latiner war Feldherr und oberster ___.", answers: ["Priester", "priester"], explain: "Oberster Priester: Er leitete die Opfer für die Götter." },
      ] },
    ] },

  /* 9 ---------------------------------------------------------------- */
  { id: "vokabular", num: 9, short: "Vokabular", title: "Vokabular", sub: "Schwierige Wörter: Deutsch → Spanisch",
    blocks: [
      { type: "text", title: "So lernst du die Wörter",
        de: "Suche ein Wort oder filtere nach Thema. Im **Karteikarten-Modus** siehst du nur das deutsche Wort: Überlege die Bedeutung, dann drehe die Karte um. Alle Wörter sind auch in den Texten unterstrichen: Tippe darauf.",
        es: "Busca una palabra o filtra por tema. En el **modo tarjetas** ves solo la palabra alemana: piensa el significado, luego gira la tarjeta. Todas las palabras están también subrayadas en los textos: tócalas." },
      { type: "glossary" },
    ] },
];
