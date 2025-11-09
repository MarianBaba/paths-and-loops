import { selectionSort } from '@algorithms/sorting/selection-sort';

test('selectionSortBasic @selectionSort @sort', () => {
  const arr = [5, 3, 8, 1, 2];
  expect(selectionSort(arr)).toEqual([1, 2, 3, 5, 8]);
});

test('selectionSortAlreadySorted @selectionSort @sort', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(selectionSort(arr)).toEqual([1, 2, 3, 4, 5]);
});

test('selectionSortEmptyArray @selectionSort @sort', () => {
  const arr: number[] = [];
  expect(selectionSort(arr)).toEqual([]);
});

test('selectionSortSingleElement @selectionSort @sort', () => {
  const arr = [42];
  expect(selectionSort(arr)).toEqual([42]);
});

test('selectionSortDuplicateValues @selectionSort @sort', () => {
  const arr = [3, 1, 2, 3, 1];
  expect(selectionSort(arr)).toEqual([1, 1, 2, 3, 3]);
});

test('selectionSortNegativeValues @selectionSort @sort', () => {
  const arr = [-2, -5, 0, -1, -3];
  expect(selectionSort(arr)).toEqual([-5, -3, -2, -1, 0]);
});
