import Benchmark from 'benchmark';
import { linearSearch } from '../../../src/algorithms/searching/linear-search';
import { seededRNG } from '../../generators/arrays';
import { performance } from 'perf_hooks';

function genRandomArray(size: number, seed = 42): number[] {
  const rand = seededRNG(seed);
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(rand() * 1_000_000));
  }
  return arr;
}

const sizes = [1_000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000];
const arrays: Record<number, number[]> = {};
const targets: Record<number, number[]> = {};

for (const size of sizes) {
  const arr = genRandomArray(size);
  arrays[size] = arr;
  targets[size] = Array.from({ length: 100 }, () => arr[Math.floor(Math.random() * arr.length)]);
}

const suite = new Benchmark.Suite();

for (const size of sizes) {
  suite.add(`LinearSearch - ${size.toLocaleString()}`, () => {
    for (const t of targets[size]) linearSearch(arrays[size], t);
  });
}

function measureAvgTime(arr: number[], targets: number[], runs = 100): number {
  let totalTime = 0;
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    for (const t of targets) linearSearch(arr, t);
    const end = performance.now();
    totalTime += end - start;
  }
  return totalTime / (runs * targets.length);
}

suite
  .on('start', () => console.log('Running linear search benchmarks...\n'))
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log('\nAverage wall-clock time per search (ms):');
    for (const size of sizes) {
      const avgTime = measureAvgTime(arrays[size], targets[size]);
      console.log(`- ${size.toLocaleString()} elems: ${avgTime.toFixed(6)} ms`);
    }
  })
  .run({ async: true });
