import Link from "next/link";
import type { CSSProperties } from "react";
import { services, siteConfig } from "@/content/site";
import { ServiceDemo } from "./service-demos";
import { ServiceIcon } from "./service-icon";

const WORDS = ["Websites", "Brands", "Content", "Growth"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="orb -z-10 -top-40 -left-32 h-[36rem] w-[36rem] bg-[#6d5dfc]" />
      <div className="orb -z-10 top-40 -right-40 h-[30rem] w-[30rem] bg-[#0891b2]" style={{ animationDelay: "-6s" }} />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-14 pb-24 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-32">
        <div className="hero-parallax">
          <p data-reveal className="eyebrow">Digital agency · Karachi, Pakistan</p>
          <h1 data-reveal style={{ "--delay": "100ms" } as CSSProperties} className="mt-6 text-[2.6rem] leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="sr-only">We design and build websites, brands, content and growth for your business.</span>
            <span aria-hidden="true">
              We design &amp; build{" "}
              <span className="word-rotator">
                {WORDS.map((w) => (
                  <span key={w} className="text-gradient gradient-shift">
                    {w}
                  </span>
                ))}
              </span>
              <br />
              for your business.
            </span>
          </h1>
          <p data-reveal style={{ "--delay": "200ms" } as CSSProperties} className="mt-6 max-w-xl text-lg leading-8 text-muted">
            {siteConfig.description}
          </p>
          <div data-reveal style={{ "--delay": "300ms" } as CSSProperties} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact/" className="btn-primary">
              Start your project <span aria-hidden="true">→</span>
            </Link>
            <Link href="/services/" className="btn-ghost">
              Explore services
            </Link>
          </div>
          <ul aria-label="Our services" className="mt-10 flex flex-wrap gap-2">
            {services.map((s, i) => (
              <li key={s.slug} data-reveal="zoom" style={{ "--delay": `${400 + i * 70}ms` } as CSSProperties}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-muted transition hover:border-brand hover:text-foreground"
                >
                  <ServiceIcon slug={s.slug} size={16} className="text-accent" />
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

/** Orbit of every service around the brand mark, with live service demos floating in front. */
function HeroVisual() {
  return (
    <div className="hero-parallax-slow relative mx-auto aspect-square w-full max-w-[36rem]" aria-hidden="true">
      <div data-reveal="zoom" className="absolute inset-0">
        {/* Orbits */}
        <div className="orbit-ring" />
        <div className="orbit-ring inset-[16%]! opacity-60" />
        <div className="orbit-spin absolute inset-0">
          {services.map((s, i) => (
            <div key={s.slug} className="orbit-item" style={{ "--a": `${(360 / services.length) * i}deg`, "--r": "min(18rem, 46vw)" } as CSSProperties}>
              <div className="orbit-counter -translate-x-1/2 -translate-y-1/2">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-[#0d1024]/90 text-brand-strong shadow-[0_0_30px_-6px_rgb(139_123_255/0.8)] backdrop-blur sm:h-14 sm:w-14">
                  <ServiceIcon slug={s.slug} size={24} />
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="pulse-ring absolute inset-0 rounded-3xl border border-brand" />
          <span className="pulse-ring absolute inset-0 rounded-3xl border border-accent" style={{ animationDelay: "1.5s" }} />
          <span className="bg-gradient-brand gradient-shift relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl text-2xl font-black text-white shadow-[0_0_80px_-10px_rgb(139_92_246)]">
            NA
          </span>
        </div>
      </div>

      {/* Floating live demos */}
      <div className="absolute top-[2%] left-[-2%] w-[56%] sm:left-[-6%]" data-reveal="left" style={{ "--delay": "300ms" } as CSSProperties}>
        <div className="hero-float">
          <ServiceDemo slug="website-development" />
        </div>
      </div>
      <div className="absolute right-[-2%] bottom-[2%] w-[48%] sm:right-[-6%]" data-reveal="right" style={{ "--delay": "550ms" } as CSSProperties}>
        <div className="hero-float" style={{ "--d": "-3s" } as CSSProperties}>
          <ServiceDemo slug="social-media-marketing" />
        </div>
      </div>
      <div className="absolute top-[10%] right-[0%] hidden w-[34%] sm:block" data-reveal="zoom" style={{ "--delay": "750ms" } as CSSProperties}>
        <div className="hero-float" style={{ "--d": "-5s" } as CSSProperties}>
          <ServiceDemo slug="logo-design" />
        </div>
      </div>
      <div className="absolute bottom-[8%] left-[0%] hidden w-[36%] sm:block" data-reveal="zoom" style={{ "--delay": "900ms" } as CSSProperties}>
        <div className="hero-float" style={{ "--d": "-2s" } as CSSProperties}>
          <ServiceDemo slug="search-engine-optimization" />
        </div>
      </div>
    </div>
  );
}
