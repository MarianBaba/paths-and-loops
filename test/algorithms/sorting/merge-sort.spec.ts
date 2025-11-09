import { mergeSort } from '@algorithms/sorting/merge-sort';

test('mergeSortBasic @mergeSort @sort', () => {
  const arr = [5, 3, 8, 1, 2];
  expect(mergeSort(arr)).toEqual([1, 2, 3, 5, 8]);
});

test('mergeSortAlreadySorted @mergeSort @sort', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(mergeSort(arr)).toEqual([1, 2, 3, 4, 5]);
});

test('mergeSortEmptyArray @mergeSort @sort', () => {
  const arr: number[] = [];
  expect(mergeSort(arr)).toEqual([]);
});

test('mergeSortSingleElement @mergeSort @sort', () => {
  const arr = [42];
  expect(mergeSort(arr)).toEqual([42]);
});

test('mergeSortDuplicateValues @mergeSort @sort', () => {
  const arr = [3, 1, 2, 3, 1];
  expect(mergeSort(arr)).toEqual([1, 1, 2, 3, 3]);
});

test('mergeSortNegativeValues @mergeSort @sort', () => {
  const arr = [-2, -5, 0, -1, -3];
  expect(mergeSort(arr)).toEqual([-5, -3, -2, -1, 0]);
});
