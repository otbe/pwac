import { execSync } from 'npm-run';
import { join, resolve } from 'path';
import { snapshot } from 'snapshot-dir';

describe('Compiler (react)', () => {
  const cwd = resolve(__dirname, '..', '..', 'example-react');

  it(`should build the example with config from package.json`, async () => {
    try {
      await execSync('pwac build', {
        cwd
      });
    } catch (e) {
      expect(e).toBeUndefined();
    }

    const { 'sw.js': SW, ...r } = await snapshot(join(cwd, 'dist'));

    expect(SW).toBeDefined();
    expect(r).toMatchSnapshot();
  });

  [
    'complete',
    'disabled',
    'manifest',
    'prerender-disabled',
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

      const { 'sw.js': SW, ...r } = await snapshot(join(cwd, 'dist'));

      expect(SW).toBeDefined();
      expect(r).toMatchSnapshot();
    });
  });
});
