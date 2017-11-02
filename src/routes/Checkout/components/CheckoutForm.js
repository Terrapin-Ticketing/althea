import React from 'react';
import { Elements } from 'react-stripe-elements';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

import USDCheckout from './USDCheckout';

export default class PaymentType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.paymentType
    };
  }

  componentDidMount() {
    this.props.getEtherPrice()
      .then((etherPrice) => {
        console.log('etherPrice', etherPrice);
        this.setState({ etherPrice });
      });
  }

  async buyTicketsWithEther() {
    await this.props.buyTicketsWithEther(this.props.order);
    alert('successfully bought ticket');
    browserHistory.push('/user');
  }

  renderForm(paymentType) {
    let { buyTicketStripe, event } = this.props;
    let { etherPrice } = this.state;

    switch (paymentType) {
      case 'ETH':
        return (
          <div className="user-info">
            <span>{ this.props.user.email }</span>
            <span>{ (this.props.user.walletAddress).substring(0, 8) }...</span>
            <p>Hitting "Confirm" will charge {etherPrice} from your account.</p>
            <button type="submit" onClick={this.buyTicketsWithEther.bind(this)}>Confirm order</button>
          </div>
        );
      default: // default is USD
        return (
          <Elements>
            <USDCheckout
              buyTicketStripe={buyTicketStripe}
              event={event} />
          </Elements>
        );
    }
  }

  activate(paymentType) {
    return () => {
      this.props.onPaymentTypeChange(paymentType);
      this.setState({ active: paymentType });
    };
  }

  render() {
    let { active } = this.state;
    return (
      <div className="right-column">
        <div className="payment-types">
          <button className={classNames(
            { active: active === 'USD' && 'active' }
          )} onClick={this.activate('USD')}>USD</button>
          <button className={classNames(
            { active: active === 'ETH' && 'active' }
          )} onClick={this.activate('ETH')}>ETH</button>
        </div>
        { this.renderForm(active) }
      </div>
    );
  }
}
