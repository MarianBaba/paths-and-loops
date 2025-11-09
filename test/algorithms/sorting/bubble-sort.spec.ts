import { bubbleSort } from '@algorithms/sorting/bubble-sort';

test('bubbleSortBasic @bubbleSort @sort', () => {
  const arr = [5, 3, 8, 1, 2];
  expect(bubbleSort(arr)).toEqual([1, 2, 3, 5, 8]);
});

test('bubbleSortAlreadySorted @bubbleSort @sort', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(bubbleSort(arr)).toEqual([1, 2, 3, 4, 5]);
});

test('bubbleSortEmptyArray @bubbleSort @sort', () => {
  const arr: number[] = [];
  expect(bubbleSort(arr)).toEqual([]);
});

test('bubbleSortSingleElement @bubbleSort @sort', () => {
  const arr = [42];
  expect(bubbleSort(arr)).toEqual([42]);
});

test('bubbleSortDuplicateValues @bubbleSort @sort', () => {
  const arr = [3, 1, 2, 3, 1];
  expect(bubbleSort(arr)).toEqual([1, 1, 2, 3, 3]);
});
