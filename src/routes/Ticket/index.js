import { injectReducer } from '../../store/reducers';

export default (store, wrappers = []) => ({
  path: 'ticket/:ticketId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Events = require('./containers/TicketContainer').default;
      const reducer = require('./modules/ticket').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'ticket', reducer });

      // wrap component in any higher order components pass to it
      let wrapped = Events;
      wrappers.forEach((wrapper) => wrapped = wrapper(wrapped));
      /*  Return getComponent   */
      cb(null, wrapped);

    /* Webpack named bundle   */
    }, 'ticket');
  }
});
