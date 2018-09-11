import { getWebpackModifierFn, getProjectConfig } from '../project';
import {
  cleanDistPlugin,
  stats,
  context,
  reporterPlugin,
  output,
  spaConfig
} from './common';
import { join } from 'path';
import { loadConfig } from '../env';

export default () => {
  const projectConfig = getProjectConfig();
  const modifierFn = getWebpackModifierFn();

  let config = loadConfig(true, projectConfig);

  config.output = {
    ...output,
    filename: '[name].[chunkHash].js',
    publicPath: '/',
    path: join(process.cwd(), 'dist')
  };

  config.context = context;

  config.plugins.unshift(cleanDistPlugin);
  config.plugins.push(reporterPlugin);
  config.plugins.push(spaConfig);

  config.mode = 'production';

  config.stats = stats;

  config.devtool = 'source-map';

  return modifierFn(config);
};
