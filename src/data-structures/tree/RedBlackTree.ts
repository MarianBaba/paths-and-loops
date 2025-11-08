export enum Color {
  RED = 'RED',
  BLACK = 'BLACK',
}

class RBNode<T> {
  value: T;
  color: Color;
  left: RBNode<T> | null = null;
  right: RBNode<T> | null = null;
  parent: RBNode<T> | null = null;

  constructor(value: T, color: Color = Color.RED) {
    this.value = value;
    this.color = color;
  }
}

export class RedBlackTree<T> {
  private root: RBNode<T> | null = null;

  constructor(private compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {}

  insert(value: T): void {
    const newNode = new RBNode(value);
    this.root = this._bstInsert(this.root, newNode);
    this._fixInsert(newNode);
  }

  private _bstInsert(root: RBNode<T> | null, node: RBNode<T>): RBNode<T> {
    if (!root) return node;

    const cmp = this.compareFn(node.value, root.value);
    if (cmp < 0) {
      root.left = this._bstInsert(root.left, node);
      root.left.parent = root;
    } else if (cmp > 0) {
      root.right = this._bstInsert(root.right, node);
      root.right.parent = root;
    }
    return root;
  }

  private _fixInsert(node: RBNode<T>): void {
    let current = node;

    while (current.parent && current.parent.color === Color.RED) {
      const parent = current.parent!;
      if (!parent.parent) break; // parent is root, nothing to fix
      const grandparent = parent.parent!;

      if (parent === grandparent.left) {
        const uncle = grandparent.right;
        if (uncle && uncle.color === Color.RED) {
          // Case 1: Recolor
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grandparent.color = Color.RED;
          current = grandparent;
        } else {
          if (current === parent.right) {
            // Case 2: Left rotate
            current = parent;
            this._leftRotate(current);
          }
          // Case 3: Right rotate
          parent.color = Color.BLACK;
          grandparent.color = Color.RED;
          this._rightRotate(grandparent);
        }
      } else {
        const uncle = grandparent.left;
        if (uncle && uncle.color === Color.RED) {
          // Case 1: Recolor
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grandparent.color = Color.RED;
          current = grandparent;
        } else {
          if (current === parent.left) {
            // Case 2: Right rotate
            current = parent;
            this._rightRotate(current);
          }
          // Case 3: Left rotate
          parent.color = Color.BLACK;
          grandparent.color = Color.RED;
          this._leftRotate(grandparent);
        }
      }
    }

    this.root!.color = Color.BLACK;
  }

  search(value: T): boolean {
    let current = this.root;
    while (current) {
      const cmp = this.compareFn(value, current.value);
      if (cmp === 0) return true;
      current = cmp < 0 ? current.left : current.right;
    }
    return false;
  }

  min(): T | undefined {
    let node = this.root;
    if (!node) return undefined;
    while (node.left) node = node.left;
    return node.value;
  }

  max(): T | undefined {
    let node = this.root;
    if (!node) return undefined;
    while (node.right) node = node.right;
    return node.value;
  }

  inOrder(callback: (value: T) => void): void {
    this._inOrder(this.root, callback);
  }

  private _inOrder(node: RBNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    this._inOrder(node.left, callback);
    callback(node.value);
    this._inOrder(node.right, callback);
  }

  preOrder(callback: (value: T) => void): void {
    this._preOrder(this.root, callback);
  }

  private _preOrder(node: RBNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    callback(node.value);
    this._preOrder(node.left, callback);
    this._preOrder(node.right, callback);
  }

  postOrder(callback: (value: T) => void): void {
    this._postOrder(this.root, callback);
  }

  private _postOrder(node: RBNode<T> | null, callback: (value: T) => void): void {
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

  // --- Rotations ---
  private _leftRotate(x: RBNode<T>): void {
    const y = x.right!;
    x.right = y.left;
    if (y.left) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  private _rightRotate(x: RBNode<T>): void {
    const y = x.left!;
    x.left = y.right;
    if (y.right) y.right.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.right = x;
    x.parent = y;
  }
}
