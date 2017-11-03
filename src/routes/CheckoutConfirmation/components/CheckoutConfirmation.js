import React, { Component } from 'react';

import './CheckoutConfirmation.scss';

class CheckoutConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  renderTransactions(transactions) {
    return transactions.map((transaction, index) => {
      console.log('transaction: ', transaction);
      return <div>transaction: transaction</div>;
    });
  }

  render() {
    let { transactions, email, paymentMethod } = this.props;
    return (
      <div className='checkout-confirmation-container'>
        transactions: {this.renderTransactions(transactions)} <br />
        email: {email} <br />
        paymentMethod: {paymentMethod}
      </div>
    );
  }
}

export default CheckoutConfirmation;
