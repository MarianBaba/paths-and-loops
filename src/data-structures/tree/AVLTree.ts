class AVLNode<T> {
  value: T;
  left: AVLNode<T> | null = null;
  right: AVLNode<T> | null = null;
  height: number = 1;

  constructor(value: T) {
    this.value = value;
  }
}

export class AVLTree<T> {
  private root: AVLNode<T> | null = null;

  constructor(private compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {}

  // Insert a value
  insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  private _insert(node: AVLNode<T> | null, value: T): AVLNode<T> {
    if (!node) return new AVLNode(value);

    const cmp = this.compareFn(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    else return node; // duplicates ignored

    node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
    return this._balance(node);
  }

  // Remove a value
  remove(value: T): void {
    this.root = this._remove(this.root, value);
  }

  private _remove(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (!node) return null;

    const cmp = this.compareFn(value, node.value);
    if (cmp < 0) node.left = this._remove(node.left, value);
    else if (cmp > 0) node.right = this._remove(node.right, value);
    else {
      // node to remove found
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const minNode = this._minNode(node.right)!;
      node.value = minNode.value;
      node.right = this._remove(node.right, minNode.value);
    }

    node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
    return this._balance(node);
  }

  // Search for a value
  search(value: T): boolean {
    let current = this.root;
    while (current) {
      const cmp = this.compareFn(value, current.value);
      if (cmp === 0) return true;
      current = cmp < 0 ? current.left : current.right;
    }
    return false;
  }

  // Get min value
  min(): T | undefined {
    return this._minNode(this.root)?.value;
  }

  private _minNode(node: AVLNode<T> | null): AVLNode<T> | null {
    if (!node) return null;
    while (node.left) node = node.left;
    return node;
  }

  // Get max value
  max(): T | undefined {
    let node = this.root;
    if (!node) return undefined;
    while (node.right) node = node.right;
    return node.value;
  }

  // Traversals
  inOrder(callback: (value: T) => void): void {
    this._inOrder(this.root, callback);
  }

  private _inOrder(node: AVLNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    this._inOrder(node.left, callback);
    callback(node.value);
    this._inOrder(node.right, callback);
  }

  preOrder(callback: (value: T) => void): void {
    this._preOrder(this.root, callback);
  }

  private _preOrder(node: AVLNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    callback(node.value);
    this._preOrder(node.left, callback);
    this._preOrder(node.right, callback);
  }

  postOrder(callback: (value: T) => void): void {
    this._postOrder(this.root, callback);
  }

  private _postOrder(node: AVLNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    this._postOrder(node.left, callback);
    this._postOrder(node.right, callback);
    callback(node.value);
  }

  toArray(): T[] {
    const result: T[] = [];
    this.inOrder((v) => result.push(v));
    return result;
  }

  clear(): void {
    this.root = null;
  }

  // --- AVL Balancing Helpers ---

  private _height(node: AVLNode<T> | null): number {
    return node ? node.height : 0;
  }

  private _balanceFactor(node: AVLNode<T>): number {
    return this._height(node.left) - this._height(node.right);
  }

  private _balance(node: AVLNode<T>): AVLNode<T> {
    const balance = this._balanceFactor(node);

    // Left heavy
    if (balance > 1) {
      if (this._balanceFactor(node.left!) < 0) {
        node.left = this._leftRotate(node.left!); // LR case
      }
      return this._rightRotate(node); // LL case
    }

    // Right heavy
    if (balance < -1) {
      if (this._balanceFactor(node.right!) > 0) {
        node.right = this._rightRotate(node.right!); // RL case
      }
      return this._leftRotate(node); // RR case
    }

    return node;
  }

  private _leftRotate(x: AVLNode<T>): AVLNode<T> {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = 1 + Math.max(this._height(x.left), this._height(x.right));
    y.height = 1 + Math.max(this._height(y.left), this._height(y.right));

    return y;
  }

  private _rightRotate(y: AVLNode<T>): AVLNode<T> {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = 1 + Math.max(this._height(y.left), this._height(y.right));
    x.height = 1 + Math.max(this._height(x.left), this._height(x.right));

    return x;
  }
}
