import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Logo from './Logo'
import Navigation from './Navigation'

const HeaderWrapper = styled.header`
  background-color: #fff;
  color: #149739;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  z-index: 3;
`

const HeaderContainer = styled.div`
  @media (min-width: 48em) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

class Header extends Component {
  render() {
    let activePage = this.props.location.pathname.split('/')
    let renderHeader = activePage.includes('import') || activePage.includes('set-password')
    return (!renderHeader) && (
      <HeaderWrapper>
        <HeaderContainer>
          <Logo href='https://TerrapinTicketing.com' src={require('assets/tt-logo-horizontal-green-transparent.svg')} />
          <Navigation user={this.props.user} logout={this.props.logout} />
        </HeaderContainer>
      </HeaderWrapper>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  location: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return function logout(dispatch) {
    return dispatch({
      type: 'LOGOUT'
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
