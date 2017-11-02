import React, { Component } from 'react';
import web3 from 'web3';
import classNames from 'classnames';

import CheckoutForm from './CheckoutForm';

import Price from '../../../components/shared/Price';
import './Checkout.scss';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      serviceFee: 1,
      cardFee: 150,
    };
    this.renderOrder = this.renderOrder.bind(this);
    this.renderServiceFee = this.renderServiceFee.bind(this);
    this.renderCardFee = this.renderCardFee.bind(this);
    this.renderTotal = this.renderTotal.bind(this);
  }

  async componentDidMount() {
    let { serviceFee, cardFee } = this.state;
    this.setState({ total: this.calculateTotal(serviceFee + cardFee)});
  }

  async buyTicket() {
    let { cardNumber, cardDate, cardCvc, name } = this.state;
    console.log(cardNumber, cardDate, cardCvc, name);
  }

  renderOrder() {
    let { order, event } = this.props;
    return (
      <div className="orderRow">
        <div className="left-column">
          <span>
            {event.name} <br />
            General Admission x {order.ticketQty}
          </span>
        </div>
        <div className="right-column">
          <Price price={event.price} />
        </div>
      </div>
    );
  }

  renderServiceFee() {
    return <Price price={this.state.serviceFee} />;
  }

  renderCardFee() {
    return <Price price={this.state.cardFee} />;
  }

  renderTotal() {
    return <Price price={this.state.total} />;
  }

  calculateTotal(fees) {
    let { event, order } = this.props;
    return (event.price * order.ticketQty) + fees;
  }

  onPaymentTypeChange(paymentType) {
    if (paymentType === 'USD') {
      this.setState({
        serviceFee: 1,
        cardFee: 150,
        total: this.calculateTotal(1 + 150)
      });
    } else if (paymentType === 'ETH') {
      this.setState({
        serviceFee: 0,
        cardFee: 1,
        total: this.calculateTotal(0 + 1)
      });
    }
  }

  render() {
    let { order, event, buyTicketsStripe } = this.props;
    let { name, price, date, time, venue, imageUrl } = event;

    // let { isLoading } = this.states
    return (
      <div className='checkout-container'>
        <div className='event-top-info'>
          <div className='event-image-container'>
            <img src={imageUrl} className='event-image' />
          </div>
          <div className='left-column'>
            <h1>{name}</h1>
            <h4>{date}</h4>
            <h4><Price price={price} /></h4>
          </div>
          <div className='right-column'>
            <div className='venue-info'>
              {venue.name} <br />
              {venue.address} <br />
              {venue.city}, {venue.state} {venue.zip}
            </div>
            <div className='time'>
              {time}
            </div>
          </div>
        </div>
        <div className='event-bottom-info'>
          <div className="left-column">
            <h1>Order</h1>
            <div className="order-table">
              <div className="header">
                <span className="ticket">Ticket</span>
                <span className="price">Price</span>
              </div>
              <div className="body">
                {this.renderOrder()}
              </div>
            </div>
            <div className="fee-details">
              <div className="service-fee">Service Fee: {this.renderServiceFee()}</div>
              <div className="card-fee">Credit Card Processing Fee: {this.renderCardFee()}</div>
              <div className="total">Total: {this.renderTotal()}</div>
            </div>
          </div>

          <CheckoutForm
            total={this.state.total}
            event={event}
            order={order}
            paymentType={order.paymentType}
            buyTicketsStripe={buyTicketsStripe}
            onPaymentTypeChange={this.onPaymentTypeChange.bind(this)}
            user={this.props.user}
            getEtherPrice={this.props.getEtherPrice}
            buyTicketsWithEther={this.props.buyTicketsWithEther}
          />

          {/* <Elements>
            <CheckoutForm
              buyTicketStripe={this.props.buyTicketStripe}
              event={this.props.event} />
          </Elements> */}
            {/* <div className="right-column">
              <h1>Checkout</h1>
              <span className='user'>Signed in as {(this.props.user) ? this.props.user.email : null}</span>
              <label className='label'>
                <span>Name:</span>
                <input type="text" value={this.state.name} onChange={(e) => {
                  this.setState({name: e.target.value});
                }} />
              </label>
              <label className='label'>
                <span>Credit Card Number:</span>
                <input type="text" value={this.state.cardNumber} onChange={(e) => {
                  this.setState({cardNumber: e.target.value});
                }} />
              </label>
              <label className='label'>
                <span>Expiration Date:</span>
                <input type="text" value={this.state.cardDate} onChange={(e) => {
                  this.setState({cardDate: e.target.value});
                }} />
              </label>
              <label className='label'>
                <span>CVC:</span>
                <input type="text" value={this.state.cardCvc} onChange={(e) => {
                  this.setState({cardCvc: e.target.value});
                }} />
              </label>
              <span className='error'>{(this.props.checkoutError) ? this.props.checkoutError : null}</span>

              <button
                className={classNames('purchase-ticket', {isLoading: isLoading, notLoading: !isLoading })}
                onClick={() => {
                  this.buyTicket(this.props.event);
                }}>
                { (isLoading) ? <img src={require('../../../layouts/assets/img/spinner.svg')} /> : 'Checkout'}
              </button>
            </div> */}
        </div>
      </div>
    );
  }
}

export default Checkout;
