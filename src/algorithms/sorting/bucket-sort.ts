export function bucketSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketCount = Math.floor(Math.sqrt(arr.length)) || 1;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  const range = (max - min + 1) / bucketCount;

  for (const num of arr) {
    const idx = Math.min(bucketCount - 1, Math.floor((num - min) / range));
    buckets[idx].push(num);
  }

  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
  }

  return ([] as number[]).concat(...buckets);
}
