"use client";

import { useMemo, useState } from "react";
import { Job, Category, Shift } from "@/lib/types";
import { filterJobs, Filters, categories, shifts } from "@/lib/jobs";
import { useBookmarks } from "@/lib/useBookmarks";
import { JobCard } from "./JobCard";
import { EmptyState } from "./EmptyState";

export function JobList({
  jobs,
  countryOptions,
  initialSavedOnly = false,
}: {
  jobs: Job[];
  countryOptions: string[];
  initialSavedOnly?: boolean;
}) {
  const { ids } = useBookmarks();
  const [filters, setFilters] = useState<Filters>({
    query: "",
    country: null,
    category: null,
    shift: null,
    savedOnly: initialSavedOnly,
  });

  const results = useMemo(
    () => filterJobs(jobs, filters, ids),
    [jobs, filters, ids],
  );

  const activeCount =
    (filters.country ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.shift ? 1 : 0) +
    (filters.savedOnly ? 1 : 0) +
    (filters.query ? 1 : 0);

  function reset() {
    setFilters({
      query: "",
      country: null,
      category: null,
      shift: null,
      savedOnly: false,
    });
  }

  return (
    <div>
      {/* Search + filter controls */}
      <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={filters.query}
            onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
            placeholder="Search by title, location, or keyword…"
            aria-label="Search jobs"
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Select
            label="Country"
            placeholder="All countries"
            value={filters.country ?? ""}
            onChange={(v) => setFilters((f) => ({ ...f, country: v || null }))}
            options={countryOptions}
          />
          <Select
            label="Category"
            placeholder="All categories"
            value={filters.category ?? ""}
            onChange={(v) =>
              setFilters((f) => ({ ...f, category: (v || null) as Category | null }))
            }
            options={categories}
          />
          <Select
            label="Shift"
            placeholder="All shifts"
            value={filters.shift ?? ""}
            onChange={(v) =>
              setFilters((f) => ({ ...f, shift: (v || null) as Shift | null }))
            }
            options={shifts}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilters((f) => ({ ...f, savedOnly: !f.savedOnly }))}
            aria-pressed={filters.savedOnly}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              filters.savedOnly
                ? "border-brand-500 bg-brand/10 text-brand-500"
                : "border-border bg-background text-muted hover:border-brand-500"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={filters.savedOnly ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Saved only
          </button>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted transition hover:text-brand-500"
            >
              Clear all ({activeCount})
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted">
          <span className="font-semibold text-foreground">{results.length}</span>{" "}
          {results.length === 1 ? "open position" : "open positions"}
          {filters.savedOnly && " saved"}
        </p>
      </div>

      {/* Grid */}
      {results.length === 0 ? (
        <EmptyState savedOnly={filters.savedOnly} onReset={reset} />
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  placeholder,
  value,
  onChange,
  options,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
