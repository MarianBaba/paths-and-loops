import { seededRNG } from './arrays';

export type AdjList = number[][];
export type WeightedAdjList = { to: number; weight: number }[][];

/**
 * Generate an Erdős–Rényi random directed or undirected graph.
 * - n: number of nodes
 * - p: probability of edge (0..1)
 * - directed: if false, returns undirected (symmetric) adjacency
 */
export function genErdosRenyi(n: number, p = 0.01, seed = 42, directed = false): AdjList {
  const rand = seededRNG(seed);
  const adj: AdjList = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    for (let j = directed ? 0 : i + 1; j < n; j++) {
      if (i === j) continue;
      if (rand() < p) {
        adj[i].push(j);
        if (!directed) adj[j].push(i);
      }
    }
  }
  return adj;
}

/**
 * Generate a random weighted graph represented as weighted adjacency list.
 * edgesTarget is approximate number of edges for undirected graphs (will be doubled internally).
 */
export function genRandomWeightedGraph(
  n: number,
  edgesTarget = n * 2,
  maxWeight = 1000,
  seed = 42,
  directed = false,
): WeightedAdjList {
  const rand = seededRNG(seed);
  const adj: WeightedAdjList = Array.from({ length: n }, () => []);
  const possiblePairs: [number, number][] = []; // <-- explicit type here

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) possiblePairs.push([i, j]);
  }
  // shuffle deterministic
  for (let i = possiblePairs.length - 1; i > 0; i--) {
    const idx = Math.floor(rand() * (i + 1));
    [possiblePairs[i], possiblePairs[idx]] = [possiblePairs[idx], possiblePairs[i]];
  }
  let added = 0;
  for (let k = 0; k < possiblePairs.length && added < edgesTarget; k++) {
    const [u, v] = possiblePairs[k];
    const w = Math.floor(rand() * maxWeight) + 1;
    adj[u].push({ to: v, weight: w });
    if (!directed) adj[v].push({ to: u, weight: w });
    added++;
  }
  return adj;
}

/**
 * Generate a 2D grid graph (useful for pathfinding/A* tests).
 * Returns weighted adjacency list (weight = 1 by default).
 */
export function genGridGraph(rows: number, cols: number, weighted = false): WeightedAdjList {
  const n = rows * cols;
  const adj: WeightedAdjList = Array.from({ length: n }, () => []);
  function id(r: number, c: number) {
    return r * cols + c;
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = id(r, c);
      const neighbors: [number, number][] = [];
      if (r > 0) neighbors.push([r - 1, c]);
      if (r < rows - 1) neighbors.push([r + 1, c]);
      if (c > 0) neighbors.push([r, c - 1]);
      if (c < cols - 1) neighbors.push([r, c + 1]);
      for (const [nr, nc] of neighbors) {
        const v = id(nr, nc);
        adj[u].push({ to: v, weight: weighted ? 1 : 1 }); // kept original behaviour; change if you want different weights
      }
    }
  }
  return adj;
}

/**
 * Convert WeightedAdjList -> Edge[][] (unweighted) useful for algorithms expecting Edge {to, weight} or simple adj list.
 */
export function weightedToAdjList(weighted: WeightedAdjList): AdjList {
  return weighted.map((neis) => neis.map((e) => e.to));
}
