# Globalco Careers — Job Board

A modern, responsive job board for **Globalco** (the Global Coordination Center of
Human + Machine Intelligence), listing all open positions across the company's
global offices. Built with Next.js, TypeScript, and Tailwind CSS, and deployed to
Vercel through a GitHub Actions CI/CD pipeline.

> Built as a technical assessment. This is **not** the official Globalco website —
> job data and branding are reproduced for demonstration only.

## 🔗 Live Links

| Deliverable | Link |
| --- | --- |
| **Live demo (Vercel)** | https://globalco-job-board.vercel.app |
| **GitHub repository** | https://github.com/soulcynics404/globalco-job-board |
| **Feature documentation** | [`docs/FEATURES.md`](docs/FEATURES.md) |

## ✨ Features

- **19 real open positions** across Engineering, Data Science, Operations,
  Marketing, HR, Finance, and Customer Support.
- **Live keyword search** — filter roles instantly by title, location, or keyword.
- **Faceted filters** — combine Country, Category, and Shift; toggle *Saved only*;
  clear all with one click.
- **Live result count** and a friendly **empty state**.
- **Job detail pages** — full responsibilities, qualifications, and preferred
  attributes with a sticky job-overview sidebar.
- **Save / bookmark jobs** — persisted in `localStorage`, with a live count badge
  in the navbar and a *Saved only* view.
- **Apply modal** — collects name, email, and portfolio link, then opens a
  pre-filled email to the talent team (no backend required).
- **Share** — native share sheet with copy-link fallback.
- **Dark mode** — persisted, no flash of unstyled theme on load.
- **Fully responsive & accessible** — mobile-first layout, keyboard support,
  ARIA labels, visible focus states.

See [`docs/FEATURES.md`](docs/FEATURES.md) for a full, per-feature breakdown.

## 🧱 Tech Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Data | Typed static dataset (`src/data/jobs.ts`) — no database |
| Hosting | Vercel |
| CI/CD | GitHub Actions |

## 🚀 Getting Started (local)

```bash
git clone https://github.com/soulcynics404/globalco-job-board.git
cd globalco-job-board
npm install
npm run dev
# open http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # root layout, theme bootstrap, navbar + footer
│   ├── page.tsx             # home: hero + search + filters + job grid
│   ├── jobs/[slug]/page.tsx # job detail (statically generated per role)
│   └── not-found.tsx
├── components/              # Navbar, Footer, JobCard, JobList, ApplyModal, …
├── data/jobs.ts             # the 19 openings
└── lib/                     # types, filtering helpers, useBookmarks hook
```

## 🔄 CI/CD Pipeline

Defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). On every push and
pull request to `main`:

1. **build** — install deps (`npm ci`), `lint`, type-check (`tsc --noEmit`), and
   `next build`. This is the quality gate.
2. **deploy** — runs only on pushes to `main` after `build` passes. Uses the Vercel
   CLI to `pull` the production environment, `build` the artifacts, and
   `deploy --prebuilt --prod` — so **the pipeline itself performs the deployment**.

### Required GitHub secrets

Add these under **Settings → Secrets and variables → Actions**:

| Secret | Where to get it |
| --- | --- |
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after running `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after running `vercel link` |

### First-time setup

```bash
npm i -g vercel
vercel link          # creates .vercel/project.json with the ORG + PROJECT ids
cat .vercel/project.json
```

Copy the two ids into GitHub secrets, generate a token for `VERCEL_TOKEN`, then push
to `main`. To avoid double deploys, turn off Vercel's automatic Git production
deploys (**Vercel → Project → Settings → Git**) so this pipeline is the only
deployer.

## 🤖 Built with AI

The application code, CI/CD pipeline, and this documentation were produced with an
AI coding assistant (Claude), matching the assessment brief.
