import type { Location, User } from "@/types";

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

/**
 * Triggers a download of the given blob as a file with the given filename.
 * @param blob - The blob to download. Must be a `Blob` instance.
 * @param filename - The desired filename for the download. Must be a string.
 * @returns Nothing.
 */
const triggerDownload = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Downloads the given data as a JSON file.
 * @param data - The data to serialize to JSON.
 * @param filename - The desired filename for the download.
 * @returns Nothing.
 */
export const downloadJSON = <T>(data: T, filename: string): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  triggerDownload(blob, filename);
};

/**
 * Downloads the given array of user data as a CSV file.
 * @param data - The array of user data to serialize to CSV.
 * @param filename - The desired filename for the download.
 * @returns Nothing.
 */
export function downloadCSV(data: ReadonlyArray<User>, filename: string): void {
  const headers = Object.keys(data[0] as User).join(",");
  const rows = data.map((item) =>
    Object.values(item as User)
      .map((val) => `"${String(val).replace(/"/g, '""')}"`)
      .join(","),
  );
  const csv = [headers, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  triggerDownload(blob, filename);
}
