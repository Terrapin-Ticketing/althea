import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { Wrapper } from 'components/blocks'
import { Text } from 'components/elements'
import LoginForm from 'components/forms/Login'

const LoginComponent = ({ afterLogin }) =>
  <Wrapper centered fullScreen flexColumn flexBox textCenter>
    <Wrapper style={{ width: 384 }}>
      <Text gray600 fontSize6 fontWeight600 center>Log in to Terrapin</Text>
      <Wrapper fullWidth borderFull borderRadius boxShadow padding5x5 margin5x0>
        <LoginForm afterLogin={afterLogin} />
      </Wrapper>
      <Wrapper centered>
        <Text fontSize2 fontWeight200><Link to='/forgot-password'>Forgot Password?</Link></Text><br /> {/* eslint react/no-unescaped-entities: 0 max-len: 0 */}
        <Text gray500>Don't have an account? <Link to='/signup'>Sign Up.</Link></Text> {/* eslint react/no-unescaped-entities: 0 max-len: 0 */}
      </Wrapper>
    </Wrapper>
  </Wrapper>

LoginComponent.propTypes = {
  afterLogin: PropTypes.func.isRequired
}

export default LoginComponent
