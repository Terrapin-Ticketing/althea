import React from 'react'
import { Link } from 'react-router'

import { Wrapper } from 'components/blocks'
import { H2 } from 'components/elements'
import SignupForm from 'components/forms/Signup'

const SignupComponent = () =>
  <Wrapper centered fullScreen>
    <Wrapper className='col-md-5'>
      <H2 center>Sign up for Terrapin</H2>
      <Wrapper borderFull borderRadius boxShadow paddingFull marginFull>
        <SignupForm />
      </Wrapper>
      <Wrapper centered>
        <Link to='/login'><small>Already have an account? Click here to login.</small></Link>
      </Wrapper>
    </Wrapper>
  </Wrapper>

export default SignupComponent
