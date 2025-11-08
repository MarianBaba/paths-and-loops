// test/data-structures/stack.spec.ts
import { Stack } from '@data-structures/Stack';

describe('Stack', () => {
  let s: Stack<number>;

  beforeEach(() => {
    // small initial capacity to exercise resize/shrink behavior
    s = new Stack<number>(4, 0.3);
  });

  // push / size
  test('pushAddsElementAndIncreasesSize @stack @push', () => {
    s.push(1);
    s.push(2);
    expect(s.size()).toBe(2);
    expect(s.toArray()).toEqual([1, 2]); // bottom -> top
  });

  test('pushTriggersResizeWhenCapacityExceeded @stack @push @resize', () => {
    s.push(1);
    s.push(2);
    s.push(3);
    s.push(4);
    expect(s.capacity()).toBe(4);
    s.push(5); // triggers resize
    expect(s.size()).toBe(5);
    expect(s.capacity()).toBeGreaterThanOrEqual(8);
    expect(s.toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  // peek
  test('peekReturnsTopWithoutRemoving @stack @peek', () => {
    expect(s.peek()).toBeUndefined();
    s.push(10);
    s.push(20);
    expect(s.peek()).toBe(20);
    expect(s.size()).toBe(2);
  });

  // pop
  test('popRemovesTopAndReturnsIt @stack @pop', () => {
    s.push(1);
    s.push(2);
    expect(s.pop()).toBe(2);
    expect(s.size()).toBe(1);
    expect(s.pop()).toBe(1);
    expect(s.isEmpty()).toBe(true);
  });

  test('popOnEmptyReturnsUndefined @stack @pop', () => {
    expect(s.pop()).toBeUndefined();
    s.push(1);
    expect(s.pop()).toBe(1);
    expect(s.pop()).toBeUndefined();
  });

  test('popTriggersShrinkWhenUnderutilized @stack @pop @shrink', () => {
    // grow first
    for (let i = 0; i < 12; i++) s.push(i);
    expect(s.capacity()).toBeGreaterThanOrEqual(12);
    // pop many to go below shrink threshold
    for (let i = 0; i < 11; i++) s.pop();
    expect(s.size()).toBe(1);
    expect(s.capacity()).toBeGreaterThanOrEqual(4); // not below initial
    expect(s.peek()).toBe(0);
  });

  // clear
  test('clearRemovesAllElementsAndResetsCapacity @stack @clear', () => {
    s.push(1);
    s.push(2);
    s.clear();
    expect(s.size()).toBe(0);
    expect(s.isEmpty()).toBe(true);
    expect(s.capacity()).toBeGreaterThanOrEqual(4); // initial capacity
    expect(s.toArray()).toEqual([]);
  });

  // toArray order and forEach iteration
  test('toArrayReturnsBottomToTopOrder @stack @toArray', () => {
    s.push(5);
    s.push(6);
    s.push(7);
    expect(s.toArray()).toEqual([5, 6, 7]);
  });

  test('forEachIteratesFromTopToBottom @stack @forEach', () => {
    s.push(1);
    s.push(2);
    s.push(3);
    const out: number[] = [];
    s.forEach((v, idx) => {
      // idx 0 = top element
      out.push(v + idx);
    });
    // top->bottom iteration: values [3,2,1] -> add idx [0,1,2] = [3,3,3]
    expect(out).toEqual([3, 3, 3]);
  });

  // mixed operations
  test('mixedPushPopMaintainsCorrectSizeAndOrder @stack @stress', () => {
    for (let i = 0; i < 30; i++) {
      s.push(i);
      if (i % 4 === 0) s.pop();
    }

    // simulate expected stack
    const sim: number[] = [];
    for (let i = 0; i < 30; i++) {
      sim.push(i);
      if (i % 4 === 0) sim.pop();
    }
    expect(s.toArray()).toEqual(sim);
  });

  // capacity floor
  test('capacityNeverDropsBelowInitialCapacity @stack @shrink', () => {
    const initial = s.capacity();
    for (let i = 0; i < 32; i++) s.push(i);
    for (let i = 0; i < 32; i++) s.pop();
    expect(s.size()).toBe(0);
    expect(s.capacity()).toBeGreaterThanOrEqual(initial);
  });

  // edge: many peeks and pops
  test('manyPeeksDontChangeStateAndPopsWorkConsistently @stack @peek @pop', () => {
    s.push(42);
    expect(s.peek()).toBe(42);
    expect(s.peek()).toBe(42);
    expect(s.size()).toBe(1);
    expect(s.pop()).toBe(42);
    expect(s.peek()).toBeUndefined();
  });
});
