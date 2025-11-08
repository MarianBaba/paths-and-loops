import { Heap } from '@data-structures/tree/Heap';

describe('Heap', () => {
  test('insertAndExtractMinHeap @heap @insert @extract', () => {
    const heap = new Heap<number>(); // min-heap by default
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);
    heap.insert(1);

    const result: number[] = [];
    while (heap.size() > 0) {
      result.push(heap.extract()!);
    }

    expect(result).toEqual([1, 3, 5, 8]);
  });

  test('peekShowsTopWithoutRemoving @heap @peek', () => {
    const heap = new Heap<number>();
    heap.insert(10);
    heap.insert(5);

    expect(heap.peek()).toBe(5);
    expect(heap.size()).toBe(2); // size remains same
  });

  test('duplicatesAreHandledCorrectly @heap @duplicates', () => {
    const heap = new Heap<number>();
    heap.insert(5);
    heap.insert(5);
    heap.insert(3);

    expect(heap.size()).toBe(3);
    expect(heap.extract()).toBe(3);
    expect(heap.extract()).toBe(5);
    expect(heap.extract()).toBe(5);
  });

  test('emptyHeapBehavesCorrectly @heap @empty', () => {
    const heap = new Heap<number>();
    expect(heap.peek()).toBeUndefined();
    expect(heap.extract()).toBeUndefined();
    expect(heap.size()).toBe(0);
  });

  test('clearEmptiesHeap @heap @clear', () => {
    const heap = new Heap<number>();
    heap.insert(1);
    heap.insert(2);
    heap.clear();
    expect(heap.size()).toBe(0);
    expect(heap.peek()).toBeUndefined();
  });

  test('customComparatorMaxHeap @heap @customComparator', () => {
    const maxHeap = new Heap<number>((a, b) => b - a); // max-heap
    maxHeap.insert(1);
    maxHeap.insert(5);
    maxHeap.insert(3);

    const result: number[] = [];
    while (maxHeap.size() > 0) {
      result.push(maxHeap.extract()!);
    }

    expect(result).toEqual([5, 3, 1]);
  });

  test('toArrayReturnsHeapElements @heap @toArray', () => {
    const heap = new Heap<number>();
    heap.insert(2);
    heap.insert(4);
    heap.insert(1);

    const arr = heap.toArray();
    expect(arr.length).toBe(3);
    expect(arr).toEqual(expect.arrayContaining([1, 2, 4]));
  });
});
