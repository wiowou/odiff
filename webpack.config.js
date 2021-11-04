/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  node: {
    __dirname: false,
  },
  entry: './src/index.ts',
  devtool:
    process.env.NODE_ENV === 'development'
      ? 'eval-cheap-module-source-map'
      : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  optimization: {
    concatenateModules: false,
  },
  target: 'node',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          experimentalWatchApi: true,
        },
      },
    ],
  },
};
