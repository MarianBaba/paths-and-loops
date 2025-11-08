type KruskalEdge = { from: number; to: number; weight: number };

export function kruskal(vertexCount: number, edges: KruskalEdge[]): KruskalEdge[] {
  edges.sort((a, b) => a.weight - b.weight);

  const parent = Array.from({ length: vertexCount }, (_, i) => i);
  function find(u: number): number {
    if (parent[u] !== u) parent[u] = find(parent[u]);
    return parent[u];
  }
  function union(u: number, v: number) {
    parent[find(u)] = find(v);
  }

  const mst: KruskalEdge[] = [];
  for (const edge of edges) {
    if (find(edge.from) !== find(edge.to)) {
      mst.push(edge);
      union(edge.from, edge.to);
    }
  }

  return mst;
}
