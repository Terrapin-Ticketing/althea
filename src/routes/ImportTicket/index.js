import { injectReducer } from 'store/reducers'

export default (store, wrappers = []) => ({
  path: 'event/:urlSafeName/import',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ImportTicket = require('./Container').default
      const reducer = require('./modules').default

      injectReducer(store, { key: 'importTicket', reducer })

      cb(null, ImportTicket)
    }, 'event')
  }
})
