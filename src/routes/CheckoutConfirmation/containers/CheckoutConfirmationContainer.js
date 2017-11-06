import { connect } from 'react-redux';

let mapDispatchToProps = { };

import CheckoutConfirmation from '../components/CheckoutConfirmation';

const mapStateToProps = (state) => {
  return {
    transactions: state.checkout.txList,
    email: state.checkout.email,
    paymentMethod: state.checkout.paymentMethod,
    event: state.event.currentEvent,
    order: state.event.order,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutConfirmation);
