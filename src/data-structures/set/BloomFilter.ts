export class BloomFilter {
  private bits: Uint8Array;

  constructor(
    private size: number = 1024, // number of bits
    private hashCount: number = 3, // number of hash functions
  ) {
    this.bits = new Uint8Array(Math.ceil(size / 8));
  }

  add(value: string): void {
    for (let i = 0; i < this.hashCount; i++) {
      const hash = this._hash(value, i) % this.size;
      this._setBit(hash);
    }
  }

  has(value: string): boolean {
    for (let i = 0; i < this.hashCount; i++) {
      const hash = this._hash(value, i) % this.size;
      if (!this._getBit(hash)) return false;
    }
    return true;
  }

  clear(): void {
    this.bits.fill(0);
  }

  // --- Internal helpers ---
  private _hash(value: string, seed: number): number {
    // simple DJB2 variant with seed
    let hash = 5381 + seed;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 33) ^ value.charCodeAt(i);
    }
    return Math.abs(hash);
  }

  private _setBit(pos: number): void {
    const index = Math.floor(pos / 8);
    const offset = pos % 8;
    this.bits[index] |= 1 << offset;
  }

  private _getBit(pos: number): boolean {
    const index = Math.floor(pos / 8);
    const offset = pos % 8;
    return (this.bits[index] & (1 << offset)) !== 0;
  }
}
