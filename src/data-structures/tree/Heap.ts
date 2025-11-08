export class Heap<T> {
  private data: T[] = [];

  constructor(private compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {}

  size(): number {
    return this.data.length;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  insert(value: T): void {
    this.data.push(value);
    this._heapifyUp(this.data.length - 1);
  }

  extract(): T | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this._heapifyDown(0);
    }
    return top;
  }

  clear(): void {
    this.data = [];
  }

  toArray(): T[] {
    return [...this.data];
  }

  // --- Internal helpers ---
  private _heapifyUp(index: number): void {
    let current = index;
    const value = this.data[current];

    while (current > 0) {
      const parentIndex = Math.floor((current - 1) / 2);
      const parent = this.data[parentIndex];
      if (this.compareFn(value, parent) >= 0) break;
      this.data[current] = parent;
      current = parentIndex;
    }

    this.data[current] = value;
  }

  private _heapifyDown(index: number): void {
    const length = this.data.length;
    let current = index;
    const value = this.data[current];

    while (true) {
      const left = 2 * current + 1;
      const right = 2 * current + 2;
      let smallest = current;

      if (left < length && this.compareFn(this.data[left], this.data[smallest]) < 0) {
        smallest = left;
      }
      if (right < length && this.compareFn(this.data[right], this.data[smallest]) < 0) {
        smallest = right;
      }

      if (smallest === current) break;

      this.data[current] = this.data[smallest];
      current = smallest;
    }

    this.data[current] = value;
  }
}
