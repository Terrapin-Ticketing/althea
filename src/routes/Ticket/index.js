import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '/:urlSafe/ticket/:ticketId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Ticket = require('./Container').default
      const reducer = require('./modules').default

      injectReducer(store, { key: 'ticket', reducer })

      cb(null, Ticket)
    }, 'ticket')
  }
})
