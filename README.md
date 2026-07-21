# XQG Group Website

A static, multi-page website for XQG Group, covering:

- **Financial Technology Solutions** (`services.html`) — trading technology, the
  RMS Excel product, and custom market solutions.
- **Freelance Projects & Services** (`freelancing.html`) — financial analysis,
  custom trading strategies, data solutions, and RMS/price feed engineering.
- Supporting pages: `index.html` (home), `about.html`, `contact.html`.

No build step or framework — plain HTML/CSS/JS, so it can be hosted anywhere
(GitHub Pages, Netlify, Vercel, S3, etc.) by pointing at this folder.

## Structure

```
index.html              Home page
services.html            Financial Technology Solutions (incl. RMS Excel)
freelancing.html          Freelance Projects & Services
about.html                Mission, values, team
contact.html              Contact form + details
css/style.css             All styles (design tokens at the top)
js/main.js                Nav toggle, scroll reveal, active link, demo form, cursor fx
assets/logo.png           Wordmark lockup, used in nav + footer
assets/icon-*.png         Square app-icon mark, used for favicons
assets/cursor-arrow-*.png Trimmed arrow/candlestick graphic, used for the cursor trail
assets/xqg-icon.gif       Standalone animated (pulsing glow) version of the icon
assets/source/            Original uploaded logo/icon/arrow artwork, unprocessed
```

## What to customize before launch

This site ships with realistic but placeholder content. Replace the following:

1. **Contact details** (`contact.html`, footer on every page)
   - Email currently set to `lalitxqg@gmail.com` — update if you want a
     dedicated business inbox instead.
   - Location text ("Remote — working with clients wherever they are") —
     replace with a real address/region if you have one.
   - Social links (LinkedIn, X) currently point to `#` — add real profile URLs.

2. **Contact form backend** (`contact.html`)
   - The form currently only shows a "message received" confirmation in the
     browser (see `#contact-form` handler in `js/main.js`) — it does **not**
     send anywhere yet.
   - Wire it up to a real backend: a service like Formspree/Getform, a
     serverless function, or your own API endpoint.

3. **Team section** (`about.html`)
   - Role cards (Founder & Lead, Head of Trading Technology, etc.) are
     placeholders — swap in real names, titles, and short bios, and consider
     adding real photos in place of the icon avatars.

4. **Legal/compliance review**
   - A generic risk disclosure is included in every page footer. Have this
     reviewed against your actual regulatory status and jurisdiction — the
     placeholder text explicitly states XQG Group is not a licensed
     broker-dealer or investment adviser; update it if that changes.

5. **Branding**
   - The nav/footer logo and favicons are generated from your real uploaded
     artwork (`assets/source/LOGO.png`, `ICON.png`, `Curser.png`), auto-trimmed
     and made transparent. If you get updated brand art later, re-run the same
     trim/crop process (or ask for it) rather than hand-editing the generated
     PNGs.
   - A small blue arrow/candlestick icon follows the mouse across the site
     (`.cursor-fx` in `css/style.css` + `initCursorFX()` in `js/main.js`) —
     it's automatically disabled on touch devices and for users with
     `prefers-reduced-motion` set. Remove the `initCursorFX()` call in
     `js/main.js` to turn it off entirely.
   - Colors and fonts are defined as CSS variables at the top of
     `css/style.css` (`:root { ... }`) if you want to adjust the palette —
     brand blue is `--accent`; green/red (`--success` / `--danger`) are
     reserved for market up/down indicators only, not general UI.

6. **RMS Excel screenshots**
   - The "live data" panels on the home and services pages are illustrative
     mockups (styled HTML, not real screenshots). Replace with actual product
     screenshots once available.

## Local preview

Any static file server works, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying

- **GitHub Pages**: enable Pages on this repo pointing at the root of the
  default branch.
- **Netlify/Vercel**: import the repo, no build command needed, publish
  directory = repo root.
