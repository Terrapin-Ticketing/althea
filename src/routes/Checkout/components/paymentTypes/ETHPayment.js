// CheckoutForm.js
import React from 'react';
// import Price from '../../../components/shared/Price';
import classNames from 'classnames';

class ETHPayment extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSelectionButton() {
    let { onClick, isActive } = this.props;
    return (
      <button className={classNames(
      { active: isActive },
      { inactive: !isActive }
    )} onClick={onClick}>ETH</button>
    );
  }

  render() {
    let { isActive } = this.props;

    return (
      <div className="">
        <div className="payment-toggle">
          {this.renderSelectionButton()}
        </div>
        { isActive &&
          <div className="payment-method">
            <div className="payment-info">

              here
              {/* <span>{ user.email }</span> */}
              {/* <span>{ (user.walletAddress).substring(0, 8) }...</span> */}
              {/* <p>Hitting "Confirm" will charge {(total / etherPrice).toString().substring(0, 8)} ETH from your account.</p> */}
              {/* <button type="submit" onClick={buyTicketsWithEther}>Confirm order</button> */}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ETHPayment;

export class Fees extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { ticketPrice, qty } = this.props;
    // let totalTicketPrice = ticketPrice * qty;
    // let cardFee = (totalTicketPrice * .029) + 30;
    return (
      <div className="">
        this is where ether breakdown would go
        {/* <tr className="service-fee">Service Fee <span><Price price={1} /></span></tr>
        <tr className="card-fee">Credit Card Processing <span><Price price={cardFee} /></span></tr>
        <tr className="total">Total: <span><Price price={totalTicketPrice + cardFee} /></span></tr> */}
      </div>
    );
  }
}
