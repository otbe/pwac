module.exports = {
  collectCoverage: true,
  coverageReporters: ['text'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  testRegex: '(/tests/.*|(\\.|/))\\.(ts?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
