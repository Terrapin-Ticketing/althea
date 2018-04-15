import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../../components/shared/Loading';
import Price from '../../../components/shared/Price';

import './Transfers.scss';

class Transfers extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.renderTransfers = this.renderTransfers.bind(this);
  }

  async componentDidMount() {
    let { event } = this.props;
    await this.props.getTransfers(event._id);
    document.title = `Transfers - ${this.props.event.name} Event Manager - Terrapin Ticketing`;
  }

  renderTransfers(transfers) {
    return (
      <table className='highlight responsive-table'>
        <thead><tr>
          <th>Date</th>
          <th>Ticket Type</th>
          <th>Recipient</th>
          <th>Sender</th>
          <th>Actions</th>
        </tr></thead>
        <tbody>
            {transfers.map((transaction) => {
              return (
                <tr>
                  <td>
                    {transaction.date}
                  </td>
                  <td>
                    {transaction.ticketType}
                  </td>
                  <td>
                    {transaction.recipient}
                  </td>
                  <td>
                    {transaction.sender}
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
    let { event, transfers} = this.props;
    if (!transfers.length) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <div className='transfers-header'>
          <h2>Transfers</h2>
          <div className='spacing'></div>
          <div className='order-container'>
            <button className="waves-effect waves-light btn terrapin-green">Filter</button>
          </div>
        </div>
        <div className='event-bottom-info'>
          {this.renderTransfers(transfers)}
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
    transfers: state.transfers.transfers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);
