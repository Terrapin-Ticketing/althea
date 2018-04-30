import styled from 'styled-components'

const H2 = styled.h2`
  text-align: ${p => p.center ? 'center' : p.right ? 'right' : 'left'}
`

export default H2
