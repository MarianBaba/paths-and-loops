import { coinChange } from '@algorithms/dynamic-programming/coin-change';

test('coinChangeBasic @coinChange @dp', () => {
  const coins = [1, 2, 5];
  const amount = 11;
  expect(coinChange(coins, amount)).toBe(3); // 5 + 5 + 1
});

test('coinChangeZeroAmount @coinChange @dp', () => {
  const coins = [1, 2, 5];
  const amount = 0;
  expect(coinChange(coins, amount)).toBe(0);
});

test('coinChangeNoSolution @coinChange @dp', () => {
  const coins = [2];
  const amount = 3;
  expect(coinChange(coins, amount)).toBe(-1);
});

test('coinChangeSingleCoin @coinChange @dp', () => {
  const coins = [5];
  const amount = 10;
  expect(coinChange(coins, amount)).toBe(2);
});

test('coinChangeLargeAmount @coinChange @dp', () => {
  const coins = [1, 2, 5, 10];
  const amount = 27;
  expect(coinChange(coins, amount)).toBe(4);
});
