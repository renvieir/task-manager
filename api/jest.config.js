module.exports = {
  collectCoverageFrom: ["<rootDir>/src/**/**.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  modulePaths: ["<rootDir>/src/"],
  preset: "@shelf/jest-mongodb",
};
