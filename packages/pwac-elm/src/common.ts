const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

export const scriptExtHtmlWebpackPlugin = new ScriptExtHtmlWebpackPlugin({
  defaultAttribute: 'defer'
});

export const htmlWebpackplugin = (manifest: ElmConfig['manifest']) =>
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: 'head',
    title: (manifest && manifest.name) || 'PWAC'
  });

export const resolve = {
  extensions: ['.ts', '.tsx', '.js']
};

export const entry = './src/index.tsx';

export type ElmConfig = {
  env: 'elm';
  assets: {
    package: string;
  };
  browsers: Array<string>;
  prerender: false | { routes: Array<string> };
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
