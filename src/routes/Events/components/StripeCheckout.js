import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
  onToken = async (token) => {
    let { buyTicketStripe, event } = this.props;
    await buyTicketStripe(JSON.stringify(token), event.id);
    // fetch('/save-stripe-token', {
    //   method: 'POST',
    //   body: JSON.stringify(token),
    // }).then(response => {
    //   response.json().then(data => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
  }

  render() {
    let { user } = this.props;

    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey={STRIPE_PUBLIC_KEY}
        email={user.email}
      >
        <button className="btn btn-primary">
          Buy Ticket
        </button>
      </StripeCheckout>
    );
  }
}
