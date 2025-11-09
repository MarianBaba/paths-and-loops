import { binarySearch } from '@algorithms/searching/binary-search';

test('binarySearchBasic @binarySearch @search', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  expect(binarySearch(arr, 1)).toBe(0);
  expect(binarySearch(arr, 4)).toBe(3);
  expect(binarySearch(arr, 7)).toBe(6);
});

test('binarySearchNotFound @binarySearch @search', () => {
  const arr = [10, 20, 30, 40];
  expect(binarySearch(arr, 25)).toBe(-1);
});

test('binarySearchEmptyArray @binarySearch @search', () => {
  const arr: number[] = [];
  expect(binarySearch(arr, 1)).toBe(-1);
});

test('binarySearchSingleElement @binarySearch @search', () => {
  const arr = [5];
  expect(binarySearch(arr, 5)).toBe(0);
  expect(binarySearch(arr, 3)).toBe(-1);
});

test('binarySearchDuplicateValues @binarySearch @search', () => {
  const arr = [1, 2, 2, 3, 4];
  const index = binarySearch(arr, 2);
  expect([1, 2]).toContain(index); // can return any index of 2
});
