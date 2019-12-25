// eslint-disable-next-line import/no-commonjs
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testMatch: ['**/tests/**/?(*.)+(spec|test).[tj]s'],
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.[tj]s', '!**/node_modules/**'],
}
