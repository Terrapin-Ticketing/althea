import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../../components/shared/Loading';
import TicketEntry from 'components/shared/TicketEntry';

import './Tickets.scss';

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.renderTickets = this.renderTickets.bind(this);
  }

  async componentDidMount() {
    let { event } = this.props;
    await this.props.getTickets(event._id);
    document.title = `Tickets - ${this.props.event.name} Event Manager - Terrapin Ticketing`;
  }

  renderTickets(tickets) {
    return (
      <table className='highlight responsive-table'>
        <thead><tr>
          <th>Date</th>
          <th>Type</th>
          <th>Barcode</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr></thead>
        <tbody>
            {tickets.slice(0).reverse().map((ticket, index) => <TicketEntry ticket={ticket} key={index} />)}
        </tbody>
      </table>
    );
  }

  render() {
    let { tickets } = this.props;
    console.log('render tickets: ', tickets);
    if (!tickets.length) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <div className='tickets-header'>
          <h2>Tickets</h2>
          <div className='spacing'></div>
          <div className='order-container'>
            <h3>({tickets.length})</h3>
          </div>
        </div>
        <div className='event-bottom-info'>
          {this.renderTickets(tickets)}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  ...require('./reducer')
};

const mapStateToProps = (state) => {
  return {
    event: state.eventManager.currentEvent,
    tickets: state.tickets.tickets,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
