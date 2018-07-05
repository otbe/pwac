import { ReactConfig } from './common';

export const getImageRule = (images: ReactConfig['images']) => {
  return images
    ? {
        test: /\.(jpe?g|png)$/i,
        loader: 'responsive-loader',
        options: {
          adapter: require('responsive-loader/sharp'),
          placeholder: true,
          ...images
        }
      }
    : {
        test: /\.(jpe?g|png)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      };
};
