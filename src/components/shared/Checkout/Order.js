// CheckoutForm.js
import React from 'react';
import Price from '../Price';

import './Order.scss';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardFee: 100,
      total: undefined
    };
  }

  calculateTotal(serviceFee) {
    let { order } = this.props;
    let { cardFee } = this.state;
    let total = order.reduce((total, ticket) => total + ticket.price);
    return total.price + (cardFee + serviceFee);
  }

  calculateCardFee(fees) {
    let { order } = this.props;
    return (event.price * order.ticketQty) + fees;
  }

  renderTickets() {
    let { order } = this.props;
    return order.map((ticket, index) => {
      return (
        <tr key={index} className="order-details-rows">
          <td className="name-column">
            { ticket.event.name } <br />
            { ticket.type }
          </td>
          <td></td>
          <td className="price"><Price price={ticket.price} /></td>
        </tr>
      );
    });
  }

  render() {
    let { order, serviceFee } = this.props;
    let totalTicketPrice = order.reduce((total, ticket) => total + ticket.price).price;
    let totalBasePrice = parseInt(totalTicketPrice) + parseInt(serviceFee);
    let cardFee = (totalBasePrice * 0.029) + 50;
    return (
        <div className="order-details card-content col s12 l6">
          <h2>Order Details</h2>
          <div className="order-box">
            <table className="order-table bordered">
              <thead>
                <tr className="order-details-header">
                  <th className="name-column">Event</th>
                  {/* <th>Quantity</th> */}
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.map((ticket, index) => {
                  return (
                    <tr key={index} className="order-details-rows">
                      <td className="name-column">
                        { ticket.event.name } <br />
                        { ticket.type }
                      </td>
                      {/* <td></td> */}
                      <td className="price"><Price price={ticket.price} /></td>
                    </tr>
                  )})}
                <tr className="service-fee"><td className="name-column">Service Fee</td><td><Price price={serviceFee} /></td></tr>
                <tr className="card-fee"><td className="name-column">Credit Card Processing</td><td><Price price={cardFee} /></td></tr>
                <tr className="total"><td className="name-column">Total:</td><td><Price price={totalBasePrice + cardFee} /></td></tr>
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

export default Order;
