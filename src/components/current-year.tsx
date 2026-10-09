"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

/**
 * The current calendar year. The static HTML contains `buildYear`; after
 * hydration React re-renders with the visitor's current year, so the footer
 * stays correct even if the site is not rebuilt after New Year.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  return useSyncExternalStore(subscribe, getYear, () => buildYear);
}
