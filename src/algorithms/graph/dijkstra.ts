type Edge = { to: number; weight: number };

export function dijkstra(graph: Edge[][], start: number): number[] {
  const dist = Array(graph.length).fill(Infinity);
  const visited = Array(graph.length).fill(false);
  dist[start] = 0;

  for (let i = 0; i < graph.length; i++) {
    let u = -1;
    for (let j = 0; j < graph.length; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
    }

    if (dist[u] === Infinity) break;
    visited[u] = true;

    for (const edge of graph[u]) {
      if (dist[u] + edge.weight < dist[edge.to]) {
        dist[edge.to] = dist[u] + edge.weight;
      }
    }
  }

  return dist;
}
