import { lcs } from '@algorithms/dynamic-programming/longest-common-subsequence';

test('longestCommonSubsequenceBasic @longestCommonSubsequence @dp', () => {
  const a = 'abcde';
  const b = 'ace';
  expect(lcs(a, b)).toBe(3); // "ace"
});

test('longestCommonSubsequenceEmptyStrings @longestCommonSubsequence @dp', () => {
  expect(lcs('', '')).toBe(0);
  expect(lcs('abc', '')).toBe(0);
  expect(lcs('', 'xyz')).toBe(0);
});

test('longestCommonSubsequenceNoCommon @longestCommonSubsequence @dp', () => {
  const a = 'abc';
  const b = 'def';
  expect(lcs(a, b)).toBe(0);
});

test('longestCommonSubsequenceSameStrings @longestCommonSubsequence @dp', () => {
  const a = 'algorithm';
  const b = 'algorithm';
  expect(lcs(a, b)).toBe(a.length);
});

test('longestCommonSubsequenceComplexCase @longestCommonSubsequence @dp', () => {
  const a = 'AGGTAB';
  const b = 'GXTXAYB';
  expect(lcs(a, b)).toBe(4); // "GTAB"
});
