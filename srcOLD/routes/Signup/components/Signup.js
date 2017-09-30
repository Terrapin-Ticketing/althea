import React, { Component } from 'react'
import './Signup.scss'
import { browserHistory } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      privateKey: '',
      signupError: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let { password, confirmPassword, email, privateKey } = this.state;
    e.preventDefault();
    if (password === confirmPassword) {
      this.props.signup(email, password, privateKey)
      .then(() => {
        browserHistory.push('/user');
      })
      .catch((err) => { // email already taken
        this.setState({signupError: 'That email is already in use. Please try again.'});
      });
    } else {
      this.setState({signupError: 'Your passwords don\'t match! Please try again.'});
    }
  }


  render() {
    return (
      <form className='login-container' onSubmit={this.handleSubmit}>
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
          <label className='label'>
            <span>Confirm Password:</span>
            <input type="text" value={this.state.confirmPassword} onChange={(e) => {
              this.setState({confirmPassword: e.target.value});
            }} />
          </label>
          <label className='label'>
            <span>Private Key (optional):</span>
            <input type="text" value={this.state.privateKey} onChange={(e) => {
              this.setState({privateKey: e.target.value});
            }} />
          </label>
          <span className='error'>{
            (this.state.signupError) ? this.state.signupError :
            (this.props.signupError) ? this.props.signupError : null}
          </span>
          <button type="submit">Signup</button>
      </form>
    );
  }
}

export default Signup;
