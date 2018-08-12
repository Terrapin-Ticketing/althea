export default () => ({
  path: 'set-password/:token',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ResetPassword = require('./Container').default

      cb(null, ResetPassword)
    }, 'set-password')
  }
})
