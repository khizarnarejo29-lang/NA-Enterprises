"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, siteConfig } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the mobile menu and returns focus to the toggle button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {/* Text monogram, not a logo. Replace with the real logo once provided. */}
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-sm font-extrabold text-brand-foreground"
          >
            NA
          </span>
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="rounded-md px-2.5 py-2 text-sm font-medium text-muted hover:text-foreground aria-[current=page]:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="/contact/"
            className="hidden h-10 items-center rounded-md bg-brand px-4 text-sm font-semibold text-brand-foreground hover:bg-brand-strong sm:inline-flex"
          >
            Request a quote
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block rounded-md px-3 py-3 font-medium aria-[current=page]:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="px-3 pt-2 pb-4">
              <Link
                href="/contact/"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center rounded-md bg-brand font-semibold text-brand-foreground"
              >
                Request a quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
