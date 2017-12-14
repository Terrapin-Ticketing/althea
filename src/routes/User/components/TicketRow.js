import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import ReactModal from 'react-modal';
import './User.scss';
import Price from '../../../components/shared/Price';
import TicketTransferModal from '../../Ticket/components/TicketTransferModal';

class TicketRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isForSale: props.ticket.isForSale
    };
  }

  componentDidMount() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });

    $('.modal').modal({
      complete: function() { alert('Closed'); }
    });
  }

  async sellTicket(ticket) {
    await this.props.sellTicket(ticket);
  }

  openTicketTransferModal(ticket) {
    this.setState({transferTicketModalOpen: true, selectedTicket: ticket});
  }

  ticketClick(ticket) {
    return (e) => {
      browserHistory.push(`event/${ticket.eventId._id}/ticket/${ticket._id}`);
    };
  }

  toggleForSale(ticket, index) {
    this.setState({isForSale: !this.state.isForSale});
    this.props.toggleForSale(ticket, index);
  }

  render() {
    const { ticket, key } = this.props;
    return (
        <tr className={`ticket-row ${(key%2 === 0) ? 'odd' : null}`} key={ticket._id}>
            <td className="col s6">
              <span className="title">{ticket.eventId.name} <small className="super-small"><i>{ticket._id}</i></small></span> <br />
              <small className="caption">{ticket.eventId.venue.city}, {ticket.eventId.venue.state}</small>
            </td>
            <td> <div className="switch">
              <label>
              <input type="checkbox"
                checked={this.state.isForSale}
                onChange={() => this.toggleForSale(ticket, key)}
              /><span className="lever"></span>
              </label>
            </div></td>
            <td><Price price={ticket.price} /></td>
            <td>
              {/* <button name="action-button" className="btn terrapin-green" onClick={this.ticketClick(ticket).bind(this)}>Manage</button> */}
              <button className='dropdown-button btn' data-activates={`dropdown-${key}`}>Actions</button>

              <ul id={`dropdown-${key}`} className='dropdown-content'>
                <li onClick={this.ticketClick(ticket).bind(this)}><a href="#!"><i className="material-icons">event_seat</i>View Ticket</a></li>
                <li className="divider"></li>
                <li><a href="#!"><i className="material-icons">link</i>Permalink</a></li>
                <li onClick={() => this.setState({transferTicketModalOpen: true, selectedTicket: ticket})}><a href="#!"><i className="material-icons">email</i>Transfer via Email</a></li>
                <li><a href="#!"><i className="material-icons">attach_money</i>Mark as For Sale</a></li>
                <li className="divider"></li>
                <li><a href="#!"><i className="material-icons">event</i>View Event</a></li>
              </ul>
            </td>
        </tr>
    );
  }
}

export default TicketRow;
