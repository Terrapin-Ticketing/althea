import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import cookie from 'cookie'
import './styles/main.scss'
import { setUserFromToken } from 'store/authentication.js'

// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__)

// decrypt jwt if cookie is set
const { cookieToken } = cookie.parse(document.cookie)

console.log('cookieToken: ', cookieToken);

if (cookieToken) {
  store.dispatch(setUserFromToken(cookieToken))
}

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./components/App').default
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <App store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) { // eslint-disable-line no-undef
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e) //eslint-disable-line no-console
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([ // eslint-disable-line no-undef
      './components/App',
      './routes/index',
    ], () =>
      setImmediate(() => { // eslint-disable-line no-undef
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
