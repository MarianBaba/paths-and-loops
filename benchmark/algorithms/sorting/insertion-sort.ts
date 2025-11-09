import Benchmark from 'benchmark';
import { insertionSort } from '../../../src/algorithms/sorting/insertion-sort';
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

const sizes = [1_000, 5_000, 10_000];
const arrays: Record<number, number[]> = {};

for (const size of sizes) {
  arrays[size] = genRandomIntArray(size);
}
const suite = new Benchmark.Suite();

for (const size of sizes) {
  suite.add(`InsertionSort - ${size}`, () => {
    insertionSort(arrays[size]);
  });
}

function measureAvgTime(arr: number[], runs = 10): number {
  let totalTime = 0;
  for (let i = 0; i < runs; i++) {
    const copy = [...arr];
    const start = performance.now();
    insertionSort(copy);
    const end = performance.now();
    totalTime += end - start;
  }
  return totalTime / runs;
}

suite
  .on('start', () => console.log('Running insertion sort benchmarks...\n'))
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log('\nAverage wall-clock time per sort (ms):');
    for (const size of sizes) {
      const avgTime = measureAvgTime(arrays[size]);
      console.log(`- ${size} elems: ${avgTime.toFixed(3)} ms`);
    }
  })
  .run({ async: true });
