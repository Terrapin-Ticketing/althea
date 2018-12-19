import React, { Component } from 'react'

import DesignPaletteComponent from './Component'

class SignupContainer extends Component {
  componentDidMount() { document.title = 'Design Palette - Terrapin Ticketing' }

  render() { return <DesignPaletteComponent afterSignup={this.afterSignup} /> }
}

export default SignupContainer
