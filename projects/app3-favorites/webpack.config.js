const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'app3-favorites',

  exposes: {
    './Module': './projects/app3-favorites/src/app/ui/ui.module.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
  sharedMappings: ['shared-lib'],
});
