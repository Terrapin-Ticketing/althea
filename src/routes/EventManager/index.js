import { injectReducer } from '../../store/reducers';
import Transactions from './Transactions';
import Transfers from './Transfers';
import Payments from './Payments';
import Stats from './Stats';

export default (store, wrappers = []) => ({
  path: 'event/:urlSafe/manage',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const EventManager = require('./containers/EventManagerContainer').default;
      const reducer = require('./modules/eventManager').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'eventManager', reducer });

      // wrap component in any higher order components pass to it
      let wrapped = EventManager;
      wrappers.forEach((wrapper) => wrapped = wrapper(wrapped));
      /*  Return getComponent   */
      cb(null, wrapped);

    /* Webpack named bundle   */
    }, 'event');
  },
  childRoutes: [
    Transactions(store, [ ]),
    Transfers(store, [ ]),
    Payments(store, [ ]),
    Stats(store, [ ])
  ]
});
