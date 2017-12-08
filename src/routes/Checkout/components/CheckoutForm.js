import React from 'react';
import { Elements } from 'react-stripe-elements';

import USDCheckout from './USDCheckout';

export default class PaymentType extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let etherPrice = await this.props.getEtherPrice();
    this.setState({ etherPrice });
  }

  render() {
    let { order, buyTicketsStripe } = this.props;
    return (
      <Elements>
        <USDCheckout
          buyTicketsStripe={buyTicketsStripe}
          event={event}
          order={order} />
      </Elements>
    );
  }
}
