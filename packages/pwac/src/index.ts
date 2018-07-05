import * as program from 'commander';
import { execSync, spawn } from 'npm-run';
import { resolve } from 'path';

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

program.command('build').action(async () => {
  try {
    execSync('tsc --noEmit', {
      cwd
    });
  } catch (e) {
    console.log(e.output[1].toString());
    process.exit(1);
    return;
  }

  spawn('webpack', ['--config', resolve(__dirname, 'webpack', 'prod.js')], {
    cwd,
    stdio: 'inherit'
  });
});

program
  .command('serve')
  .option('-p <port>')
  .action(async e =>
    spawn(
      'serve',
      ['-s', '-c 0', e.P ? `-p ${e.P}` : null, 'dist/'].filter(x => !!x),
      {
        cwd,
        stdio: 'inherit'
      }
    )
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
