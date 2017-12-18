// CheckoutForm.js
import React from 'react';
import { Elements } from 'react-stripe-elements';
import USDPayment from './USDPayment';

import Price from '../Price';

import './Payment.scss';

class Payment extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTickets() {
    let { order, event } = this.props;
    return (
      <tr key={event.id} className="order-details-rows">
        <td>{event._id.substring(0, 8)}...</td>
        <td>{order.ticketQty}</td>
        <td className="price"><Price price={event.price} /></td>
      </tr>
    );
  }

  render() {
    let { event, order, buyTicketsWithStripe, user } = this.props;

    return (
      <div className="payment-details col s12 l6">
        <h2>Payment Details</h2>
        <div className="payment-method">
          <Elements>
            <USDPayment
              buyTicketsStripe={buyTicketsWithStripe}
              event={event}
              order={order}
              classname="payment-info"
              user={user} />
          </Elements>
        </div>
      </div>
    );
  }
}

export default Payment;
