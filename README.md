# Slideshow

## Publish to GitHub Pages

This repository already includes a GitHub Actions workflow at `/home/runner/work/slideshow/slideshow/.github/workflows/pages.yml` that deploys on:
- push to `main`
- manual run (`workflow_dispatch`)

To enable publishing:
1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from **Actions**).
4. After the workflow succeeds, use the Pages URL shown in the workflow run.
