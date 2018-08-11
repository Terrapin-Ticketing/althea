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
      email: props.user && props.user.email || null,
      error: null
    };
  }

  handleSubmit = (user) => {
    return async(ev) => {
      this.setState({ error: null });
      // We don't want to let default form submission happen here, which would refresh the page.
      ev.preventDefault();
      if ((user && user._id) === this.props.order[0].ownerId) return;

      let email = (user && user.email) || this.state.email;
      let firstName = (user && user.firstName) || this.state.firstName;
      let lastName = (user && user.lastName) || this.state.lastName;

      try {
        // validate email
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
          throw 'Invalid email address';
        }
        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        let { token, error } = await this.props.stripe.createToken({ type: 'card', email, firstName, lastName});
        let transferToUser = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email
        };
        if (error) throw error.message;
        let { buyTicketsStripe, order } = this.props;
        await buyTicketsStripe(token, order[0]._id, transferToUser);
        if (this.props.error) return this.setState({ error: this.props.error });
      } catch (err) {
        console.log('catches error: ', err);
        this.setState({error: err});
      }
    };
  }

  renderError() {
    if (this.state.error || this.props.error) {
      return (<span style={{
        backgroundColor: '#f2dede', borderColor: '#ebcccc', color: '#a94442', padding: '.75rem 1.25rem', marginBottom: '1rem', border: '1px solid transparent', borderRadius: '.25rem'}}>{this.state.error || this.props.error}</span>);
    }
  }

  render() {
    let { classname, user, isLoading, order, error } = this.props;
    let isOwnerAndIsForSale = (!this.props.order[0].isForSale || (user && user._id === order[0].ownerId));
    return (
      <form onSubmit={this.handleSubmit(user).bind(this)} className={`checkout-form ${classname}`}>
          <div className="input-field col s6">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" className="validate" value={this.state.firstName} style={{borderBottom: '1px solid rgba(0,0,0,.12)'}}
              onChange={(e) => {
                this.setState({firstName: e.target.value});
              }} />
          </div>
          <div className="input-field col s6">
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" className="validate" value={this.state.lastName} style={{borderBottom: '1px solid rgba(0,0,0,.12)'}}
              onChange={(e) => {
                this.setState({lastName: e.target.value});
              }} />
          </div>
          <div className="input-field col s12">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" style={{borderBottom: '1px solid rgba(0,0,0,.12)'}} value={this.state.email || ''}
              readOnly={!!this.props.user}
              onChange={(e) => {
                this.setState({email: e.target.value});
              }
            } />
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
