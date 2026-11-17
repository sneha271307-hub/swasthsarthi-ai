# SwasthSarthi AI – Frontend

React + Vite + Tailwind CSS, built from the Stitch "Silk" neomorphic design.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```
(Needs internet for Google Fonts: Plus Jakarta Sans + Material Symbols icons.)

## Pages
| Route | Page |
|---|---|
| `/` | Landing page (from the exported design) |
| `/symptom-checker` | Rule-based triage with red-flag detection |
| `/scheme-discovery` | Searchable, filterable scheme directory |
| `/eligibility-check` | Profile form -> matched schemes + document checklist |
| `/citizen-support` | Helplines, grievance form, FAQ |
| `/about-abha` | ABHA / NDHM explainer |
| `/clinical-ethics`, `/language-accessibility`, `/privacy-compliance`, `/tele-manas` | Governance pages |

## Where to edit
- Design tokens: `tailwind.config.js` + neomorphic classes in `src/index.css` (`neu-raised`, `neu-inset`, `neu-btn`, `neu-chip`, `neu-input`)
- Scheme data and matching rules: `src/data/schemes.js`
- Shared UI: `src/components/ui.jsx`

Triage/eligibility logic is demo-grade and rule-based, so replace it with a real backend/API before real-world use.
