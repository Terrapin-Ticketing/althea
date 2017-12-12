import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link, browserHistory } from 'react-router';
import ReactModal from 'react-modal';
import './User.scss';
import Price from '../../../components/shared/Price';
import TicketTransferModal from '../../Ticket/components/TicketTransferModal';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      qty: null, // TODO: Force to int
      price: null, // TODO: Force to int
      tickets: [],
      events: [],
      balance: null,
      selectedTicket: null,
      transferTicketModalOpen: false,
      viewTicketModalOpen: false,
      redeemTicketModalOpen: false,
      selectedEvent: null
    };
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
      browserHistory.push(`event/${ticket.event.id}/ticket/${ticket.id}`);
    };
  }
  
  toggleForSale(ticket) {
    this.props.toggleForSale(ticket);
  }

  renderTickets() {
    if (this.props.tickets) {
      return (
        this.props.tickets.map((ticket, index) => {

          return (
              <tr className={`ticket-row ${(index%2 === 0) ? 'odd' : null}`} key={ticket.id}>
                  <td className="col s6">
                    <span className="title">{ticket.event.name} <small className="super-small"><i>{ticket.id}</i></small></span> <br />
                    <small className="caption">{ticket.event.venue.city}, {ticket.event.venue.state}</small>
                  </td>
                  <td> <div className="switch">
                    <label>
                    <input type="checkbox"
                      checked={ticket.isForSale}
                      onChange={() => this.toggleForSale(ticket)}
                    /><span className="lever"></span>
                    </label>
                  </div></td>
                  <td><Price price={ticket.price} /></td>
                  <td>
                    {/* <button name="action-button" className="btn terrapin-green" onClick={this.ticketClick(ticket).bind(this)}>Manage</button> */}
                    <button className='dropdown-button btn' data-activates={`dropdown-${index}`}>Actions</button>

                    <ul id={`dropdown-${index}`} className='dropdown-content'>
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
              <tr className={`event-row ${(index%2 === 0) ? 'odd' : null}`} key={event.id}>
                <td>{event.name}</td>
                <td className="qty"><Price price={event.price}/></td>
                <td>{event.qty}</td>
                <td className="actions">
                  <button><Link to={`/event/${event.id}/manage/preview`}>Manage Event</Link></button></td>
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
    const { email, walletAddress, encryptedPrivateKey } = this.props.user;
    const { balance } = this.props;
    return (
      <div className="route-container container">
        <div className='card col s12'>
          <div className="card-content">
            <h1>{email}</h1>
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
            <h2>Tickets</h2>
            <table className="highlight responsive-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <td>For Sale</td>
                  <th className="qty">Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.renderTickets()}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card col s12">
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
        </div>

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
