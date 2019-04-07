import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { Wrapper } from 'components/blocks'
import { Text, Button } from 'components/elements'
import SignupForm from 'components/forms/Signup'
import LoginForm from 'components/forms/Login'

import { white } from 'styles/colors'
import { spacing13 } from 'styles/spacing'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 'login'
    }
  }

  render() {
    const { nextStep, step, user, logout } = this.props;
    return (
      <Wrapper style={{ width: spacing13 }}>
        {(!user) && <Text gray600 fontSize6 fontWeight400 center>{(this.state.step === 'login') ? 'Log in to Terrapin' : 'Sign up for Terrapin'}</Text>}
        <Wrapper fullWidth borderFull borderRadius boxShadow padding5x5 margin5x0 style={{ background: white }}>
          {(this.state.step === 'signup' && !user) && <SignupForm event={event} afterSignup={() => nextStep(step+1)} />}
          {(this.state.step === 'login' && !user) && <LoginForm event={event} afterLogin={() => nextStep(step+1)} />}
          {(user) && (
            <Wrapper flexBox flexColumn textCenter>
              <Wrapper>
                <Text gray400 fontSize3 center style={{ marginBottom: '-20px' }}>Signed in as</Text><br />
                <Text gray600 fontSize6 fontWeight600 center>{user.email}</Text>
              </Wrapper>
              <Button style={{ marginTop: 15 }} padding4x5 primaryGreen action={() => nextStep(step + 1)}>
                <Text fontSize5 white>Continue</Text>
              </Button>
            </Wrapper>
          )}
        </Wrapper>
        <Wrapper centered>
          {this.state.step === 'login' && !user && <Wrapper><Text base500 fontSize2 fontWeight200 width100><Link to='/forgot-password'>Forgot Password?</Link></Text></Wrapper>}
          {this.state.step === 'login' && !user && <Wrapper><Text gray500>Don't have an account? <Text base500 style={{ cursor: 'pointer' }} onClick={() => this.setState({ step: 'signup' })}>Sign Up.</Text></Text></Wrapper>}
          {this.state.step === 'signup' && !user && <Wrapper><Text gray500>Already have an account? <Text base500 style={{ cursor: 'pointer' }} onClick={() => this.setState({ step: 'login' })}>Login</Text></Text></Wrapper>}
          {user && <Wrapper><Text gray500>Want to sign into a different account? <Text base500 style={{ cursor: 'pointer' }} onClick={logout}>Logout</Text></Text></Wrapper>}
        </Wrapper>
      </Wrapper>
    )
  }
}

SignIn.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func,
  step: PropTypes.number,
  user: PropTypes.object,
  logout: PropTypes.func
}


export default SignIn
