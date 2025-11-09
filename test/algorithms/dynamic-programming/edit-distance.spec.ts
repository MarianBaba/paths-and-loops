import { editDistance } from '@algorithms/dynamic-programming/edit-distance';

test('editDistanceBasic @editDistance @dp', () => {
  const a = 'kitten';
  const b = 'sitting';
  expect(editDistance(a, b)).toBe(3);
});

test('editDistanceEmptyStrings @editDistance @dp', () => {
  expect(editDistance('', '')).toBe(0);
});

test('editDistanceOneEmptyString @editDistance @dp', () => {
  expect(editDistance('abc', '')).toBe(3);
  expect(editDistance('', 'abc')).toBe(3);
});

test('editDistanceSameStrings @editDistance @dp', () => {
  expect(editDistance('hello', 'hello')).toBe(0);
});

test('editDistanceComplexCase @editDistance @dp', () => {
  const a = 'algorithm';
  const b = 'altruistic';
  expect(editDistance(a, b)).toBe(6);
});
