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

  async buyTickets() {
    let { cardNumber, cardDate, cardCvc, name } = this.state;
    console.log(cardNumber, cardDate, cardCvc, name);
  }

  calculateTotal(fees) {
    let { event, order } = this.props;
    return (event.price * order.ticketQty) + fees;
  }

  onPaymentTypeChange(paymentType) {
    let { event } = this.props;
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
        cardFee: 1,
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
  }

  async buyTicketsWithStripe(token, order) {
    await this.registerUser();
    let { buyTicketsStripe } = this.props;
    console.log('herer');
    await buyTicketsStripe(token, order);
  }

  async buyTicketsWithEther() {
    await this.registerUser();
    let { buyTicketsWithEther, order, user } = this.props;
    if (!user.privateKey) return browserHistory.push('/unlock-account');
    let transactionsList = await buyTicketsWithEther(order);
    console.log('transactionsList: ', transactionsList);
    alert('successfully bought ticket');
    browserHistory.push('/user');
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

          {/* <div className="payment-toggle">
            <button className={classNames(
              { active: paymentType === 'USD' && 'active' }
            )} onClick={this.onPaymentTypeChange('USD')}>USD</button>
            <button className={classNames(
              { active: paymentType === 'ETH' && 'active' }
            )} onClick={this.onPaymentTypeChange('ETH')}>ETH</button>
          </div>

          { paymentType === 'USD' ? (
            <Elements>
              <USDCheckout
                buyTicketsStripe={this.buyTicketsWithStripe.bind(this)}
                event={event}
                order={order} />
            </Elements>
          ) : (
            <div className="user-info">
              <span>{ user.email }</span>
              <span>{ (user.walletAddress).substring(0, 8) }...</span>
              <p>Hitting "Confirm" will charge {(total / etherPrice).toString().substring(0, 8)} ETH from your account.</p>
              <button type="submit" onClick={this.buyTicketsWithEther.bind(this)}>Confirm order</button>
            </div>
          ) } */}

          {/* <CheckoutForm
            total={total}
            event={event}
            order={order}
            user={user}
            buyTickets={this.buyTickets}
            onPaymentTypeChange={this.onPaymentTypeChange.bind(this)}

            buyTicketsStripe={buyTicketsStripe}
            getEtherPrice={getEtherPrice}
            buyTicketsWithEther={buyTicketsWithEther}
          /> */}
      </div>
    );
  }
}

export default Checkout;
