export function bubbleSort<T>(arr: T[]): T[] {
  const a = [...arr];
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < a.length - 1; i++) {
      if (a[i] > a[i + 1]) {
        const tmp = a[i];
        a[i] = a[i + 1];
        a[i + 1] = tmp;
        swapped = true;
      }
    }
  }
  return a;
}
