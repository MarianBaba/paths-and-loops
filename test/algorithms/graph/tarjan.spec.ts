import { tarjanSCC } from '@algorithms/graph/tarjan';

test('tarjanSCCBasic @tarjanSCC @graph', () => {
  const graph = [[1], [2], [0, 3], [4], []];
  const result = tarjanSCC(graph);

  const expected = [[2, 1, 0], [3], [4]];

  expect(result).toEqual(expect.arrayContaining(expected));
  expect(result.flat().sort()).toEqual([0, 1, 2, 3, 4]);
});

test('tarjanSCCSingleNode @tarjanSCC @graph', () => {
  const graph = [[]];
  const result = tarjanSCC(graph);
  expect(result).toEqual([[0]]);
});

test('tarjanSCCDisconnectedGraph @tarjanSCC @graph', () => {
  const graph = [[], [], []];
  const result = tarjanSCC(graph);
  expect(result).toEqual(expect.arrayContaining([[0], [1], [2]]));
});

test('tarjanSCCNoEdges @tarjanSCC @graph', () => {
  const graph = [[], []];
  const result = tarjanSCC(graph);
  expect(result).toEqual(expect.arrayContaining([[0], [1]]));
});
