import { injectReducer } from '../../store/reducers'

export default (store, wrappers = []) => ({
  path: 'help',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Help = require('./containers/HelpContainer').default;
      const reducer = require('./modules/help').default;

      /*  Add the reducer to the store on key 'help'  */
      injectReducer(store, { key: 'help', reducer });

      // wrap component in any higher order components pass to it
      let wrapped = Help;
      wrappers.forEach((wrapper) => wrapped = wrapper(wrapped));
      /*  Return getComponent   */
      cb(null, wrapped);

    /* Webpack named bundle   */
  }, 'help');
  }
});
