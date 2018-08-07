import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { Wrapper } from 'components/blocks'
import { H2 } from 'components/elements'
import LoginForm from 'components/forms/Login'

const LoginComponent = ({ afterLogin }) =>
  <Wrapper centered fullScreen flexColumn flexBox textCenter>
    <Wrapper className='col-md-5'>
      <H2 center>Log in to Terrapin</H2>
      <Wrapper borderFull borderRadius boxShadow paddingFull marginFull>
        <LoginForm afterLogin={afterLogin} />
      </Wrapper>
      <Wrapper centered>
        <Link to='/signup'><small>Don't have an account yet? Click here to sign up.</small></Link> {/* eslint react/no-unescaped-entities: 0 max-len: 0 */}
      </Wrapper>
    </Wrapper>
  </Wrapper>

LoginComponent.propTypes = {
  afterLogin: PropTypes.func.isRequired
}

export default LoginComponent
