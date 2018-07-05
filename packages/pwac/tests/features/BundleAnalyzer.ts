import dev from '../../src/webpack/dev';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

jest.mock('../../src/project');

describe('BundleAnalyzer', () => {
  const getProjectConfigMock: jest.Mock<{}> = require('../../src/project')
    .getProjectConfig;
  const getWebpackModifierFnMock: jest.Mock<{}> = require('../../src/project')
    .getWebpackModifierFn;

  beforeAll(() => getWebpackModifierFnMock.mockImplementation(() => e => e));

  beforeEach(() => {
    getProjectConfigMock.mockReset();
    getProjectConfigMock.mockReturnValue(require(`../configs/complete.json`));
  });

  it('should add bundle analyzer plugin if desired', async () => {
    const conf = dev({ PWAC_ANALYZE_BUNDLE: true });
    expect(
      conf.plugins.some(x => x instanceof BundleAnalyzerPlugin)
    ).toBeTruthy();
  });

  it('shouldnt add bundle analyzer', async () => {
    const conf = dev({});
    expect(
      conf.plugins.some(x => x instanceof BundleAnalyzerPlugin)
    ).toBeFalsy();
  });
});
