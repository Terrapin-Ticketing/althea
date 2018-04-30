import styled from 'styled-components'

const H3 = styled.h3`
  text-align: ${p => p.centered ? 'center' : p.right ? 'right' : 'left'}
`

export default H3
