import { connect } from 'react-redux';

import TransferTicketModal from './TransferTicketModal';

const mapDispatchToProps = require('./reducer');

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isOpen: state.transferTicketModal.isOpen
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferTicketModal);
