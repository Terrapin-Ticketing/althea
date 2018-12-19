import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { Wrapper } from 'components/blocks'
import { Text } from 'components/elements'
import SignupForm from 'components/forms/Signup'

const SignupComponent = ({ afterSignup }) =>
  <Wrapper centered fullScreen flexColumn flexBox textCenter>
    <Wrapper style={{ width: 384 }}>
      <Text gray600 fontSize6 fontWeight600 center>Sign up for Terrapin</Text>
      <Wrapper borderFull borderRadius boxShadow padding5x5 margin5x0>
        <SignupForm afterSignup={afterSignup} />
      </Wrapper>
      <Wrapper centered>
      <Text gray500>Already have an account? <Link to='/login'>Login</Link></Text>
      </Wrapper>
    </Wrapper>
  </Wrapper>

SignupComponent.propTypes = {
  afterSignup: PropTypes.func.isRequired
}

export default SignupComponent
