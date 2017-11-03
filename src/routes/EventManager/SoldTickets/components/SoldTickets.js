import React, { Component } from 'react';
import { Link } from 'react-router';
import Price from '../../../../components/shared/Price';

import './SoldTickets.scss';

class SoldTickets extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.renderTickets = this.renderTickets.bind(this);
    this.renderTicketTable = this.renderTicketTable.bind(this);
  }

  componentDidMount() {
  }

  renderTickets() {
    let { soldTickets } = this.props;
    return soldTickets.map((ticket, index) => {
      return (
        <div className='ticket-table-item'>
          <div className='item-field'>General Admission <br /></div>
          <div className='item-field address-item'><i>{ticket.id}</i></div>
          <div className='item-field'><Price price={ticket.price} /></div>
          <div className='item-field'><Link to={`/event/${this.props.params.id}/ticket/${ticket.id}`}>View Ticket</Link></div>
        </div>
      );
    });
  }

  renderTicketTable() {
    return (
      <div className='ticket-table'>
        <div className='ticket-table-header'>
          <div className='item-field'>Ticket Type</div>
          <div className='item-field address-item'>Address</div>
          <div className='item-field'>Price</div>
          <div className='item-field'>Actions</div>
        </div>
        <tbody>
          {this.renderTickets()}
        </tbody>
      </div>
    );
  }

  render() {
    console.log('this.props: ', this.props);
    return (
      <div className='event-container'>
        <h2>Sold Tickets</h2>
        {this.renderTicketTable()}
      </div>
    );
  }
}

export default SoldTickets;
