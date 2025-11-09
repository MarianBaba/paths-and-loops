import { radixSort } from '@algorithms/sorting/radix-sort';

test('radixSortBasic @radixSort @sort', () => {
  const arr = [170, 45, 75, 90, 802, 24, 2, 66];
  expect(radixSort(arr)).toEqual([2, 24, 45, 66, 75, 90, 170, 802]);
});

test('radixSortAlreadySorted @radixSort @sort', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(radixSort(arr)).toEqual([1, 2, 3, 4, 5]);
});

test('radixSortEmptyArray @radixSort @sort', () => {
  const arr: number[] = [];
  expect(radixSort(arr)).toEqual([]);
});

test('radixSortSingleElement @radixSort @sort', () => {
  const arr = [42];
  expect(radixSort(arr)).toEqual([42]);
});

test('radixSortDuplicateValues @radixSort @sort', () => {
  const arr = [170, 45, 75, 45, 2, 170];
  expect(radixSort(arr)).toEqual([2, 45, 45, 75, 170, 170]);
});
