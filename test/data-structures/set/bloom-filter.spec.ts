import { BloomFilter } from '@data-structures/BloomFilter';

describe('BloomFilter', () => {
  test('addedElementsAreDetected @bloom @add @has', () => {
    const filter = new BloomFilter(128, 3);
    filter.add('apple');
    filter.add('banana');

    expect(filter.has('apple')).toBe(true);
    expect(filter.has('banana')).toBe(true);
  });

  test('nonAddedElementsMayBeFalsePositive @bloom @falsePositive', () => {
    const filter = new BloomFilter(16, 3); // intentionally small to trigger false positives
    filter.add('apple');
    filter.add('banana');

    const results: boolean[] = [];
    const testElements = ['apple', 'banana', 'cherry', 'date'];
    testElements.forEach((el) => results.push(filter.has(el)));

    // 'apple' and 'banana' must be true
    expect(results[0]).toBe(true);
    expect(results[1]).toBe(true);

    // 'cherry' and 'date' could be false or true (false positives possible)
    expect(results[2]).toBeDefined();
    expect(results[3]).toBeDefined();
  });

  test('neverFalseNegative @bloom @noFalseNegative', () => {
    const filter = new BloomFilter(64, 3);
    const items = ['x', 'y', 'z'];
    items.forEach((item) => filter.add(item));

    items.forEach((item) => {
      expect(filter.has(item)).toBe(true); // should always be detected
    });
  });

  test('clearEmptiesFilter @bloom @clear', () => {
    const filter = new BloomFilter(64, 3);
    filter.add('apple');
    filter.add('banana');

    filter.clear();

    expect(filter.has('apple')).toBe(false);
    expect(filter.has('banana')).toBe(false);
  });

  test('emptyFilterReturnsFalse @bloom @empty', () => {
    const filter = new BloomFilter(64, 3);
    expect(filter.has('apple')).toBe(false);
    expect(filter.has('banana')).toBe(false);
  });

  test('worksWithMultipleHashes @bloom @hashCount', () => {
    const filter1 = new BloomFilter(128, 1);
    const filter3 = new BloomFilter(128, 3);

    filter1.add('apple');
    filter3.add('apple');

    expect(filter1.has('apple')).toBe(true);
    expect(filter3.has('apple')).toBe(true);
  });
});
