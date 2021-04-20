const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/**.ts",
    "!<rootDir>/src/**/protocols.ts",
    "!<rootDir>/src/**/protocols/index.ts",
    "!<rootDir>/src/main/**",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  preset: "@shelf/jest-mongodb",
  transform: {
    ...tsjPreset.transform,
  },
  modulePaths: ["<rootDir>/src/"],
};
