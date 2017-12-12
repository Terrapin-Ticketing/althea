import { connect } from 'react-redux';

import Ticket from '../components/Ticket';

const mapDispatchToProps = require('../modules/ticket');

const mapStateToProps = (state) => {
  return {
    ticket: state.ticket.ticket,
    event: state.ticket.currentEvent
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
