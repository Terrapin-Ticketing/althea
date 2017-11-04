// CheckoutForm.js
import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import {Elements, CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements';
import { browserHistory } from 'react-router';

class CheckoutForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  handleSubmit = async(ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    let token = await this.props.stripe.createToken({name: 'Jenny Rosen'});

    let { buyTicketsStripe, order } = this.props;
    try {
      let transactionsList = await buyTicketsStripe(JSON.stringify(token), order);
      browserHistory.push('/CheckoutConfirmation');
    } catch(err) {
      this.setState({error: err});
    }
    // TODO: Don't push to user, send to confirmation page
    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  renderError() {
    if (this.state.error) return (<div className='dank'>{this.state.error}</div>);
  }

  render() {
    return (
      <div className="right-column">
        <form onSubmit={this.handleSubmit} className="checkout-form">
          {/* <AddressSection /> */}
          <label>
            Card details
            <CardNumberElement style={{base: {fontSize: '18px'}}} />
            <CardExpiryElement style={{base: {fontSize: '18px'}}} />
            <CardCVCElement style={{base: {fontSize: '18px'}}} />
          </label>
          {/* <label>
            Card details
            <AddressElement style={{base: {fontSize: '18px'}}} />
          </label> */}
          <div className='error'>
            {this.renderError()}
          </div>
          <button type="submit">Confirm order</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
