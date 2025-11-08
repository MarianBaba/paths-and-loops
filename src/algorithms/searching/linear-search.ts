/**
 * Performs a linear search over an array and returns the index
 * of the target if found, otherwise -1.
 */
export function linearSearch<T>(arr: T[], target: T): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}
