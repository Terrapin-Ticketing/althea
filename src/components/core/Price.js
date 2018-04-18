import React from 'react'
import PropTypes from 'prop-types'

let price = ({ price }) =>
  <span>${parseFloat(price / 100.0).toFixed(2)}</span>

price.propTypes = {
  price: PropTypes.integer.isRequired
}

export default price
