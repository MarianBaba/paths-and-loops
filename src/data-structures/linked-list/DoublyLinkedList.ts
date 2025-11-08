// Node class for Doubly Linked List
class DoublyNode<T> {
  value: T;
  next: DoublyNode<T> | null = null;
  prev: DoublyNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// Doubly Linked List
export class DoublyLinkedList<T> {
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  private _size: number = 0;

  // Current size of the list
  get size(): number {
    return this._size;
  }

  // Add value to the end
  add(value: T): void {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this._size++;
  }

  // Add value to the beginning
  addFirst(value: T): void {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this._size++;
  }

  // Get value at index
  get(index: number): T | undefined {
    return this._getNode(index)?.value;
  }

  // Set value at index
  set(index: number, value: T): void {
    const node = this._getNode(index);
    if (node) node.value = value;
  }

  // Remove node at index
  removeAt(index: number): T {
    this._validateIndex(index);
    const node = this._getNode(index)!;
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    this._size--;
    return node.value;
  }

  // Remove first occurrence of value
  remove(value: T): boolean {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (current.prev) current.prev.next = current.next;
        else this.head = current.next;

        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev;

        this._size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Find index of value
  indexOf(value: T): number {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  // Check if value exists
  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  // Iterate forward
  forEach(callback: (value: T, index: number) => void): void {
    let current = this.head;
    let index = 0;
    while (current) {
      callback(current.value, index);
      current = current.next;
      index++;
    }
  }

  // Map to new array
  map<U>(callback: (value: T, index: number) => U): U[] {
    const result: U[] = [];
    this.forEach((v, i) => result.push(callback(v, i)));
    return result;
  }

  // Filter to new array
  filter(callback: (value: T, index: number) => boolean): T[] {
    const result: T[] = [];
    this.forEach((v, i) => {
      if (callback(v, i)) result.push(v);
    });
    return result;
  }

  // Reduce to single value
  reduce<U>(callback: (acc: U, value: T, index: number) => U, initialValue: U): U {
    let acc = initialValue;
    this.forEach((v, i) => {
      acc = callback(acc, v, i);
    });
    return acc;
  }

  // Convert list to array
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  // Clear the list
  clear(): void {
    this.head = this.tail = null;
    this._size = 0;
  }

  // Optional: iterate backward
  forEachReverse(callback: (value: T, index: number) => void): void {
    let current = this.tail;
    let index = this._size - 1;
    while (current) {
      callback(current.value, index);
      current = current.prev;
      index--;
    }
  }

  // Private helpers
  private _getNode(index: number): DoublyNode<T> | null {
    this._validateIndex(index);
    let current: DoublyNode<T>;
    // Optimization: start from head or tail depending on index
    if (index < this._size / 2) {
      current = this.head!;
      for (let i = 0; i < index; i++) current = current.next!;
    } else {
      current = this.tail!;
      for (let i = this._size - 1; i > index; i--) current = current.prev!;
    }
    return current;
  }

  private _validateIndex(index: number): void {
    if (index < 0 || index >= this._size) throw new RangeError(`Index ${index} out of bounds`);
  }
}
