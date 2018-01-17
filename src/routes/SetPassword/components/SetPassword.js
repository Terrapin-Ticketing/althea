import React, { Component } from 'react';
import './SetPassword.scss';
import { browserHistory } from 'react-router';
import classNames from 'classnames'

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

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({setPasswordError: 'Passwords don\'t match'});
    } else {
      await this.setPassword(this.state.password);
    }
  }

  async setPassword(password) {
    await this.props.setPassword(this.props.params.token, password);
    browserHistory.push('/my-profile');
  }

  render() {
    return (
      <div className='container login-container'>
        <div className="card login-card">
          <div className="card-content">
            <div className="card-title">Set Password</div>
            <div className="card-subtitle">Please enter a password to view your ticket.</div>
            <form className='col s12 login-form' onSubmit={this.handleSubmit}>
              <div className="input-field col s6">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={this.state.password} onChange={(e) => {
                  this.setState({password: e.target.value});
                }} />
              </div>
              <div className="input-field col s6">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" value={this.state.confirmPassword} onChange={(e) => {
                  this.setState({confirmPassword: e.target.value});
                }} />
              </div>
              <div className="submit-row">
                <span className='error'>{(this.state.setPasswordError) ? this.state.setPasswordError : null}</span>
                {/* <span className='user'>{(this.props.user) ? JSON.stringify(this.props.user) : ''}</span> */}
                <button type="submit" className="btn-large terrapin-green center-align" onClick={this.handleSubmit}>
                  Submit
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
