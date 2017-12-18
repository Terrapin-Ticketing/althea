import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CheckoutComponent from '../../../components/shared/Checkout/Checkout';
import Register from './Register';

import EventInfo from '../../../components/shared/EventInfo/EventInfo';
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

  async registerUser() {
    let { signup } = this.props;
    let { userData } = this.state;
    if (userData) await signup(userData.email, userData.password);
    // user is defined after this point
    console.log(this.props.user);
  }

  async buyTicketsWithStripe(token, order) {
    await this.registerUser();
    await this.props.buyTicketsStripe(token, order);
  }

  async onRegister(userData) {
    this.setState({ userData });
  }

  render() {
    let { serviceFee, cardFee, total } = this.state;
    let { order, event, user } = this.props;

    return (
      <div className='container'>
        <EventInfo event={event} />

        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName="SlideIn"
        >

          { user ? (<span></span>) : (<Register onRegister={this.onRegister.bind(this)} />) }

          <CheckoutComponent
            serviceFee={serviceFee}
            cardFee={cardFee}
            total={total}
            order={order}
            event={event}
            user={user}
            buyTicketsWithStripe={this.buyTicketsWithStripe.bind(this)}
          />

        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Checkout;
