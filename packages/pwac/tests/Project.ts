import { getProjectConfig, getWebpackModifierFn } from '../src/project';

describe('Project configuation', () => {
  it('should accept config file path via env', () => {
    expect(
      getProjectConfig(require.resolve(`./configs/complete.json`))
    ).toMatchSnapshot();
  });

  it('should return noop from missing pwac.config.js', () => {
    const o = {};
    expect(getWebpackModifierFn()(o)).toEqual(o);
  });

  it('should apply pwac.config.js', () => {
    const m = getWebpackModifierFn(require.resolve('./configs/pwac.config.js'))(
      {}
    );

    expect(m.test).toBeTruthy();
  });
});
