module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  testRunner: 'jest-circus/runner',
  testEnvironment: 'allure-jest/jsdom',
  moduleNameMapper: {
    '^@data-structures/(.*)$': '<rootDir>/src/data-structures/$1',
    '^@algorithms/(.*)$': '<rootDir>/src/algorithms/$1',
  },
};
