"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Drives the site's scroll animations without a library:
 * - elements with `data-reveal` or `data-animate` get `data-inview` once they
 *   scroll into view (CSS then fades them in or starts their animation);
 * - `data-animate` elements lose it again when they leave, so looping service
 *   demos only run while visible;
 * - `.spotlight-host` elements track the pointer in --mx / --my.
 * Runs again on each client-side navigation.
 */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal], [data-animate]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-inview", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.setAttribute("data-inview", "");
            if (!el.hasAttribute("data-animate")) io.unobserve(el);
          } else if (el.hasAttribute("data-animate")) {
            el.removeAttribute("data-inview");
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));

    const onMove = (e: PointerEvent) => {
      const host = (e.target as Element | null)?.closest<HTMLElement>(".spotlight-host");
      if (!host) return;
      const r = host.getBoundingClientRect();
      host.style.setProperty("--mx", `${e.clientX - r.left}px`);
      host.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      document.removeEventListener("pointermove", onMove);
    };
  }, [pathname]);

  return null;
}
