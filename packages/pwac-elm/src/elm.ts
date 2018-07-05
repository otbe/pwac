import { ElmConfig } from './common';

export const getElmRule = (
  production: boolean,
  userPackage: ElmConfig['assets']
) => ({
  test: /\.elm$/,
  exclude: [/elm-stuff/, /node_modules/],
  use: (!production ? [{ loader: 'elm-hot-loader', options: {} }] : []).concat([
    {
      loader: 'elm-assets-loader',
      options: {
        module: 'Assets',
        tagger: 'AssetPath',
        package: userPackage.package
      }
    },
    {
      loader: 'elm-webpack-loader',
      options: !production
        ? {
            debug: true,
            warn: true
          }
        : {}
    }
  ])
});
