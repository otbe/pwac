import { ReactConfig } from './common';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const styleLoader = {
  loader: 'style-loader',
  options: {
    sourceMap: true
  }
};

export const getCssRule = (
  production: boolean,
  browsers: ReactConfig['browsers']
) => ({
  test: /\.css$/,
  use: [
    !production ? styleLoader : MiniCssExtractPlugin.loader,
    {
      loader: 'typings-for-css-modules-loader',
      options: {
        modules: true,
        importLoaders: 1,
        souceMap: true,
        namedExport: true,
        camelCase: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          postcssPresetEnv({
            stage: 0,
            browsers
          })
        ]
      }
    }
  ]
});
