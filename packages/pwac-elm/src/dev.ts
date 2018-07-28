import * as webpack from 'webpack';
import { getCssRule } from './css';
import { getElmRule } from './elm';
import { getTsRule } from './babel';
import { getAssetRule } from './assets';
import {
  resolve,
  entry,
  ElmConfig,
  htmlWebpackplugin,
  scriptExtHtmlWebpackPlugin
} from './common';
import { getOptimization } from './optimization';

export const dev = (config: ElmConfig): webpack.Configuration => ({
  entry,

  resolve,

  module: {
    rules: [
      getElmRule(false, config.assets),
      getAssetRule(),
      getTsRule(false, config.browsers),
      getCssRule(false, config.browsers)
    ]
  },

  optimization: getOptimization(false),

  plugins: [
    htmlWebpackplugin,
    scriptExtHtmlWebpackPlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
