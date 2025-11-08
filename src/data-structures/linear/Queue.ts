/**
 * Queue is a generic FIFO (first-in-first-out) queue implemented using
 * a circular buffer (ring buffer) under the hood.
 *
 * - O(1) amortized enqueue and dequeue
 * - Uses a fixed-size underlying array (capacity) and resizes by doubling when full
 * - Optionally shrinks when utilization drops below shrinkThreshold
 * - Exposes utility methods commonly useful in algorithms and systems code
 */
export class Queue<T> {
  private data: (T | undefined)[];
  private head: number; // index of the first element
  private tail: number; // index where the next element will be written
  private _size: number;
  private _capacity: number;
  private initialCapacity: number;
  private shrinkThreshold: number;

  /**
   * Construct a Queue with an initial capacity.
   * @param initialCapacity initial physical capacity (default 8)
   * @param shrinkThreshold fraction below which the buffer will shrink (default 0.25)
   */
  constructor(initialCapacity = 8, shrinkThreshold = 0.25) {
    if (initialCapacity <= 0) {
      throw new Error('initialCapacity must be > 0');
    }
    this.initialCapacity = Math.max(1, Math.floor(initialCapacity));
    this._capacity = this.initialCapacity;
    this.data = new Array<T | undefined>(this._capacity);
    this.head = 0;
    this.tail = 0;
    this._size = 0;
    this.shrinkThreshold = shrinkThreshold;
  }

  /** Returns the number of elements currently stored in the queue */
  size(): number {
    return this._size;
  }

  /** Returns true if the queue has no elements */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /** Returns the current physical capacity of the underlying buffer */
  capacity(): number {
    return this._capacity;
  }

  /**
   * Enqueue an element at the tail of the queue.
   * - If the buffer is full, the buffer is resized (doubled) and elements are repositioned.
   * @param item item to enqueue
   */
  enqueue(item: T): void {
    if (this._size === this._capacity) {
      this.resize(this._capacity * 2);
    }
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this._capacity;
    this._size++;
  }

  /**
   * Dequeue the element from the head of the queue and return it.
   * - Returns undefined when the queue is empty.
   * - Shrinks the buffer if utilization falls below the shrinkThreshold.
   */
  dequeue(): T | undefined {
    if (this._size === 0) return undefined;
    const item = this.data[this.head];
    this.data[this.head] = undefined; // release reference
    this.head = (this.head + 1) % this._capacity;
    this._size--;

    // shrink if underutilized, but never below initialCapacity
    if (this._size > 0 && this._size / this._capacity < this.shrinkThreshold) {
      const newCap = Math.max(Math.floor(this._capacity / 2), this.initialCapacity);
      this.resize(newCap);
    }

    // if queue is empty, reset head/tail to zero for predictability
    if (this._size === 0) {
      this.head = 0;
      this.tail = 0;
    }

    return item;
  }

  /**
   * Peek at the front element without removing it.
   * Returns undefined if the queue is empty.
   */
  peek(): T | undefined {
    if (this._size === 0) return undefined;
    return this.data[this.head];
  }

  /**
   * Remove all elements and reset capacity to the initial capacity.
   */
  clear(): void {
    this.data = new Array<T | undefined>(this.initialCapacity);
    this._capacity = this.initialCapacity;
    this._size = 0;
    this.head = 0;
    this.tail = 0;
  }

  /**
   * Return a linear array copy of the queue contents in FIFO order.
   */
  toArray(): T[] {
    const out: T[] = new Array(this._size);
    for (let i = 0; i < this._size; i++) {
      const idx = (this.head + i) % this._capacity;
      out[i] = this.data[idx] as T;
    }
    return out;
  }

  /**
   * Iterate over each element in FIFO order and call the callback.
   * Callback receives (item, index) where index is 0-based from the head.
   */
  forEach(callback: (item: T, index: number) => void): void {
    for (let i = 0; i < this._size; i++) {
      const idx = (this.head + i) % this._capacity;
      callback(this.data[idx] as T, i);
    }
  }

  /**
   * Internal helper to resize the underlying buffer to newCapacity.
   * Copies current elements into the new buffer starting at index 0,
   * and resets head/tail indices accordingly.
   */
  private resize(newCapacity: number): void {
    const cap = Math.max(1, Math.floor(newCapacity));
    const newData: (T | undefined)[] = new Array<T | undefined>(cap);
    // copy items in order starting from head
    for (let i = 0; i < this._size; i++) {
      const idx = (this.head + i) % this._capacity;
      newData[i] = this.data[idx];
    }
    this.data = newData;
    this._capacity = cap;
    this.head = 0;
    this.tail = this._size % this._capacity;
  }
}
