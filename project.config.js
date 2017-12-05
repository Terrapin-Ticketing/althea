const NODE_ENV = process.env.NODE_ENV || 'development';

// Local DEFAULTS
let SHAKEDOWN_URL = JSON.stringify('http://localhost:8080');
let EOTW_URL = JSON.stringify('http://localhost:8000');

let STRIPE_PUBLIC_KEY = JSON.stringify('pk_test_GvYM7xVYxIO8vE41geXObIYD');

// switch (NODE_ENV) {
//   case 'testrpc':
//     WEB3_HOST = JSON.stringify('http://localhost:8545');
//     break;
//   case 'demo': {
//     let infura_apikey = 'ErkMqD1W4xWqfkfqNBnt';
//     let ropsten_host = 'https://ropsten.infura.io/'+infura_apikey;
//     WEB3_HOST = JSON.stringify(ropsten_host);
//     SHAKEDOWN_URL = JSON.stringify('https://shakedown.terrapintickets.io');
//     EOTW_URL = JSON.stringify('https://eotw.terrapintickets.io');
//     break;
//   }
//   case 'ropsten': {
//     let infura_apikey = 'ErkMqD1W4xWqfkfqNBnt';
//     let ropsten_host = 'https://ropsten.infura.io/'+infura_apikey;
//     WEB3_HOST = JSON.stringify(ropsten_host);
//     SHAKEDOWN_URL = JSON.stringify('https://shakedown.terrapintickets.io');
//     EOTW_URL = JSON.stringify('https://eotw.terrapintickets.io');
//     break;
//   }
//   default:
// }

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
    STRIPE_PUBLIC_KEY
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
