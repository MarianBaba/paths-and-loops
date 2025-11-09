import { fibMemo } from '@algorithms/dynamic-programming/fibonacci-memoization';

test('fibMemoBasic @fibMemo @dp', () => {
  expect(fibMemo(0)).toBe(0);
  expect(fibMemo(1)).toBe(1);
  expect(fibMemo(5)).toBe(5);
  expect(fibMemo(10)).toBe(55);
});

test('fibMemoLargerInput @fibMemo @dp', () => {
  expect(fibMemo(20)).toBe(6765);
  expect(fibMemo(30)).toBe(832040);
});

test('fibMemoEdgeCase @fibMemo @dp', () => {
  expect(fibMemo(2)).toBe(1);
  expect(fibMemo(3)).toBe(2);
});

test('fibMemoVeryLargeInput @fibMemo @dp', () => {
  // Just testing that memoization handles bigger input without stack overflow
  expect(fibMemo(40)).toBe(102334155);
});
