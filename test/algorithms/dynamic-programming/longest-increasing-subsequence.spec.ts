import { lis } from '@algorithms/dynamic-programming/longest-increasing-subsequence';

test('longestIncreasingSubsequenceBasic @lis @dp', () => {
  const arr = [10, 9, 2, 5, 3, 7, 101, 18];
  expect(lis(arr)).toBe(4); // [2,3,7,101]
});

test('longestIncreasingSubsequenceAllIncreasing @lis @dp', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(lis(arr)).toBe(5);
});

test('longestIncreasingSubsequenceAllSame @lis @dp', () => {
  const arr = [7, 7, 7, 7];
  expect(lis(arr)).toBe(1);
});

test('longestIncreasingSubsequenceEmptyArray @lis @dp', () => {
  expect(lis([])).toBe(0);
});

test('longestIncreasingSubsequenceComplexCase @lis @dp', () => {
  const arr = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9];
  expect(lis(arr)).toBe(4);
});
