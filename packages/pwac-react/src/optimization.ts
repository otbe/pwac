import * as webpack from 'webpack';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

export const getOptimization = (
  production: boolean
): webpack.Options.Optimization => ({
  ...(production
    ? {
        runtimeChunk: {
          name: 'manifest'
        }
      }
    : {}),
  minimizer: production
    ? [new UglifyJsPlugin({ parallel: true }), new OptimizeCSSAssetsPlugin({})]
    : [],
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    minChunks: 1,
    name: true,

    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: -10,
        chunks: 'all'
      }
    }
  }
});
