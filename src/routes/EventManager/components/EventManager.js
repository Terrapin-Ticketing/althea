import React, { Component } from 'react';
import { Link } from 'react-router';
import TicketRedeemModal from './TicketRedeemModal';
import EventInfoContainer from './../../../components/shared/EventInfo';
import Sidebar from '../../../layouts/Sidebar';
import QtyCounter from '../../Event/components/QtyCounter';
import Loading from '../../../components/shared/Loading.js';

import './EventManager.scss';

class EventManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redeemTicketModalOpen: false,
      ticketQty: 0
    };
  }

  componentDidMount() {
    this.props.getEventInfo(this.props.params.id);
    this.props.getEventTickets(this.props.params.id);
    this.props.getEventAuxInfo(this.props.params.id);
  }

  openTicketRedeemModal() {
    this.setState({redeemTicketModalOpen: true });
  }

  render() {
    if (!this.props.unsoldTickets) {
      return (
        <Loading />
      );
    }
    if (!this.props.event.name) {
      return (
        <Loading />
      );
    }
    return (
      <div className='sidebar-page-container'>
        <Sidebar openTicketRedeemModal={() => this.openTicketRedeemModal()} event={this.props.event} />
        <div className='event-manager-container'>
          {/* <EventInfoContainer event={this.props.event} /> */}
          {/* <div className='event-bottom-info'> */}
            {this.props.children}
          </div>
          <TicketRedeemModal
            event={this.props.event}
            closeModal={() => this.setState({ redeemTicketModalOpen: false })}
            isOpen={this.state.redeemTicketModalOpen}
            redeemTicket={this.props.redeemTicket} />
        </div>
    );
  }
}

export default EventManager;
