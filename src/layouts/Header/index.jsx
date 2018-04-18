import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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
    let { user } = this.props
    let activePage = this.props.location.pathname.split('/')
    let renderHeader = activePage.includes('activate') || activePage.includes('set-password')
    return (!renderHeader) && (
      <HeaderWrapper>
        <HeaderContainer>
          <Logo href='https://TerrapinTicketing.com' src={require('./tt-logo-horizontal-green-transparent.png')} />
          <Navigation user={user} />
        </HeaderContainer>
      </HeaderWrapper>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object
}

export default Header
