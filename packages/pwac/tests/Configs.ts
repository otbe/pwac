import * as Ajv from 'ajv';
import dev from '../src/webpack/dev';
import prod from '../src/webpack/prod';
const keywords = require('ajv-keywords');
const webpackSchema = require('webpack/schemas/WebpackOptions.json');

jest.mock('../src/project');

describe('Config', () => {
  let ajv: Ajv.Ajv;
  const getProjectConfigMock: jest.Mock<{}> = require('../src/project')
    .getProjectConfig;
  const getWebpackModifierFnMock: jest.Mock<{}> = require('../src/project')
    .getWebpackModifierFn;

  beforeAll(() => getWebpackModifierFnMock.mockImplementation(() => e => e));

  beforeEach(() => {
    ajv = new Ajv({ $data: true });
    keywords(ajv);
    getProjectConfigMock.mockReturnValue(require(`./configs/complete.json`));
  });

  it('should validate dev config', async () => {
    await ajv.validate(webpackSchema, dev({}));
    expect(ajv.errors).toBeNull();
  });

  it('should validate prod config', async () => {
    await ajv.validate(webpackSchema, prod());
    expect(ajv.errors).toBeNull();
  });

  it('should throw on missing env', () => {
    getProjectConfigMock.mockReturnValue(require(`./configs/missing-env.json`));
    expect(() => dev()).toThrow();
  });

  it('should throw on invalidate config', () => {
    getProjectConfigMock.mockReturnValue(require(`./configs/invalid.json`));
    expect(() => dev()).toThrow();
  });
});
