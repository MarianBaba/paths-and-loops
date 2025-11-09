import { quickSort } from '@algorithms/sorting/quick-sort';

test('quickSortBasic @quickSort @sort', () => {
  const arr = [5, 3, 8, 1, 2];
  expect(quickSort(arr)).toEqual([1, 2, 3, 5, 8]);
});

test('quickSortAlreadySorted @quickSort @sort', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(quickSort(arr)).toEqual([1, 2, 3, 4, 5]);
});

test('quickSortEmptyArray @quickSort @sort', () => {
  const arr: number[] = [];
  expect(quickSort(arr)).toEqual([]);
});

test('quickSortSingleElement @quickSort @sort', () => {
  const arr = [42];
  expect(quickSort(arr)).toEqual([42]);
});

test('quickSortDuplicateValues @quickSort @sort', () => {
  const arr = [3, 1, 2, 3, 1];
  expect(quickSort(arr)).toEqual([1, 1, 2, 3, 3]);
});

test('quickSortNegativeValues @quickSort @sort', () => {
  const arr = [-2, -5, 0, -1, -3];
  expect(quickSort(arr)).toEqual([-5, -3, -2, -1, 0]);
});
