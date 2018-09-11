import * as program from 'commander';
import { spawn } from 'npm-run';
import { resolve } from 'path';
import { check } from './check';

const cwd = process.cwd();

program.version(require('../package.json').version);

program
  .command('watch')
  .option('--analyze-bundle')
  .action(async e => {
    spawn(
      'webpack-dev-server',
      [
        '--config',
        resolve(__dirname, 'webpack', 'dev.js'),
        e.analyzeBundle ? '--env.PWAC_ANALYZE_BUNDLE=true' : null
      ].filter(x => !!x),
      { cwd, stdio: 'inherit' }
    );
  });

program.command('check').action(async () => {
  check();
});

program.command('build').action(async () => {
  check();

  spawn('webpack', ['--config', resolve(__dirname, 'webpack', 'prod.js')], {
    cwd,
    stdio: 'inherit'
  });
});

program
  .command('serve')
  .option('-p <port>')
  .action(async e =>
    spawn('pushstate-server', ['dist', `${e.P || 8080}`].filter(x => !!x), {
      cwd,
      stdio: 'inherit'
    })
  );

program.on('command:*', function() {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  );
  process.exit(1);
});

program.parse(process.argv);

if (program.args.length < 1) {
  program.help();
}
