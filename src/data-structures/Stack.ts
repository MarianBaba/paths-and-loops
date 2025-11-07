/**
 * Stack is a generic LIFO (last-in-first-out) stack implemented using
 * a contiguous underlying array with dynamic resizing.
 *
 * - Maintains logical size vs physical capacity
 * - Automatically resizes when full (doubling strategy)
 * - Shrinks when utilization drops below a threshold
 * - Provides common stack APIs: push, pop, peek
 * - forEach iterates from top -> bottom (index 0 is the top element)
 */
export class Stack<T> {
  private data: (T | undefined)[];
  private _size: number;
  private _capacity: number;
  private initialCapacity: number;
  private shrinkThreshold: number;

  /**
   * Create a new Stack.
   * @param initialCapacity initial allocated capacity (default 4)
   * @param shrinkThreshold fraction below which the stack shrinks (default 0.3)
   */
  constructor(initialCapacity = 4, shrinkThreshold = 0.3) {
    if (initialCapacity <= 0) {
      throw new Error('initialCapacity must be > 0');
    }
    this.initialCapacity = Math.max(1, Math.floor(initialCapacity));
    this._capacity = this.initialCapacity;
    this.data = new Array<T | undefined>(this._capacity);
    this._size = 0;
    this.shrinkThreshold = shrinkThreshold;
  }

  /** Number of elements currently in the stack (logical size). */
  size(): number {
    return this._size;
  }

  /** True if the stack is empty. */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /** Current physical capacity of the underlying storage. */
  capacity(): number {
    return this._capacity;
  }

  /**
   * Push an item onto the top of the stack.
   * - Amortized O(1). If capacity is full, underlying storage is resized (doubled).
   * @param item the value to push
   */
  push(item: T): void {
    if (this._size === this._capacity) {
      this.resize(this._capacity * 2);
    }
    this.data[this._size] = item;
    this._size++;
  }

  /**
   * Pop the top item from the stack and return it.
   * - Returns undefined when the stack is empty.
   * - May shrink underlying storage when utilization falls below shrinkThreshold.
   */
  pop(): T | undefined {
    if (this._size === 0) return undefined;
    const item = this.data[this._size - 1];
    this.data[this._size - 1] = undefined; // release reference
    this._size--;

    // shrink if underutilized, don't shrink below initialCapacity
    if (this._size > 0 && this._size / this._capacity < this.shrinkThreshold) {
      const newCap = Math.max(Math.floor(this._capacity / 2), this.initialCapacity);
      this.resize(newCap);
    }

    return item;
  }

  /**
   * Peek at the top element without removing it.
   * - Returns undefined if the stack is empty.
   */
  peek(): T | undefined {
    if (this._size === 0) return undefined;
    return this.data[this._size - 1];
  }

  /**
   * Remove all elements and reset capacity to the initial capacity.
   * - Useful to free memory and reset internal state.
   */
  clear(): void {
    this.data = new Array<T | undefined>(this.initialCapacity);
    this._capacity = this.initialCapacity;
    this._size = 0;
  }

  /**
   * Return a standard array copy of the stack contents in order [bottom, ..., top].
   * - Useful for debugging or assertions.
   */
  toArray(): T[] {
    return this.data.slice(0, this._size) as T[];
  }

  /**
   * Iterate over stack elements in LIFO order (top -> bottom).
   * - callback receives (item, index) where index 0 corresponds to the top element.
   */
  forEach(callback: (item: T, index: number) => void): void {
    for (let i = this._size - 1, idx = 0; i >= 0; i--, idx++) {
      callback(this.data[i] as T, idx);
    }
  }

  /**
   * Internal resize helper: allocate new underlying array with newCapacity
   * and copy current logical contents preserving order (bottom -> top).
   * Amortized cost ensures push/pop remain O(1) amortized.
   * @param newCapacity new physical capacity (should be >= size)
   */
  private resize(newCapacity: number): void {
    const cap = Math.max(1, Math.floor(newCapacity));
    const newData: (T | undefined)[] = new Array<T | undefined>(cap);
    for (let i = 0; i < this._size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
    this._capacity = cap;
  }
}
