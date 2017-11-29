// CheckoutForm.js
import React from 'react';
import classNames from 'classnames';
import { Elements } from 'react-stripe-elements';
import USDCheckout from './USDCheckout';

import Price from '../../../components/shared/Price';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      etherPrice: null
    };
  }

  async componentDidMount() {
    let etherPrice = await this.props.priceToEther(this.props.total);
    this.setState({ etherPrice });
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
    let { serviceFee, cardFee, total, event, order, user,
      onPaymentTypeChange, buyTicketsWithEther, buyTicketsWithStripe,
      paymentType
    } = this.props;

    return (
      <div className="route-container checkout-container card">
        <div className="order-details">
          <h2>Order Details</h2>
          <div className="order-box">
            <table className="order-table">
              <tbody>
                <th className="order-details-header">
                  <td>Event</td>
                  <td>Quantity</td>
                  <td>Price</td>
                </th>
                { this.renderTickets() }
              </tbody>
            </table>

            <div className="fee-details">
              <div className="service-fee">Service Fee: <Price price={serviceFee}/></div>
              <div className="card-fee">Credit Card Processing Fee: <Price price={cardFee}/></div>
            </div>
            <div className="total"><b>Total: <Price price={total}/></b></div>
          </div>
        </div>
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
                Pay {this.state.etherPrice} to { user.walletAddress }
                {/* <span>{ user.email }</span>
                <span>{ (user.walletAddress).substring(0, 8) }...</span>
                <p>Hitting "Confirm" will charge {this.state.etherPrice} ETH from your account.</p> */}
                <button type="submit" onClick={buyTicketsWithEther}>Confirm order</button>
              </div>
            ) }
          </div>
        </div>
      </div>
    );
  }
}

export default Order;
