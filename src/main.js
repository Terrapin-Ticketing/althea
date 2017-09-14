import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import setAuthorizationToken from './utils/setAuthorizationToken';
import createStore from './store/createStore';
import { injectReducer } from './store/reducers'
// import { browserHistory } from 'react-router';

import './styles/main.scss';


// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__);

// decrypt jwt if cookie is set
const { cookieToken } = cookie.parse(document.cookie);

if (cookieToken) {
  setAuthorizationToken(cookieToken);
  console.log('hererherh');
  store.dispatch({
    type: 'LOGIN_SUCCESS',
    payload: jwt.decode(cookieToken)
  });
}

// add a reducer to handle initial initiation of web3 and metamask
injectReducer(store, { key: 'auth', reducer: (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
} });


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
