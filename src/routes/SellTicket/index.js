import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '/:urlSafe/ticket/:ticketId/sell',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const SellTicket = require('./Container').default
      const reducer = require('./modules').default

      injectReducer(store, { key: 'sellTicket', reducer })

      cb(null, SellTicket)
    }, 'sellTicket')
  }
})
