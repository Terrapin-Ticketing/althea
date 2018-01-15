import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Price from '../../../components/shared/Price';
import TicketCard from './TicketCard';
import './User.scss';

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
    this.transferTicket = this.transferTicket.bind(this);
  }

  componentDidMount() {
    this.props.getUserEvents();
    this.props.getUserTickets();
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

  async transferTicket(ticketId, recipientEmail) {
    this.setState({ ticketTransfered: true, recipientEmail: recipientEmail });
    let transferedTicket = await this.props.transferTicket(ticketId, recipientEmail);
    await this.props.getUserTickets();
  }

  renderTickets(tickets) {
    if (tickets) {
      return (
        this.props.tickets.map((ticket, index) => {
          return <TicketCard
            key={index}
            user={this.props.user}
            ticket={ticket}
            transferTicket={this.transferTicket}
            sellTicket={this.props.sellTicket} />
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
        <div className="col s12">
          <div className="card-content">
            {(this.state.ticketTransfered) ? (
              <div className="terrapin-green lighten-1 scale-transition scale-in card-panel" style={{color: '155724' }}>
                Transfered ticket to {this.state.recipientEmail}
              </div>
            ): null }
            {(this.props.location.query.ticketId) ? (
              <div className="terrapin-green lighten-1 scale-transition scale-in card-panel" style={{color: '155724' }}>
                Purchase Successful (
                  <Link to={`/event/${this.props.location.query.eventId}/ticket/${this.props.location.query.ticketId}`} >
                   View Ticket
                </Link>)
              </div>
            ): null }
            <h2>Tickets</h2>
            <div className="row">
              {this.renderTickets(this.props.tickets)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
