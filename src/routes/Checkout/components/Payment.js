// CheckoutForm.js
import React from 'react';
import ETHPayment from './paymentTypes/ETHPayment';
import USDPayment from './paymentTypes/USDPayment';

import Price from '../../../components/shared/Price';

class Payment extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTickets() {
    let { order, event } = this.props;
    return (
      <tr key={event.id} className="order-details-rows">
        <td>{event.id.substring(0, 8)}...</td>
        <td>{order.ticketQty}</td>
        <td className="price"><Price price={event.price} /></td>
      </tr>
    );
  }

  render() {
    let { event, order, onPaymentTypeChange, buyTicketsWithStripe,
      paymentType } = this.props;

    return (
      <div className="payment-details">
        <h2>Payment Details</h2>
        <ETHPayment
          isActive={paymentType === 'ETH'}
          onClick={() => onPaymentTypeChange('ETH')}
        />
        <USDPayment
          event={event}
          order={order}
          buyTicketsWithStripe={buyTicketsWithStripe}
          isActive={paymentType === 'USD'}
          onClick={() => onPaymentTypeChange('USD')}
        />
      </div>
    );
  }
}

export default Payment;
