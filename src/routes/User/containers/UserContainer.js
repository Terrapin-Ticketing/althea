import { connect } from 'react-redux'
import { getUserTickets, getUserEvents, getUserBalance, transferTicket } from '../modules/user'

import User from '../components/User'

const mapDispatchToProps = {
  getUserTickets,
  getUserEvents,
  getUserBalance,
  transferTicket
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    balance: state.auth.balance,
    events: state.user.events,
    tickets: state.user.tickets
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
