import { connect } from 'react-redux';

import SellTicketForm from './SellTicketForm';

const mapDispatchToProps = require('./reducer');

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    ticket: state.sellTicketModal.ticket,
    sellFormData: state.form.sellTicketForm && state.form.sellTicketForm.values
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellTicketForm);
