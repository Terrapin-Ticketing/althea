import React from 'react'
import PropTypes from 'prop-types'

import BarcodeForm from 'components/forms/Barcode'

import { Wrapper } from 'components/blocks'
import { H1, H4 } from 'components/elements'

const BarcodeInput = ({ event, nextStep }) =>
  <Wrapper textCenter>
    <Wrapper>
      <H4 subtle>Step 1</H4>
      <H1>Input your barcode</H1>
      <BarcodeForm event={event} afterValidation={nextStep} />
    </Wrapper>
  </Wrapper>

BarcodeInput.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default BarcodeInput
