import { injectReducer } from '../../store/reducers'

export default (store, wrappers = []) => ({
  path: 'signup',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Signup = require('./containers/SignupContainer').default
      const reducer = require('./modules/signup').default

      injectReducer(store, { key: 'signup', reducer })

      let wrapped = Signup
      wrappers.forEach((wrapper) => wrapped = wrapper(wrapped))

      cb(null, wrapped)
    }, 'signup')
  }
})
