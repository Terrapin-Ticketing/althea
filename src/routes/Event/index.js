import { injectReducer } from '../../store/reducers';
import TicketRoute from '../Ticket';

export default (store, wrappers = []) => ({
  path: 'event/:urlSafe',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Event = require('./containers/EventContainer').default;
      const reducer = require('./modules/event').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'event', reducer });

      // wrap component in any higher order components pass to it
      let wrapped = Event;
      wrappers.forEach((wrapper) => wrapped = wrapper(wrapped));
      /*  Return getComponent   */
      cb(null, wrapped);

    /* Webpack named bundle   */
    }, 'event');
  },
  childRoutes: [
    TicketRoute(store, [ ])
  ]
});
