import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from 'components/blocks'
import { H2 } from 'components/elements'
import ResetPasswordForm from 'components/forms/ResetPassword'

const ResetPassword = ({ token, afterResetPassword }) =>
  <Wrapper centered fullScreen flexColumn flexBox textCenter>
    <Wrapper className='col-md-5'>
      <H2 center>Reset Password</H2>
      <Wrapper borderFull borderRadius boxShadow paddingFull marginFull>
        <ResetPasswordForm token={token} afterResetPassword={afterResetPassword} />
      </Wrapper>
    </Wrapper>
  </Wrapper>

ResetPassword.propTypes = {
  token: PropTypes.string.isRequired,
  afterResetPassword: PropTypes.func.isRequired
}

export default ResetPassword
