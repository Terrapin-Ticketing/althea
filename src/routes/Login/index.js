export default () => ({
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Login = require('./Container').default

      cb(null, Login)
    }, 'login')
  }
})
