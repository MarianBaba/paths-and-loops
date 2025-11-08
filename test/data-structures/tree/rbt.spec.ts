import { Color, RedBlackTree } from '@data-structures/tree/RedBlackTree';

describe('RedBlackTree', () => {
  test('canInsertAndSearchValues @rbt @insert @search', () => {
    const rbt = new RedBlackTree<number>();
    rbt.insert(10);
    rbt.insert(5);
    rbt.insert(15);

    expect(rbt.search(10)).toBe(true);
    expect(rbt.search(5)).toBe(true);
    expect(rbt.search(15)).toBe(true);
    expect(rbt.search(20)).toBe(false);
  });

  test('duplicatesAreIgnored @rbt @insert', () => {
    const rbt = new RedBlackTree<number>();
    rbt.insert(10);
    rbt.insert(10);
    rbt.insert(5);
    rbt.insert(5);

    expect(rbt.toArray()).toEqual([5, 10]);
  });

  test('minAndMaxValues @rbt @min @max', () => {
    const rbt = new RedBlackTree<number>();
    rbt.insert(10);
    rbt.insert(5);
    rbt.insert(15);
    rbt.insert(3);

    expect(rbt.min()).toBe(3);
    expect(rbt.max()).toBe(15);
  });

  test('inOrderTraversal @rbt @inOrder', () => {
    const rbt = new RedBlackTree<number>();
    rbt.insert(10);
    rbt.insert(5);
    rbt.insert(15);
    rbt.insert(7);

    const result: number[] = [];
    rbt.inOrder((v) => result.push(v));
    expect(result).toEqual([5, 7, 10, 15]);
  });

  test('preOrderTraversal @rbt @preOrder', () => {
    const rbt = new RedBlackTree<number>();
    rbt.insert(10);
    rbt.insert(5);
    rbt.insert(15);
    rbt.insert(7);

    const result: number[] = [];
    rbt.preOrder((v) => result.push(v));
    expect(result).toEqual([10, 5, 7, 15]);
  });

  test('postOrderTraversal @rbt @postOrder', () => {
    const rbt = new RedBlackTree<number>();
    rbt.insert(10);
    rbt.insert(5);
    rbt.insert(15);
    rbt.insert(7);

    const result: number[] = [];
    rbt.postOrder((v) => result.push(v));
    expect(result).toEqual([7, 5, 15, 10]);
  });

  test('clearEmptiesTree @rbt @clear', () => {
    const rbt = new RedBlackTree<number>();
    rbt.insert(10);
    rbt.insert(5);
    rbt.clear();

    expect(rbt.toArray()).toEqual([]);
    expect(rbt.search(10)).toBe(false);
  });

  test('customComparatorWorks @rbt @customComparator', () => {
    const rbt = new RedBlackTree<string>((a, b) => a.localeCompare(b));
    rbt.insert('c');
    rbt.insert('a');
    rbt.insert('b');

    expect(rbt.toArray()).toEqual(['a', 'b', 'c']);
  });

  test('rootIsAlwaysBlack @rbt @property', () => {
    const rbt = new RedBlackTree<number>();
    [10, 5, 15, 20].forEach((v) => rbt.insert(v));

    expect(rbt['root']!.color).toBe(Color.BLACK);
  });

  test('redNodesHaveBlackChildren @rbt @property', () => {
    const rbt = new RedBlackTree<number>();
    [10, 5, 15, 1, 7, 12, 18].forEach((v) => rbt.insert(v));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function checkRedChildren(node: any): boolean {
      if (!node) return true;
      if (node.color === Color.RED) {
        if (
          (node.left && node.left.color === Color.RED) ||
          (node.right && node.right.color === Color.RED)
        ) {
          return false;
        }
      }
      return checkRedChildren(node.left) && checkRedChildren(node.right);
    }

    expect(checkRedChildren(rbt['root'])).toBe(true);
  });

  test('allPathsHaveSameBlackHeight @rbt @property', () => {
    const rbt = new RedBlackTree<number>();
    [10, 5, 15, 1, 7, 12, 18].forEach((v) => rbt.insert(v));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function blackHeight(node: any): number {
      if (!node) return 1; // null leaf counts as black
      const leftHeight = blackHeight(node.left);
      const rightHeight = blackHeight(node.right);
      if (leftHeight !== rightHeight) throw new Error('Black height mismatch');
      return leftHeight + (node.color === Color.BLACK ? 1 : 0);
    }

    expect(() => blackHeight(rbt['root'])).not.toThrow();
  });
});
