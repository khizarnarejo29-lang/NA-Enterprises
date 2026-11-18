import type { ReactNode } from "react";

/** Standard page section: optional eyebrow, heading and intro, consistent spacing. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "default",
  align = "left",
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "default" | "surface";
  align?: "left" | "center";
  children: ReactNode;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  const center = align === "center";
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative ${tone === "surface" ? "border-y border-border bg-surface" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`} data-reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={headingId} className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            {title}
          </h2>
          {intro && <p className="mt-5 text-lg leading-8 text-muted">{intro}</p>}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
