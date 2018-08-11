import React, { Component } from 'react';
import './SetPassword.scss';
import { browserHistory } from 'react-router';
import classNames from 'classnames';

class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      setPasswordError: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  async componentDidMount() {
    let isValidToken = await this.props.isValidToken(this.props.params.token);
    // console.log('isValidToken', isValidToken);
    if (!isValidToken) browserHistory.push('/my-profile');
    document.title = 'Set Password - Terrapin Ticketing';
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.setPassword(this.state.password);
  }

  async setPassword(password) {
    await this.props.setPassword(this.props.params.token, password);
    // console.log('password was set');
    browserHistory.push('/my-profile');
  }

  render() {
    return (
      <div className='container login-container' style={{display: 'flex', flexDirection: 'column'}}>
        <img
          onClick={() => browserHistory.push('/events')}
          style={{margin: '0 auto', width: '75%', padding: 25, cursor: 'pointer'}}
          src={require('../../../layouts/assets/img/tt-logo-text-bottom-grn.svg')} />
          <div className="card login-card">
            <div className="card-content">
              <div className="card-title">Almost there...</div>
              <div className="card-subtitle">We created an account to manage your tickets. Please create a password to access your account.</div>
              <form className='col s12 login-form' onSubmit={this.handleSubmit}>
                <div className="input-field col s6">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" value={this.state.password} onChange={(e) => {
                    this.setState({password: e.target.value});
                  }} />
                </div>
                <div className="submit-row">
                  <span className='error'>{(this.state.setPasswordError) ? this.state.setPasswordError : null}</span>
                  <button type="submit" className="btn-large terrapin-green center-align" onClick={this.handleSubmit}>
                    View Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default SetPassword;
