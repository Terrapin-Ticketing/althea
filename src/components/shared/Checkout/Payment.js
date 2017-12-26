// CheckoutForm.js
import React from 'react';
import { Elements } from 'react-stripe-elements';
import USDPayment from './USDPayment';

import Price from '../Price';

import './Payment.scss';

class Payment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { order, buyTicketsWithStripe, user, isLoading } = this.props;

    return (
      <div className="payment-details col s12 l6">
        <h2>Payment Information</h2>
        <div className="payment-method">
          <Elements>
            <USDPayment
              buyTicketsStripe={buyTicketsWithStripe}
              order={order}
              isLoading={isLoading}
              classname="payment-info"
              user={user} />
          </Elements>
        </div>
      </div>
    );
  }
}

export default Payment;
