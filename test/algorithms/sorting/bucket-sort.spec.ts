import { bucketSort } from '@algorithms/sorting/bucket-sort';

test('bucketSortBasic @bucketSort @sort', () => {
  const arr = [5, 3, 8, 1, 2];
  expect(bucketSort(arr)).toEqual([1, 2, 3, 5, 8]);
});

test('bucketSortAlreadySorted @bucketSort @sort', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(bucketSort(arr)).toEqual([1, 2, 3, 4, 5]);
});

test('bucketSortEmptyArray @bucketSort @sort', () => {
  const arr: number[] = [];
  expect(bucketSort(arr)).toEqual([]);
});

test('bucketSortSingleElement @bucketSort @sort', () => {
  const arr = [42];
  expect(bucketSort(arr)).toEqual([42]);
});

test('bucketSortDuplicateValues @bucketSort @sort', () => {
  const arr = [3, 1, 2, 3, 1];
  expect(bucketSort(arr)).toEqual([1, 1, 2, 3, 3]);
});
