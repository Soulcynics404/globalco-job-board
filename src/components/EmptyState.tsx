export function EmptyState({
  savedOnly,
  onReset,
}: {
  savedOnly: boolean;
  onReset: () => void;
}) {
  return (
    <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand-500">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold">
        {savedOnly ? "No saved jobs yet" : "No positions match your filters"}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted">
        {savedOnly
          ? "Tap the bookmark icon on any job to save it here for later."
          : "Try adjusting your search terms or clearing some filters to see more roles."}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand-600"
      >
        Clear filters
      </button>
    </div>
  );
}
