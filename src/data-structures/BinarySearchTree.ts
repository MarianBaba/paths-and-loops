// Node class for BST
class BSTNode<T> {
  value: T;
  left: BSTNode<T> | null = null;
  right: BSTNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// Binary Search Tree
export class BinarySearchTree<T> {
  private root: BSTNode<T> | null = null;

  constructor(private compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {}

  // Insert a value
  insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  private _insert(node: BSTNode<T> | null, value: T): BSTNode<T> {
    if (!node) return new BSTNode(value);
    const cmp = this.compareFn(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    // Duplicate values are ignored
    return node;
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

  // Remove a value
  remove(value: T): void {
    this.root = this._remove(this.root, value);
  }

  private _remove(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
    if (!node) return null;

    const cmp = this.compareFn(value, node.value);
    if (cmp < 0) node.left = this._remove(node.left, value);
    else if (cmp > 0) node.right = this._remove(node.right, value);
    else {
      // Node to remove found
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Node with two children: replace with min of right subtree
      const minNode = this._minNode(node.right);
      node.value = minNode!.value;
      node.right = this._remove(node.right, minNode!.value);
    }
    return node;
  }

  // Find min value
  min(): T | undefined {
    const node = this._minNode(this.root);
    return node?.value;
  }

  private _minNode(node: BSTNode<T> | null): BSTNode<T> | null {
    if (!node) return null;
    while (node.left) node = node.left;
    return node;
  }

  // Find max value
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

  private _inOrder(node: BSTNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    this._inOrder(node.left, callback);
    callback(node.value);
    this._inOrder(node.right, callback);
  }

  preOrder(callback: (value: T) => void): void {
    this._preOrder(this.root, callback);
  }

  private _preOrder(node: BSTNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    callback(node.value);
    this._preOrder(node.left, callback);
    this._preOrder(node.right, callback);
  }

  postOrder(callback: (value: T) => void): void {
    this._postOrder(this.root, callback);
  }

  private _postOrder(node: BSTNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    this._postOrder(node.left, callback);
    this._postOrder(node.right, callback);
    callback(node.value);
  }

  // Convert BST to sorted array
  toArray(): T[] {
    const result: T[] = [];
    this.inOrder((v) => result.push(v));
    return result;
  }

  // Clear the tree
  clear(): void {
    this.root = null;
  }
}
