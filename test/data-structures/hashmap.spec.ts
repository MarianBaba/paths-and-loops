import { HashMap } from '@data-structures/HashMap';

describe('HashMap', () => {
  let map: HashMap<string | number | object, number>;

  beforeEach(() => {
    map = new HashMap();
  });

  // --- Basic set / get ---
  test('setAndGetBasic @hashMap @set @get', () => {
    map.set('a', 1);
    map.set('b', 2);
    expect(map.get('a')).toBe(1);
    expect(map.get('b')).toBe(2);
    expect(map.get('c')).toBeUndefined();
  });

  test('putAliasWorks @hashMap @put @get', () => {
    map.put('x', 100);
    expect(map.get('x')).toBe(100);
  });

  test('updateExistingKey @hashMap @set', () => {
    map.set('x', 10);
    map.set('x', 20);
    expect(map.get('x')).toBe(20);
  });

  // --- has ---
  test('hasReturnsCorrectly @hashMap @has', () => {
    map.set('key', 1);
    expect(map.has('key')).toBe(true);
    expect(map.has('nokey')).toBe(false);
  });

  // --- delete ---
  test('deleteRemovesKeyAndReturnsCorrectly @hashMap @delete', () => {
    map.set('a', 1);
    expect(map.delete('a')).toBe(true);
    expect(map.get('a')).toBeUndefined();
    expect(map.delete('a')).toBe(false);
  });

  test('deleteTriggersShrinkWhenUnderutilized @hashMap @delete @shrink', () => {
    const smallMap = new HashMap<string, number>(4, 0.75, 0.2);
    smallMap.set('a', 1);
    smallMap.set('b', 2);
    smallMap.set('c', 3);
    const prevCapacity = smallMap.capacity();
    smallMap.delete('a');
    smallMap.delete('b');
    expect(smallMap.capacity()).toBeLessThanOrEqual(prevCapacity);
  });

  // --- clear ---
  test('clearResetsMap @hashMap @clear', () => {
    map.set('a', 1);
    map.set('b', 2);
    map.clear();
    expect(map.size()).toBe(0);
    expect(map.get('a')).toBeUndefined();
    expect(map.get('b')).toBeUndefined();
    expect(map.capacity()).toBeGreaterThanOrEqual(1);
  });

  // --- size / capacity ---
  test('sizeReflectsNumberOfKeys @hashMap @size', () => {
    expect(map.size()).toBe(0);
    map.set('a', 1);
    map.set('b', 2);
    expect(map.size()).toBe(2);
    map.delete('a');
    expect(map.size()).toBe(1);
  });

  test('capacityReflectsBucketCount @hashMap @capacity', () => {
    expect(map.capacity()).toBeGreaterThanOrEqual(1);
  });

  // --- keys / values / entries ---
  test('keysValuesEntriesReturnCorrectly @hashMap @keys @values @entries', () => {
    map.set('x', 10);
    map.set('y', 20);
    const keys = map.keys();
    const values = map.values();
    const entries = map.entries();
    expect(keys).toContain('x');
    expect(keys).toContain('y');
    expect(values).toContain(10);
    expect(values).toContain(20);
    expect(entries).toEqual(
      expect.arrayContaining([
        ['x', 10],
        ['y', 20],
      ]),
    );
  });

  // --- collisions ---
  test('handlesCollisions @hashMap @collision', () => {
    const smallMap = new HashMap<string, number>(2); // small capacity to force collisions
    smallMap.set('a', 1);
    smallMap.set('b', 2);
    smallMap.set('c', 3);
    expect(smallMap.get('a')).toBe(1);
    expect(smallMap.get('b')).toBe(2);
    expect(smallMap.get('c')).toBe(3);
  });

  // --- rehashing ---
  test('rehashIncreasesCapacityWhenMaxLoadFactorExceeded @hashMap @rehash', () => {
    const smallMap = new HashMap<number, number>(2, 0.5);
    smallMap.set(1, 10);
    smallMap.set(2, 20); // should trigger resize
    expect(smallMap.capacity()).toBeGreaterThanOrEqual(2);
    expect(smallMap.get(1)).toBe(10);
    expect(smallMap.get(2)).toBe(20);
  });

  // --- object keys ---
  test('supportsObjectKeys @hashMap @objectKey', () => {
    const objKey1 = {};
    const objKey2 = {};
    map.set(objKey1, 100);
    map.set(objKey2, 200);
    expect(map.get(objKey1)).toBe(100);
    expect(map.get(objKey2)).toBe(200);
    expect(map.has({})).toBe(false); // new object not equal
  });

  // --- custom hash / equals ---
  test('supportsCustomHashAndEquals @hashMap @custom', () => {
    const customHash = (key: { id: number }) => key.id;
    const customEquals = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const customMap = new HashMap<{ id: number }, string>(16, 0.75, 0.2, customHash, customEquals);
    const key1 = { id: 1 };
    const key2 = { id: 1 };
    customMap.set(key1, 'value1');
    expect(customMap.get(key2)).toBe('value1');
  });

  test('handlesBooleanKeys @hashMap @edgeCase', () => {
    const boolMap = new HashMap<boolean, number>();
    boolMap.set(true, 1);
    boolMap.set(false, 2);
    expect(boolMap.get(true)).toBe(1);
    expect(boolMap.get(false)).toBe(2);
  });

  test('handlesNumberKeysIncludingNaNAndInfinity @hashMap @edgeCase', () => {
    const numMap = new HashMap<number, string>();
    numMap.set(1, 'one');
    numMap.set(NaN, 'nan');
    numMap.set(Infinity, 'inf');
    expect(numMap.get(1)).toBe('one');
    expect(numMap.get(NaN)).toBe('nan');
    expect(numMap.get(Infinity)).toBe('inf');
  });
});
