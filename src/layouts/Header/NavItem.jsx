import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import styled from 'styled-components'

const NavItemContainer = styled.li`
  cursor: pointer;
  float: left;
  padding: 20px 30px;
`

const NavItem = (props) => (
  <NavItemContainer>
    <Link onClick={props.onClick ? () => props.onClick() : null} to={props.href}>{props.label}</Link>
  </NavItemContainer>
)

NavItem.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default NavItem
