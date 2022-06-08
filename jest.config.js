const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    "./data/sudoku.json": "<rootDir>/__mocks__/data/sudoku.json",
  },
}

module.exports = createJestConfig(customJestConfig)