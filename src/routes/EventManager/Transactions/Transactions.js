import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../../components/shared/Loading';
import Price from '../../../components/shared/Price';

import './Transactions.scss';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.renderTransactions = this.renderTransactions.bind(this);
  }

  async componentDidMount() {
    let { event } = this.props;
    await this.props.getTransactions(event._id);
    document.title = `Transactions - ${this.props.event.name} Event Manager - Terrapin Ticketing`;
  }

  renderTransactions(transactions) {
    return (
      <table className='highlight responsive-table'>
        <thead><tr>
          <th>Date</th>
          <th>Ticket Type</th>
          <th>Price</th>
          <th>Customer</th>
          <th>Actions</th>
        </tr></thead>
        <tbody>
            {transactions.map((transaction) => {
              return (
                <tr>
                  <td>
                    {transaction.date}
                  </td>
                  <td>
                    {transaction.ticketType}
                  </td>
                  <td>
                    <Price price={transaction.price} />
                  </td>
                  <td>
                    {transaction.recipient}
                  </td>
                  <td>
                    <button className="waves-effect waves-light btn terrapin-green">View</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }

  render() {
    let { event, transactions} = this.props;
    if (!transactions.length) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <div className='transactions-header'>
          <h2>Transactions</h2>
          <div className='spacing'></div>
          <div className='order-container'>
            <button className="waves-effect waves-light btn terrapin-green">Filter</button>
          </div>
        </div>
        <div className='event-bottom-info'>
          {this.renderTransactions(transactions)}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  ...require('./reducer')
};

const mapStateToProps = (state) => {
  return {
    event: state.eventManager.currentEvent,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
