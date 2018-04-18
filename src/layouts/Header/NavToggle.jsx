import React from 'react'
import styled from 'styled-components'

export const MenuIcon = styled.label.attrs({
  htmlFor: 'menu-btn'
})`
  cursor: pointer;
  display: inline-block;
  float: right;
  padding: 18px 20px;
  position: relative;
  user-select: none;
  color: #fff;
  @media (min-width: 48em) {
    display: none;
  }
`

export const NavIcon = styled.span`
  background: #009933;
  display: block;
  height: 2px;
  position: relative;
  transition: background .2s ease-out;
  width: 18px;

  &:before, &:after {
    background: #009933;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    transition: all .2s ease-out;
    width: 100%;
  }

  &:before { top: 5px; }

  &:after { top: -5px; }
`
let NavToggle = (props) =>
  <MenuIcon>
    <NavIcon />
  </MenuIcon>

export default NavToggle
