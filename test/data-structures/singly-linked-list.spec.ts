import { LinkedList } from '@data-structures/SinglyLinkedList';

describe('LinkedList', () => {
  test('canAddAndRetrieveElements @linkedList @addGet', () => {
    const list = new LinkedList<number>();
    list.add(10);
    list.add(20);
    list.add(30);

    expect(list.size).toBe(3);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
    expect(list.get(2)).toBe(30);
  });

  test('canAddFirst @linkedList @addFirst', () => {
    const list = new LinkedList<number>();
    list.add(1);
    list.addFirst(0);

    expect(list.size).toBe(2);
    expect(list.get(0)).toBe(0);
    expect(list.get(1)).toBe(1);
  });

  test('throwsErrorOnGetOutOfBounds @linkedList @get', () => {
    const list = new LinkedList<number>();
    list.add(1);

    expect(() => list.get(-1)).toThrow(RangeError);
    expect(() => list.get(1)).toThrow(RangeError);
  });

  test('canSetValues @linkedList @set', () => {
    const list = new LinkedList<string>();
    list.add('a');
    list.add('b');
    list.set(1, 'c');

    expect(list.get(1)).toBe('c');
  });

  test('canRemoveAtIndex @linkedList @removeAt', () => {
    const list = new LinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);

    const removed = list.removeAt(1);
    expect(removed).toBe(2);
    expect(list.size).toBe(2);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(3);
  });

  test('removeAtThrowsOnInvalidIndex @linkedList @removeAt', () => {
    const list = new LinkedList<number>();
    expect(() => list.removeAt(0)).toThrow(RangeError);
  });

  test('canRemoveByValue @linkedList @remove', () => {
    const list = new LinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);

    const removed = list.remove(2);
    expect(removed).toBe(true);
    expect(list.size).toBe(2);
    expect(list.contains(2)).toBe(false);

    const removeNonExisting = list.remove(99);
    expect(removeNonExisting).toBe(false);
  });

  test('indexOfAndContainsWork @linkedList @indexOf @contains', () => {
    const list = new LinkedList<string>();
    list.add('x');
    list.add('y');

    expect(list.indexOf('y')).toBe(1);
    expect(list.indexOf('z')).toBe(-1);
    expect(list.contains('x')).toBe(true);
    expect(list.contains('z')).toBe(false);
  });

  test('forEachIteratesCorrectly @linkedList @forEach', () => {
    const list = new LinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);

    const result: number[] = [];
    list.forEach((value, index) => result.push(value + index));

    expect(result).toEqual([1, 3, 5]);
  });

  test('mapFiltersReducesCorrectly @linkedList @map @filter @reduce', () => {
    const list = new LinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);

    const mapped = list.map((v) => v * 2);
    expect(mapped).toEqual([2, 4, 6]);

    const filtered = list.filter((v) => v % 2 === 1);
    expect(filtered).toEqual([1, 3]);

    const reduced = list.reduce((acc, v) => acc + v, 0);
    expect(reduced).toBe(6);
  });

  test('clearEmptiesTheList @linkedList @clear', () => {
    const list = new LinkedList<number>();
    list.add(1);
    list.add(2);
    list.clear();

    expect(list.size).toBe(0);
    expect(() => list.get(0)).toThrow(RangeError);
  });

  test('toArrayReturnsCorrectArray @linkedList @toArray', () => {
    const list = new LinkedList<number>();
    list.add(5);
    list.add(10);
    list.add(15);

    expect(list.toArray()).toEqual([5, 10, 15]);
  });

  test('edgeCaseSingleElement @linkedList @edgeCase', () => {
    const list = new LinkedList<number>();
    list.add(42);

    expect(list.get(0)).toBe(42);
    expect(list.size).toBe(1);

    const removed = list.removeAt(0);
    expect(removed).toBe(42);
    expect(list.size).toBe(0);
    expect(() => list.get(0)).toThrow(RangeError);
  });

  test('edgeCaseEmptyList @linkedList @edgeCase', () => {
    const list = new LinkedList<number>();
    expect(list.size).toBe(0);
    expect(list.contains(1)).toBe(false);
    expect(list.indexOf(1)).toBe(-1);
    expect(list.toArray()).toEqual([]);
  });
});
