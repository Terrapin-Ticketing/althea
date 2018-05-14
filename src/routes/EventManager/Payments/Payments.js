import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../../components/shared/Loading';
import Price from '../../../components/shared/Price';

import './Payments.scss';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.renderPayments = this.renderPayments.bind(this);
  }

  async componentDidMount() {
    let { event } = this.props;
    await this.props.getPayments(event._id);
    document.title = `Payments - ${this.props.event.name} Event Manager - Terrapin Ticketing`;
  }

  renderPayments(payments) {
    return (
      <table className='highlight responsive-table'>
        <thead><tr>
          <th>Date</th>
          <th>Status</th>
          <th>Price</th>
          <th>Ticket Type</th>
          <th>Customer</th>
          <th>Actions</th>
        </tr></thead>
        <tbody>
            {payments.map((payment, index) => {
              return (
                <tr key={index}>
                  <td>
                    {payment.date}
                  </td>
                  <td>
                    {payment.status}
                  </td>
                  <td>
                    <Price price={payment.price} />
                  </td>
                  <td>
                    {payment.ticketType}
                  </td>
                  <td>
                    {payment.recipient}
                  </td>
                  <td>
                    {(!payment.isPaid) && (<button onClick={() => this.props.togglePaid(payment._id)} className="waves-effect waves-light btn terrapin-green">Mark as Paid</button>)}
                    {(payment.isPaid) && (<button className="btn terrapin-green">Paid</button>)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
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
            <button className="waves-effect waves-light btn terrapin-green">Filter</button>
          </div>
        </div>
        <div className='event-bottom-info'>
          {this.renderPayments(payments)}
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
