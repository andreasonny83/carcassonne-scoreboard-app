const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
  devtool: 'inline-source-map',
  entry: [path.join(__dirname, 'src/index.ts')],
  externals: [nodeExternals()],
  devServer: {
    // contentBase: './dist',
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: 1000,
    // }
  },
  mode: 'development',
  plugins: [new CleanWebpackPlugin()],
  watch: true,
});
