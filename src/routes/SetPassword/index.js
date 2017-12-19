import { injectReducer } from '../../store/reducers';

export default (store, wrappers = []) => ({
  path: 'set-password/:token',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Login = require('./containers/SetPasswordContainer').default;
      const reducer = require('./modules/setPassword').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'setPassword', reducer });

      // wrap component in any higher order components pass to it
      let wrapped = Login;
      wrappers.forEach((wrapper) => wrapped = wrapper(wrapped));
      /*  Return getComponent   */
      cb(null, wrapped);

    /* Webpack named bundle   */
    }, 'setPassword');
  }
});
