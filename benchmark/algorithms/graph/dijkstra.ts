import Benchmark from 'benchmark';
import { dijkstra } from '../../../src/algorithms/graph/dijkstra';

import { performance } from 'perf_hooks';
import { genRandomWeightedGraph } from '../../generators/graphs';

const sizes = [100, 500, 1000]; // number of nodes
const density = 0.01; // probability of edge or edges per node

const graphs: Record<number, { graph: { to: number; weight: number }[][]; start: number }> = {};

for (const n of sizes) {
  const graph = genRandomWeightedGraph(n, Math.floor(n * n * density));
  graphs[n] = { graph, start: 0 };
}

const suite = new Benchmark.Suite();

for (const n of sizes) {
  suite.add(`Dijkstra - ${n} nodes`, () => {
    dijkstra(graphs[n].graph, graphs[n].start);
  });
}

function measureAvgTime(graph: { to: number; weight: number }[][], runs = 3) {
  let totalTime = 0;
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    dijkstra(graph, 0);
    const end = performance.now();
    totalTime += end - start;
  }
  return totalTime / runs;
}

suite
  .on('start', () => console.log('Running Dijkstra benchmarks...\n'))
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log('\nAverage wall-clock time per run (ms):');
    for (const n of sizes) {
      const avg = measureAvgTime(graphs[n].graph);
      console.log(`- ${n} nodes: ${avg.toFixed(3)} ms`);
    }
  })
  .run({ async: true });
