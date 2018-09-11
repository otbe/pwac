import { DefinePlugin } from 'webpack';

const WebpackBar = require('webpackbar');

const CleanWebpackPlugin = require('clean-webpack-plugin');

export const entry = './src/index.tsx';

export const reporterPlugin = new WebpackBar();

export const cleanDistPlugin = new CleanWebpackPlugin(['dist'], {
  root: process.cwd(),
  verbose: false
});

export const stats = {
  entrypoints: false,
  children: false,
  modules: false
};

export const context = process.cwd();

export const output = {
  filename: 'app.js',
  publicPath: '/'
};

export const spaConfig = new DefinePlugin(
  Object.keys(process.env)
    .filter(x => x.startsWith('PWAC_CONFIG'))
    .reduce(
      (acc, curr) => {
        acc[curr] = JSON.stringify(process.env[curr]);
        return acc;
      },
      {} as { [key: string]: string }
    )
);
