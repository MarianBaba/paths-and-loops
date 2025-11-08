// Matrix Chain Multiplication
export function matrixChainOrder(dim: number[]): number {
  const n = dim.length - 1;
  const dp: number[][] = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  for (let l = 2; l <= n; l++) {
    for (let i = 0; i <= n - l; i++) {
      const j = i + l - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + dim[i] * dim[k + 1] * dim[j + 1]);
      }
    }
  }
  return dp[0][n - 1];
}
