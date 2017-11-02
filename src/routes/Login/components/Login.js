import React, { Component } from 'react';
import './Login.scss';
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      privateKey: '',
      loginError: null,
      loginType: 'login'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async handleSubmit(e) {
    (this.state.loginType === 'login') ? this.login(e) : this.register(e);
  }

  async login(e) {
    let { email, password } = this.state;
    let { redirectUrl } = this.props;
    e.preventDefault();
    try {
      await this.props.login(email, password);
      (redirectUrl) ? browserHistory.push(redirectUrl) : browserHistory.push('/events');
    } catch (e) {
      this.setState({loginError: 'You entered the wrong login information. Please try again.'});
    }
  }

  async register(e) {
    let { password, confirmPassword, email, privateKey } = this.state;
    let { redirectUrl } = this.props;
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await this.props.signup(email, password, privateKey);
        (redirectUrl) ? browserHistory.push(redirectUrl) : browserHistory.push('/events');
      } catch (err) { // email already taken
        this.setState({loginError: 'That email is already in use. Please try again.'});
      }
    } else {
      this.setState({loginError: 'Your passwords don\'t match! Please try again.'});
    }
  }


  render() {
    return (
      <div className='login-container'>
        <div className='login-form-container'>
          <div className='login-type-container'>
            <button
              className={(this.state.loginType === 'login') && 'active'}
              onClick={() => this.setState({ loginType: 'login' })}>
              Login
            </button>
            <button
              className={(this.state.loginType === 'register') && 'active'}
              onClick={() => this.setState({ loginType: 'register' })}>
              Register
            </button>
          </div>

          <form className='login-form' onSubmit={this.handleSubmit}>
            <label className='label'>
              <span>Email:</span>
              <input type="text" value={this.state.email} onChange={(e) => {
                this.setState({email: e.target.value});
              }} />
            </label>
            <label className='label'>
              <span>Password:</span>
              <input type="text" value={this.state.password} onChange={(e) => {
                this.setState({password: e.target.value});
              }} />
            </label>
            {(this.state.loginType === 'register') && (
              <label className='label'>
                <span>Confirm Password:</span>
                <input type="text" value={this.state.confirmPassword} onChange={(e) => {
                  this.setState({confirmPassword: e.target.value});
                }} />
              </label>
            )}
            {(this.state.loginType === 'register') && (
              <label className='label'>
                <span>Private Key (optional):</span>
                <input type="text" value={this.state.privateKey} onChange={(e) => {
                  this.setState({privateKey: e.target.value});
                }} />
              </label>
            )}
            <span className='error'>{(this.state.loginError) ? this.state.loginError : null}</span>
            {/* <span className='user'>{(this.props.user) ? JSON.stringify(this.props.user) : ''}</span> */}
            <button type="submit"
              onClick={this.handleSubmit}>{this.state.loginType.charAt(0).toUpperCase() + this.state.loginType.slice(1)}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
