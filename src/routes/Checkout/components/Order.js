// CheckoutForm.js
import React from 'react';
import Price from '../../../components/shared/Price';

const FeeTypes = {
  'ETH': require('./paymentTypes/ETHPayment').Fees,
  'USD': require('./paymentTypes/USDPayment').Fees,
};

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      etherPrice: null
    };
  }

  async componentDidMount() {
    // let etherPrice = await this.props.priceToEther(this.props.total);
    // this.setState({ etherPrice });
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
    let { ticketPrice, qty, paymentType } = this.props;
    // let Fees = FeeTypes[paymentType];

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

                <Fees ticketPrice={ticketPrice} qty={qty} paymentType={paymentType} />

              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

export default Order;
