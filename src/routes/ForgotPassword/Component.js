import React from 'react'
import { Link } from 'react-router'

import { Wrapper } from 'components/blocks'
import { H2 } from 'components/elements'
import ForgotPasswordForm from 'components/forms/ForgotPassword'

const ForgotPasswordComponent = () =>
  <Wrapper centered fullScreen flexColumn flexBox textCenter>
    <Wrapper className='col-md-5'>
      <H2 center>Forgot Password</H2>
      <Wrapper borderFull borderRadius boxShadow paddingFull marginFull>
        <ForgotPasswordForm />
      </Wrapper>
        <Link to='login'>Back to Login</Link>
    </Wrapper>
  </Wrapper>

export default ForgotPasswordComponent
