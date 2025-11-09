import { linearSearch } from '@algorithms/searching/linear-search';

test('linearSearchBasic @linearSearch @search', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(linearSearch(arr, 3)).toBe(2);
  expect(linearSearch(arr, 1)).toBe(0);
  expect(linearSearch(arr, 5)).toBe(4);
});

test('linearSearchNotFound @linearSearch @search', () => {
  const arr = [10, 20, 30];
  expect(linearSearch(arr, 15)).toBe(-1);
});

test('linearSearchEmptyArray @linearSearch @search', () => {
  const arr: number[] = [];
  expect(linearSearch(arr, 1)).toBe(-1);
});

test('linearSearchStrings @linearSearch @search', () => {
  const arr = ['a', 'b', 'c'];
  expect(linearSearch(arr, 'b')).toBe(1);
  expect(linearSearch(arr, 'z')).toBe(-1);
});

test('linearSearchDuplicateValues @linearSearch @search', () => {
  const arr = [1, 2, 2, 3];
  expect(linearSearch(arr, 2)).toBe(1); // first occurrence
});
