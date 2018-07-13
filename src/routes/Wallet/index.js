import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'wallet',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Wallet = require('./Container').default
      const reducer = require('./modules').default

      injectReducer(store, { key: 'wallet', reducer })

      cb(null, Wallet)
    }, 'wallet')
  }
})
