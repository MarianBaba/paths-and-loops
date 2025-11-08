export class UnionFind<T> {
  private parent: Map<T, T> = new Map();
  private rank: Map<T, number> = new Map();

  add(element: T): void {
    if (!this.parent.has(element)) {
      this.parent.set(element, element);
      this.rank.set(element, 0);
    }
  }

  find(element: T): T {
    if (!this.parent.has(element)) {
      throw new Error(`Element ${element} not found`);
    }

    // Path compression
    const parent = this.parent.get(element)!;
    if (parent !== element) {
      const root = this.find(parent);
      this.parent.set(element, root);
      return root;
    }
    return parent;
  }

  union(a: T, b: T): void {
    this.add(a);
    this.add(b);

    const rootA = this.find(a);
    const rootB = this.find(b);

    if (rootA === rootB) return; // already in same set

    const rankA = this.rank.get(rootA)!;
    const rankB = this.rank.get(rootB)!;

    // Union by rank
    if (rankA < rankB) {
      this.parent.set(rootA, rootB);
    } else if (rankA > rankB) {
      this.parent.set(rootB, rootA);
    } else {
      this.parent.set(rootB, rootA);
      this.rank.set(rootA, rankA + 1);
    }
  }

  connected(a: T, b: T): boolean {
    if (!this.parent.has(a) || !this.parent.has(b)) return false;
    return this.find(a) === this.find(b);
  }

  sets(): Map<T, T> {
    const result = new Map<T, T>();
    for (const key of this.parent.keys()) {
      result.set(key, this.find(key));
    }
    return result;
  }
}
