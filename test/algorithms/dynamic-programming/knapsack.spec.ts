import { knapsack } from '@algorithms/dynamic-programming/01-knapsack';

test('knapsackBasic @knapsack @dp @01knapsack', () => {
  const weights = [1, 2, 3];
  const values = [6, 10, 12];
  const capacity = 5;
  expect(knapsack(weights, values, capacity)).toBe(22);
});

test('knapsackZeroCapacity @knapsack @dp @01knapsack', () => {
  const weights = [1, 2, 3];
  const values = [6, 10, 12];
  const capacity = 0;
  expect(knapsack(weights, values, capacity)).toBe(0);
});

test('knapsackEmptyItems @knapsack @dp @01knapsack', () => {
  expect(knapsack([], [], 10)).toBe(0);
});

test('knapsackAllItemsTooHeavy @knapsack @dp @01knapsack', () => {
  const weights = [5, 6, 7];
  const values = [10, 20, 30];
  const capacity = 4;
  expect(knapsack(weights, values, capacity)).toBe(0);
});

test('knapsackLargeCapacity @knapsack @dp @01knapsack', () => {
  const weights = [2, 3, 4, 5];
  const values = [3, 4, 5, 6];
  const capacity = 8;
  expect(knapsack(weights, values, capacity)).toBe(10);
});
