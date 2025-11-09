import { zAlgorithm } from '@algorithms/string/z-algorithm';

test('zAlgorithmAllSameChars @zAlgorithm @stringSearch', () => {
  const s = 'aaaa';
  expect(zAlgorithm(s)).toEqual([0, 3, 2, 1]);
});

test('zAlgorithmNoRepeats @zAlgorithm @stringSearch', () => {
  const s = 'abcd';
  expect(zAlgorithm(s)).toEqual([0, 0, 0, 0]);
});

test('zAlgorithmSingleChar @zAlgorithm @stringSearch', () => {
  const s = 'x';
  expect(zAlgorithm(s)).toEqual([0]);
});

test('zAlgorithmEmptyString @zAlgorithm @stringSearch', () => {
  const s = '';
  expect(zAlgorithm(s)).toEqual([]);
});
