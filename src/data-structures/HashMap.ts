/**
 * HashMap<K, V> — a generic hash map (hash table) implemented with
 * separate chaining (buckets).
 *
 * - Maintains logical size (#entries) and physical capacity (#buckets)
 * - Automatically resizes (rehashes) when load factor crosses thresholds
 * - Default hashing supports primitives (string/number/boolean/symbol) and
 *   object identity via a private WeakMap assigning stable ids to objects.
 * - Optionally accept user-supplied hash and equals functions for custom keys.
 *
 * Complexity:
 *  - Average: O(1) for get/set/delete
 *  - Worst-case: O(n) (many collisions), mitigated by resizing
 */
export class HashMap<K, V> {
  private buckets: Array<Array<[K, V]>>;
  private _size: number;
  private _capacity: number;
  private maxLoadFactor: number;
  private minLoadFactor: number;
  private initialCapacity: number;
  private objectId: WeakMap<object, number>;
  private nextId: number;
  private hashFn?: (key: K) => number;
  private equalsFn?: (a: K, b: K) => boolean;

  /**
   * Construct a HashMap.
   * @param initialCapacity Initial number of buckets (default 16). Prefer power of two for doubling strategy.
   * @param maxLoadFactor When (size / capacity) > maxLoadFactor, the table grows. Default 0.75.
   * @param minLoadFactor When (size / capacity) < minLoadFactor, the table shrinks. Default 0.2.
   * @param hashFn Optional hash function that maps keys to numbers. If omitted, a default is used.
   * @param equalsFn Optional equality comparator for keys. Defaults to strict equality for primitives and identity for objects.
   */
  constructor(
    initialCapacity = 16,
    maxLoadFactor = 0.75,
    minLoadFactor = 0.2,
    hashFn?: (key: K) => number,
    equalsFn?: (a: K, b: K) => boolean,
  ) {
    const cap = Math.max(1, Math.floor(initialCapacity));
    this.initialCapacity = cap;
    this._capacity = cap;
    this.buckets = new Array(this._capacity);
    for (let i = 0; i < this._capacity; i++) this.buckets[i] = [];
    this._size = 0;
    this.maxLoadFactor = maxLoadFactor;
    this.minLoadFactor = minLoadFactor;
    this.objectId = new WeakMap();
    this.nextId = 1;
    this.hashFn = hashFn;
    this.equalsFn = equalsFn;
  }

  /** Number of entries in the map (logical size). */
  size(): number {
    return this._size;
  }

  /** Number of buckets (physical capacity). */
  capacity(): number {
    return this._capacity;
  }

  /**
   * Put a key/value pair into the map (overwrites existing value for key).
   * Alias: set.
   * @param key
   * @param value
   */
  set(key: K, value: V): void {
    this.put(key, value);
  }

  /** alias for set */
  put(key: K, value: V): void {
    if (this._size / this._capacity > this.maxLoadFactor) {
      this.rehash(this._capacity * 2);
    }

    const idx = this.bucketIndexFor(key);
    const bucket = this.buckets[idx];

    for (let i = 0; i < bucket.length; i++) {
      const [k] = bucket[i];
      if (this.keysEqual(k, key)) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this._size++;
  }

  /**
   * Get the value for a key, or undefined if not present.
   * @param key
   */
  get(key: K): V | undefined {
    const idx = this.bucketIndexFor(key);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      const [k, v] = bucket[i];
      if (this.keysEqual(k, key)) return v;
    }
    return undefined;
  }

  /**
   * Return true if the key exists in the map.
   * @param key
   */
  has(key: K): boolean {
    const idx = this.bucketIndexFor(key);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (this.keysEqual(bucket[i][0], key)) return true;
    }
    return false;
  }

  /**
   * Delete a key from the map. Returns true if the key was present.
   * Shrinks the table if utilization falls below minLoadFactor.
   * @param key
   */
  delete(key: K): boolean {
    const idx = this.bucketIndexFor(key);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (this.keysEqual(bucket[i][0], key)) {
        bucket.splice(i, 1);
        this._size--;
        if (
          this._capacity > this.initialCapacity &&
          this._size / this._capacity < this.minLoadFactor
        ) {
          const newCap = Math.max(this.initialCapacity, Math.floor(this._capacity / 2));
          this.rehash(newCap);
        }
        return true;
      }
    }
    return false;
  }

  /** Remove all entries and reset capacity to initial capacity. */
  clear(): void {
    this._capacity = this.initialCapacity;
    this.buckets = new Array(this._capacity);
    for (let i = 0; i < this._capacity; i++) this.buckets[i] = [];
    this._size = 0;
    // weakmap and object ids can remain; they are only used for object hashing
  }

  /** Return an array of keys (iteration order: bucket order, then insertion order inside bucket). */
  keys(): K[] {
    const out: K[] = [];
    for (let b = 0; b < this._capacity; b++) {
      const bucket = this.buckets[b];
      for (let i = 0; i < bucket.length; i++) {
        out.push(bucket[i][0]);
      }
    }
    return out;
  }

  /** Return an array of values in the same iteration order as keys(). */
  values(): V[] {
    const out: V[] = [];
    for (let b = 0; b < this._capacity; b++) {
      const bucket = this.buckets[b];
      for (let i = 0; i < bucket.length; i++) {
        out.push(bucket[i][1]);
      }
    }
    return out;
  }

  /** Return an array of [key, value] entries. */
  entries(): Array<[K, V]> {
    const out: Array<[K, V]> = [];
    for (let b = 0; b < this._capacity; b++) {
      const bucket = this.buckets[b];
      for (let i = 0; i < bucket.length; i++) {
        out.push([bucket[i][0], bucket[i][1]]);
      }
    }
    return out;
  }

  /**
   * Iterate all entries in the map and call callback(value, key).
   * Iteration order follows keys()/values()/entries() order.
   */
  forEach(callback: (value: V, key: K) => void): void {
    for (let b = 0; b < this._capacity; b++) {
      const bucket = this.buckets[b];
      for (let i = 0; i < bucket.length; i++) {
        const [k, v] = bucket[i];
        callback(v, k);
      }
    }
  }

  // -----------------------
  // Internal helpers
  // -----------------------

  /** Compute the bucket index for a key (non-negative integer modulo capacity). */
  private bucketIndexFor(key: K): number {
    const h = this.hash(key);
    // ensure non-negative integer
    const idx = Math.abs(h) % this._capacity;
    return idx;
  }

  /**
   * Hash a key to a number.
   * - If user provided a hashFn, use it.
   * - For primitives, use simple stable hashing (strings via djb2).
   * - For objects, assign a stable id via WeakMap.
   */
  private hash(key: K): number {
    if (this.hashFn) return Math.floor(this.hashFn(key));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t = typeof (key as any);
    if (t === 'number') {
      // handle NaN and infinities
      const n = Number(key as unknown as number);
      if (Number.isNaN(n)) return 0;
      // mix bits
      let h = n | 0;
      if (h !== n) h ^= Math.floor(n);
      return h;
    }

    if (t === 'string') {
      return this.hashString(key as unknown as string);
    }

    if (t === 'boolean') {
      return (key as unknown as boolean) ? 1231 : 1237;
    }

    if (t === 'symbol') {
      return this.hashString((key as unknown as symbol).toString());
    }

    // object (including functions)
    const obj = key as unknown as object;
    let id = this.objectId.get(obj);
    if (!id) {
      id = this.nextId++;
      try {
        this.objectId.set(obj, id);
      } catch {
        // WeakMap may throw for primitive wrappers, fall back
      }
    }
    return id;
  }

  /** Default string hash (djb2) */
  private hashString(s: string): number {
    let h = 5381;
    for (let i = 0; i < s.length; i++) {
      h = (h * 33) ^ s.charCodeAt(i);
    }
    return h >>> 0; // return unsigned 32-bit
  }

  /** Key equality check: use equalsFn if provided, otherwise strict equality / object identity. */
  private keysEqual(a: K, b: K): boolean {
    if (this.equalsFn) return this.equalsFn(a, b);
    if (typeof a === 'number' && typeof b === 'number') {
      return Object.is(a, b); // handles NaN and ±0 correctly
    }
    return a === b;
  }

  /** Rehash into a new bucket array with `newCapacity` buckets. */
  private rehash(newCapacity: number): void {
    const cap = Math.max(1, Math.floor(newCapacity));
    const oldBuckets = this.buckets;
    this.buckets = new Array(cap);
    for (let i = 0; i < cap; i++) this.buckets[i] = [];
    const oldSize = this._size;
    this._size = 0;
    this._capacity = cap;

    for (let b = 0; b < oldBuckets.length; b++) {
      const bucket = oldBuckets[b];
      for (let i = 0; i < bucket.length; i++) {
        const [k, v] = bucket[i];
        // reuse put logic but avoid recursive rehash trigger by directly inserting
        const idx = this.bucketIndexFor(k);
        this.buckets[idx].push([k, v]);
        this._size++;
      }
    }

    // sanity: restore size if mismatch
    if (this._size !== oldSize) {
      // Shouldn't happen, but keep consistent
      this._size = oldSize;
    }
  }
}
