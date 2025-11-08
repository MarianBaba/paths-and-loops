export function fibMemo(n: number, memo: number[] = []): number {
  if (n <= 1) return n;
  if (memo[n] != null) return memo[n];
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}
