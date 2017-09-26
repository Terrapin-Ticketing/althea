import React, { Component } from 'react';
import './Login.scss';
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.login(this.state.email, this.state.password)
    .then(() => {
      console.log('no err');
      browserHistory.push('/events');
    })
    .catch((err) => { // email already taken
      console.log(err);
      this.setState({loginError: 'You entered the wrong login information. Please try again.'});
      // this.setState({loginError: err.message});
    });
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
          <span className='error'>{(this.state.loginError) ? this.state.loginError : null}</span>
          <span className='user'>{(this.props.user) ? this.props.user : null}</span>
          <button onClick={this.handleSubmit}>Login</button>
      </div>
    )
  }
}

export default Login
