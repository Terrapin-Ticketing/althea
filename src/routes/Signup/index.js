export default () => ({
  path: 'signup',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Signup = require('./Container').default
      cb(null, Signup)
    }, 'signup')
  }
})
