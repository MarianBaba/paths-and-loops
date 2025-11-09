// benchmarks/algorithms/binary-search-bench.ts
import Benchmark from 'benchmark';
import { binarySearch } from '../../../src/algorithms/searching/binary-search';
import { seededRNG } from '../../generators/arrays';
import { performance } from 'perf_hooks';

// Generate sorted arrays deterministically
function genSortedArray(size: number, seed = 42): number[] {
  const rand = seededRNG(seed);
  const arr: number[] = [];
  let current = 0;
  for (let i = 0; i < size; i++) {
    current += Math.floor(rand() * 10) + 1; // ensure sorted
    arr.push(current);
  }
  return arr;
}

const sizes = [1_000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000];
const arrays: Record<number, number[]> = {};
const targets: Record<number, number[]> = {};

for (const size of sizes) {
  const arr = genSortedArray(size);
  arrays[size] = arr;
  targets[size] = Array.from({ length: 100 }, () => arr[Math.floor(Math.random() * arr.length)]);
}

const suite = new Benchmark.Suite();

for (const size of sizes) {
  suite.add(`BinarySearch - ${size.toLocaleString()}`, () => {
    for (const t of targets[size]) binarySearch(arrays[size], t);
  });
}

// Measure average wall-clock time per search
function measureAvgTime(arr: number[], targets: number[], runs = 100): number {
  let totalTime = 0;
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    for (const t of targets) binarySearch(arr, t);
    const end = performance.now();
    totalTime += end - start;
  }
  // Average time per search
  return totalTime / (runs * targets.length);
}

suite
  .on('start', () => console.log('Running binary search benchmarks...\n'))
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log('\nAverage wall-clock time per search (ms):');
    for (const size of sizes) {
      const avgTime = measureAvgTime(arrays[size], targets[size]);
      console.log(`- ${size.toLocaleString()} elems: ${avgTime.toFixed(6)} ms`);
    }
  })
  .run({ async: true });
