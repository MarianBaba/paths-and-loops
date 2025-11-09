import Benchmark from 'benchmark';
import { bubbleSort } from '../../../src/algorithms/sorting/bubble-sort';
import { performance } from 'perf_hooks';
import { seededRNG } from '../../generators/arrays';

function genRandomArray(size: number, seed = 42): number[] {
  const rand = seededRNG(seed);
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(rand() * 10_000));
  }
  return arr;
}

const sizes = [100, 1_000, 10_000];
const arrays: Record<number, number[]> = {};

for (const size of sizes) {
  arrays[size] = genRandomArray(size);
}

const suite = new Benchmark.Suite();

for (const size of sizes) {
  suite.add(`BubbleSort - ${size}`, () => {
    bubbleSort(arrays[size]);
  });
}

function measureAvgTime(arr: number[], runs = 10): number {
  let totalTime = 0;
  for (let i = 0; i < runs; i++) {
    const copy = [...arr]; // sort a fresh copy each run
    const start = performance.now();
    bubbleSort(copy);
    const end = performance.now();
    totalTime += end - start;
  }
  return totalTime / runs;
}

suite
  .on('start', () => console.log('Running bubble sort benchmarks...\n'))
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log('\nAverage wall-clock time per sort (ms):');
    for (const size of sizes) {
      const avgTime = measureAvgTime(arrays[size]);
      console.log(`- ${size} elems: ${avgTime.toFixed(3)} ms`);
    }
  })
  .run({ async: true });
