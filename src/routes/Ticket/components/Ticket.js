import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Loading from '../../../components/shared/Loading';
import Price from '../../../components/shared/Price';
import EventInfo from '../../../components/shared/EventInfo/EventInfo';

import TicketTransferModal from '../../../components/shared/TicketTransferModal';
import TicketSellModal from '../../../components/shared/TicketSellModal';

import Order from '../../../components/shared/Checkout/Order';
import Payment from '../../../components/shared/Checkout/Payment';
import Register from '../../Checkout/components/Register';

import './Ticket.scss';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceFee: 1,
      cardFee: 2
    };
    this.openTicketTransferModal = this.openTicketTransferModal.bind(this);
  }

  componentDidMount() {
    let { serviceFee, cardFee } = this.state;
    this.props.getTicketInfo(this.props.params.ticketId);
    this.setState({ total: this.calculateTotal(serviceFee + cardFee)});
  }

  calculateTotal(fees) {
    let { event, order } = this.props;
    return (event.price * 1) + fees;
  }

  openTicketSellModal(ticket) {
    this.setState({sellTicketModalOpen: true, selectedTicket: ticket});
  }

  openTicketTransferModal(ticket) {
    this.setState({transferTicketModalOpen: true, selectedTicket: ticket});
  }

  toggleForSale() {
    this.props.toggleForSale(this.props.ticket);
  }

  isOwner() {
    let { user, ticket } = this.props;
    if (!user || user._id !== ticket.ownerId) return false;
    return true;
  }

  async onRegister(userData) {
    this.setState({ userData });
  }

  async buyTicketsWithStripe(token, order) {
    this.setState({ isLoading: true, error: null });

    let { buyTicketsStripe } = this.props;
    await buyTicketsStripe(token, order);
    let { error, redirect } = this.props;
    if (error) return this.setState({ error, isLoading: false });
    browserHistory.push(redirect);
  }

  render() {
    let { ticket, user, event } = this.props;
    if (!this.props.ticket._id) {
      return (
        <Loading />
      );
    }
    return (
      <div className='route-container container'>
        <div className="card sticky-action">
          <div className="card-image">
            {(ticket.isForSale) ? <div className="ribbon"><span>For Sale</span></div> : null }
            <img src={ticket.eventId.imageUrl} />
            {/* <span className="card-title">{ticket.eventId.name}</span> */}
            <a className="btn-floating halfway-fab waves-effect waves-light terrapin-green"><i className="material-icons">share</i></a>
          </div>
          { ticket.barcode && !ticket.isForSale && (
            <div className="barcode-container center" style={{display: 'block'}}>
              {/* CINCI TICKET CODE (needs to be abstracted) */}
              <img src={`https://terrapin.cincyregister.com/images/barcode.php?c=${ticket.barcode}&p=520a67c3&f=0&x=2&h=60&q=3&t=code128`} /> <br />
              <span>This is the barcode that will be scanned to get you into the event. (This is only visible to you)</span>
            </div>
          ) }
          <div className="card-content" style={{margin: 0, borderRadius: 0, boxShadow: 'none'}}>
            {/* <span className="card-title">Ticket Details</span> */}
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th className="hide-on-med-and-down">For Sale</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{borderBottom: 0}}>
                  <td>{ticket.eventId.date}</td>
                  <td>{ticket.type} <br />
                      <small className="caption"><i>{ticket._id}</i></small></td>
                  <td><Price price={ticket.price} /></td>
                  <td className="valign-wrapper hide-on-med-and-down"><div className="switch">
                    <label>
                    <input type="checkbox"
                      checked={ticket.isForSale}
                      onChange={() => this.toggleForSale()}
                    /><span className="lever"></span>
                    </label>
                  </div>
                </td>
                </tr>
              </tbody>
            </table>
          </div>
          {(this.isOwner()) ? (
            <div className="card-action">
              <Link className="btn-flat waves-effect" onClick={() => this.openTicketSellModal()}>Sell</Link>
              <Link style={{marginLeft: 15 }} className="btn-flat waves-effect" onClick={() => this.openTicketTransferModal()}>Transfer</Link>
              {/* <Link className="btn-flat waves-effect">History</Link> */}
            </div>
          ) : null}
        </div>

        { ticket.isForSale && (
          <div className="row card checkout-information">
            <Order order={[ticket]} />

            <Payment
              order={[ticket]}
              user={user}
              isLoading={this.state.isLoading}
              buyTicketsWithStripe={this.buyTicketsWithStripe.bind(this)}
            />
          </div>
        ) }

        { this.state.error ? (
          <div className="terrapin-red lighten-1 scale-transition scale-in card-panel" style={{color: '155724' }}>{this.state.error}</div>
        ) : null }

        {/* { this.props.error ? (
          <div className="terrapin-red lighten-1 scale-transition scale-in card-panel" style={{color: '155724' }}>{this.props.error}</div>
        ) : null } */}

        <div className="card">
          <div className="card-content">
            <span className="card-title">
              <h2>Venue Information</h2>
            </span>
              {ticket.eventId.venue.name} <br />
              {ticket.eventId.venue.address} <br />
              {ticket.eventId.venue.city}, {ticket.eventId.venue.state} {ticket.eventId.venue.zip}
          </div>
        </div>

        {(this.isOwner()) ? (
          <TicketTransferModal
            ticket={this.props.ticket}
            closeModal={() => this.setState({transferTicketModalOpen: false, selectedTicket: null })}
            isOpen={this.state.transferTicketModalOpen}
            transferTicket={this.props.transferTicket} />
          ) : null }
        {(this.isOwner()) ? (
          <TicketSellModal
            ticket={this.props.ticket}
            user={this.props.user}
            closeModal={() => this.setState({sellTicketModalOpen: false, selectedTicket: null })}
            isOpen={this.state.sellTicketModalOpen}
            sellTicket={this.props.sellTicket} />
          ) : null }
      </div>
    );
  }
}

export default Ticket;
