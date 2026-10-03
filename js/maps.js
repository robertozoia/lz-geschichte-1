/* =====================================================================
   KARTEN & GRAFIKEN (inline SVG)
   ===================================================================== */
const SVG_NS = "http://www.w3.org/2000/svg";

function svgEl(tag, attrs = {}, children = []) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === undefined) continue;
    el.setAttribute(k, v);
  }
  for (const c of children) {
    if (typeof c === "string") el.appendChild(document.createTextNode(c));
    else if (c) el.appendChild(c);
  }
  return el;
}

/* ---------- Projektion Italien ---------- */
const ITALY_VIEW = { w: 640, h: 720 };
function project(lon, lat) {
  const b = ITALY.bounds;
  return [
    ((lon - b.lonMin) / (b.lonMax - b.lonMin)) * ITALY_VIEW.w,
    ((b.latMax - lat) / (b.latMax - b.latMin)) * ITALY_VIEW.h,
  ];
}
function ptsToPath(pts, close = true) {
  return pts.map((p, i) => (i ? "L" : "M") + project(p[0], p[1]).map(n => n.toFixed(1)).join(" ")).join(" ") + (close ? " Z" : "");
}
function haversineKm(a, b) {
  const R = 6371, toRad = d => d * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/* ---------- Italien-Karte ---------- */
function buildItalyMap(mode = "full") {
  const svg = svgEl("svg", { viewBox: `0 0 ${ITALY_VIEW.w} ${ITALY_VIEW.h}`, class: "map map-italy", role: "img", "aria-label": "Karte: Völker Italiens im 6. Jahrhundert v. Chr." });
  const defs = svgEl("defs");
  const pattern = svgEl("pattern", { id: "hatch-" + mode, width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, [
    svgEl("line", { x1: 0, y1: 0, x2: 0, y2: 6, stroke: "var(--map-hatch)", "stroke-width": 1.2 })
  ]);
  defs.appendChild(pattern);
  svg.appendChild(defs);

  const clip = svgEl("clipPath", { id: "land-clip-" + mode });
  clip.appendChild(svgEl("path", { d: ptsToPath(ITALY.land) }));
  ITALY.islands.forEach(isl => clip.appendChild(svgEl("path", { d: ptsToPath(isl) })));
  defs.appendChild(clip);

  svg.appendChild(svgEl("rect", { x: 0, y: 0, width: ITALY_VIEW.w, height: ITALY_VIEW.h, class: "sea" }));
  const land = svgEl("g", { class: "land" });
  land.appendChild(svgEl("path", { d: ptsToPath(ITALY.land) }));
  ITALY.islands.forEach(isl => land.appendChild(svgEl("path", { d: ptsToPath(isl) })));
  svg.appendChild(land);

  const regions = svgEl("g", { class: "regions", "clip-path": `url(#land-clip-${mode})` });
  ITALY.regions.forEach(r => {
    regions.appendChild(svgEl("path", { d: ptsToPath(r.pts), class: "region region-" + r.group, "data-group": r.group }, [svgEl("title", {}, [r.name])]));
  });
  svg.appendChild(regions);

  // Tiber (kurz) als Linie
  const tiber = [[12.49, 41.89], [12.3, 41.78], [12.28, 41.73]];
  svg.appendChild(svgEl("path", { d: ptsToPath([[12.6, 42.4], [12.45, 42.1], [12.5, 41.92], [12.3, 41.78], [12.28, 41.73]], false), class: "river" }));

  const labels = svgEl("g", { class: "labels" });
  ITALY.labels.forEach(l => {
    const [x, y] = project(l.lon, l.lat);
    const t = svgEl("text", { x, y, class: "lbl lbl-" + l.group + (l.big ? " lbl-big" : ""), "data-group": l.group, "text-anchor": "middle", transform: l.rotate ? `rotate(${l.rotate} ${x} ${y})` : null }, [l.text]);
    labels.appendChild(t);
  });
  svg.appendChild(labels);

  const cities = svgEl("g", { class: "cities" });
  ITALY.cities.forEach(c => {
    const [x, y] = project(c.lon, c.lat);
    const g = svgEl("g", { class: "city city-" + c.group, "data-id": c.id, tabindex: 0, role: "button", "aria-label": c.name });
    g.appendChild(svgEl("circle", { cx: x, cy: y, r: 14, class: "city-hit" }));
    g.appendChild(svgEl("circle", { cx: x, cy: y, r: c.id === "rom" ? 6 : 4.5, class: "city-dot" }));
    const LBL = { caere: ["end", -8, 4], tarquinii: ["end", -8, 4], ostia: ["end", -8, 14], kyme: ["end", -8, 14], metapont: ["end", -8, 14], epidaurus: ["end", -8, 4], antipolis: ["start", 8, 14], veji: ["start", 8, -6], neapolis: ["start", 8, 4] };
    const [anchor, dx, dy] = LBL[c.id] || ["start", 8, 4];
    g.appendChild(svgEl("text", { x: x + dx, y: y + dy, class: "city-lbl" + (c.id === "rom" ? " city-lbl-rom" : ""), "text-anchor": anchor }, [c.name]));
    cities.appendChild(g);
  });
  svg.appendChild(cities);

  // Linie für Entfernungsrechner
  svg.appendChild(svgEl("g", { class: "dist-layer" }));

  // Maßstab: 200 km bei 42° N
  const kmPerDegLon = 111.32 * Math.cos(42 * Math.PI / 180);
  const px200 = (200 / kmPerDegLon) / (ITALY.bounds.lonMax - ITALY.bounds.lonMin) * ITALY_VIEW.w;
  const sx = 30, sy = ITALY_VIEW.h - 40;
  const scale = svgEl("g", { class: "scale" }, [
    svgEl("rect", { x: sx - 8, y: sy - 22, width: px200 + 16, height: 40, class: "scale-bg", rx: 4 }),
    svgEl("line", { x1: sx, y1: sy, x2: sx + px200, y2: sy }),
    svgEl("line", { x1: sx, y1: sy - 6, x2: sx, y2: sy + 6 }),
    svgEl("line", { x1: sx + px200 / 2, y1: sy - 4, x2: sx + px200 / 2, y2: sy + 4 }),
    svgEl("line", { x1: sx + px200, y1: sy - 6, x2: sx + px200, y2: sy + 6 }),
    svgEl("text", { x: sx, y: sy - 9, class: "scale-lbl" }, ["0"]),
    svgEl("text", { x: sx + px200 / 2, y: sy - 9, class: "scale-lbl", "text-anchor": "middle" }, ["100"]),
    svgEl("text", { x: sx + px200, y: sy - 9, class: "scale-lbl", "text-anchor": "end" }, ["200 km"]),
  ]);
  svg.appendChild(scale);

  // Nordpfeil
  svg.appendChild(svgEl("g", { class: "north", transform: `translate(${ITALY_VIEW.w - 40} 40)` }, [
    svgEl("path", { d: "M0 -18 L8 8 L0 2 L-8 8 Z" }),
    svgEl("text", { x: 0, y: 24, "text-anchor": "middle" }, ["N"]),
  ]));

  if (mode === "arrivals") {
    svg.classList.add("map-arrivals");
    const arrows = svgEl("g", { class: "arrivals" });
    const routes = [
      { id: "latiner", label: "Latiner · um 1000 v. Chr.", pts: [[14.6, 44.3], [13.6, 43.2], [12.9, 42.4], [12.55, 41.95]] },
      { id: "etrusker", label: "Etrusker · um 700 v. Chr. (ein Teil wohl aus Kleinasien)", pts: [[19.2, 38.6], [16.0, 39.9], [13.0, 41.4], [11.9, 42.3], [11.5, 42.9]] },
      { id: "griechen", label: "Griechen · Kolonien ab ca. 750 v. Chr.", pts: [[19.2, 39.9], [17.6, 40.1], [16.0, 39.9], [14.6, 40.4], [14.2, 40.8]] },
    ];
    routes.forEach((r, i) => {
      const d = r.pts.map((p, j) => (j ? "L" : "M") + project(p[0], p[1]).map(n => n.toFixed(1)).join(" ")).join(" ");
      const path = svgEl("path", { d, class: "arrival arrival-" + r.id, pathLength: 1, style: `--delay:${i * 1.2}s` });
      arrows.appendChild(path);
      const [lx, ly] = project(r.pts[r.pts.length - 1][0], r.pts[r.pts.length - 1][1]);
      arrows.appendChild(svgEl("circle", { cx: lx, cy: ly, r: 7, class: "arrival-end arrival-" + r.id, style: `--delay:${i * 1.2 + 1.4}s` }));
    });
    svg.appendChild(arrows);
    svg.dataset.routes = JSON.stringify(routes.map(r => ({ id: r.id, label: r.label })));
  }
  return svg;
}

function drawDistanceLine(svg, a, b) {
  const layer = svg.querySelector(".dist-layer");
  if (!layer) return;
  layer.innerHTML = "";
  if (!a || !b) return;
  const [x1, y1] = project(a.lon, a.lat), [x2, y2] = project(b.lon, b.lat);
  layer.appendChild(svgEl("line", { x1, y1, x2, y2, class: "dist-line" }));
  layer.appendChild(svgEl("circle", { cx: x1, cy: y1, r: 9, class: "dist-end" }));
  layer.appendChild(svgEl("circle", { cx: x2, cy: y2, r: 9, class: "dist-end" }));
}

/* ---------- Landschaft Roms (D1) ---------- */
function buildRomeMap() {
  const W = 800, H = 500;
  const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "map map-rome", role: "img", "aria-label": "Rekonstruktion: Die Landschaft Roms vor ca. 2700 Jahren" });
  const defs = svgEl("defs");
  defs.appendChild(svgEl("pattern", { id: "marsh", width: 10, height: 8, patternUnits: "userSpaceOnUse" }, [
    svgEl("path", { d: "M0 6 Q2.5 2 5 6 T10 6", fill: "none", stroke: "var(--map-marsh-line)", "stroke-width": 1 })
  ]));
  defs.appendChild(svgEl("pattern", { id: "fields", width: 14, height: 14, patternUnits: "userSpaceOnUse", patternTransform: "rotate(-20)" }, [
    svgEl("rect", { width: 14, height: 14, fill: "var(--map-field-a)" }),
    svgEl("rect", { width: 14, height: 7, fill: "var(--map-field-b)" }),
  ]));
  svg.appendChild(defs);

  // Land
  svg.appendChild(svgEl("rect", { x: 0, y: 0, width: W, height: H, class: "rome-land" }));
  // Felder (rechts unten)
  svg.appendChild(svgEl("path", { d: "M560 470 L800 380 L800 500 L520 500 Z", fill: "url(#fields)", opacity: 0.85 }));
  svg.appendChild(svgEl("path", { d: "M0 230 L120 200 L150 300 L40 330 Z", fill: "url(#fields)", opacity: 0.6 }));
  // Hügel Etrurien (oben links), Latium (oben rechts)
  [[90, 130, 70, 22], [200, 110, 60, 18], [40, 60, 50, 16], [640, 150, 60, 18], [740, 120, 55, 16]].forEach(([cx, cy, rx, ry]) =>
    svg.appendChild(svgEl("ellipse", { cx, cy, rx, ry, class: "far-hill" })));
  // Meer
  svg.appendChild(svgEl("path", { d: "M0 360 Q70 380 110 420 Q150 460 190 500 L0 500 Z", class: "rome-sea" }));
  svg.appendChild(svgEl("text", { x: 50, y: 470, class: "rome-sea-lbl" }, ["Mittelmeer"]));
  // Tiber
  const tiberD = "M335 -10 C320 60 275 100 298 150 C320 200 400 215 400 250 C400 290 430 320 385 352 C335 385 200 405 125 460 L100 500";
  svg.appendChild(svgEl("path", { d: tiberD, class: "tiber tiber-bank" }));
  svg.appendChild(svgEl("path", { d: tiberD, class: "tiber tiber-water" }));
  svg.appendChild(svgEl("path", { d: tiberD, class: "tiber tiber-flow" }));
  svg.appendChild(svgEl("text", { x: 262, y: 130, class: "rome-lbl rome-lbl-river", transform: "rotate(-60 262 130)" }, ["Tiber"]));
  // Tiberinsel
  svg.appendChild(svgEl("ellipse", { cx: 398, cy: 262, rx: 11, ry: 24, class: "island" }));
  // Furt (Steine)
  [[392, 318], [404, 312], [416, 307], [428, 303], [440, 299]].forEach(([cx, cy]) => svg.appendChild(svgEl("circle", { cx, cy, r: 3.2, class: "ford-stone" })));
  // Salzstraße
  svg.appendChild(svgEl("path", { d: "M150 418 C170 370 180 340 215 330 C290 315 360 322 420 303 C500 278 560 262 640 240 C700 224 760 205 800 196", class: "road" }));
  svg.appendChild(svgEl("text", { x: 262, y: 352, class: "rome-lbl rome-lbl-road", transform: "rotate(-8 262 352)" }, ["Salzstraße"]));
  // Hügel Kapitol + Palatin
  svg.appendChild(svgEl("ellipse", { cx: 505, cy: 195, rx: 58, ry: 40, class: "hill" }));
  svg.appendChild(svgEl("ellipse", { cx: 505, cy: 185, rx: 36, ry: 20, class: "hill-top" }));
  svg.appendChild(svgEl("ellipse", { cx: 560, cy: 330, rx: 68, ry: 44, class: "hill" }));
  svg.appendChild(svgEl("ellipse", { cx: 560, cy: 318, rx: 42, ry: 22, class: "hill-top" }));
  // Hütten auf dem Palatin
  [[540, 312], [560, 306], [580, 314], [552, 326]].forEach(([x, y]) =>
    svg.appendChild(svgEl("path", { d: `M${x - 7} ${y + 6} L${x} ${y - 6} L${x + 7} ${y + 6} Z`, class: "hut" })));
  // Sumpf
  svg.appendChild(svgEl("ellipse", { cx: 540, cy: 262, rx: 48, ry: 22, class: "marsh" }));
  svg.appendChild(svgEl("ellipse", { cx: 540, cy: 262, rx: 48, ry: 22, fill: "url(#marsh)" }));
  // Labels
  svg.appendChild(svgEl("text", { x: 505, y: 190, class: "rome-lbl rome-lbl-hill", "text-anchor": "middle" }, ["Kapitol"]));
  svg.appendChild(svgEl("text", { x: 560, y: 350, class: "rome-lbl rome-lbl-hill", "text-anchor": "middle" }, ["Palatin"]));
  svg.appendChild(svgEl("text", { x: 150, y: 60, class: "rome-lbl rome-lbl-region" }, ["Etrurien"]));
  svg.appendChild(svgEl("text", { x: 640, y: 80, class: "rome-lbl rome-lbl-region" }, ["Latium"]));
  svg.appendChild(svgEl("text", { x: 30, y: 395, class: "rome-lbl rome-lbl-small" }, ["ca. 15 km"]));
  // Sonne
  svg.appendChild(svgEl("circle", { cx: 720, cy: 40, r: 16, class: "sun" }));
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    svg.appendChild(svgEl("line", { x1: 720 + Math.cos(a) * 22, y1: 40 + Math.sin(a) * 22, x2: 720 + Math.cos(a) * 30, y2: 40 + Math.sin(a) * 30, class: "sun-ray" }));
  }
  // Hotspots
  const spots = svgEl("g", { class: "spots" });
  ROME_SPOTS.forEach((s, i) => {
    const g = svgEl("g", { class: "spot", "data-id": s.id, tabindex: 0, role: "button", "aria-label": s.name, style: `--i:${i}` });
    g.appendChild(svgEl("circle", { cx: s.x, cy: s.y, r: 15, class: "spot-pulse" }));
    g.appendChild(svgEl("circle", { cx: s.x, cy: s.y, r: 11, class: "spot-dot" }));
    g.appendChild(svgEl("text", { x: s.x, y: s.y + 4.5, class: "spot-num", "text-anchor": "middle" }, [String(i + 1)]));
    spots.appendChild(g);
  });
  svg.appendChild(spots);
  return svg;
}

/* ---------- Zeitleiste ---------- */
function buildTimeline() {
  const W = 900, H = 120;
  const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "timeline-svg", role: "img", "aria-label": "Zeitleiste" });
  const years = TIMELINE.map(t => t.year);
  // nicht-lineare Achse: Positionen gleichmäßig, da die letzte Station weit entfernt ist
  const n = TIMELINE.length, pad = 60;
  const xOf = i => pad + i * (W - 2 * pad) / (n - 1);
  svg.appendChild(svgEl("line", { x1: pad - 30, y1: 60, x2: xOf(n - 2) + 40, y2: 60, class: "tl-axis" }));
  svg.appendChild(svgEl("line", { x1: xOf(n - 2) + 40, y1: 60, x2: xOf(n - 1) - 30, y2: 60, class: "tl-axis tl-axis-gap" }));
  svg.appendChild(svgEl("line", { x1: xOf(n - 1) - 30, y1: 60, x2: W - 10, y2: 60, class: "tl-axis" }));
  svg.appendChild(svgEl("path", { d: `M${W - 18} 52 L${W - 6} 60 L${W - 18} 68`, class: "tl-arrow" }));
  TIMELINE.forEach((t, i) => {
    const x = xOf(i);
    const g = svgEl("g", { class: "tl-event", "data-i": i, tabindex: 0, role: "button", "aria-label": t.label, style: `--i:${i}` });
    g.appendChild(svgEl("circle", { cx: x, cy: 60, r: 16, class: "tl-hit" }));
    g.appendChild(svgEl("circle", { cx: x, cy: 60, r: 9, class: "tl-dot" }));
    g.appendChild(svgEl("text", { x, y: i % 2 ? 100 : 36, class: "tl-lbl", "text-anchor": "middle" }, [t.label]));
    svg.appendChild(g);
  });
  return svg;
}

/* ---------- Münze ---------- */
function buildCoin(size = 64, earned = true) {
  const svg = svgEl("svg", { viewBox: "0 0 100 100", width: size, height: size, class: "coin" + (earned ? " coin-earned" : " coin-empty"), "aria-hidden": "true" });
  svg.appendChild(svgEl("circle", { cx: 50, cy: 50, r: 47, class: "coin-rim" }));
  svg.appendChild(svgEl("circle", { cx: 50, cy: 50, r: 41, class: "coin-face" }));
  // Wölfin
  svg.appendChild(svgEl("path", { class: "coin-wolf", d: "M22 58 L26 44 L32 40 L46 40 L58 36 L66 30 L72 32 L70 38 L76 42 L74 46 L66 46 L62 50 L60 58 L56 56 L54 50 L46 52 L44 58 L40 56 L40 50 L32 50 L30 58 Z" }));
  // Zwillinge
  svg.appendChild(svgEl("circle", { cx: 38, cy: 64, r: 3.5, class: "coin-wolf" }));
  svg.appendChild(svgEl("circle", { cx: 48, cy: 64, r: 3.5, class: "coin-wolf" }));
  svg.appendChild(svgEl("text", { x: 50, y: 82, "text-anchor": "middle", class: "coin-text" }, ["ROMA"]));
  return svg;
}

/* ---------- Icons (Story, Flow) ---------- */
const ICONS = {
  ship: "M8 40 L56 40 L50 52 L14 52 Z M32 12 L32 40 M32 14 L50 30 L32 30 Z",
  crown: "M10 46 L10 22 L22 34 L32 14 L42 34 L54 22 L54 46 Z",
  mars: "M28 54 A16 16 0 1 1 40 28 M40 28 L54 14 M42 14 L54 14 L54 26",
  basket: "M14 30 L50 30 L46 52 L18 52 Z M22 30 Q32 10 42 30 M8 20 Q32 34 56 20",
  wolf: "M10 44 L14 30 L22 26 L36 26 L46 22 L52 16 L58 18 L56 24 L60 28 L52 30 L48 36 L46 48 L41 48 L40 38 L30 40 L28 48 L23 48 L22 40 L16 40 L14 48 L10 48 Z",
  shepherd: "M20 10 Q28 6 30 14 Q30 20 26 20 L26 56 M44 14 A6 6 0 1 1 44 26 M44 26 L44 56 M44 32 L34 40 M44 32 L54 40",
  sword: "M32 6 L36 10 L36 40 L28 40 L28 10 Z M18 44 L46 44 M32 44 L32 58",
  wall: "M6 56 L6 34 L58 34 L58 56 Z M6 45 L58 45 M19 34 L19 45 M45 34 L45 45 M32 45 L32 56 M12 34 L12 26 L22 26 L22 34 M42 34 L42 26 L52 26 L52 34 M27 34 L27 22 L37 22 L37 34",
  rome: "M8 56 L56 56 M12 52 L12 28 M22 52 L22 28 M32 52 L32 28 M42 52 L42 28 M52 52 L52 28 M6 28 L58 28 L32 12 Z",
  river: "M8 20 Q20 10 32 20 T56 20 M8 34 Q20 24 32 34 T56 34 M8 48 Q20 38 32 48 T56 48",
  salt: "M14 50 L32 14 L50 50 Z M26 42 L38 42 M32 30 L32 50",
  market: "M8 28 L32 10 L56 28 M12 28 L12 54 L52 54 L52 28 M26 54 L26 38 L38 38 L38 54",
  people: "M20 20 A6 6 0 1 1 20.1 20 M44 20 A6 6 0 1 1 44.1 20 M8 54 Q8 34 20 34 Q32 34 32 54 M32 54 Q32 34 44 34 Q56 34 56 54",
  city: "M6 56 L58 56 M10 56 L10 30 L22 30 L22 56 M26 56 L26 18 L38 18 L38 56 M42 56 L42 36 L54 36 L54 56 M30 24 L34 24 M30 32 L34 32 M30 40 L34 40",
};
function buildIcon(name, size = 48) {
  const svg = svgEl("svg", { viewBox: "0 0 64 64", width: size, height: size, class: "icon icon-" + name, "aria-hidden": "true" });
  svg.appendChild(svgEl("path", { d: ICONS[name] || ICONS.city, fill: "none", stroke: "currentColor", "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" }));
  return svg;
}

/* ---------- Lupa (Maskottchen) ---------- */
function buildLupa(size = 56) {
  const svg = svgEl("svg", { viewBox: "0 0 64 64", width: size, height: size, class: "lupa", "aria-hidden": "true" });
  svg.appendChild(svgEl("circle", { cx: 32, cy: 32, r: 30, class: "lupa-bg" }));
  svg.appendChild(svgEl("path", { class: "lupa-fur", d: "M16 46 L19 30 L24 24 L30 22 L40 22 L48 18 L52 12 L56 16 L54 24 L58 28 L50 30 L46 36 L45 46 L40 46 L40 38 L31 40 L30 46 L25 46 L24 40 L20 40 L19 46 Z" }));
  svg.appendChild(svgEl("circle", { cx: 50, cy: 20, r: 1.8, class: "lupa-eye" }));
  return svg;
}
