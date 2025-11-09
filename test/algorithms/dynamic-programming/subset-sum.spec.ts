import { subsetSum } from '@algorithms/dynamic-programming/subset-sum';

test('subsetSumBasic @subsetSum @dp', () => {
  const nums = [3, 34, 4, 12, 5, 2];
  const sum = 9;
  expect(subsetSum(nums, sum)).toBe(true); // subset [4,5]
});

test('subsetSumNoSolution @subsetSum @dp', () => {
  const nums = [1, 2, 5];
  const sum = 4;
  expect(subsetSum(nums, sum)).toBe(false);
});

test('subsetSumEmptyArray @subsetSum @dp', () => {
  const nums: number[] = [];
  const sum = 0;
  expect(subsetSum(nums, sum)).toBe(true); // empty subset sums to 0
  expect(subsetSum(nums, 10)).toBe(false);
});

test('subsetSumSingleElement @subsetSum @dp', () => {
  expect(subsetSum([5], 5)).toBe(true);
  expect(subsetSum([5], 3)).toBe(false);
});

test('subsetSumAllElementsUsed @subsetSum @dp', () => {
  const nums = [1, 2, 3];
  const sum = 6;
  expect(subsetSum(nums, sum)).toBe(true); // all elements sum to 6
});
