import { insertionSort } from '@algorithms/sorting/insertion-sort';

test('insertionSortBasic @insertionSort @sort', () => {
  const arr = [5, 3, 8, 1, 2];
  expect(insertionSort(arr)).toEqual([1, 2, 3, 5, 8]);
});

test('insertionSortAlreadySorted @insertionSort @sort', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(insertionSort(arr)).toEqual([1, 2, 3, 4, 5]);
});

test('insertionSortEmptyArray @insertionSort @sort', () => {
  const arr: number[] = [];
  expect(insertionSort(arr)).toEqual([]);
});

test('insertionSortSingleElement @insertionSort @sort', () => {
  const arr = [42];
  expect(insertionSort(arr)).toEqual([42]);
});

test('insertionSortDuplicateValues @insertionSort @sort', () => {
  const arr = [3, 1, 2, 3, 1];
  expect(insertionSort(arr)).toEqual([1, 1, 2, 3, 3]);
});

test('insertionSortNegativeValues @insertionSort @sort', () => {
  const arr = [-2, -5, 0, -1, -3];
  expect(insertionSort(arr)).toEqual([-5, -3, -2, -1, 0]);
});
