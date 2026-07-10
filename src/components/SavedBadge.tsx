"use client";

import Link from "next/link";
import { useBookmarks } from "@/lib/useBookmarks";

export function SavedBadge() {
  const { count, ready } = useBookmarks();

  return (
    <Link
      href="/?saved=1"
      aria-label={`Saved jobs (${count})`}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition hover:border-brand-500 hover:text-brand-500"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {ready && count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
