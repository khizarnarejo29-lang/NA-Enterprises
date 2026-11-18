import Link from "next/link";

export function CtaBand({
  title = "Ready to grow your business online?",
  text = "Tell us what you need and we will get back to you with ideas and a quote.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div
        data-scroll="zoom"
        className="bg-gradient-brand gradient-shift relative isolate overflow-hidden rounded-[2rem] px-6 py-16 text-center text-white [--focus-ring:#fff] sm:px-12 sm:py-20"
      >
        <div className="bg-grid absolute inset-0 -z-10 opacity-40" />
        <div className="absolute -top-24 -left-24 -z-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -right-20 -bottom-28 -z-10 h-80 w-80 rounded-full bg-[#22d3ee]/40 blur-3xl" />
        <h2 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">{text}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/contact/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-semibold text-[#0a2a6b] shadow-xl transition hover:-translate-y-0.5"
          >
            Request a quote
          </Link>
          <Link
            href="/services/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/50 px-8 font-semibold text-white transition hover:bg-white/10"
          >
            View services
          </Link>
        </div>
      </div>
    </section>
  );
}
