/**
 * DynamicArray is a generic dynamic array implementation
 *
 * - Maintains logical size vs physical capacity
 * - Automatically resizes when full (doubling strategy)
 * - Shrinks when utilization drops below threshold
 * - Supports functional-style iteration methods (map, filter, reduce)
 */
export class DynamicArray<T> {
  private data: (T | undefined)[];
  private _size: number;
  private _capacity: number;
  private shrinkThreshold: number;
  private initialCapacity: number;

  constructor(initialCapacity = 4, shrinkThreshold = 0.3) {
    this._capacity = initialCapacity;
    this.initialCapacity = initialCapacity;
    this.data = new Array<T | undefined>(this._capacity);
    this._size = 0;
    this.shrinkThreshold = shrinkThreshold;
  }

  /** Returns the current number of elements */
  size(): number {
    return this._size;
  }

  /** Returns the current capacity of the underlying array */
  capacity(): number {
    return this._capacity;
  }

  /** Adds an element at the end, resizing if necessary */
  push(item: T): void {
    if (this._size === this._capacity) {
      this.resize(this._capacity * 2);
    }
    this.data[this._size] = item;
    this._size++;
  }

  /** Removes and returns the last element, shrinking if underutilized */
  pop(): T | undefined {
    if (this._size === 0) {
      return undefined;
    }
    const item = this.data[this._size - 1];
    this.data[this._size - 1] = undefined;
    this._size--;

    if (this._size > 0 && this._size / this._capacity < this.shrinkThreshold) {
      this.resize(
        Math.max(Math.floor(this._capacity / 2), this.initialCapacity),
      );
    }

    return item;
  }

  /** Returns the element at a specific index */
  get(index: number): T | undefined {
    if (index < 0 || index >= this._size) {
      return undefined;
    }
    return this.data[index];
  }

  /** Sets/replaces the element at a specific index */
  set(index: number, value: T): void {
    if (index < 0 || index >= this._size) {
      throw new Error("Index out of bounds");
    }
    this.data[index] = value;
  }

  /** Inserts an element at a specific index, shifting elements right */
  insert(index: number, value: T): void {
    if (index < 0 || index > this._size) {
      throw new Error("Index out of bounds");
    }
    if (this._size === this._capacity) {
      this.resize(this._capacity * 2);
    }

    for (let i = this._size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = value;
    this._size++;
  }

  /** Removes an element at a specific index, shifting elements left */
  remove(index: number): T | undefined {
    if (index < 0 || index >= this._size) {
      return undefined;
    }
    const removed = this.data[index];
    for (let i = index; i < this._size - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.data[this._size - 1] = undefined;
    this._size--;

    if (this._size > 0 && this._size / this._capacity < this.shrinkThreshold) {
      this.resize(
        Math.max(Math.floor(this._capacity / 2), this.initialCapacity),
      );
    }

    return removed;
  }

  /** Returns the index of the first occurrence of an item, or -1 */
  indexOf(item: T): number {
    for (let i = 0; i < this._size; i++) {
      if (this.data[i] === item) {
        return i;
      }
    }
    return -1;
  }

  /** Checks whether the item exists in the array */
  contains(item: T): boolean {
    return this.indexOf(item) !== -1;
  }

  /** Removes all elements and optionally resets capacity */
  clear(): void {
    this.data = new Array<T | undefined>(this.initialCapacity);
    this._capacity = this.initialCapacity;
    this._size = 0;
  }

  /** Returns a copy of the logical contents as a standard array */
  toArray(): T[] {
    return this.data.slice(0, this._size) as T[];
  }

  /** Iterates over all elements with a callback */
  forEach(callback: (item: T, index: number) => void): void {
    for (let i = 0; i < this._size; i++) {
      callback(this.data[i]!, i);
    }
  }

  /** Returns a new DynamicArray with mapped elements */
  map<U>(callback: (item: T, index: number) => U): DynamicArray<U> {
    const result = new DynamicArray<U>(this._capacity);
    for (let i = 0; i < this._size; i++) {
      result.push(callback(this.data[i]!, i));
    }
    return result;
  }

  /** Returns a new DynamicArray with elements that pass the test */
  filter(callback: (item: T, index: number) => boolean): DynamicArray<T> {
    const result = new DynamicArray<T>(this._capacity);
    for (let i = 0; i < this._size; i++) {
      const item = this.data[i]!;
      if (callback(item, i)) {
        result.push(item);
      }
    }
    return result;
  }

  /** Reduces the array to a single value */
  reduce<U>(
    callback: (acc: U, item: T, index: number) => U,
    initialValue: U,
  ): U {
    let acc = initialValue;
    for (let i = 0; i < this._size; i++) {
      acc = callback(acc, this.data[i]!, i);
    }
    return acc;
  }

  /** Internal method to resize underlying array */
  private resize(newCapacity: number): void {
    const newData: (T | undefined)[] = new Array(newCapacity);
    for (let i = 0; i < this._size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
    this._capacity = newCapacity;
  }
}
