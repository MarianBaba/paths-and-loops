export function tarjanSCC(graph: number[][]): number[][] {
  const n = graph.length;
  const index: number[] = Array(n).fill(-1);
  const lowlink: number[] = Array(n).fill(0);
  const onStack: boolean[] = Array(n).fill(false);
  const stack: number[] = [];
  let idx = 0;
  const sccs: number[][] = [];

  function dfs(v: number) {
    index[v] = lowlink[v] = idx++;
    stack.push(v);
    onStack[v] = true;

    for (const w of graph[v]) {
      if (index[w] === -1) {
        dfs(w);
        lowlink[v] = Math.min(lowlink[v], lowlink[w]);
      } else if (onStack[w]) {
        lowlink[v] = Math.min(lowlink[v], index[w]);
      }
    }

    if (lowlink[v] === index[v]) {
      const scc: number[] = [];
      let w: number;
      do {
        w = stack.pop()!;
        onStack[w] = false;
        scc.push(w);
      } while (w !== v);
      sccs.push(scc);
    }
  }

  for (let v = 0; v < n; v++) {
    if (index[v] === -1) dfs(v);
  }

  return sccs;
}
