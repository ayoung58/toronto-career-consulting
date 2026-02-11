/**
 * Utility functions for the application
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 * Combines clsx for conditional classes with tailwind-merge for deduplication
 *
 * @example
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4' (px-2 is overridden)
 * cn('text-red-500', false && 'text-blue-500') // => 'text-red-500'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency (CAD)
 * @param amount - The amount to format
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(50000) // => '$50,000'
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Truncate text to a specified length
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 *
 * @example
 * truncate('Long text here', 10) // => 'Long tex...'
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Create a URL-friendly slug from text
 * @param text - The text to slugify
 * @returns URL-friendly slug
 *
 * @example
 * slugify('Data Analytics Program') // => 'data-analytics-program'
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Format a date string to a localized format
 * @param dateString - ISO date string
 * @param locale - Locale to use (defaults to 'en-CA')
 * @returns Formatted date string
 *
 * @example
 * formatDate('2024-01-15') // => 'January 15, 2024'
 */
export function formatDate(
  dateString: string,
  locale: string = "en-CA",
): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
