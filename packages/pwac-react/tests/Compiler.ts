import { execSync } from 'npm-run';
import { join, resolve } from 'path';
import { snapshot } from 'snapshot-dir';

describe('Compiler (react)', () => {
  const cwd = resolve(__dirname, '..', '..', 'example-react');
  process.env.PWAC_CONFIG_TEST = 'test_config';

  it(`should build the example with config from package.json`, async () => {
    try {
      await execSync('pwac build', {
        cwd
      });
    } catch (e) {
      expect(e).toBeUndefined();
    }

    const result = await snapshot(join(cwd, 'dist'));

    expect(result).toMatchSnapshot();
  });

  [
    'complete',
    'disabled',
    'manifest',
    'prerender-disabled',
    'preload-lazy-chunks',
    'image-optimization-disabled'
  ].forEach(c => {
    it(`should build the example with config ${c}.json`, async () => {
      try {
        await execSync('pwac build', {
          cwd,
          env: {
            ...process.env,
            PWAC_CONFIG: resolve(__dirname, 'configs', `${c}.json`)
          }
        });
      } catch (e) {
        expect(e).toBeUndefined();
      }

      const result = await snapshot(join(cwd, 'dist'));

      expect(result).toMatchSnapshot();
    });
  });
});
