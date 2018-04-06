import { connect } from 'react-redux';

import SignupForm from './SignupForm';

const mapDispatchToProps = require('./reducer');

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
