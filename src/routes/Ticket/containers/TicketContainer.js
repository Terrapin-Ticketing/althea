import { connect } from 'react-redux';
const modules = require('../modules/ticket');
const authModules = require('../../../store/authentication').actions;

import Ticket from '../components/Ticket';

let mapDispatchToProps = {
  ...modules,
  ...authModules
};

const mapStateToProps = (state) => {
  return {
    ticket: state.ticket.ticket,
    event: state.ticket.currentEvent,
    user: state.auth.user,
    order: state.ticket.order,
    redirect: state.ticket.redirect
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
