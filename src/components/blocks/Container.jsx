import { css } from 'styled-components'
import Wrapper from 'components/blocks/Wrapper'

const Container = Wrapper.extend.attrs({
  className: 'container'
})`
  display: flex;
  ${p => p.column && css`
    flex-direction: column;
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
