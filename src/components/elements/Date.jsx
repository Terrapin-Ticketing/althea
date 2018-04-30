import React from 'React'
import PropTypes from 'prop-types'

import moment from 'moment'
import styled from 'styled-components'

const DateWrapper = styled.span``

const Date = ({ date, format }) =>
  <DateWrapper>{moment(date).format(format)}</DateWrapper>

Date.propTypes = {
  date: PropTypes.string,
  format: PropTypes.string
}

export default Date
