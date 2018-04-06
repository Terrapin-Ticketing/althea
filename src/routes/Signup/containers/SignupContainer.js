import { connect } from 'react-redux';
const mapDispatchToProps = {
  ...require('../modules/signup')
};

import Signup from '../components/Signup';

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
