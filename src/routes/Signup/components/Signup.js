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
      signupError: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (this.state.password === this.state.confirmPassword) {
      this.props.signup(this.state.email, this.state.password)
      .then(() => {
        browserHistory.push('/events');
      })
      .catch((err) => { // email already taken
        this.setState({signupError: 'That email is already in use. Please try again.'})
      });
    } else {
      this.setState({signupError: 'Your passwords don\'t match! Please try again.'})
    }
  }


  render() {
    return (
      <div className='login-container' >
          <label className='label'>
            <span>Email:</span>
            <input type="text" value={this.state.email} onChange={(e) => {
              this.setState({email: e.target.value});
            }} />
          </label>
          <label className='label'>
            <span>Password:</span>
            <input type="text" value={this.state.password} onChange={(e) => {
              this.setState({password: e.target.value})
            }} />
          </label>
          <label className='label'>
            <span>Confirm Password:</span>
            <input type="text" value={this.state.confirmPassword} onChange={(e) => {
              this.setState({confirmPassword: e.target.value})
            }} />
          </label>
          <span className='error'>{
            (this.state.signupError) ? this.state.signupError :
            (this.props.signupError) ? this.props.signupError : null}
          </span>
          <button onClick={this.handleSubmit}>Signup</button>
      </div>
    )
  }
}

export default Signup
