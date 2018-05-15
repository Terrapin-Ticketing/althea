import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../../components/shared/Loading';
import TransferEntry from 'components/shared/TransferEntry'

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
          <th>Ticket ID</th>
          <th>Ticket Type</th>
          <th>Barcode</th>
          <th>Recipient</th>
          <th>Sender</th>
        </tr></thead>
        <tbody>
            {transfers.slice(0).reverse().map((transfer, index) => <TransferEntry transfer={transfer} key={index} />)}
        </tbody>
      </table>
    );
  }

  render() {
    let { transfers } = this.props;
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
            <h3>({transfers.length})</h3>
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
