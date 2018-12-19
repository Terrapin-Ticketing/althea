export default () => ({
  path: 'design',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const DesignPalette = require('./Container').default
      cb(null, DesignPalette)
    }, 'design')
  }
})
