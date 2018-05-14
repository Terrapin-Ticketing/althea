import React, { Component } from 'react';
import PayoutModal from '../PayoutModal';
import moment from 'moment'

import Price from 'components/shared/Price'

class PayoutEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openPayoutModal(payout) {
    this.props.openPayoutModal(payout);
  }

  render() {
    const { payout, index } = this.props;
    console.log('payout: ', payout);
    return (
      <tr key={index}>
        <td>
          {moment(payout.date).format('M/D/YY h:mm a')}
        </td>
        <td>
          <Price price={payout.price} />
        </td>
        <td>
          {payout.ticketId.type}
        </td>
        <td>
          {payout.buyerId.email}
        </td>
        <td>
          {(payout.isPaid) ? 'Paid' : 'Not Paid'}
        </td>
        <td>
          <button onClick={() => this.props.openPayoutModal(payout)} className="waves-effect waves-light btn terrapin-green">View</button>
        </td>
        <PayoutModal
          payout={this.props.payout}
          isOpen={this.props.payoutModalOpen} />
      </tr>
    );
  }
}

export default PayoutEntry;
