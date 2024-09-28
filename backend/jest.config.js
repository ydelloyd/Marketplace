/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  workerIdleMemoryLimit: "512MB",
  maxWorkers: 1,
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};