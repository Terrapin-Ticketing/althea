import { injectReducer } from '../../store/reducers';
import UnsoldTickets from './UnsoldTickets';
import SoldTickets from './SoldTickets';

export default (store, wrappers = []) => ({
  path: 'event/:id/manage',
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
    }, 'eventManager');
  },
  childRoutes: [
    UnsoldTickets(store, [ ]),
    SoldTickets(store, [ ])
  ]
});
