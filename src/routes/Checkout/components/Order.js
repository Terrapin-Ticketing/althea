// CheckoutForm.js
import React from 'react';
import classNames from 'classnames';
import { Elements } from 'react-stripe-elements';
import USDCheckout from './USDCheckout';

import Price from '../../../components/shared/Price';

class Order extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTickets() {
    let { order, event } = this.props;
    return (
      <tr key={event.id} className="order-details-rows">
        <td>{event.id.substring(0, 8)}...</td>
        <td><Price price={event.price} /></td>
        <td>{order.ticketQty}</td>
      </tr>
    );
  }

  render() {
    let { serviceFee, cardFee, total, event, order, etherPrice, user,
      onPaymentTypeChange, buyTicketsWithEther, buyTicketsWithStripe,
      paymentType
    } = this.props;

    return (
      <div className="section-container">
        <span className="section-header">Order</span>

        <h3 className="event-name">{event.name}</h3>

        <div className="payment-toggle">
          Payment Method:
          <button className={classNames(
            { active: paymentType === 'USD' && 'active' }
          )} onClick={() => onPaymentTypeChange('USD')}>USD</button>
          <button className={classNames(
            { active: paymentType === 'ETH' && 'active' }
          )} onClick={() => onPaymentTypeChange('ETH')}>ETH</button>
        </div>

        <table className="order-details">
          <tbody>
            <th className="order-details-header">
              <td>Event</td>
              <td>Price</td>
              <td>Quantity</td>
            </th>
            { this.renderTickets() }
          </tbody>
        </table>

        <div className="fee-details">
          <div className="service-fee">Service Fee: <Price price={serviceFee}/></div>
          <div className="card-fee">Credit Card Processing Fee: <Price price={cardFee}/></div>
        </div>
        <br/>
        <div className="total"><b>Total: <Price price={total}/></b></div>
        <br/>

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

export default Order;
