import { JestConfigWithTsJest } from "ts-jest";

// Process all .spec.ts files inside the libs folder
const jestConfig: JestConfigWithTsJest = {
  silent: true,
  rootDir: ".",
  roots: ["<rootDir>"],
  testRegex: "\\.spec\\.ts$",
  moduleFileExtensions: ["js", "json", "ts"],
  testEnvironment: "node",
  moduleNameMapper: {
    "@src(.*)$": "<rootDir>/src/$1",
    "@root(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/dist/"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageReporters: ["text"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "jest*config.ts",
    ".e2e-spec.ts$",
    ".spec.ts$",
    "/dist/",
  ],
  reporters: ["default"],
};

module.exports = jestConfig;
