import Link from "next/link";

export function CtaBand({
  title = "Ready to talk?",
  text = "Tell us what you need and we will get back to you.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* The ring would vanish against the brand background, so it uses the contrasting colour here. */}
      <div className="rounded-2xl bg-brand px-6 py-10 text-brand-foreground [--focus-ring:var(--brand-foreground)] sm:px-10">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 max-w-xl opacity-90">{text}</p>
        <Link
          href="/contact/"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-brand-foreground px-5 font-semibold text-brand"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
