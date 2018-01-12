// USDPayment.js
import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import {CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements';
import { browserHistory } from 'react-router';
import classames from 'classnames';

import './Payment.scss';

class USDPayment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      error: null
    };
  }

  handleSubmit = (user) => {
    return async(ev) => {
      // We don't want to let default form submission happen here, which would refresh the page.
      ev.preventDefault();
      if ((user && user._id) === this.props.order[0].ownerId) return;

      let email = (user && user.email) || this.state.email;

      // Within the context of `Elements`, this call to createToken knows which Element to
      // tokenize, since there's only one in this group.
      // get name of user
      let { token } = await this.props.stripe.createToken({ type: 'card', email });
      let { buyTicketsStripe, order } = this.props;
      try {
        // let transactionsList = await buyTicketsStripe(JSON.stringify(token), ticket);
        await buyTicketsStripe(token, order[0]._id);
        if (this.props.error) return this.setState({ activateError: this.props.error });
      } catch (err) {
        this.setState({error: err});
      }
    };
  }

  renderError() {
    if (this.state.error) return (<div className='dank'>{this.state.error}</div>);
  }

  render() {
    let { classname, user, isLoading, order } = this.props;
    let isOwnerAndIsForSale = (!this.props.order[0].isForSale || (user && user._id === order[0].ownerId));
    return (
      <form onSubmit={this.handleSubmit(user).bind(this)} className={`checkout-form ${classname}`}>
          <div className="col s12">
            {/* <label htmlFor="email">Email</label> */}
            <input id="email" placeholder="Email" type="text" style={{borderBottom: '1px solid rgba(0,0,0,.12)'}} value={this.state.email || ''} onChange={(e) => {
              this.setState({email: e.target.value});
            }} />
          </div>
          <div className="input-field payment-field col s12">
            <CardNumberElement style={{base: {fontSize: '18px', background: '1px solid #149739'}}} />
          </div>
          <div className="input-field col s12 m6">
            <CardExpiryElement style={{base: {fontSize: '18px'}}} />
          </div>
          <div className="input-field col s12 m6">
            <CardCVCElement style={{base: {fontSize: '18px'}}} />
          </div>
        <div className='error'>
          {this.renderError()}
        </div>
        { isLoading ? (
          <div className="spinner-container">
            <div className="preloader-wrapper small active">
              <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        ): (<div className="center-align">
          <button
            disabled={isOwnerAndIsForSale}
            className={classames('wave-effect waves-light btn btn-large terrapin-green', { disabled: isLoading })}
            type="submit">
            { isOwnerAndIsForSale ? 'Ticket owned by you' : 'Buy Ticket' }
          </button>
        </div>)}
      </form>
    );
  }
}

export default injectStripe(USDPayment);
