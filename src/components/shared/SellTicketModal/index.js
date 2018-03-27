import { connect } from 'react-redux';

import SellTicketModal from './SellTicketModal';

const mapDispatchToProps = require('./reducer');

const mapStateToProps = (state) => {
  return {
    ticket: state.sellTicketModal.ticket
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellTicketModal);
