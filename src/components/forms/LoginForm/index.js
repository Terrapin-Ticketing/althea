import { connect } from 'react-redux';

import LoginForm from './LoginForm';

const mapDispatchToProps = require('./reducer');

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
