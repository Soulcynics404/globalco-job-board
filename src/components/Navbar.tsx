import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { SavedBadge } from "./SavedBadge";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Globalco home">
          <Image
            src="/logo.png"
            alt="Globalco"
            width={150}
            height={32}
            priority
            className="h-7 w-auto dark:brightness-0 dark:invert"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          <a href="https://www.globalco.com/" className="hover:text-brand-500 transition">Services</a>
          <a href="https://www.globalco.com/" className="hover:text-brand-500 transition">Industries</a>
          <a href="https://www.globalco.com/" className="hover:text-brand-500 transition">About Us</a>
          <Link href="/" className="text-brand-500">Careers</Link>
        </nav>

        <div className="flex items-center gap-2">
          <SavedBadge />
          <ThemeToggle />
          <a
            href="https://www.globalco.com/"
            className="hidden rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand-600 sm:inline-flex"
          >
            Talk to us
          </a>
        </div>
      </div>
    </header>
  );
}
