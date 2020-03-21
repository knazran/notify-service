/* eslint-disable no-undef */

module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '/migrations/'],
  globalSetup: './src/tests/config/setup.ts',
  globalTeardown: './src/tests/config/teardown.ts',
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/tests/config/database.ts'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.ts'],
}
