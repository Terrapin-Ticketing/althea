import { connect } from 'react-redux';

import SellTicketForm from './SellTicketForm';

const mapDispatchToProps = require('./reducer');

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    ticket: state.sellTicketModal.ticket,
    sellFormData: state.form.sellTicketForm && state.form.sellTicketForm.values,
    initialValues: { payoutMethod: state.auth.user.payout.default || 'paypal', payoutValue: state.auth.user.payout[state.auth.user.payout.default],
      price: state.sellTicketModal.ticket.price, isForSale: state.sellTicketModal.ticket.isForSale }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellTicketForm);
