# Paths & Loops 🤖

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/github/license/MarianBaba/paths-and-loops)
[![codecov](https://codecov.io/gh/MarianBaba/paths-and-loops/branch/main/graph/badge.svg)](https://codecov.io/gh/MarianBaba/paths-and-loops)
![Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?)
![Node](https://img.shields.io/badge/node-18.x-green)
![eslint](https://img.shields.io/badge/linted%20by-eslint-blue)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

Welcome to this curated DSA repository, designed not only to showcase classical Data Structures and Algorithms but also to demonstrate a QA/Automation/SDET approach to validating, testing, and benchmarking them.

---

## 🔹 Features

### Algorithms

- **Sorting**: `Bubble`, `Quick`, `Merge`, `Heap`, `Counting`, `Radix`, `Bucket`, `Selection`, `Insertion`
- **Searching**: `Linear Search`, `Binary Search`
- **Graph**: `Dijkstra`, `Bellman-Ford`, `Floyd-Warshall`, `A*`, `Kruskal`, `Prim`, `Topological Sort`, `Kosaraju`, `Tarjan`
- **Dynamic Programming**: `Fibonacci`, `Climbing Stairs`, `LCS`, `LIS`, `0/1 Knapsack`, `Coin Change`, `Edit Distance`, `Matrix Chain Multiplication`, `Subset Sum`
- **Strings / Pattern Matching**: `KMP`, `Rabin-Karp`, `Z-Algorithm`, `Naive Substring Search`

### Data Structures

- **Linear Structures**: `Dynamic Array`, `Stack`, `Queue`
- **Linked Lists**: `Singly Linked List`, `Doubly Linked List`
- **Trees**: `BST`, `AVL`, `Red-Black`, `Heap`
- **Graphs**: `Directed Graph`, `Undirected Graph`
- **Sets & Maps**: `HashMap`, `Union-Find`, `Bloom Filter`

---

## 🧪 QA / SDET Focus

This repo emphasizes **software quality and validation** alongside algorithmic implementation:

- **Automated Unit Tests**: Fully tested using Jest.
- **Code Coverage & Reporting**: Integrated with Codecov.
- **Benchmarking**: Performance measurement for algorithms and data structures using deterministic test generators.
- **Stress Testing**: Randomized input generators for edge cases and large datasets.
- **CI/CD Ready**: Compatible with GitHub Actions or other CI/CD pipelines for automated testing, benchmarking, and reporting.

---

## Getting Started

```bash
git clone https://github.com/MarianBaba/paths-and-loops.git

cd paths-and-loops

npm ci

npm run test
```

- Check `package.json` for all the scripts you can run

---

📂 Repository Structure

```
.
├── LICENSE
├── README.md
├── benchmark
│   ├── algorithms
│   │   ├── graph
│   │   │   ├── bellman-ford.ts
│   │   │   └── dijkstra.ts
│   │   ├── searching
│   │   │   ├── binary-search.ts
│   │   │   └── linear-search.ts
│   │   └── sorting
│   │       ├── bubble-sort.ts
│   │       ├── bucket-sort.ts
│   │       ├── counting-sort.ts
│   │       ├── heap-sort.ts
│   │       ├── insertion-sort.ts
│   │       ├── merge-sort.ts
│   │       └── quick-sort.ts
│   └── generators
│       ├── arrays.ts
│       └── graphs.ts
├── eslint.config.mjs
├── jest.config.ts
├── package-lock.json
├── package.json
├── src
│   ├── algorithms
│   │   ├── dynamic-programming
│   │   │   ├── 01-knapsack.ts
│   │   │   ├── climb-stairs.ts
│   │   │   ├── coin-change.ts
│   │   │   ├── edit-distance.ts
│   │   │   ├── fibonacci-memoization.ts
│   │   │   ├── fibonacci-tabulation.ts
│   │   │   ├── longest-common-subsequence.ts
│   │   │   ├── longest-increasing-subsequence.ts
│   │   │   ├── matrix-multiplication.ts
│   │   │   └── subset-sum.ts
│   │   ├── graph
│   │   │   ├── a-star.ts
│   │   │   ├── bellman-ford.ts
│   │   │   ├── dijkstra.ts
│   │   │   ├── ffloyd-warshall.ts
│   │   │   ├── kosaraju.ts
│   │   │   ├── kruskal.ts
│   │   │   ├── prim.ts
│   │   │   ├── tarjan.ts
│   │   │   └── topological-sort.ts
│   │   ├── searching
│   │   │   ├── binary-search.ts
│   │   │   └── linear-search.ts
│   │   ├── sorting
│   │   │   ├── bubble-sort.ts
│   │   │   ├── bucket-sort.ts
│   │   │   ├── counting-sort.ts
│   │   │   ├── heap-sort.ts
│   │   │   ├── insertion-sort.ts
│   │   │   ├── merge-sort.ts
│   │   │   ├── quick-sort.ts
│   │   │   ├── radix-sort.ts
│   │   │   └── selection-sort.ts
│   │   └── string
│   │       ├── kmp-search.ts
│   │       ├── rabin-karp.ts
│   │       └── z-algorithm.ts
│   ├── data-structures
│   │   ├── dictionary
│   │   │   └── HashMap.ts
│   │   ├── graph
│   │   │   ├── DirectedGraph.ts
│   │   │   └── UndirectedGraph.ts
│   │   ├── linear
│   │   │   ├── DynamicArray.ts
│   │   │   ├── Queue.ts
│   │   │   └── Stack.ts
│   │   ├── linked-list
│   │   │   ├── DoublyLinkedList.ts
│   │   │   └── SinglyLinkedList.ts
│   │   ├── set
│   │   │   ├── BloomFilter.ts
│   │   │   └── UnionFind.ts
│   │   └── tree
│   │       ├── AVLTree.ts
│   │       ├── BinarySearchTree.ts
│   │       ├── Heap.ts
│   │       └── RedBlackTree.ts
│   └── utils
├── test
│   ├── algorithms
│   │   ├── dynamic-programming
│   │   │   ├── climb-stairs.spec.ts
│   │   │   ├── coin-change.spec.ts
│   │   │   ├── edit-distance.spec.ts
│   │   │   ├── fibonacci-memoization.spec.ts
│   │   │   ├── fibonacci-tabulation.spec.ts
│   │   │   ├── knapsack.spec.ts
│   │   │   ├── longest-common-subsequence.spec.ts
│   │   │   ├── longest-increasing-subsequence.spec.ts
│   │   │   ├── matrix-multiplication.spec.ts
│   │   │   └── subset-sum.spec.ts
│   │   ├── graph
│   │   │   ├── a-star.spec.ts
│   │   │   ├── bellman-ford.spec.ts
│   │   │   ├── dijkstra.spec.ts
│   │   │   ├── ffloyd-warshall.spec.ts
│   │   │   ├── kosaraju.spec.ts
│   │   │   ├── kruskal.spec.ts
│   │   │   ├── prim.spec.ts
│   │   │   ├── tarjan.spec.ts
│   │   │   └── topological-sort.spec.ts
│   │   ├── searching
│   │   │   ├── binary-search.spec.ts
│   │   │   └── linear-search.spec.ts
│   │   ├── sorting
│   │   │   ├── bubble-sort.spec.ts
│   │   │   ├── bucket-sort.spec.ts
│   │   │   ├── counting-sort.spec.ts
│   │   │   ├── heap-sort.spec.ts
│   │   │   ├── insertion-sort.spec.ts
│   │   │   ├── merge-sort.spec.ts
│   │   │   ├── quick-sort.spec.ts
│   │   │   ├── radix-sort.spec.ts
│   │   │   └── selection-sort.spec.ts
│   │   └── string
│   │       ├── kmp-search.spec.ts
│   │       ├── rabin-karp.spec.ts
│   │       └── z-algorithm.spec.ts
│   └── data-structures
│       ├── dictionary
│       │   └── hashmap.spec.ts
│       ├── grah
│       │   ├── directed-graph.spec.ts
│       │   └── undirected-graph.spec.ts
│       ├── linear
│       │   ├── dynamic-array.spec.ts
│       │   ├── queue.spec.ts
│       │   └── stack.spec.ts
│       ├── linked-list
│       │   ├── doubly-linked-list.spec.ts
│       │   └── singly-linked-list.spec.ts
│       ├── set
│       │   ├── bloom-filter.spec.ts
│       │   └── union-find.spec.ts
│       └── tree
│           ├── avl.spec.ts
│           ├── bst.spec.ts
│           ├── heap.spec.ts
│           └── rbt.spec.ts
└── tsconfig.json
```
