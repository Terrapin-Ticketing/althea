import React, { Component } from 'react';
import { browserHistory } from 'react-router';

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
      cardFee: (props.event.price * .30),
      paymentType: 'USD',
      etherPrice: 0
    };
  }

  async componentDidMount() {
    let { serviceFee, cardFee } = this.state;
    this.setState({ total: this.calculateTotal(serviceFee + cardFee)});

    let etherPrice = await this.props.getEtherPrice();
    this.setState({ etherPrice });
  }

  calculateTotal(fees) {
    let { event, order } = this.props;
    return (event.price * order.ticketQty) + fees;
  }

  onPaymentTypeChange(paymentType) {
    let { event, order } = this.props;
    if (paymentType === 'USD') {
      let cardFee = (event.price * .029) + 30;
      this.setState({
        serviceFee: 1,
        cardFee,
        total: this.calculateTotal(1 + cardFee),
        paymentType,
      });
    } else if (paymentType === 'ETH') {
      this.setState({
        serviceFee: 0,
        cardFee: 15 * order.ticketQty,
        total: this.calculateTotal(0 + 1),
        paymentType,
      });
    }
  }

  async registerUser() {
    let { signup } = this.props;
    let { userData } = this.state;
    if (userData) await signup(userData.email, userData.password);
    // user is defined after this point
    console.log(this.props.user);
  }

  async buyTicketsWithStripe(token, order) {
    await this.registerUser();
    let { buyTicketsStripe } = this.props;
    await buyTicketsStripe(token, order);
  }

  async buyTicketsWithEther() {
    await this.registerUser();
    let { buyTicketsWithEther, order, user } = this.props;
    if (!user.privateKey) return browserHistory.push('/unlock-account');
    let transactionsList = await buyTicketsWithEther(order);
    console.log('transactionsList: ', transactionsList);
    browserHistory.push('/CheckoutConfirmation');
  }

  async onRegister(userData) {
    this.setState({ userData });
  }

  render() {
    let { serviceFee, cardFee, total, etherPrice, paymentType } = this.state;
    let { order, event, user } = this.props;

    return (
      <div className='checkout-container'>
        <EventInfo event={event} />

        { user ? (<span></span>) : (<Register onRegister={this.onRegister.bind(this)} />) }

        {/* <OrderSummary /> */}

        {/* <PaymentMethod /> */}

        <Order
          serviceFee={serviceFee}
          cardFee={cardFee}
          total={total}
          order={order}
          event={event}
          etherPrice={etherPrice}
          user={user}
          paymentType={paymentType}
          onPaymentTypeChange={this.onPaymentTypeChange.bind(this)}
          buyTicketsWithEther={this.buyTicketsWithEther.bind(this)}
          buyTicketsWithStripe={this.buyTicketsWithStripe.bind(this)}
        />

      </div>
    );
  }
}

export default Checkout;
