import styled, { css } from 'styled-components'

import Image from 'components/blocks/Card/Image'
import Actions from 'components/blocks/Card/Actions'
import Text from 'components/blocks/Card/Text'

const Card = styled.div.attrs({
  // className: 'col-lg-4 col-md-6 col-sm-12'
  })`
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #e4e4e4;
  font-family: Montserrat,sans-serif;
  color: #787878;
  margin: 15px 15px;
  padding: 0;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);
  @media screen and (min-width: 40em) {
  }
  @media screen and (min-width: 60em) {
  }
  ${p => p.flexRow && css`
  flex-direction: row;
  `}
`

const Information = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

Card.Information = Information
Card.Image = Image
Card.Text = Text
Card.Actions = Actions

export default Card
