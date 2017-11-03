import { connect } from 'react-redux';

let mapDispatchToProps = { };

import CheckoutConfirmation from '../components/CheckoutConfirmation';

const mapStateToProps = (state) => {
  return {
    transactions: state.checkout.txList,
    email: state.checkout.email,
    paymentMethod: state.checkout.paymentMethod
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutConfirmation);
