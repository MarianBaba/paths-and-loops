import { dijkstra } from '@algorithms/graph/dijkstra';

type Edge = { to: number; weight: number };

test('dijkstraBasic @dijkstra @graph', () => {
  const graph: Edge[][] = [
    [
      { to: 1, weight: 4 },
      { to: 2, weight: 1 },
    ],
    [{ to: 3, weight: 1 }],
    [
      { to: 1, weight: 2 },
      { to: 3, weight: 5 },
    ],
    [],
  ];
  const start = 0;

  expect(dijkstra(graph, start)).toEqual([0, 3, 1, 4]);
});

test('dijkstraDisconnectedGraph @dijkstra @graph', () => {
  const graph: Edge[][] = [[{ to: 1, weight: 2 }], [], [{ to: 3, weight: 1 }], []];
  const start = 0;

  expect(dijkstra(graph, start)).toEqual([0, 2, Infinity, Infinity]);
});

test('dijkstraSingleNode @dijkstra @graph', () => {
  const graph: Edge[][] = [[]];
  const start = 0;

  expect(dijkstra(graph, start)).toEqual([0]);
});

test('dijkstraAllNodesUnreachable @dijkstra @graph', () => {
  const graph: Edge[][] = [[], [], []];
  const start = 0;

  expect(dijkstra(graph, start)).toEqual([0, Infinity, Infinity]);
});

test('dijkstraGraphWithMultiplePaths @dijkstra @graph', () => {
  const graph: Edge[][] = [
    [
      { to: 1, weight: 1 },
      { to: 2, weight: 4 },
    ],
    [
      { to: 2, weight: 2 },
      { to: 3, weight: 6 },
    ],
    [{ to: 3, weight: 3 }],
    [],
  ];
  const start = 0;

  expect(dijkstra(graph, start)).toEqual([0, 1, 3, 6]);
});
