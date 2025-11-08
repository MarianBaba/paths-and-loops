import { AVLTree } from '@data-structures/tree/AVLTree';

describe('AVLTree', () => {
  test('canInsertAndSearchValues @avl @insert @search', () => {
    const avl = new AVLTree<number>();
    avl.insert(10);
    avl.insert(5);
    avl.insert(15);

    expect(avl.search(10)).toBe(true);
    expect(avl.search(5)).toBe(true);
    expect(avl.search(15)).toBe(true);
    expect(avl.search(20)).toBe(false);
  });

  test('duplicatesAreIgnored @avl @insert', () => {
    const avl = new AVLTree<number>();
    avl.insert(10);
    avl.insert(10);
    avl.insert(5);
    avl.insert(5);

    expect(avl.toArray()).toEqual([5, 10]);
  });

  test('minAndMaxValues @avl @min @max', () => {
    const avl = new AVLTree<number>();
    avl.insert(10);
    avl.insert(5);
    avl.insert(15);
    avl.insert(3);

    expect(avl.min()).toBe(3);
    expect(avl.max()).toBe(15);
  });

  test('inOrderTraversal @avl @inOrder', () => {
    const avl = new AVLTree<number>();
    avl.insert(10);
    avl.insert(5);
    avl.insert(15);
    avl.insert(7);

    const result: number[] = [];
    avl.inOrder((v) => result.push(v));
    expect(result).toEqual([5, 7, 10, 15]);
  });

  test('preOrderTraversal @avl @preOrder', () => {
    const avl = new AVLTree<number>();
    avl.insert(10);
    avl.insert(5);
    avl.insert(15);
    avl.insert(7);

    const result: number[] = [];
    avl.preOrder((v) => result.push(v));
    expect(result).toEqual([10, 5, 7, 15]);
  });

  test('postOrderTraversal @avl @postOrder', () => {
    const avl = new AVLTree<number>();
    avl.insert(10);
    avl.insert(5);
    avl.insert(15);
    avl.insert(7);

    const result: number[] = [];
    avl.postOrder((v) => result.push(v));
    expect(result).toEqual([7, 5, 15, 10]);
  });

  test('canRemoveLeafNode @avl @remove', () => {
    const avl = new AVLTree<number>();
    avl.insert(10);
    avl.insert(5);
    avl.insert(15);

    avl.remove(5);
    expect(avl.search(5)).toBe(false);
    expect(avl.toArray()).toEqual([10, 15]);
  });

  test('canRemoveNodeWithOneChild @avl @remove', () => {
    const avl = new AVLTree<number>();
    avl.insert(10);
    avl.insert(5);
    avl.insert(7); // 5 has one child now

    avl.remove(5);
    expect(avl.search(5)).toBe(false);
    expect(avl.toArray()).toEqual([7, 10]);
  });

  test('canRemoveNodeWithTwoChildren @avl @remove', () => {
    const avl = new AVLTree<number>();
    avl.insert(10);
    avl.insert(5);
    avl.insert(15);
    avl.insert(12);
    avl.insert(18);

    avl.remove(15); // node with two children
    expect(avl.search(15)).toBe(false);
    expect(avl.toArray()).toEqual([5, 10, 12, 18]);
  });

  test('removingNonExistentValueDoesNothing @avl @remove', () => {
    const avl = new AVLTree<number>();
    avl.insert(10);
    avl.remove(20); // does not exist
    expect(avl.toArray()).toEqual([10]);
  });

  test('clearEmptiesTree @avl @clear', () => {
    const avl = new AVLTree<number>();
    avl.insert(10);
    avl.insert(5);
    avl.clear();
    expect(avl.toArray()).toEqual([]);
    expect(avl.search(10)).toBe(false);
  });

  test('treeRemainsBalancedAfterInsertions @avl @balance', () => {
    const avl = new AVLTree<number>();
    const values = [10, 20, 30, 40, 50, 25];
    values.forEach((v) => avl.insert(v));

    // Function to recursively check balance factor
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function checkBalanced(node: any): boolean {
      if (!node) return true;
      const leftHeight = node.left ? node.left.height : 0;
      const rightHeight = node.right ? node.right.height : 0;
      const balance = leftHeight - rightHeight;
      return Math.abs(balance) <= 1 && checkBalanced(node.left) && checkBalanced(node.right);
    }

    expect(checkBalanced(avl['root'])).toBe(true);
  });

  test('customComparatorWorks @avl @customComparator', () => {
    const avl = new AVLTree<string>((a, b) => a.localeCompare(b));
    avl.insert('c');
    avl.insert('a');
    avl.insert('b');

    expect(avl.toArray()).toEqual(['a', 'b', 'c']);
  });
});
