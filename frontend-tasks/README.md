# Frontend — Scheme Helper

No build step, no framework — plain HTML/CSS/JS with ES modules. Run it with
any static server (it uses `fetch()` for mock-data.json, so opening
`index.html` directly via `file://` won't work):

```bash
python3 -m http.server 5500
# then open http://localhost:5500
```

## What's done vs. what needs you

I wrote all the code, but a few tasks need your actual accounts/repo and can't
be done from here — do these yourself:

| Task | Status |
|---|---|
| B1 Setup + tokens | Code done (`src/styles.css` `:root` vars). **You still need to**: `git checkout -b frontend` in your real repo and push. |
| B2 Home screen | Done — `src/pages/Home.js` |
| B3 Results screen | Done — `src/pages/Results.js`, reads only from mock-data.json |
| B4 Details screen | Done — `src/pages/Details.js`, includes the exact disclaimer text |
| B5 Steps + handoff | Done — `src/pages/Steps.js`. **Check**: the "Talk to a human helper" phone number is a placeholder — swap in the real one. |
| B6 Mock data | Done, **but based on a guess** — I didn't have `API.md`. See the `_note` field in `mock-data.json` and the `normalizeScheme()` comment in `src/app.js`: that's the one place to edit if real field names differ. |
| B7 Accessibility panel | Done — `src/components/AccessibilityPanel.js`, persists via `localStorage` |
| B8 Voice | Done — `src/components/Voice.js`. Depends on the browser supporting Web Speech API (Chrome does; test on your actual target browser) |
| B9 Language switcher | Done — `src/i18n.js` has EN/HI dictionaries; only a handful of UI strings are translated so far — add more keys as you add UI text |
| B10 Accessibility checks | Semantic HTML, aria-labels, visible focus styles, and keyboard reachability are in from the start — but **you should still tab through the real deployed app yourself**, that's not something I can verify without a browser |
| B11 Responsive | Phone-first CSS, tested logically at 375px/640px/1024px breakpoints — **open dev tools and actually check it**, I can't render a browser here |
| B12 Deploy | **Not done — needs your Vercel/Netlify account.** Steps below. |
| B13 Screenshots | **Not done — needs the live deployed app.** Can't screenshot something that isn't hosted yet. |

## Deploying (B12)

1. Push the `frontend` branch (or merge to main once ready).
2. Import the repo into Vercel or Netlify — no build command needed, since
   there's no bundler; set the output/publish directory to the repo root.
3. Add your live API base URL as an environment variable, then set
   `window.__API_BASE__` (see top of `src/app.js`) from it — e.g. add a small
   inline `<script>` in `index.html` before `app.js` loads:
   ```html
   <script>window.__API_BASE__ = "https://your-api.example.com";</script>
   ```
4. Deploy, open the live URL, and click through the whole journey once.

## Screenshots (B13)

Once it's live: open the real deployed app (not this local copy) and save
PNGs into `screenshots/` — Home, Results, Details, Steps, and one each of the
accessibility panel, language switch, and voice input in action.

## Git workflow

```bash
git checkout -b frontend
git add .
git commit -m "Add frontend: home, results, details, steps screens"
git push origin frontend
```
Keep commits small and specific (e.g. "Add accessibility panel", "Wire up
voice input") rather than one giant commit — makes it much easier for your
teammates to review.
