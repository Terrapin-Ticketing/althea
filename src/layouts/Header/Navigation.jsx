import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { browserHistory } from 'react-router'

import NavItem from './NavItem'
import NavToggle, { NavIcon, MenuIcon } from './NavToggle'

const NavContainer = styled.div``
const Navigation = styled.ul`
  clear: both;
  max-height: 0;
  transition: max-height .2s ease-out;
  background: #ffffff;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media (min-width: 48em) {
    flex-direction: row;
    clear: none;
    float: right;
    max-height: none;
    background: #ffffff;
  }
`

const NavToggleCheckbox = styled.input.attrs({
  type: 'checkbox',
  id: 'menu-btn'
})`
  display: none;
  &:checked ~ ${Navigation} { max-height: 240px; }
  &:checked ~ ${MenuIcon} ${NavIcon} {
    background: transparent;
    &:before { transform: rotate(-45deg); top: 0px; }
    &:after { transform: rotate(45deg); top: 0px; }
  }
`

const NavigationMenu = ({ user, logout }) =>
  <NavContainer>
    <NavToggleCheckbox />
    <NavToggle />
    <Navigation>
      <NavItem href='/events' label='Events' />
      {(user) && <NavItem href='/wallet' label='Wallet' />}
      <NavItem href='help' label='Help' />
      {(!user) && <NavItem href='/login' label='Log In' />}
      {(!user) && <NavItem href='/signup' label='Sign Up' />}
      {(user) && <NavItem onClick={() => { logout(); browserHistory.push('/login');}} label='Logout' />}
    </Navigation>
  </NavContainer>

NavigationMenu.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func
}

export default NavigationMenu
