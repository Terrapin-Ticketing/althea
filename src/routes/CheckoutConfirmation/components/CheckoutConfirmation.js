import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Order from '../../Checkout/components/Order';

import './CheckoutConfirmation.scss';

class CheckoutConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  renderTransactions(transactions) {
    return transactions.map((transaction, index) => {
      return <div key={index}>Ticket {index+1}: <Link to={`https://etherscan.io/tx/${transaction.transactionHash}`}>{transaction.transactionHash}</Link></div>;
    });
  }

  calculateTotal(fees) {
    let { event, order } = this.props;
    return (event.price * order.ticketQty) + fees;
  }

  render() {
    console.log('confirm.props: ', this.props);
    let { transactions, order, event, user } = this.props;
    let { email, walletAddress } = user;
    let cardFee = 5;
    let serviceFee = 4;
    let total = cardFee + serviceFee;
    return (
      <div className='checkout-confirmation-container'>
        <h1 className='header'>Purchase Receipt</h1>
        <div className="user-info">
          <h2>Your Details</h2>
          <div>Wallet: {(walletAddress).substring(0, 8)}...</div>
          <div>Email: {email}</div>

          <h2>Tickets</h2>
          {this.renderTransactions(transactions)} <br />
        </div>
        <div className="receipt">
          <Order
            serviceFee={serviceFee}
            cardFee={cardFee}
            total={this.calculateTotal(total)}
            order={order}
            event={event}
            user={this.props.user}
          />
        </div>
        <button onClick={() => browserHistory.push('user')}>Manage Your Tickets</button>




      </div>
    );
  }
}

export default CheckoutConfirmation;
