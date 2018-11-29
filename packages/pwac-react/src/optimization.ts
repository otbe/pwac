import * as webpack from 'webpack';

const TerserPlugin = require('terser-webpack-plugin');
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
    ? [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    : [],

  ...(production
    ? {
        namedModules: false,
        namedChunks: false,
        nodeEnv: 'production',
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        noEmitOnErrors: true,
        checkWasmTypes: true,
        minimize: true
      }
    : {
        namedModules: true,
        namedChunks: true,
        nodeEnv: 'development',
        flagIncludedChunks: false,
        occurrenceOrder: false,
        sideEffects: false,
        usedExports: false,
        concatenateModules: false,
        noEmitOnErrors: false,
        checkWasmTypes: false,
        minimize: false
      }),

  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    minChunks: 1,
    name: true,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: -10,
        chunks: 'initial'
      }
    }
  }
});
