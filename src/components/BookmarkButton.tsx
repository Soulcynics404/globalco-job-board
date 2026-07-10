"use client";

import { useBookmarks } from "@/lib/useBookmarks";

export function BookmarkButton({
  id,
  variant = "icon",
}: {
  id: string;
  variant?: "icon" | "full";
}) {
  const { has, toggle, ready } = useBookmarks();
  const saved = ready && has(id);

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handle}
        aria-pressed={saved}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
          saved
            ? "border-brand-500 bg-brand/10 text-brand-500"
            : "border-border bg-surface text-foreground hover:border-brand-500"
        }`}
      >
        <BookmarkIcon filled={saved} />
        {saved ? "Saved" : "Save job"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={saved ? "Remove bookmark" : "Save job"}
      aria-pressed={saved}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition ${
        saved
          ? "border-brand-500 bg-brand/10 text-brand-500"
          : "border-border bg-surface text-muted hover:border-brand-500 hover:text-brand-500"
      }`}
    >
      <BookmarkIcon filled={saved} />
    </button>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
