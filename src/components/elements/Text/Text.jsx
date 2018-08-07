import styled from 'styled-components'

const Text = styled.span`
  text-align: ${p => p.center ? 'center' : p.right ? 'right' : 'left'}
  color: ${p => p.green ? '#149739' : p.grey ? '#737373' : p.subtle ? '#bbb' : '#484848'}
  font-size: ${p => p.small ? '0.8rem' : '1rem'}
  @media (min-width: 48em) {
    writing-mode: ${p => p.vertical ? 'vertical-rl' : null}
    transform: ${p => p.vertical ? 'rotate(180deg)' : null}
  }
`

export default Text
