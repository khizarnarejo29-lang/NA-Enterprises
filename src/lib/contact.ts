/**
 * `tel:` link for a human-formatted phone number. Spaces, dashes, dots and
 * brackets are stripped, and a local number with a leading 0 is converted to
 * international form so the link also works from abroad:
 *   "0313 2759207"     -> "tel:+923132759207"
 *   "+92 313 2759207"  -> "tel:+923132759207"
 */
export function telHref(phone: string, countryCode = "92") {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+")) return `tel:+${digits}`;
  if (digits.startsWith("00")) return `tel:+${digits.slice(2)}`;
  if (digits.startsWith("0")) return `tel:+${countryCode}${digits.slice(1)}`;
  return `tel:${digits}`;
}

/** The same number in international form, for structured data. */
export function internationalPhone(phone: string, countryCode = "92") {
  return telHref(phone, countryCode).slice("tel:".length);
}

export function mailtoHref(email: string) {
  return `mailto:${email.trim()}`;
}
