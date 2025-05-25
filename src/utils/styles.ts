/**
 * Concatenates truthy classes into a space-separated string.
 *
 * @param classes - The classes to concatenate.
 * @returns The concatenated classes.
 */
export const clx = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Calculates an opacity value based on the given index and count.
 *
 * @param index - The index of the item.
 * @param count - The total count of items.
 * @returns An object with the calculated opacity value.
 */
export const getOpacityStyle = (
  index: number,
  count: number | string,
): { opacity: number } => {
  const numCount = typeof count === "number" ? count : Number(count);
  return { opacity: (index + 1) / numCount };
};
