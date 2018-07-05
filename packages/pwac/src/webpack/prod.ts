import { getWebpackModifierFn, getProjectConfig } from '../project';
import {
  cleanDistPlugin,
  stats,
  context,
  reporterPlugin,
  output
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

  config.mode = 'production';

  config.stats = stats;

  return modifierFn(config);
};
