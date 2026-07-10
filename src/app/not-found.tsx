import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand-500">404</p>
      <h1 className="mt-3 text-xl font-semibold">Position not found</h1>
      <p className="mt-2 text-sm text-muted">
        This role may have been filled or the link is incorrect.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition hover:bg-brand-600"
      >
        Browse open positions
      </Link>
    </div>
  );
}
