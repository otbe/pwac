import { ElmConfig } from './common';

export const getTsRule = (
  production: boolean,
  browsers: ElmConfig['browsers']
) => ({
  test: /\.(ts|tsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread'
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers
          },
          useBuiltIns: 'usage',
          modules: production ? false : undefined
        }
      ],
      ['@babel/preset-stage-0', { decoratorsLegacy: true }],
      '@babel/preset-typescript'
    ]
  }
});
