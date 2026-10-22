/**
 * ENHANCE.JS — motion picked from the "letter" redesign (Oct 2026).
 * Runs after main.js. Needs GSAP + ScrollTrigger (assets/vendor/).
 * Visitors with "reduce motion" on get none of the scroll animation:
 * everything is simply shown. Remove this file (and enhance.css) to undo.
 *
 *   Home:     About text inks in word by word · project cards stack ·
 *             Get in Touch cards flip up + spotlight hover · CV banner wipe ·
 *             footer "Kaka." letters rise · About arch rises in
 *   Projects: title rises word by word · cover frame unmasks · content
 *             fades up in order · previous / next filled from PROJECTS
 */
(function () {
  "use strict";

  var d = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var G = !!(window.gsap && window.ScrollTrigger) && !reduce;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var isProject = !!document.body.getAttribute("data-project-id");
  var lite = false; /* set by the performance guard at the bottom */

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  if (G) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "expo.out", duration: 1 });
  }

  /* hand an element over from main.js's CSS reveal to GSAP */
  function takeOver(el) {
    el.classList.remove("reveal", "reveal-stagger", "from-left", "from-right", "scale");
    el.classList.add("fx-r");
  }

  /* ----------------------------------------------------------------
     HOME · About lead: words ink in from faint to full as you read
     ---------------------------------------------------------------- */
  var lead = $(".about-text p.lead");
  if (lead && G) {
    takeOver(lead);
    var CJK = /[㐀-鿿豈-﫿]/;
    var inkTween = null;

    var inkSplit = function () {
      var text = lead.textContent;
      lead.textContent = "";
      var tokens = text.match(/\s+|[^\s]+/g) || [];
      tokens.forEach(function (tok) {
        if (/^\s+$/.test(tok)) { lead.appendChild(document.createTextNode(tok)); return; }
        var pieces = CJK.test(tok)
          ? (tok.match(/[「『（《“‘]*[㐀-鿿豈-﫿][，。、！？：；）》」』”’…·]*|[^㐀-鿿豈-﫿]+/g) || [tok])
          : [tok];
        pieces.forEach(function (p) {
          var w = document.createElement("span");
          w.className = "ink-w";
          w.textContent = p;
          lead.appendChild(w);
        });
      });
      if (inkTween) { if (inkTween.scrollTrigger) inkTween.scrollTrigger.kill(); inkTween.kill(); }
      if (lite) return;
      inkTween = gsap.fromTo($$(".ink-w", lead), { opacity: 0.16 }, {
        opacity: 1, ease: "none", stagger: 0.1,
        scrollTrigger: { trigger: lead, start: "top 82%", end: "bottom 48%", scrub: true }
      });
    };
    inkSplit();
    /* main.js swaps the text on language change: split the new text again.
       The observer is paused while we split, so our own changes don't re-trigger it. */
    var inkObserver = new MutationObserver(function () {
      inkObserver.disconnect();
      inkSplit();
      inkObserver.takeRecords();
      inkObserver.observe(lead, { childList: true });
      ScrollTrigger.refresh();
    });
    inkObserver.observe(lead, { childList: true });
  }

  /* About arch rises in */
  var arch = $(".about-visual .arch");
  if (arch && G) {
    var archImg = $(".arch-img", arch);
    gsap.set(arch, { autoAlpha: 0, y: 40, scale: 0.94 });
    if (archImg) gsap.set(archImg, { yPercent: 14, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: arch, start: "top 85%", once: true,
      onEnter: function () {
        var tl = gsap.timeline();
        tl.to(arch, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2 });
        if (archImg) tl.to(archImg, { yPercent: 0, autoAlpha: 1, duration: 1.2 }, 0.25);
      }
    });
  }

  /* ----------------------------------------------------------------
     HOME · Projects: cards stack, the ones underneath step back
     (main.js re-renders cards on filter + language; it fires "projects:drawn")
     ---------------------------------------------------------------- */
  var grid = $("#projectGrid");
  var stackCtx = null;
  /* Cards per scroll step on desktop (left + right). Set to 1 for the old one-card-per-step stack. */
  var PER_ROW = 2;
  function setupStack() {
    if (!grid) return;
    var items = $$(".stack-item", grid);
    var stackOn = window.matchMedia("(min-width: 900px) and (min-height: 700px)").matches;
    var perRow = stackOn ? PER_ROW : 1;
    grid.classList.toggle("pstack--2up", perRow === 2);
    /* project cards are paired up; the "more on the way" ghost card is NOT part of a pair:
       it stays one big full-width card that closes the list. A lone last project is centred. */
    var projItems = items.filter(function (li) { return !li.classList.contains("stack-item--ghost"); });
    items.forEach(function (li) {
      var pi = projItems.indexOf(li);
      if (pi < 0) return;
      li.style.setProperty("--i", Math.floor(pi / perRow));
      li.classList.toggle("is-solo", perRow === 2 && pi === projItems.length - 1 && projItems.length % perRow === 1);
    });

    /* The "Projects" headline (title, subtitle, filters) stays pinned above the stack,
       and the first card locks just underneath it. */
    var projSec = $("#projects");
    var head = projSec && $(".section-head", projSec);
    var filters = $("#projectFilters");
    var pin = projSec && $(".projects-pin", projSec);
    if (!pin && head && filters && head.nextElementSibling === filters) {
      pin = document.createElement("div");
      pin.className = "projects-pin";
      head.parentNode.insertBefore(pin, head);
      pin.appendChild(head);
      pin.appendChild(filters);
    }
    grid.style.removeProperty("--stack-top");
    if (pin) pin.classList.remove("is-compact");
    if (stackOn && pin) {
      var navH0 = parseFloat(getComputedStyle(d).getPropertyValue("--nav-h")) || 76;
      var tallest = 0;
      items.forEach(function (li) { var c = $(".pcard", li); if (c && !li.classList.contains("stack-item--ghost")) tallest = Math.max(tallest, c.offsetHeight); });
      var lockFor = function () { return navH0 + 6 + pin.offsetHeight + 14; };
      /* not enough height for headline + a whole card? drop the subtitle line */
      if (tallest && lockFor() + tallest + 24 > window.innerHeight) pin.classList.add("is-compact");
      grid.style.setProperty("--stack-top", Math.round(lockFor()) + "px");
    }

    if (!G) return;
    if (stackCtx) stackCtx.revert();
    if (lite) return;
    stackCtx = gsap.context(function () {
      if (!stackOn) return;
      var navH = parseFloat(getComputedStyle(d).getPropertyValue("--nav-h")) || 76;
      items.forEach(function (li) {
        var i = projItems.indexOf(li);
        if (i < 0) return;
        /* the card sinks back when the first card of the NEXT row arrives
           (for the last row of projects that is the ghost card) */
        var nextIdx = Math.min((Math.floor(i / perRow) + 1) * perRow, projItems.length);
        var next = nextIdx < projItems.length ? projItems[nextIdx] : items[items.length - 1];
        if (!next || next === li) return;
        var card = $(".pcard", li);
        var shade = $(".pcard-shade", card);
        if (!shade) { shade = document.createElement("span"); shade.className = "pcard-shade"; shade.setAttribute("aria-hidden", "true"); card.appendChild(shade); }
        var sink = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: next, start: "top bottom", end: function () { return "top " + ((parseFloat(getComputedStyle(li).top) || navH + 20) + 20) + "px"; }, scrub: true, invalidateOnRefresh: true }
        });
        sink.to(card, { scale: 0.93 }, 0).to(shade, { opacity: 0.14 }, 0);
      });
    });
    ScrollTrigger.refresh();
  }
  if (grid) {
    window.addEventListener("projects:drawn", setupStack);
    setupStack();
    var rT;
    window.addEventListener("resize", function () { clearTimeout(rT); rT = setTimeout(setupStack, 200); });
  }

  /* ----------------------------------------------------------------
     HOME · Get in Touch (layout unchanged)
     ---------------------------------------------------------------- */
  var cards = $$(".contact-card");
  var icons = $$(".contact-card .contact-icon");
  var cv = $(".cv-cta");
  if (cards.length) {
    cards.forEach(takeOver);
    icons.forEach(function (el) { el.classList.remove("reveal", "from-left", "from-right", "scale"); });
    if (G) {
      /* cards flip up like envelope flaps, then the icons pop */
      gsap.set(cards, { autoAlpha: 0, y: 70, rotateX: -32, transformPerspective: 900, transformOrigin: "50% 0%" });
      gsap.set(icons, { scale: 0, rotate: -30 });
      ScrollTrigger.create({
        trigger: $(".contact-grid") || cards[0], start: "top 85%", once: true,
        onEnter: function () {
          gsap.timeline()
            .to(cards, { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.1, stagger: 0.1, clearProps: "transform,opacity,visibility" })
            .to(icons, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(2.2)", stagger: 0.1, clearProps: "transform" }, 0.3);
        }
      });
    }
    /* soft green spotlight follows the pointer on each card */
    if (finePointer) {
      cards.forEach(function (c) {
        c.addEventListener("pointermove", function (e) {
          var r = c.getBoundingClientRect();
          c.style.setProperty("--mx", (e.clientX - r.left) + "px");
          c.style.setProperty("--my", (e.clientY - r.top) + "px");
        });
      });
    }
  }
  if (cv) {
    takeOver(cv);
    if (G) {
      var kids = Array.prototype.slice.call(cv.children);
      gsap.set(cv, { clipPath: "inset(0% 100% 0% 0% round 32px)" });
      gsap.set(kids, { autoAlpha: 0, x: -24 });
      ScrollTrigger.create({
        trigger: cv, start: "top 90%", once: true,
        onEnter: function () {
          gsap.timeline()
            .to(cv, { clipPath: "inset(0% 0% 0% 0% round 32px)", duration: 1.2, ease: "expo.inOut", clearProps: "clipPath" })
            .to(kids, { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.12, clearProps: "all" }, "-=0.5");
        }
      });
    }
  }

  /* ----------------------------------------------------------------
     ALL PAGES · footer "Kaka." letters rise
     ---------------------------------------------------------------- */
  var letters = $$(".footer-mark .fm-l");
  if (letters.length && G) {
    gsap.set(letters, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: ".footer-mark", start: "top 96%", once: true,
      onEnter: function () { gsap.to(letters, { yPercent: 0, duration: 1.3, stagger: 0.07 }); }
    });
  }

  /* ----------------------------------------------------------------
     PROJECT PAGES
     ---------------------------------------------------------------- */
  if (isProject) {
    /* previous / next: names + thumbnails from PROJECTS (main.js sets the links) */
    if (typeof PROJECTS !== "undefined") {
      var pid = document.body.getAttribute("data-project-id");
      var idx = -1;
      PROJECTS.forEach(function (p, i) { if (p.id === pid) idx = i; });
      if (idx > -1) {
        var fill = function (el, p) {
          if (!el || !p) return;
          var a = $(".brand-a", el), b = $(".brand-b", el), img = $("[data-pnav-thumb]", el);
          if (a) a.textContent = p.brandA;
          if (b) b.textContent = p.brandB;
          if (img && p.image) img.src = "../" + p.image;
        };
        fill($("#prevProjectLink"), PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]);
        fill($("#nextProjectLink"), PROJECTS[(idx + 1) % PROJECTS.length]);
      }
    }

    var main = $("main");
    $$(".reveal, .reveal-stagger", main).forEach(takeOver);

    if (G) {
      /* hero: title words rise, details follow, cover frame unmasks */
      var brand = $(".project-brand");
      var words = [];
      if (brand) {
        $$(".brand-a, .brand-b", brand).forEach(function (sp) {
          var w = document.createElement("span");
          w.className = "wi";
          w.textContent = sp.textContent;
          sp.textContent = "";
          sp.appendChild(w);
          words.push(w);
        });
      }
      var hero = $(".project-hero");
      var bits = hero ? $$(".back-link, .project-meta-row, .project-tagline, .project-tags, .project-hero-actions", hero) : [];
      var frame = $(".p-hero-frame");
      var frameImg = frame && $(".p-hero-img", frame);
      gsap.set(words, { yPercent: 115 });
      gsap.set(bits, { autoAlpha: 0, y: 22 });
      if (frame) gsap.set(frame, { clipPath: "inset(100% 0% 0% 0% round 28px)" });
      if (frameImg) gsap.set(frameImg, { scale: 1.3 });

      var tl = gsap.timeline({ delay: 0.1 });
      tl.to(words, { yPercent: 0, duration: 1.2, stagger: 0.08 }, 0)
        .to(bits, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07, clearProps: "transform" }, 0.15);
      if (frame) tl.to(frame, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.3, ease: "expo.inOut", clearProps: "clipPath" }, 0);
      if (frameImg) tl.to(frameImg, { scale: 1, duration: 1.6, clearProps: "scale" }, 0);

      /* cover drifts slightly as you scroll past */
      var visual = $(".project-hero-visual");
      if (visual) {
        gsap.fromTo(visual, { y: -10 }, { y: 30, ease: "none", scrollTrigger: { trigger: visual, start: "top 60%", end: "bottom top", scrub: true } });
      }

      /* everything below fades up in reading order */
      var rest = $$(".overview-text > *, .overview-side > *, .project-gallery .section-title, .project-gallery .section-sub, .gallery-item, .pnav-link, .pnav-all", main)
        .filter(function (el) { return !(hero && hero.contains(el)); });
      rest.forEach(function (el) { el.classList.add("fx-r"); });
      gsap.set(rest, { autoAlpha: 0, y: 28 });
      ScrollTrigger.batch(rest, {
        start: "top 92%", once: true,
        onEnter: function (batch) { gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, overwrite: true }); }
      });
    }
  }


  /* ----------------------------------------------------------------
     PERFORMANCE GUARD
     Watches how smoothly the page scrolls. If it stutters (slow laptop,
     no graphics acceleration, battery saver), the scroll-scrubbed effects
     (card shrink, word-by-word fade) switch off and the page shows its
     normal final state. Fast devices never notice. Test it with ?lite
     in the address (force on) or ?full (force off).
     ---------------------------------------------------------------- */
  if (G) (function () {
    var q = location.search;
    function go() {
      if (lite) return;
      lite = true;
      d.classList.add("lite");
      ScrollTrigger.getAll().forEach(function (t) { if (t.vars && t.vars.scrub) t.kill(true); });
      try { sessionStorage.setItem("kaka-lite", "1"); } catch (e) {}
    }
    if (/[?&]full\b/.test(q)) { try { sessionStorage.removeItem("kaka-lite"); } catch (e) {} return; }
    var remembered = false;
    try { remembered = sessionStorage.getItem("kaka-lite") === "1"; } catch (e) {}
    if (/[?&]lite\b/.test(q) || remembered) { go(); return; }

    var ready = false, lastT = 0, lastScroll = 0, n = 0, slow = 0, badWindows = 0;
    setTimeout(function () { ready = true; }, 2500); /* ignore load-time work */
    window.addEventListener("scroll", function () { lastScroll = performance.now(); }, { passive: true });
    function tick(t) {
      var dt = t - lastT; lastT = t;
      if (ready && !document.hidden && t - lastScroll < 120 && dt > 0 && dt < 250) {
        n++; if (dt > 34) slow++;
        if (n >= 30) { /* about a second of actual scrolling */
          badWindows = slow / n > 0.3 ? badWindows + 1 : 0;
          n = 0; slow = 0;
          if (badWindows >= 2) { go(); return; }
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* measurements change once images, fonts and the preloader settle */
  if (G) {
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
    window.addEventListener("preloader:done", function () { ScrollTrigger.refresh(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
})();
