export function rabinKarp(text: string, pattern: string): number[] {
  const result: number[] = [];
  const n = text.length,
    m = pattern.length;
  if (m === 0 || m > n) return result;

  const base = 256;
  const mod = 101;

  let patternHash = 0,
    textHash = 0,
    h = 1;
  for (let i = 0; i < m - 1; i++) h = (h * base) % mod;
  for (let i = 0; i < m; i++) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % mod;
    textHash = (base * textHash + text.charCodeAt(i)) % mod;
  }

  for (let i = 0; i <= n - m; i++) {
    if (patternHash === textHash) {
      let match = true;
      for (let j = 0; j < m; j++)
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      if (match) result.push(i);
    }
    if (i < n - m) {
      textHash = (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % mod;
      if (textHash < 0) textHash += mod;
    }
  }

  return result;
}
