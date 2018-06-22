import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'event/:urlSafeName',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Event = require('./Container').default
      const reducer = require('./modules').default

      injectReducer(store, { key: 'event', reducer })

      cb(null, Event)
    }, 'event')
  }
})
