import React, { Component } from 'react'

import SignupComponent from './Component'

class SignupContainer extends Component {
  componentDidMount() { document.title = 'Signup - Terrapin Ticketing' }

  render() { return <SignupComponent /> }
}

export default SignupContainer
