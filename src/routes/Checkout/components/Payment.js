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
        <td>{event.id.substring(0, 8)}...</td>
        <td>{order.ticketQty}</td>
        <td className="price"><Price price={event.price} /></td>
      </tr>
    );
  }

  render() {
    let { total, event, order, etherPrice, user,
      onPaymentTypeChange, buyTicketsWithEther, buyTicketsWithStripe,
      paymentType
    } = this.props;

    return (
      <div className="payment-details">
        <h2>Payment Details</h2>
        <div className="payment-toggle">
          <button className={classNames(
            { active: paymentType === 'USD' && 'active' },
            { inactive: paymentType !== 'USD' && 'inactive' }
          )} onClick={() => onPaymentTypeChange('USD')}>USD</button>
          <button className={classNames(
            { active: paymentType === 'ETH' && 'active' },
            { inactive: paymentType !== 'ETH' && 'inactive' }
          )} onClick={() => onPaymentTypeChange('ETH')}>ETH</button>
        </div>
        <div className="payment-method">
          { paymentType === 'USD' ? (
            <Elements>
              <USDCheckout
                buyTicketsStripe={buyTicketsWithStripe}
                event={event}
                order={order}
                classname="payment-info" />
            </Elements>
          ) : (
            <div className="payment-info">
              <span>{ user.email }</span>
              <span>{ (user.walletAddress).substring(0, 8) }...</span>
              <p>Hitting "Confirm" will charge {(total / etherPrice).toString().substring(0, 8)} ETH from your account.</p>
              <button type="submit" onClick={buyTicketsWithEther}>Confirm order</button>
            </div>
          ) }
        </div>
      </div>
    );
  }
}

export default Payment;
