export const getAssetRule = () => ({
  test: /\.(gif|svg|eot|ttf|woff|woff2|jpe?g|png)$/,
  loader: 'url-loader',
  options: {
    limit: 10000
  }
});
