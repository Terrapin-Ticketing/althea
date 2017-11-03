// CheckoutForm.js
import React from 'react';
import Price from '../../../components/shared/Price';

class Order extends React.Component {
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

  render() {
    let { serviceFee, cardFee, total } = this.props;
    return (
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
          <div className="service-fee">Service Fee: <Price price={serviceFee}/></div>
          <div className="card-fee">Credit Card Processing Fee: <Price price={cardFee}/></div>
          <div className="total">Total: <Price price={total}/></div>
        </div>
      </div>
    );
  }
}

export default Order;
