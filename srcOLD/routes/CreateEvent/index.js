import { injectReducer } from '../../store/reducers';

import requireAuth from '../../utils/requireAuth';

export default (store, wrappers = []) => ({
  path: 'createEvent',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Events = require('./containers/CreateEventContainer').default;
      const reducer = require('./modules/createEvent').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'createEvent', reducer });

      // wrap component in any higher order components pass to it
      let wrapped = Events;
      wrappers.forEach((wrapper) => wrapped = wrapper(wrapped));
      /*  Return getComponent   */
      cb(null, wrapped);

    /* Webpack named bundle   */
    }, 'createEvent');
  }
});
