import { kmpSearch } from '@algorithms/string/kmp-search';

test('kmpSearchBasic @kmp @stringSearch', () => {
  const text = 'ABABDABACDABABCABAB';
  const pattern = 'ABABCABAB';
  expect(kmpSearch(text, pattern)).toEqual([10]);
});

test('kmpSearchMultipleOccurrences @kmp @stringSearch', () => {
  const text = 'AAAAA';
  const pattern = 'AA';
  expect(kmpSearch(text, pattern)).toEqual([0, 1, 2, 3]);
});

test('kmpSearchNoMatch @kmp @stringSearch', () => {
  const text = 'ABCDEFG';
  const pattern = 'HIJ';
  expect(kmpSearch(text, pattern)).toEqual([]);
});

test('kmpSearchEmptyPattern @kmp @stringSearch', () => {
  const text = 'ABCDEFG';
  const pattern = '';
  expect(kmpSearch(text, pattern)).toEqual([]);
});

test('kmpSearchPatternEqualsText @kmp @stringSearch', () => {
  const text = 'HELLO';
  const pattern = 'HELLO';
  expect(kmpSearch(text, pattern)).toEqual([0]);
});
