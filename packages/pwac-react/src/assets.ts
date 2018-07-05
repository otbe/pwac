export const getAssetRule = () => ({
  test: /\.(gif|svg|eot|ttf|woff|woff2)$/,
  loader: 'url-loader',
  options: {
    limit: 10000
  }
});
