import { kosarajuSCC } from '@algorithms/graph/kosaraju';

test('kosarajuSCCBasic @kosarajuSCC @graph', () => {
  const graph = [[1], [2], [0, 3], [4], []];
  const result = kosarajuSCC(graph);

  // Each SCC is a set of nodes; order inside SCC and order of SCCs may vary
  const expected = [[0, 2, 1], [3], [4]];

  expect(result).toEqual(expect.arrayContaining(expected));
  expect(result.flat().sort()).toEqual([0, 1, 2, 3, 4]);
});

test('kosarajuSCCSingleNode @kosarajuSCC @graph', () => {
  const graph = [[]];
  const result = kosarajuSCC(graph);
  expect(result).toEqual([[0]]);
});

test('kosarajuSCCDisconnectedGraph @kosarajuSCC @graph', () => {
  const graph = [[], [], []];
  const result = kosarajuSCC(graph);
  expect(result).toEqual(expect.arrayContaining([[0], [1], [2]]));
});

test('kosarajuSCCComplexGraph @kosarajuSCC @graph', () => {
  const graph = [[1], [2], [0, 3], [4, 5], [3], []];
  const result = kosarajuSCC(graph);

  const expected = [[0, 2, 1], [3, 4], [5]];

  expect(result).toEqual(expect.arrayContaining(expected));
  expect(result.flat().sort()).toEqual([0, 1, 2, 3, 4, 5]);
});

test('kosarajuSCCNoEdges @kosarajuSCC @graph', () => {
  const graph = [[], []];
  const result = kosarajuSCC(graph);
  expect(result).toEqual(expect.arrayContaining([[0], [1]]));
});
