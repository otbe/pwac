import { ReactConfig } from './common';

export const getTsRule = (
  production: boolean,
  browsers: ReactConfig['browsers']
) => ({
  test: /\.(ts|tsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        plugins: (!production ? ['react-hot-loader/babel'] : []).concat(
          'react-loadable/babel',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread'
        ),
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
          '@babel/preset-react',
          [
            '@babel/preset-stage-0',
            { decoratorsLegacy: true, pipelineProposal: 'minimal' }
          ],
          '@babel/preset-typescript'
        ]
      }
    }
  ]
});
