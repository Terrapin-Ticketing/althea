import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Link = styled.a.attrs({
  target: '_blank',
  href: props => props.href
})`
  padding: 0 5px;
`

const Image = styled.img`
  padding: 0 5px;
`

const SocialMediaIcon = (props) =>
  <Link href={props.href}>
    <Image src={props.icon} />
  </Link>

SocialMediaIcon.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string
}

export default SocialMediaIcon
