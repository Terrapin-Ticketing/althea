import { connect } from 'react-redux';
const modules = require('../modules/checkout');
const authModules = require('../../../store/authentication').actions;

let mapDispatchToProps = {
  ...modules,
  ...authModules
};

import Checkout from '../components/Checkout';

const mapStateToProps = (state) => {
  return {
    event: state.event.currentEvent,
    order: state.event.order,
    user: state.auth.user,
    redirectUrl: state.location.redirectUrl
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
