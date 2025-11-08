import { BinarySearchTree } from '@data-structures/tree/BinarySearchTree';

describe('BinarySearchTree', () => {
  test('canInsertAndSearchValues @bst @insert @search', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);

    expect(bst.search(10)).toBe(true);
    expect(bst.search(5)).toBe(true);
    expect(bst.search(15)).toBe(true);
    expect(bst.search(20)).toBe(false);
  });

  test('minAndMaxValues @bst @min @max', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(3);

    expect(bst.min()).toBe(3);
    expect(bst.max()).toBe(15);
  });

  test('toArrayReturnsSortedValues @bst @toArray', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(7);

    expect(bst.toArray()).toEqual([5, 7, 10, 15]);
  });

  test('inOrderTraversal @bst @inOrder', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(7);

    const result: number[] = [];
    bst.inOrder((v) => result.push(v));
    expect(result).toEqual([5, 7, 10, 15]);
  });

  test('preOrderTraversal @bst @preOrder', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(7);

    const result: number[] = [];
    bst.preOrder((v) => result.push(v));
    expect(result).toEqual([10, 5, 7, 15]);
  });

  test('postOrderTraversal @bst @postOrder', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(7);

    const result: number[] = [];
    bst.postOrder((v) => result.push(v));
    expect(result).toEqual([7, 5, 15, 10]);
  });

  test('canRemoveLeafNode @bst @remove', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);

    bst.remove(5);
    expect(bst.search(5)).toBe(false);
    expect(bst.toArray()).toEqual([10, 15]);
  });

  test('canRemoveNodeWithOneChild @bst @remove', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(5);
    bst.insert(7); // 5 has one child now

    bst.remove(5);
    expect(bst.search(5)).toBe(false);
    expect(bst.toArray()).toEqual([7, 10]);
  });

  test('canRemoveNodeWithTwoChildren @bst @remove', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(12);
    bst.insert(18);

    bst.remove(15); // node with two children
    expect(bst.search(15)).toBe(false);
    expect(bst.toArray()).toEqual([5, 10, 12, 18]);
  });

  test('removingNonExistentValueDoesNothing @bst @remove', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.remove(20); // does not exist
    expect(bst.toArray()).toEqual([10]);
  });

  test('clearEmptiesTree @bst @clear', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(5);
    bst.clear();
    expect(bst.toArray()).toEqual([]);
    expect(bst.search(10)).toBe(false);
  });

  test('duplicatesAreIgnored @bst @insert', () => {
    const bst = new BinarySearchTree<number>();
    bst.insert(10);
    bst.insert(10); // duplicate
    bst.insert(5);
    bst.insert(5); // duplicate

    expect(bst.toArray()).toEqual([5, 10]);
  });

  test('customComparatorWorks @bst @customComparator', () => {
    const bst = new BinarySearchTree<string>((a, b) => a.localeCompare(b));
    bst.insert('c');
    bst.insert('a');
    bst.insert('b');

    expect(bst.toArray()).toEqual(['a', 'b', 'c']);
  });
});
