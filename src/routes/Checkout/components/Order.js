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
    console.log('this.props: ', this.props);
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

                <tr className="service-fee">Service Fee <span><Price price={serviceFee} /></span></tr>
                <tr className="card-fee">Credit Card Processing <span><Price price={cardFee} /></span></tr>
                <tr className="total">Total: <span><Price price={total} /></span></tr>
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

export default Order;
