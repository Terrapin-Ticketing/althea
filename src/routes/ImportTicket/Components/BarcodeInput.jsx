import React from 'react'
import PropTypes from 'prop-types'

import BarcodeForm from 'components/forms/Barcode'

import { Wrapper } from 'components/blocks'
import { Text } from 'components/elements'

const BarcodeInput = ({ event, nextStep }) =>
  <Wrapper textCenter>
    <Wrapper>
      <Text subtle>Activate Ticket</Text>
      <Text>Input your barcode</Text>
      <BarcodeForm event={event} afterValidation={nextStep} />
    </Wrapper>
  </Wrapper>

BarcodeInput.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default BarcodeInput
