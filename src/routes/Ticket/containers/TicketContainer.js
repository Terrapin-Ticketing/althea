import { connect } from 'react-redux';
const modules = require('../modules/ticket');
const authModules = require('../../../store/authentication').actions;
const userModules = require('../../User/modules/user');
const transferTicketModalModules = require('../../../components/shared/TransferTicketModal/reducer');
const sellTicketModalModules = require('../../../components/shared/SellTicketModal/reducer');

import Ticket from '../components/Ticket';

let mapDispatchToProps = {
  ...modules,
  ...authModules,
  ...userModules,
  ...transferTicketModalModules,
  ...sellTicketModalModules
};

const mapStateToProps = (state) => {
  return {
    ticket: state.ticket.ticket,
    event: state.ticket.currentEvent,
    user: state.auth.user,
    order: state.ticket.order,
    redirect: state.ticket.redirect,
    error: state.ticket.error,
    transferTicketModalOpen: state.transferTicketModal.isOpen,
    sellTicketModalOpen: state.sellTicketModal.isOpen,
    reserveToken: state.ticket.reserveToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
