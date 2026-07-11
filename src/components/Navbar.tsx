"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { SavedBadge } from "./SavedBadge";

const NAV = [
  { label: "Services", href: "https://www.globalco.com/" },
  { label: "Industries", href: "https://www.globalco.com/" },
  { label: "About Us", href: "https://www.globalco.com/" },
  { label: "Academy", href: "https://www.globalco.com/" },
  { label: "Career", href: "/", active: true },
  { label: "Contact", href: "https://www.globalco.com/" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-24">
        <Link href="/" className="flex items-center gap-2" aria-label="Globalco home">
          <Image
            src="/logo.png"
            alt="Globalco"
            width={371}
            height={80}
            priority
            className="h-12 w-auto sm:h-14 lg:h-16 dark:brightness-0 dark:invert"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-base font-medium text-foreground lg:flex">
          {NAV.map((item) =>
            item.active ? (
              <Link key={item.label} href={item.href} className="font-semibold text-brand-500">
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-brand-500"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2.5">
          <SavedBadge />
          <ThemeToggle />
          <a
            href="https://www.globalco.com/"
            className="hidden rounded-lg bg-brand px-5 py-2.5 text-[15px] font-semibold text-brand-foreground transition hover:bg-brand-600 sm:inline-flex"
          >
            Talk to us ›
          </a>
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="border-t border-border bg-surface px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.label}>
                {item.active ? (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-500"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-background"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            <li>
              <a
                href="https://www.globalco.com/"
                className="mt-1 block rounded-lg bg-brand px-3 py-2 text-center text-sm font-semibold text-brand-foreground"
              >
                Talk to us ›
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
