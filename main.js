(() => {
  const S = window.SITE, P = window.PROJECTS, PUB = window.PUBLICATIONS || [], INT = window.INTERESTS || { items: [] }, SK = window.SKILLS || [], CE = window.CERTS || [];
  const page = document.body.dataset.page;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));

  /* ---------- theme: auto (default) | light | dark ---------- */
  const MODES = ["auto", "light", "dark"];
  let theme = (() => { try { const t = localStorage.getItem("theme"); return MODES.includes(t) ? t : "auto"; } catch { return "auto"; } })();
  document.body.dataset.theme = theme;
  const projectDark = () => theme === "dark" || (theme === "auto" && page === "project");
  const setHtmlBg = () => { if (page === "project") document.documentElement.style.background = projectDark() ? "#0a0908" : "#ffffff"; };
  setHtmlBg();

  /* ---------- shared chrome ---------- */
  const cur = page === "project" ? new URLSearchParams(location.search).get("p") : "";
  const home = page === "home" ? "" : "index.html";
  $("#header").innerHTML = `
    <a class="brand" href="index.html">${esc(S.name)}</a>
    <nav>
      <div class="dd">
        <button class="dd-btn" type="button" aria-expanded="false" aria-haspopup="true">Projects <i>▾</i></button>
        <div class="dd-menu" role="menu">
          ${P.map((p) => `<a role="menuitem" href="project.html?p=${p.slug}" class="${p.slug === cur ? "cur" : ""}">${esc(p.title)}</a>`).join("")}
          <a role="menuitem" class="all" href="index.html#work">All projects →</a>
        </div>
      </div>
      <div class="dd">
        <button class="dd-btn" type="button" aria-expanded="false" aria-haspopup="true">Menu <i>▾</i></button>
        <div class="dd-menu" role="menu">
          <a role="menuitem" href="${home}#publications">Research &amp; Publications</a>
          <a role="menuitem" href="${home}#certs" data-panel="certs">Certifications</a>
          <a role="menuitem" href="${home}#skills">Skillset</a>
          <a role="menuitem" href="${home}#interests" data-panel="interests">Areas of Interest</a>
          ${S.resume ? `<a role="menuitem" href="${esc(S.resume)}" data-resume>Resume</a>` : ""}
          <a role="menuitem" class="all" href="#footer">Contact →</a>
        </div>
      </div>
    </nav>`;
  {
    const dds = [...document.querySelectorAll(".dd")];
    const set = (d, o) => { d.classList.toggle("open", o); d.querySelector(".dd-btn").setAttribute("aria-expanded", o); };
    dds.forEach((d) => {
      d.querySelector(".dd-btn").addEventListener("click", (e) => { e.stopPropagation(); const o = !d.classList.contains("open"); dds.forEach((x) => set(x, false)); set(d, o); });
      d.querySelectorAll(".dd-menu a").forEach((a) => a.addEventListener("click", () => set(d, false)));
    });
    document.addEventListener("click", (e) => dds.forEach((d) => { if (!d.contains(e.target)) set(d, false); }));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") dds.forEach((d) => set(d, false)); });
  }

  $("#footer").innerHTML = `
    <span class="eyebrow">Open to <b>${esc(S.openTo)}</b></span>
    <a class="footer-cta" href="mailto:${esc(S.email)}">${esc(S.email)}</a>
    <div class="footer-links">
      <a href="${esc(S.github)}" target="_blank" rel="noopener">GitHub</a>
      <a href="${esc(S.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
      ${S.resume ? `<a href="${esc(S.resume)}" target="_blank" rel="noopener">Resume (PDF)</a>` : ""}
    </div>
    <p class="copy">© 2026 — ${esc(S.name)}</p>`;

  /* ---------- page content ---------- */
  if (page === "home") {
    const lines = S.tagline.map((t, i) =>
      `<span class="mask"><span class="slide-text" style="transition-delay:${i * 0.09}s">${i === S.taglineEm ? `<em>${esc(t)}</em>` : esc(t)}</span></span>`).join("");
    const photo = S.photo
      ? `<figure class="photo" data-reveal style="transition-delay:.25s"><img src="${esc(S.photo)}" alt="${esc(S.name)}"><figcaption>${esc(S.name)} — fig. 01</figcaption></figure>`
      : "";
    $("#hero").innerHTML = `
      <div class="hero-grid ${photo ? "has-photo" : ""}">
        <div>
          <h2 class="hero-name"><span class="mask"><span class="slide-text">${esc(S.name)}</span></span></h2>
          <h1>${lines}</h1>
          <p class="hero-bio" data-reveal style="transition-delay:.3s">${esc(S.bio)}</p>
        </div>
        ${photo}
      </div>`;

    $("#rows").innerHTML = P.map((p, i) => `
      <a class="project-row" data-reveal style="transition-delay:${i * 0.07}s" href="project.html?p=${p.slug}">
        <span class="p-year">${esc(p.year)}</span>
        <span class="p-title">${esc(p.title)}<small>${esc(p.summary)}</small></span>
        <span class="p-kind">${esc(p.kind)}</span>
        <span class="p-arrow">→</span>
      </a>`).join("");
    $("#pubs").innerHTML = PUB.map((p, i) => {
      const inner = `
        <span class="p-year">${esc(p.year)}</span>
        <span class="p-title">${esc(p.title)}<small>${esc(p.venue)} · ${esc(p.date)}</small><small class="sm2">${esc(p.summary)}</small></span>
        <span class="p-kind ${p.link ? "ext-link" : ""}">${p.link ? 'Go to paper <span class="ext" aria-hidden="true">↗</span>' : "Presented"}</span>
        <span class="p-arrow"></span>`;
      return p.link
        ? `<a class="project-row" data-reveal href="${esc(p.link)}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="project-row static" data-reveal>${inner}</div>`;
    }).join("");

    $("#iintro").textContent = INT.intro || "";
    $("#ints").innerHTML = INT.items.map((it, i) => `
      <div class="int-row" data-reveal style="transition-delay:${i * 0.07}s">
        <div>
          <h3 class="int-title">${esc(it.title)}</h3>
          <p class="int-text">${esc(it.text)}</p>
          <div class="int-tags">${it.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        </div>
        ${it.proof ? `<a class="int-proof" href="${it.proof.href || "project.html?p=" + it.proof.slug}"><small>See it in</small>${esc(it.proof.label)} →</a>` : "<span></span>"}
      </div>`).join("");

    $("#skillrows").innerHTML = SK.map((g, i) => `
      <div class="int-row sk-row" data-reveal style="transition-delay:${i * 0.05}s">
        <h3 class="int-title sk-title">${esc(g.group)}</h3>
        <div class="int-tags sk-tags">${g.items.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      </div>`).join("");
    $("#certrows").innerHTML = CE.map((c, i) => `
      <div class="project-row cert-row static" data-reveal style="transition-delay:${i * 0.07}s">
        <span class="p-year">${esc(c.date)}</span>
        <span class="p-title">${esc(c.title)}<small>${esc(c.issuer)}${c.id ? " · ID " + esc(c.id) : ""}</small></span>
        ${c.link ? `<a class="cert-link" href="${esc(c.link)}" target="_blank" rel="noopener">View certificate ↗</a>` : `<span class="p-kind">Link soon</span>`}
        ${c.logo === "microsoft" ? `<div class="cert-logo" aria-label="Microsoft"><svg viewBox="0 0 23 23" width="56" height="56" aria-hidden="true"><rect width="11" height="11" fill="#f25022"/><rect x="12" width="11" height="11" fill="#7fba00"/><rect y="12" width="11" height="11" fill="#00a4ef"/><rect x="12" y="12" width="11" height="11" fill="#ffb900"/></svg><span>Microsoft</span></div>` : c.badge ? `<div class="cert-badge" data-iframe-width="150" data-iframe-height="270" data-share-badge-id="${esc(c.badge)}" data-share-badge-host="https://www.credly.com"></div>` : "<span></span>"}
      </div>`).join("");
    if (CE.some((c) => c.badge)) { const s = document.createElement("script"); s.async = true; s.src = "https://cdn.credly.com/assets/utilities/embed.js"; document.body.appendChild(s); }

    /* side rail: section index that tracks scroll */
    const secs = [["hero", "Intro"], ["work", "Projects"], ["publications", "Research"], ["skills", "Skills"], ["footer", "Contact"]];
    $("#rail").innerHTML = secs.map(([id, l], n) => `<a href="#${id}" data-s="${id}"><em>${l}</em></a>`).join("");
    const rio = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) document.querySelectorAll("#rail a").forEach((a) => a.classList.toggle("on", a.dataset.s === en.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(([id]) => rio.observe(document.getElementById(id)));

    /* white intro -> black, driven by scroll position and eased every frame */
    const heroEl = $("#hero");
    const L = { bg: "#ffffff", "bg-hover": "#f5f5f7", text: "#1d1d1f", muted: "#6e6e73", accent: "#b35c00", border: "#e3e3e8", "btn-hover": "#ffffff" };
    const D = { bg: "#0a0908", "bg-hover": "#14120f", text: "#e9e3d3", muted: "#8b8373", accent: "#ffa31a", border: "#24211a", "btn-hover": "#0a0908" };
    /* blend in OKLab so the midpoint stays clean instead of going muddy grey */
    const toLin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const toSrgb = (v) => 255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
    const lab = (h) => {
      const [r, g, b] = [1, 3, 5].map((i) => toLin(parseInt(h.slice(i, i + 2), 16)));
      const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
      const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
      const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
      return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
    };
    const LL = {}, DL = {};
    Object.keys(L).forEach((k) => { LL[k] = lab(L[k]); DL[k] = lab(D[k]); });
    const mix = (k, t) => {
      const [A, B, C] = LL[k].map((v, i) => v + (DL[k][i] - v) * t);
      const l = (A + 0.3963377774 * B + 0.2158037573 * C) ** 3, m = (A - 0.1055613458 * B - 0.0638541728 * C) ** 3, s = (A - 0.0894841775 * B - 1.291485548 * C) ** 3;
      const rgbv = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
      return `rgb(${rgbv.map((v) => Math.round(Math.min(255, Math.max(0, toSrgb(Math.min(1, Math.max(0, v)))))) ).join(",")})`;
    };
    /* a warm amber glow that swells at the midpoint of the change and fades out */
    const glow = document.createElement("div");
    glow.id = "glow";
    document.body.appendChild(glow);
    let cur = -1, goal = 0;
    const target = () => {
      const vh = innerHeight, bottom = heroEl.getBoundingClientRect().bottom;
      const t = Math.min(1, Math.max(0, (vh * 0.95 - bottom) / (vh * 1.1)));
      goal = theme === "light" ? 0 : theme === "dark" ? 1 : t * t * t * (t * (t * 6 - 15) + 10); // auto: smootherstep on scroll
    };
    const paint = (t) => {
      // text flips quickly at the midpoint instead of fading through grey, so it is always readable against the background
      const ss = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u); };
      const flip = t < 0.5 ? 0 : 1; // hard switch: a blend of the two text colours would equal the grey background
      Object.keys(L).forEach((k) => document.body.style.setProperty("--" + k, mix(k, k === "text" || k === "muted" ? flip : t)));
      // mid-change, secondary text borrows the main text colour so it keeps its contrast
      const nums = (s) => s.match(/\d+/g).map(Number);
      const tx = nums(mix("text", flip)), mu = nums(mix("muted", flip)), w = Math.sin(Math.PI * t) * 0.85;
      document.body.style.setProperty("--muted", `rgb(${mu.map((v, i) => Math.round(v + (tx[i] - v) * w)).join(",")})`);
      document.body.style.setProperty("--scan", t > 0.5 ? D_SCAN : L_SCAN);
      document.documentElement.style.background = mix("bg", t);
    };
    const L_SCAN = "rgba(0,0,0,0.012)", D_SCAN = "rgba(255,255,255,0.018)";
    const loop = () => {
      target();
      if (cur < 0) cur = goal;
      cur += (goal - cur) * (reduce ? 1 : 0.05);
      if (Math.abs(goal - cur) < 0.0005) cur = goal;
      paint(cur);
      glow.style.opacity = (Math.sin(Math.PI * cur) * 0.07).toFixed(3);
      requestAnimationFrame(loop);
    };
    loop();
  }

  if (page === "project") {
    const i = Math.max(0, P.findIndex((p) => p.slug === new URLSearchParams(location.search).get("p")));
    const p = P[i], nx = P[(i + 1) % P.length];
    document.title = `${p.title} — ${S.name}`;
    const btn = (label, url, primary) => url
      ? `<a class="btn ${primary ? "primary" : ""}" href="${esc(url)}" target="_blank" rel="noopener">${label} ↗</a>`
      : `<span class="btn off">${label} · soon</span>`;
    $("#project").innerHTML = `
      <section class="proj-head">
        <a class="back" href="index.html#work" data-reveal>← Index</a>
        <span class="eyebrow" data-reveal>${esc(p.kind)} / ${esc(p.year)}</span>
        <h1><span class="mask"><span class="slide-text">${esc(p.title)}</span></span></h1>
        <p class="lead" data-reveal style="transition-delay:.2s">${esc(p.summary)}</p>
        <div class="actions" data-reveal style="transition-delay:.3s">
          ${p.demo === null ? "" : btn("Demo", p.demo, true)}${btn("Report", p.report, false)}${p.github ? `<a class="btn" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}
        </div>
      </section>
      <dl class="meta" data-reveal>
        <div><dt>Year</dt><dd>${esc(p.year)}</dd></div>
        <div><dt>Stack</dt><dd>${p.stack.map(esc).join(" · ")}</dd></div>
      </dl>
      ${[["Problem", p.problem], ["Approach", p.approach], ["Results", p.results]].map(([h, t]) =>
        `<section class="block" data-reveal><h2>${h}</h2><p>${esc(t)}</p></section>`).join("")}
      <a class="next" href="project.html?p=${nx.slug}">
        <span class="next-inner">
          <span class="next-label"><span>Next project</span><span>${esc(nx.year)}</span></span>
          <span class="next-title">${esc(nx.title)}</span>
          <span class="next-kind">${esc(nx.kind)} <b>Open project →</b></span>
        </span>
      </a>`;
  }

  /* ---------- resume viewer: only opens on click ---------- */
  const rm = document.createElement("div");
  rm.id = "resume-modal"; rm.setAttribute("aria-hidden", "true");
  rm.innerHTML = `
    <div class="rm-bar">
      <span>Resume</span>
      <span class="rm-actions">
        <a href="${esc(S.resume)}" target="_blank" rel="noopener">Open ↗</a>
        <a href="${esc(S.resume)}" download>Download</a>
        <button type="button" class="rm-close">Close ✕</button>
      </span>
    </div>
    <div class="rm-body"></div>`;
  document.body.appendChild(rm);
  const openResume = () => {
    const body = $(".rm-body", rm);
    if (!body.firstChild) body.innerHTML = `<iframe src="${esc(S.resume)}#view=FitH" title="Resume of ${esc(S.name)}"></iframe>`;
    document.querySelectorAll(".dd.open").forEach((d) => d.classList.remove("open"));
    rm.classList.add("open"); rm.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked"); window.lenis && window.lenis.stop();
  };
  const closeResume = () => {
    rm.classList.remove("open"); rm.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked"); window.lenis && window.lenis.start();
  };
  document.addEventListener("click", (e) => { if (e.target.closest("[data-resume]")) { e.preventDefault(); e.stopPropagation(); openResume(); } }, true);
  $(".rm-close", rm).addEventListener("click", closeResume);
  rm.addEventListener("click", (e) => { if (e.target === rm || e.target.classList.contains("rm-body")) closeResume(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && rm.classList.contains("open")) closeResume(); });

  /* ---------- menu panels: certifications + areas of interest open on click ---------- */
  const pm = document.createElement("div");
  pm.id = "panel-modal"; pm.setAttribute("aria-hidden", "true");
  pm.innerHTML = `<div class="pn-bar"><button type="button" class="rm-close">Close ✕</button></div><div class="pn-scroll" data-lenis-prevent><div class="pn-body"></div></div>`;
  document.body.appendChild(pm);
  const closePanel = () => {
    pm.classList.remove("open"); pm.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked"); window.lenis && window.lenis.start();
  };
  const openPanel = (id) => {
    const src = $("#" + id);
    if (!src) return;
    document.querySelectorAll(".dd.open").forEach((d) => d.classList.remove("open"));
    const body = $(".pn-body", pm);
    body.innerHTML = ""; body.appendChild(src);
    src.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    pm.classList.add("open"); pm.setAttribute("aria-hidden", "false");
    $(".pn-scroll", pm).scrollTop = 0;
    document.body.classList.add("locked"); window.lenis && window.lenis.stop();
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-panel]");
    if (!a || page !== "home") return; // on project pages the link goes home and opens it there
    e.preventDefault(); e.stopPropagation(); openPanel(a.dataset.panel);
  }, true);
  $(".rm-close", pm).addEventListener("click", closePanel);
  pm.addEventListener("click", (e) => { const a = e.target.closest("a"); if (a && a.getAttribute("href") && a.getAttribute("href").includes("#")) closePanel(); });
  pm.addEventListener("click", (e) => { if (e.target === pm || e.target.classList.contains("pn-scroll")) closePanel(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && pm.classList.contains("open")) closePanel(); });
  if (page === "home" && ["interests", "certs"].includes(location.hash.slice(1))) setTimeout(() => openPanel(location.hash.slice(1)), 900);

  /* ---------- theme toggle ---------- */
  const tb = document.createElement("button");
  tb.id = "theme-toggle"; tb.type = "button";
  const label = () => { tb.innerHTML = `<i></i>Theme · ${theme}`; tb.setAttribute("aria-label", "Change theme, currently " + theme); };
  label();
  tb.addEventListener("click", () => {
    theme = MODES[(MODES.indexOf(theme) + 1) % MODES.length];
    document.body.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch {}
    setHtmlBg(); label();
  });
  document.body.appendChild(tb);

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = window.lenis = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const goto = (hash) => {
    const el = $(hash);
    if (!el) return;
    lenis ? lenis.scrollTo(el, { offset: -20 }) : el.scrollIntoView({ behavior: "smooth" });
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || e.metaKey || e.ctrlKey || a.target === "_blank") return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin && location.protocol !== "file:") return;
    const samePage = url.pathname === location.pathname;
    if (samePage && url.hash) { e.preventDefault(); goto(url.hash); return; }
    if (!samePage && url.protocol === location.protocol && !a.hasAttribute("download") && !a.href.startsWith("mailto:")) {
      e.preventDefault();
      // curtain in the destination page's colour, so the background change is part of the move
      const toProject = url.pathname.endsWith("project.html");
      const c = document.createElement("div");
      c.className = "curtain";
      c.style.background = (theme === "dark" || (theme === "auto" && toProject)) ? "#0a0908" : "#ffffff";
      document.body.appendChild(c);
      requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add("on")));
      setTimeout(() => (location.href = a.href), reduce ? 0 : 750);
    }
  });
  addEventListener("pageshow", () => document.body.classList.remove("page-out"));

  /* ---------- reveals ---------- */
  const io = new IntersectionObserver((es) => es.forEach((en) => {
    if (!en.isIntersecting) return;
    const t = en.target;
    t.classList.contains("mask") ? t.querySelector(".slide-text").classList.add("is-visible") : t.classList.add("is-visible");
    io.unobserve(t);
  }), { threshold: 0.12 });
  // text sits translated inside an overflow:hidden mask, so observe the mask itself
  const startReveals = () => document.querySelectorAll(".mask, [data-reveal]").forEach((el) => io.observe(el));

  /* ---------- intro ---------- */
  const intro = $("#intro");
  const seen = (() => { try { return sessionStorage.getItem("seen"); } catch { return null; } })();

  async function runIntro() {
    document.body.classList.add("page-in", "locked");
    lenis && lenis.stop();
    const boot = $(".boot");
    boot.innerHTML = `
      <div>$ init portfolio --user "${esc(S.name.toLowerCase())}"</div>
      <div><span class="ok">[ ok ]</span> loading ${P.length} projects</div>
      <div><span class="ok">[ ok ]</span> warming up models</div>
      <div><span class="ok">[ ok ]</span> compiling interface</div>
      <div class="bar"><i></i></div>`;
    const rows = [...boot.querySelectorAll("div:not(.bar)")];
    await wait(300);
    $(".bar", boot).classList.add("run");
    for (const r of rows) { r.classList.add("on"); await wait(450); }
    await wait(500);
    intro.classList.add("done");
    await wait(650);
    document.body.classList.remove("locked");
    lenis && lenis.start();
    startReveals();
    try { sessionStorage.setItem("seen", "1"); } catch {}
    setTimeout(() => intro.remove(), 1400);
  }

  if (intro && !seen) {
    runIntro();
  } else {
    intro && intro.remove();
    requestAnimationFrame(() => {
      document.body.classList.add("page-in");
      setTimeout(startReveals, 150);
    });
  }
})();
