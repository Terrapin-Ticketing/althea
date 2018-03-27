import { connect } from 'react-redux';

import User from '../components/User';

const userModules = require('../modules/user');

let mapDispatchToProps = {
  ...userModules
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    tickets: state.user.tickets
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
