import * as webpack from 'webpack';

export const loadConfig = (
  production: boolean,
  projectConfig: any
): webpack.Configuration => {
  let projectEnv;

  try {
    projectEnv = require(`pwac-${projectConfig.env}`);
  } catch (e) {
    throw `Missing env ${projectConfig.env}`;
  }

  if (!projectEnv.validate(projectConfig)) {
    throw `invalid config for ${projectConfig.env} supplied`;
  }

  return projectEnv[production ? 'prod' : 'dev'](projectConfig);
};
