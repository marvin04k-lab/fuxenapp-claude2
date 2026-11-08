/* Fuchsenskript Lernapp – Vanilla JS, offline-fähig, keine Abhängigkeiten */
(function () {
  "use strict";

  /* ================= Daten ================= */
  const EXAMS = {
    brander: { id: "brander", name: "Branderprüfung", short: "Brander", chapters: window.CONTENT.brander,
      blurb: "Komment, Farben, Lieder, Chargieren, Messe, Satzungen und Geschichte – alles für die Branderung." },
    burschen: { id: "burschen", name: "Burschenprüfung", short: "Burschen", chapters: window.CONTENT.burschen,
      blurb: "Glaube, Staatsgeschichte, Verfassung, Weltanschauung, GO und Cartellrecht – der Weg zum Burschenband." }
  };
  const CH = {};
  Object.values(EXAMS).forEach(ex => ex.chapters.forEach(c => { c.exam = ex.id; CH[c.id] = c; }));
  const SK = window.SKRIPT || {};

  /* ================= Speicher ================= */
  const KEY = "fuchsenapp.v1";
  let S = load();
  function blank() { return { lastExam: null, ch: {}, exams: [], theme: "auto" }; }
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.ch) return Object.assign(blank(), s); } catch (e) {}
    return blank();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function cs(id) {
    if (!S.ch[id]) S.ch[id] = { read: [], quizBest: 0, quizRuns: 0, cards: {}, cloze: 0, order: {}, lf: {}, texte: {}, farben: 0, debatte: 0 };
    return S.ch[id];
  }

  /* ================= Helfer ================= */
  const $ = (s, r = document) => r.querySelector(s);
  const view = $("#view");
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);
  const pct = (a, b) => b ? Math.round(100 * a / b) : 0;
  const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[„“"'’.,;:!?()]/g, "").replace(/\s+/g, " ").trim();
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => t.hidden = true, 2200); }
  function modal(html, onMount) {
    const m = $("#modal"); m.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${html}</div>`; m.hidden = false;
    m.onclick = e => { if (e.target === m) closeModal(); };
    if (onMount) onMount(m);
  }
  function closeModal() { const m = $("#modal"); m.hidden = true; m.innerHTML = ""; }
  function confirmBox(title, text, okLabel, cb) {
    modal(`<h3>${esc(title)}</h3><p class="muted">${esc(text)}</p><div class="btn-row" style="margin-top:16px"><button class="btn secondary" data-x>Abbrechen</button><button class="btn danger" data-ok>${esc(okLabel)}</button></div>`,
      m => { m.querySelector("[data-x]").onclick = closeModal; m.querySelector("[data-ok]").onclick = () => { closeModal(); cb(); }; });
  }
  function setTop(title, back) {
    $("#topTitle").textContent = title;
    const b = $("#backBtn"); b.hidden = !back; b.onclick = back ? () => go(back) : null;
  }
  function go(h) { if (location.hash === "#" + h) route(); else location.hash = h; }
  function ring(p, light) { return `<div class="ring${light ? " light" : ""}" style="--p:${p}"><span>${p}%</span></div>`; }

  /* ================= Fortschritt ================= */
  function chapterProgress(c) {
    const s = cs(c.id), parts = [];
    parts.push(pct(s.read.length, c.story.length));
    const lf = (SK[c.id] && SK[c.id].leitfragen) || [];
    if (lf.length) parts.push(pct(Object.values(s.lf).reduce((a, v) => a + (v === 2 ? 1 : v === 1 ? .5 : 0), 0), lf.length));
    if (c.quiz && c.quiz.length) parts.push(s.quizBest);
    if (c.cards && c.cards.length) parts.push(pct(c.cards.filter((_, i) => (s.cards[i] || 0) >= 3).length, c.cards.length));
    if (c.special === "farben") parts.push(s.farben || 0);
    if (c.special && c.special.startsWith("texte:")) {
      const list = TEXTS(c); parts.push(pct(list.reduce((a, t) => a + Math.min(3, s.texte[t.t] || 0), 0), list.length * 3));
    }
    if (c.special === "debatte") parts.push(Math.min(100, (s.debatte || 0) * 20));
    const extra = [];
    if (c.cloze && c.cloze.length) extra.push(s.cloze || 0);
    if (c.order && c.order.length) extra.push(pct(Object.keys(s.order).length, c.order.length));
    if (extra.length) parts.push(Math.round(extra.reduce((a, b) => a + b, 0) / extra.length));
    return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
  }
  function examProgress(ex) { const cs_ = EXAMS[ex].chapters; return Math.round(cs_.reduce((a, c) => a + chapterProgress(c), 0) / cs_.length); }
  function TEXTS(c) { return c.special === "texte:lieder" ? window.TEXTE.lieder : c.special === "texte:gebete" ? window.TEXTE.gebete : []; }


  /* ================= Audio-Player (Hörproben) ================= */
  let AUDIO = null;
  function stopAudio() { if (AUDIO) { AUDIO.pause(); AUDIO = null; } }
  const fmt = t => isFinite(t) ? `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}` : "0:00";
  function playerHtml(src, title) {
    return `<div class="player" data-src="${esc(src)}"><button class="pbtn" aria-label="Abspielen">${ICON_PLAY}</button>
      <div class="grow"><div class="ptitle">🎧 ${esc(title || "Hörprobe")}</div>
      <input class="pseek" type="range" min="0" max="1000" value="0" step="1" aria-label="Position">
      <div class="ptime"><span class="pcur">0:00</span><span class="pskip"><button data-d="-10" aria-label="10 Sekunden zurück">−10 s</button><button data-d="10" aria-label="10 Sekunden vor">+10 s</button></span><span class="pdur">–:––</span></div></div></div>`;
  }
  const ICON_PLAY = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  const ICON_PAUSE = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z" fill="currentColor"/></svg>';
  function mountPlayers(root) {
    root.querySelectorAll(".player:not([data-ok])").forEach(el => {
      el.dataset.ok = 1;
      const a = new Audio(); a.preload = "metadata"; a.src = el.dataset.src;
      const btn = el.querySelector(".pbtn"), seek = el.querySelector(".pseek"), cur = el.querySelector(".pcur"), dur = el.querySelector(".pdur");
      let dragging = false;
      const paint = () => { const p = a.duration ? a.currentTime / a.duration : 0; if (!dragging) seek.value = Math.round(p * 1000); seek.style.setProperty("--fill", (p * 100) + "%"); cur.textContent = fmt(a.currentTime); };
      a.addEventListener("loadedmetadata", () => { dur.textContent = fmt(a.duration); });
      a.addEventListener("timeupdate", paint);
      a.addEventListener("play", () => { btn.innerHTML = ICON_PAUSE; btn.setAttribute("aria-label", "Pause"); el.classList.add("on"); });
      a.addEventListener("pause", () => { btn.innerHTML = ICON_PLAY; btn.setAttribute("aria-label", "Abspielen"); el.classList.remove("on"); });
      a.addEventListener("ended", () => { a.currentTime = 0; paint(); });
      a.addEventListener("error", () => { el.querySelector(".ptitle").textContent = "Audio konnte nicht geladen werden"; });
      btn.onclick = () => { if (a.paused) { if (AUDIO && AUDIO !== a) AUDIO.pause(); AUDIO = a; a.play().catch(() => {}); } else a.pause(); };
      seek.addEventListener("input", () => { dragging = true; const t = (seek.value / 1000) * (a.duration || 0); cur.textContent = fmt(t); seek.style.setProperty("--fill", (seek.value / 10) + "%"); });
      seek.addEventListener("change", () => { dragging = false; if (a.duration) a.currentTime = (seek.value / 1000) * a.duration; });
      el.querySelectorAll(".pskip button").forEach(b => b.onclick = () => { if (a.duration) { a.currentTime = Math.max(0, Math.min(a.duration, a.currentTime + +b.dataset.d)); paint(); } });
    });
  }

  /* ================= Router ================= */
  window.addEventListener("hashchange", route);
  $("#settingsBtn").onclick = () => go("/einstellungen");
  function route() {
    clearInterval(route.timer); stopAudio();
    const h = location.hash.replace(/^#/, "") || "/";
    const p = h.split("/").filter(Boolean);
    window.scrollTo(0, 0);
    if (!p.length) return home();
    if (p[0] === "pruefung" && EXAMS[p[1]]) return exam(p[1]);
    if (p[0] === "lernen" && EXAMS[p[1]]) return area(p[1]);
    if (p[0] === "kapitel" && CH[p[1]]) return chapter(p[1], p[2] || "entdecken", p[3]);
    if (p[0] === "einstellungen") return settings();
    home();
  }

  /* ================= Start ================= */
  function home(sel) {
    setTop("Fuchsenskript", null);
    sel = sel || S.lastExam || "brander";
    view.innerHTML = `
      <section class="hero stack">
        <div class="kicker">K.a.V. Bajuvaria · Lernhelfer</div>
        <h1>Wofür lernst du?</h1>
        <p class="muted">Wähle deine Prüfung. Dein Fortschritt wird auf diesem Gerät gespeichert.</p>
      </section>
      <div class="tabs" role="tablist" style="margin-top:14px">
        ${Object.values(EXAMS).map(e => `<button class="tab" role="tab" aria-selected="${e.id === sel}" data-ex="${e.id}">${e.name}</button>`).join("")}
      </div>
      <div id="homeBody" style="margin-top:14px"></div>`;
    view.querySelectorAll(".tab").forEach(b => b.onclick = () => { view.querySelectorAll(".tab").forEach(x => x.setAttribute("aria-selected", x === b)); renderHomeBody(b.dataset.ex); });
    renderHomeBody(sel);
  }
  function renderHomeBody(ex) {
    const E = EXAMS[ex], p = examProgress(ex);
    $("#homeBody").innerHTML = `
      <div class="exam-hero ${ex}"><div class="deco"></div>
        <div class="row"><div class="grow"><h2>${E.name}</h2><p>${E.blurb}</p></div>${ring(p)}</div>
        <div class="btn-row" style="margin-top:12px"><button class="btn" data-go="/lernen/${ex}">Lernbereich öffnen</button></div>
      </div>
      <div class="card" style="margin-top:14px">
        <div class="row"><div class="grow"><b>${E.chapters.length} Teilgebiete</b><div class="muted small">${E.chapters.map(c => c.title).join(" · ")}</div></div></div>
      </div>
      ${lastExamInfo(ex)}`;
    $("#homeBody").querySelectorAll("[data-go]").forEach(b => b.onclick = () => { S.lastExam = ex; save(); go(b.dataset.go); });
  }
  function lastExamInfo(ex) {
    const l = S.exams.filter(e => e.exam === ex).slice(-1)[0];
    if (!l) return "";
    return `<div class="card" style="margin-top:12px"><div class="muted small">Letzte Probeprüfung · ${new Date(l.date).toLocaleDateString("de-AT")}</div><b>${l.score}% – ${esc(l.kalkuel)}</b></div>`;
  }

  /* ================= Lernbereich ================= */
  function area(ex) {
    S.lastExam = ex; save();
    const E = EXAMS[ex];
    setTop(E.name, "/");
    view.innerHTML = `
      <div class="exam-hero ${ex}"><div class="deco"></div>
        <div class="row"><div class="grow"><h2>Lernbereich</h2><p>Jedes Teilgebiet: <b>Entdecken → Vertiefen → Verinnerlichen</b>.</p></div>${ring(examProgress(ex))}</div>
        <div class="btn-row" style="margin-top:12px"><button class="btn" id="toExam">Prüfungsmodus starten</button></div>
      </div>
      <h3 style="margin:18px 2px 10px">Teilgebiete</h3>
      <div class="ch-list">${E.chapters.map(c => {
        const p = chapterProgress(c);
        return `<button class="ch-item" data-id="${c.id}"><div class="glyph">${c.glyph}</div>
          <div class="grow"><div class="t">${esc(c.title)}</div><div class="s">${esc(c.sub)}</div><div class="bar"><i style="width:${p}%"></i></div></div>
          <div class="chip">${p}%</div></button>`;
      }).join("")}</div>`;
    $("#toExam").onclick = () => go("/pruefung/" + ex);
    view.querySelectorAll(".ch-item").forEach(b => b.onclick = () => go("/kapitel/" + b.dataset.id));
  }

  /* ================= Kapitel ================= */
  function chapter(id, tab, sub) {
    const c = CH[id];
    setTop(c.title, "/lernen/" + c.exam);
    const tabs = [["entdecken", "1", "Entdecken"], ["vertiefen", "2", "Vertiefen"], ["verinnerlichen", "3", "Verinnerlichen"]];
    view.innerHTML = `
      <div class="steps" role="tablist">${tabs.map(t => `<button class="step" role="tab" aria-selected="${t[0] === tab}" data-t="${t[0]}"><b>${t[1]}</b>${t[2]}</button>`).join("")}</div>
      <div id="chBody"></div>`;
    view.querySelectorAll(".step").forEach(b => b.onclick = () => go(`/kapitel/${id}/${b.dataset.t}`));
    const body = $("#chBody");
    if (tab === "entdecken") return discover(c, body, sub);
    if (tab === "vertiefen") return deepen(c, body);
    if (tab === "verinnerlichen") return internalize(c, body, sub);
  }

  /* ---- 1 Entdecken ---- */
  function discover(c, body, sub) {
    if (sub === "volltext") return fulltext(c, body);
    let i = Math.max(0, Math.min(c.story.length - 1, parseInt(sub || "0", 10) || 0));
    const s = cs(c.id);
    const note = SK[c.id] && SK[c.id].note;
    function draw() {
      const sec = c.story[i];
      if (!s.read.includes(i)) { s.read.push(i); save(); }
      body.innerHTML = `
        ${i === 0 ? `<p class="hook">${esc(c.hook)}</p>` : ""}
        <article class="card story"><div class="muted small" style="font-weight:700">Abschnitt ${i + 1} von ${c.story.length}</div><h3>${esc(sec.t)}</h3>${sec.h}</article>
        <div class="pager">
          <button class="btn secondary" id="prev" ${i === 0 ? "disabled" : ""}>Zurück</button>
          <div class="dots">${c.story.map((_, k) => `<i class="${k === i ? "on" : s.read.includes(k) ? "done" : ""}"></i>`).join("")}</div>
          ${i < c.story.length - 1 ? `<button class="btn" id="next">Weiter</button>` : `<button class="btn" id="next">Vertiefen →</button>`}
        </div>
        ${i === 0 && note ? `<div class="note" style="margin-top:14px"><b>Prüfungs-Anmerkung aus dem Skript:</b> ${esc(note)}</div>` : ""}
        <button class="btn ghost block" style="margin-top:14px" id="full">Originaltext aus dem Skript lesen</button>`;
      enhance(body);
      $("#prev", body).onclick = () => { i--; draw(); window.scrollTo(0, 0); };
      $("#next", body).onclick = () => { if (i < c.story.length - 1) { i++; draw(); window.scrollTo(0, 0); } else go(`/kapitel/${c.id}/vertiefen`); };
      $("#full", body).onclick = () => go(`/kapitel/${c.id}/entdecken/volltext`);
    }
    draw();
  }
  function blocksHtml(blocks) {
    return blocks.map(b => b.h ? `<h4>${esc(b.h)}</h4>` : `<p>${esc(b.p)}</p>`).join("");
  }
  function fulltext(c, body) {
    const sk = SK[c.id] || {};
    const parts = [];
    if (sk.blocks && sk.blocks.length) parts.push(["Fuchsenskript – " + c.title, sk.blocks]);
    if (sk.source && sk.source.length) parts.push([sk.sourceTitle || "Quelle", sk.source]);
    if (sk.statuten && sk.statuten.length) parts.push(["Statuten der K.a.V. Bajuvaria", sk.statuten]);
    body.innerHTML = `
      <div class="row" style="margin:6px 0 12px"><button class="btn secondary" id="bk">← Zur Aufbereitung</button></div>
      <input class="searchbox" id="q" placeholder="Im Text suchen …" type="search">
      <div id="ft" class="stack" style="margin-top:12px"></div>`;
    const ft = $("#ft", body);
    function draw(q) {
      ft.innerHTML = parts.map(([t, b]) => {
        let list = b;
        if (q) { const nq = norm(q); list = b.filter(x => norm(x.p || x.h).includes(nq)); }
        let html = blocksHtml(list);
        if (q) html = html.replace(new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), "<mark>$1</mark>");
        return `<details class="box" ${parts.length === 1 || q ? "open" : ""}><summary><span class="grow">${esc(t)}</span><span class="chip">${list.length}</span></summary><div class="inner fulltext">${html || '<p class="muted">Keine Treffer.</p>'}</div></details>`;
      }).join("") || `<p class="muted">Für dieses Kapitel ist kein separater Volltext hinterlegt.</p>`;
    }
    draw("");
    let t; $("#q", body).oninput = e => { clearTimeout(t); t = setTimeout(() => draw(e.target.value.trim()), 200); };
    $("#bk", body).onclick = () => go(`/kapitel/${c.id}/entdecken`);
  }

  /* Farben-Demo und -Tabellen in Story-HTML einsetzen */
  function enhance(root) {
    root.querySelectorAll("[data-band='baj']").forEach(el => el.innerHTML = bandHtml(BAJ_BAND) + `<div class="muted small" style="margin-top:6px">Burschenband Bajuvariae (schematisch, von oben nach unten: Vorstoß Gold · Blau · Durchbruch Gold · Rot · Durchbruch Schwarz · Gold · Vorstoß Rot)</div>`);
    root.querySelectorAll("[data-hoerproben]").forEach(el => { el.innerHTML = window.TEXTE.lieder.filter(t => t.audio).map(t => playerHtml(t.audio, t.t)).join(""); mountPlayers(el); });
    root.querySelectorAll("[data-farbtabelle]").forEach(el => {
      const list = window.FARBEN[el.dataset.farbtabelle];
      el.innerHTML = list.map(v => `<div class="farb-row">${bandHtml(bandOf(v), true)}<div class="grow"><div class="name">${esc(v.n)}</div>
        <div class="meta">${esc(v.fText || v.f.join("-"))} · ${esc(v.m)}</div>
        <div class="meta">${v.j ? `gegr. ${v.j} · ${v.g}. nach Gründung · ` : ""}${v.a}. amtl. Reihenfolge</div></div></div>`).join("");
    });
  }

  /* ---- 2 Vertiefen ---- */
  function deepen(c, body) {
    const lf = (SK[c.id] && SK[c.id].leitfragen) || [];
    const s = cs(c.id);
    if (!lf.length) {
      body.innerHTML = `<div class="card stack"><h3>Vertiefen</h3>
        <p>Für <b>${esc(c.title)}</b> gibt es im Skript keine Leitfragen. Vertiefe stattdessen mit den Kernsätzen – sag die Antwort laut, bevor du aufdeckst.</p></div>
        <div class="stack" style="margin-top:12px" id="lfl"></div>
        <button class="btn block" style="margin-top:14px" id="nx">Weiter zum Verinnerlichen →</button>`;
      const items = (c.cards || []).map(cd => ({ q: cd[0], a: cd[1] }));
      if (c.special === "farben") window.FARBEN.aeltesten.forEach(v => items.push({ q: `${v.n}: Farben, Deckel, Gründung?`, a: `${v.fText || v.f.join("-")} · ${v.m} · ${v.j} · ${v.a}. amtl.` }));
      if (c.special && c.special.startsWith("texte:")) TEXTS(c).forEach(t => items.push({ q: `Sag „${t.t}“ vollständig auf.`, a: t.s.map((x, i) => `${i + 1}. ${x}`).join("<br>"), html: true }));
      $("#lfl", body).innerHTML = items.map((it, i) => `<details class="box"><summary><span class="n">${i + 1}</span><span class="grow">${esc(it.q)}</span></summary><div class="inner"><div class="hint">${it.html ? it.a : esc(it.a)}</div></div></details>`).join("");
      $("#nx", body).onclick = () => go(`/kapitel/${c.id}/verinnerlichen`);
      return;
    }
    const known = Object.values(s.lf).filter(v => v === 2).length;
    body.innerHTML = `
      <div class="card"><h3>Leitfragen aus dem Skript</h3>
        <p class="muted small">Formuliere zuerst deine Antwort (laut oder im Kopf). Dann hol dir passende Stellen aus dem Skript und bewerte dich ehrlich.</p>
        <div class="row" style="margin-top:8px"><div class="grow bar"><i style="width:${pct(known, lf.length)}%"></i></div><span class="chip">${known}/${lf.length} sitzen</span></div>
        <div class="seg" style="margin-top:12px" id="flt"><button aria-pressed="true" data-f="all">Alle</button><button aria-pressed="false" data-f="open">Offen</button><button aria-pressed="false" data-f="weak">Unsicher</button></div>
      </div>
      <div class="stack" style="margin-top:12px" id="lfl"></div>
      <button class="btn block" style="margin-top:14px" id="nx">Weiter zum Verinnerlichen →</button>`;
    let filter = "all";
    function draw() {
      const list = lf.map((q, i) => ({ q, i })).filter(o => filter === "all" ? true : filter === "open" ? s.lf[o.i] === undefined : s.lf[o.i] !== undefined && s.lf[o.i] < 2);
      $("#lfl", body).innerHTML = list.map(o => `<details class="box" data-i="${o.i}" data-r="${s.lf[o.i] ?? ""}"><summary><span class="n">${o.i + 1}</span><span class="grow">${esc(o.q)}</span></summary>
        <div class="inner"><button class="btn secondary block" data-hint>Hinweise aus dem Skript zeigen</button><div class="hints"></div>
        <div class="rate"><button class="r2 ${s.lf[o.i] === 2 ? "sel" : ""}" data-r="2">Sitzt</button><button class="r1 ${s.lf[o.i] === 1 ? "sel" : ""}" data-r="1">Unsicher</button><button class="r0 ${s.lf[o.i] === 0 ? "sel" : ""}" data-r="0">Nochmal</button></div></div></details>`).join("") || `<p class="muted">Nichts in diesem Filter. 🎉</p>`;
      $("#lfl", body).querySelectorAll("details").forEach(d => {
        const i = +d.dataset.i;
        d.querySelector("[data-hint]").onclick = e => { e.target.remove(); d.querySelector(".hints").innerHTML = hintsFor(c, lf[i]); };
        d.querySelectorAll(".rate button").forEach(b => b.onclick = () => {
          s.lf[i] = +b.dataset.r; save(); d.dataset.r = b.dataset.r;
          d.querySelectorAll(".rate button").forEach(x => x.classList.toggle("sel", x === b));
          setTimeout(() => { d.open = false; }, 250);
        });
      });
    }
    $("#flt", body).querySelectorAll("button").forEach(b => b.onclick = () => { filter = b.dataset.f; $("#flt", body).querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); draw(); });
    draw();
    $("#nx", body).onclick = () => go(`/kapitel/${c.id}/verinnerlichen`);
  }

  /* Relevante Skript-Passagen zu einer Leitfrage finden (einfache TF-IDF-Suche) */
  const STOP = new Set("aber alle allem allen aller alles also auch auf aus bei beim bzw dann dass dazu dem den denen der des die dies diese diesem diesen dieser durch ein eine einem einen einer eines einer etc für gibt hat hier ihre ihrer ist jeweils kann mit nach nicht noch oder sich sind über unter und uns unser unsere unserer vom von vor war waren was welche welchen welcher welches wer werden wie wird wo wodurch woher worin wurde wurden zum zur zwischen speziell generell insbesondere allem warum weshalb welchem besonders sowie gilt gelten".split(" "));
  function toks(s) { return norm(s).split(" ").filter(w => w.length > 3 && !STOP.has(w)).map(w => w.slice(0, 7)); }
  const IDX = {};
  function indexFor(c) {
    if (IDX[c.id]) return IDX[c.id];
    const sk = SK[c.id] || {};
    const blocks = [].concat(sk.blocks || [], sk.source || [], sk.statuten || []).filter(b => b.p && b.p.length > 40);
    c.story.forEach(st => { const tmp = document.createElement("div"); tmp.innerHTML = st.h; tmp.querySelectorAll("p,li,.fact,.tip").forEach(el => blocks.push({ p: el.textContent, own: true })); });
    const df = {}; const docs = blocks.map(b => { const t = toks(b.p); new Set(t).forEach(w => df[w] = (df[w] || 0) + 1); return t; });
    return IDX[c.id] = { blocks, docs, df, N: blocks.length };
  }
  function hintsFor(c, q) {
    const I = indexFor(c), qt = [...new Set(toks(q))];
    const scored = I.docs.map((d, i) => {
      let sc = 0; const set = new Set(d);
      qt.forEach(w => { if (set.has(w)) sc += Math.log(1 + I.N / (I.df[w] || 1)); });
      return { i, sc: sc / Math.sqrt(4 + d.length / 30) * (I.blocks[i].own ? 1.25 : 1) };
    }).filter(x => x.sc > 0).sort((a, b) => b.sc - a.sc).slice(0, 3);
    if (!scored.length) return `<p class="muted small">Keine passende Stelle gefunden – schau im Originaltext nach.</p>`;
    const re = new RegExp("\\b(" + qt.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "")).filter(Boolean).join("|") + ")[\\wäöüß]*", "gi");
    return scored.map(x => {
      const b = I.blocks[x.i]; let t = b.p; if (t.length > 650) t = t.slice(0, 650) + " …";
      return `<div class="hint"><div class="muted small" style="font-weight:700">${b.own ? "Aus der Aufbereitung" : "Aus dem Skript"}</div>${esc(t).replace(re, "<mark>$&</mark>")}</div>`;
    }).join("");
  }

  /* ---- 3 Verinnerlichen ---- */
  function internalize(c, body, sub) {
    const s = cs(c.id);
    const m = [];
    if (c.special === "farben") m.push(["farben", "🎨", "Farben-Trainer", "Band ↔ Verbindung, Deckel, Gründung"]);
    if (c.special && c.special.startsWith("texte:")) m.push(["texte", "📜", "Text-Trainer", "Lesen · Lücken · frei aufsagen"]);
    if (c.special === "debatte") m.push(["debatte", "🗣️", "Diskussions­trainer", "Aktuelles Thema, 3 Perspektiven"]);
    if (c.quiz && c.quiz.length) m.push(["quiz", "✅", "Quiz", `${c.quiz.length} Fragen · Bestwert ${s.quizBest}%`]);
    if (c.cards && c.cards.length) m.push(["karten", "🃏", "Karteikarten", `${c.cards.filter((_, i) => (s.cards[i] || 0) >= 3).length}/${c.cards.length} gemeistert`]);
    if (c.cloze && c.cloze.length) m.push(["luecken", "✍️", "Lückentext", `Bestwert ${s.cloze || 0}%`]);
    if (c.order && c.order.length) m.push(["reihenfolge", "🔢", "Reihenfolge", `${Object.keys(s.order).length}/${c.order.length} gelöst`]);
    if (!sub) {
      body.innerHTML = `<div class="card"><div class="row"><div class="grow"><h3>Verinnerlichen</h3><p class="muted small">Kombiniere die Methoden: Abrufen schlägt Wiederlesen. Am besten an mehreren Tagen wiederholen.</p></div>${ring(chapterProgress(c), true)}</div></div>
        <div class="methods" style="margin-top:12px">${m.map(x => `<button class="method" data-m="${x[0]}"><span class="ico">${x[1]}</span><b>${x[2]}</b><span>${x[3]}</span></button>`).join("")}</div>`;
      body.querySelectorAll(".method").forEach(b => b.onclick = () => go(`/kapitel/${c.id}/verinnerlichen/${b.dataset.m}`));
      return;
    }
    const back = () => go(`/kapitel/${c.id}/verinnerlichen`);
    const fn = { quiz: runQuiz, karten: runCards, luecken: runCloze, reihenfolge: runOrder, farben: runFarben, texte: runTexte, debatte: runDebatte }[sub];
    if (fn) fn(c, body, back); else back();
  }

  /* Quiz */
  function runQuiz(c, body, back) {
    const qs = shuffle(c.quiz).map(q => { const order = shuffle(q.a.map((_, i) => i)); return { q: q.q, a: order.map(i => q.a[i]), c: order.indexOf(q.c), e: q.e }; });
    mcSession(body, qs, "Quiz – " + c.title, (right, total) => {
      const s = cs(c.id); const p = pct(right, total); s.quizRuns++; if (p > s.quizBest) s.quizBest = p; save();
    }, back);
  }
  function mcSession(body, qs, title, onDone, back) {
    let i = 0, right = 0; const wrong = [];
    function draw() {
      const q = qs[i];
      body.innerHTML = `<div class="card">
        <div class="q-head"><span>${esc(title)}</span><span>${i + 1}/${qs.length}</span></div>
        <div class="progress-line"><i style="width:${pct(i, qs.length)}%"></i></div>
        ${q.html ? `<div style="margin:10px 0 14px">${q.html}</div>` : ""}<div class="q-text">${esc(q.q)}</div>
        <div class="answers ${q.bands ? "band-choices" : ""}">${q.a.map((a, k) => `<button class="answer" data-k="${k}">${q.bands ? a : esc(a)}</button>`).join("")}</div>
        <div id="ex"></div></div>`;
      body.querySelectorAll(".answer").forEach(b => b.onclick = () => {
        const k = +b.dataset.k, ok = k === q.c; if (ok) right++; else wrong.push(q);
        body.querySelectorAll(".answer").forEach((x, j) => { x.disabled = true; if (j === q.c) x.classList.add("correct"); else if (j === k) x.classList.add("wrong"); });
        $("#ex", body).innerHTML = `<div class="explain"><b>${ok ? "Richtig!" : "Nicht ganz."}</b> ${q.e ? esc(q.e) : ""}</div>
          <button class="btn block" style="margin-top:12px" id="nq">${i < qs.length - 1 ? "Nächste Frage" : "Auswertung"}</button>`;
        $("#nq", body).onclick = () => { i++; if (i < qs.length) draw(); else done(); };
        $("#nq", body).scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
    function done() {
      onDone(right, qs.length);
      const p = pct(right, qs.length);
      body.innerHTML = `<div class="card stack" style="text-align:center"><div class="muted small">${esc(title)}</div>
        <div class="score-big">${p}%</div><div>${right} von ${qs.length} richtig</div>
        <p class="muted">${p >= 90 ? "Hervorragend – das sitzt!" : p >= 70 ? "Gut! Ein Durchgang noch, dann sitzt es." : "Dranbleiben – wiederhole die falschen Fragen."}</p></div>
        ${wrong.length ? `<div class="card" style="margin-top:12px"><h3>Zum Wiederholen</h3>${wrong.map(q => `<div class="hint"><b>${esc(q.q)}</b><br>${q.bands ? "" : esc(q.a[q.c])}${q.e ? `<div class="muted small">${esc(q.e)}</div>` : ""}</div>`).join("")}</div>` : ""}
        <div class="btn-row" style="margin-top:12px"><button class="btn secondary" id="bk">Methoden</button><button class="btn" id="again">Nochmal</button></div>`;
      $("#bk", body).onclick = back;
      $("#again", body).onclick = () => { i = 0; right = 0; wrong.length = 0; qs.splice(0, qs.length, ...shuffle(qs)); draw(); };
    }
    draw();
  }

  /* Karteikarten (Leitner, 5 Fächer) */
  function runCards(c, body, back) {
    const s = cs(c.id);
    const idx = c.cards.map((_, i) => i);
    let queue = shuffle(idx).sort((a, b) => (s.cards[a] || 0) - (s.cards[b] || 0)).slice(0, Math.min(15, idx.length));
    let n = 0, known = 0;
    function boxes() { const b = [0, 0, 0, 0, 0, 0]; idx.forEach(i => b[s.cards[i] || 0]++); return b; }
    function draw() {
      if (!queue.length) return done();
      const i = queue[0], [f, bk] = c.cards[i], b = boxes();
      body.innerHTML = `<div class="boxes">${["Neu", "1", "2", "3", "4", "5"].map((l, k) => `<div><b>${b[k]}</b>${k === 0 ? l : "Fach " + l}</div>`).join("")}</div>
        <div class="flash" id="fl"><div class="flash-inner"><div class="flash-face flash-front"><span class="lbl">Frage · Fach ${s.cards[i] || 0}</span><div class="f">${esc(f)}</div><div class="muted small" style="margin-top:14px">Tippen zum Umdrehen</div></div>
        <div class="flash-face flash-back"><span class="lbl">Antwort</span><div>${esc(bk)}</div></div></div></div>
        <div class="btn-row"><button class="btn secondary" id="no" disabled>Nicht gewusst</button><button class="btn" id="yes" disabled>Gewusst</button></div>
        <p class="muted small" style="text-align:center">Karte ${n + 1} · gewusste Karten wandern ein Fach weiter, falsche zurück in Fach 1.</p>`;
      const fl = $("#fl", body);
      fl.onclick = () => { fl.classList.toggle("flipped"); $("#no", body).disabled = $("#yes", body).disabled = false; };
      $("#yes", body).onclick = () => { s.cards[i] = Math.min(5, (s.cards[i] || 0) + 1); known++; save(); queue.shift(); n++; draw(); };
      $("#no", body).onclick = () => { s.cards[i] = 1; save(); queue.shift(); queue.splice(Math.min(3, queue.length), 0, i); n++; draw(); };
    }
    function done() {
      body.innerHTML = `<div class="card stack" style="text-align:center"><div class="score-big">✓</div><b>Runde geschafft</b><p class="muted">${known} Karten gewusst. Gemeistert (ab Fach 3): ${c.cards.filter((_, i) => (s.cards[i] || 0) >= 3).length}/${c.cards.length}</p></div>
        <div class="btn-row" style="margin-top:12px"><button class="btn secondary" id="bk">Methoden</button><button class="btn" id="again">Neue Runde</button></div>`;
      $("#bk", body).onclick = back; $("#again", body).onclick = () => runCards(c, body, back);
    }
    draw();
  }

  /* Lückentext (Eingabe) */
  function runCloze(c, body, back) {
    const items = shuffle(c.cloze);
    body.innerHTML = `<div class="card stack"><h3>Lückentext</h3><p class="muted small">Fülle die Lücken aus. Groß-/Kleinschreibung und Akzente sind egal.</p>
      ${items.map((t, k) => `<div class="cloze-line" data-k="${k}">${esc(t).replace(/\{\{(.+?)\}\}/g, (_, a) => `<input data-a="${esc(a)}" size="${Math.max(4, a.length)}" autocomplete="off" autocapitalize="off" spellcheck="false">`)}</div>`).join("")}
      <div class="btn-row"><button class="btn secondary" id="sol">Lösung zeigen</button><button class="btn" id="chk">Prüfen</button></div><div id="res"></div></div>
      <button class="btn ghost block" style="margin-top:12px" id="bk">Zurück zu den Methoden</button>`;
    $("#chk", body).onclick = () => {
      const ins = [...body.querySelectorAll("input")]; let ok = 0;
      ins.forEach(i => { const good = norm(i.value) === norm(i.dataset.a); i.classList.toggle("ok", good); i.classList.toggle("no", !good); if (good) ok++; });
      const p = pct(ok, ins.length); const s = cs(c.id); if (p > (s.cloze || 0)) { s.cloze = p; save(); }
      $("#res", body).innerHTML = `<div class="explain"><b>${ok}/${ins.length} richtig (${p}%)</b></div>`;
    };
    $("#sol", body).onclick = () => body.querySelectorAll("input").forEach(i => { if (!i.nextElementSibling || !i.nextElementSibling.classList.contains("sol")) i.insertAdjacentHTML("afterend", `<span class="sol">${esc(i.dataset.a)}</span>`); });
    $("#bk", body).onclick = back;
  }

  /* Reihenfolge (antippen in richtiger Reihenfolge) */
  function runOrder(c, body, back, k) {
    k = k || 0; const o = c.order[k], s = cs(c.id);
    let pos = 0, errors = 0;
    const pool = shuffle(o.items.map((t, i) => ({ t, i })));
    function draw() {
      body.innerHTML = `<div class="card"><div class="q-head"><span>Reihenfolge ${k + 1}/${c.order.length}</span><span>${pos}/${o.items.length}</span></div>
        <h3 style="margin-top:8px">${esc(o.t)}</h3><p class="muted small">Tippe die Einträge in der richtigen Reihenfolge an.</p>
        <div class="order-done">${o.items.slice(0, pos).map((t, i) => `<div>${i + 1}. ${esc(t)}</div>`).join("")}</div>
        <div class="order-pool">${pool.filter(p => p.i >= pos).map(p => `<button data-i="${p.i}">${esc(p.t)}</button>`).join("")}</div>
        ${pos === o.items.length ? `<div class="explain" style="margin-top:12px"><b>Geschafft!</b> ${errors} Fehlversuch${errors === 1 ? "" : "e"}.</div>
          <div class="btn-row" style="margin-top:12px">${k < c.order.length - 1 ? `<button class="btn" id="nx">Nächste Reihe</button>` : `<button class="btn" id="bk">Fertig</button>`}</div>` : ""}</div>
        ${pos < o.items.length ? `<button class="btn ghost block" style="margin-top:12px" id="bk2">Abbrechen</button>` : ""}`;
      body.querySelectorAll(".order-pool button").forEach(b => b.onclick = () => {
        if (+b.dataset.i === pos) { pos++; if (pos === o.items.length) { s.order[k] = true; save(); } draw(); }
        else { errors++; b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); }
      });
      const nx = $("#nx", body); if (nx) nx.onclick = () => runOrder(c, body, back, k + 1);
      const bk = $("#bk", body) || $("#bk2", body); if (bk) bk.onclick = back;
    }
    draw();
  }

  /* ================= Farben ================= */
  const BAJ_BAND = [["Gold", 1], ["Dunkelblau", 5], ["Gold", 1], ["Rot", 5], ["Schwarz", 1], ["Gold", 5], ["Rot", 1]];
  function bandOf(v) {
    if (v.baj || v.n === "Bajuvaria") return BAJ_BAND;
    if (v.grund) return [[v.grund, 2]].concat(v.f.map(f => [f, 5])).concat([[v.grund, 2]]);
    return v.f.map(f => [f, 5]);
  }
  function bandHtml(stripes, small) {
    const P = window.FARBEN.palette;
    return `<div class="band${small ? " small" : ""}" role="img" aria-label="${stripes.map(s => s[0]).join("-")}">${stripes.map(([c, w]) => `<i style="flex:${w};background:${P[c] || c}"></i>`).join("")}</div>`;
  }
  function farbPool() {
    const seen = new Set(), all = [];
    window.FARBEN.aeltesten.forEach(v => { all.push(v); seen.add(v.f.join() + v.m); });
    window.FARBEN.wcv.forEach(v => { if (!seen.has(v.f.join() + v.m)) all.push(v); });
    return all;
  }
  function farbQuestions(n) {
    const pool = farbPool(), qs = [];
    const types = ["band2name", "name2band", "name2deckel", "name2farben"];
    for (let k = 0; k < n; k++) {
      const v = pool[Math.floor(Math.random() * pool.length)], t = types[k % types.length];
      const others = shuffle(pool.filter(x => x !== v && (x.fText || x.f.join("-")) !== (v.fText || v.f.join("-"))));
      if (t === "band2name") {
        const opts = shuffle([v, ...others.slice(0, 3)]);
        qs.push({ html: bandHtml(bandOf(v)), q: `Welche Verbindung trägt dieses Band${v.grund ? "" : ""}? (Deckel: ${v.m})`, a: opts.map(o => o.n), c: opts.indexOf(v), e: `${v.n}: ${v.fText || v.f.join("-")}, ${v.m}.` });
      } else if (t === "name2band") {
        const opts = shuffle([v, ...others.slice(0, 3)]);
        qs.push({ q: `Welches Band gehört zu ${v.n}?`, bands: true, a: opts.map(o => bandHtml(bandOf(o))), c: opts.indexOf(v), e: `${v.fText || v.f.join("-")}.` });
      } else if (t === "name2deckel") {
        const ds = shuffle([...new Set(pool.map(x => x.m).filter(m => m !== v.m))]).slice(0, 3);
        const opts = shuffle([v.m, ...ds]);
        qs.push({ q: `Welchen Deckel trägt ${v.n}?`, a: opts, c: opts.indexOf(v.m), e: `${v.n}: ${v.m}.` });
      } else {
        const cor = v.fText || v.f.join("-");
        const ds = shuffle([...new Set(pool.map(x => x.fText || x.f.join("-")).filter(f => f !== cor))]).slice(0, 2);
        const fake = v.f.length === 3 ? [v.f[2], v.f[1], v.f[0]].join("-") : null;
        const opts = shuffle([cor, ...ds, fake && fake !== cor && !ds.includes(fake) ? fake : shuffle(pool)[0].f.join("-")].filter((x, i, a) => a.indexOf(x) === i)).slice(0, 4);
        if (!opts.includes(cor)) opts[0] = cor;
        qs.push({ q: `Welche Farben führt ${v.n}? (Reihenfolge beachten!)`, a: opts, c: opts.indexOf(cor), e: `${v.n}: ${cor}.` });
      }
    }
    const alt = window.FARBEN.aeltesten;
    for (let k = 0; k < Math.max(1, Math.round(n / 5)); k++) {
      const v = alt[Math.floor(Math.random() * alt.length)];
      const ys = shuffle([...new Set(alt.map(x => x.j).filter(j => j !== v.j))]).slice(0, 3);
      const opts = shuffle([v.j, ...ys]).map(String);
      qs.push({ q: `In welchem Jahr wurde ${v.n} gegründet?`, a: opts, c: opts.indexOf(String(v.j)), e: `${v.n}: ${v.j} (${v.g}. nach Gründung, ${v.a}. amtl. Reihenfolge).` });
    }
    return shuffle(qs);
  }
  function runFarben(c, body, back) {
    mcSession(body, farbQuestions(12), "Farben-Trainer", (r, t) => { const s = cs(c.id); const p = pct(r, t); s.farben = Math.max(s.farben || 0, p); save(); }, back);
  }

  /* ================= Text-Trainer (Lieder & Gebete) ================= */
  function runTexte(c, body, back, ti) {
    const list = TEXTS(c), s = cs(c.id);
    if (ti === undefined) {
      body.innerHTML = `<div class="card"><h3>Text-Trainer</h3><p class="muted small">Stufe 1: Lesen · Stufe 2: Lücken füllen · Stufe 3: frei aufsagen. Jede Stufe einmal bestanden = ein Stern.</p></div>
        <div class="ch-list" style="margin-top:12px">${list.map((t, i) => `<button class="ch-item" data-i="${i}"><div class="glyph">${c.special === "texte:lieder" ? "♪" : "✝"}</div><div class="grow"><div class="t">${esc(t.t)}</div><div class="s">${t.s.length} ${t.s.length === 1 ? "Abschnitt" : "Strophen"}${t.audio ? " · 🎧 Hörprobe" : ""}</div></div><div class="chip">${"★".repeat(Math.min(3, s.texte[t.t] || 0))}${"☆".repeat(3 - Math.min(3, s.texte[t.t] || 0))}</div></button>`).join("")}</div>
        <button class="btn ghost block" style="margin-top:12px" id="bk">Zurück zu den Methoden</button>`;
      body.querySelectorAll(".ch-item").forEach(b => b.onclick = () => runTexte(c, body, back, +b.dataset.i));
      $("#bk", body).onclick = back; return;
    }
    const T = list[ti]; let mode = "lesen";
    const star = lvl => { if ((s.texte[T.t] || 0) < lvl) { s.texte[T.t] = lvl; save(); } };
    function shell(inner) {
      const keep = body.querySelector(".player[data-ok]");
      body.innerHTML = `<div class="card"><h3>${esc(T.t)}</h3>${T.audio ? `<div id="pl"></div>` : ""}<div class="seg" id="md">${[["lesen", "1 Lesen"], ["luecken", "2 Lücken"], ["aufsagen", "3 Aufsagen"]].map(m => `<button data-m="${m[0]}" aria-pressed="${m[0] === mode}">${m[1]}</button>`).join("")}</div></div>
        <div style="margin-top:12px" id="tb">${inner}</div>`;
      if (T.audio) { const pl = $("#pl", body); if (keep) pl.replaceWith(keep); else { pl.outerHTML = playerHtml(T.audio, "Hörprobe – Melodie mitlernen"); mountPlayers(body); } }
      body.querySelectorAll("#md button").forEach(b => b.onclick = () => { mode = b.dataset.m; draw(); });
    }
    function draw() {
      if (mode === "lesen") {
        shell(`<div class="card textbody">${T.s.map((x, i) => `<p class="strophe" data-n="${T.s.length > 1 ? i + 1 : ""}">${esc(x)}</p>`).join("")}${T.note ? `<div class="tip" style="font-family:var(--sans)">${esc(T.note)}</div>` : ""}</div>
          <button class="btn block" style="margin-top:12px" id="ok">Gelesen – weiter zu den Lücken</button>`);
        $("#ok", body).onclick = () => { star(1); mode = "luecken"; draw(); };
      } else if (mode === "luecken") gaps(); else recite();
    }
    function gaps() {
      const words = []; // {si, wi, w}
      const tokens = T.s.map(st => st.split(/(\s+)/));
      tokens.forEach((arr, si) => arr.forEach((w, wi) => { const clean = w.replace(/[^\p{L}’']/gu, ""); if (clean.length >= 4) words.push({ si, wi, w: clean }); }));
      const chosen = pick(words, Math.max(4, Math.round(words.length * .22))).sort((a, b) => a.si - b.si || a.wi - b.wi);
      const vocab = [...new Set(words.map(w => w.w))];
      let cur = 0, errors = 0; const state = chosen.map(() => 0);
      function render() {
        const mark = new Map(chosen.map((c_, k) => [c_.si + ":" + c_.wi, k]));
        const html = tokens.map((arr, si) => `<p class="strophe" data-n="${T.s.length > 1 ? si + 1 : ""}">${arr.map((w, wi) => {
          const k = mark.get(si + ":" + wi); if (k === undefined) return esc(w);
          const cl = chosen[k].w, rest = w.replace(cl, "§§");
          const span = `<span class="blank ${k === cur ? "active" : ""} ${state[k] === 1 ? "done" : state[k] === 2 ? "miss" : ""}" data-k="${k}">${state[k] ? esc(cl) : "&nbsp;".repeat(Math.min(10, cl.length))}</span>`;
          return esc(rest).replace("§§", span);
        }).join("")}</p>`).join("");
        const done = cur >= chosen.length;
        let opts = [];
        if (!done) { const cor = chosen[cur].w; opts = shuffle([cor, ...pick(vocab.filter(v => v !== cor), 3)]); }
        shell(`<div class="card textbody">${html}</div>
          ${done ? `<div class="card" style="margin-top:12px;text-align:center"><div class="score-big">${pct(chosen.length - errors, chosen.length)}%</div><p>${errors} Fehler bei ${chosen.length} Lücken</p>
            <div class="btn-row"><button class="btn secondary" id="re">Neue Lücken</button><button class="btn" id="up">Weiter: Aufsagen</button></div></div>`
          : `<div class="wordbank">${opts.map(o => `<button data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div>`}`);
        if (done) {
          if (errors <= Math.floor(chosen.length * .15)) star(2);
          $("#re", body).onclick = gaps; $("#up", body).onclick = () => { mode = "aufsagen"; draw(); };
        } else {
          body.querySelectorAll(".wordbank button").forEach(b => b.onclick = () => {
            if (b.dataset.o === chosen[cur].w) { if (!state[cur]) state[cur] = 1; cur++; render(); }
            else { errors++; state[cur] = 2; b.disabled = true; }
          });
          const a = body.querySelector(".blank.active"); if (a) a.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
      render();
    }
    function recite() {
      let k = 0, good = 0;
      function r() {
        if (k >= T.s.length) {
          const ok = good === T.s.length; if (ok) star(3);
          shell(`<div class="card" style="text-align:center"><div class="score-big">${good}/${T.s.length}</div><p>${ok ? "Perfekt aufgesagt – drei Sterne!" : "Noch nicht ganz – lies die schwierigen Stellen nochmal."}</p>
            <div class="btn-row"><button class="btn secondary" id="ls">Zur Liste</button><button class="btn" id="ag">Nochmal</button></div></div>`);
          $("#ls", body).onclick = () => runTexte(c, body, back); $("#ag", body).onclick = recite; return;
        }
        const first = T.s[k].split(/\s+/).slice(0, 3).join(" ");
        shell(`<div class="card"><div class="muted small" style="font-weight:700">${T.s.length > 1 ? `Strophe ${k + 1} von ${T.s.length}` : "Ganzer Text"}</div>
          <p class="textbody">Beginnt mit: <b>„${esc(first)} …“</b></p><p class="muted small">Sag den Rest laut auf. Dann aufdecken und ehrlich bewerten.</p>
          <div id="sol"></div><button class="btn block" id="rv">Aufdecken</button></div>`);
        $("#rv", body).onclick = () => {
          $("#sol", body).innerHTML = `<div class="hint textbody">${esc(T.s[k])}</div><div class="rate"><button class="r2" data-v="1">Fehlerfrei</button><button class="r0" data-v="0">Mit Fehlern</button></div>`;
          $("#rv", body).remove();
          body.querySelectorAll(".rate button").forEach(b => b.onclick = () => { good += +b.dataset.v; k++; r(); });
        };
      }
      r();
    }
    draw();
  }

  /* ================= Diskussionstrainer ================= */
  function runDebatte(c, body, back) {
    const s = cs(c.id);
    const T = window.DEBATTE[Math.floor(Math.random() * window.DEBATTE.length)];
    let left = 120;
    body.innerHTML = `<div class="card stack"><div class="chip">Aktuelles Thema</div><h3>${esc(T.t)}</h3>
      <p class="muted small">Nimm dir 2 Minuten. Formuliere deine Position laut – als Argumentationskette.</p>
      <div class="kalkuel timer" id="tm">2:00</div>
      <details class="box"><summary><span class="grow">Denkanstöße (erst nach eigenem Versuch öffnen)</span></summary><div class="inner"><ul>${T.h.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></details>
      <div class="tip"><b>Checkliste:</b><br>☐ These klar benannt<br>☐ Fakt und Wertung getrennt<br>☐ Mindestens ein Prinzip der Soziallehre (Personalität, Solidarität, Subsidiarität, Gemeinwohl, Nachhaltigkeit) angewandt<br>☐ Die Sicht der Gegenseite fair wiedergegeben<br>☐ Beispiel oder Zahl genannt</div>
      <div class="rate"><button class="r2" data-v="2">Überzeugend</button><button class="r1" data-v="1">Ausbaufähig</button><button class="r0" data-v="0">Holprig</button></div></div>
      <div class="btn-row" style="margin-top:12px"><button class="btn secondary" id="bk">Methoden</button><button class="btn" id="nx">Neues Thema</button></div>`;
    route.timer = setInterval(() => { left--; const tm = $("#tm", body); if (!tm) return clearInterval(route.timer); tm.textContent = `${Math.floor(Math.max(0, left) / 60)}:${String(Math.max(0, left) % 60).padStart(2, "0")}`; if (left <= 0) { clearInterval(route.timer); toast("Zeit! Wie überzeugend warst du?"); } }, 1000);
    body.querySelectorAll(".rate button").forEach(b => b.onclick = () => { s.debatte = (s.debatte || 0) + (+b.dataset.v >= 1 ? 1 : 0); save(); body.querySelectorAll(".rate button").forEach(x => x.classList.toggle("sel", x === b)); toast("Gespeichert"); });
    $("#bk", body).onclick = () => { clearInterval(route.timer); back(); };
    $("#nx", body).onclick = () => { clearInterval(route.timer); runDebatte(c, body, back); };
  }

  /* ================= Prüfungsmodus ================= */
  function textQuestions(list, n) {
    const phrases = []; list.forEach(t => t.s.forEach(st => { const ps = st.split(/(?<=[,;:!?.])\s+/).filter(p => p.split(" ").length >= 2); ps.forEach((p, i) => phrases.push({ t: t.t, p, next: ps[i + 1] })); }));
    const cand = shuffle(phrases.filter(x => x.next)); const all = phrases.map(x => x.p);
    return cand.slice(0, n).map(x => { const opts = shuffle([x.next, ...pick(all.filter(a => a !== x.next && a !== x.p), 3)]); return { q: `${x.t}: Wie geht es weiter nach „… ${x.p}“?`, a: opts, c: opts.indexOf(x.next), e: x.next }; });
  }
  function examQuestions(c, n) {
    if (c.special === "farben") return farbQuestions(n);
    let qs = (c.quiz || []).map(q => { const o = shuffle(q.a.map((_, i) => i)); return { q: q.q, a: o.map(i => q.a[i]), c: o.indexOf(q.c), e: q.e }; });
    if (c.special && c.special.startsWith("texte:")) qs = shuffle(qs).slice(0, Math.ceil(n / 2)).concat(textQuestions(TEXTS(c), n));
    return shuffle(qs).slice(0, n);
  }
  function exam(ex) {
    const E = EXAMS[ex];
    setTop("Prüfungsmodus", "/lernen/" + ex);
    view.innerHTML = `<div class="exam-hero ${ex}"><div class="deco"></div><h2>${E.name} – Probeprüfung</h2>
        <p>Wie bei der echten Prüfung muss <b>jedes Teilgebiet positiv</b> sein. Danach gibt’s ein Übungs-Kalkül.</p></div>
      <div class="card stack" style="margin-top:14px">
        <b>Umfang</b>
        <div class="seg" id="len"><button data-n="4" aria-pressed="false">Kurz · 4/Gebiet</button><button data-n="6" aria-pressed="true">Normal · 6/Gebiet</button><button data-n="10" aria-pressed="false">Lang · 10/Gebiet</button></div>
        <label class="row small"><input type="checkbox" id="oral" checked> <span>Mündlicher Teil: je Gebiet eine Leitfrage (Selbstbewertung)</span></label>
        <label class="row small"><input type="checkbox" id="tmr" checked> <span>Zeitlimit (45 s pro Frage)</span></label>
        <button class="btn block" id="start">Prüfung beginnen</button>
      </div>
      <div class="card" style="margin-top:12px"><h3>Bisherige Probeprüfungen</h3>${S.exams.filter(e => e.exam === ex).slice(-5).reverse().map(e => `<div class="result-row"><div class="grow">${new Date(e.date).toLocaleString("de-AT", { dateStyle: "short", timeStyle: "short" })}</div><b>${e.score}%</b><span class="badge ${e.passed ? "ok" : "no"}">${esc(e.kalkuel)}</span></div>`).join("") || `<p class="muted small">Noch keine.</p>`}</div>`;
    let n = 6;
    view.querySelectorAll("#len button").forEach(b => b.onclick = () => { n = +b.dataset.n; view.querySelectorAll("#len button").forEach(x => x.setAttribute("aria-pressed", x === b)); });
    $("#start").onclick = () => runExam(ex, n, $("#oral").checked, $("#tmr").checked);
  }
  function runExam(ex, n, oral, timed) {
    const E = EXAMS[ex];
    const items = [];
    E.chapters.forEach(c => {
      examQuestions(c, n).forEach(q => items.push(Object.assign({ ch: c.id, type: "mc" }, q)));
      if (oral) {
        const lf = (SK[c.id] && SK[c.id].leitfragen) || [];
        if (lf.length) items.push({ ch: c.id, type: "oral", q: lf[Math.floor(Math.random() * lf.length)] });
        else if (c.special === "debatte") { const d = window.DEBATTE[Math.floor(Math.random() * window.DEBATTE.length)]; items.push({ ch: c.id, type: "oral", q: "Diskussion: " + d.t, debate: true }); }
      }
    });
    const res = {}; E.chapters.forEach(c => res[c.id] = { r: 0, t: 0 });
    let i = 0;
    const body = view;
    function next() { clearInterval(route.timer); i++; if (i < items.length) draw(); else finish(); }
    function draw() {
      const it = items[i], c = CH[it.ch];
      setTop(`Prüfung · ${i + 1}/${items.length}`, null);
      if (it.type === "oral") {
        body.innerHTML = `<div class="card"><div class="q-head"><span>${esc(c.title)} · mündlich</span><span>${i + 1}/${items.length}</span></div><div class="progress-line"><i style="width:${pct(i, items.length)}%"></i></div>
          <div class="q-text">${esc(it.q)}</div><p class="muted small">Beantworte die Frage laut, als säße die Kommission vor dir. Dann bewerte dich ehrlich.</p>
          <div id="h"></div>${it.debate ? "" : `<button class="btn secondary block" id="hint">Skript-Hinweise zur Kontrolle</button>`}
          <div class="rate"><button class="r2" data-v="1">Vollständig</button><button class="r1" data-v=".5">Teilweise</button><button class="r0" data-v="0">Nicht gewusst</button></div></div>`;
        const hb = $("#hint", body); if (hb) hb.onclick = () => { hb.remove(); $("#h", body).innerHTML = hintsFor(c, it.q); };
        body.querySelectorAll(".rate button").forEach(b => b.onclick = () => { res[it.ch].r += +b.dataset.v; res[it.ch].t++; next(); });
        return;
      }
      let left = 45;
      body.innerHTML = `<div class="card"><div class="q-head"><span>${esc(c.title)}</span><span class="timer" id="tm">${timed ? "0:45" : `${i + 1}/${items.length}`}</span></div>
        <div class="progress-line"><i style="width:${pct(i, items.length)}%"></i></div>
        ${it.html ? `<div style="margin:10px 0 14px">${it.html}</div>` : ""}<div class="q-text">${esc(it.q)}</div>
        <div class="answers ${it.bands ? "band-choices" : ""}">${it.a.map((a, k) => `<button class="answer" data-k="${k}">${it.bands ? a : esc(a)}</button>`).join("")}</div>
        <button class="btn ghost block" style="margin-top:12px" id="skip">Weiß ich nicht</button></div>`;
      const answer = k => {
        clearInterval(route.timer);
        res[it.ch].t++; if (k === it.c) res[it.ch].r++;
        body.querySelectorAll(".answer").forEach((x, j) => { x.disabled = true; if (j === it.c) x.classList.add("correct"); else if (j === k) x.classList.add("wrong"); });
        setTimeout(next, k === it.c ? 550 : 1300);
      };
      body.querySelectorAll(".answer").forEach(b => b.onclick = () => answer(+b.dataset.k));
      $("#skip", body).onclick = () => answer(-1);
      if (timed) route.timer = setInterval(() => { left--; const tm = $("#tm", body); if (tm) tm.textContent = `0:${String(Math.max(0, left)).padStart(2, "0")}`; if (left <= 0) answer(-1); }, 1000);
    }
    function finish() {
      setTop("Ergebnis", "/lernen/" + ex);
      const rows = E.chapters.map(c => { const r = res[c.id]; const p = pct(r.r, r.t); return { c, p, ok: p >= 60 }; });
      const total = Math.round(rows.reduce((a, r) => a + r.p, 0) / rows.length);
      const passed = rows.every(r => r.ok);
      const kalkuel = !passed ? "nicht bestanden" : (total >= 92 && rows.every(r => r.p >= 80)) ? "cum laude" : total >= 80 ? "bene" : "bestanden";
      S.exams.push({ exam: ex, date: Date.now(), score: total, passed, kalkuel }); save();
      body.innerHTML = `<div class="card stack" style="text-align:center"><div class="muted small">${E.name} · Probeprüfung</div>
          <div class="score-big">${total}%</div><div class="kalkuel" style="color:${passed ? "var(--ok)" : "var(--bad)"}">${kalkuel}</div>
          <p class="muted small">Übungs-Kalkül der App: jedes Gebiet ≥ 60 % = bestanden · Ø ≥ 80 % = bene · Ø ≥ 92 % und jedes Gebiet ≥ 80 % = cum laude. Die echte Bewertung trifft die Prüfungskommission nach der GO.</p></div>
        <div class="card" style="margin-top:12px"><h3>Teilgebiete</h3>${rows.map(r => `<div class="result-row"><div class="glyph" style="width:36px;height:36px;font-size:1rem">${r.c.glyph}</div><div class="grow"><b>${esc(r.c.title)}</b><div class="bar"><i style="width:${r.p}%"></i></div></div><b>${r.p}%</b><span class="badge ${r.ok ? "ok" : "no"}">${r.ok ? "positiv" : "negativ"}</span></div>`).join("")}</div>
        ${rows.some(r => !r.ok) ? `<div class="card" style="margin-top:12px"><b>Empfehlung:</b> Wiederhole zuerst ${rows.filter(r => !r.ok).map(r => `<a href="#/kapitel/${r.c.id}/vertiefen">${esc(r.c.title)}</a>`).join(", ")}.</div>` : ""}
        <div class="btn-row" style="margin-top:12px"><button class="btn secondary" id="bk">Lernbereich</button><button class="btn" id="ag">Neue Prüfung</button></div>`;
      $("#bk", body).onclick = () => go("/lernen/" + ex); $("#ag", body).onclick = () => exam(ex);
    }
    draw();
  }

  /* ================= Einstellungen ================= */
  function settings() {
    setTop("Einstellungen", S.lastExam ? "/lernen/" + S.lastExam : "/");
    const th = S.theme || "auto";
    view.innerHTML = `<div class="card stack"><h3>Darstellung</h3>
        <div class="seg" id="th"><button data-t="auto" aria-pressed="${th === "auto"}">Automatisch</button><button data-t="light" aria-pressed="${th === "light"}">Hell</button><button data-t="dark" aria-pressed="${th === "dark"}">Dunkel</button></div></div>
      <div class="card stack" style="margin-top:12px"><h3>Lernfortschritt</h3>
        ${Object.values(EXAMS).map(e => `<div class="row"><div class="grow"><b>${e.name}</b><div class="bar"><i style="width:${examProgress(e.id)}%"></i></div></div><span class="chip">${examProgress(e.id)}%</span></div>`).join("")}
        <div class="btn-row"><button class="btn secondary" data-reset="brander">Brander zurücksetzen</button><button class="btn secondary" data-reset="burschen">Burschen zurücksetzen</button></div>
        <button class="btn danger block" data-reset="all">Gesamten Fortschritt zurücksetzen</button>
        <div class="btn-row"><button class="btn ghost" id="exp">Fortschritt exportieren</button><button class="btn ghost" id="imp">Importieren</button></div>
      </div>
      <div class="card stack" style="margin-top:12px"><h3>Über die App</h3>
        <p class="small muted">Inhalte aufbereitet aus dem Fuchsenskript der K.a.V. Bajuvaria Wien (gültige Fassung seit 1.9.2023), dem Komment und den Rechtstexten (4. GO-Novelle). Maßgeblich sind immer die Originaltexte – sie sind in jedem Kapitel unter „Originaltext aus dem Skript“ vollständig enthalten.</p>
        <p class="small muted">Alles läuft offline; der Fortschritt bleibt nur auf diesem Gerät gespeichert.</p></div>`;
    view.querySelectorAll("#th button").forEach(b => b.onclick = () => { S.theme = b.dataset.t; save(); applyTheme(); settings(); });
    view.querySelectorAll("[data-reset]").forEach(b => b.onclick = () => {
      const w = b.dataset.reset;
      confirmBox("Fortschritt zurücksetzen?", w === "all" ? "Alle Lernstände und Probeprüfungen werden gelöscht." : `Alle Lernstände der ${EXAMS[w].name} werden gelöscht.`, "Zurücksetzen", () => {
        if (w === "all") { const t = S.theme; S = blank(); S.theme = t; }
        else { EXAMS[w].chapters.forEach(c => delete S.ch[c.id]); S.exams = S.exams.filter(e => e.exam !== w); }
        save(); toast("Fortschritt zurückgesetzt"); settings();
      });
    });
    $("#exp").onclick = () => {
      const data = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
      modal(`<h3>Fortschritt exportieren</h3><p class="muted small">Kopiere diesen Code und füge ihn auf einem anderen Gerät unter „Importieren“ ein.</p><textarea class="searchbox" rows="5" readonly>${data}</textarea><button class="btn block" style="margin-top:12px" data-x>Schließen</button>`,
        m => { const ta = m.querySelector("textarea"); ta.select(); try { navigator.clipboard.writeText(data); toast("In die Zwischenablage kopiert"); } catch (e) {} m.querySelector("[data-x]").onclick = closeModal; });
    };
    $("#imp").onclick = () => modal(`<h3>Fortschritt importieren</h3><textarea class="searchbox" rows="5" placeholder="Code einfügen"></textarea><div class="btn-row" style="margin-top:12px"><button class="btn secondary" data-x>Abbrechen</button><button class="btn" data-ok>Importieren</button></div>`,
      m => { m.querySelector("[data-x]").onclick = closeModal; m.querySelector("[data-ok]").onclick = () => {
        try { const d = JSON.parse(decodeURIComponent(escape(atob(m.querySelector("textarea").value.trim())))); if (!d.ch) throw 0; S = Object.assign(blank(), d); save(); closeModal(); toast("Importiert"); settings(); }
        catch (e) { toast("Ungültiger Code"); }
      }; });
  }
  function applyTheme() { const t = S.theme || "auto"; if (t === "auto") document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", t); }

  /* Android-Zurück-Taste (Capacitor) */
  document.addEventListener("backbutton", () => { const b = $("#backBtn"); if (!b.hidden && b.onclick) b.onclick(); }, false);

  applyTheme();
  route();
})();
