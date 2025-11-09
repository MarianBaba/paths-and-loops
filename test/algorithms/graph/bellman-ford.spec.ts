import { bellmanFord } from '@algorithms/graph/bellman-ford';

type BFEdge = { from: number; to: number; weight: number };

test('bellmanFordBasic @bellmanFord @graph', () => {
  const edges: BFEdge[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 5 },
    { from: 1, to: 2, weight: -2 },
  ];
  const vertexCount = 3;
  const start = 0;

  expect(bellmanFord(edges, vertexCount, start)).toEqual([0, 4, 2]);
});

test('bellmanFordNoEdges @bellmanFord @graph', () => {
  const edges: BFEdge[] = [];
  const vertexCount = 3;
  const start = 0;

  expect(bellmanFord(edges, vertexCount, start)).toEqual([0, Infinity, Infinity]);
});

test('bellmanFordNegativeEdgeNoCycle @bellmanFord @graph', () => {
  const edges: BFEdge[] = [
    { from: 0, to: 1, weight: 1 },
    { from: 1, to: 2, weight: -1 },
    { from: 0, to: 2, weight: 4 },
  ];
  const vertexCount = 3;
  const start = 0;

  expect(bellmanFord(edges, vertexCount, start)).toEqual([0, 1, 0]);
});

test('bellmanFordNegativeCycle @bellmanFord @graph', () => {
  const edges: BFEdge[] = [
    { from: 0, to: 1, weight: 1 },
    { from: 1, to: 2, weight: -1 },
    { from: 2, to: 0, weight: -1 },
  ];
  const vertexCount = 3;
  const start = 0;

  expect(bellmanFord(edges, vertexCount, start)).toBeNull();
});

test('bellmanFordDisconnectedGraph @bellmanFord @graph', () => {
  const edges: BFEdge[] = [{ from: 0, to: 1, weight: 3 }];
  const vertexCount = 4;
  const start = 0;

  expect(bellmanFord(edges, vertexCount, start)).toEqual([0, 3, Infinity, Infinity]);
});
