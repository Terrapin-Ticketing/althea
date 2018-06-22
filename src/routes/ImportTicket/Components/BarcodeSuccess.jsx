import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from 'components/blocks'
import { Button, Text } from 'components/elements'

const BarcodeSuccess = ({ nextStep }) =>
  <Wrapper textCenter>
    <Wrapper marginTop>
      Please login to your account so we can add your ticket to your wallet.
    </Wrapper>
    <Wrapper paddingFull flexColumn>
      <Button className='btn-primary btn-lg' action={() => nextStep('signup')}>Sign Up</Button>
    </Wrapper>
    <Wrapper fontMed>
      <Text grey>Already have an account?</Text><br />
      <Text cursorPointer grey onClick={() => nextStep('login')}>Click here to login.</Text>
    </Wrapper>
  </Wrapper>

BarcodeSuccess.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default BarcodeSuccess
