import React, { Component } from 'react';
import './ForgotPassword.scss';
import { browserHistory } from 'react-router';
import classNames from 'classnames'

class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isLoading: false,
      message: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      this.setState({ isLoading: true });
      await this.props.sendForgotPasswordEmail(this.state.email);
      this.setState({isLoading: false, message: 'A link to change your password has been sent to your email address', success: true});
    } catch (err) {
      this.setState({isLoading: false, message: err, success: false });
    }
  }

  render() {
    return (
      <div className='container login-container'>
        <div className="card login-card">
          <div className="card-content">
            <div className="card-title">Forgot Password</div>
            <form className='col s12 login-form' onSubmit={this.handleSubmit}>
              <div className="input-field col s6">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" value={this.state.email} onChange={(e) => {
                  this.setState({email: e.target.value});
                }} />
              </div>
              <div className="submit-row">
                <span className='error'>{(this.state.forgotPasswordError) ? this.state.forgotPasswordError : null}</span>
                {/* <span className='user'>{(this.props.user) ? JSON.stringify(this.props.user) : ''}</span> */}
                <button type="submit" className="btn-large terrapin-green center-align" onClick={this.handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
            {(this.state.message && this.state.success) ? (<div className="terrapin-green lighten-1 scale-transition scale-in card-panel" style={{color: '155724' }}>{this.state.message}</div>): null }
            {(this.state.message && !this.state.success) ? (<div className="terrapin-red lighten-1 scale-transition scale-in card-panel" style={{color: '94000c' }}>{this.state.message}</div>): null }
          </div>
        </div>
      </div>
    );
  }
}

export default SetPassword;