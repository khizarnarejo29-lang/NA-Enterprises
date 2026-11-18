import type { CSSProperties } from "react";
import { process } from "@/content/site";

/** "How we work": numbered steps joined by a line that fills in as you scroll. */
export function ProcessSteps() {
  return (
    <div className="relative">
      <div aria-hidden="true" data-reveal className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-white/10 lg:block">
        <div className="process-fill process-line bg-gradient-brand h-full origin-left" />
      </div>
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, i) => (
          <li key={step.title} data-reveal style={{ "--delay": `${i * 140}ms` } as CSSProperties} className="relative text-center">
            <span className="bg-gradient-brand relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-black text-white shadow-[0_0_40px_-8px_rgb(139_92_246)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
