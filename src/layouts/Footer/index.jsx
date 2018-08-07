import React from 'React'
import styled from 'styled-components'
import SocialIcon from './social-icon'

const FooterContainer = styled.footer`
  border-top: 1px solid #e4e4e4;
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  @media (min-width: 48em) {
    display: flex;
    flex-direction: row;
  }
`

const SocialMediaIconsContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  padding: 10px;
  @media (min-width: 48em) {
    display: flex;
    flex: 1 1 auto;
    justify-content: flex-end;
  }
`

const FooterText = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  padding: 10px;
  @media (min-width: 48em) {
    display: flex;
    flex: 1 1 auto;
    justify-content: flex-start;
  }
`

const Footer = (props) => {
  let activePage = props.location.pathname.split('/').pop()
  return (['import', 'login', 'signup', 'transfer'].indexOf(activePage) === -1) && (
    <FooterContainer>
      <FooterText>
        Copyright 2018 © Terrapin Ticketing, LLC
      </FooterText>
      <SocialMediaIconsContainer>
        <SocialIcon href='mailto:info@terrapinticketing.com' icon={require('assets/social-icons/email.png')} />
        <SocialIcon href='http://facebook.com/terrapinticketing' icon={require('assets/social-icons/facebook.png')} />
        <SocialIcon href='http://instagram.com/terrapinticketing' icon={require('assets/social-icons/instagram.png')} />
        <SocialIcon href='http://www.twitter.com/terrapintickets' icon={require('assets/social-icons/twitter.png')} />
        <SocialIcon href='https://www.linkedin.com/company/18278533/' icon={require('assets/social-icons/linkedin.png')} />
      </SocialMediaIconsContainer>
    </FooterContainer>
  )
}

export default Footer
