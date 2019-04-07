import React from 'react'
import PropTypes from 'prop-types'

import BarcodeForm from 'components/forms/Barcode'

import { Wrapper } from 'components/blocks'
import { Text } from 'components/elements'

import { white } from 'styles/colors'
import { spacing13 } from 'styles/spacing'

const BarcodeInput = ({ event, nextStep }) =>
  <Wrapper style={{ width: '90%' }}>
    <Text gray600 fontSize6 fontWeight600 center>Type in Order Number</Text>
    <Wrapper fullWidth borderFull borderRadius boxShadow padding5x5 margin5x0 style={{ background: white }}>
      <BarcodeForm event={event} afterValidation={nextStep} />
    </Wrapper>
    </Wrapper>

BarcodeInput.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default BarcodeInput
