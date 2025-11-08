type PrimEdge = { to: number; weight: number };

export function prim(graph: PrimEdge[][], start: number = 0): number[] {
  const n = graph.length;
  const inMST = Array(n).fill(false);
  const key = Array(n).fill(Infinity);
  key[start] = 0;

  for (let count = 0; count < n; count++) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!inMST[i] && (u === -1 || key[i] < key[u])) u = i;
    }

    inMST[u] = true;

    for (const edge of graph[u]) {
      if (!inMST[edge.to] && edge.weight < key[edge.to]) {
        key[edge.to] = edge.weight;
      }
    }
  }

  return key;
}
