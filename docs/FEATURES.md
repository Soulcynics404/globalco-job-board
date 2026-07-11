<p align="center">
  <img src="../public/logo.png" alt="Globalco" width="360" />
</p>

<h1 align="center">Feature Documentation</h1>

<p align="center">A complete, per-feature guide to the Globalco job board —<br/>what each feature does, how it behaves, and where it lives in the code.</p>

---

## Table of Contents

1. [Job Listings](#1-job-listings)
2. [Live Keyword Search](#2-live-keyword-search)
3. [Faceted Filters](#3-faceted-filters)
4. [Saved / Bookmarked Jobs](#4-saved--bookmarked-jobs)
5. [Result Count, Active Filters & Empty State](#5-result-count-active-filters--empty-state)
6. [Job Detail Pages](#6-job-detail-pages)
7. [Apply Modal with File Uploads](#7-apply-modal-with-file-uploads)
8. [Share a Job](#8-share-a-job)
9. [Dark Mode](#9-dark-mode)
10. [Globalco Branding](#10-globalco-branding)
11. [Responsive & Accessible Design](#11-responsive--accessible-design)
12. [Performance & SEO](#12-performance--seo)
13. [Data Model](#data-model)

---

## 1. Job Listings

**What it does** — The home page presents all **19 open positions** as cards in a
responsive grid: **1 column** on mobile, **2** on tablet, **3** on desktop.

**Each card shows**
- Category tag and an optional **★ Featured** tag
- Job title (links to the detail page)
- Location with a pin icon
- A two-line clamped summary
- Shift / employment-type / salary badges
- "Posted _N_ days ago" and a **View details →** affordance
- A **bookmark** toggle (top-right of the card)

**User flow** — Scan the grid → hover a card (it lifts and highlights) → click to open
the full role, or tap the bookmark icon to save without leaving the page.

**Code** — `src/app/page.tsx` (page shell + hero + stats), `src/components/JobCard.tsx`
(card), `src/components/JobList.tsx` (grid + state), `src/data/jobs.ts` (dataset).

---

## 2. Live Keyword Search

**What it does** — A search box filters the list **instantly as you type** (no submit
needed). It matches the query against each job's **title, summary, city, country, and
category**, case-insensitively.

**Behaviour**
- Filtering is client-side, so results update on every keystroke with no network latency.
- Combines with every other filter (search + country + category + shift all stack).
- Clearing the box restores the full list.

**Code** — the controlled `input` in `src/components/JobList.tsx`; matching logic in
`filterJobs()` in `src/lib/jobs.ts`.

---

## 3. Faceted Filters

**What it does** — Three dropdowns — **Country**, **Category**, **Shift** — narrow the
list. They are **combinable** with each other and with search.

**Details**
- Options are **derived from the data** (`countries()`, `categories`, `shifts` in
  `src/lib/jobs.ts`), so they never drift out of sync with the jobs.
- Placeholder labels are correctly pluralised: **All countries / All categories /
  All shifts**.
- A **Saved only** toggle and a **Clear all (_n_)** control sit beneath the dropdowns.

**Code** — `Select` sub-component and filter state in `src/components/JobList.tsx`;
`filterJobs()` in `src/lib/jobs.ts`.

---

## 4. Saved / Bookmarked Jobs

**What it does** — Any card or detail page can bookmark a role. Saved jobs **persist in
the browser** and survive reloads.

**Powers three things**
1. A **live count badge** on the navbar bookmark icon.
2. A **Saved only** filter on the home page.
3. A dedicated `/?saved=1` view (opened from the navbar badge).

**Implementation**
- A small `useBookmarks` hook wraps `localStorage` under the key `globalco:bookmarks`.
- Reads are hydrated **after mount** to stay compatible with server rendering (no
  hydration mismatch), and a `ready` flag prevents count flicker.
- Toggling is optimistic and writes straight back to storage.

**Code** — `src/lib/useBookmarks.ts`, `src/components/BookmarkButton.tsx`,
`src/components/SavedBadge.tsx`, and the `savedOnly` branch of `filterJobs()`.

---

## 5. Result Count, Active Filters & Empty State

**What it does**
- A **live count** (“_N_ open positions”) reflects the current filter combination and
  updates as you type or select.
- **Clear all (_n_)** shows how many filters are active and resets them in one click.
- When nothing matches, a **friendly empty state** explains why and offers a reset —
  with a distinct message for the *Saved only* case (“Tap the bookmark icon…”).

**Code** — count + clear in `src/components/JobList.tsx`;
`src/components/EmptyState.tsx`.

---

## 6. Job Detail Pages

**What it does** — Every role has its own page (`/jobs/<slug>`) that mirrors Globalco's
career layout:

- Header card: category / shift badges, title, location, **Apply now** + **Save job**
- **About the role** summary
- **Key Responsibilities**, **Qualifications**, **Preferred Attributes** lists
- A **sticky Job Overview sidebar** (location, category, employment, shift, work setup,
  schedule, salary)
- **Apply** and **Share** actions at the bottom

**Performance** — Pages are **statically generated at build time** via
`generateStaticParams`, and each gets its own SEO `<title>`/description via
`generateMetadata`.

**Code** — `src/app/jobs/[slug]/page.tsx`; lookup helpers `getJob` / `getAllSlugs` in
`src/lib/jobs.ts`.

---

## 7. Apply Modal with File Uploads

**What it does** — Clicking **Apply now** opens an accessible modal to submit an
application.

**Fields**
- **Full name** (required)
- **Email** (required)
- **Resume / CV** upload — **required**
- **Cover letter** upload — optional

**File handling & validation**
- Accepted formats: **PDF, DOC, DOCX, JPG, JPEG, PNG** (the formats mainstream job
  boards accept).
- Maximum size: **5 MB per file**.
- Client-side validation checks both file **extension and MIME type**, and rejects
  oversized files with an inline error.
- Each chosen file shows its **name** with a one-click **remove**; a missing required
  resume blocks submission with “A resume / CV is required.”

**Accessibility & UX**
- `role="dialog"` + `aria-modal`, **Escape** to close, backdrop click to dismiss, and
  **body-scroll lock** while open.
- On mobile the modal becomes a **bottom sheet**; content scrolls if it exceeds the
  viewport.
- A successful submit shows a **confirmation state** (“Thanks, _name_! Your application
  for _role_ has been received.”).

**Code** — `src/components/ApplyModal.tsx` (`validateFile`, `FileField`).

---

## 8. Share a Job

**What it does** — The **Share** button on a detail page uses the native **Web Share
API** where available, and otherwise **copies the URL** to the clipboard with a
“Link copied!” confirmation.

**Code** — `src/components/ShareButton.tsx`.

---

## 9. Dark Mode

**What it does** — A navbar toggle switches light / dark; the choice is saved to
`localStorage` under `globalco:theme`.

**No flash of the wrong theme** — a tiny inline script in the document `<head>` applies
the saved (or OS-preferred) theme **before first paint**, and the `<html>` element uses
`suppressHydrationWarning` so the client can safely reconcile the class.

**Theming model** — Colours are CSS variables in `src/app/globals.css`; a
`@custom-variant dark` enables class-based dark mode in Tailwind v4. Both themes are
tuned around the Globalco brand navy.

**Code** — `src/components/ThemeToggle.tsx`, `src/app/layout.tsx`,
`src/app/globals.css`.

---

## 10. Globalco Branding

**What it does** — The app reproduces Globalco's identity so it reads as authentic:

- The **navy globe-and-wings logo**, sized to match the real site's header and footer.
- The brand **navy palette** and a **“Talk to us ›”** call-to-action.
- A header nav that mirrors the real site: **Services · Industries · About Us · Academy
  · Career · Contact**.
- A footer that mirrors the real site: **Services / Company / Industries / Locations**
  columns with the real office addresses (US, UAE, Hong Kong) and the
  “© 2026 Global Coordination Center” line.
- A **Globalco globe favicon** and the browser tab title **“Career | Globalco.”**

**Code** — `src/components/Navbar.tsx`, `src/components/Footer.tsx`,
`src/app/icon.svg`, `public/logo.png`, brand tokens in `src/app/globals.css`.

---

## 11. Responsive & Accessible Design

**Responsive**
- Mobile-first Tailwind layouts; grid steps **1 → 2 → 3** columns.
- A **hamburger menu** replaces the desktop nav below the `lg` breakpoint.
- Verified with **no horizontal overflow** from **320px to 1440px**.
- Filters stack on mobile; the apply modal becomes a bottom sheet.

**Accessible**
- ARIA labels on every icon button, `aria-pressed` on toggles, `aria-modal` on the
  dialog.
- Visible focus rings and full keyboard operability.
- Sufficient colour contrast in both themes.

---

## 12. Performance & SEO

- **Static generation** of the home page and all 19 job pages → fast first paint,
  CDN-cacheable.
- Per-page **metadata** (`title`, `description`, Open Graph) for shareable links.
- `next/image` for the optimised, correctly-sized logo.
- No client-side data fetching — the dataset ships with the bundle.

---

## Data Model

Each job (`src/lib/types.ts`) is typed as:

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | Stable identifier (used for bookmarks) |
| `slug` | `string` | URL segment for the detail page |
| `title` | `string` | Role title |
| `city`, `country` | `string` | Location |
| `category` | `Category` | One of 7 categories |
| `type` | `EmploymentType` | e.g. Full-time |
| `shift` | `Shift` | Night / Day / Mid |
| `schedule?`, `salary?` | `string` | Optional |
| `workSetup` | `string` | e.g. “Full-time onsite — Makati” |
| `summary` | `string` | Card + detail intro |
| `responsibilities` | `string[]` | Detail list |
| `qualifications` | `string[]` | Detail list |
| `preferred` | `string[]` | Detail list |
| `featured?` | `boolean` | Highlights the card |
| `postedDaysAgo` | `number` | “Posted N days ago” |

Categories: **Engineering, Data Science, Operations, Marketing, Human Resources,
Finance, Customer Support**.
