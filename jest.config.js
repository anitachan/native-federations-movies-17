const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  // moduleNameMapper: {
  //   '@core/(.*)': '<rootDir>/src/$1',
  // },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  // roots: ["<rootDir>/src/"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: "<rootDir>/../../",
  }),
 // rootDir: '../'
  //moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' } )
  // moduleNameMapper: {
  //   '^shared-lib$': '/Users/analuciachavezhidalgo/Documents/Anita/mfe-angular-federation/projects/shared-lib/src',
  // },
//   "moduleNameMapper": {
//     "/@app1\/shared-lib/": "projects/app1/src/app/shared-lib"
//  },
//  rootDir: '..',
//   moduleNameMapper: {
//     //'@app1/shared-lib': '/Users/analuciachavezhidalgo/Documents/Anita/mfe-angular-federation/projects/shared-lib/src/public-api.ts',
//     '@app1/shared-lib': '<rootDir>/../shared-lib/src/public-api.ts',
//   },
};
