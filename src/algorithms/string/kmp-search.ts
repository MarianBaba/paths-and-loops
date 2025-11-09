export function kmpSearch(text: string, pattern: string): number[] {
  const n = text.length,
    m = pattern.length;
  if (m === 0) return []; // <-- add this guard
  const lps = Array(m).fill(0);
  const result: number[] = [];

  let len = 0,
    i = 1;
  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len !== 0) len = lps[len - 1];
    else {
      lps[i] = 0;
      i++;
    }
  }

  let t = 0,
    p = 0;
  while (t < n) {
    if (pattern[p] === text[t]) {
      t++;
      p++;
    }
    if (p === m) {
      result.push(t - p);
      p = lps[p - 1];
    } else if (t < n && pattern[p] !== text[t]) {
      if (p !== 0) p = lps[p - 1];
      else t++;
    }
  }
  return result;
}
