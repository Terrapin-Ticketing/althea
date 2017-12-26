import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from './Order';
import Payment from './Payment';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      serviceFee: 1,
      cardFee: (props.event.price * .30),
      paymentType: 'USD',
      etherPrice: 0
    };
  }

  async componentDidMount() {
    let { serviceFee, cardFee } = this.state;
    this.setState({ total: this.calculateTotal(serviceFee + cardFee)});
  }

  calculateTotal(fees) {
    let { event, order } = this.props;
    return (event.price * order.ticketQty) + fees;
  }

  render() {
    let { order, user, buyTicketsWithStripe, isLoading } = this.props;

    return (
      <div className="row card checkout-information">
        <Order order={order} />

        <Payment
          order={order}
          user={user}
          buyTicketsWithStripe={buyTicketsWithStripe}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.event.currentEvent,
    order: state.event.order,
    user: state.auth.user,
    redirectUrl: state.location.redirectUrl
  };
};

// const modules = require('../../../routes/Checkout/modules/checkout');
//
// let mapDispatchToProps = {
//   ...modules,
// };

export default connect(mapStateToProps, {})(Checkout);
// export default connect(mapStateToProps, mapDispatchToProps)(EventManager);

// export default Checkout;
