import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from 'components/blocks'
import { Text, H4, H1 } from 'components/elements'
import SignupForm from 'components/forms/Signup'
import LoginForm from 'components/forms/Login'

class BarcodeSuccess extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 'signup'
    }
  }

  render() {
    const { nextStep, step } = this.props;
    return (
      <Wrapper textCenter style={{ width: '100%' }}>
        <Wrapper marginTop>
          <H4 subtle>Activate Ticket</H4>
          {(this.state.step === 'signup') && <H1>Create an account</H1>}
          {(this.state.step === 'login') && <H1>Log in</H1>}
        </Wrapper>
        <Wrapper paddingFull flexColumn>
          {(this.state.step === 'signup') && <SignupForm event={event} afterSignup={() => nextStep(step+1)} />}
          {(this.state.step === 'login') && <LoginForm event={event} afterLogin={() => nextStep(step+1)} />}
        </Wrapper>
        <Wrapper fontMed>
        {(this.state.step === 'signup') ? (<Text grey>Already have an account?</Text>) : (<Text grey>Don't have an account?</Text>)} <br />
        {(this.state.step === 'signup') ? (<Text cursorPointer grey onClick={() => this.setState({ step: 'login' })}>Click here to login.</Text> )
          : (<Text cursorPointer grey onClick={() => this.setState({ step: 'signup' })}>Click here to sign up.</Text>)}
        </Wrapper>
      </Wrapper>
    )
  }
}

BarcodeSuccess.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func,
  step: PropTypes.number
}


export default BarcodeSuccess
