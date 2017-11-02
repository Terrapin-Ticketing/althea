import { connect } from 'react-redux';
const mapDispatchToProps = require('../modules/checkout');

import Checkout from '../components/Checkout';

const mapStateToProps = (state) => {
  return {
    event: state.event.currentEvent,
    order: state.event.order,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
