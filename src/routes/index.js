// We only need to import the modules necessary for initial render
import CoreLayout from 'layouts/PageLayout'
import Home from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import EventsRoute from './Events'
import EventRoute from './Event'
import ImportTicketRoute from './ImportTicket'
import WalletRoute from './Wallet'
import TicketRoute from './Ticket'
import TransferTicketRoute from './TransferTicket'
import SellTicketRoute from './SellTicket'
import ForgotPasswordRoute from './ForgotPassword'
import ResetPasswordRoute from './ResetPassword'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    LoginRoute(store),
    SignupRoute(store),
    EventsRoute(store),
    EventRoute(store),
    ImportTicketRoute(store),
    WalletRoute(store),
    TicketRoute(store),
    TransferTicketRoute(store),
    SellTicketRoute(store),
    ForgotPasswordRoute(store),
    ResetPasswordRoute(store)
  ]
})

export default createRoutes
