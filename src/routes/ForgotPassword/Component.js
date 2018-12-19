import React from 'react'
import { Link } from 'react-router'

import { Wrapper } from 'components/blocks'
import { Text } from 'components/elements'
import ForgotPasswordForm from 'components/forms/ForgotPassword'

const ForgotPasswordComponent = () =>
  <Wrapper centered fullScreen flexColumn flexBox textCenter>
    <Wrapper style={{ width: 384 }}>
      <Text gray600 fontSize6 fontWeight600 center>Forgot Password</Text>
      <Wrapper fullWidth borderFull borderRadius boxShadow padding5x5 margin5x0>
        <ForgotPasswordForm />
      </Wrapper>
      <Text fontSize2><Link to='login'>Back to Login</Link></Text>
    </Wrapper>
  </Wrapper>

export default ForgotPasswordComponent
