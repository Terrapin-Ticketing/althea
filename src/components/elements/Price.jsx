import React from 'React'
import PropTypes from 'prop-types'

const Price = ({ price, className }) => {
    return <span className={`${className || ''}`}>${parseFloat(price / 100.0).toFixed(2)}</span>
}

Price.propTypes = {
  price: PropTypes.number.isRequired,
  className: PropTypes.string
}

export default Price
