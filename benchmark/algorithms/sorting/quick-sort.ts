import Benchmark from 'benchmark';
import { quickSort } from '../../../src/algorithms/sorting/quick-sort';
import { performance } from 'perf_hooks';
import { seededRNG } from '../../generators/arrays';

function genRandomIntArray(size: number, maxValue = 1_000_000, seed = 42): number[] {
  const rand = seededRNG(seed);
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(rand() * maxValue));
  }
  return arr;
}

const sizes = [1_000, 10_000, 100_000, 1_000_000];
const arrays: Record<number, number[]> = {};

for (const size of sizes) {
  arrays[size] = genRandomIntArray(size);
}

const suite = new Benchmark.Suite();

for (const size of sizes) {
  suite.add(`QuickSort - ${size}`, () => {
    quickSort(arrays[size]);
  });
}

function measureAvgTime(arr: number[], runs = 5): number {
  let totalTime = 0;
  for (let i = 0; i < runs; i++) {
    const copy = [...arr];
    const start = performance.now();
    quickSort(copy);
    const end = performance.now();
    totalTime += end - start;
  }
  return totalTime / runs;
}

suite
  .on('start', () => console.log('Running quick sort benchmarks...\n'))
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log('\nAverage wall-clock time per sort (ms):');
    for (const size of sizes) {
      const avgTime = measureAvgTime(arrays[size]);
      console.log(`- ${size} elems: ${avgTime.toFixed(3)} ms`);
    }
  })
  .run({ async: true });
