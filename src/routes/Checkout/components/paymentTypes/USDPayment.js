// CheckoutForm.js
import React from 'react';
// import Price from '../../../components/shared/Price';
import { Elements } from 'react-stripe-elements';
import USDCheckout from './USDCheckout';

import classNames from 'classnames';

class USDPayment extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSelectionButton() {
    let { onClick, isActive } = this.props;
    return (
      <button className={classNames(
      { active: isActive },
      { inactive: !isActive }
    )} onClick={onClick}>USD</button>
    );
  }

  render() {
    let { isActive, event, order, buyTicketsWithStripe } = this.props;

    return (
      <div className="payment-toggle">
        <div className="payment-toggle">
          {this.renderSelectionButton()}
        </div>
        { isActive &&
          <div className="payment-method">
            <div className="payment-info">
              <Elements>
                <USDCheckout
                  buyTicketsStripe={buyTicketsWithStripe}
                  event={event}
                  order={order}
                  classname="payment-info" />
              </Elements>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default USDPayment;

export class Fees extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { ticketPrice, qty } = this.props;
    let totalTicketPrice = ticketPrice * qty;
    let cardFee = (totalTicketPrice * .029) + 30;
    return (
      <div className="">
        {/* <tr className="service-fee">Service Fee <span><Price price={1} /></span></tr> */}
        <tr className="card-fee">Credit Card Processing <span><Price price={cardFee} /></span></tr>
        <tr className="total">Total: <span><Price price={totalTicketPrice + cardFee} /></span></tr>
      </div>
    );
  }
}
