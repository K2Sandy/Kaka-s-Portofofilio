# Kaka — Portfolio Website

A multi-page personal portfolio site for Muhammad Albharaka Putrosandy — built with
plain HTML, CSS, and JavaScript (no build step, no frameworks), so it can be opened,
edited, and hosted anywhere.

## 1. Preview it

**Quickest:** double-click `index.html` to open it in your browser.

**Recommended** (so relative links and fonts behave exactly like on a real host):
```bash
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

## 2. Folder structure

```
portfolio/
├─ index.html                 ← homepage
├─ projects/
│  ├─ glucoscan.html / mindguard.html / windsense.html / escapedisaster.html
│  └─ TEMPLATE.html           ← copy this to add a new project page
└─ assets/
   ├─ css/style.css           ← all styling, colors, fonts, animations
   ├─ js/
   │  ├─ projects-data.js     ← single source of truth for the project grid
   │  ├─ i18n.js              ← language dictionaries (EN/ID/ZH)
   │  └─ main.js              ← nav, animations, filters, language switching, etc.
   ├─ img/, paper/, cv/       ← images, competition papers, your CV
```

## 3. Add photos / logos

Every image is referenced with a plain `<img>` tag — swap the `src` for your own
file. Filenames are all lowercase-with-hyphens (no spaces) on purpose — keep new
files the same way to avoid case-sensitivity issues when you deploy to a Linux-based
host (GitHub Pages, Netlify, Vercel are all case-sensitive, unlike Windows/Mac).

## 4. Add a new project

1. Copy `projects/TEMPLATE.html` → `projects/your-project-id.html`, fill in the
   bracketed placeholders.
2. Add one object to the `PROJECTS` array in `assets/js/projects-data.js` (copy an
   existing entry as a guide).

The homepage grid, filters, stat counters, language-switching, and every project
page's prev/next navigation all update automatically from that one array.

## 5. Language switcher (EN / ID / ZH)

The "Language" dropdown in the navbar swaps text instantly — no reload, no network
request — and remembers the visitor's choice via `localStorage` as they move
between pages.

**How it works:** `assets/js/i18n.js` holds one dictionary object per language.
Any element with `data-i18n="some.key"` gets its text replaced from that
dictionary; `data-i18n-html="some.key"` does the same for strings containing real
HTML (e.g. the hero heading, which has a colored `<span>` inside it). If a key is
missing for the selected language, English is shown instead — nothing ever goes
blank.

**Current coverage:**
- **Homepage:** fully translated (nav, hero, about, experience, projects — including
  each project card's tagline/summary and the filter buttons — contact, footer).
- **Project pages:** the shared chrome is translated (nav, buttons, section headers,
  sidebar labels, prev/next navigation, footer). The project-specific writing itself
  (overview paragraphs, tags, gallery captions) is still English-only for now and
  will simply display in English regardless of the selected language until it's
  translated too — nothing breaks, it just falls back gracefully.

**To translate more project-page content:** add a `data-i18n` attribute to the
element in the relevant `projects/*.html` file, then add a matching key + value to
the `id` and `zh` objects in `assets/js/i18n.js` (mirroring the `en` one). Project
card taglines/summaries live in `PROJECT_TRANSLATIONS` at the bottom of that file.

**To add a new language later:**
1. Copy the `en` object inside `I18N` in `assets/js/i18n.js`, translate every value.
2. Add a row to `CATEGORY_LABELS` (and `AWARD_LABEL_TRANSLATIONS` /
   `PROJECT_TRANSLATIONS` if you want project cards fully translated too).
3. Add one button to `#langDropdown` in every HTML page, e.g.:
   `<button type="button" class="lang-option" data-lang="ja" role="menuitem">🇯🇵<span>日本語</span>...</button>`

No other code changes needed.

## 6. Deploy it

Any static host works, since there's no build step — GitHub Pages, Netlify, Vercel
(drag-and-drop the `portfolio` folder), or your own server. Pages link to each other
with relative paths, so the site behaves identically locally and once deployed.
