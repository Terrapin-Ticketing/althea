import { css } from 'styled-components'
import Wrapper from 'components/blocks/Wrapper'

const Container = Wrapper.extend.attrs({
})`
  display: flex;
  max-width: 1190px;
  ${p => p.bgOffWhite && css`
    background: #f9f9f9;
   `}
  ${p => p.column && css`
    flex-direction: column;
   `}
   ${p => p.center && css`
    align-items: center;
   `}
  ${p => p.row && css`
    flex-direction: row;
  `}
   ${p => p.wrap && css`
    flex-wrap: wrap;
   `}
   ${p => p.paddingTop && css`
    padding-top: 25px;
   `}
`

export default Container
