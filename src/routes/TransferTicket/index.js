import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '/:urlSafe/ticket/:ticketId/transfer',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const TransferTicket = require('./Container').default
      const reducer = require('./modules').default

      injectReducer(store, { key: 'transferTicket', reducer })

      cb(null, TransferTicket)
    }, 'transferTicket')
  }
})
