import { UnionFind } from '@data-structures/UnionFind';

describe('UnionFind', () => {
  test('elementsAreInitiallySeparate @uf @add', () => {
    const uf = new UnionFind<number>();
    uf.add(1);
    uf.add(2);

    expect(uf.connected(1, 2)).toBe(false);
    expect(uf.find(1)).toBe(1);
    expect(uf.find(2)).toBe(2);
  });

  test('unionMergesSets @uf @union', () => {
    const uf = new UnionFind<number>();
    uf.add(1);
    uf.add(2);
    uf.union(1, 2);

    expect(uf.connected(1, 2)).toBe(true);
    expect(uf.find(1)).toBe(uf.find(2));
  });

  test('multipleUnionsMaintainCorrectConnections @uf @multiUnion', () => {
    const uf = new UnionFind<number>();
    uf.union(1, 2);
    uf.union(2, 3);
    uf.union(4, 5);

    expect(uf.connected(1, 3)).toBe(true);
    expect(uf.connected(1, 4)).toBe(false);
    expect(uf.connected(4, 5)).toBe(true);
  });

  test('connectedReturnsFalseForUnknownElements @uf @edgeCase', () => {
    const uf = new UnionFind<number>();
    uf.add(1);
    expect(uf.connected(1, 2)).toBe(false);
    expect(() => uf.find(2)).toThrow();
  });

  test('setsReturnsCorrectRepresentatives @uf @sets', () => {
    const uf = new UnionFind<number>();
    uf.union(1, 2);
    uf.union(3, 4);
    uf.union(2, 3);

    const sets = uf.sets();
    const rep = uf.find(1);

    [1, 2, 3, 4].forEach((x) => {
      expect(sets.get(x)).toBe(rep);
    });
  });

  test('unionWithPathCompression @uf @pathCompression', () => {
    const uf = new UnionFind<number>();
    uf.union(1, 2);
    uf.union(2, 3);
    uf.union(3, 4);

    // After find, all should point to the same root
    const root = uf.find(4);
    [1, 2, 3, 4].forEach((x) => {
      expect(uf.find(x)).toBe(root);
    });
  });

  test('unionByRankKeepsShallowTree @uf @rank', () => {
    const uf = new UnionFind<number>();
    uf.union(1, 2);
    uf.union(3, 4);
    uf.union(1, 3); // merges two sets of same rank

    const root = uf.find(1);
    [1, 2, 3, 4].forEach((x) => {
      expect(uf.find(x)).toBe(root);
    });
  });
});
