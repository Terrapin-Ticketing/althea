import { connect } from 'react-redux';
const modules = require('../modules/ticket');
const authModules = require('../../../store/authentication').actions;
const userModules = require('../../User/modules/user');

import Ticket from '../components/Ticket';

let mapDispatchToProps = {
  ...modules,
  ...authModules,
  ...userModules
};

const mapStateToProps = (state) => {
  return {
    ticket: state.ticket.ticket,
    // tickets: state.user.tickets,
    event: state.ticket.currentEvent,
    user: state.auth.user,
    order: state.ticket.order,
    redirect: state.ticket.redirect,
    error: state.ticket.error
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
