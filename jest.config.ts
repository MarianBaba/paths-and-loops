module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  testRunner: 'jest-circus/runner',
  testEnvironment: 'allure-jest/jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/index.ts', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 85,
      statements: 85,
    },
  },
  moduleNameMapper: {
    '^@data-structures/(.*)$': '<rootDir>/src/data-structures/$1',
    '^@algorithms/(.*)$': '<rootDir>/src/algorithms/$1',
  },
};
