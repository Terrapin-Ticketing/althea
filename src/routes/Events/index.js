import { injectReducer } from '../../store/reducers'

export default (store, wrappers = []) => ({
  path: 'events',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Events = require('./containers/EventsContainer').default
      const reducer = require('./modules/events').default

      injectReducer(store, { key: 'events', reducer })

      let wrapped = Events
      wrappers.forEach((wrapper) => wrapped = wrapper(wrapped))

      cb(null, wrapped)
    }, 'events')
  },
})
