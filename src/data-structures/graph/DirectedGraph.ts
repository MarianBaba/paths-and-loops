export class DirectedGraph<T> {
  private adjacency: Map<T, Set<T>> = new Map();

  addNode(node: T): void {
    if (!this.adjacency.has(node)) {
      this.adjacency.set(node, new Set());
    }
  }

  removeNode(node: T): void {
    if (!this.adjacency.has(node)) return;
    // Remove incoming edges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, neighbors] of this.adjacency.entries()) {
      neighbors.delete(node);
    }
    this.adjacency.delete(node);
  }

  addEdge(from: T, to: T): void {
    this.addNode(from);
    this.addNode(to);
    this.adjacency.get(from)!.add(to);
  }

  removeEdge(from: T, to: T): void {
    this.adjacency.get(from)?.delete(to);
  }

  hasNode(node: T): boolean {
    return this.adjacency.has(node);
  }

  hasEdge(from: T, to: T): boolean {
    return this.adjacency.get(from)?.has(to) ?? false;
  }

  neighbors(node: T): T[] {
    return Array.from(this.adjacency.get(node) ?? []);
  }

  clear(): void {
    this.adjacency.clear();
  }

  size(): number {
    return this.adjacency.size;
  }

  // --- Traversals ---
  dfs(start: T, visit: (node: T) => void): void {
    const visited = new Set<T>();
    const stack: T[] = [start];

    while (stack.length) {
      const node = stack.pop()!;
      if (!visited.has(node)) {
        visit(node);
        visited.add(node);
        for (const neighbor of this.adjacency.get(node) ?? []) {
          if (!visited.has(neighbor)) stack.push(neighbor);
        }
      }
    }
  }

  bfs(start: T, visit: (node: T) => void): void {
    const visited = new Set<T>();
    const queue: T[] = [start];

    while (queue.length) {
      const node = queue.shift()!;
      if (!visited.has(node)) {
        visit(node);
        visited.add(node);
        for (const neighbor of this.adjacency.get(node) ?? []) {
          if (!visited.has(neighbor)) queue.push(neighbor);
        }
      }
    }
  }
}
