import * as Ajv from 'ajv';

export { prod } from './prod';
export { dev } from './dev';

export const validate = (config: any): boolean => {
  const ajv = new Ajv();
  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
  ajv.validate(require('../config/schema.json'), config);
  return ajv.errors == null;
};
