import * as Ajv from 'ajv';
import { dev } from '../src/dev';
import { prod } from '../src/prod';
const keywords = require('ajv-keywords');
const webpackSchema = require('webpack/schemas/WebpackOptions.json');

describe('Config', () => {
  [
    'complete',
    'manifest',
    'disabled',
    'prerender-disabled',
    'image-optimization-disabled'
  ].forEach(c =>
    describe(`${c}.json`, () => {
      let ajv: Ajv.Ajv;
      const config = require(`./configs/${c}.json`);

      beforeEach(() => {
        ajv = new Ajv({ $data: true });
        keywords(ajv);
      });

      it('should validate dev config', async () => {
        await ajv.validate(webpackSchema, dev(config));
        expect(ajv.errors).toBeNull();
      });

      it('should validate prod config', async () => {
        await ajv.validate(webpackSchema, prod(config));
        expect(ajv.errors).toBeNull();
      });
    })
  );
});
