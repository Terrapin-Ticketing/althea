import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { browserHistory } from 'react-router'

import { Wrapper } from 'components/blocks'
import { Text, Button, Success } from 'components/elements'
import { spacing5 } from 'styles/spacing'
import { white } from 'styles/colors'

const ViewWalletContainer = styled.div``;
const ActivateSuccessContainer = styled.div`
  margin-top: 75px;
`;

const ActivateSuccess = ({ event }) =>
  <Wrapper fullWidth borderFull borderRadius boxShadow padding5x5 margin5x0 style={{ background: white }}>
    <ViewWalletContainer>
      <Text fontSize9 base500>Success!</Text>
    </ViewWalletContainer>
    <Success />
    <Text gray500 fontSize6>Those tickets were imported into your wallet.</Text> <br />
    <Text gray500>If you decide you no longer want to get rid of them, you can adjust their status there.</Text>
    <ViewWalletContainer>
      <Button style={{ marginTop: spacing5 }} padding4x5 primaryGreen action={() => browserHistory.push('/wallet')}>
          <Text fontSize5 white>Go to Wallet</Text>
        </Button>
    </ViewWalletContainer>
  </Wrapper>

ActivateSuccess.propTypes = {
  tickets: PropTypes.array.isRequired,
  activateAnotherTicket: PropTypes.func
}

export default ActivateSuccess
