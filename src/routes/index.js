// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from './Home';
import LoginRoute from './Login';
import EventsRoute from './Events';
import EventRoute from './Event';
import AvailableTicketsRoute from './AvailableTickets';
// import CreateEventRoute from './CreateEvent';
import UserRoute from './User';
import CheckoutRoute from './Checkout';
// import CheckoutConfirmationRoute from './CheckoutConfirmation';
// import EventManager from './EventManager';
import TicketRoute from './Ticket';
import ActivateTicket from './ActivateTicket';
import SetPassword from './SetPassword';
import ForgotPassword from './ForgotPassword';
import Help from './Help';
import Transition from '../utils/AppearTransition';
import requireAuth from '../utils/requireAuth';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout(store),
  indexRoute: Home,
  childRoutes: [
    LoginRoute(store, [ Transition ]),
    EventRoute(store, [ Transition ]),
    EventsRoute(store, [ Transition ]),
    AvailableTicketsRoute(store, [ Transition ]),
    CheckoutRoute(store, [ ]),
    UserRoute(store, [ requireAuth, Transition ]),
    TicketRoute(store, [ Transition ]),
    ActivateTicket(store, [ Transition ]),
    SetPassword(store, [ Transition ]),
    ForgotPassword(store, [ Transition ]),
    Help(store, [ Transition ]),
    // EventManager(store, [ ]),
    // CheckoutConfirmationRoute(store, [ ]),
    // CreateEventRoute(store, [ requireAuth, requirePKTimeout, requirePK ]),
  ]
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;
