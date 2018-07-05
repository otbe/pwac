import { ElmConfig } from './common';

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
  browsers: ElmConfig['browsers']
) => ({
  test: /\.css$/,
  use: [
    !production ? styleLoader : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader'
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
