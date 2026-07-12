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
# then open http://localhost:8000 in your browser
```

## 2. Folder structure

```
portfolio/
├─ index.html                 ← homepage (hero, about, experience, projects, contact)
├─ projects/
│  ├─ glucoscan.html
│  ├─ mindguard.html
│  ├─ windsense.html
│  ├─ escapedisaster.html
│  └─ TEMPLATE.html           ← copy this to add a new project page
└─ assets/
   ├─ css/style.css           ← all styling, colors, fonts, animations
   ├─ js/
   │  ├─ projects-data.js     ← single source of truth for the project grid
   │  └─ main.js              ← nav, animations, filters, counters, etc.
   └─ cv/                     ← put your CV PDF here (see below)
```

## 3. Add your photos

Every photo spot on the site is a clearly-labeled placeholder box (dashed mint
border, camera/person icon, "Add your photo here"). To replace one, find the
`<div class="photo-placeholder ...">…</div>` block and swap it for an `<img>`, e.g.:

```html
<img src="../assets/img/glucoscan/hero.jpg" alt="GlucoScan label scanner screen"
     style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">
```

Create an `assets/img/` folder for your image files (not included yet, since you'll
be adding your own photos).

- **Hero & About photos** are circular — a square, centered-face photo works best.
- **Project hero images** are roughly 4:3 — a clean app mockup or product photo.
- **Gallery items** are portrait (phone-screenshot shaped) by default; project pages
  that use real photos instead (like WindSense) already use a wider landscape shape.

## 4. Add your CV

Drop your CV PDF into `assets/cv/` with this exact name:

```
assets/cv/CV-Muhammad-Albharaka-Putrosandy.pdf
```

Every "Resume" / "Download CV" button already links here — no code changes needed
once the file exists. (Want a different filename? Search-and-replace it across the
HTML files.)

## 5. Add a new project

The grid, filters, and prev/next navigation are all driven by one file, so adding a
project only takes two steps:

1. Copy `projects/TEMPLATE.html` → `projects/your-project-id.html` and fill in the
   bracketed placeholders (name, tagline, dates, role, tech, award, gallery items).
2. Open `assets/js/projects-data.js` and add one object to the `PROJECTS` array
   (there's a commented example at the bottom of the file to copy).

That's it — the homepage card, the category filter buttons, the hero stat counters,
and the "prev/next project" links on every project page all update automatically.

## 6. Update work experience

The Experience section now shows a horizontal "org row" card (logo badge + name +
role + dates), used for both jobs and organizational roles like BEM. To add
another one, open `index.html`, find `<div class="experience-list">`, and add a
new block — there's a commented example already sitting right below it:

```html
<div class="experience-row reveal">
  <div class="org-logo" title="Add organization logo here">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M9 13h1M14 9h1M14 13h1"/></svg>
  </div>
  <div class="org-details">
    <div class="org-top">
      <h4>Org Name <span class="org-div">— Role / Division</span></h4>
      <span class="pill pill-outline">Month Year – Month Year</span>
    </div>
    <p class="org-org">Company / Institution</p>
  </div>
</div>
```

To use a real logo instead of the placeholder icon, swap the `<svg>` inside
`.org-logo` for an `<img>` (same trick as the photo placeholders — see section 3).

## 7. Design reference

Colors, fonts, spacing, and radii all live as CSS custom properties at the top of
`assets/css/style.css` (`:root { ... }`) — change a value there and it updates
everywhere. Key ones:

| Variable | Use |
|---|---|
| `--mint-500`, `--mint-600` | primary accent / buttons |
| `--teal-deep` | headings, links, brand color |
| `--ink` | body text |
| `--gold` / `--silver` / `--bronze` | award medal colors |
| `--font-display` | Fraunces (serif, headings) |
| `--font-body` | Plus Jakarta Sans (everything else) |

## 8. Deploy it

Any static host works, since there's no build step:

- **GitHub Pages:** push this folder to a repo, enable Pages, done.
- **Netlify / Vercel:** drag-and-drop the `portfolio` folder in their dashboard.
- **Your own server:** upload the folder as-is.

Because pages link to each other with relative paths (`../index.html`, etc.), the
whole site works the same locally and once deployed — no config needed.
