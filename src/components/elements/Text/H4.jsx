import styled, { css } from 'styled-components'

const H4 = styled.h4`
  text-align: ${p => p.center ? 'center' : p.right ? 'right' : 'left'}
  ${p => p.textGray && css`
    color: rgb(115, 115, 115);
   `}
`

export default H4
