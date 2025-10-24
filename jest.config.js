const baseConfig = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel.jest.config.js' }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}

module.exports = {
  ...baseConfig,
  projects: [
    {
      displayName: 'unit',
      ...baseConfig,
      testMatch: ['**/__tests__/unit/**/*.test.ts'],
      testEnvironment: 'node',
    },
    {
      displayName: 'api',
      ...baseConfig,
      testMatch: ['**/__tests__/api/**/*.test.ts'],
      testEnvironment: 'node',
    },
    {
      displayName: 'integration',
      ...baseConfig,
      testMatch: ['**/__tests__/integration/**/*.test.(ts|tsx)'],
      testEnvironment: 'jest-environment-jsdom',
    },
  ],
};
