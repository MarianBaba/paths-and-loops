import { heapSort } from '@algorithms/sorting/heap-sort';

test('heapSortBasic @heapSort @sort', () => {
  const arr = [5, 3, 8, 1, 2];
  expect(heapSort(arr)).toEqual([1, 2, 3, 5, 8]);
});

test('heapSortAlreadySorted @heapSort @sort', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(heapSort(arr)).toEqual([1, 2, 3, 4, 5]);
});

test('heapSortEmptyArray @heapSort @sort', () => {
  const arr: number[] = [];
  expect(heapSort(arr)).toEqual([]);
});

test('heapSortSingleElement @heapSort @sort', () => {
  const arr = [42];
  expect(heapSort(arr)).toEqual([42]);
});

test('heapSortDuplicateValues @heapSort @sort', () => {
  const arr = [3, 1, 2, 3, 1];
  expect(heapSort(arr)).toEqual([1, 1, 2, 3, 3]);
});

test('heapSortNegativeValues @heapSort @sort', () => {
  const arr = [-2, -5, 0, -1, -3];
  expect(heapSort(arr)).toEqual([-5, -3, -2, -1, 0]);
});
