import { DynamicArray } from "@data-structures/DynamicArray";

describe("DynamicArray", () => {
  let arr: DynamicArray<number>;

  beforeEach(() => {
    arr = new DynamicArray<number>(2); // small initial capacity to test resizing
  });

  test("pushAddsElementAndIncreasesSize @dynamicArray @push", () => {
    arr.push(1);
    arr.push(2);
    expect(arr.size()).toBe(2);
    expect(arr.toArray()).toEqual([1, 2]);
  });

  test("pushAddsElementAndResizesWhenCapacityExceeded @dynamicArray @push @resize", () => {
    arr.push(1);
    arr.push(2);
    arr.push(3);
    expect(arr.size()).toBe(3);
    expect(arr.capacity()).toBe(4);
  });

  test("getReturnsCorrectElement @dynamicArray @get", () => {
    arr.push(10);
    arr.push(20);
    expect(arr.get(0)).toBe(10);
    expect(arr.get(1)).toBe(20);
  });

  test("getReturnsUndefinedForOutOfBounds @dynamicArray @get", () => {
    expect(arr.get(-1)).toBeUndefined();
    expect(arr.get(0)).toBeUndefined();
  });

  test("setReplacesElementCorrectly @dynamicArray @set", () => {
    arr.push(5);
    arr.set(0, 50);
    expect(arr.get(0)).toBe(50);
  });

  test("setThrowsForOutOfBounds @dynamicArray @set", () => {
    expect(() => arr.set(1, 100)).toThrow();
    expect(() => arr.set(-1, 100)).toThrow();
  });

  test("popRemovesLastElementAndReturnsIt @dynamicArray @pop", () => {
    arr.push(1);
    arr.push(2);
    expect(arr.pop()).toBe(2);
    expect(arr.size()).toBe(1);
  });

  test("popOnEmptyArrayReturnsUndefined @dynamicArray @pop", () => {
    expect(arr.pop()).toBeUndefined();
  });

  test("popTriggersShrinkWhenUnderutilized @dynamicArray @pop @shrink", () => {
    arr.push(1);
    arr.push(2);
    arr.push(3);
    arr.pop();
    arr.pop();
    expect(arr.capacity()).toBeGreaterThanOrEqual(2);
  });

  test("insertAddsElementAtSpecificIndex @dynamicArray @insert", () => {
    arr.push(1);
    arr.push(3);
    arr.insert(1, 2);
    expect(arr.toArray()).toEqual([1, 2, 3]);
  });

  test("insertAtStartAndEnd @dynamicArray @insert", () => {
    arr.push(2);
    arr.insert(0, 1);
    arr.insert(2, 3);
    expect(arr.toArray()).toEqual([1, 2, 3]);
  });

  test("insertThrowsForInvalidIndex @dynamicArray @insert", () => {
    expect(() => arr.insert(-1, 5)).toThrow();
    expect(() => arr.insert(5, 5)).toThrow();
  });

  test("removeDeletesElementAtIndexAndShiftsElements @dynamicArray @remove", () => {
    arr.push(1);
    arr.push(2);
    arr.push(3);
    expect(arr.remove(1)).toBe(2);
    expect(arr.toArray()).toEqual([1, 3]);
  });

  test("removeReturnsUndefinedForInvalidIndex @dynamicArray @remove", () => {
    expect(arr.remove(-1)).toBeUndefined();
    expect(arr.remove(0)).toBeUndefined();
  });

  test("indexOfReturnsCorrectIndex @dynamicArray @search", () => {
    arr.push(5);
    arr.push(10);
    arr.push(15);
    expect(arr.indexOf(10)).toBe(1);
    expect(arr.indexOf(100)).toBe(-1);
  });

  test("containsReturnsCorrectBoolean @dynamicArray @search", () => {
    arr.push(5);
    arr.push(10);
    arr.push(15);
    expect(arr.contains(5)).toBe(true);
    expect(arr.contains(50)).toBe(false);
  });

  test("clearRemovesAllElementsAndResetsSize @dynamicArray @clear", () => {
    arr.push(1);
    arr.push(2);
    arr.clear();
    expect(arr.size()).toBe(0);
    expect(arr.toArray()).toEqual([]);
    expect(arr.capacity()).toBeGreaterThanOrEqual(2);
  });

  test("toArrayReturnsCopyOfElements @dynamicArray @toArray", () => {
    arr.push(1);
    arr.push(2);
    const copy = arr.toArray();
    expect(copy).toEqual([1, 2]);
    copy.push(3);
    expect(arr.size()).toBe(2);
  });

  test("forEachIteratesCorrectly @dynamicArray @forEach", () => {
    arr.push(1);
    arr.push(2);
    arr.push(3);
    const result: number[] = [];
    arr.forEach((x) => result.push(x * 2));
    expect(result).toEqual([2, 4, 6]);
  });

  test("mapReturnsNewDynamicArrayWithMappedValues @dynamicArray @map", () => {
    arr.push(1);
    arr.push(2);
    arr.push(3);
    const mapped = arr.map((x) => x * 10);
    expect(mapped.toArray()).toEqual([10, 20, 30]);
  });

  test("filterReturnsNewDynamicArrayWithFilteredValues @dynamicArray @filter", () => {
    arr.push(1);
    arr.push(2);
    arr.push(3);
    const filtered = arr.filter((x) => x % 2 === 1);
    expect(filtered.toArray()).toEqual([1, 3]);
  });

  test("reduceReducesArrayToSingleValue @dynamicArray @reduce", () => {
    arr.push(1);
    arr.push(2);
    arr.push(3);
    const sum = arr.reduce((acc, x) => acc + x, 0);
    expect(sum).toBe(6);
  });
});
