import React, { Component } from 'react';

class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.updateInput = this.updateInput.bind(this);
    this.signup = this.signup.bind(this);
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  async signup() {
    let { email, password } = this.state;
    try {
      await this.props.signup(email, password);
      this.props.nextStep('ticket_number');
    } catch (e) {
      this.setState({error: 'There was an error creating your account. Please try again.'});
    }
  }

  render() {
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card">
          <div className="card-content">
            <h1 className="activate-header" style={{textAlign: 'center'}}>Add tickets to your wallet so you can...</h1>
            <div className="welcome-features">
              <div className="row valign-wrapper">
                <i className='material-icons medium'>account_balance_wallet</i>
                <h1 className="activate-header">Store Tickets</h1>
              </div>
              <div className="row valign-wrapper">
                <i className='material-icons medium'>attach_money</i>
                <h1 className="activate-header">Sell Tickets</h1>
              </div>
              <div className="row valign-wrapper">
                <i className='material-icons medium'>send</i>
                <h1 className="activate-header">Transfer Tickets</h1>
              </div>
            </div>
            {(this.props.user) ? (
              <div className="login-info">
                <h3 style={{color: '#093'}}>Welcome, <br />{this.props.user.email}</h3>
                <div className="info-text">
                  <small>Your original barcode will remain valid until your ticket is bought or transfered.</small>
                </div>
                <button className='btn-large terrapin-green col s12 m6' style={{margin: '0 auto'}} onClick={() => this.props.nextStep('ticket_number')}>Continue</button>
                <small style={{alignSelf: 'center', margin: 15}}><a style={{cursor: 'pointer'}} onClick={() => this.props.logout()}>Use another account</a></small>
              </div>
            ) : (
              <div className="login-info">
                <div className="info-text">
                  <small>Your original barcode will remain valid until your ticket is bought or transfered.</small>
                </div>
                <button className='btn-large terrapin-green'
                  style={{width: '50%', margin: '0 auto'}}
                  onClick={() => this.props.nextStep('sign_up')}>Sign Up</button>
                  <small style={{color: '#093', alignSelf: 'center', margin: 15}}>Already have an account? <a style={{cursor: 'pointer'}} onClick={() => this.props.nextStep('sign_in')} >Sign In</a></small>
                </div>
              )}
          </div>
        </div>
        <i className='material-icons' style={{color: '#093', cursor: 'pointer'}} onClick={() => this.props.nextStep('welcome')}>arrow_back</i>
      </div>
    );
  }
}

export default PasswordInput;
