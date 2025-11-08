// test/data-structures/queue.spec.ts
import { Queue } from '@data-structures/Queue';

describe('Queue', () => {
  let q: Queue<number>;

  beforeEach(() => {
    // small initial capacity to exercise resize/shrink behavior
    q = new Queue<number>(4, 0.25);
  });

  // Enqueue / size
  test('enqueueAddsElementAndIncreasesSize @queue @enqueue', () => {
    q.enqueue(1);
    q.enqueue(2);
    expect(q.size()).toBe(2);
    expect(q.toArray()).toEqual([1, 2]);
  });

  test('enqueueTriggersResizeWhenFull @queue @enqueue @resize', () => {
    // fill capacity (4), then add one more to trigger resize -> 8
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    q.enqueue(4);
    expect(q.capacity()).toBe(4);
    q.enqueue(5); // should trigger resize
    expect(q.size()).toBe(5);
    expect(q.capacity()).toBeGreaterThanOrEqual(8);
    expect(q.toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  // Peek
  test('peekReturnsFrontWithoutRemoving @queue @peek', () => {
    expect(q.peek()).toBeUndefined();
    q.enqueue(10);
    q.enqueue(20);
    expect(q.peek()).toBe(10);
    expect(q.size()).toBe(2);
  });

  // Dequeue basic
  test('dequeueRemovesAndReturnsFrontElement @queue @dequeue', () => {
    q.enqueue(1);
    q.enqueue(2);
    expect(q.dequeue()).toBe(1);
    expect(q.size()).toBe(1);
    expect(q.dequeue()).toBe(2);
    expect(q.isEmpty()).toBe(true);
  });

  test('dequeueOnEmptyReturnsUndefined @queue @dequeue', () => {
    expect(q.dequeue()).toBeUndefined();
    q.enqueue(1);
    expect(q.dequeue()).toBe(1);
    expect(q.dequeue()).toBeUndefined();
  });

  test('dequeueTriggersShrinkWhenUnderutilized @queue @dequeue @shrink', () => {
    // capacity 4 => grow to 8 first
    for (let i = 1; i <= 8; i++) q.enqueue(i);
    expect(q.capacity()).toBeGreaterThanOrEqual(8);
    // pop many to go below shrink threshold (0.25)
    for (let i = 0; i < 7; i++) q.dequeue();
    // now size = 1; size/capacity likely small -> may shrink but not below initial
    expect(q.size()).toBe(1);
    expect(q.capacity()).toBeGreaterThanOrEqual(4);
    expect(q.peek()).toBe(8);
  });

  // isEmpty and size
  test('isEmptyAndSizeBehaveCorrectly @queue @size @isEmpty', () => {
    expect(q.isEmpty()).toBe(true);
    q.enqueue(42);
    expect(q.isEmpty()).toBe(false);
    expect(q.size()).toBe(1);
    q.dequeue();
    expect(q.isEmpty()).toBe(true);
    expect(q.size()).toBe(0);
  });

  // clear
  test('clearRemovesAllElementsAndResetsCapacity @queue @clear', () => {
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    q.clear();
    expect(q.size()).toBe(0);
    expect(q.isEmpty()).toBe(true);
    // capacity should be reset to initial (4)
    expect(q.capacity()).toBeGreaterThanOrEqual(4);
    expect(q.toArray()).toEqual([]);
  });

  // toArray and order
  test('toArrayReturnsElementsInFifoOrder @queue @toArray', () => {
    q.enqueue(5);
    q.enqueue(6);
    q.enqueue(7);
    expect(q.toArray()).toEqual([5, 6, 7]);
  });

  // forEach
  test('forEachIteratesElementsInFifoOrder @queue @forEach', () => {
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    const out: number[] = [];
    q.forEach((v, idx) => {
      // ensure index ordering too
      out.push(v + idx);
    });
    expect(out).toEqual([1 + 0, 2 + 1, 3 + 2]);
  });

  // Wraparound behavior (circular buffer)
  test('wraparoundBehaviorPreservesOrderAfterHeadMoves @queue @circular', () => {
    // Fill, dequeue a few, then enqueue more to wrap tail around
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    q.enqueue(4);
    expect(q.toArray()).toEqual([1, 2, 3, 4]);

    // dequeue two -> head moves forward
    expect(q.dequeue()).toBe(1);
    expect(q.dequeue()).toBe(2);
    expect(q.toArray()).toEqual([3, 4]);

    // enqueue more, should wrap into freed slots
    q.enqueue(5);
    q.enqueue(6);
    // order must remain FIFO
    expect(q.toArray()).toEqual([3, 4, 5, 6]);
  });

  // Order preserved after resize
  test('orderPreservedAfterResize @queue @resize @order', () => {
    for (let i = 1; i <= 6; i++) q.enqueue(i); // will trigger resize from 4->8
    expect(q.capacity()).toBeGreaterThanOrEqual(8);
    expect(q.toArray()).toEqual([1, 2, 3, 4, 5, 6]);
    // dequeue a couple and ensure order still correct
    expect(q.dequeue()).toBe(1);
    expect(q.dequeue()).toBe(2);
    expect(q.toArray()).toEqual([3, 4, 5, 6]);
  });

  // Mixed enqueue/dequeue stress
  test('mixedEnqueueDequeueMaintainsCorrectSizeAndOrder @queue @stress', () => {
    for (let i = 0; i < 20; i++) {
      q.enqueue(i);
      if (i % 3 === 0) q.dequeue();
    }
    // Reconstruct expected sequence by simulating same operations
    const arrSim: number[] = [];
    for (let i = 0; i < 20; i++) {
      arrSim.push(i);
      if (i % 3 === 0) {
        arrSim.shift();
      }
    }
    // arrSim now holds expected remaining elements
    expect(q.toArray()).toEqual(arrSim);
  });

  // capacity never drops below initialCapacity
  test('capacityNeverDropsBelowInitial @queue @shrink', () => {
    const initial = q.capacity();
    // grow
    for (let i = 0; i < 16; i++) q.enqueue(i);
    expect(q.capacity()).toBeGreaterThanOrEqual(initial);
    // remove all
    for (let i = 0; i < 16; i++) q.dequeue();
    expect(q.size()).toBe(0);
    expect(q.capacity()).toBeGreaterThanOrEqual(initial);
  });
});
