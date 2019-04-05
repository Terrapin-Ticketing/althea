import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import styled from 'styled-components'

const NavItemContainer = styled.li`
  cursor: pointer;
  float: left;
  padding: 20px 30px;
  font-size: 16px;
  font-weight: 700;
`

const StyledLink = styled(Link)`
  &:focus, &:active {
    outline: 0;
  }
`;

const NavItem = (props) => (
  <NavItemContainer>
    <StyledLink onClick={props.onClick ? () => props.onClick() : null} to={props.href}>{props.label}</StyledLink>
  </NavItemContainer>
)

NavItem.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default NavItem
