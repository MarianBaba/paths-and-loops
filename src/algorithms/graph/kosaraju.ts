export function kosarajuSCC(graph: number[][]): number[][] {
  const n = graph.length;
  const visited = Array(n).fill(false);
  const order: number[] = [];

  function dfs1(u: number) {
    visited[u] = true;
    for (const v of graph[u]) if (!visited[v]) dfs1(v);
    order.push(u);
  }

  for (let i = 0; i < n; i++) if (!visited[i]) dfs1(i);

  const reversed: number[][] = Array.from({ length: n }, () => []);
  for (let u = 0; u < n; u++) {
    for (const v of graph[u]) reversed[v].push(u);
  }

  visited.fill(false);
  const sccs: number[][] = [];

  function dfs2(u: number, comp: number[]) {
    visited[u] = true;
    comp.push(u);
    for (const v of reversed[u]) if (!visited[v]) dfs2(v, comp);
  }

  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    if (!visited[u]) {
      const comp: number[] = [];
      dfs2(u, comp);
      sccs.push(comp);
    }
  }

  return sccs;
}
