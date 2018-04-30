import React from 'react'
import { Link } from 'react-router'

import { Wrapper } from 'components/blocks'
import { H2 } from 'components/elements'
import LoginForm from 'components/forms/Login'

const SignupComponent = () =>
  <Wrapper centered fullScreen>
    <Wrapper className='col-md-5'>
      <H2 center>Log in to Terrapin</H2>
      <Wrapper borderFull borderRadius boxShadow paddingFull marginFull>
        <LoginForm />
      </Wrapper>
      <Wrapper centered>
        <Link to='/signup'><small>Don't have an account yet? Click here to sign up.</small></Link>
      </Wrapper>
    </Wrapper>
  </Wrapper>

export default SignupComponent
