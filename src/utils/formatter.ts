import type { Location } from "@/types";

/**
 * Formats a location object into a single address string.
 * @param data - The location data object.
 * @returns The formatted address string.
 */
export function formatAddress(data: Location): string {
  const { street, city, state, postcode, country } = data;

  return `${street.number} ${street.name}, ${city}, ${state} ${postcode}, ${country}`;
}

/**
 * Capitalizes a string by uppercasing the first letter of each word.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string): string {
  return str.replace(/\b\w/g, (char: string): string => char.toUpperCase());
}
