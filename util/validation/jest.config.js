/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  reporters: ["jest-standard-reporter"],
  transform: { "^.+\\.tsx?$": "@swc/jest" },
  testEnvironment: "node",
};
