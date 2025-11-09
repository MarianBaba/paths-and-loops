import { kruskal } from '@algorithms/graph/kruskal';

type KruskalEdge = { from: number; to: number; weight: number };

test('kruskalBasic @kruskal @mst @graph', () => {
  const edges: KruskalEdge[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 3 },
    { from: 1, to: 2, weight: 1 },
    { from: 1, to: 3, weight: 2 },
    { from: 2, to: 3, weight: 4 },
  ];
  const vertexCount = 4;

  const mst = kruskal(vertexCount, edges);

  // MST should have vertexCount - 1 edges
  expect(mst.length).toBe(vertexCount - 1);

  // Total weight of MST should be minimal
  const totalWeight = mst.reduce((sum, e) => sum + e.weight, 0);
  expect(totalWeight).toBe(6); // edges with weights 1, 2, 3
});

test('kruskalSingleNode @kruskal @mst @graph', () => {
  const edges: KruskalEdge[] = [];
  const vertexCount = 1;

  const mst = kruskal(vertexCount, edges);
  expect(mst).toEqual([]);
});

test('kruskalDisconnectedGraph @kruskal @mst @graph', () => {
  const edges: KruskalEdge[] = [{ from: 0, to: 1, weight: 1 }];
  const vertexCount = 3;

  const mst = kruskal(vertexCount, edges);
  expect(mst.length).toBe(1);
  expect(mst[0]).toEqual({ from: 0, to: 1, weight: 1 });
});

test('kruskalMultipleEqualEdges @kruskal @mst @graph', () => {
  const edges: KruskalEdge[] = [
    { from: 0, to: 1, weight: 1 },
    { from: 1, to: 2, weight: 1 },
    { from: 0, to: 2, weight: 1 },
  ];
  const vertexCount = 3;

  const mst = kruskal(vertexCount, edges);
  expect(mst.length).toBe(2);
  const totalWeight = mst.reduce((sum, e) => sum + e.weight, 0);
  expect(totalWeight).toBe(2);
});
