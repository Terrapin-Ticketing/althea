import { connect } from 'react-redux'
import { getUserTickets, getUserEvents, getUserBalance } from '../modules/user'

import User from '../components/User'

const mapDispatchToProps = {
  getUserTickets,
  getUserEvents,
  getUserBalance,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    balance: state.auth.balance
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
