import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import setAuthorizationToken from './utils/setAuthorizationToken';
import createStore from './store/createStore';

import './styles/main.scss';

// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__);


// decrypt jwt if cookie is set
const { cookieToken } = cookie.parse(document.cookie);

if (cookieToken) {
  setAuthorizationToken(cookieToken);
  store.dispatch({
    type: 'LOGIN',
    payload: jwt.decode(cookieToken)
  });
}

//Increment the idle time counter every minute.
let idleTime = 0;
setInterval(timeoutLogout, 600); // 1 minute
function timeoutLogout() {
  idleTime++;
  console.log('timeout: ', idleTime);
  if (idleTime > 10) { // 20 minute timeout
    console.log('herer');
    store.dispatch({
      type: 'UNCACHE_PK'
    });
    idleTime = 0;
  }
}

// //Zero the idle timer on mouse movement.
document.addEventListener('mousemove', () => {
  idleTime = 0;
}, false);
document.addEventListener('keydown', () => {
  idleTime = 0;
}, false);

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const App = require('./components/App').default;
  const routes = require('./routes/index').default(store);

  ReactDOM.render(
    <App store={store} routes={routes} />,
    MOUNT_NODE
  );
};

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    render = () => {
      try {
        renderApp();
      } catch (e) {
        console.error(e);
        renderError(e);
      }
    };

    // Setup hot module replacement
    module.hot.accept([
      './components/App',
      './routes/index'
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render();
