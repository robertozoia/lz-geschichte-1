/* =====================================================================
   APP: Navigation, Sprache, Aktivitäten, Fortschritt
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  function el(tag, attrs = {}, children = []) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined || v === false) continue;
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k === "text") e.textContent = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else if (k === "dataset") Object.assign(e.dataset, v);
      else e.setAttribute(k, v === true ? "" : v);
    }
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c === null || c === undefined || c === false) return;
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return e;
  }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* Text mit [[term|anzeige]] und **fett** -> HTML */
  function inlineMd(s) {
    let h = esc(s);
    h = h.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    h = h.replace(/\[\[([a-z0-9]+)(?:\|([^\]]+))?\]\]/g, (m, key, text) => {
      const g = GLOSSAR[key];
      const shown = text || (g ? g.de.replace(/^(der|die|das)\s/, "") : key);
      if (!g) return shown;
      return `<button type="button" class="term" data-term="${key}">${shown}</button>`;
    });
    return h;
  }
  function md(s) {
    if (!s) return "";
    return s.split(/\n\n+/).map(par => {
      const lines = par.split("\n");
      if (lines.every(l => l.trim().startsWith("•"))) {
        return "<ul>" + lines.map(l => "<li>" + inlineMd(l.replace(/^\s*•\s*/, "")) + "</li>").join("") + "</ul>";
      }
      return "<p>" + lines.map(inlineMd).join("<br>") + "</p>";
    }).join("");
  }

  /* ---------- Fortschritt ---------- */
  const STORE_KEY = "rom-lernreise-v1";
  const state = { coins: {}, visited: {}, esAll: false, theme: "", builderText: "", table: {} };
  function load() {
    try { Object.assign(state, JSON.parse(localStorage.getItem(STORE_KEY) || "{}")); } catch (e) { /* ohne Speicher weiter */ }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignorieren */ }
  }
  load();

  const QUIZ_IDS = [];
  CHAPTERS.forEach(ch => ch.blocks.forEach(b => { if (b.type === "quiz") QUIZ_IDS.push(b.big ? "big" : ch.id); }));
  const totalCoins = QUIZ_IDS.length;
  const coinCount = () => QUIZ_IDS.filter(id => state.coins[id]).length;

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  function applyTheme() {
    if (state.theme) root.setAttribute("data-theme", state.theme); else root.removeAttribute("data-theme");
    const b = document.getElementById("theme-btn");
    if (b) b.textContent = state.theme === "dark" ? "Hell" : state.theme === "light" ? "Auto" : "Dunkel";
  }
  function cycleTheme() {
    state.theme = state.theme === "" ? "dark" : state.theme === "dark" ? "light" : "";
    save(); applyTheme();
  }

  /* ---------- Header / Nav ---------- */
  const header = document.getElementById("site-header");
  const nav = document.getElementById("chapter-nav");
  const main = document.getElementById("main");

  function renderHeaderTools() {
    const tools = document.getElementById("tools");
    tools.innerHTML = "";
    const coinsBox = el("button", { type: "button", class: "coins-box", id: "coins-box", title: "Gesammelte Münzen", onclick: () => location.hash = "#training" });
    coinsBox.appendChild(buildCoin(26, coinCount() > 0));
    coinsBox.appendChild(el("span", { class: "coins-num", text: `${coinCount()}/${totalCoins}` }));
    tools.appendChild(coinsBox);
    tools.appendChild(el("button", { type: "button", class: "tool-btn" + (state.esAll ? " on" : ""), id: "es-all", text: "ES überall", title: "Alle spanischen Erklärungen zeigen", onclick: () => { state.esAll = !state.esAll; save(); document.body.classList.toggle("es-all", state.esAll); document.getElementById("es-all").classList.toggle("on", state.esAll); } }));
    tools.appendChild(el("button", { type: "button", class: "tool-btn", id: "theme-btn", onclick: cycleTheme }));
    applyTheme();
  }

  function renderNav(activeId) {
    nav.innerHTML = "";
    CHAPTERS.forEach(ch => {
      const a = el("a", { href: "#" + ch.id, class: "nav-chip" + (ch.id === activeId ? " active" : "") + (state.visited[ch.id] ? " seen" : ""), text: ch.short });
      if (ch.num < 9) a.prepend(el("span", { class: "nav-num", text: String(ch.num) }));
      if (state.coins[ch.id] || (ch.id === "training" && state.coins.big)) a.appendChild(el("span", { class: "nav-coin", "aria-label": "Münze" }));
      nav.appendChild(a);
    });
    const active = nav.querySelector(".active");
    if (active) active.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  function refreshCoins() {
    const box = document.getElementById("coins-box");
    if (box) { box.innerHTML = ""; box.appendChild(buildCoin(26, coinCount() > 0)); box.appendChild(el("span", { class: "coins-num", text: `${coinCount()}/${totalCoins}` })); }
  }

  /* ---------- ES-Umschalter ---------- */
  function esToggle(block) {
    const btn = el("button", { type: "button", class: "es-btn", "aria-pressed": "false", title: "Explicación en español", onclick: () => {
      const open = block.classList.toggle("es-open");
      btn.setAttribute("aria-pressed", String(open));
    } }, [el("span", { class: "es-flag", text: "ES" }), el("span", { class: "es-txt", text: "Erklärung auf Spanisch" })]);
    return btn;
  }
  function blockWrap(cls, title, deNode, esText, extra) {
    const b = el("section", { class: "block " + cls });
    if (title) b.appendChild(el("h3", { class: "block-title", html: inlineMd(title) }));
    if (deNode) b.appendChild(deNode);
    if (extra) b.appendChild(extra);
    if (esText) {
      b.appendChild(esToggle(b));
      b.appendChild(el("div", { class: "es-box", lang: "es", html: md(esText) }));
    }
    return b;
  }

  /* ---------- Tooltip für Begriffe ---------- */
  let pop = null;
  function closePop() { if (pop) { pop.remove(); pop = null; } }
  function openPop(btn) {
    closePop();
    const g = GLOSSAR[btn.dataset.term];
    if (!g) return;
    pop = el("div", { class: "pop", role: "dialog" }, [
      el("div", { class: "pop-head" }, [el("strong", { text: g.de }), el("span", { class: "pop-es", lang: "es", text: g.es })]),
      el("p", { class: "pop-def", text: g.def }),
      el("p", { class: "pop-ex", html: "„" + esc(g.ex) + "“" }),
      el("button", { type: "button", class: "pop-close", "aria-label": "Schließen", text: "×", onclick: closePop }),
    ]);
    document.body.appendChild(pop);
    const r = btn.getBoundingClientRect();
    const pw = Math.min(340, window.innerWidth - 24);
    pop.style.width = pw + "px";
    let left = r.left + r.width / 2 - pw / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - pw - 12));
    let top = r.bottom + 8 + window.scrollY;
    pop.style.left = left + "px"; pop.style.top = top + "px";
    const ph = pop.offsetHeight;
    if (r.bottom + 8 + ph > window.innerHeight && r.top - ph - 8 > 0) pop.style.top = (r.top - ph - 8 + window.scrollY) + "px";
  }
  document.addEventListener("click", e => {
    const t = e.target.closest(".term");
    if (t) { e.preventDefault(); openPop(t); return; }
    if (pop && !e.target.closest(".pop")) closePop();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closePop(); });

  /* ---------- Block-Renderer ---------- */
  const R = {};

  R.text = b => blockWrap("b-text", b.title, el("div", { class: "de", html: md(b.de) }), b.es);

  R.tip = b => {
    const box = el("div", { class: "tip-inner" }, [buildLupa(54), el("div", { class: "tip-bubble" }, [el("div", { class: "tip-name", text: "Lupa, die Wölfin, sagt:" }), el("div", { class: "de", html: md(b.de) })])]);
    return blockWrap("b-tip", null, box, b.es);
  };

  R.howto = () => {
    const items = [
      { k: "ES", de: "Jeder Abschnitt hat einen ES-Knopf. Er zeigt die Erklärung auf Spanisch. Lies zuerst auf Deutsch!", es: "Cada sección tiene un botón ES. Muestra la explicación en español. ¡Lee primero en alemán!" },
      { k: "abc", de: "Unterstrichene Wörter kannst du antippen: Du bekommst eine Erklärung und die Übersetzung.", es: "Las palabras subrayadas se pueden tocar: recibes una explicación y la traducción." },
      { k: "coin", de: `Am Ende jedes Kapitels gibt es ein Quiz. Mit 80 % richtig gewinnst du eine Münze. Es gibt ${totalCoins} Münzen.`, es: `Al final de cada capítulo hay un quiz. Con 80 % correcto ganas una moneda. Hay ${totalCoins} monedas.` },
    ];
    const grid = el("div", { class: "howto-grid" }, items.map(it => el("div", { class: "howto-item" }, [
      it.k === "coin" ? buildCoin(40, true) : el("span", { class: "howto-key" + (it.k === "abc" ? " howto-term" : ""), text: it.k }),
      el("div", {}, [el("p", { class: "de", text: it.de }), el("p", { class: "es-inline", lang: "es", text: it.es })]),
    ])));
    return blockWrap("b-howto", "So funktioniert die Seite", grid, null);
  };

  R.timeline = () => {
    const svg = buildTimeline();
    const detail = el("div", { class: "tl-detail" });
    function show(i) {
      const t = TIMELINE[i];
      svg.querySelectorAll(".tl-event").forEach(g => g.classList.toggle("active", Number(g.dataset.i) === i));
      detail.innerHTML = "";
      detail.appendChild(el("div", { class: "tl-year", text: t.label }));
      detail.appendChild(el("p", { class: "de", text: t.de }));
      detail.appendChild(el("p", { class: "es-inline", lang: "es", text: t.es }));
    }
    svg.addEventListener("click", e => { const g = e.target.closest(".tl-event"); if (g) show(Number(g.dataset.i)); });
    svg.addEventListener("keydown", e => { const g = e.target.closest(".tl-event"); if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); show(Number(g.dataset.i)); } });
    show(0);
    const wrap = el("div", { class: "timeline-wrap" }, [el("div", { class: "timeline-scroll" }, [svg]), detail]);
    return blockWrap("b-timeline", "Zeitleiste: Tippe auf die Punkte", wrap, null);
  };

  R.map = b => {
    if (b.map === "rome") return renderRomeMap();
    if (b.map === "italy") return renderItalyMap("full");
    if (b.map === "arrivals") return renderItalyMap("arrivals");
    return el("div");
  };

  function renderRomeMap() {
    const svg = buildRomeMap();
    const info = el("div", { class: "map-info" });
    const list = el("ol", { class: "spot-list" }, ROME_SPOTS.map((s, i) => el("li", {}, [el("button", { type: "button", class: "spot-link", dataset: { id: s.id }, text: s.name })])));
    function show(id) {
      const s = ROME_SPOTS.find(x => x.id === id);
      if (!s) return;
      svg.querySelectorAll(".spot").forEach(g => g.classList.toggle("active", g.dataset.id === id));
      list.querySelectorAll(".spot-link").forEach(l => l.classList.toggle("active", l.dataset.id === id));
      info.innerHTML = "";
      info.appendChild(el("h4", { text: s.name }));
      info.appendChild(el("div", { class: "de", html: md(s.de) }));
      info.appendChild(el("p", { class: "es-inline", lang: "es", text: s.es }));
    }
    svg.addEventListener("click", e => { const g = e.target.closest(".spot"); if (g) show(g.dataset.id); });
    svg.addEventListener("keydown", e => { const g = e.target.closest(".spot"); if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); show(g.dataset.id); } });
    list.addEventListener("click", e => { const l = e.target.closest(".spot-link"); if (l) show(l.dataset.id); });
    show("tiber");
    const wrap = el("div", { class: "map-wrap" }, [el("div", { class: "map-frame" }, [svg]), el("div", { class: "map-side" }, [info, list])]);
    return blockWrap("b-map", "D1: Die Landschaft Roms vor ca. 2700 Jahren", wrap, null, el("p", { class: "map-caption", text: "Rekonstruktionszeichnung (vereinfacht). Tippe auf die Nummern." }));
  }

  function renderItalyMap(mode) {
    const svg = buildItalyMap(mode);
    const info = el("div", { class: "map-info" });
    const wrap = el("div", { class: "map-wrap map-wrap-italy" });
    const controls = el("div", { class: "layer-controls" });
    if (mode === "full") {
      [["etrusker", "Etrusker"], ["italiker", "Italiker"], ["griechen", "Griechen"]].forEach(([g, name]) => {
        const btn = el("button", { type: "button", class: "layer-btn on layer-" + g, "aria-pressed": "true", onclick: () => {
          const on = svg.classList.toggle("hide-" + g);
          btn.classList.toggle("on", !on); btn.setAttribute("aria-pressed", String(!on));
        } }, [el("span", { class: "swatch swatch-" + g }), name]);
        controls.appendChild(btn);
      });
      controls.appendChild(el("span", { class: "legend-dot" }, [el("span", { class: "swatch swatch-ort" }), "wichtiger Ort"]));
      controls.appendChild(el("span", { class: "legend-dot" }, [el("span", { class: "swatch swatch-rom" }), "Rom"]));
    } else {
      const routes = JSON.parse(svg.dataset.routes || "[]");
      routes.forEach(r => controls.appendChild(el("span", { class: "legend-dot" }, [el("span", { class: "swatch swatch-route-" + r.id }), r.label])));
      controls.appendChild(el("button", { type: "button", class: "layer-btn on", text: "Noch einmal abspielen", onclick: () => {
        svg.classList.remove("map-arrivals"); void svg.getBoundingClientRect(); svg.classList.add("map-arrivals");
      } }));
    }
    function showCity(id) {
      const c = ITALY.cities.find(x => x.id === id);
      if (!c) return;
      svg.querySelectorAll(".city").forEach(g => g.classList.toggle("active", g.dataset.id === id));
      info.innerHTML = "";
      info.appendChild(el("h4", { text: c.name }));
      info.appendChild(el("div", { class: "de", html: md(c.de) }));
      info.appendChild(el("p", { class: "es-inline", lang: "es", text: c.es }));
    }
    svg.addEventListener("click", e => { const g = e.target.closest(".city"); if (g) showCity(g.dataset.id); });
    svg.addEventListener("keydown", e => { const g = e.target.closest(".city"); if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); showCity(g.dataset.id); } });
    showCity("rom");
    wrap.appendChild(controls);
    wrap.appendChild(el("div", { class: "map-frame" }, [svg]));
    wrap.appendChild(info);
    const title = mode === "full" ? "D1: Völker Italiens im 6. Jahrhundert v. Chr." : "Wer kam woher? (vereinfacht)";
    const cap = mode === "full" ? "Vereinfachte Karte nach dem Schulbuch (S. 110). Tippe auf die Punkte. Orange = Etrusker, Beige = Italiker, Grün = Griechen." : "Die Pfeile zeigen die ungefähre Richtung, aus der die Völker kamen.";
    const block = blockWrap("b-map b-map-italy", title, wrap, null, el("p", { class: "map-caption", text: cap }));
    block.dataset.mapMode = mode;
    return block;
  }

  R.distance = () => {
    const opts = ITALY.cities.map(c => el("option", { value: c.id, text: c.name }));
    const from = el("select", { id: "dist-from", class: "sel" }, opts.map(o => o.cloneNode(true)));
    const to = el("select", { id: "dist-to", class: "sel" }, opts.map(o => o.cloneNode(true)));
    from.value = "neapolis"; to.value = "ostia";
    const speed = el("input", { type: "number", id: "dist-speed", class: "num", min: 1, max: 60, step: 1, value: 10 });
    const presets = el("div", { class: "presets" }, [[10, "Schiff (10 km/h)"], [4, "Armee (4 km/h)"], [5, "Wanderer (5 km/h)"], [12, "Reiter (12 km/h)"]].map(([v, t]) =>
      el("button", { type: "button", class: "chip" + (v === 10 ? " on" : ""), dataset: { v }, text: t, onclick: e => { speed.value = v; presets.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === e.currentTarget)); calc(); } })));
    const out = el("div", { class: "dist-out" });
    const swap = el("button", { type: "button", class: "chip", text: "⇄ tauschen", onclick: () => { const a = from.value; from.value = to.value; to.value = a; calc(); } });
    function calc() {
      const a = ITALY.cities.find(c => c.id === from.value), b = ITALY.cities.find(c => c.id === to.value);
      const v = Math.max(1, Number(speed.value) || 1);
      const km = haversineKm(a, b);
      const h = km / v;
      const days = h / 24, marchDays = h / 8;
      out.innerHTML = "";
      if (a.id === b.id) { out.appendChild(el("p", { text: "Wähle zwei verschiedene Orte." })); return; }
      out.appendChild(el("div", { class: "dist-row" }, [el("span", { class: "dist-k", text: "Entfernung (Luftlinie)" }), el("span", { class: "dist-v", text: `ca. ${Math.round(km)} km` })]));
      out.appendChild(el("div", { class: "dist-row" }, [el("span", { class: "dist-k", text: `Wegzeit bei ${v} km/h` }), el("span", { class: "dist-v", text: `${Math.round(km)} km : ${v} km/h = ${h < 10 ? h.toFixed(1) : Math.round(h)} Stunden` })]));
      out.appendChild(el("div", { class: "dist-row" }, [el("span", { class: "dist-k", text: "Ohne Pause (24 h am Tag)" }), el("span", { class: "dist-v", text: days < 1 ? "weniger als ein Tag" : `ca. ${days.toFixed(1)} Tage` })]));
      out.appendChild(el("div", { class: "dist-row" }, [el("span", { class: "dist-k", text: "Mit 8 Stunden pro Tag" }), el("span", { class: "dist-v", text: marchDays < 1 ? "weniger als ein Tag" : `ca. ${Math.ceil(marchDays)} Tage` })]));
      const mapBlock = out.closest(".chapter")?.querySelector('[data-map-mode="full"] svg');
      if (mapBlock) drawDistanceLine(mapBlock, a, b);
    }
    [from, to, speed].forEach(x => x.addEventListener("input", () => { presets.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", Number(c.dataset.v) === Number(speed.value))); calc(); }));
    const form = el("div", { class: "dist-form" }, [
      el("label", { class: "field" }, ["Von", from]), el("label", { class: "field" }, ["Nach", to]), swap,
      el("label", { class: "field" }, ["Geschwindigkeit (km/h)", speed]), presets,
    ]);
    const de = el("div", { class: "de" }, [el("p", { html: inlineMd("Aufgabe 1 (S. 111): Wie lang brauchte ein griechischer Händler mit seinem Schiff von Neapel bis zur [[tibermuendung|Tibermündung]] ([[durchschnittsgeschwindigkeit|Durchschnittsgeschwindigkeit]] 10 km/h)? In wie viel Stunden erreichte eine Armee aus Veji die Stadt Rom (4 km/h)? Die Formel: **[[wegzeit|Wegzeit]] = Entfernung : Geschwindigkeit**. Die Linie erscheint auf der Karte oben.") })]);
    const block = blockWrap("b-distance", "Entfernungsrechner", de, "Tarea 1 (p. 111): ¿Cuánto tardaba un comerciante griego en barco de Nápoles a la desembocadura del Tíber (velocidad media 10 km/h)? ¿En cuántas horas llegaba un ejército de Veyes a Roma (4 km/h)? Fórmula: **tiempo = distancia : velocidad**. La línea aparece en el mapa de arriba.", el("div", { class: "dist-grid" }, [form, out]));
    setTimeout(calc, 0);
    return block;
  };

  R.story = () => {
    let i = 0;
    const stage = el("div", { class: "story-stage" });
    const dots = el("div", { class: "story-dots" }, SAGE_CARDS.map((c, k) => el("button", { type: "button", class: "story-dot", "aria-label": c.title, onclick: () => go(k) })));
    const prev = el("button", { type: "button", class: "btn", text: "← zurück", onclick: () => go(i - 1) });
    const next = el("button", { type: "button", class: "btn btn-primary", text: "weiter →", onclick: () => go(i + 1) });
    function go(k) {
      i = Math.max(0, Math.min(SAGE_CARDS.length - 1, k));
      const c = SAGE_CARDS[i];
      stage.innerHTML = "";
      const card = el("div", { class: "story-card" }, [
        el("div", { class: "story-icon" }, [buildIcon(c.icon, 72)]),
        el("div", { class: "story-body" }, [
          el("h4", { text: c.title }),
          el("div", { class: "de", html: md(c.de) }),
          el("p", { class: "es-inline", lang: "es", text: c.es }),
        ]),
      ]);
      stage.appendChild(card);
      dots.querySelectorAll(".story-dot").forEach((d, k2) => d.classList.toggle("on", k2 === i));
      prev.disabled = i === 0; next.disabled = i === SAGE_CARDS.length - 1;
    }
    go(0);
    const wrap = el("div", { class: "story" }, [stage, el("div", { class: "story-nav" }, [prev, dots, next])]);
    return blockWrap("b-story", "D2: Die Sage in neun Stationen", wrap, null);
  };

  R.coin = b => {
    const wrap = el("div", { class: "coin-wrap" }, [el("div", { class: "coin-big" }, [buildCoin(150, true)]), el("div", { class: "de", html: md(b.de) })]);
    return blockWrap("b-coin", b.title, wrap, b.es);
  };

  R.cards = b => {
    const grid = el("div", { class: "cards-grid" }, b.items.map(it => el("div", { class: "card " + (it.good ? "card-good" : "card-bad") }, [
      el("h4", { text: it.title }), el("div", { class: "de", html: md(it.de) }), el("div", { class: "es-box", lang: "es", html: md(it.es) }),
    ])));
    const block = blockWrap("b-cards", b.title, grid, null);
    block.appendChild(esToggle(block));
    return block;
  };

  R.flow = b => {
    const row = el("div", { class: "flow" });
    b.items.forEach((it, k) => {
      row.appendChild(el("div", { class: "flow-item" }, [buildIcon(it.icon, 40), el("span", { class: "de", text: it.de }), el("span", { class: "es-inline", lang: "es", text: it.es })]));
      if (k < b.items.length - 1) row.appendChild(el("span", { class: "flow-arrow", "aria-hidden": "true", text: "→" }));
    });
    return blockWrap("b-flow", b.title, row, null);
  };

  R.compare = b => {
    const col = c => el("div", { class: "cmp-col" }, [el("h4", { text: c.title }), el("ul", {}, c.items.map(t => el("li", { text: t })))]);
    return blockWrap("b-compare", b.title, el("div", { class: "cmp" }, [col(b.left), col(b.right)]), null);
  };

  R.steps = b => {
    const list = el("ol", { class: "steps" }, b.items.map(s => el("li", { class: "step" }, [
      el("div", { class: "step-head" }, [el("span", { class: "step-n", text: "Schritt " + s.n }), el("span", { class: "step-book", text: "Buch: " + s.book }), el("h4", { text: s.title })]),
      el("div", { class: "de", html: md(s.de) }), el("p", { class: "es-inline", lang: "es", text: s.es }),
    ])));
    return blockWrap("b-steps", "Die 6 Schritte (Arbeitsblatt) und die 3 Schritte (Buch)", list, null);
  };

  R.operators = b => {
    const grid = el("div", { class: "ops" }, b.items.map(it => el("div", { class: "op op-" + it.color }, [
      el("div", { class: "op-afb", text: it.afb }),
      el("div", { class: "op-list" }, it.ops.map(o => el("span", { class: "chip chip-static", text: o }))),
      el("p", { class: "de", text: it.de }), el("p", { class: "es-inline", lang: "es", text: it.es }),
    ])));
    return blockWrap("b-ops", b.title, grid, null);
  };

  /* ---------- Quiz ---------- */
  R.quiz = (b, ch) => {
    const quizId = b.big ? "big" : ch.id;
    const n = b.questions.length;
    let answered = 0, correct = 0;
    const list = el("div", { class: "quiz-list" });
    const result = el("div", { class: "quiz-result" });
    const head = el("div", { class: "quiz-head" }, [buildCoin(44, !!state.coins[quizId]), el("div", {}, [el("div", { class: "quiz-status", text: state.coins[quizId] ? "Münze gewonnen! Du kannst trotzdem noch einmal üben." : `${n} Fragen. Mit 80 % richtig gewinnst du die Münze.` })])]);
    function finish() {
      const pct = Math.round(correct / n * 100);
      result.innerHTML = "";
      const won = pct >= 80;
      if (won && !state.coins[quizId]) { state.coins[quizId] = true; save(); refreshCoins(); renderNav(ch.id); }
      result.appendChild(el("div", { class: "quiz-score " + (won ? "won" : "lost") }, [
        won ? buildCoin(56, true) : null,
        el("div", {}, [el("strong", { text: `${correct} von ${n} richtig (${pct} %)` }), el("p", { text: won ? "Sehr gut! Münze gewonnen." : "Noch nicht 80 %. Lies das Kapitel noch einmal und versuche es wieder." }), el("p", { class: "es-inline", lang: "es", text: won ? "¡Muy bien! Moneda ganada." : "Todavía no 80 %. Relee el capítulo e inténtalo otra vez." })]),
      ]));
      result.appendChild(el("button", { type: "button", class: "btn", text: "Noch einmal", onclick: build }));
    }
    function mark(qEl, ok, explain) {
      answered++; if (ok) correct++;
      qEl.classList.add(ok ? "ok" : "bad");
      qEl.appendChild(el("p", { class: "explain", html: (ok ? "Richtig! " : "Leider falsch. ") + esc(explain) }));
      if (answered === n) finish();
    }
    function build() {
      list.innerHTML = ""; result.innerHTML = ""; answered = 0; correct = 0;
      b.questions.forEach((q, k) => {
        const qEl = el("div", { class: "q" }, [el("p", { class: "q-text", html: `<span class="q-n">${k + 1}</span> ${esc(q.q)}` })]);
        if (q.type === "cloze") {
          const inp = el("input", { type: "text", class: "cloze", "aria-label": "Antwort", autocomplete: "off" });
          const btn = el("button", { type: "button", class: "btn btn-small", text: "Prüfen", onclick: () => {
            const v = inp.value.trim().replace(/\.$/, "");
            if (!v) return;
            const ok = q.answers.some(a => a.toLowerCase() === v.toLowerCase());
            inp.disabled = true; btn.disabled = true;
            mark(qEl, ok, ok ? q.explain : `Richtig wäre: ${q.answers[0]}. ${q.explain}`);
          } });
          inp.addEventListener("keydown", e => { if (e.key === "Enter") btn.click(); });
          qEl.appendChild(el("div", { class: "cloze-row" }, [inp, btn]));
        } else {
          const opts = el("div", { class: "opts" }, q.options.map((o, idx) => el("button", { type: "button", class: "opt", text: o, onclick: e => {
            opts.querySelectorAll(".opt").forEach((x, j) => { x.disabled = true; if (j === q.answer) x.classList.add("right"); });
            if (idx !== q.answer) e.currentTarget.classList.add("wrong");
            mark(qEl, idx === q.answer, q.explain);
          } })));
          qEl.appendChild(opts);
        }
        list.appendChild(qEl);
      });
    }
    build();
    const title = b.title || `Quiz: ${ch.title}`;
    return blockWrap("b-quiz" + (b.big ? " b-quiz-big" : ""), title, el("div", { class: "quiz" }, [head, list, result]), null);
  };

  /* ---------- Sortierspiel ---------- */
  R.sort = () => {
    const G = SORT_GAME;
    let selected = null;
    const pool = el("div", { class: "sort-pool", dataset: { bin: "pool" } });
    const bins = {};
    const binsRow = el("div", { class: "sort-bins" });
    G.bins.forEach(bn => {
      const zone = el("div", { class: "sort-bin sort-bin-" + bn.id, dataset: { bin: bn.id } }, [el("h4", {}, [bn.label, el("span", { class: "es-inline", lang: "es", text: bn.es })])]);
      bins[bn.id] = zone; binsRow.appendChild(zone);
    });
    const feedback = el("div", { class: "sort-feedback" });
    const cards = G.cards.map((c, k) => {
      const card = el("button", { type: "button", class: "sort-card", draggable: "true", dataset: { k }, onclick: () => {
        if (selected === card) { selected.classList.remove("sel"); selected = null; return; }
        if (selected) selected.classList.remove("sel");
        selected = card; card.classList.add("sel");
        feedback.textContent = "Jetzt tippe auf eine Spalte.";
      } }, [el("span", { class: "de", text: c.de }), el("span", { class: "es-inline", lang: "es", text: c.es })]);
      card.addEventListener("dragstart", e => { e.dataTransfer.setData("text/plain", String(k)); card.classList.add("dragging"); });
      card.addEventListener("dragend", () => card.classList.remove("dragging"));
      return card;
    });
    function place(card, zone) {
      zone.appendChild(card); card.classList.remove("sel", "right", "wrong"); selected = null; feedback.textContent = "";
    }
    [pool, ...Object.values(bins)].forEach(zone => {
      zone.addEventListener("click", e => { if (selected && !e.target.closest(".sort-card")) place(selected, zone); });
      zone.addEventListener("dragover", e => { e.preventDefault(); zone.classList.add("over"); });
      zone.addEventListener("dragleave", () => zone.classList.remove("over"));
      zone.addEventListener("drop", e => { e.preventDefault(); zone.classList.remove("over"); const k = e.dataTransfer.getData("text/plain"); if (k !== "") place(cards[Number(k)], zone); });
    });
    function shuffle() { cards.slice().sort(() => Math.random() - 0.5).forEach(c => pool.appendChild(c)); cards.forEach(c => c.classList.remove("right", "wrong")); feedback.textContent = ""; summary.hidden = true; }
    const check = el("button", { type: "button", class: "btn btn-primary", text: "Prüfen", onclick: () => {
      let right = 0, placed = 0;
      cards.forEach(c => {
        const zone = c.parentElement.dataset.bin;
        if (zone === "pool") return;
        placed++;
        const ok = zone === G.cards[Number(c.dataset.k)].bin;
        c.classList.toggle("right", ok); c.classList.toggle("wrong", !ok);
        if (ok) right++;
      });
      feedback.textContent = placed < cards.length ? `${cards.length - placed} Karten liegen noch im Stapel. ${right} richtig bisher.` : (right === cards.length ? "Alle richtig! Jetzt kannst du die Tabelle unten ausfüllen." : `${right} von ${cards.length} richtig. Die roten Karten gehören in eine andere Spalte.`);
    } });
    const reset = el("button", { type: "button", class: "btn", text: "Neu mischen", onclick: shuffle });
    const summary = el("div", { class: "sort-summary", hidden: true }, [
      el("h4", { text: "Musterlösung: Gemeinsamkeiten und Unterschiede" }),
      el("div", { class: "cmp" }, [
        el("div", { class: "cmp-col" }, [el("h4", { text: "Gemeinsamkeiten" }), el("ul", {}, G.summary.gemein.map(t => el("li", { text: t })))]),
        el("div", { class: "cmp-col" }, [el("h4", { text: "Unterschiede" }), el("table", { class: "tbl" }, [
          el("thead", {}, [el("tr", {}, [el("th", { text: "" }), el("th", { text: "Sage" }), el("th", { text: "Wissenschaft" })])]),
          el("tbody", {}, G.summary.unterschiede.map(r => el("tr", {}, r.map((c, j) => el(j ? "td" : "th", { text: c }))))),
        ])]),
      ]),
    ]);
    const showSum = el("button", { type: "button", class: "btn", text: "Lösung zeigen", onclick: () => { summary.hidden = !summary.hidden; } });
    shuffle();
    const wrap = el("div", { class: "sort" }, [
      el("p", { class: "sort-help", text: "Tippe auf eine Karte und dann auf eine Spalte (oder ziehe die Karte)." }),
      el("div", { class: "sort-pool-wrap" }, [el("h4", { text: "Karten" }), pool]), binsRow,
      el("div", { class: "btn-row" }, [check, reset, showSum]), feedback, summary,
    ]);
    return blockWrap("b-sort", "Sortierspiel: Sage, Wissenschaft oder beide?", wrap, null);
  };

  /* ---------- Redemittel-Baukasten ---------- */
  R.builder = () => {
    const ta = el("textarea", { class: "builder-ta", id: "builder-ta", rows: 12, placeholder: "Hier entsteht deine Kartenauswertung. Tippe links auf die Satzanfänge und ergänze sie.", "aria-label": "Dein Text" });
    ta.value = state.builderText || "";
    const checks = el("ul", { class: "checks" });
    function evalChecks() {
      const t = ta.value;
      checks.innerHTML = "";
      BUILDER_CHECKS.forEach(c => checks.appendChild(el("li", { class: c.re.test(t) ? "done" : "" }, [el("span", { class: "de", text: c.de }), el("span", { class: "es-inline", lang: "es", text: c.es })])));
      const words = t.trim() ? t.trim().split(/\s+/).length : 0;
      counter.textContent = `${words} Wörter`;
    }
    const counter = el("span", { class: "counter" });
    ta.addEventListener("input", () => { state.builderText = ta.value; save(); evalChecks(); });
    const groups = el("div", { class: "rm-groups" }, REDEMITTEL.map(g => el("details", { class: "rm-group", open: true }, [
      el("summary", {}, [g.step, el("span", { class: "es-inline", lang: "es", text: g.es })]),
      el("div", { class: "rm-items" }, g.items.map(s => el("button", { type: "button", class: "rm-chip", text: s, onclick: () => {
        const sep = ta.value && !ta.value.endsWith("\n") ? "\n" : "";
        ta.value += sep + s + " ";
        ta.focus(); state.builderText = ta.value; save(); evalChecks();
      } }))),
    ])));
    const muster = el("div", { class: "muster", hidden: true }, [el("h4", { text: "Beispieltext (so könnte es aussehen)" }), el("div", { class: "de", html: md(MUSTERTEXT) })]);
    const copyBtn = el("button", { type: "button", class: "btn", text: "Text kopieren", onclick: () => {
      const done = () => { copyBtn.textContent = "Kopiert!"; setTimeout(() => copyBtn.textContent = "Text kopieren", 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(done).catch(() => { ta.select(); });
      else ta.select();
    } });
    const row = el("div", { class: "btn-row" }, [
      el("button", { type: "button", class: "btn", text: "Beispieltext zeigen", onclick: () => { muster.hidden = !muster.hidden; } }),
      copyBtn,
      el("button", { type: "button", class: "btn btn-ghost", text: "Leeren", onclick: () => { ta.value = ""; state.builderText = ""; save(); evalChecks(); } }),
    ]);
    evalChecks();
    const grid = el("div", { class: "builder" }, [
      el("div", { class: "builder-left" }, [el("h4", { text: "Redemittel (Arbeitsblatt + Buch)" }), groups]),
      el("div", { class: "builder-right" }, [el("div", { class: "builder-head" }, [el("h4", { text: "Deine Kartenauswertung (Schritt 5)" }), counter]), ta, el("h4", { class: "checks-title", text: "Checkliste" }), checks, row, muster]),
    ]);
    const de = el("div", { class: "de" }, [el("p", { html: inlineMd("Übe Schritt 5: Schreibe eine Auswertung der Karte 'Völker Italiens im 6. Jh. v. Chr.' mit den [[redemittel|Redemitteln]] deiner Lehrerin. Die Checkliste zeigt dir, was noch fehlt. Dein Text wird im Browser gespeichert.") })]);
    return blockWrap("b-builder", "Satz-Baukasten: Die Karte auswerten", de, "Practica el paso 5: escribe una evaluación del mapa 'Pueblos de Italia en el siglo VI a. C.' con las frases modelo de tu profesora. La lista de control te muestra lo que falta. Tu texto se guarda en el navegador.", grid);
  };

  /* ---------- Hausaufgaben-Tabelle ---------- */
  R.table = () => {
    const rows = VORAUSSETZUNGEN.map(r => {
      const ta = el("textarea", { class: "tbl-ta", id: "vor-" + r.key, rows: 4, placeholder: "Deine Stichpunkte …", "aria-label": r.title });
      ta.value = (state.table && state.table[r.key]) || "";
      ta.addEventListener("input", () => { state.table = state.table || {}; state.table[r.key] = ta.value; save(); });
      const sol = el("div", { class: "sol", hidden: true }, [
        el("ul", { class: "de" }, r.points.map(p => el("li", { text: p }))),
        el("ul", { class: "es-inline", lang: "es" }, r.esPoints.map(p => el("li", { text: p }))),
      ]);
      const btn = el("button", { type: "button", class: "btn btn-small", text: "Lösung zeigen", onclick: () => { sol.hidden = !sol.hidden; btn.textContent = sol.hidden ? "Lösung zeigen" : "Lösung verbergen"; } });
      return el("div", { class: "vrow" }, [
        el("div", { class: "vrow-head" }, [el("h4", { text: r.title }), el("span", { class: "es-inline", lang: "es", text: r.es }), el("span", { class: "src", text: r.src })]),
        ta, btn, sol,
      ]);
    });
    const de = el("div", { class: "de" }, [el("p", { html: inlineMd("Arbeitsauftrag: Arbeite die Informationen für die [[voraussetzung|Voraussetzungen]] zur Entstehung Roms aus den Texten und D1 heraus. Schreibe in [[stichpunkte|Stichpunkten]], dann vergleiche mit der Lösung. Deine Notizen bleiben im Browser gespeichert.") })]);
    return blockWrap("b-table", "Hausaufgabe: Voraussetzungen für die Entstehung der Stadt Rom", de, "Tarea: extrae de los textos y de D1 la información sobre las condiciones para el surgimiento de Roma. Escribe en palabras clave, luego compara con la solución. Tus notas se guardan en el navegador.", el("div", { class: "vtable" }, rows));
  };

  R.tasks = b => {
    const list = el("div", { class: "tasks" }, b.items.map(it => {
      const d = el("details", { class: "task" }, [
        el("summary", {}, [el("span", { class: "afb afb-" + it.afb.length, text: "AFB " + it.afb }), el("span", { class: "task-q", text: it.q })]),
        el("div", { class: "task-body" }, [el("div", { class: "de", html: md(it.de) }), el("div", { class: "es-box", lang: "es", html: md(it.es) })]),
      ]);
      const b2 = d.querySelector(".task-body");
      b2.appendChild(esToggle(b2));
      return d;
    }));
    return blockWrap("b-tasks", b.title, list, null);
  };

  /* ---------- Vokabular ---------- */
  R.glossary = () => {
    const entries = Object.entries(GLOSSAR).map(([k, g]) => ({ k, ...g })).sort((a, b) => a.de.replace(/^(der|die|das)\s/, "").localeCompare(b.de.replace(/^(der|die|das)\s/, ""), "de"));
    const TAGS = [["alle", "Alle"], ["rom", "Rom"], ["methode", "Methode"], ["karte", "Karten"], ["operator", "Operatoren"]];
    let tag = "alle", query = "", mode = "list", fi = 0, flipped = false, deck = entries;
    const search = el("input", { type: "search", class: "search", id: "gl-search", placeholder: "Wort suchen (Deutsch oder Spanisch) …", "aria-label": "Suche" });
    const tagRow = el("div", { class: "tag-row" }, TAGS.map(([t, name]) => el("button", { type: "button", class: "chip" + (t === "alle" ? " on" : ""), dataset: { t }, text: name, onclick: e => { tag = t; tagRow.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === e.currentTarget)); render(); } })));
    const modeRow = el("div", { class: "mode-row" }, [["list", "Liste"], ["cards", "Karteikarten"]].map(([m, name]) => el("button", { type: "button", class: "chip" + (m === "list" ? " on" : ""), dataset: { m }, text: name, onclick: e => { mode = m; fi = 0; flipped = false; modeRow.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === e.currentTarget)); render(); } })));
    const out = el("div", { class: "gl-out" });
    const count = el("span", { class: "counter" });
    function filtered() {
      const q = query.toLowerCase();
      return entries.filter(g => (tag === "alle" || g.tag === tag) && (!q || g.de.toLowerCase().includes(q) || g.es.toLowerCase().includes(q) || g.def.toLowerCase().includes(q)));
    }
    function render() {
      const list = filtered();
      count.textContent = `${list.length} Wörter`;
      out.innerHTML = "";
      if (mode === "list") {
        out.appendChild(el("div", { class: "gl-list" }, list.map(g => el("div", { class: "gl-item" }, [
          el("div", { class: "gl-head" }, [el("strong", { text: g.de }), el("span", { class: "gl-es", lang: "es", text: g.es })]),
          el("p", { class: "gl-def", text: g.def }), el("p", { class: "gl-ex", text: "„" + g.ex + "“" }),
        ]))));
        if (!list.length) out.appendChild(el("p", { text: "Kein Wort gefunden." }));
      } else {
        deck = list;
        if (!deck.length) { out.appendChild(el("p", { text: "Kein Wort gefunden." })); return; }
        fi = Math.min(fi, deck.length - 1);
        const g = deck[fi];
        const card = el("button", { type: "button", class: "flash" + (flipped ? " flipped" : ""), "aria-label": "Karte umdrehen", onclick: () => { flipped = !flipped; render(); } }, [
          el("div", { class: "flash-front" }, [el("span", { class: "flash-hint", text: "Was bedeutet …?" }), el("strong", { text: g.de })]),
          el("div", { class: "flash-back" }, [el("span", { class: "flash-es", lang: "es", text: g.es }), el("p", { text: g.def }), el("p", { class: "gl-ex", text: "„" + g.ex + "“" })]),
        ]);
        out.appendChild(card);
        out.appendChild(el("div", { class: "flash-nav" }, [
          el("button", { type: "button", class: "btn", text: "← zurück", disabled: fi === 0, onclick: () => { fi--; flipped = false; render(); } }),
          el("span", { class: "counter", text: `${fi + 1} / ${deck.length}` }),
          el("button", { type: "button", class: "btn", text: "mischen", onclick: () => { entries.sort(() => Math.random() - 0.5); fi = 0; flipped = false; render(); } }),
          el("button", { type: "button", class: "btn btn-primary", text: "weiter →", disabled: fi >= deck.length - 1, onclick: () => { fi++; flipped = false; render(); } }),
        ]));
      }
    }
    search.addEventListener("input", () => { query = search.value.trim(); fi = 0; render(); });
    render();
    const wrap = el("div", { class: "glossary" }, [el("div", { class: "gl-tools" }, [search, tagRow, modeRow, count]), out]);
    return blockWrap("b-glossary", null, wrap, null);
  };

  /* ---------- Film ---------- */
  const FILM = { lang: "de", video: null };
  const FILM_SRC = { de: "film/rom-film-de.mp4", es: "film/rom-film-es.mp4" };
  R.video = () => {
    const video = el("video", { class: "film-video", controls: true, playsinline: true, preload: "metadata", poster: "film/poster.jpg" });
    video.src = FILM_SRC.de;
    FILM.video = video;
    const label = { de: "Deutsch gesprochen · spanische Untertitel", es: "Spanisch gesprochen · deutsche Untertitel" };
    const tabs = el("div", { class: "film-tabs" }, ["de", "es"].map(l => el("button", { type: "button", class: "chip" + (l === "de" ? " on" : ""), dataset: { l }, text: label[l], onclick: e => {
      FILM.lang = l; tabs.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === e.currentTarget));
      const t = video.currentTime, playing = !video.paused;
      video.src = FILM_SRC[l]; video.load(); video.currentTime = t; if (playing) video.play().catch(() => {});
      document.querySelectorAll(".tr-line").forEach(x => x.classList.remove("active"));
    } })));
    const dl = el("p", { class: "film-dl" }, ["Herunterladen: ", el("a", { href: FILM_SRC.de, download: "rom-film-deutsch.mp4", text: "deutsche Version" }), " · ", el("a", { href: FILM_SRC.es, download: "rom-film-spanisch.mp4", text: "spanische Version" })]);
    video.addEventListener("timeupdate", () => {
      const key = FILM.lang === "de" ? "tde" : "tes"; const t = video.currentTime; let best = null;
      document.querySelectorAll(".tr-line").forEach(x => { const st = Number(x.dataset[key]); if (st <= t + 0.05) best = x; x.classList.remove("active"); });
      if (best) best.classList.add("active");
    });
    return blockWrap("b-video", "Rom – vom Dorf zum Weltreich (Film)", el("div", { class: "film" }, [tabs, el("div", { class: "film-frame" }, [video]), dl]), null);
  };
  R.transcript = () => {
    if (typeof FILM_SCRIPT === "undefined") return el("div");
    const wrap = el("div", { class: "transcript" });
    FILM_SCRIPT.scenes.forEach(sc => {
      const sec = el("section", { class: "tr-scene" });
      if (sc.kicker) sec.appendChild(el("h4", { text: sc.kicker }));
      sc.lines.forEach(l => {
        const row = el("button", { type: "button", class: "tr-line", dataset: { tde: l.tde, tes: l.tes }, onclick: () => {
          const v = FILM.video; if (!v) return;
          v.currentTime = FILM.lang === "de" ? l.tde : l.tes; v.play().catch(() => {});
          v.scrollIntoView({ behavior: "smooth", block: "center" });
        } }, [el("span", { class: "tr-de", text: l.de }), el("span", { class: "tr-es", lang: "es", text: l.es })]);
        sec.appendChild(row);
      });
      wrap.appendChild(sec);
    });
    return blockWrap("b-transcript", "Der Text zum Film (Deutsch und Spanisch)", wrap, null);
  };

  /* ---------- Kapitel ---------- */
  function renderChapter(id) {
    const ch = CHAPTERS.find(c => c.id === id) || CHAPTERS[0];
    closePop();
    state.visited[ch.id] = true; save();
    main.innerHTML = "";
    const art = el("article", { class: "chapter", id: "ch-" + ch.id });
    art.appendChild(el("header", { class: "ch-head" }, [
      el("div", { class: "ch-kicker", text: ch.num < 9 ? `Kapitel ${ch.num}` : (ch.kicker || "Nachschlagen") }),
      el("h2", { class: "ch-title", text: ch.title }),
      el("p", { class: "ch-sub", text: ch.sub }),
    ]));
    ch.blocks.forEach(b => { const fn = R[b.type]; if (fn) art.appendChild(fn(b, ch)); });
    const idx = CHAPTERS.indexOf(ch);
    const prev = CHAPTERS[idx - 1], next = CHAPTERS[idx + 1];
    art.appendChild(el("nav", { class: "ch-foot" }, [
      prev ? el("a", { href: "#" + prev.id, class: "btn", text: "← " + prev.short }) : el("span"),
      next ? el("a", { href: "#" + next.id, class: "btn btn-primary", text: next.short + " →" }) : el("span"),
    ]));
    main.appendChild(art);
    renderNav(ch.id);
    document.title = `${ch.title} · Rom: Vom Dorf zum Weltreich`;
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function route() {
    const id = (location.hash || "#start").slice(1);
    renderChapter(CHAPTERS.some(c => c.id === id) ? id : "start");
  }

  /* ---------- Start ---------- */
  document.body.classList.toggle("es-all", !!state.esAll);
  renderHeaderTools();
  window.addEventListener("hashchange", route);
  route();
})();
