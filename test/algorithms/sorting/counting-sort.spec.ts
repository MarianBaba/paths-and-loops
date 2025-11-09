import { countingSort } from '@algorithms/sorting/counting-sort';

test('countingSortBasic @countingSort @sort', () => {
  const arr = [5, 3, 8, 1, 2];
  expect(countingSort(arr)).toEqual([1, 2, 3, 5, 8]);
});

test('countingSortAlreadySorted @countingSort @sort', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(countingSort(arr)).toEqual([1, 2, 3, 4, 5]);
});

test('countingSortEmptyArray @countingSort @sort', () => {
  const arr: number[] = [];
  expect(countingSort(arr)).toEqual([]);
});

test('countingSortSingleElement @countingSort @sort', () => {
  const arr = [42];
  expect(countingSort(arr)).toEqual([42]);
});

test('countingSortDuplicateValues @countingSort @sort', () => {
  const arr = [3, 1, 2, 3, 1];
  expect(countingSort(arr)).toEqual([1, 1, 2, 3, 3]);
});

test('countingSortNegativeValues @countingSort @sort', () => {
  const arr = [-2, -5, 0, -1, -3];
  expect(countingSort(arr)).toEqual([-5, -3, -2, -1, 0]);
});
