import {
  resolve,
  htmlWebpackplugin,
  entry,
  scriptExtHtmlWebpackPlugin
} from './common';
import { getTsRule } from './babel';
import * as webpack from 'webpack';
import { getImageRule } from './image';
import { getCssRule } from './css';
import { getAssetRule } from './assets';
import { ReactConfig } from './common';
import { getOptimization } from './optimization';

export const dev = (config: ReactConfig): webpack.Configuration => ({
  entry,

  resolve,

  module: {
    rules: [
      getTsRule(false, config.browsers),
      getCssRule(false, config.browsers, config.cssFeatures),
      getAssetRule(),
      getImageRule(config.images)
    ]
  },

  optimization: getOptimization(false),

  plugins: [
    htmlWebpackplugin(config.manifest),
    scriptExtHtmlWebpackPlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
