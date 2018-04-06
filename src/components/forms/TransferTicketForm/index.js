import { connect } from 'react-redux';

import TransferTicketForm from './TransferTicketForm';

const mapDispatchToProps = require('./reducer');

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    transferToUser: state.form.ticketTransferForm && state.form.ticketTransferForm.values
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferTicketForm);
