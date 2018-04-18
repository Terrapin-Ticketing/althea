import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'

import './Login.scss'
import LoginForm from '../../../components/forms/LoginForm'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { }
    this.afterLogin = this.afterLogin.bind(this)
  }

  componentDidMount() {
    document.title = 'Login - Terrapin Ticketing'
  }

  afterLogin() {
    browserHistory.push('/my-profile')
  }

  render() {
    return (
      <div className='container login-container col-sm-12 col-md-6'>
        <div className='login-header'><h2>Log in to Terrapin</h2></div>
        <LoginForm afterLogin={this.afterLogin} />
        <div className='other-actions'>
          <Link to='/forgot-password'><small>Forgot Password?</small></Link>
          <Link to='/signup'><small>Sign Up</small></Link>
        </div>
      </div>
    )
  }
}

export default Login
