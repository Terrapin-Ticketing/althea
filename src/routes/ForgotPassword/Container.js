import React, { Component } from 'react'

import LoginComponent from './Component'

class LoginContainer extends Component {
  componentDidMount() { document.title = 'Forgot Password - Terrapin Ticketing' }

  render() { return <LoginComponent afterLogin={this.afterLogin} /> }
}

export default LoginContainer
