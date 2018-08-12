import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

import ResetPassword from './Component'

const afterResetPassword = () => {
  browserHistory.push('/wallet');
}

class ResetPasswordContainer extends Component {
  componentDidMount() { document.title = 'Reset Password - Terrapin Ticketing' }

  render() { 
    const { params } = this.props;
    return <ResetPassword token={params.token} afterResetPassword={afterResetPassword} /> 
  }
}

ResetPasswordContainer.propTypes = {
  params: PropTypes.object
}

export default ResetPasswordContainer
