import { matrixChainOrder } from '@algorithms/dynamic-programming/matrix-multiplication';

test('matrixChainMultiplicationBasic @matrixChainMultiplication @dp', () => {
  const dims = [1, 2, 3, 4];
  expect(matrixChainOrder(dims)).toBe(18);
});

test('matrixChainMultiplicationSingleMatrix @matrixChainMultiplication @dp', () => {
  const dims = [5, 10];
  expect(matrixChainOrder(dims)).toBe(0); // single matrix, no multiplication needed
});

test('matrixChainMultiplicationTwoMatrices @matrixChainMultiplication @dp', () => {
  const dims = [10, 20, 30];
  expect(matrixChainOrder(dims)).toBe(6000); // 10*20*30
});

test('matrixChainMultiplicationComplexCase @matrixChainMultiplication @dp', () => {
  const dims = [40, 20, 30, 10, 30];
  expect(matrixChainOrder(dims)).toBe(26000);
});

test('matrixChainMultiplicationEdgeCase @matrixChainMultiplication @dp', () => {
  const dims = [10, 20, 30, 40, 30];
  expect(matrixChainOrder(dims)).toBe(30000);
});
