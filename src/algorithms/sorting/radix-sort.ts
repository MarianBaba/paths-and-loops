export function radixSort(arr: number[]): number[] {
  const a = [...arr];
  const maxNum = Math.max(...a);
  let exp = 1;

  while (Math.floor(maxNum / exp) > 0) {
    const output = new Array(a.length).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < a.length; i++) {
      const digit = Math.floor(a[i] / exp) % 10;
      count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = a.length - 1; i >= 0; i--) {
      const digit = Math.floor(a[i] / exp) % 10;
      output[count[digit] - 1] = a[i];
      count[digit]--;
    }

    for (let i = 0; i < a.length; i++) {
      a[i] = output[i];
    }

    exp *= 10;
  }

  return a;
}
