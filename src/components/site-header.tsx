"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, siteConfig } from "@/content/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Header turns into a glass bar once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled || open ? "border-b border-border bg-[#05060f]/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 ${scrolled ? "h-16" : "h-20"}`}>
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight whitespace-nowrap"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export serves images as-is */}
          <img src="/brand/logo-mark-dark.png" alt="" width={512} height={268} className="h-9 w-auto drop-shadow-[0_0_14px_rgb(10_132_255/0.45)]" />
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="relative rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground aria-[current=page]:bg-white/[0.06] aria-[current=page]:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/contact/" className="btn-primary hidden !h-10 !px-5 text-sm whitespace-nowrap md:inline-flex">
            Request a quote
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 lg:hidden"
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
          <ul className="mx-auto max-w-7xl px-4 py-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block rounded-xl px-3 py-3 text-lg font-medium aria-[current=page]:bg-white/[0.06] aria-[current=page]:text-brand-strong"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="px-3 pt-2 pb-4">
              <Link
                href="/contact/"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
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
