export function topologicalSort(graph: number[][]): number[] {
  const n = graph.length;
  const visited = Array(n).fill(false);
  const stack: number[] = [];

  function dfs(u: number) {
    visited[u] = true;
    for (const v of graph[u]) {
      if (!visited[v]) dfs(v);
    }
    stack.push(u);
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) dfs(i);
  }

  return stack.reverse();
}
