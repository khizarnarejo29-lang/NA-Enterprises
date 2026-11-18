import { services } from "@/content/site";
import { ServiceIcon } from "./service-icon";

/** Endless strip of service names. Decorative: the same links exist in the menu and footer. */
export function ServiceMarquee() {
  const items = [...services, ...services];
  return (
    <div aria-hidden="true" className="marquee overflow-hidden border-y border-border bg-surface py-6">
      <div className="marquee-track gap-12 pr-12">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-4 text-2xl font-bold whitespace-nowrap sm:text-3xl">
            <ServiceIcon slug={s.slug} size={28} className="text-accent" />
            <span className={i % 2 ? "text-outline !text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.45)]" : ""}>{s.title}</span>
            <span className="text-gradient">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two rows of huge outlined words that slide in opposite directions while scrolling. */
export function ScrollWords() {
  const a = services.slice(0, 5).map((s) => s.short.toUpperCase()).join(" · ");
  const b = services.slice(5).map((s) => s.short.toUpperCase()).join(" · ");
  return (
    <div aria-hidden="true" className="overflow-hidden py-10 select-none">
      <p data-scroll="slide" className="text-outline text-[11vw] leading-[1.05] font-black whitespace-nowrap">
        {a} · {a}
      </p>
      <p data-scroll="slide-rev" className="text-gradient text-[11vw] leading-[1.05] font-black whitespace-nowrap opacity-80">
        {b} · {b}
      </p>
    </div>
  );
}
