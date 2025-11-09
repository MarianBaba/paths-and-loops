import { aStar } from '@algorithms/graph/a-star';

type AStarEdge = { to: number; cost: number };

describe('aStar', () => {
  const graph1: AStarEdge[][] = [
    [
      { to: 1, cost: 10 },
      { to: 2, cost: 1 },
    ],
    [{ to: 3, cost: 1 }],
    [{ to: 3, cost: 100 }],
    [],
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const zeroHeuristic = (node: number) => 0;

  test('findsShortestPathWithZeroHeuristic @aStar @pathfinding @dijkstra', () => {
    const path = aStar(graph1, 0, 3, zeroHeuristic);
    expect(path).toEqual([0, 1, 3]);
  });

  test('findsPathWhenStartEqualsGoal @aStar @pathfinding @trivial', () => {
    const path = aStar(graph1, 1, 1, zeroHeuristic);
    expect(path).toEqual([1]);
  });

  test('returnsNullWhenGoalIsUnreachable @aStar @unreachable', () => {
    const graphWithUnreachable = [...graph1, []];

    const path = aStar(graphWithUnreachable, 0, 4, zeroHeuristic);
    expect(path).toBeNull();
  });

  test('handlesLargerGraphAndHigherNodeIndices @aStar @complex', () => {
    const graph2: AStarEdge[][] = Array(14)
      .fill([])
      .map(() => []);
    graph2[10] = [
      { to: 11, cost: 3 },
      { to: 12, cost: 1 },
    ];
    graph2[11] = [{ to: 13, cost: 2 }];
    graph2[12] = [{ to: 13, cost: 4 }];

    const path = aStar(graph2, 10, 13, zeroHeuristic);
    expect(path).toEqual([10, 12, 13]);
  });

  test('findsOptimalPathWithNonZeroAdmissibleHeuristic @aStar @heuristic', () => {
    const graph3: AStarEdge[][] = Array(5)
      .fill([])
      .map(() => []);
    graph3[0] = [
      { to: 1, cost: 10 },
      { to: 2, cost: 2 },
    ];
    graph3[1] = [{ to: 4, cost: 1 }];
    graph3[2] = [{ to: 3, cost: 3 }];
    graph3[3] = [{ to: 4, cost: 4 }];

    const h_admissible = (node: number): number => {
      return Math.max(0, 4 - node);
    };

    const path = aStar(graph3, 0, 4, h_admissible);
    expect(path).toEqual([0, 2, 3, 4]);
  });

  test('replacesPathWithBetterGScore @aStar @gscore', () => {
    const graph4: AStarEdge[][] = [
      [
        { to: 1, cost: 1 },
        { to: 3, cost: 10 },
      ],
      [{ to: 2, cost: 10 }],
      [],
      [{ to: 2, cost: 1 }],
    ];

    const path = aStar(graph4, 0, 2, zeroHeuristic);
    expect(path).toEqual([0, 1, 2]);
  });
});
