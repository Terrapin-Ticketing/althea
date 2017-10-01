import { connect } from 'react-redux';

import User from '../components/User';

const mapDispatchToProps = require('../modules/user');

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    balance: state.auth.balance,
    events: state.user.events,
    tickets: state.user.tickets
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
