const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

export const htmlWebpackplugin = (manifest: ReactConfig['manifest']) =>
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: 'head',
    title: (manifest && manifest.name) || 'PWAC'
  });

export const scriptExtHtmlWebpackPlugin = new ScriptExtHtmlWebpackPlugin({
  defaultAttribute: 'defer'
});

export const resolve = {
  extensions: ['.ts', '.tsx', '.js']
};

export const entry = './src/index.tsx';

export type ReactConfig = {
  env: 'react';
  browsers: Array<string>;
  images: false | { sizes: Array<number> };
  prerender: false | { routes: Array<string> };
  preloadLazyChunks: boolean;
  cssFeatures?: { [key: string]: boolean | { [key: string]: string } };
  manifest:
    | false
    | {
        name: string;
        short_name: string;
        description: string;
        background_color: string;
        icons: Array<{
          src: string;
          sizes: Array<number>;
        }>;
        related_applications: Array<{ platform: string; url: string }>;
      };
};
