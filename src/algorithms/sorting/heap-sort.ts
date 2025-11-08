export function heapSort(arr: number[]): number[] {
  const a = [...arr];

  function heapify(n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && a[left] > a[largest]) largest = left;
    if (right < n && a[right] > a[largest]) largest = right;

    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      heapify(n, largest);
    }
  }

  const n = a.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i >= 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    heapify(i, 0);
  }

  return a;
}
