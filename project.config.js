const NODE_ENV = process.env.NODE_ENV || 'development';

// DEFAULTS
let WEB3_HOST = JSON.stringify('http://localhost:8545');
let SHAKEDOWN_URL = JSON.stringify('http://localhost:8080');
let EOTW_URL = JSON.stringify('http://localhost:8000');

switch (NODE_ENV) {
  case 'testrpc':
    WEB3_HOST = JSON.stringify('http://localhost:8545');
    break;
  case 'demo': {
    WEB3_HOST = JSON.stringify('http://104.131.33.58:8545');
    SHAKEDOWN_URL = JSON.stringify('http://104.131.21.183:8080');
    EOTW_URL = JSON.stringify('http://104.131.33.58:8080');
    break;
  }
  default:
}

console.log(EOTW_URL);

module.exports = {
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The file name of the application's entry point */
  main: 'main',
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: '/',
  /** Whether to generate sourcemaps */
  sourcemaps: true,
  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},
  /** A hash map of variables and their values to expose globally */
  globals: {
    SHAKEDOWN_URL,
    EOTW_URL,
    WEB3_HOST,
    // SHAKEDOWN_URL: JSON.stringify('http://192.168.12.226:8080'),
    // WEB3_HOST: JSON.stringify('http://192.168.12.226:8545')
    // SHAKEDOWN_URL: JSON.stringify('http://192.168.200.24:8080'),
    // EOTW_URL: JSON.stringify('http://192.168.200.24:8000'),
    // WEB3_HOST: JSON.stringify('http://192.168.200.24:8545'),
    // WEB3_HOST: JSON.stringify('ws://localhost:8546'),
    // WEB3_HOST: JSON.stringify('ws://ropsten.infura.io/ErkMqD1W4xWqfkfqNBnt')
  },
  /** Whether to enable verbose logging */
  verbose: false,
  /** The list of modules to bundle separately from the core application code */
  vendors: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-router'
  ]
};
