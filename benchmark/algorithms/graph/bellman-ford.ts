import { performance } from 'perf_hooks';

import { bellmanFord, type BFEdge } from '../../../src/algorithms/graph/bellman-ford';
import { genRandomWeightedGraph } from '../../generators/graphs';

type WeightedAdjList = { to: number; weight: number }[][];

function adjListToEdges(adj: WeightedAdjList): BFEdge[] {
  const edges: BFEdge[] = [];
  adj.forEach((neighbors, from) => {
    neighbors.forEach(({ to, weight }) => edges.push({ from, to, weight }));
  });
  return edges;
}

function measureTime(fn: () => void, runs = 5): number {
  const times: number[] = [];
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    fn();
    const end = performance.now();
    times.push(end - start);
  }
  return times.reduce((a, b) => a + b, 0) / runs;
}

const graphSizes = [
  { nodes: 100, edges: 500 },
  { nodes: 500, edges: 2000 },
  { nodes: 1000, edges: 5000 },
];

console.log('Running Bellman-Ford benchmarks...');

for (const { nodes, edges } of graphSizes) {
  const avgTime = measureTime(() => {
    const graph: WeightedAdjList = genRandomWeightedGraph(nodes, edges, 1000, 42, true);
    const edgeList: BFEdge[] = adjListToEdges(graph);
    bellmanFord(edgeList, nodes, 0); // start node = 0
  });

  console.log(`Bellman-Ford - ${nodes} nodes, ${edges} edges: avg ${avgTime.toFixed(2)} ms`);
}
