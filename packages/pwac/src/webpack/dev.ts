import { getWebpackModifierFn, getProjectConfig } from '../project';
import { reporterPlugin, cleanDistPlugin, context, output } from './common';
import { join } from 'path';
import { loadConfig } from '../env';

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

export default (env: any = {}) => {
  const projectConfig = getProjectConfig();
  const modifierFn = getWebpackModifierFn();

  let config = loadConfig(false, projectConfig);

  config.output = output;

  config.devtool = 'inline-source-map';

  config.context = context;

  config.plugins.unshift(cleanDistPlugin);

  config.plugins.push(
    reporterPlugin,
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:8080']
      }
    }),
    ...(env.PWAC_ANALYZE_BUNDLE ? [new BundleAnalyzerPlugin()] : [])
  );

  config.mode = 'development';

  config.devServer = {
    contentBase: join(process.cwd(), 'dist'),
    compress: true,
    hot: true,
    overlay: true,
    quiet: true,
    historyApiFallback: true,
    port: 8080
  };

  return modifierFn(config);
};
