const HtmlWebpackPlugin = require('html-webpack-plugin');

export const htmlWebpackplugin = new HtmlWebpackPlugin({
  template: 'src/index.html'
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
      };
};
