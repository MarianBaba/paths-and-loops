// Linear Search implementation in TypeScript

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

/**
 * Binary Search — works on sorted arrays.
 * Returns the index of the target if found, otherwise -1.
 */
export function binarySearch<T>(arr: T[], target: T): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
