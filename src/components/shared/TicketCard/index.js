import { connect } from 'react-redux';

import TicketCard from './TicketCard';

const ticketCardModules = require('./reducer');
const transferTicketModalModules = require('../TransferTicketModal/reducer');
const sellTicketModalReducer = require('../SellTicketModal/reducer');

const mapDispatchToProps = {
  ...ticketCardModules,
  ...transferTicketModalModules,
  ...sellTicketModalReducer
};

const mapStateToProps = (state) => {
  return {
    transferTicketModalOpen: state.transferTicketModal.isOpen,
    sellTicketModalOpen: state.sellTicketModal.isOpen
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketCard);
