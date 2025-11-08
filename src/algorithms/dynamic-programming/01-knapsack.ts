export function knapsack(weights: number[], values: number[], W: number): number {
  const n = weights.length;
  const dp: number[][] = Array(n + 1)
    .fill(0)
    .map(() => Array(W + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      if (weights[i - 1] <= w)
        dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
      else dp[i][w] = dp[i - 1][w];
    }
  }
  return dp[n][W];
}
