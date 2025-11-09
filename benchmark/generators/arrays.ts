export type RNG = () => number;

export function seededRNG(seed = 42): RNG {
  let x = seed >>> 0;
  return () => {
    // Park-Miller LCG-ish simple deterministic generator
    x = (x * 48271) % 0x7fffffff;
    return x / 0x7fffffff;
  };
}

export function genRandomIntArray(n: number, max = 1_000_000, seed = 42): number[] {
  const rand = seededRNG(seed);
  const a: number[] = new Array(n);
  for (let i = 0; i < n; i++) a[i] = Math.floor(rand() * max);
  return a;
}

export function genNearlySortedArray(
  n: number,
  swaps = Math.max(1, Math.floor(n * 0.01)),
  seed = 42,
): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  const rand = seededRNG(seed);
  for (let s = 0; s < swaps; s++) {
    const i = Math.floor(rand() * n);
    const j = Math.floor(rand() * n);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function genReverseSortedArray(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => n - i);
  return a;
}

export function genFewUniqueArray(
  n: number,
  uniqueCount = Math.max(2, Math.floor(n / 10)),
  seed = 42,
): number[] {
  const rand = seededRNG(seed);
  const values = new Array(uniqueCount);
  for (let i = 0; i < uniqueCount; i++) values[i] = Math.floor(rand() * 1_000_000);
  const a = new Array(n);
  for (let i = 0; i < n; i++) a[i] = values[Math.floor(rand() * uniqueCount)];
  return a;
}

export function genRandomStringArray(n: number, strLen = 8, seed = 42): string[] {
  const rand = seededRNG(seed);
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const arr: string[] = new Array(n);
  for (let i = 0; i < n; i++) {
    let s = '';
    for (let j = 0; j < strLen; j++) s += chars[Math.floor(rand() * chars.length)];
    arr[i] = s;
  }
  return arr;
}

// Export a small map of presets for quick use
export const presets = {
  smallRandom: (seed = 42) => genRandomIntArray(100, 1000, seed),
  mediumRandom: (seed = 42) => genRandomIntArray(1000, 1_000_000, seed),
  largeRandom: (seed = 42) => genRandomIntArray(10_000, 1_000_000, seed),
};
