import { UndirectedGraph } from '@data-structures/graph/UndirectedGraph';

describe('UndirectedGraph', () => {
  test('addAndHasNode @graph @node', () => {
    const graph = new UndirectedGraph<number>();
    graph.addNode(1);
    graph.addNode(2);

    expect(graph.hasNode(1)).toBe(true);
    expect(graph.hasNode(2)).toBe(true);
    expect(graph.hasNode(3)).toBe(false);
  });

  test('addEdgeAutomaticallyAddsNodes @graph @edge', () => {
    const graph = new UndirectedGraph<number>();
    graph.addEdge(1, 2);

    expect(graph.hasNode(1)).toBe(true);
    expect(graph.hasNode(2)).toBe(true);
    expect(graph.hasEdge(1, 2)).toBe(true);
    expect(graph.hasEdge(2, 1)).toBe(true); // undirected
  });

  test('removeNodeAlsoRemovesEdges @graph @removeNode', () => {
    const graph = new UndirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);

    graph.removeNode(1);

    expect(graph.hasNode(1)).toBe(false);
    expect(graph.hasEdge(1, 2)).toBe(false);
    expect(graph.hasEdge(2, 1)).toBe(false);
    expect(graph.hasEdge(1, 3)).toBe(false);
    expect(graph.hasNode(2)).toBe(true);
    expect(graph.hasNode(3)).toBe(true);
  });

  test('removeEdgeOnlyRemovesConnection @graph @removeEdge', () => {
    const graph = new UndirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);

    graph.removeEdge(1, 2);

    expect(graph.hasEdge(1, 2)).toBe(false);
    expect(graph.hasEdge(2, 1)).toBe(false);
    expect(graph.hasEdge(1, 3)).toBe(true);
  });

  test('neighborsReturnsAllConnectedNodes @graph @neighbors', () => {
    const graph = new UndirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);

    const neighbors = graph.neighbors(1);
    expect(neighbors.sort()).toEqual([2, 3]);
  });

  test('dfsTraversalVisitsAllReachableNodes @graph @dfs', () => {
    const graph = new UndirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(3, 4);

    const visited: number[] = [];
    graph.dfs(1, (n) => visited.push(n));

    // All nodes reachable from 1 should be visited
    expect(visited.sort()).toEqual([1, 2, 3, 4]);
  });

  test('bfsTraversalVisitsAllReachableNodes @graph @bfs', () => {
    const graph = new UndirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(3, 4);

    const visited: number[] = [];
    graph.bfs(1, (n) => visited.push(n));

    expect(visited.sort()).toEqual([1, 2, 3, 4]);
  });

  test('clearEmptiesGraph @graph @clear', () => {
    const graph = new UndirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(2, 3);
    graph.clear();

    expect(graph.hasNode(1)).toBe(false);
    expect(graph.hasNode(2)).toBe(false);
    expect(graph.hasEdge(1, 2)).toBe(false);
    expect(graph.size()).toBe(0);
  });

  test('sizeReturnsNumberOfNodes @graph @size', () => {
    const graph = new UndirectedGraph<number>();
    graph.addNode(1);
    graph.addNode(2);
    graph.addEdge(3, 4); // adds nodes automatically

    expect(graph.size()).toBe(4);
  });

  test('removingNonexistentNodesOrEdgesDoesNotThrow @graph @edgeCases', () => {
    const graph = new UndirectedGraph<number>();
    expect(() => graph.removeNode(5)).not.toThrow();
    expect(() => graph.removeEdge(1, 2)).not.toThrow();
  });
});
