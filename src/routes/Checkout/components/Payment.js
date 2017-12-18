// CheckoutForm.js
import React from 'react';
import classNames from 'classnames';
import { Elements } from 'react-stripe-elements';
import USDCheckout from './USDCheckout';

import Price from '../../../components/shared/Price';

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
    let { event, order, buyTicketsWithStripe } = this.props;

    return (
      <div className="payment-details col s12 l6">
        <h2>Payment Details</h2>
        <div className="payment-method">
          <Elements>
            <USDCheckout
              buyTicketsStripe={buyTicketsWithStripe}
              event={event}
              order={order}
              classname="payment-info" />
          </Elements>
        </div>
      </div>
    );
  }
}

export default Payment;
