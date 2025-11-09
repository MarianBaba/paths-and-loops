import { topologicalSort } from '@algorithms/graph/topological-sort';

test('topologicalSortBasicDAG @topologicalSort @graph', () => {
  const graph = [[1, 2], [3], [3], []];
  const result = topologicalSort(graph);

  // Valid topological orders: [0,2,1,3] or [0,1,2,3]
  expect(result).toEqual(expect.arrayContaining([0, 1, 2, 3]));
  expect(result[3]).toBe(3); // last node should be 3
});

test('topologicalSortSingleNode @topologicalSort @graph', () => {
  const graph = [[]];
  const result = topologicalSort(graph);
  expect(result).toEqual([0]);
});

test('topologicalSortDisconnectedDAG @topologicalSort @graph', () => {
  const graph = [[], [], []];
  const result = topologicalSort(graph);
  expect(result.sort()).toEqual([0, 1, 2]);
});

test('topologicalSortComplexDAG @topologicalSort @graph', () => {
  const graph = [[1, 2], [3, 4], [4], [], []];
  const result = topologicalSort(graph);

  expect(result.indexOf(0)).toBeLessThan(result.indexOf(1));
  expect(result.indexOf(0)).toBeLessThan(result.indexOf(2));
  expect(result.indexOf(1)).toBeLessThan(result.indexOf(3));
  expect(result.indexOf(1)).toBeLessThan(result.indexOf(4));
  expect(result.indexOf(2)).toBeLessThan(result.indexOf(4));
});

test('topologicalSortNoEdges @topologicalSort @graph', () => {
  const graph = [[], [], []];
  const result = topologicalSort(graph);
  expect(result.sort()).toEqual([0, 1, 2]);
});
