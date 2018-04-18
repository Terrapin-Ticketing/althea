// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import EventsRoute from './Events'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    LoginRoute(store),
    SignupRoute(store),
    EventsRoute(store)
  ]
})

export default createRoutes
