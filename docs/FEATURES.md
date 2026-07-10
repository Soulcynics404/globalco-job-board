# Feature Documentation — Globalco Job Board

This document describes every feature in the job board: what it does, how a user
experiences it, and where it lives in the code.

---

## 1. Job Listings

**What:** The home page lists all 19 open positions as cards in a responsive grid
(1 column on mobile, 2 on tablet, 3 on desktop).

**Each card shows:** category, an optional *Featured* tag, title, location, a
two-line summary, shift/type/salary badges, how long ago it was posted, and a
bookmark toggle.

**Where:** `src/app/page.tsx` (page), `src/components/JobCard.tsx` (card),
`src/data/jobs.ts` (the dataset), `src/lib/types.ts` (the `Job` type).

---

## 2. Live Keyword Search

**What:** A search box filters the list instantly as you type. It matches against
the job title, summary, city, country, and category.

**How to use:** Type any keyword (e.g. `python`, `hyderabad`, `data`) — the grid and
the result count update immediately.

**Where:** `src/components/JobList.tsx` (search input + state), `filterJobs()` in
`src/lib/jobs.ts` (matching logic).

---

## 3. Faceted Filters

**What:** Three dropdown filters — **Country**, **Category**, **Shift** — that can be
combined with the search box and with each other. Options are derived from the data
so they always stay in sync.

**Where:** `src/components/JobList.tsx` (the `Select` controls),
`categories`, `shifts`, and `countries()` in `src/lib/jobs.ts`.

---

## 4. Saved / Bookmarked Jobs

**What:** Every card and detail page has a bookmark button. Saved jobs persist in the
browser's `localStorage`, survive page reloads, and drive:

- a **live count badge** on the navbar bookmark icon,
- a **“Saved only”** toggle that filters the list to saved roles,
- a dedicated `/?saved=1` view (opened from the navbar badge).

**How to use:** Click the bookmark icon on any job. Open the bookmark icon in the
navbar to jump to your saved list.

**Where:** `src/lib/useBookmarks.ts` (the hook + storage),
`src/components/BookmarkButton.tsx`, `src/components/SavedBadge.tsx`, and the
`savedOnly` branch of `filterJobs()`.

---

## 5. Active Filters, Result Count & Empty State

**What:** A live count (“*N* open positions”) reflects the current filters. A
**“Clear all”** control shows how many filters are active and resets them. When
nothing matches, a friendly **empty state** explains why and offers a reset —
with a distinct message for the *Saved only* case.

**Where:** `src/components/JobList.tsx` (count + clear), `src/components/EmptyState.tsx`.

---

## 6. Job Detail Pages

**What:** Each role has its own page mirroring Globalco's career layout:

- a header card with category/shift badges, title, location, **Apply** and **Save**,
- **About the role**, **Key Responsibilities**, **Qualifications**, and
  **Preferred Attributes** sections,
- a **sticky Job Overview sidebar** (location, category, employment, shift, work
  setup, schedule, salary),
- **Apply** and **Share** actions.

**Performance:** Pages are statically generated at build time via
`generateStaticParams`, and each has its own SEO metadata via `generateMetadata`.

**Where:** `src/app/jobs/[slug]/page.tsx`.

---

## 7. Apply Modal

**What:** Clicking **Apply now** opens an accessible modal (dialog role, Escape to
close, backdrop click to dismiss, body-scroll lock) with a short form: full name,
email, and resume/portfolio link. Submitting opens the user's email client with a
pre-filled application addressed to the talent team — no backend needed.

**Where:** `src/components/ApplyModal.tsx`.

---

## 8. Share

**What:** The **Share** button on a job page uses the native Web Share API where
available, and falls back to copying the URL to the clipboard (with a “Link copied!”
confirmation).

**Where:** `src/components/ShareButton.tsx`.

---

## 9. Dark Mode

**What:** A navbar toggle switches between light and dark themes. The choice is
saved to `localStorage`. A small inline script in the document head applies the
saved theme **before first paint**, so there is no flash of the wrong theme.

**Where:** `src/components/ThemeToggle.tsx` (toggle),
`src/app/layout.tsx` (pre-paint script + `suppressHydrationWarning`),
`src/app/globals.css` (theme tokens + `@custom-variant dark`).

---

## 10. Branding & Identity

**What:** The app reproduces Globalco's identity — the navy globe-and-wings logo,
the brand navy palette, a “Talk to us” call-to-action, and a footer listing the
company's global offices (Hong Kong, India, UAE, Philippines, USA).

**Where:** `src/components/Navbar.tsx`, `src/components/Footer.tsx`,
`public/logo.png`, brand tokens in `src/app/globals.css`.

---

## 11. Responsive & Accessible Design

**What:** Mobile-first layouts throughout; the apply modal becomes a bottom sheet on
small screens. Interactive elements have ARIA labels, `aria-pressed` states, visible
focus rings, and full keyboard support.

**Where:** Tailwind responsive utilities across all components; ARIA attributes in
`JobList`, `BookmarkButton`, `ThemeToggle`, `SavedBadge`, and `ApplyModal`.

---

## Data Model

Each job (`src/lib/types.ts`) has: `id`, `slug`, `title`, `city`, `country`,
`category`, `type`, `shift`, optional `schedule` and `salary`, `workSetup`,
`summary`, and the `responsibilities`, `qualifications`, and `preferred` lists, plus
an optional `featured` flag and `postedDaysAgo`.
