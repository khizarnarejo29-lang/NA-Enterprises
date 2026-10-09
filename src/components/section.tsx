import type { ReactNode } from "react";

/** Standard page section: optional eyebrow, heading and intro, consistent spacing. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "default",
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  tone?: "default" | "surface";
  children: ReactNode;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={tone === "surface" ? "bg-surface" : undefined}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          {eyebrow && <p className="text-sm font-semibold tracking-wide text-brand uppercase">{eyebrow}</p>}
          <h2 id={headingId} className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
