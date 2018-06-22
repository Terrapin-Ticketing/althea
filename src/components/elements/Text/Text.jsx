import styled, { css } from 'styled-components'

const Text = styled.span`
  text-align: ${p => p.center ? 'center' : p.right ? 'right' : 'left'}
  color: ${p => p.green ? '#149739' : p.grey ? '#737373' : '#FFFFFF'}
  cursor: ${p => p.cursorPointer && 'pointer'}
  ${p => p.textGray && css`
    color: rgb(115, 115, 115);
   `}
`

export default Text
