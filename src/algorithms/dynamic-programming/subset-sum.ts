export function subsetSum(arr: number[], target: number): boolean {
  const n = arr.length;
  const dp: boolean[][] = Array(n + 1)
    .fill(0)
    .map(() => Array(target + 1).fill(false));
  for (let i = 0; i <= n; i++) dp[i][0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= target; j++) {
      dp[i][j] = dp[i - 1][j] || (j - arr[i - 1] >= 0 && dp[i - 1][j - arr[i - 1]]);
    }
  }
  return dp[n][target];
}
