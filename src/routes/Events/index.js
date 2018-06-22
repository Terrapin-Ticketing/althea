import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'events',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Events = require('./Container').default
      const reducer = require('./modules').default

      injectReducer(store, { key: 'events', reducer })

      cb(null, Events)
    }, 'events')
  },
})
