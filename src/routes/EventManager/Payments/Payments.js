import React, { Component } from 'react';
import { connect } from 'react-redux';
import PayoutEntry from 'components/shared/PayoutEntry'
import Loading from 'components/shared/Loading';

import './Payments.scss';

class Payments extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let { event } = this.props;
    await this.props.getPayments(event._id);
    document.title = `Payments - ${this.props.event.name} Event Manager - Terrapin Ticketing`;
  }



  render() {
    let { payments} = this.props;
    if (!payments.length) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <div className='payments-header'>
          <h2>Payments</h2>
          <div className='spacing'></div>
          <div className='order-container'>
            <h3>({payments.length})</h3>
          </div>
        </div>
        <div className='event-bottom-info'>
          <table className='highlight responsive-table'>
            <thead><tr>
              <th>Date</th>
              <th>Price</th>
              <th>Ticket Type</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr></thead>
            <tbody>
                {payments.slice(0).reverse().map((payment, index) => {
                  return (
                    <PayoutEntry payout={payment} key={index} />
                  );
                })}
            </tbody>
          </table>
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
    payments: state.payments.payments,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
