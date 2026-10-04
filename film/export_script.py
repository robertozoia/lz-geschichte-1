#!/usr/bin/env python3
"""Exportiert Drehbuch + Zeitmarken (aus dem TTS-Cache) als film/script.js für die Lernseite.
   Vorher: python3 film/build.py --lang de  und  --lang es  (füllt den Cache)."""
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import build as B

def timeline(lang, cache):
    t = 0.0; out = []
    for sc in B.SCENES:
        t += 0.4; lines = []
        for de, es in sc["lines"]:
            data, dur = B.tts(B.spoken(de if lang == "de" else es, lang), B.VOICES[lang], cache)
            lines.append(round(t, 2)); t += dur + B.GAP_LINE
        t += B.GAP_SCENE - B.GAP_LINE
        out.append(lines)
    return out, round(t, 1)

def main():
    work = Path(sys.argv[1]) if len(sys.argv) > 1 else B.HERE / "_work"
    cache = work / "tts"
    tl_de, total_de = timeline("de", cache)
    tl_es, total_es = timeline("es", cache)
    scenes = []
    for i, sc in enumerate(B.SCENES):
        scenes.append({"id": sc["id"], "kicker": sc["kicker"], "lines": [{"de": de, "es": es, "tde": tl_de[i][k], "tes": tl_es[i][k]} for k, (de, es) in enumerate(sc["lines"])]})
    js = "/* automatisch erzeugt von film/export_script.py */\nconst FILM_SCRIPT = " + json.dumps({"total": {"de": total_de, "es": total_es}, "scenes": scenes}, ensure_ascii=False, indent=1) + ";\n"
    (B.HERE / "script.js").write_text(js, encoding="utf-8")
    print("script.js geschrieben; Dauer de/es:", total_de, total_es)

if __name__ == "__main__":
    main()
