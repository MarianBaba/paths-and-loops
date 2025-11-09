import { rabinKarp } from '@algorithms/string/rabin-karp';

test('rabinKarpBasic @rabinKarp @stringSearch', () => {
  const text = 'ABABDABACDABABCABAB';
  const pattern = 'ABABCABAB';
  expect(rabinKarp(text, pattern)).toEqual([10]);
});

test('rabinKarpMultipleOccurrences @rabinKarp @stringSearch', () => {
  const text = 'AAAAA';
  const pattern = 'AA';
  expect(rabinKarp(text, pattern)).toEqual([0, 1, 2, 3]);
});

test('rabinKarpNoMatch @rabinKarp @stringSearch', () => {
  const text = 'ABCDEFG';
  const pattern = 'HIJ';
  expect(rabinKarp(text, pattern)).toEqual([]);
});

test('rabinKarpEmptyPattern @rabinKarp @stringSearch', () => {
  const text = 'ABCDEFG';
  const pattern = '';
  expect(rabinKarp(text, pattern)).toEqual([]);
});

test('rabinKarpPatternEqualsText @rabinKarp @stringSearch', () => {
  const text = 'HELLO';
  const pattern = 'HELLO';
  expect(rabinKarp(text, pattern)).toEqual([0]);
});
