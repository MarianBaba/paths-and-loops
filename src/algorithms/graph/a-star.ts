type AStarEdge = { to: number; cost: number };

export function aStar(
  graph: AStarEdge[][],
  start: number,
  goal: number,
  heuristic: (node: number) => number,
): number[] | null {
  const openSet = new Set<number>([start]);
  const cameFrom: number[] = Array(graph.length).fill(-1);

  const gScore = Array(graph.length).fill(Infinity);
  gScore[start] = 0;

  const fScore = Array(graph.length).fill(Infinity);
  fScore[start] = heuristic(start);

  while (openSet.size > 0) {
    let current: number | null = null;
    for (const node of openSet) {
      if (current === null || fScore[node] < fScore[current]) current = node;
    }

    if (current === goal) {
      const path: number[] = [];
      let u = current;
      while (u !== -1) {
        path.push(u);
        u = cameFrom[u];
      }
      return path.reverse();
    }

    openSet.delete(current!);

    for (const edge of graph[current!]) {
      const tentativeG = gScore[current!] + edge.cost;
      if (tentativeG < gScore[edge.to]) {
        cameFrom[edge.to] = current!;
        gScore[edge.to] = tentativeG;
        fScore[edge.to] = tentativeG + heuristic(edge.to);
        openSet.add(edge.to);
      }
    }
  }

  return null;
}
