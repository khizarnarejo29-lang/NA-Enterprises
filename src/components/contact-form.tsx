"use client";

import Link from "next/link";
import { useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";

type Values = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  subject: string;
  message: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", phone: "", date: "", time: "", subject: "", message: "", consent: false };
const MESSAGE_MAX = 1500; // mailto links get unreliable beyond ~2,000 characters
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

const noopSubscribe = () => () => {};

function todayISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address, like name@example.com.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Please enter a valid phone number, or leave this blank.";
  if (v.date && v.date < todayISO()) e.date = "Please choose today or a future date.";
  if (v.time && !v.date) e.date = "Please choose a date for the preferred time.";
  if (v.subject.trim().length < 3) e.subject = "Please enter a subject.";
  if (v.message.trim().length < 10) e.message = "Please enter a message of at least 10 characters.";
  if (v.consent !== true) e.consent = "Please confirm you have read the Privacy Policy.";
  return e;
}

function buildMailto(to: string, v: Values) {
  const lines = [`Name: ${v.name.trim()}`, `Email: ${v.email.trim()}`];
  if (v.phone.trim()) lines.push(`Phone: ${v.phone.trim()}`);
  if (v.date) lines.push(`Preferred call date: ${v.date}${v.time ? ` at ${v.time}` : ""}`);
  const body = [...lines, "", v.message.trim()].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(v.subject.trim())}&body=${encodeURIComponent(body)}`;
}

const FIELD_ORDER: (keyof Values)[] = ["name", "email", "phone", "date", "time", "subject", "message", "consent"];

/**
 * Contact / "schedule a call" form. There is no server, so a valid submission
 * opens the visitor's email app with the message filled in. Nothing is sent
 * by this website, and the UI says so.
 */
export function ContactForm({ recipient }: { recipient: string }) {
  const id = useId();
  // The static HTML has no date limit; the visitor's "today" is applied after hydration.
  const today = useSyncExternalStore(noopSubscribe, todayISO, () => undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [mailto, setMailto] = useState<string | null>(null);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // After the first submit attempt, re-validate as the visitor corrects fields.
    if (submitted) setErrors(validate(next));
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (!recipient) {
      setMailto("");
      return;
    }
    const url = buildMailto(recipient, values);
    setMailto(url);
    window.location.href = url;
  }

  const fid = (k: keyof Values) => `${id}-${k}`;
  const describedBy = (k: keyof Values, hint?: boolean) =>
    [hint ? `${fid(k)}-hint` : "", errors[k] ? `${fid(k)}-error` : ""].filter(Boolean).join(" ") || undefined;
  const errorText = (k: keyof Values) =>
    errors[k] ? (
      <p id={`${fid(k)}-error`} className="mt-1.5 text-sm font-medium text-danger">
        {errors[k]}
      </p>
    ) : null;
  const label = (k: keyof Values, text: string, required = false) => (
    <label htmlFor={fid(k)} className="mb-1.5 block text-sm font-semibold">
      {text}
      {required ? (
        <span className="text-danger" aria-hidden="true">
          {" "}
          *
        </span>
      ) : (
        <span className="font-normal text-muted"> (optional)</span>
      )}
    </label>
  );
  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${id}-note`} className="space-y-5">
      <p id={`${id}-note`} className="text-sm text-muted">
        Fields marked <span className="text-danger">*</span> are required. Submitting opens your own email app with your
        message ready to send. This website does not send or store it.
      </p>

      <div aria-live="polite" className="empty:hidden">
        {submitted && errorCount > 0 && (
          <p role="alert" className="rounded-md border border-danger px-4 py-3 text-sm font-medium text-danger">
            Please correct {errorCount === 1 ? "1 field" : `${errorCount} fields`} below.
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {label("name", "Full name", true)}
          <input id={fid("name")} name="name" className="field" autoComplete="name" required
            value={values.name} onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name} aria-describedby={describedBy("name")} />
          {errorText("name")}
        </div>
        <div>
          {label("email", "Email address", true)}
          <input id={fid("email")} name="email" type="email" className="field" autoComplete="email" inputMode="email" required
            value={values.email} onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email} aria-describedby={describedBy("email")} />
          {errorText("email")}
        </div>
        <div>
          {label("phone", "Phone number")}
          <input id={fid("phone")} name="phone" type="tel" className="field" autoComplete="tel" inputMode="tel"
            value={values.phone} onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} />
          {errorText("phone")}
        </div>
        <div>
          {label("subject", "Subject", true)}
          <input id={fid("subject")} name="subject" className="field" required maxLength={120}
            value={values.subject} onChange={(e) => set("subject", e.target.value)}
            aria-invalid={!!errors.subject} aria-describedby={describedBy("subject")} />
          {errorText("subject")}
        </div>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold">
          Preferred time for a call <span className="font-normal text-muted">(optional)</span>
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={fid("date")} className="mb-1.5 block text-sm">Date</label>
            <input id={fid("date")} name="date" type="date" className="field" min={today}
              value={values.date} onChange={(e) => set("date", e.target.value)}
              aria-invalid={!!errors.date} aria-describedby={describedBy("date")} />
            {errorText("date")}
          </div>
          <div>
            <label htmlFor={fid("time")} className="mb-1.5 block text-sm">Time</label>
            <input id={fid("time")} name="time" type="time" className="field"
              value={values.time} onChange={(e) => set("time", e.target.value)} />
          </div>
        </div>
      </fieldset>

      <div>
        {label("message", "Message", true)}
        <textarea id={fid("message")} name="message" rows={6} className="field" required maxLength={MESSAGE_MAX}
          value={values.message} onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message} aria-describedby={describedBy("message", true)} />
        <p id={`${fid("message")}-hint`} className="mt-1.5 text-sm text-muted">
          {values.message.length} / {MESSAGE_MAX} characters
        </p>
        {errorText("message")}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input id={fid("consent")} name="consent" type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[var(--brand)]"
            checked={values.consent} onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent} aria-describedby={describedBy("consent")} />
          <label htmlFor={fid("consent")} className="text-sm">
            I have read the{" "}
            <Link href="/privacy-policy/" className="text-brand underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            and agree to be contacted about my enquiry. <span className="text-danger" aria-hidden="true">*</span>
          </label>
        </div>
        {errorText("consent")}
      </div>

      <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-md bg-brand px-6 font-semibold text-brand-foreground hover:bg-brand-strong sm:w-auto">
        Prepare email
      </button>

      <div aria-live="polite">
        {mailto === "" && (
          <p role="status" data-testid="form-status" className="rounded-md border-2 border-dashed border-placeholder-border bg-placeholder-bg px-4 py-3 text-sm text-placeholder-text">
            <strong>Your details look good, but this message cannot be sent yet.</strong> NA Enterprises has not
            confirmed its business email address, so the website has nowhere to address it. Nothing has been sent.
          </p>
        )}
        {mailto && (
          <p role="status" data-testid="form-status" className="rounded-md border border-success px-4 py-3 text-sm">
            Your email app should now open with your message ready to send. Nothing has been sent until you press send
            there. If it did not open,{" "}
            <a href={mailto} className="font-semibold text-brand underline underline-offset-2" data-testid="mailto-link">
              open the email manually
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
