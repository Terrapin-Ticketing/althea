import styled from 'styled-components'

const H1 = styled.h1`
  padding: 15px 0;
  text-align: ${p => p.center ? 'center' : p.right ? 'right' : 'left'}
`

export default H1
