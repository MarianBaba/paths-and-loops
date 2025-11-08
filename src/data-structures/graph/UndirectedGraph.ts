export class UndirectedGraph<T> {
  private adjacency: Map<T, Set<T>> = new Map();

  addNode(node: T): void {
    if (!this.adjacency.has(node)) {
      this.adjacency.set(node, new Set());
    }
  }

  removeNode(node: T): void {
    if (!this.adjacency.has(node)) return;
    // Remove node from all neighbors
    for (const neighbor of this.adjacency.get(node)!) {
      this.adjacency.get(neighbor)!.delete(node);
    }
    this.adjacency.delete(node);
  }

  addEdge(a: T, b: T): void {
    this.addNode(a);
    this.addNode(b);
    this.adjacency.get(a)!.add(b);
    this.adjacency.get(b)!.add(a);
  }

  removeEdge(a: T, b: T): void {
    this.adjacency.get(a)?.delete(b);
    this.adjacency.get(b)?.delete(a);
  }

  hasNode(node: T): boolean {
    return this.adjacency.has(node);
  }

  hasEdge(a: T, b: T): boolean {
    return this.adjacency.get(a)?.has(b) ?? false;
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
