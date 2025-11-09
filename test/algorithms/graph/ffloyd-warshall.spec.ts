import { floydWarshall } from '@algorithms/graph/ffloyd-warshall';

test('floydWarshallBasic @floydWarshall @graph', () => {
  const INF = Infinity;
  const matrix = [
    [0, 3, INF, 7],
    [8, 0, 2, INF],
    [5, INF, 0, 1],
    [2, INF, INF, 0],
  ];

  const expected = [
    [0, 3, 5, 6],
    [5, 0, 2, 3],
    [3, 6, 0, 1],
    [2, 5, 7, 0],
  ];

  expect(floydWarshall(matrix)).toEqual(expected);
});

test('floydWarshallSingleNode @floydWarshall @graph', () => {
  const matrix = [[0]];
  expect(floydWarshall(matrix)).toEqual([[0]]);
});

test('floydWarshallDisconnectedGraph @floydWarshall @graph', () => {
  const INF = Infinity;
  const matrix = [
    [0, INF, INF],
    [INF, 0, INF],
    [INF, INF, 0],
  ];

  expect(floydWarshall(matrix)).toEqual(matrix);
});

test('floydWarshallTwoNodes @floydWarshall @graph', () => {
  const INF = Infinity;
  const matrix = [
    [0, 1],
    [INF, 0],
  ];

  expect(floydWarshall(matrix)).toEqual(matrix);
});

test('floydWarshallNegativeEdgesNoCycle @floydWarshall @graph', () => {
  const INF = Infinity;
  const matrix = [
    [0, -1, INF],
    [INF, 0, -2],
    [INF, INF, 0],
  ];

  const expected = [
    [0, -1, -3],
    [INF, 0, -2],
    [INF, INF, 0],
  ];

  expect(floydWarshall(matrix)).toEqual(expected);
});
