// Node class for internal use
class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// Singly Linked List
export class LinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _size: number = 0;

  // Get the current size of the list
  get size(): number {
    return this._size;
  }

  // Add value to the end of the list
  add(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this._size++;
  }

  // Add value at the beginning of the list
  addFirst(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this._size++;
  }

  // Get value at a specific index
  get(index: number): T | undefined {
    this._validateIndex(index);
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current!.value;
  }

  // Set value at a specific index
  set(index: number, value: T): void {
    this._validateIndex(index);
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    current!.value = value;
  }

  // Remove element at a specific index
  removeAt(index: number): T {
    this._validateIndex(index);

    let removedValue: T;

    if (index === 0) {
      removedValue = this.head!.value;
      this.head = this.head!.next;
      if (this._size === 1) this.tail = null;
    } else {
      const prev = this._getNode(index - 1);
      removedValue = prev.next!.value;
      prev.next = prev.next!.next;
      if (index === this._size - 1) this.tail = prev;
    }

    this._size--;
    return removedValue;
  }

  // Remove first occurrence of a value
  remove(value: T): boolean {
    if (!this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;
      if (this._size === 1) this.tail = null;
      this._size--;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      if (current.next === this.tail) this.tail = current;
      current.next = current.next.next;
      this._size--;
      return true;
    }

    return false;
  }

  // Find index of a value
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

  // Iterate through all elements
  forEach(callback: (value: T, index: number) => void): void {
    let current = this.head;
    let index = 0;
    while (current) {
      callback(current.value, index);
      current = current.next;
      index++;
    }
  }

  // Map values to a new array
  map<U>(callback: (value: T, index: number) => U): U[] {
    const result: U[] = [];
    let current = this.head;
    let index = 0;
    while (current) {
      result.push(callback(current.value, index));
      current = current.next;
      index++;
    }
    return result;
  }

  // Filter values to a new array
  filter(callback: (value: T, index: number) => boolean): T[] {
    const result: T[] = [];
    let current = this.head;
    let index = 0;
    while (current) {
      if (callback(current.value, index)) {
        result.push(current.value);
      }
      current = current.next;
      index++;
    }
    return result;
  }

  // Reduce to a single value
  reduce<U>(callback: (acc: U, value: T, index: number) => U, initialValue: U): U {
    let acc = initialValue;
    let current = this.head;
    let index = 0;
    while (current) {
      acc = callback(acc, current.value, index);
      current = current.next;
      index++;
    }
    return acc;
  }

  // Clear the list
  clear(): void {
    this.head = this.tail = null;
    this._size = 0;
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

  // Private helper: validate index
  private _validateIndex(index: number): void {
    if (index < 0 || index >= this._size) {
      throw new RangeError(`Index ${index} out of bounds`);
    }
  }

  // Private helper: get node at index
  private _getNode(index: number): Node<T> {
    this._validateIndex(index);
    let current = this.head!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    return current;
  }
}
