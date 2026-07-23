# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **dependency-free static website** — a photo slideshow ("Our Adventures Together"). It is plain HTML/CSS/JS with **no package manager, no build step, no backend, and no database**.

- Files: `index.html` (markup + slides), `style.css` (styling/animations), `script.js` (slideshow engine, plain IIFE), and media in `images/`.
- **No dependencies to install** and **nothing to build**. The startup update script is intentionally a no-op.

### Run (development)

Serve the repo root over HTTP (needed so local assets/audio load without `file://` CORS/autoplay issues). Any static server works; e.g. from the repo root:

- `python3 -m http.server 8000` → http://localhost:8000/index.html

`python3` and `node` are pre-installed in the environment.

### Lint / test / build

- **Lint:** none configured.
- **Tests:** none configured (no test framework).
- **Build:** none — serve the files directly.

### Notes / gotchas

- Autoplay auto-starts ~3.5s after load and advances every 6.5s (`DURATION` in `script.js`). Clicking the play button (▶) while it is already auto-playing toggles it **off**, so it can look like autoplay "isn't working" — it is expected behavior.
- Background music (`images/Till The End.mp3`) only starts after a user gesture (click/key/tap) due to browser autoplay policies.
- Harmless `404` errors for `favicon.ico` appear in the console; they do not affect functionality.
