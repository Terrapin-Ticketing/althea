// CheckoutForm.js
import React from 'react';
import Price from '../Price';

import './Order.scss';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  async componentDidMount() {

  }

  renderTickets() {
    let { order, event } = this.props;
    return (
      <tr key={event._id} className="order-details-rows">
        <td className="name-column">
          { event.name } <br />
          <i>{(order._id) ? `${order._id.substring(0, 8)}...` : order.ticketQty}</i></td>
        <td>{order.ticketQty}</td>
        <td className="price"><Price price={event.price} /></td>
      </tr>
    );
  }

  render() {
    let { serviceFee, cardFee, total } = this.props;

    return (
        <div className="order-details col s12 l6">
          <h2>Order Details</h2>
          <div className="order-box">
            <table className="order-table bordered">
              <thead>
                <tr className="order-details-header">
                  <th className="name-column">Event</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                { this.renderTickets() }
                <tr className="service-fee"><td className="name-column">Service Fee</td><td></td><td><Price price={serviceFee} /></td></tr>
                <tr className="card-fee"><td className="name-column">Credit Card Processing</td><td></td><td><Price price={cardFee} /></td></tr>
                <tr className="total"><td className="name-column">Total:</td><td></td><td><Price price={total} /></td></tr>
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

export default Order;
