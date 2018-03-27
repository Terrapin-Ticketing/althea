import { connect } from 'react-redux';

import TransferTicketModal from './TransferTicketModal';

const mapDispatchToProps = require('./reducer');

const mapStateToProps = (state) => {
  return {
    ticket: state.transferTicketModal.ticket
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferTicketModal);
