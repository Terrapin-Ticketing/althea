import React, { Component } from 'react';

import CheckoutForm from './CheckoutForm';
import Order from './Order';
import Register from './Register';

import EventInfo from '../../../components/shared/EventInfo';
import './Checkout.scss';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      serviceFee: 1,
      cardFee: 150,
    };
  }

  async componentDidMount() {
    let { serviceFee, cardFee } = this.state;
    this.setState({ total: this.calculateTotal(serviceFee + cardFee)});
  }

  calculateTotal(fees) {
    let { event, order } = this.props;
    return (event.price * order.ticketQty) + fees;
  }

  onPaymentTypeChange(paymentType) {
    if (paymentType === 'USD') {
      this.setState({
        serviceFee: 1,
        cardFee: 150,
        total: this.calculateTotal(1 + 150)
      });
    } else if (paymentType === 'ETH') {
      this.setState({
        serviceFee: 0,
        cardFee: 1,
        total: this.calculateTotal(0 + 1)
      });
    }
  }

  render() {
    let { serviceFee, cardFee, total } = this.state;
    let { order, event, buyTicketsStripe, user, getEtherPrice, buyTicketsWithEther, signup } = this.props;
    console.log('order', order);
    return (
      <div className='checkout-container'>
        <EventInfo event={event} />
        <Register signup={signup} />

        <div className='event-bottom-info'>
          <Order
            serviceFee={serviceFee}
            cardFee={cardFee}
            total={total}
            order={order}
            event={event}
          />

          <CheckoutForm
            total={total}
            event={event}
            order={order}
            user={user}
            buyTicketsStripe={buyTicketsStripe}
            onPaymentTypeChange={this.onPaymentTypeChange.bind(this)}
            getEtherPrice={getEtherPrice}
            buyTicketsWithEther={buyTicketsWithEther}
          />
        </div>
      </div>
    );
  }
}

export default Checkout;
