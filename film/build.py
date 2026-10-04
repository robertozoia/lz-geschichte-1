#!/usr/bin/env python3
"""
Erzeugt den Erklärfilm "Rom – vom Dorf zum Weltreich".

  python3 film/build.py --lang de        # Sprecherin Anna (Deutsch), Untertitel Spanisch
  python3 film/build.py --lang es        # Sprecherin Paulina (Spanisch), Untertitel Deutsch
  python3 film/build.py --lang de --preview   # nur ein Bild pro Szene (Kontrolle)

Braucht: macOS `say`, rsvg-convert, ffmpeg/ffprobe.
"""
import argparse, hashlib, json, math, os, struct, subprocess, sys, wave
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

HERE = Path(__file__).resolve().parent
W, H, FPS = 1280, 720, 24
GAP_LINE, GAP_SCENE = 0.55, 1.1          # Sekunden Pause

# ---------- Farben / Schrift ----------
C = dict(bg="#EEEBE4", fg="#27221E", muted="#6B625A", line="#D9D3C7", accent="#7A2A5C", accent_soft="#F1E3EB",
         tiber="#2E7D8C", tiber_light="#5FA3B5", tiber_pale="#DDF1F6", gold="#C9962B", gold_dark="#8F6512", gold_soft="#F7EBD0",
         ok="#2E7D4F", ok_soft="#E1F0E6", bad="#B23A3A", bad_soft="#F6E0E0", surface="#FFFFFF", surface2="#F6F3EC",
         sea="#CFE0EA", land="#F4F1E8", coast="#9FB5C2", etr="#F2A65A", ita="#F3E4BC", gri="#9DC56C", dot="#C8322B",
         rome_land="#DCE6C6", rome_sea="#AFCFDD", hill="#C9B98A", hill_top="#DACD9F", marsh="#B9CDB3", marsh_line="#6E8A6A",
         field_a="#D6D39A", field_b="#C5C77F", road="#8A6B3F", sun="#F2C14E", far_hill="#CBD4B2", bank="#8FB8C4")
F_DISPLAY = "Baskerville, Hoefler Text, Georgia, serif"
F_BODY = "Avenir Next, Helvetica Neue, Arial, sans-serif"

# ---------- Drehbuch ----------
# Jede Zeile: (deutsch, spanisch). Gesprochen wird je nach --lang, Untertitel in der anderen Sprache.
SCENES = [
 dict(id="titel", kicker="", lines=[
  ("Rom – vom Dorf zum Weltreich.", "Roma: de la aldea al imperio."),
  ("Wie wurde aus ein paar Hütten am Fluss Tiber die größte Stadt der Antike?", "¿Cómo unas pocas cabañas junto al río Tíber se convirtieron en la ciudad más grande de la Antigüedad?"),
  ("In diesem Film reisen wir dreitausend Jahre zurück.", "En esta película viajamos tres mil años atrás."),
 ]),
 dict(id="zeit", kicker="Kapitel 0 · Die Zeit", lines=[
  ("Zuerst die Zeit. Wir rechnen in Jahren vor Christus. Die Zahlen werden kleiner, je näher wir an heute kommen.", "Primero el tiempo. Contamos en años antes de Cristo. Los números bajan cuanto más nos acercamos a hoy."),
  ("Um 1000 v. Chr. bauen die Latiner Hütten auf den Hügeln am Tiber.", "Hacia el año 1000 a. C. los latinos construyen cabañas en las colinas junto al Tíber."),
  ("753 v. Chr. gründet, so sagt die Sage, Romulus die Stadt Rom.", "En 753 a. C., según la leyenda, Rómulo funda la ciudad de Roma."),
  ("Um 700 v. Chr. kommen die Etrusker. Aus den Dörfern wird eine Stadt.", "Hacia 700 a. C. llegan los etruscos. Las aldeas se convierten en una ciudad."),
  ("Um 500 v. Chr. ist Rom schon eine der größten Städte Italiens.", "Hacia 500 a. C. Roma ya es una de las ciudades más grandes de Italia."),
 ]),
 dict(id="landschaft", kicker="Kapitel 1 · Die Landschaft Roms", lines=[
  ("Warum genau hier? Schauen wir uns die Landschaft an.", "¿Por qué justo aquí? Miremos el paisaje."),
  ("Der Fluss Tiber. Schiffe bringen Waren vom Meer ins Landesinnere.", "El río Tíber. Los barcos traen mercancías del mar hacia el interior."),
  ("In der Mitte liegt eine Insel. Hier ist der Fluss flach: eine Furt. Menschen und Wagen können hier durch den Fluss gehen.", "En el medio hay una isla. Aquí el río es poco profundo: un vado. Personas y carros pueden cruzar el río por aquí."),
  ("Am Ufer liegen Hügel: das Kapitol und der Palatin. Sie schützen vor Feinden und vor Hochwasser.", "En la orilla hay colinas: el Capitolio y el Palatino. Protegen de los enemigos y de las inundaciones."),
  ("Der Boden ist fruchtbar, das Klima ist mild. Gut für den Ackerbau.", "El suelo es fértil, el clima es suave. Bueno para la agricultura."),
  ("Das Meer ist nur fünfzehn Kilometer entfernt. Von dort kommt das Salz, über die Salzstraße.", "El mar está a solo quince kilómetros. De allí viene la sal, por la vía de la sal."),
  ("Nördlich des Tibers liegt Etrurien, das Land der Etrusker. Südlich liegt Latium, das Land der Latiner.", "Al norte del Tíber está Etruria, la tierra de los etruscos. Al sur está el Lacio, la tierra de los latinos."),
 ]),
 dict(id="einwanderer", kicker="Kapitel 2 · Latiner und Etrusker", lines=[
  ("Wer lebte hier? Um 1000 v. Chr. kommen die Latiner. Sie sind Bauern und leben in einfachen Hütten.", "¿Quién vivía aquí? Hacia 1000 a. C. llegan los latinos. Son campesinos y viven en cabañas sencillas."),
  ("Das wissen wir von Tonurnen. Diese kleinen Gefäße sehen aus wie Hütten.", "Lo sabemos por las urnas de barro. Estos pequeños recipientes tienen forma de cabaña."),
  ("Jedes Dorf hat einen König. Er ist Feldherr und oberster Priester zugleich.", "Cada aldea tiene un rey. Es general y sumo sacerdote a la vez."),
  ("Um 700 v. Chr. kommen die Etrusker. Ein Teil von ihnen stammt wohl aus Kleinasien.", "Hacia 700 a. C. llegan los etruscos. Una parte de ellos viene probablemente de Asia Menor."),
  ("Von den Etruskern kommt vermutlich der Name der Stadt: Ruma.", "De los etruscos viene probablemente el nombre de la ciudad: Ruma."),
  ("An den Küsten im Süden gründen die Griechen Städte, zum Beispiel Kyme und Neapolis. Auch sie beeinflussen Rom.", "En las costas del sur los griegos fundan ciudades, por ejemplo Cumas y Nápoles. Ellos también influyen en Roma."),
 ]),
 dict(id="wachstum", kicker="Kapitel 3 · Handel und Wachstum", lines=[
  ("An der Furt entsteht ein Markt. Händler bringen Salz, Getreide und Waren von nah und fern.", "En el vado surge un mercado. Los comerciantes traen sal, cereales y mercancías de cerca y de lejos."),
  ("Die Dörfer auf den Hügeln wachsen zusammen. Gemeinsam kann man sich besser verteidigen.", "Las aldeas de las colinas se unen. Juntos pueden defenderse mejor."),
  ("Unter dem Einfluss der Etrusker bekommt die Stadt eine Mauer.", "Bajo la influencia de los etruscos la ciudad recibe una muralla."),
  ("Der Sumpf zwischen den Hügeln wird trockengelegt. Hier entsteht das Forum, der große Platz der Stadt.", "El pantano entre las colinas se drena. Aquí surge el Foro, la gran plaza de la ciudad."),
  ("Mächtige adlige Etrusker werden Könige von Rom. Sie regieren die Stadt und das Land ringsum.", "Poderosos nobles etruscos se convierten en reyes de Roma. Gobiernan la ciudad y las tierras de alrededor."),
  ("Die meisten Bürger sind Bauern. Aber das Zentrum von Politik und Handel ist die Stadt.", "La mayoría de los ciudadanos son campesinos. Pero el centro de la política y del comercio es la ciudad."),
  ("Handel und erfolgreiche Kriege machen Rom bis 500 v. Chr. zu einer der größten Städte Italiens.", "El comercio y las guerras exitosas hacen de Roma, hacia 500 a. C., una de las ciudades más grandes de Italia."),
 ]),
 dict(id="sage", kicker="Kapitel 4 · Die Sage von Romulus und Remus", lines=[
  ("Die Römer selbst erzählten die Gründung anders. Das ist die Sage von Romulus und Remus.", "Los propios romanos contaban la fundación de otra manera. Esta es la leyenda de Rómulo y Remo."),
  ("Der König der Latiner wird von seinem Bruder Amulius entmachtet und vertrieben.", "El rey de los latinos es destituido y expulsado por su hermano Amulio."),
  ("Die Königstochter Rhea Silvia bekommt Zwillinge. Ihr Vater ist der Kriegsgott Mars.", "La hija del rey, Rea Silvia, tiene gemelos. Su padre es el dios de la guerra, Marte."),
  ("Amulius hat Angst um seinen Thron. Die Babys werden in einem Korb am Tiber ausgesetzt.", "Amulio teme por su trono. Los bebés son abandonados en una cesta junto al Tíber."),
  ("Eine Wölfin findet die Zwillinge und säugt sie.", "Una loba encuentra a los gemelos y los amamanta."),
  ("Ein Hirte findet die Kinder und zieht sie groß.", "Un pastor encuentra a los niños y los cría."),
  ("Als Erwachsene töten die Brüder Amulius und gründen eine eigene Stadt, im Jahr 753 v. Chr.", "De adultos, los hermanos matan a Amulio y fundan su propia ciudad, en el año 753 a. C."),
  ("Romulus baut eine Mauer. Remus verspottet ihn und springt darüber. Da tötet Romulus seinen Bruder.", "Rómulo construye una muralla. Remo se burla de él y salta por encima. Entonces Rómulo mata a su hermano."),
  ("Romulus wird der erste König. Die Stadt bekommt seinen Namen: Rom.", "Rómulo se convierte en el primer rey. La ciudad recibe su nombre: Roma."),
 ]),
 dict(id="vergleich", kicker="Kapitel 5 · Sage oder Wissenschaft?", lines=[
  ("Sage oder Wissenschaft? Was stimmt?", "¿Leyenda o ciencia? ¿Qué es cierto?"),
  ("Beide sagen: Rom entsteht im achten Jahrhundert v. Chr., am Tiber, auf Hügeln, mit einem König und einer Mauer.", "Ambas dicen: Roma surge en el siglo octavo a. C., junto al Tíber, sobre colinas, con un rey y una muralla."),
  ("Nur die Sage sagt: Romulus, die Wölfin und der Gott Mars.", "Solo la leyenda dice: Rómulo, la loba y el dios Marte."),
  ("Nur die Wissenschaft sagt: Die Latiner vereinen ihre Dörfer, Etrusker werden Könige, und der Name kommt wohl von Ruma.", "Solo la ciencia dice: los latinos unen sus aldeas, los etruscos se hacen reyes, y el nombre viene probablemente de Ruma."),
  ("Die Wissenschaft hat Beweise: Funde wie Tonurnen und Mauerreste. Die Sage ist eine Erzählung, aufgeschrieben von Livius.", "La ciencia tiene pruebas: hallazgos como urnas y restos de murallas. La leyenda es un relato, escrito por Livio."),
  ("Eine Münze aus dem Jahr 137 v. Chr. zeigt die Wölfin. Die Römer waren stolz auf ihre Sage.", "Una moneda del año 137 a. C. muestra a la loba. Los romanos estaban orgullosos de su leyenda."),
 ]),
 dict(id="italien", kicker="Kapitel 6 · Völker Italiens im 6. Jh. v. Chr.", lines=[
  ("Jetzt die Karte aus dem Buch: Völker Italiens im sechsten Jahrhundert v. Chr.", "Ahora el mapa del libro: pueblos de Italia en el siglo sexto a. C."),
  ("Orange: die Etrusker. Ein großes Gebiet mit vielen Städten, aber ohne Hauptstadt.", "Naranja: los etruscos. Un territorio grande con muchas ciudades, pero sin capital."),
  ("Beige: die Italiker. Viele verschiedene Völker wie Latiner, Sabiner und Samniten. Sie leben als Bauern, ohne große Städte.", "Beige: los itálicos. Muchos pueblos distintos como latinos, sabinos y samnitas. Viven como campesinos, sin grandes ciudades."),
  ("Grün: die Griechen. Stadtstaaten an den Küsten im Süden, ausgerichtet auf das Meer.", "Verde: los griegos. Ciudades-estado en las costas del sur, orientadas al mar."),
  ("Und Rom? Rom liegt genau an der Nahtstelle zwischen Etruskern und Italikern.", "¿Y Roma? Roma está justo en el punto de unión entre etruscos e itálicos."),
  ("Das ist eine Chance: Handel mit beiden Seiten. Und eine Gefahr: Die Etruskerstadt Veji ist nur sechzehn Kilometer entfernt. Eine Armee braucht vier Stunden bis Rom.", "Es una oportunidad: comercio con ambos lados. Y un peligro: la ciudad etrusca de Veyes está a solo dieciséis kilómetros. Un ejército tarda cuatro horas en llegar a Roma."),
 ]),
 dict(id="methode", kicker="Kapitel 7 · Geschichtskarten lesen", lines=[
  ("Zum Schluss: So liest du eine Geschichtskarte, in sechs Schritten.", "Para terminar: así se lee un mapa histórico, en seis pasos."),
  ("Eins: Leitfrage festlegen. Zwei: Thema benennen, mit Titel und Zeitraum. Drei: die Legende erfassen, die Farben und Zeichen.", "Uno: fijar la pregunta guía. Dos: nombrar el tema, con título y período. Tres: entender la leyenda, los colores y los signos."),
  ("Vier: die Karte beschreiben und auswerten. Wo liegt was? Was fällt auf?", "Cuatro: describir y evaluar el mapa. ¿Dónde está cada cosa? ¿Qué llama la atención?"),
  ("Fünf: einen zusammenfassenden Text schreiben. Zum Beispiel: Insgesamt kann man feststellen, dass Italien in viele Gebiete aufgeteilt war.", "Cinco: escribir un texto resumen. Por ejemplo: En conjunto se puede afirmar que Italia estaba dividida en muchos territorios."),
  ("Sechs: offene Fragen notieren. Zum Beispiel: Die Frage, ob die Völker Krieg führten, bleibt unbeantwortet.", "Seis: anotar preguntas abiertas. Por ejemplo: La pregunta de si los pueblos hacían la guerra queda sin respuesta."),
 ]),
 dict(id="ende", kicker="", lines=[
  ("Das war die Reise vom Dorf zum Weltreich. Lage, Handel, Einwanderer, Könige und eine Sage machten Rom groß.", "Este fue el viaje de la aldea al imperio. La situación, el comercio, los inmigrantes, los reyes y una leyenda hicieron grande a Roma."),
  ("Viel Erfolg bei der Prüfung!", "¡Mucho éxito en el examen!"),
 ]),
]

VOICES = {"de": "Anna", "es": "Paulina"}

def spoken(text, lang):
    if lang == "de":
        return text.replace("v. Chr.", "vor Christus").replace("n. Chr.", "nach Christus").replace("Jh.", "Jahrhundert")
    return text.replace("a. C.", "antes de Cristo").replace("d. C.", "después de Cristo")

# ---------- Hilfsfunktionen ----------
def clamp(x, a=0.0, b=1.0): return max(a, min(b, x))
def ease(x): x = clamp(x); return 1 - (1 - x) ** 3
def ease_io(x): x = clamp(x); return 0.5 - 0.5 * math.cos(math.pi * x)
def lerp(a, b, t): return a + (b - a) * t
def esc(s): return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def text(x, y, s, size=24, font=F_BODY, fill=None, anchor="start", weight="normal", opacity=1, style="normal", spacing=0, extra=""):
    fill = fill or C["fg"]
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-family="{font}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" '
            f'font-weight="{weight}" font-style="{style}" letter-spacing="{spacing}" opacity="{opacity:.3f}" {extra}>{esc(s)}</text>')

def g(content, opacity=1.0, transform=""):
    return f'<g opacity="{clamp(opacity):.3f}" transform="{transform}">{content}</g>'

def pop(x, y, content, p):
    """erscheint mit kleiner Skalierung"""
    s = lerp(0.6, 1.0, ease(p))
    return g(content, opacity=p, transform=f"translate({x:.1f} {y:.1f}) scale({s:.3f}) translate({-x:.1f} {-y:.1f})")

def poly_len(pts):
    return sum(math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1))

def poly_at(pts, frac):
    """Punkt bei Anteil frac der Polylinie"""
    L = poly_len(pts) * clamp(frac); acc = 0
    for i in range(len(pts) - 1):
        d = math.dist(pts[i], pts[i + 1])
        if acc + d >= L and d > 0:
            u = (L - acc) / d
            return (lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u))
        acc += d
    return pts[-1]

def partial(pts, frac):
    L = poly_len(pts) * clamp(frac); out = [pts[0]]; acc = 0
    for i in range(len(pts) - 1):
        d = math.dist(pts[i], pts[i + 1])
        if acc + d >= L:
            u = (L - acc) / d if d else 0
            out.append((lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u))); return out
        out.append(pts[i + 1]); acc += d
    return out

def pts_str(pts): return " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)

def polyline(pts, stroke, width=4, dash="", opacity=1, cap="round", fill="none"):
    return (f'<polyline points="{pts_str(pts)}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" stroke-linecap="{cap}" '
            f'stroke-linejoin="round" stroke-dasharray="{dash}" opacity="{opacity:.3f}"/>')

def polygon(pts, fill, stroke="none", width=1, opacity=1):
    return f'<polygon points="{pts_str(pts)}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" opacity="{opacity:.3f}"/>'

def bezier_pts(p0, p1, p2, p3, n=40):
    out = []
    for i in range(n + 1):
        u = i / n; a = (1 - u) ** 3; b = 3 * (1 - u) ** 2 * u; c = 3 * (1 - u) * u ** 2; d = u ** 3
        out.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
    return out

def arrow_head(pts, color, size=14):
    if len(pts) < 2: return ""
    (x1, y1), (x2, y2) = pts[-2], pts[-1]
    a = math.atan2(y2 - y1, x2 - x1)
    p = [(x2, y2), (x2 - size * math.cos(a - 0.5), y2 - size * math.sin(a - 0.5)), (x2 - size * math.cos(a + 0.5), y2 - size * math.sin(a + 0.5))]
    return polygon(p, color)

ICONS = {
  "wolf": "M10 44 L14 30 L22 26 L36 26 L46 22 L52 16 L58 18 L56 24 L60 28 L52 30 L48 36 L46 48 L41 48 L40 38 L30 40 L28 48 L23 48 L22 40 L16 40 L14 48 L10 48 Z",
  "crown": "M10 46 L10 22 L22 34 L32 14 L42 34 L54 22 L54 46 Z",
  "basket": "M14 30 L50 30 L46 52 L18 52 Z M22 30 Q32 10 42 30 M8 20 Q32 34 56 20",
  "shepherd": "M20 10 Q28 6 30 14 Q30 20 26 20 L26 56 M44 14 A6 6 0 1 1 44 26 M44 26 L44 56 M44 32 L34 40 M44 32 L54 40",
  "sword": "M32 6 L36 10 L36 40 L28 40 L28 10 Z M18 44 L46 44 M32 44 L32 58",
  "mars": "M28 54 A16 16 0 1 1 40 28 M40 28 L54 14 M42 14 L54 14 L54 26",
  "urn": "M22 58 L18 30 L24 24 L40 24 L46 30 L42 58 Z M16 24 L32 8 L48 24 M28 40 L36 40 L36 48 L28 48 Z",
  "ship": "M8 40 L56 40 L50 52 L14 52 Z M32 12 L32 40 M32 14 L50 30 L32 30 Z",
  "salt": "M14 50 L32 14 L50 50 Z M26 42 L38 42 M32 30 L32 50",
  "wall": "M6 56 L6 34 L58 34 L58 56 Z M6 45 L58 45 M19 34 L19 45 M45 34 L45 45 M32 45 L32 56 M12 34 L12 26 L22 26 L22 34 M42 34 L42 26 L52 26 L52 34 M27 34 L27 22 L37 22 L37 34",
  "map": "M8 14 L24 8 L40 14 L56 8 L56 50 L40 56 L24 50 L8 56 Z M24 8 L24 50 M40 14 L40 56",
  "market": "M8 28 L32 10 L56 28 M12 28 L12 54 L52 54 L52 28 M26 54 L26 38 L38 38 L38 54",
  "people": "M20 20 A6 6 0 1 1 20.1 20 M44 20 A6 6 0 1 1 44.1 20 M8 54 Q8 34 20 34 Q32 34 32 54 M32 54 Q32 34 44 34 Q56 34 56 54",
  "city": "M6 56 L58 56 M10 56 L10 30 L22 30 L22 56 M26 56 L26 18 L38 18 L38 56 M42 56 L42 36 L54 36 L54 56 M30 24 L34 24 M30 32 L34 32 M30 40 L34 40",
  "clock": "M32 8 A24 24 0 1 1 31.9 8 M32 16 L32 32 L44 38",
}
def icon(name, x, y, size=64, color=None, width=3, fill="none", opacity=1):
    color = color or C["accent"]; s = size / 64
    return (f'<g transform="translate({x:.1f} {y:.1f}) scale({s:.3f})" opacity="{opacity:.3f}">'
            f'<path d="{ICONS[name]}" fill="{fill}" stroke="{color}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"/></g>')

def coin(x, y, r, t, spin=True):
    sx = abs(math.cos(t * 1.6)) if spin else 1
    sx = max(sx, 0.08)
    inner = (f'<circle r="{r}" fill="{C["gold"]}" stroke="{C["gold_dark"]}" stroke-width="{r*0.06:.1f}"/>'
             f'<circle r="{r*0.86:.1f}" fill="none" stroke="{C["gold_dark"]}" stroke-width="{r*0.03:.1f}" stroke-dasharray="{r*0.08:.1f} {r*0.05:.1f}"/>'
             f'<g transform="translate({-r*0.78:.1f} {-r*0.72:.1f}) scale({r/41:.3f})"><path d="{ICONS["wolf"]}" fill="{C["gold_dark"]}"/>'
             f'<circle cx="26" cy="54" r="3.5" fill="{C["gold_dark"]}"/><circle cx="36" cy="54" r="3.5" fill="{C["gold_dark"]}"/></g>'
             f'<text y="{r*0.72:.1f}" text-anchor="middle" font-family="{F_DISPLAY}" font-size="{r*0.3:.1f}" font-weight="bold" fill="{C["gold_dark"]}" letter-spacing="2">ROMA</text>')
    return f'<g transform="translate({x} {y}) scale({sx:.3f} 1)">{inner}</g>'

def hut(x, y, s=1.0, color=None):
    color = color or C["road"]
    return (f'<g transform="translate({x:.1f} {y:.1f}) scale({s:.3f})"><path d="M-14 10 L0 -14 L14 10 Z" fill="{color}"/>'
            f'<rect x="-9" y="10" width="18" height="10" fill="{C["hill"]}" stroke="{color}" stroke-width="1.5"/></g>')

def house(x, y, s=1.0):
    return (f'<g transform="translate({x:.1f} {y:.1f}) scale({s:.3f})"><rect x="-12" y="-4" width="24" height="18" fill="{C["surface"]}" stroke="{C["road"]}" stroke-width="2"/>'
            f'<path d="M-15 -4 L0 -18 L15 -4 Z" fill="{C["bad"]}" opacity="0.8"/></g>')

def person(x, y, s=1.0, color=None):
    color = color or C["fg"]
    return (f'<g transform="translate({x:.1f} {y:.1f}) scale({s:.3f})"><circle cy="-22" r="6" fill="{color}"/>'
            f'<path d="M0 -14 L0 6 M0 -10 L-9 0 M0 -10 L9 0 M0 6 L-7 20 M0 6 L7 20" stroke="{color}" stroke-width="3.5" stroke-linecap="round" fill="none"/></g>')

def sub_panel(x, y, w, h, content, opacity=1, fill=None, stroke=None, r=14):
    fill = fill or C["surface"]; stroke = stroke or C["line"]
    return g(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}"/>{content}', opacity)

# ---------- Italien-Karte ----------
DATA = json.loads((HERE / "italy.json").read_text())
ITALY = DATA["ITALY"]
def make_proj(x0, y0, w, h):
    b = ITALY["bounds"]
    def P(lon, lat):
        return (x0 + (lon - b["lonMin"]) / (b["lonMax"] - b["lonMin"]) * w, y0 + (b["latMax"] - lat) / (b["latMax"] - b["latMin"]) * h)
    return P

def italy_map(P, x0, y0, w, h, etr=1.0, ita=1.0, gri=1.0, labels=True, cities=True, city_filter=None, clip_id="clip"):
    out = [f'<clipPath id="{clip_id}"><rect x="{x0}" y="{y0}" width="{w}" height="{h}"/></clipPath>',
           f'<g clip-path="url(#{clip_id})">',
           f'<rect x="{x0}" y="{y0}" width="{w}" height="{h}" fill="{C["sea"]}"/>']
    land = [P(*p) for p in ITALY["land"]]
    out.append(f'<clipPath id="{clip_id}-land"><polygon points="{pts_str(land)}"/>' + "".join(f'<polygon points="{pts_str([P(*p) for p in isl])}"/>' for isl in ITALY["islands"]) + '</clipPath>')
    out.append(polygon(land, C["land"], C["coast"], 1.5))
    for isl in ITALY["islands"]:
        out.append(polygon([P(*p) for p in isl], C["land"], C["coast"], 1.5))
    out.append(f'<g clip-path="url(#{clip_id}-land)">')
    for r in ITALY["regions"]:
        op = {"etrusker": etr, "italiker": ita, "griechen": gri}[r["group"]]
        if op <= 0: continue
        col = {"etrusker": C["etr"], "italiker": C["ita"], "griechen": C["gri"]}[r["group"]]
        out.append(polygon([P(*p) for p in r["pts"]], col, C["land"], 1, op))
    out.append('</g>')
    if labels:
        for l in ITALY["labels"]:
            x, y = P(l["lon"], l["lat"]); grp = l["group"]
            op = {"etrusker": etr, "italiker": ita, "griechen": gri}.get(grp, 1.0)
            if op <= 0.05: continue
            if grp == "meer":
                out.append(text(x, y, l["text"], 12, F_BODY, "#4A6C7E", "middle", style="italic", opacity=op, spacing=1, extra=(f'transform="rotate({l["rotate"]} {x:.1f} {y:.1f})"' if l.get("rotate") else "")))
            elif grp == "insel":
                out.append(text(x, y, l["text"], 11, F_BODY, C["muted"], "middle", style="italic", opacity=op))
            elif l.get("big"):
                out.append(text(x, y, l["text"], 15, F_DISPLAY, C["fg"], "middle", weight="bold", opacity=op, spacing=2))
            else:
                out.append(text(x, y, l["text"], 12, F_BODY, C["fg"] if grp != "andere" else C["muted"], "middle", style="italic", opacity=op))
    if cities:
        for c in ITALY["cities"]:
            if city_filter and c["id"] not in city_filter: continue
            x, y = P(c["lon"], c["lat"])
            col = C["accent"] if c["id"] == "rom" else C["dot"]
            r = 5.5 if c["id"] == "rom" else 3.8
            out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{col}" stroke="white" stroke-width="1.2"/>')
            anchor, dx, dy = {"caere": ("end", -7, 4), "tarquinii": ("end", -7, 4), "ostia": ("end", -7, 12), "kyme": ("end", -7, 12), "metapont": ("end", -7, 12), "epidaurus": ("end", -7, 4), "antipolis": ("start", 7, 12), "veji": ("start", 7, -5)}.get(c["id"], ("start", 7, 4))
            out.append(text(x + dx, y + dy, c["name"], 13 if c["id"] == "rom" else 11, F_BODY, C["fg"], anchor, weight="bold" if c["id"] == "rom" else "normal", extra='stroke="#F4F1E8" stroke-width="3" paint-order="stroke"'))
    out.append('</g>')
    return "".join(out)

def city_xy(P, cid):
    c = next(c for c in ITALY["cities"] if c["id"] == cid); return P(c["lon"], c["lat"])

# ---------- Landschaft Roms ----------
TIBER_BEZ = [((335, -10), (320, 60), (275, 100), (298, 150)), ((298, 150), (320, 200), (400, 215), (400, 250)), ((400, 250), (400, 290), (430, 320), (385, 352)), ((385, 352), (335, 385), (200, 405), (125, 460)), ((125, 460), (115, 475), (105, 490), (100, 510))]
TIBER_PTS = [p for seg in TIBER_BEZ for p in bezier_pts(*seg, n=24)]
ROAD_BEZ = [((150, 418), (170, 370), (180, 340), (215, 330)), ((215, 330), (290, 315), (360, 322), (420, 303)), ((420, 303), (500, 278), (560, 262), (640, 240)), ((640, 240), (700, 224), (760, 205), (800, 196))]
ROAD_PTS = [p for seg in ROAD_BEZ for p in bezier_pts(*seg, n=16)]

def rome_scene(t, hl):
    """hl: dict mit Hervorhebungen 0..1: river, ford, hills, fields, sea, regions"""
    o = []
    o.append(f'<rect width="800" height="500" fill="{C["rome_land"]}"/>')
    # Felder
    fo = hl.get("fields", 0)
    o.append(f'<g opacity="{0.35 + 0.65*fo:.3f}"><path d="M560 470 L800 380 L800 500 L520 500 Z" fill="{C["field_a"]}"/>'
             + "".join(f'<line x1="{560+i*24}" y1="{470-i*9}" x2="{640+i*24}" y2="{440-i*9}" stroke="{C["field_b"]}" stroke-width="5"/>' for i in range(9))
             + f'<path d="M0 230 L120 200 L150 300 L40 330 Z" fill="{C["field_a"]}" opacity="0.7"/></g>')
    for cx, cy, rx, ry in [(90, 130, 70, 22), (200, 110, 60, 18), (40, 60, 50, 16), (640, 150, 60, 18), (740, 120, 55, 16)]:
        o.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{C["far_hill"]}"/>')
    # Meer
    so = hl.get("sea", 0)
    o.append(f'<path d="M0 360 Q70 380 110 420 Q150 460 190 500 L0 500 Z" fill="{C["rome_sea"]}"/>')
    o.append(text(16, 486, "Mittelmeer", 15, F_BODY, "#4A6C7E", style="italic"))
    # Tiber
    o.append(polyline(TIBER_PTS, C["bank"], 30)); o.append(polyline(TIBER_PTS, C["tiber_light"], 22))
    o.append(polyline(TIBER_PTS, C["tiber_pale"], 3, dash="10 22", opacity=0.8).replace('stroke-dasharray=', f'stroke-dashoffset="{-t*22:.1f}" stroke-dasharray='))
    o.append(text(262, 130, "Tiber", 15, F_BODY, C["fg"], style="italic", extra='transform="rotate(-60 262 130)"'))
    # Insel + Furt
    o.append(f'<ellipse cx="398" cy="262" rx="11" ry="24" fill="{C["rome_land"]}" stroke="{C["bank"]}" stroke-width="2"/>')
    for cx, cy in [(392, 318), (404, 312), (416, 307), (428, 303), (440, 299)]:
        o.append(f'<circle cx="{cx}" cy="{cy}" r="3.2" fill="{C["hill_top"]}" stroke="{C["road"]}"/>')
    # Straße
    o.append(polyline(ROAD_PTS, C["road"], 3, dash="8 6").replace('stroke-dasharray=', f'stroke-dashoffset="{-t*14:.1f}" stroke-dasharray='))
    o.append(text(262, 352, "Salzstraße", 14, F_BODY, C["fg"], style="italic", extra='transform="rotate(-8 262 352)"'))
    # Hügel
    for cx, cy, rx, ry, cx2, cy2, rx2, ry2 in [(505, 195, 58, 40, 505, 185, 36, 20), (560, 330, 68, 44, 560, 318, 42, 22)]:
        o.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{C["hill"]}"/><ellipse cx="{cx2}" cy="{cy2}" rx="{rx2}" ry="{ry2}" fill="{C["hill_top"]}"/>')
    for x, y in [(540, 312), (560, 306), (580, 314), (552, 326)]:
        o.append(f'<path d="M{x-7} {y+6} L{x} {y-6} L{x+7} {y+6} Z" fill="{C["road"]}"/>')
    # Sumpf
    o.append(f'<ellipse cx="540" cy="262" rx="48" ry="22" fill="{C["marsh"]}"/>' + "".join(f'<path d="M{500+i*12} 262 q3 -4 6 0 t6 0" fill="none" stroke="{C["marsh_line"]}"/>' for i in range(7)))
    o.append(text(505, 190, "Kapitol", 16, F_BODY, C["fg"], "middle", "bold")); o.append(text(560, 350, "Palatin", 16, F_BODY, C["fg"], "middle", "bold"))
    ro = hl.get("regions", 0)
    o.append(text(150, 60, "Etrurien", 24, F_DISPLAY, C["accent"], weight="bold", opacity=0.25 + 0.75 * ro, spacing=2))
    o.append(text(640, 80, "Latium", 24, F_DISPLAY, C["accent"], weight="bold", opacity=0.25 + 0.75 * ro, spacing=2))
    o.append(text(30, 395, "ca. 15 km", 13, F_BODY, C["fg"], opacity=0.4 + 0.6 * so))
    # Sonne
    o.append(f'<circle cx="720" cy="40" r="16" fill="{C["sun"]}"/>' + "".join(f'<line x1="{720+math.cos(i*math.pi/4)*22:.1f}" y1="{40+math.sin(i*math.pi/4)*22:.1f}" x2="{720+math.cos(i*math.pi/4)*(30+3*math.sin(t*3+i)):.1f}" y2="{40+math.sin(i*math.pi/4)*(30+3*math.sin(t*3+i)):.1f}" stroke="{C["sun"]}" stroke-width="3" stroke-linecap="round"/>' for i in range(8)))
    # Hervorhebungen (Ringe)
    def ring(cx, cy, r, p):
        if p <= 0: return ""
        pulse = 1 + 0.08 * math.sin(t * 5)
        return f'<circle cx="{cx}" cy="{cy}" r="{r*pulse:.1f}" fill="none" stroke="{C["accent"]}" stroke-width="4" stroke-dasharray="10 7" opacity="{p:.3f}"/>'
    o.append(ring(412, 290, 52, hl.get("ford", 0)))
    o.append(ring(505, 195, 70, hl.get("hills", 0))); o.append(ring(560, 330, 80, hl.get("hills", 0)))
    o.append(ring(130, 430, 70, hl.get("sea", 0)))
    o.append(ring(690, 440, 90, hl.get("fields", 0)))
    # Schiff auf dem Fluss
    bp = hl.get("boat", -1)
    if 0 <= bp <= 1:
        bx, by = poly_at(TIBER_PTS, 0.92 - 0.6 * bp)
        o.append(icon("ship", bx - 16, by - 20, 32, C["fg"], 3, C["surface"]))
    return "".join(o)

# ---------- Szenen ----------
def frame_title(ctx):
    t = ctx.t; o = []
    for i, (yb, col) in enumerate([(430, "#CBD4B2"), (480, C["rome_land"]), (540, "#C9D6A8")]):
        sh = math.sin(t * 0.3 + i) * 12
        o.append(f'<path d="M{-40+sh} {yb+30} C300 {yb-60} 500 {yb+80} 800 {yb-30} S1100 {yb-80} 1320 {yb+20} L1320 720 L-40 720Z" fill="{col}"/>')
    rp = [(0, 520), (200, 560), (420, 530), (640, 590), (900, 560), (1280, 610)]
    o.append(polyline(rp, C["tiber_light"], 26)); o.append(polyline(rp, C["tiber_pale"], 3, dash="12 24").replace('stroke-dasharray=', f'stroke-dashoffset="{-t*30:.1f}" stroke-dasharray='))
    o.append(f'<circle cx="1100" cy="110" r="46" fill="{C["sun"]}" opacity="0.9"/>')
    for i, (x, y) in enumerate([(300, 470), (340, 455), (900, 480), (940, 500), (1080, 440)]):
        o.append(hut(x, y, 1.1))
    p1 = ease(ctx.since(0) / 1.0)
    o.append(g(coin(640, 250, 95, t), p1))
    o.append(text(640, 400, "Rom", 92, F_DISPLAY, C["accent"], "middle", "bold", opacity=p1, spacing=4))
    p2 = ease((ctx.since(0) - 0.8) / 0.8)
    o.append(text(640, 445, "Vom Dorf zum Weltreich", 36, F_DISPLAY, C["fg"], "middle", opacity=p2, spacing=3))
    p3 = ease(ctx.since(2) / 0.8)
    o.append(text(640, 490, "Geschichte · Kapitel 5 · Seiten 108–111", 20, F_BODY, C["muted"], "middle", opacity=p3, spacing=1))
    return "".join(o)

def frame_zeit(ctx):
    t = ctx.t; o = []
    events = [("um 1000 v. Chr.", "Latiner: Hütten am Tiber", 1), ("753 v. Chr.", "Sage: Romulus gründet Rom", 2), ("um 700 v. Chr.", "Etrusker kommen · Stadt", 3), ("um 500 v. Chr.", "eine der größten Städte", 4)]
    x0, x1, y = 160, 1120, 330
    p_axis = ease(ctx.since(0) / 1.5)
    o.append(f'<line x1="{x0-60}" y1="{y}" x2="{x0-60+(x1-x0+140)*p_axis:.1f}" y2="{y}" stroke="{C["line"]}" stroke-width="6" stroke-linecap="round"/>')
    o.append(g(f'<path d="M{x1+70} {y-12} L{x1+88} {y} L{x1+70} {y+12}" fill="none" stroke="{C["line"]}" stroke-width="6" stroke-linecap="round"/>', p_axis))
    o.append(text(x0 - 60, y + 60, "früher", 18, F_BODY, C["muted"], "middle", opacity=p_axis)); o.append(text(x1 + 70, y + 60, "heute →", 18, F_BODY, C["muted"], "middle", opacity=p_axis))
    o.append(text(640, 110, "Wir rechnen in Jahren v. Chr.", 44, F_DISPLAY, C["accent"], "middle", "bold", opacity=ease(ctx.since(0) / 0.8)))
    o.append(text(640, 155, "Die Zahlen werden kleiner, je näher wir an heute kommen.", 22, F_BODY, C["muted"], "middle", opacity=ease((ctx.since(0) - 1.5) / 0.8)))
    for i, (lbl, desc, li) in enumerate(events):
        x = x0 + i * (x1 - x0) / 3
        p = ease(ctx.since(li) / 0.6)
        active = ctx.li == li
        col = C["accent"] if active else C["gold"]
        o.append(pop(x, y, f'<circle cx="{x}" cy="{y}" r="{18 if active else 14}" fill="{col}" stroke="{C["gold_dark"] if not active else C["accent"]}" stroke-width="4"/>', p))
        o.append(text(x, y - 40, lbl, 26, F_DISPLAY, C["fg"], "middle", "bold", opacity=p))
        o.append(text(x, y + 100, desc, 19, F_BODY, C["fg"], "middle", opacity=p))
        ic = ["", "urn", "wolf", "wall", "city"][li]
        o.append(g(icon(ic, x - 28, y + 120, 56, C["accent"], 3), p))
    return "".join(o)

def frame_landschaft(ctx):
    s = ctx.since
    hl = dict(boat=(s(1) - 0.2) / 4.5 if s(1) > 0 else -1, ford=ease(s(2) / 0.6) * (1 if ctx.li == 2 else 0.35), hills=ease(s(3) / 0.6) * (1 if ctx.li == 3 else 0.35),
              fields=ease(s(4) / 0.6), sea=ease(s(5) / 0.6) * (1 if ctx.li == 5 else 0.5), regions=ease(s(6) / 0.6))
    o = [f'<clipPath id="romeclip"><rect x="40" y="50" width="840" height="525" rx="12"/></clipPath><g clip-path="url(#romeclip)"><g transform="translate(40 50) scale(1.05)">{rome_scene(ctx.t, hl)}</g></g>']
    o.append(f'<rect x="40" y="50" width="840" height="525" rx="12" fill="none" stroke="{C["line"]}" stroke-width="2"/>')
    # Seitenleiste mit Stichpunkten
    items = [(1, "Tiber: Waren vom Meer"), (2, "Insel + Furt: Flussübergang"), (3, "Hügel: Schutz"), (4, "fruchtbar, mildes Klima"), (5, "15 km zum Meer, Salz"), (6, "Etrurien | Latium")]
    o.append(text(910, 85, "Voraussetzungen", 24, F_DISPLAY, C["accent"], weight="bold"))
    for i, (li, s_) in enumerate(items):
        p = ease(s(li) / 0.5); y = 135 + i * 52
        o.append(g(f'<circle cx="922" cy="{y-7}" r="7" fill="{C["accent"] if ctx.li == li else C["gold"]}"/>' + text(940, y, s_, 18, F_BODY, C["fg"], weight="bold" if ctx.li == li else "normal"), p))
    return "".join(o)

def frame_einwanderer(ctx):
    s = ctx.since; t = ctx.t; o = []
    x0, y0, w, h = 60, 30, 520, 585
    P = make_proj(x0, y0, w, h)
    gp = ease(s(5) / 0.6)
    o.append(italy_map(P, x0, y0, w, h, etr=0.25 + 0.5 * ease(s(3) / 0.6), ita=0.25 + 0.45 * ease(s(0) / 0.6), gri=0.15 + 0.85 * gp, labels=False, cities=True, city_filter=["rom", "veji", "kyme", "neapolis", "tarent", "felsina"]))
    rx, ry = city_xy(P, "rom")
    routes = [("latiner", [P(14.6, 44.3), P(13.6, 43.2), P(12.9, 42.4), P(12.55, 41.95)], C["accent"], 0), ("etrusker", [P(19.2, 38.6), P(16.0, 39.9), P(13.0, 41.4), P(11.9, 42.3), P(11.5, 42.9)], C["etr"], 3), ("griechen", [P(19.2, 39.9), P(17.6, 40.1), P(16.0, 39.9), P(14.6, 40.4), P(14.2, 40.8)], C["gri"], 5)]
    for name, pts, col, li in routes:
        p = ease(s(li) / 1.6)
        if p > 0:
            part = partial(pts, p); o.append(polyline(part, col, 6)); o.append(arrow_head(part, col, 16) if p > 0.2 else "")
    # Hütten um Rom
    hp = ease((s(0) - 1.2) / 0.6)
    for i, (dx, dy) in enumerate([(-30, -14), (-8, -26), (14, -16)]):
        o.append(g(hut(rx + dx, ry + dy, 0.8), hp))
    # Ruma
    o.append(g(text(rx + 18, ry - 36, "RUMA", 22, F_DISPLAY, C["etr"], weight="bold", extra='stroke="white" stroke-width="4" paint-order="stroke"'), ease(s(4) / 0.6)))
    # rechte Spalte: Karten je Zeile
    cards = [(0, "Latiner", "um 1000 v. Chr. · Bauern, Hütten auf den Hügeln", "people", C["accent"]), (1, "Tonurne (Q1)", "Gefäß in Hüttenform: so sahen die Hütten aus", "urn", C["fg"]),
             (2, "König", "Feldherr + oberster Priester", "crown", C["gold_dark"]), (3, "Etrusker", "um 700 v. Chr. · wohl z. T. aus Kleinasien", "ship", C["etr"]),
             (4, "„Ruma“", "etruskisch → Name Rom (vermutlich)", "map", C["etr"]), (5, "Griechen", "Städte an den Küsten: Kyme, Neapolis", "city", C["gri"])]
    for i, (li, title, desc, ic, col) in enumerate(cards):
        p = ease(s(li) / 0.6); y = 50 + i * 95
        act = ctx.li == li
        o.append(sub_panel(620, y, 600, 80, icon(ic, 636, y + 12, 56, col, 3) + text(708, y + 34, title, 24, F_DISPLAY, C["accent"], weight="bold") + text(708, y + 62, desc, 17, F_BODY, C["fg"]), p, C["surface"] if act else C["surface2"], C["accent"] if act else C["line"]))
    return "".join(o)

def frame_wachstum(ctx):
    s = ctx.since; t = ctx.t; o = []
    o.append(f'<rect x="60" y="40" width="1160" height="600" rx="12" fill="{C["rome_land"]}"/>')
    # Fluss unten links -> rechts
    rp = [(60, 520), (260, 470), (420, 440), (520, 400), (560, 330), (540, 250), (560, 160), (600, 40)]
    o.append(polyline(rp, C["bank"], 34)); o.append(polyline(rp, C["tiber_light"], 26))
    o.append(polyline(rp, C["tiber_pale"], 3, dash="10 22").replace('stroke-dasharray=', f'stroke-dashoffset="{-t*22:.1f}" stroke-dasharray='))
    fx, fy = 548, 300  # Furt
    for i in range(5): o.append(f'<circle cx="{fx-12+i*6}" cy="{fy-30+i*15}" r="3.5" fill="{C["hill_top"]}" stroke="{C["road"]}"/>')
    # Hügel
    hills = [(760, 250, 150, 85), (980, 330, 160, 90), (820, 470, 140, 70)]
    for cx, cy, rx, ry in hills:
        o.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{C["hill"]}"/><ellipse cx="{cx}" cy="{cy-10}" rx="{rx*0.6:.0f}" ry="{ry*0.5:.0f}" fill="{C["hill_top"]}"/>')
    # Sumpf -> Forum
    mp = ease(s(3) / 1.2)
    o.append(f'<ellipse cx="860" cy="360" rx="70" ry="34" fill="{C["marsh"]}" opacity="{1-mp:.3f}"/>' + "".join(f'<path d="M{800+i*14} 360 q3 -4 6 0 t6 0" fill="none" stroke="{C["marsh_line"]}" opacity="{1-mp:.3f}"/>' for i in range(9)))
    o.append(g(f'<rect x="800" y="332" width="120" height="56" rx="4" fill="{C["surface2"]}" stroke="{C["road"]}" stroke-width="2"/>' + "".join(f'<rect x="{806+i*18}" y="336" width="6" height="48" fill="{C["hill"]}"/>' for i in range(7)) + text(860, 410, "Forum", 18, F_DISPLAY, C["accent"], "middle", "bold"), mp))
    # Hütten
    base = [(740, 230), (770, 215), (800, 235), (990, 300), (1020, 315), (960, 320), (820, 450), (850, 465)]
    for i, (x, y) in enumerate(base): o.append(hut(x, y, 1.0))
    # mehr Hütten (Zeile 1) + Verbindung
    p2 = ease(s(1) / 1.0)
    for i, (x, y) in enumerate([(730, 262), (805, 268), (1000, 350), (945, 352), (880, 480), (790, 478)]):
        o.append(g(hut(x, y, 0.95), ease((s(1) - i * 0.12) / 0.5)))
    o.append(polyline([(770, 250), (980, 330), (820, 470), (770, 250)], C["accent"], 3, dash="8 8", opacity=p2 * 0.8))
    # Häuser (Zeile 6) wachsen
    for i, (x, y) in enumerate([(700, 300), (880, 230), (1060, 400), (1120, 300), (700, 520), (1000, 520), (1080, 480), (940, 190)]):
        o.append(g(house(x, y, 1.0), ease((s(6) - i * 0.25) / 0.5)))
    # Bauern außerhalb (Zeile 5)
    for i, (x, y) in enumerate([(200, 150), (300, 250), (180, 330), (380, 140)]):
        o.append(g(house(x, y, 0.8) + text(x, y + 36, "Bauern", 13, F_BODY, C["muted"], "middle"), ease((s(5) - i * 0.2) / 0.5)))
    # Mauer (Zeile 2): Ring
    wp = ease(s(2) / 1.8)
    if wp > 0:
        ring = [(880 + 300 * math.cos(a), 350 + 190 * math.sin(a)) for a in [i / 60 * 2 * math.pi - math.pi / 2 for i in range(61)]]
        o.append(polyline(partial(ring, wp), C["road"], 10)); o.append(polyline(partial(ring, wp), C["hill_top"], 4, dash="14 10"))
    # Markt (Zeile 0): Stand + Personen über Furt
    mk = ease(s(0) / 0.6)
    o.append(g(f'<rect x="590" y="275" width="70" height="40" fill="{C["surface"]}" stroke="{C["road"]}" stroke-width="2"/><path d="M582 275 L625 245 L668 275 Z" fill="{C["bad"]}" opacity="0.8"/>' + text(625, 335, "Markt", 16, F_DISPLAY, C["accent"], "middle", "bold") + icon("salt", 600, 280, 30, C["fg"], 2.5), mk))
    if s(0) > 0:
        for k in range(3):
            u = ((ctx.t * 0.25 + k * 0.33) % 1.0)
            path = [(300, 470), (420, 440), (520, 400), (548, 300), (600, 320)]
            px, py = poly_at(path, u)
            o.append(person(px, py, 0.8, C["fg"]))
    # König (Zeile 4)
    kp = ease(s(4) / 0.6)
    o.append(pop(880, 130, icon("crown", 850, 100, 64, C["gold_dark"], 3, C["gold"]) + text(880, 185, "etruskischer König", 16, F_BODY, C["fg"], "middle", "bold"), kp))
    # Beschriftung Stadt / Jahr
    o.append(g(text(880, 600, "um 500 v. Chr.: eine der größten Städte Italiens", 22, F_DISPLAY, C["accent"], "middle", "bold"), ease(s(6) / 0.8)))
    o.append(text(130, 90, "Stadt und Land", 22, F_DISPLAY, C["accent"], weight="bold", opacity=ease(s(5) / 0.6)))
    return "".join(o)

def frame_sage(ctx):
    s = ctx.since; t = ctx.t; o = []
    # Bühne
    o.append(f'<rect x="200" y="60" width="880" height="540" rx="18" fill="{C["surface"]}" stroke="{C["line"]}"/>')
    cx, cy = 640, 300
    def vis(li):
        """Sichtbarkeit einer Vignette: ein-/ausblenden um die Zeile li"""
        if ctx.li == li: return ease(s(li) / 0.5)
        if ctx.li == li + 1: return 1 - ease(s(li + 1) / 0.4)
        return 0.0
    # 0 Titel
    v = vis(0)
    o.append(g(text(cx, 250, "Die Sage", 56, F_DISPLAY, C["accent"], "middle", "bold", spacing=3) + text(cx, 310, "Romulus und Remus", 36, F_DISPLAY, C["fg"], "middle") + text(cx, 360, "erzählt nach Livius, „Ab urbe condita“", 20, F_BODY, C["muted"], "middle", style="italic"), v))
    # 1 Amulius entmachtet den König
    v = vis(1)
    if v > 0:
        d = ease(s(1) / 1.5) * 120
        o.append(g(person(cx - 120 - d, cy + 40, 1.6, C["muted"]) + icon("crown", cx - 150 - d, cy - 85, 60, C["gold_dark"], 3, C["gold"]) + person(cx + 120, cy + 40, 1.6, C["bad"]) + icon("sword", cx + 150, cy - 50, 54, C["bad"], 3)
                     + text(cx - 120 - d, cy + 100, "der alte König", 18, F_BODY, C["muted"], "middle") + text(cx + 120, cy + 100, "Amulius", 18, F_BODY, C["bad"], "middle", "bold") + text(cx, cy - 120, "entmachtet und vertrieben", 24, F_DISPLAY, C["accent"], "middle", "bold"), v))
    # 2 Rhea Silvia + Mars + Zwillinge
    v = vis(2)
    if v > 0:
        o.append(g(person(cx - 140, cy + 30, 1.6, C["accent"]) + text(cx - 140, cy + 100, "Rhea Silvia", 18, F_BODY, C["fg"], "middle") + icon("mars", cx + 100, cy - 60, 90, C["bad"], 4) + text(cx + 140, cy + 100, "Mars, der Kriegsgott", 18, F_BODY, C["fg"], "middle")
                     + pop(cx, cy + 40, f'<circle cx="{cx-18}" cy="{cy+40}" r="14" fill="{C["gold"]}"/><circle cx="{cx+18}" cy="{cy+40}" r="14" fill="{C["gold"]}"/>' + text(cx, cy + 80, "Romulus & Remus", 18, F_BODY, C["accent"], "middle", "bold"), ease((s(2) - 1.0) / 0.6)), v))
    # 3 Korb am Tiber
    v = vis(3)
    if v > 0:
        wave = "".join(f'<path d="M{240+i*80} {cy+60+8*math.sin(t*2+i)} q20 -14 40 0 t40 0" fill="none" stroke="{C["tiber_light"]}" stroke-width="4"/>' for i in range(10))
        bx = cx - 250 + ease(s(3) / 4.0) * 400; by = cy + 48 + 6 * math.sin(t * 2.5)
        o.append(g(f'<rect x="220" y="{cy+30}" width="840" height="120" fill="{C["tiber_pale"]}" rx="10"/>' + wave + icon("basket", bx - 36, by - 60, 72, C["road"], 3.5, C["gold_soft"]) + f'<circle cx="{bx-10}" cy="{by-22}" r="7" fill="{C["gold"]}"/><circle cx="{bx+10}" cy="{by-22}" r="7" fill="{C["gold"]}"/>'
                     + text(cx, cy - 80, "ausgesetzt am Tiber", 26, F_DISPLAY, C["accent"], "middle", "bold") + text(1040, cy + 100, "Tiber", 18, F_BODY, "#4A6C7E", "end", style="italic"), v))
    # 4 Wölfin
    v = vis(4)
    if v > 0:
        wp = ease(s(4) / 1.0)
        o.append(g(f'<g transform="translate({cx-150} {cy-110}) scale(4.6)"><path d="{ICONS["wolf"]}" fill="{C["gold_dark"]}" opacity="{wp:.3f}"/></g>'
                     + f'<circle cx="{cx-30}" cy="{cy+120}" r="12" fill="{C["gold"]}"/><circle cx="{cx+10}" cy="{cy+120}" r="12" fill="{C["gold"]}"/>' + text(cx, cy + 180, "Die Wölfin säugt die Zwillinge", 26, F_DISPLAY, C["accent"], "middle", "bold"), v))
    # 5 Hirte
    v = vis(5)
    if v > 0:
        o.append(g(icon("shepherd", cx - 160, cy - 110, 200, C["fg"], 2.5) + person(cx + 60, cy + 70, 0.9, C["gold_dark"]) + person(cx + 110, cy + 70, 0.9, C["gold_dark"]) + text(cx, cy + 160, "Ein Hirte zieht die Kinder groß", 26, F_DISPLAY, C["accent"], "middle", "bold"), v))
    # 6 Rache + Gründung 753
    v = vis(6)
    if v > 0:
        o.append(g(person(cx - 80, cy + 20, 1.6, C["accent"]) + person(cx + 80, cy + 20, 1.6, C["accent"]) + icon("sword", cx - 32, cy - 120, 64, C["bad"], 3) + text(cx, cy + 110, "753 v. Chr.", 48, F_DISPLAY, C["accent"], "middle", "bold", opacity=ease((s(6) - 2.0) / 0.6)) + text(cx, cy + 150, "Gründung einer eigenen Stadt", 22, F_BODY, C["fg"], "middle", opacity=ease((s(6) - 2.2) / 0.6)), v))
    # 7 Mauer + Sprung
    v = vis(7)
    if v > 0:
        wp = ease(s(7) / 1.5)
        wall = "".join(f'<rect x="{360+i*40}" y="{cy+40-(j*22)}" width="36" height="20" fill="{C["hill"]}" stroke="{C["road"]}" opacity="{clamp(wp*4-(i+j*14)*0.15):.2f}"/>' for j in range(3) for i in range(14))
        jp = clamp((s(7) - 2.5) / 1.5)
        jx = cx + 170 - jp * 340; jy = cy + 70 - 150 * math.sin(math.pi * jp)
        o.append(g(wall + person(cx - 220, cy + 70, 1.5, C["accent"]) + text(cx - 220, cy + 120, "Romulus", 18, F_BODY, C["fg"], "middle", "bold") + person(jx, jy, 1.5, C["bad"]) + text(cx + 170, cy + 120, "Remus", 18, F_BODY, C["fg"], "middle", "bold")
                     + text(cx, cy - 120, "Streit um die Mauer", 26, F_DISPLAY, C["accent"], "middle", "bold"), v))
    # 8 Rom
    v = vis(8)
    if v > 0:
        o.append(g(coin(cx - 200, cy, 90, t) + icon("crown", cx - 30, cy - 130, 70, C["gold_dark"], 3, C["gold"]) + text(cx + 120, cy + 10, "ROMA", 72, F_DISPLAY, C["accent"], "middle", "bold", spacing=8) + text(cx + 120, cy + 60, "Romulus, der erste König", 22, F_BODY, C["fg"], "middle"), v))
    return "".join(o)

def frame_vergleich(ctx):
    s = ctx.since; t = ctx.t; o = []
    cols = [("Nur die Sage", C["gold"], C["gold_soft"], 70), ("Beide", C["tiber"], C["tiber_pale"], 460), ("Nur die Wissenschaft", C["accent"], C["accent_soft"], 850)]
    hp = ease(s(0) / 0.8)
    o.append(text(640, 88, "Sage oder Wissenschaft?", 40, F_DISPLAY, C["accent"], "middle", "bold", opacity=hp))
    for name, col, soft, x in cols:
        o.append(g(f'<rect x="{x}" y="112" width="360" height="492" rx="16" fill="{soft}" stroke="{col}" stroke-width="3"/>' + text(x + 180, 150, name, 24, F_DISPLAY, col, "middle", "bold"), hp))
    items = [(1, 1, ["8. Jahrhundert v. Chr.", "am Tiber, auf Hügeln", "ein König", "eine Mauer"]), (2, 0, ["Romulus (Sohn des Mars)", "die Wölfin", "753 v. Chr. genau", "Name von Romulus"]), (3, 2, ["Latiner vereinen Dörfer", "Etrusker werden Könige", "Name wohl von „Ruma“", "langsames Wachstum"])]
    for li, ci, lst in items:
        x = cols[ci][3]
        for k, s_ in enumerate(lst):
            p = ease((s(li) - k * 0.35) / 0.5)
            y = 195 + k * 68
            o.append(g(f'<rect x="{x+20}" y="{y-28+(1-p)*30:.1f}" width="320" height="50" rx="10" fill="{C["surface"]}" stroke="{C["line"]}"/>' + text(x + 180, y + 4 + (1 - p) * 30, s_, 19, F_BODY, C["fg"], "middle", "bold"), p))
    # Beweise
    p5 = ease(s(4) / 0.6)
    o.append(g(icon("urn", 880, 470, 60, C["accent"], 3) + icon("wall", 950, 470, 60, C["accent"], 3) + text(1030, 500, "Funde = Beweise", 18, F_BODY, C["accent"], weight="bold") + text(1030, 526, "Tonurnen, Mauerreste", 15, F_BODY, C["fg"]), p5))
    o.append(g(text(250, 500, "Erzählung von Livius", 18, F_BODY, C["gold_dark"], "middle", "bold") + text(250, 526, "keine Beweise", 15, F_BODY, C["fg"], "middle"), p5))
    p6 = ease(s(5) / 0.6)
    o.append(g(coin(640, 500, 70, t) + text(640, 590, "Münze, 137 v. Chr. (Q2)", 17, F_BODY, C["fg"], "middle", "bold"), p6))
    return "".join(o)

def frame_italien(ctx):
    s = ctx.since; t = ctx.t; o = []
    x0, y0, w, h = 60, 30, 520, 585
    P = make_proj(x0, y0, w, h)
    e, i_, gr = 0.1 + 0.9 * ease(s(1) / 1.0), 0.1 + 0.9 * ease(s(2) / 1.0), 0.1 + 0.9 * ease(s(3) / 1.0)
    o.append(italy_map(P, x0, y0, w, h, etr=e, ita=i_, gri=gr, labels=True, cities=True))
    rx, ry = city_xy(P, "rom")
    rp = ease(s(4) / 0.6)
    if rp > 0:
        pulse = 1 + 0.12 * math.sin(t * 5)
        o.append(f'<circle cx="{rx:.1f}" cy="{ry:.1f}" r="{22*pulse:.1f}" fill="none" stroke="{C["accent"]}" stroke-width="4" opacity="{rp:.3f}"/>')
    vp = ease(s(5) / 1.0)
    if vp > 0:
        vx, vy = city_xy(P, "veji")
        o.append(polyline(partial([(vx, vy), (rx, ry)], vp), C["bad"], 4, dash="6 5"))
    # Legende rechts
    leg = [(1, "Etrusker", C["etr"], "großes Gebiet, viele Städte, keine Hauptstadt"), (2, "Italiker", C["ita"], "Latiner, Sabiner, Samniten …: Bauern, keine Städte"), (3, "Griechen", C["gri"], "Stadtstaaten an den Küsten, Handel übers Meer")]
    o.append(text(640, 75, "Völker Italiens im 6. Jh. v. Chr.", 30, F_DISPLAY, C["accent"], weight="bold", opacity=ease(s(0) / 0.6)))
    o.append(text(640, 105, "600–500 v. Chr. · Karte D1, Seite 110", 18, F_BODY, C["muted"], opacity=ease(s(0) / 0.6)))
    for k, (li, name, col, desc) in enumerate(leg):
        p = ease(s(li) / 0.6); y = 160 + k * 90
        o.append(sub_panel(640, y, 580, 74, f'<rect x="656" y="{y+17}" width="40" height="40" rx="6" fill="{col}" stroke="{C["line"]}"/>' + text(712, y + 32, name, 22, F_DISPLAY, C["fg"], weight="bold") + text(712, y + 58, desc, 16, F_BODY, C["fg"]), p, C["surface"] if ctx.li == li else C["surface2"], C["accent"] if ctx.li == li else C["line"]))
    p4 = ease(s(4) / 0.6)
    o.append(sub_panel(640, 440, 580, 70, text(660, 470, "Rom: an der Nahtstelle", 22, F_DISPLAY, C["accent"], weight="bold") + text(660, 496, "zwischen Etruskern (Norden) und Italikern (Süden)", 16, F_BODY, C["fg"]), p4))
    p5 = ease(s(5) / 0.6)
    o.append(sub_panel(640, 525, 580, 90, icon("clock", 656, 540, 56, C["bad"], 3) + text(730, 553, "Veji → Rom: ca. 16 km", 22, F_DISPLAY, C["bad"], weight="bold") + text(730, 580, "16 km : 4 km/h = 4 Stunden · Chance und Gefahr", 16, F_BODY, C["fg"]), p5, C["bad_soft"], C["bad"]))
    return "".join(o)

def frame_methode(ctx):
    s = ctx.since; t = ctx.t; o = []
    o.append(text(640, 90, "Geschichtskarten lesen", 40, F_DISPLAY, C["accent"], "middle", "bold", opacity=ease(s(0) / 0.8)))
    o.append(text(640, 118, "Die Methode in 6 Schritten", 19, F_BODY, C["muted"], "middle", opacity=ease(s(0) / 0.8)))
    steps = [(1, 0.0, "Leitfrage festlegen", "Welche Frage will ich beantworten?"), (1, 1.6, "Thema benennen", "Titel, Zeitraum, Ausschnitt"), (1, 3.2, "Legende erfassen", "Farben, Linien, Zeichen"),
             (2, 0.0, "Beschreiben und auswerten", "Wo liegt was? Was fällt auf?"), (3, 0.0, "Zusammenfassenden Text schreiben", "„Insgesamt kann man feststellen, dass …“"), (4, 0.0, "Offene Fragen notieren", "„Die Frage … bleibt unbeantwortet.“")]
    for k, (li, off, title, desc) in enumerate(steps):
        p = ease((s(li) - off) / 0.5); y = 148 + k * 77
        act = ctx.li == li and (k < 3 and (s(li) - off) >= 0 and (k == 2 or s(li) < steps[k + 1][1]) or k >= 3)
        o.append(g(f'<rect x="120" y="{y}" width="700" height="66" rx="12" fill="{C["surface"] if act else C["surface2"]}" stroke="{C["accent"] if act else C["line"]}" stroke-width="2"/>'
                     f'<circle cx="160" cy="{y+33}" r="22" fill="{C["accent"]}"/>' + text(160, y + 42, str(k + 1), 24, F_DISPLAY, "#FFFFFF", "middle", "bold") + text(200, y + 28, title, 22, F_DISPLAY, C["fg"], weight="bold") + text(200, y + 54, desc, 16, F_BODY, C["muted"]), p))
    # kleine Karte rechts
    x0, y0, w, h = 860, 160, 360, 405
    P = make_proj(x0, y0, w, h)
    o.append(g(italy_map(P, x0, y0, w, h, labels=False, cities=True, city_filter=["rom", "veji", "neapolis", "tarent"], clip_id="mini"), ease(s(0) / 0.8)))
    lp = ease(s(1) / 0.6)
    o.append(g(f'<rect x="870" y="475" width="130" height="80" rx="6" fill="{C["surface"]}" stroke="{C["line"]}" opacity="0.95"/>' + "".join(f'<rect x="880" y="{485+i*22}" width="18" height="14" fill="{c}"/>' + text(904, 497 + i * 22, n, 12, F_BODY, C["fg"]) for i, (c, n) in enumerate([(C["etr"], "Etrusker"), (C["ita"], "Italiker"), (C["gri"], "Griechen")])), lp))
    o.append(text(1040, 598, "Legende: Die Farben bedeuten …", 14, F_BODY, C["muted"], "middle", style="italic", opacity=lp))
    return "".join(o)

def frame_ende(ctx):
    s = ctx.since; t = ctx.t; o = []
    o.append(f'<path d="M-40 520 C300 440 500 600 800 500 S1100 440 1320 540 L1320 720 L-40 720Z" fill="{C["rome_land"]}"/>')
    o.append(g(f'<circle cx="640" cy="200" r="110" fill="{C["gold"]}"/><g transform="translate(540 110) scale(3.2)"><path d="{ICONS["wolf"]}" fill="{C["gold_dark"]}"/></g>', ease(s(0) / 0.8)))
    words = [("map", "Lage"), ("salt", "Handel"), ("people", "Einwanderer"), ("crown", "Könige"), ("wolf", "Sage")]
    for k, (ic, w_) in enumerate(words):
        p = ease((s(0) - 1.0 - k * 0.5) / 0.5); x = 240 + k * 200
        o.append(pop(x, 390, icon(ic, x - 32, 340, 64, C["accent"], 3) + text(x, 440, w_, 22, F_DISPLAY, C["fg"], "middle", "bold"), p))
    p = ease(s(1) / 0.8)
    o.append(text(640, 560, "Viel Erfolg bei der Prüfung!", 52, F_DISPLAY, C["accent"], "middle", "bold", opacity=p, spacing=2))
    o.append(text(640, 605, "¡Mucho éxito!", 26, F_BODY, C["muted"], "middle", opacity=ease((s(1) - 0.8) / 0.6), style="italic"))
    return "".join(o)

FRAMES = dict(titel=frame_title, zeit=frame_zeit, landschaft=frame_landschaft, einwanderer=frame_einwanderer, wachstum=frame_wachstum, sage=frame_sage, vergleich=frame_vergleich, italien=frame_italien, methode=frame_methode, ende=frame_ende)

class Ctx:
    def __init__(self, scene, t, starts):
        self.t = t; self.starts = starts
        self.li = max([i for i, st in enumerate(starts) if st <= t] or [0])
    def since(self, k):
        return self.t - self.starts[k] if k < len(self.starts) else -1e9

def render_svg(scene, t, dur, starts, lang):
    ctx = Ctx(scene, t, starts)
    body = FRAMES[scene["id"]](ctx)
    # leichter Kamera-Zoom
    z = 1.0 + 0.035 * (t / max(dur, 1))
    fade = min(ease(t / 0.5), ease((dur - t) / 0.5))
    kicker = scene["kicker"]
    k = text(40, 42, kicker.upper(), 15, F_BODY, C["muted"], spacing=2, weight="bold") if kicker else ""
    sub_hint = text(1240, 42, "Untertitel: Español" if lang == "de" else "Untertitel: Deutsch", 13, F_BODY, C["muted"], "end", spacing=1)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
            f'<rect width="{W}" height="{H}" fill="{C["bg"]}"/>'
            f'<g transform="translate(640 360) scale({z:.4f}) translate(-640 -360)">{body}</g>{k}{sub_hint}'
            f'<rect width="{W}" height="{H}" fill="{C["bg"]}" opacity="{1-fade:.3f}"/></svg>')

# ---------- Audio ----------
def tts(text_, voice, cache):
    key = hashlib.md5((voice + "|" + text_).encode()).hexdigest()
    aiff = cache / f"{key}.aiff"; raw = cache / f"{key}.raw"
    if not raw.exists():
        subprocess.run(["say", "-v", voice, "-r", "165", "-o", str(aiff), text_], check=True)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(aiff), "-f", "s16le", "-ar", "44100", "-ac", "1", str(raw)], check=True)
    data = raw.read_bytes()
    return data, len(data) / 2 / 44100

def srt_time(x):
    ms = int(round(x * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s_, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s_:02d},{ms:03d}"

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--lang", default="de", choices=["de", "es"]); ap.add_argument("--preview", action="store_true"); ap.add_argument("--work", default=None); ap.add_argument("--jobs", type=int, default=8)
    a = ap.parse_args()
    lang = a.lang; other = "es" if lang == "de" else "de"
    work = Path(a.work) if a.work else HERE / "_work"; work.mkdir(exist_ok=True)
    cache = work / "tts"; cache.mkdir(exist_ok=True)
    frames_dir = work / f"frames_{lang}"; frames_dir.mkdir(exist_ok=True)

    # 1. Audio und Timing
    print("Audio …", flush=True)
    audio = bytearray(); timeline = []; t = 0.0
    silence = lambda sec: b"\x00\x00" * int(sec * 44100)
    for sc in SCENES:
        starts = []; sc_start = t
        audio += silence(0.4); t += 0.4
        for de, es in sc["lines"]:
            spoken_text = spoken(de if lang == "de" else es, lang)
            data, dur = tts(spoken_text, VOICES[lang], cache)
            starts.append(t - sc_start)
            timeline.append((t, t + dur, es if lang == "de" else de))
            audio += data; t += dur
            audio += silence(GAP_LINE); t += GAP_LINE
        audio += silence(GAP_SCENE - GAP_LINE); t += GAP_SCENE - GAP_LINE
        sc["start"] = sc_start; sc["dur"] = t - sc_start; sc["starts"] = starts
    total = t
    print(f"Gesamtlänge: {total:.1f} s", flush=True)
    wav = work / f"audio_{lang}.wav"
    with wave.open(str(wav), "wb") as wf:
        wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(44100); wf.writeframes(bytes(audio))
    srt = work / f"subs_{lang}.srt"
    srt.write_text("".join(f"{i+1}\n{srt_time(a_)} --> {srt_time(b_ - 0.05)}\n{txt}\n\n" for i, (a_, b_, txt) in enumerate(timeline)), encoding="utf-8")

    # 2. Frames
    if a.preview:
        pv = work / f"preview_{lang}"; pv.mkdir(exist_ok=True)
        jobs = []
        for sc in SCENES:
            for frac in (0.25, 0.6, 0.9):
                tt = sc["dur"] * frac
                svg = pv / f"{sc['id']}_{int(frac*100)}.svg"; svg.write_text(render_svg(sc, tt, sc["dur"], sc["starts"], lang), encoding="utf-8")
                jobs.append(svg)
        for svg in jobs:
            subprocess.run(["rsvg-convert", "-w", str(W), "-h", str(H), str(svg), "-o", str(svg.with_suffix(".png"))], check=True)
        print("Vorschau in", pv); return

    n_frames = int(total * FPS)
    print(f"{n_frames} Bilder …", flush=True)
    sc_i = 0
    def job(i):
        png = frames_dir / f"f{i:05d}.png"
        if png.exists(): return
        tt = i / FPS
        sc = next(s for s in SCENES if s["start"] <= tt < s["start"] + s["dur"] + 1e-6) if tt < total else SCENES[-1]
        svg = frames_dir / f"f{i:05d}.svg"
        svg.write_text(render_svg(sc, tt - sc["start"], sc["dur"], sc["starts"], lang), encoding="utf-8")
        subprocess.run(["rsvg-convert", "-w", str(W), "-h", str(H), str(svg), "-o", str(png)], check=True)
        svg.unlink()
    with ThreadPoolExecutor(max_workers=a.jobs) as ex:
        for k, _ in enumerate(ex.map(job, range(n_frames))):
            if k % 500 == 0: print(f"  {k}/{n_frames}", flush=True)

    # 3. Video
    out = HERE / f"rom-film-{lang}.mp4"
    style = "FontName=Avenir Next,FontSize=13,Bold=1,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BackColour=&H99000000,BorderStyle=4,Outline=1,Shadow=0,MarginV=28,MarginL=60,MarginR=60,Alignment=2,WrapStyle=0"
    srt_path = str(srt).replace("\\", "\\\\").replace(":", "\\:").replace("'", "\\'")
    cmd = ["ffmpeg", "-v", "error", "-stats", "-y", "-framerate", str(FPS), "-i", str(frames_dir / "f%05d.png"), "-i", str(wav),
           "-vf", f"subtitles='{srt_path}':force_style='{style}'", "-c:v", "libx264", "-preset", "medium", "-crf", "22", "-pix_fmt", "yuv420p",
           "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", str(out)]
    print("Encode …", flush=True)
    subprocess.run(cmd, check=True)
    print("Fertig:", out)

if __name__ == "__main__":
    main()
