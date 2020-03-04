module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.module.rules[3] = {
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      loader:
        '/Users/chrisfields/Documents/Projects/react-components/node_modules/@storybook/core/node_modules/file-loader/dist/cjs.js',
      query: { name: 'static/media/[name].[hash:8].[ext]' },
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: ['svg-inline-loader'],
    });

    // Return the altered config
    return config;
  },
};
