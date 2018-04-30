import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import LoginComponent from './Component'

class LoginContainer extends Component {
  componentDidMount() { document.title = 'Login - Terrapin Ticketing' }

  afterLogin() {
    browserHistory.push('events')
  }

  render() { return <LoginComponent afterLogin={this.afterLogin} /> }
}

export default LoginContainer
