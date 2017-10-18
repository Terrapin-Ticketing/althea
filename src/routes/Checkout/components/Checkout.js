import React, { Component } from 'react';
import web3 from 'web3';
import classNames from 'classnames';
import './Checkout.scss';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  async onSubmit() {

  }

  renderOrder() {
    let { order, event } = this.props;
    return (
      <tr>
        <td>General Admission</td>
        <td>{order}</td>
        <td>{event.price}</td>
      </tr>
    );
  }

  render() {
    let { name, price, date, time, venue, imageUrl } = this.props.event;
    let { isLoading } = this.state;
    return (
      <div className='checkout-container'>
        <div className='event-top-info'>
          <div className='event-image-container'>
            <img src={imageUrl} className='event-image' />
          </div>
          <div className='left-column'>
            <h1>{name}</h1>
            <h4>{date}</h4>
            <h4>${price}</h4>
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
            <table>
              <th><td>Ticket Type</td><td>Qty</td></th>
              <tbody>
                {this.renderOrder()}
              </tbody>
            </table>
          </div>
          <div className="right-column">
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
              <input type="text" value={this.state.name} onChange={(e) => {
                this.setState({cardNumber: e.target.value});
              }} />
            </label>
            <label className='label'>
              <span>Expiration Date:</span>
              <input type="text" value={this.state.name} onChange={(e) => {
                this.setState({cardDate: e.target.value});
              }} />
            </label>
            <label className='label'>
              <span>CVC:</span>
              <input type="text" value={this.state.name} onChange={(e) => {
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
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
