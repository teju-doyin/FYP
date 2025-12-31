import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatStringDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }); // e.g. "Sunday, 28 December 2025" [web:373][web:388]
}

export function formatFeedbackDate(d: Date): string {
  const now = new Date();

  // strip time
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thatDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const diffMs = today.getTime() - thatDay.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  // e.g. "March 12"
  return d.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  });
}

