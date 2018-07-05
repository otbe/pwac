import { ReactConfig } from './common';

const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
          autoprefixer({
            browsers
          })
        ]
      }
    }
  ]
});
