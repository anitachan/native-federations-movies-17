const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

// module.exports = {
//   projects: ['<rootDir>/projects/**/jest.config.js'],
//   preset: 'jest-preset-angular',
//   setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
//   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
//     prefix: '<rootDir>/../../',
//   }),
//   // haste: {
//   //   blacklist: ['<rootDir>/dist/shared-lib/package.json'],
//   // },
//   //testEnvironment: 'jsdom',
//   transformIgnorePatterns: ['<rootDir>/node_modules/(?!@angular-architects/module-federation)'],
// };

module.exports = {
  projects: ['<rootDir>/projects/**/jest.config.js'],
  //setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
  //   prefix: '<rootDir>/../../',
  // }),
};
