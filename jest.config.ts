module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '^@data-structures/(.*)$': '<rootDir>/src/data-structures/$1',
    '^@algorithms/(.*)$': '<rootDir>/src/algorithms/$1',
  },
};
