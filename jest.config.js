const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: "<rootDir>/../../",
  }),
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@angular-architects/module-federation)"
  ]
};
