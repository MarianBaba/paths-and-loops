export type BFEdge = { from: number; to: number; weight: number };

export function bellmanFord(edges: BFEdge[], vertexCount: number, start: number): number[] | null {
  const dist = Array(vertexCount).fill(Infinity);
  dist[start] = 0;

  for (let i = 0; i < vertexCount - 1; i++) {
    for (const edge of edges) {
      if (dist[edge.from] + edge.weight < dist[edge.to]) {
        dist[edge.to] = dist[edge.from] + edge.weight;
      }
    }
  }

  for (const edge of edges) {
    if (dist[edge.from] + edge.weight < dist[edge.to]) return null;
  }

  return dist;
}
