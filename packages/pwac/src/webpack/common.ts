export const entry = './src/index.tsx';

const WebpackBar = require('webpackbar');

const CleanWebpackPlugin = require('clean-webpack-plugin');

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
  filename: 'app.js'
};
