import { DirectedGraph } from '@data-structures/graph/DirectedGraph';

describe('DirectedGraph', () => {
  test('addAndHasNode @digraph @node', () => {
    const graph = new DirectedGraph<number>();
    graph.addNode(1);
    graph.addNode(2);

    expect(graph.hasNode(1)).toBe(true);
    expect(graph.hasNode(2)).toBe(true);
    expect(graph.hasNode(3)).toBe(false);
  });

  test('addEdgeAutomaticallyAddsNodes @digraph @edge', () => {
    const graph = new DirectedGraph<number>();
    graph.addEdge(1, 2);

    expect(graph.hasNode(1)).toBe(true);
    expect(graph.hasNode(2)).toBe(true);
    expect(graph.hasEdge(1, 2)).toBe(true);
    expect(graph.hasEdge(2, 1)).toBe(false); // directed
  });

  test('removeNodeAlsoRemovesIncomingEdges @digraph @removeNode', () => {
    const graph = new DirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(3, 2);

    graph.removeNode(2);

    expect(graph.hasNode(2)).toBe(false);
    expect(graph.hasEdge(1, 2)).toBe(false);
    expect(graph.hasEdge(3, 2)).toBe(false);
  });

  test('removeEdgeOnlyRemovesConnection @digraph @removeEdge', () => {
    const graph = new DirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);

    graph.removeEdge(1, 2);

    expect(graph.hasEdge(1, 2)).toBe(false);
    expect(graph.hasEdge(1, 3)).toBe(true);
  });

  test('neighborsReturnsOutgoingNodes @digraph @neighbors', () => {
    const graph = new DirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);

    const neighbors = graph.neighbors(1);
    expect(neighbors.sort()).toEqual([2, 3]);
  });

  test('dfsTraversalVisitsAllReachableNodes @digraph @dfs', () => {
    const graph = new DirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(3, 4);

    const visited: number[] = [];
    graph.dfs(1, (n) => visited.push(n));

    expect(visited.sort()).toEqual([1, 2, 3, 4]);
  });

  test('bfsTraversalVisitsAllReachableNodes @digraph @bfs', () => {
    const graph = new DirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(3, 4);

    const visited: number[] = [];
    graph.bfs(1, (n) => visited.push(n));

    expect(visited.sort()).toEqual([1, 2, 3, 4]);
  });

  test('clearEmptiesGraph @digraph @clear', () => {
    const graph = new DirectedGraph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(2, 3);
    graph.clear();

    expect(graph.hasNode(1)).toBe(false);
    expect(graph.hasNode(2)).toBe(false);
    expect(graph.hasEdge(1, 2)).toBe(false);
    expect(graph.size()).toBe(0);
  });

  test('sizeReturnsNumberOfNodes @digraph @size', () => {
    const graph = new DirectedGraph<number>();
    graph.addNode(1);
    graph.addNode(2);
    graph.addEdge(3, 4); // adds nodes automatically

    expect(graph.size()).toBe(4);
  });

  test('removingNonexistentNodesOrEdgesDoesNotThrow @digraph @edgeCases', () => {
    const graph = new DirectedGraph<number>();
    expect(() => graph.removeNode(5)).not.toThrow();
    expect(() => graph.removeEdge(1, 2)).not.toThrow();
  });
});
