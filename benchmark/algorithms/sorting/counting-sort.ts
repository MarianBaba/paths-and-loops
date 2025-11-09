import Benchmark from 'benchmark';
import { countingSort } from '../../../src/algorithms/sorting/counting-sort';
import { performance } from 'perf_hooks';
import { seededRNG } from '../../generators/arrays';

function genRandomIntArray(size: number, maxValue = 1000, seed = 42): number[] {
  const rand = seededRNG(seed);
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(rand() * (maxValue + 1)));
  }
  return arr;
}

const sizes = [1_000, 10_000, 100_000];
const arrays: Record<number, number[]> = {};

for (const size of sizes) {
  arrays[size] = genRandomIntArray(size, 10_000); // reasonable max value
}

const suite = new Benchmark.Suite();

for (const size of sizes) {
  suite.add(`CountingSort - ${size}`, () => {
    countingSort(arrays[size]);
  });
}

function measureAvgTime(arr: number[], runs = 10): number {
  let totalTime = 0;
  for (let i = 0; i < runs; i++) {
    const copy = [...arr]; // fresh copy
    const start = performance.now();
    countingSort(copy);
    const end = performance.now();
    totalTime += end - start;
  }
  return totalTime / runs;
}

suite
  .on('start', () => console.log('Running counting sort benchmarks...\n'))
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log('\nAverage wall-clock time per sort (ms):');
    for (const size of sizes) {
      const avgTime = measureAvgTime(arrays[size]);
      console.log(`- ${size} elems: ${avgTime.toFixed(3)} ms`);
    }
  })
  .run({ async: true });
