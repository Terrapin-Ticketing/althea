import { injectReducer } from '../../../store/reducers';

export default (store, wrappers = []) => ({
  path: 'soldTickets',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const SoldTickets = require('./containers/SoldTicketsContainer').default;
      const reducer = require('./modules/soldTickets').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'soldTickets', reducer });

      // wrap component in any higher order components pass to it
      let wrapped = SoldTickets;
      wrappers.forEach((wrapper) => wrapped = wrapper(wrapped));
      /*  Return getComponent   */
      cb(null, wrapped);

    /* Webpack named bundle   */
  }, 'soldTickets');
  }
});
