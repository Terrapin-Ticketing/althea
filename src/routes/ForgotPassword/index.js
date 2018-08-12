export default () => ({
  path: 'forgot-password',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ForgotPassword = require('./Container').default

      cb(null, ForgotPassword)
    }, 'forgot-password')
  }
})
