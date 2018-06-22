import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import SignupComponent from './Component'

class SignupContainer extends Component {
  componentDidMount() { document.title = 'Signup - Terrapin Ticketing' }

  afterSignup() {
    browserHistory.push('events')
  }

  render() { return <SignupComponent afterSignup={this.afterSignup} /> }
}

export default SignupContainer
