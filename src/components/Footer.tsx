export function Footer() {
  const offices = [
    "Hong Kong",
    "Hyderabad, India",
    "Ras Al Khaimah, UAE",
    "Makati & Davao, Philippines",
    "Dover, Delaware, USA",
  ];

  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-bold text-brand-500">GLOBALCO</p>
            <p className="mt-2 text-sm text-muted">
              The Global Coordination Center of Human + Machine Intelligence.
              Scale smarter with elite global professionals and AI-powered
              workflows.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Our Offices</p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {offices.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-xs text-muted">
          <p>
            © {2026} Globalco Careers. Built as an assessment project — not the
            official Globalco site.
          </p>
        </div>
      </div>
    </footer>
  );
}
