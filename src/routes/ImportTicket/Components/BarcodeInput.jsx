import React from 'react'
import PropTypes from 'prop-types'

import BarcodeForm from 'components/forms/Barcode'

import { Wrapper } from 'components/blocks'
import { H2, H4 } from 'components/elements'

const BarcodeInput = ({ event, nextStep }) =>
  <Wrapper textCenter>
    <Wrapper>
      <H2 center>{event.name}</H2>
      <H4 textGray center>Input your barcode</H4>
      <BarcodeForm event={event} afterValidation={nextStep} />
    </Wrapper>
  </Wrapper>

BarcodeInput.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default BarcodeInput
