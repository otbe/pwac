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
    ? [
        new UglifyJsPlugin({
          exclude: 'elm',
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new UglifyJsPlugin({
          include: 'elm',
          parallel: true,
          uglifyOptions: {
            compress: {
              pure_funcs: [
                'F2',
                'F3',
                'F4',
                'F5',
                'F6',
                'F7',
                'F8',
                'F9',
                'A2',
                'A3',
                'A4',
                'A5',
                'A6',
                'A7',
                'A8',
                'A9'
              ],
              pure_getters: true,
              keep_fargs: false,
              unsafe_comps: true,
              unsafe: true
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    : [],
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    minChunks: 1,
    name: true,
    cacheGroups: {
      elm: {
        test: /[\\/]Main.elm/,
        name: 'elm',
        chunks: 'all'
      },
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: -10,
        chunks: 'all'
      }
    }
  }
});
