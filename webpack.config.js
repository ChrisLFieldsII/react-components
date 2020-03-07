const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const DtsBundleWebpack = require('dts-bundle-webpack');

function getPlugins(env) {
  const plugins = [
    new CleanWebpackPlugin(),
    new DtsBundleWebpack({
      name: '@chrisfieldsii/react-components',
      main: 'src/index.d.ts',
      out: '../dist/index.d.ts',
    }),
  ];

  if (env === 'dev') {
    plugins.push(new ManifestPlugin());
  }

  if (env === 'prod') {
    // other prod plugins
  }

  return plugins;
}

module.exports = (env = 'dev', argv) => {
  console.log(`Bundling for env: ${env}`);

  const isDev = env === 'dev';

  return {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.js',
    devtool: isDev ? 'eval-source-map' : 'source-map',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'react-components',
      libraryTarget: 'umd',
      // https://github.com/webpack/webpack/issues/6784#issuecomment-375941431
      globalObject: "typeof self !== 'undefined' ? self : this",
    },
    plugins: getPlugins(env),
    module: {
      rules: [
        {
          test: /\.css/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-transform-runtime',
                ['@babel/plugin-proposal-class-properties', { loose: true }],
              ],
            },
          },
        },
      ],
    },
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  };
};
