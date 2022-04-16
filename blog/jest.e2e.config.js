/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...require("./jest.config"),
  testRegex: "\\.e2e-test\\.ts$",
};
