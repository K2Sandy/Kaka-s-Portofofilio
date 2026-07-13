/**
 * MAIN.JS — shared interactivity across every page.
 * Sections: navbar, mobile menu, scroll progress, reveal-on-scroll,
 * stat counters, project grid rendering, project prev/next nav,
 * contact copy-to-clipboard, back-to-top.
 */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasProjects = typeof PROJECTS !== "undefined";
  const hasI18n = typeof I18N !== "undefined";

  /* ---------------- i18n engine ---------------- */
  let currentLang = "en";

  function getNested(obj, path) {
    return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
  }

  function t(path) {
    if (!hasI18n) return "";
    const val = getNested(I18N[currentLang], path);
    if (val !== undefined) return val;
    return getNested(I18N.en, path) || "";
  }

  function applyStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = t(el.getAttribute("data-i18n"));
      if (val) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const val = t(el.getAttribute("data-i18n-html"));
      if (val) el.innerHTML = val;
    });
  }

  function updateLangUI() {
    document.querySelectorAll(".lang-option").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === currentLang);
    });
    document.querySelectorAll(".lang-current-label").forEach((el) => {
      el.textContent = currentLang.toUpperCase();
    });
  }

  function setLanguage(lang) {
    if (!hasI18n) return;
    currentLang = I18N[lang] ? lang : "en";
    document.documentElement.setAttribute("lang", currentLang);
    try {
      localStorage.setItem("kaka-lang", currentLang);
    } catch (e) {
      /* localStorage unavailable (private mode etc.) — language just won't persist */
    }
    applyStaticTranslations();
    if (hasProjects) renderProjectGrid();
    updateLangUI();
  }

  function initLangSwitcher() {
    let saved = "en";
    try {
      saved = localStorage.getItem("kaka-lang") || "en";
    } catch (e) {
      /* ignore */
    }
    setLanguage(saved);

    document.querySelectorAll(".lang-switcher").forEach((wrap) => {
      const trigger = wrap.querySelector(".lang-trigger");
      if (!trigger) return;
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = wrap.classList.contains("is-open");
        document.querySelectorAll(".lang-switcher.is-open").forEach((w) => {
          w.classList.remove("is-open");
          const t2 = w.querySelector(".lang-trigger");
          if (t2) t2.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          wrap.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
      wrap.querySelectorAll(".lang-option").forEach((opt) => {
        opt.addEventListener("click", (e) => {
          e.stopPropagation();
          setLanguage(opt.getAttribute("data-lang"));
          wrap.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
        });
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".lang-switcher.is-open").forEach((w) => {
        w.classList.remove("is-open");
        const trig = w.querySelector(".lang-trigger");
        if (trig) trig.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".lang-switcher.is-open").forEach((w) => w.classList.remove("is-open"));
      }
    });
  }

  /* ---------------- Navbar scroll state + progress bar ---------------- */
  const navbar = document.querySelector(".navbar");
  const progressBar = document.getElementById("scrollProgress");

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (navbar) navbar.classList.toggle("is-scrolled", y > 8);

    if (progressBar) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(100, (y / docH) * 100) : 0;
      progressBar.style.width = pct + "%";
    }

    const backToTop = document.getElementById("backToTop");
    if (backToTop) backToTop.classList.toggle("is-visible", y > 480);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById("navToggle");
  if (navToggle && navbar) {
    navToggle.addEventListener("click", () => {
      const open = navbar.classList.toggle("is-menu-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  function closeMobileMenu() {
    if (navbar && navbar.classList.contains("is-menu-open")) {
      navbar.classList.remove("is-menu-open");
      navToggle && navToggle.classList.remove("is-open");
    }
  }

  /* ---------------- Smooth in-page scrolling (offset for sticky nav) --- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 14;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      closeMobileMenu();
      history.pushState(null, "", hash);
    });
  });

  /* ---------------- Active nav link on scroll ---------------- */
  const navLinks = Array.from(document.querySelectorAll(".nav-link[href^='#']"));
  if (navLinks.length && "IntersectionObserver" in window) {
    const sections = navLinks
      .map((l) => document.querySelector(l.getAttribute("href")))
      .filter(Boolean);
    if (sections.length) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const link = navLinks.find((l) => l.getAttribute("href") === "#" + entry.target.id);
            if (!link) return;
            if (entry.isIntersecting) {
              navLinks.forEach((l) => l.classList.remove("is-active"));
              link.classList.add("is-active");
            }
          });
        },
        { rootMargin: "-42% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach((s) => sectionObserver.observe(s));
    }
  }

  /* ---------------- Reveal on scroll ---------------- */
  let revealObserver;
  function getRevealObserver() {
    if (!revealObserver) {
      if (!("IntersectionObserver" in window)) return null;
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
    }
    return revealObserver;
  }
  function observeReveals(root) {
    root = root || document;
    const obs = getRevealObserver();
    const els = root.querySelectorAll(".reveal:not(.is-visible), .reveal-stagger:not(.is-visible)");
    if (!obs) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    els.forEach((el) => obs.observe(el));
  }
  /* Automatically attach reveal classes to common elements for a unified entrance animation */
  function autoAttachReveal() {
    if (reduceMotion) return;
    const selectorList = [
      '.hero-text h1',
      '.hero-text p',
      '.hero-actions',
      '.hero-visual',
      '.hero-badge',
      '.about-text h2',
      '.about-text p',
      '.about-facts .fact',
      '.experience-row',
      '.org-details',
      '.project-card',
      '.project-card-head',
      '.project-card-body',
      '.contact-card',
      '.contact-icon',
      '.org-logo img',
      '.scan-image'
    ];
    const nodes = document.querySelectorAll(selectorList.join(','));
    let i = 0;
    nodes.forEach((el) => {
      if (el.classList.contains('reveal') || el.classList.contains('reveal-stagger')) return;
      const variant = (i % 3 === 0) ? 'from-left' : (i % 3 === 1 ? 'from-right' : 'scale');
      el.classList.add('reveal', variant);
      i++;
    });
  }

  autoAttachReveal();
  observeReveals();

  /* ---------------- Stat counters ---------------- */
  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduceMotion) {
      el.textContent = target;
      return;
    }
    const dur = 1100;
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function initCounters() {
    const statEls = document.querySelectorAll(".stat-num[data-count]");
    if (!statEls.length) return;
    if (!("IntersectionObserver" in window)) {
      statEls.forEach(animateCount);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    statEls.forEach((el) => obs.observe(el));
  }

  function syncStatsWithProjects() {
    if (!hasProjects) return;
    const projCount = document.getElementById("statProjects");
    const awardCount = document.getElementById("statAwards");
    if (projCount) projCount.setAttribute("data-count", PROJECTS.length);
    // if (awardCount) {
    //   const withAward = PROJECTS.filter((p) => p.award).length;
    //   awardCount.setAttribute("data-count", withAward);
    // }
  }

  /* ---------------- Project grid + filters (homepage) ---------------- */
  function renderProjectGrid() {
    const grid = document.getElementById("projectGrid");
    if (!grid || !hasProjects) return;
    const filterWrap = document.getElementById("projectFilters");
    const categories = ["All"].concat(
      Array.from(new Set(PROJECTS.map((p) => p.category)))
    );
    let active = "All";

    function resolveProjectImagePath(imagePath) {
      if (!imagePath) return "";
      if (/^(https?:)?\/\//i.test(imagePath)) return imagePath;
      const isProjectPage = window.location.pathname.includes("/projects/");
      const prefix = isProjectPage ? "../" : "";
      return `${prefix}${imagePath}`;
    }

    function cardHTML(p) {
      const tr = (typeof PROJECT_TRANSLATIONS !== "undefined" && PROJECT_TRANSLATIONS[p.id] && PROJECT_TRANSLATIONS[p.id][currentLang]) || {};
      const summary = tr.summary || p.summary;
      const awardTr = (typeof AWARD_LABEL_TRANSLATIONS !== "undefined" && AWARD_LABEL_TRANSLATIONS[p.award.label]) || {};
      const awardLabel = awardTr[currentLang] || p.award.label;
      const tags = p.tags.map((tag) => `<span class="pill">${tag}</span>`).join("");
      const medalIcon = (AWARD_ICON && AWARD_ICON[p.award.tier]) || "";
      const previewImage = p.image
        ? `<img src="${resolveProjectImagePath(p.image)}" alt="${p.name} preview" loading="lazy" />`
        : `<span class="icon-emoji">${p.emoji}</span>`;
      return `
        <a href="${p.page}" class="project-card reveal">
          <div class="project-card-head">${previewImage}</div>
          <div class="project-card-body">
            <div class="project-card-top">
              <h3>${p.name}</h3>
              <span class="project-card-period">${p.period}</span>
            </div>
            <p class="desc">${summary}</p>
            <div class="project-card-tags">${tags}</div>
            <div class="project-card-foot">
              <span class="medal medal--${p.award.tier}"><span class="medal-icon">${medalIcon}</span>${awardLabel}</span>
              <span class="card-link">${t("projects.viewLink")} <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </div>
          </div>
        </a>`;
    }

    function ghostCardHTML() {
      return `
        <div class="project-card ghost-card reveal">
          <div class="empty-icon">＋</div>
          <h3>${t("projects.moreTitle")}</h3>
          <p>${t("projects.moreText")}</p>
        </div>`;
    }

    function draw() {
      const list = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
      grid.innerHTML = list.map(cardHTML).join("") + ghostCardHTML();
      observeReveals(grid);
    }

    if (filterWrap) {
      const labelFor = (c) => (typeof CATEGORY_LABELS !== "undefined" && CATEGORY_LABELS[currentLang] && CATEGORY_LABELS[currentLang][c]) || c;
      filterWrap.innerHTML = categories
        .map(
          (c, i) =>
            `<button type="button" class="filter-btn${c === active ? " is-active" : ""}" data-filter="${c}">${labelFor(c)}</button>`
        )
        .join("");
      filterWrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        filterWrap.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        active = btn.getAttribute("data-filter");
        draw();
      });
    }
    draw();
  }

  /* ---------------- Project detail: prev / next nav ---------------- */
  function initProjectNav() {
    const currentId = document.body.getAttribute("data-project-id");
    if (!currentId || !hasProjects) return;
    const idx = PROJECTS.findIndex((p) => p.id === currentId);
    if (idx === -1) return;
    const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(idx + 1) % PROJECTS.length];

    const prevEl = document.getElementById("prevProjectLink");
    const nextEl = document.getElementById("nextProjectLink");
    if (prevEl) {
      prevEl.href = prev.page.split("/").pop();
      const strongEl = prevEl.querySelector("strong");
      if (strongEl) strongEl.textContent = prev.name;
    }
    if (nextEl) {
      nextEl.href = next.page.split("/").pop();
      const strongEl = nextEl.querySelector("strong");
      if (strongEl) strongEl.textContent = next.name;
    }
  }

  /* ---------------- Contact: copy to clipboard ---------------- */
  function showToast(msg) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = msg;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }
  document.querySelectorAll(".copy-chip").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const value = btn.getAttribute("data-copy");
      if (navigator.clipboard && value) {
        navigator.clipboard
          .writeText(value)
          .then(() => showToast("Copied to clipboard ✓"))
          .catch(() => showToast("Couldn't copy — try selecting it manually"));
      }
    });
  });

  /* ---------------- Gallery lightbox ---------------- */
  function initGalleryLightbox() {
    const triggerButtons = document.querySelectorAll('.gallery-media[data-lightbox-src]');
    if (!triggerButtons.length) return;

    let lightbox = document.getElementById("galleryLightbox");
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.id = "galleryLightbox";
      lightbox.className = "lightbox";
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.setAttribute("aria-label", "Image preview");
      lightbox.innerHTML = `
        <div class="lightbox-frame">
          <button type="button" class="lightbox-close" aria-label="Close preview">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <img src="" alt="" />
        </div>`;
      document.body.appendChild(lightbox);
    }

    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".lightbox-close");

    function openLightbox(src, alt) {
      lightboxImage.src = src;
      lightboxImage.alt = alt || "";
      lightbox.classList.add("is-open");
      document.body.classList.add("modal-open");
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("modal-open");
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
    }

    triggerButtons.forEach((button) => {
      button.addEventListener("click", () => {
        openLightbox(button.getAttribute("data-lightbox-src"), button.getAttribute("data-lightbox-alt"));
      });
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox || event.target.closest(".lightbox-close")) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }

  /* ---------------- Back to top ---------------- */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------- Trigger initial reveals for above-the-fold content on page load ---- */
  function triggerInitialReveals() {
    if (reduceMotion) return;
    // Trigger animations for hero/initial content that's already visible
    const heroReveals = document.querySelectorAll(".project-hero .reveal, .hero-text > *, .hero-visual");
    const threshold = window.innerHeight * 1.1;
    heroReveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < threshold && rect.bottom > 0) {
        el.classList.add("is-visible");
      }
    });
  }

  /* ---------------- Hero parallax (subtle, desktop only) ---------------- */
  function initHeroParallax() {
    if (reduceMotion) return;
    const visual = document.querySelector(".hero-visual");
    const frame = document.querySelector(".hero-visual .profile-frame");
    if (!visual || !frame || window.matchMedia("(max-width: 760px)").matches) return;
    visual.addEventListener("mousemove", (e) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      frame.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
    });
    visual.addEventListener("mouseleave", () => {
      frame.style.transform = "";
    });
  }

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Init ---------------- */
  syncStatsWithProjects();
  initCounters();
  initLangSwitcher();
  initProjectNav();
  initGalleryLightbox();
  triggerInitialReveals();
  initHeroParallax();
})();
