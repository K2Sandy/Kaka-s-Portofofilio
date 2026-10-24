/* ------------------------------------------------------------------
   HOME · Projects as a horizontal rail with a genre list on the right.
   main.js calls ProjectRail.render(root, { lang, t }) on first paint and
   on every language change. Genres come from PROJECTS[].genres
   (projects-data.js); a genre with no projects is not shown.
   Plain overflow-x + scroll-snap: no scroll-jacking, no GSAP.
   To go back to the old stacked cards, see the comment in index.html.
   ------------------------------------------------------------------ */
(function () {
  var GENRE_ORDER = ["ai", "mobile", "web", "iot", "game"];
  var LABELS = {
    en: { all: "All", genre: "Genre", ai: "AI & ML", mobile: "Mobile", web: "Web", iot: "IoT", game: "Game", prev: "Previous projects", next: "Next projects" },
    id: { all: "Semua", genre: "Genre", ai: "AI & ML", mobile: "Mobile", web: "Web", iot: "IoT", game: "Game", prev: "Proyek sebelumnya", next: "Proyek berikutnya" },
    zh: { all: "全部", genre: "类型", ai: "AI 与机器学习", mobile: "移动端", web: "网页", iot: "物联网", game: "游戏", prev: "上一个项目", next: "下一个项目" },
    tl: { all: "Lahat", genre: "Genre", ai: "AI at ML", mobile: "Mobile", web: "Web", iot: "IoT", game: "Laro", prev: "Nakaraang proyekto", next: "Susunod na proyekto" }
  };
  var ARROW = '<svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CHEV_L = '<svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CHEV_R = '<svg viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var GAP = 20;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var active = "all";     /* remembered across language re-renders */
  var cur = null;         /* the rail currently on screen */

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  function render(root, ctx) {
    if (!root || typeof PROJECTS === "undefined") return;
    var lang = ctx && ctx.lang ? ctx.lang : "en";
    var t = ctx && ctx.t ? ctx.t : function () { return ""; };
    var L = LABELS[lang] || LABELS.en;

    function inGenre(p, id) { return id === "all" || (p.genres || []).indexOf(id) >= 0; }
    function listFor(id) { return PROJECTS.filter(function (p) { return inGenre(p, id); }); }

    var genres = ["all"].concat(GENRE_ORDER.filter(function (g) { return listFor(g).length > 0; }));
    if (genres.indexOf(active) < 0) active = "all";

    function cardHTML(p) {
      var tr = (typeof PROJECT_TRANSLATIONS !== "undefined" && PROJECT_TRANSLATIONS[p.id] && PROJECT_TRANSLATIONS[p.id][lang]) || {};
      var tagline = tr.tagline || p.tagline;
      var awardTr = (typeof AWARD_LABEL_TRANSLATIONS !== "undefined" && AWARD_LABEL_TRANSLATIONS[p.award.label]) || {};
      var awardLabel = awardTr[lang] || p.award.label;
      var catLabel = (typeof CATEGORY_LABELS !== "undefined" && CATEGORY_LABELS[lang] && CATEGORY_LABELS[lang][p.category]) || p.category;
      var num = String(PROJECTS.indexOf(p) + 1).padStart(2, "0");
      var icon = (typeof AWARD_ICON !== "undefined" && AWARD_ICON[p.award.tier]) || "";
      return '<a class="rcard" href="' + esc(p.page) + '">' +
        '<div class="rcard-media">' + (p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" draggable="false">' : '<span class="icon-emoji">' + (p.emoji || "") + '</span>') + '</div>' +
        '<div class="rcard-body">' +
          '<div class="rcard-top"><span class="rcard-num" aria-hidden="true">' + num + '</span><span>' + esc(catLabel) + '</span><span class="rcard-period">' + esc(p.period) + '</span></div>' +
          '<h3 class="rcard-name"><span class="brand-a">' + esc(p.brandA) + '</span><span class="brand-b">' + esc(p.brandB) + '</span></h3>' +
          '<p class="rcard-tagline">' + esc(tagline) + '</p>' +
          '<div class="rcard-foot"><span class="medal medal--' + esc(p.award.tier) + '"><span class="medal-icon">' + icon + '</span>' + esc(awardLabel) + '</span>' +
          '<span class="rcard-cta">' + esc(t("projects.viewLink")) + ' ' + ARROW + '</span></div>' +
        '</div></a>';
    }
    function ghostHTML() {
      return '<div class="rcard rcard--ghost"><span class="ghost-plus" aria-hidden="true">＋</span><h3>' + esc(t("projects.moreTitle")) + '</h3><p>' + esc(t("projects.moreText")) + '</p></div>';
    }

    root.innerHTML =
      '<div class="prail-wrap">' +
        '<div class="prail-main">' +
          '<div class="prail-box">' +
            '<div class="prail" tabindex="0" role="region" aria-label="' + esc(t("nav.projects")) + '"></div>' +
            '<button type="button" class="prail-edge prail-edge--prev is-hidden" data-dir="-1" aria-label="' + esc(L.prev) + '">' + CHEV_L + '</button>' +
            '<button type="button" class="prail-edge prail-edge--next" data-dir="1" aria-label="' + esc(L.next) + '">' + CHEV_R + '</button>' +
          '</div>' +
          '<div class="prail-ctrl" aria-hidden="true"><div class="prail-progress"><span></span></div><span class="prail-count"></span></div>' +
        '</div>' +
        '<aside class="pgenre"><p class="pgenre-label">' + esc(L.genre) + '</p><ul class="pgenre-list">' +
          genres.map(function (g) {
            return '<li><button type="button" class="pgenre-btn' + (g === active ? " is-active" : "") + '" data-g="' + g + '" aria-pressed="' + (g === active) + '"><span>' + esc(L[g]) + '</span></button></li>';
          }).join("") +
        '</ul></aside>' +
      '</div>';

    var rail = root.querySelector(".prail");
    var bar = root.querySelector(".prail-progress span");
    var count = root.querySelector(".prail-count");
    var prev = root.querySelector(".prail-edge--prev");
    var next = root.querySelector(".prail-edge--next");
    var state = { rail: rail, moved: false, down: false, sx: 0, sl: 0 };
    cur = state;

    function step() {
      var c = rail.querySelector(".rcard");
      return c ? c.getBoundingClientRect().width + GAP : 300;
    }
    function update() {
      var max = rail.scrollWidth - rail.clientWidth;
      var n = rail.querySelectorAll(".rcard:not(.rcard--ghost)").length;
      var first = Math.max(1, Math.min(n, Math.round(rail.scrollLeft / step()) + 1));
      var vis = rail.clientWidth / rail.scrollWidth;
      var w = Math.max(vis * 100, 12);
      bar.style.width = w + "%";
      bar.style.transform = "translateX(" + (max > 0 ? (rail.scrollLeft / max) * ((100 / w) - 1) * 100 : 0) + "%)";
      count.textContent = String(first).padStart(2, "0") + " / " + String(n).padStart(2, "0");
      var atStart = rail.scrollLeft <= 2, atEnd = rail.scrollLeft >= max - 2;
      prev.classList.toggle("is-hidden", atStart);
      next.classList.toggle("is-hidden", atEnd);
      rail.classList.toggle("at-start", atStart);
      rail.classList.toggle("at-end", atEnd);
    }
    state.update = update;
    state.step = step;

    function fill() {
      rail.innerHTML = listFor(active).map(cardHTML).join("") + ghostHTML();
      rail.scrollLeft = 0;
      update();
    }

    rail.addEventListener("scroll", function () { requestAnimationFrame(update); }, { passive: true });
    [prev, next].forEach(function (b) {
      b.addEventListener("click", function () {
        rail.scrollBy({ left: step() * Number(b.getAttribute("data-dir")), behavior: reduceMotion ? "auto" : "smooth" });
      });
    });

    root.querySelectorAll(".pgenre-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var g = b.getAttribute("data-g");
        if (g === active) return;
        active = g;
        root.querySelectorAll(".pgenre-btn").forEach(function (x) {
          var on = x === b;
          x.classList.toggle("is-active", on);
          x.setAttribute("aria-pressed", on);
        });
        if (reduceMotion) { fill(); return; }
        rail.classList.add("is-swapping");
        setTimeout(function () { fill(); rail.classList.remove("is-swapping"); }, 200);
      });
    });

    /* mouse drag (touch + trackpad already scroll natively) */
    rail.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      state.down = true; state.moved = false; state.sx = e.clientX; state.sl = rail.scrollLeft;
    });
    rail.addEventListener("click", function (e) {
      if (state.moved) { e.preventDefault(); e.stopPropagation(); state.moved = false; }
    }, true);

    fill();
  }

  /* one set of window listeners for whatever rail is current */
  window.addEventListener("pointermove", function (e) {
    var s = cur;
    if (!s || !s.down) return;
    var dx = e.clientX - s.sx;
    if (!s.moved && Math.abs(dx) > 5) { s.moved = true; s.rail.classList.add("is-dragging"); }
    if (s.moved) s.rail.scrollLeft = s.sl - dx;
  });
  window.addEventListener("pointerup", function () {
    var s = cur;
    if (!s || !s.down) return;
    s.down = false;
    if (s.moved) {
      s.rail.classList.remove("is-dragging");
      var i = Math.round(s.rail.scrollLeft / s.step());
      s.rail.scrollTo({ left: i * s.step(), behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
  window.addEventListener("resize", function () { if (cur) cur.update(); });

  window.ProjectRail = { render: render };
})();
