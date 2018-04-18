import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import styled from 'styled-components'

const LogoImage = styled.img`
  height: 38px;
  display: block;
  float: left;
  font-size: 2em;
  text-decoration: none;
`

const Logo = (props) => (
  <Link to={props.href}>
    <LogoImage src={props.src} />
  </Link>
)

Logo.propTypes = {
  href: PropTypes.string,
  src: PropTypes.string
}

export default Logo
