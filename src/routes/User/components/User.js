import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import ReactModal from 'react-modal';
import './User.scss';
import Price from '../../../components/shared/Price';
import TicketTransferModal from '../../Ticket/components/TicketTransferModal';
import TicketRow from './TicketRow';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      qty: null, // TODO: Force to int
      price: null, // TODO: Force to int
      events: [],
      selectedTicket: null,
      transferTicketModalOpen: false,
      viewTicketModalOpen: false,
      redeemTicketModalOpen: false,
      selectedEvent: null
    };
    this.toggleForSale = this.toggleForSale.bind(this);
  }

  componentDidMount() {
    this.props.getUserEvents();
    this.props.getUserTickets();
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

  componentWillUnmount() {
    this.setState({ dataLoaded: false });
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
    this.props.toggleForSale(ticket, index);
  }

  renderTickets(tickets) {
    if (tickets) {
      return (
        this.props.tickets.map((ticket, index) => {
          return <TicketRow key={index} ticket={ticket} toggleForSale={() => this.toggleForSale(ticket, index)} />
        })
      );
    } else {
      null;
    }
  }

  renderEvents() {
    if (this.props.events) {
      return (
        this.props.events.map((event, index) => {
          return (
              <tr className={`event-row ${(index%2 === 0) ? 'odd' : null}`} key={event._id}>
                <td>{event.name}</td>
                <td className="qty"><Price price={event.price}/></td>
                <td>{event.qty}</td>
                <td className="actions">
                  <button><Link to={`/event/${event._id}/manage/preview`}>Manage Event</Link></button></td>
              </tr>
          );
        })
      );
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.user) return null;
    const { email } = this.props.user;
    return (
      <div className="route-container container">
        <div className='card col s12'>
          <div className="card-content">
            <h2>{email}</h2>
            <div className="profile-info">
              <div className="profile-left">
              </div>
              <div className="profile-right">
                {/* Nothing here...   */}
              </div>
            </div>
          </div>
        </div>
        <div className="card col s12">
          <div className="card-content">
            {(this.props.location.query.ticketId) ? (
              <div className="terrapin-green lighten-1 scale-transition scale-in card-panel" style={{color: '155724' }}>
                Purchase Successful (
                  <Link to={`/event/${this.props.location.query.eventId}/ticket/${this.props.location.query.ticketId}`} >
                   View Ticket
                </Link>)
              </div>
            ): null }
            <h2>Tickets</h2>
            <table className="highlight responsive-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th className="qty">Price</th>
                  <td>Status</td>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.renderTickets(this.props.tickets)}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="card col s12">
          <div className="card-content">
            <h2>Events</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.renderEvents()}
              </tbody>
            </table>
          </div>
        </div> */}

        <TicketTransferModal
          ticket={this.state.selectedTicket}
          closeModal={() => this.setState({transferTicketModalOpen: false, selectedTicket: null })}
          isOpen={this.state.transferTicketModalOpen}
          transferTicket={this.props.transferTicket} />


      </div>
    );
  }
}

export default User;
