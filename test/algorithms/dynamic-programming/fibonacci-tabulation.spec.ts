import { fibTab } from '@algorithms/dynamic-programming/fibonacci-tabulation';

test('fibTabBasic @fibTab @dp', () => {
  expect(fibTab(0)).toBe(0);
  expect(fibTab(1)).toBe(1);
  expect(fibTab(5)).toBe(5);
  expect(fibTab(10)).toBe(55);
});

test('fibTabLargerInput @fibTab @dp', () => {
  expect(fibTab(20)).toBe(6765);
  expect(fibTab(30)).toBe(832040);
});

test('fibTabEdgeCase @fibTab @dp', () => {
  expect(fibTab(2)).toBe(1);
  expect(fibTab(3)).toBe(2);
});

test('fibTabVeryLargeInput @fibTab @dp', () => {
  // Testing that tabulation handles bigger input efficiently
  expect(fibTab(40)).toBe(102334155);
});
