export function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const count: number[] = Array(max - min + 1).fill(0);

  for (const num of arr) {
    count[num - min]++;
  }

  const sorted: number[] = [];
  for (let i = 0; i < count.length; i++) {
    for (let j = 0; j < count[i]; j++) {
      sorted.push(i + min);
    }
  }

  return sorted;
}
