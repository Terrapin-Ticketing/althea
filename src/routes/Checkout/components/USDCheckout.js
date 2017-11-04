// CheckoutForm.js
import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import {Elements, CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements';
import { browserHistory } from 'react-router';

class CheckoutForm extends React.Component {
  handleSubmit = async ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    let token = await this.props.stripe.createToken({name: 'Jenny Rosen'});

    let { buyTicketsStripe, order } = this.props;
    let transactionsList = await buyTicketsStripe(JSON.stringify(token), order);
    console.log('transactionsList: ', transactionsList);
    // TODO: Don't push to user, send to confirmation page
    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    let { classname } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className={`checkout-form ${classname}`}>
        <label>
          Card details
          <CardNumberElement style={{base: {fontSize: '18px'}}} />
          <CardExpiryElement style={{base: {fontSize: '18px'}}} />
          <CardCVCElement style={{base: {fontSize: '18px'}}} />
        </label>
        <button type="submit">Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
