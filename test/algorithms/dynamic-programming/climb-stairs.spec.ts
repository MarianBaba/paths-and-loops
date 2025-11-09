import { climbStairs } from '@algorithms/dynamic-programming/climb-stairs';

test('climbStairsBasic @climbStairs @dp', () => {
  expect(climbStairs(2)).toBe(2);
  expect(climbStairs(3)).toBe(3);
});

test('climbStairsZeroSteps @climbStairs @dp', () => {
  expect(climbStairs(0)).toBe(1);
});

test('climbStairsOneStep @climbStairs @dp', () => {
  expect(climbStairs(1)).toBe(1);
});

test('climbStairsLargerInput @climbStairs @dp', () => {
  expect(climbStairs(5)).toBe(8);
  expect(climbStairs(10)).toBe(89);
});

test('climbStairsEdgeCase @climbStairs @dp', () => {
  expect(climbStairs(20)).toBe(10946);
});
