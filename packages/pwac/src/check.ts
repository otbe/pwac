import { getProjectConfig } from './project';
import { execSync } from 'npm-run';

export const check = () => {
  const config = getProjectConfig();
  const cwd = process.cwd();

  if (config.env === 'react') {
    try {
      execSync('tcm src/ -c -s');
    } catch (e) {
      console.log(e.output[1].toString());
      process.exit(1);
      return;
    }

    try {
      execSync('tsc --noEmit', {
        cwd
      });
    } catch (e) {
      console.log(e.output[1].toString());
      process.exit(1);
      return;
    }
  }
};
