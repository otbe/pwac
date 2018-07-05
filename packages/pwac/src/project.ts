import { resolve } from 'path';
import { merge, memoize } from 'lodash';

const defaultConfigPath = process.env.PWAC_CONFIG || null;
const defaultPackageJsonPath = resolve(process.cwd(), './package.json');

export const getProjectConfig = memoize(
  (
    configPath: string | null = defaultConfigPath,
    packageJsonPath = defaultPackageJsonPath
  ): any =>
    merge(
      {},

      configPath ? require(configPath) : require(packageJsonPath).pwac || {}
    ),
  (arg0, arg1, arg2) =>
    `${arg0 || defaultConfigPath}${arg1 || defaultPackageJsonPath}${arg2}`
);

export const getWebpackModifierFn = (
  pwacConfigPath = resolve(process.cwd(), './pwac.config.js')
) => {
  let fn = (e: any) => e;

  try {
    fn = require(pwacConfigPath);
  } catch {}

  return fn;
};
