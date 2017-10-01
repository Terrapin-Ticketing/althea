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

  async handleSubmit(e) {
    e.preventDefault();
    try {
      await this.props.login(this.state.email, this.state.password);
      browserHistory.push('/events');
    } catch (e) {
      console.log('err:', e);
      this.setState({loginError: 'You entered the wrong login information. Please try again.'});
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
          <span className='error'>{(this.state.loginError) ? this.state.loginError : null}</span>
          {/* <span className='user'>{(this.props.user) ? JSON.stringify(this.props.user) : ''}</span> */}
          <button type="submit" onClick={this.handleSubmit}>Login</button>
      </form>
    );
  }
}

export default Login;
