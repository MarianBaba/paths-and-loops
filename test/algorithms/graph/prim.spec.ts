import { prim } from '@algorithms/graph/prim';

type PrimEdge = { to: number; weight: number };

test('primBasic @prim @mst @graph', () => {
  const graph: PrimEdge[][] = [
    [
      { to: 1, weight: 2 },
      { to: 3, weight: 6 },
    ],
    [
      { to: 0, weight: 2 },
      { to: 2, weight: 3 },
      { to: 3, weight: 8 },
    ],
    [
      { to: 1, weight: 3 },
      { to: 3, weight: 7 },
    ],
    [
      { to: 0, weight: 6 },
      { to: 1, weight: 8 },
      { to: 2, weight: 7 },
    ],
  ];

  const key = prim(graph, 0);
  expect(key).toEqual([0, 2, 3, 6]);
});

test('primSingleNode @prim @mst @graph', () => {
  const graph: PrimEdge[][] = [[]];
  const key = prim(graph, 0);
  expect(key).toEqual([0]);
});

test('primDisconnectedGraph @prim @mst @graph', () => {
  const graph: PrimEdge[][] = [[{ to: 1, weight: 1 }], [{ to: 0, weight: 1 }], []];
  const key = prim(graph, 0);
  expect(key).toEqual([0, 1, Infinity]);
});

test('primGraphWithMultipleEdges @prim @mst @graph', () => {
  const graph: PrimEdge[][] = [
    [
      { to: 1, weight: 1 },
      { to: 2, weight: 4 },
    ],
    [
      { to: 0, weight: 1 },
      { to: 2, weight: 2 },
      { to: 3, weight: 6 },
    ],
    [
      { to: 0, weight: 4 },
      { to: 1, weight: 2 },
      { to: 3, weight: 3 },
    ],
    [
      { to: 1, weight: 6 },
      { to: 2, weight: 3 },
    ],
  ];

  const key = prim(graph, 0);
  expect(key).toEqual([0, 1, 2, 3]);
});

test('primStartFromDifferentNode @prim @mst @graph', () => {
  const graph: PrimEdge[][] = [
    [
      { to: 1, weight: 1 },
      { to: 2, weight: 4 },
    ],
    [
      { to: 0, weight: 1 },
      { to: 2, weight: 2 },
    ],
    [
      { to: 0, weight: 4 },
      { to: 1, weight: 2 },
    ],
  ];

  const key = prim(graph, 2);
  expect(key).toEqual([1, 2, 0]);
});
