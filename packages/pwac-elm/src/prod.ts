import * as webpack from 'webpack';
import {
  entry,
  ElmConfig,
  htmlWebpackplugin,
  scriptExtHtmlWebpackPlugin
} from './common';
import { resolve } from './common';
import { getOptimization } from './optimization';
import { getCssRule } from './css';
import { getElmRule } from './elm';
import { getTsRule } from './babel';
import { getAssetRule } from './assets';
import { join, resolve as resolveP } from 'path';

const HtmlCriticalPlugin = require('html-critical-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// fix for linked modules
const OfflinePlugin = require(require('resolve-cwd')('offline-plugin'));

export const prod = (config: ElmConfig): webpack.Configuration => ({
  entry,

  resolve,

  module: {
    rules: [
      getElmRule(true, config.assets),
      getAssetRule(),
      getTsRule(true, config.browsers),
      getCssRule(true, config.browsers)
    ]
  },

  optimization: getOptimization(true),

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    htmlWebpackplugin,
    scriptExtHtmlWebpackPlugin,
    new MiniCssExtractPlugin({
      filename: '[name].[chunkHash].css'
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '85'
      }
    }),
    ...(config.prerender
      ? [
          new PrerenderSPAPlugin({
            staticDir: join(process.cwd(), 'dist'),
            routes: config.prerender.routes,
            renderer: new Renderer({
              injectProperty: '__PWAC',
              inject: {
                prerendered: true
              }
            })
          }),

          ...config.prerender.routes.map(
            route =>
              new HtmlCriticalPlugin({
                base: resolveP(process.cwd(), 'dist'),
                src: join(route.slice(1), 'index.html'),
                dest: join(route.slice(1), 'index.html'),
                inline: true,
                minify: true,
                width: 1920,
                height: 1080
              })
          )
        ]
      : []),
    ...(config.manifest
      ? [
          new WebpackPwaManifest({
            ...config.manifest
          })
        ]
      : []),
    new OfflinePlugin({
      appShell: '/',
      autoUpdate: true, // one hour
      externals: [...(config.prerender ? config.prerender.routes : [])],
      ServiceWorker: {
        events: true
      }
    })
  ]
});
