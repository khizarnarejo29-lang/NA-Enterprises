import type { ReactNode } from "react";

/**
 * Marks content the business has not confirmed yet. It is styled so it can
 * never be mistaken for real information, and every use corresponds to a
 * PLACEHOLDER entry in src/content/site.ts.
 */
export function Placeholder({
  title,
  children,
  className = "",
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border-2 border-dashed border-placeholder-border bg-placeholder-bg p-5 text-placeholder-text ${className}`}
    >
      <p className="flex flex-wrap items-center gap-2 font-semibold">
        <span className="rounded bg-placeholder-border px-2 py-0.5 text-xs font-bold tracking-wide text-placeholder-bg uppercase">
          Placeholder
        </span>
        {title}
      </p>
      {children && <div className="mt-2 text-sm">{children}</div>}
    </div>
  );
}

/** Inline badge for items (e.g. a service card) that are themselves placeholders. */
export function PlaceholderBadge() {
  return (
    <span className="inline-block rounded bg-placeholder-border px-2 py-0.5 text-xs font-bold tracking-wide text-placeholder-bg uppercase">
      Placeholder
    </span>
  );
}
