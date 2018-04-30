export default () => ({
  path: 'signup',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Login = require('./Container').default
      cb(null, Login)
    }, 'signup')
  }
})
