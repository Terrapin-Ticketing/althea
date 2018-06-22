import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

let Icon = ({ style, className }) => <i style={style} className={className} />

Icon.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string
}

Icon = styled(Icon).attrs({
  className: `${props => props.name} fas`
})``

export default Icon
