import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { base500, gray200, gray400 } from 'styles/colors'
import { spacing1 } from 'styles/spacing'

let Progress = ({ progress }) =>
  <ProgressWrapper>
    <StepContainer>
      <ProgressCircle done={progress > 1}>
        <Label>1</Label>
      </ProgressCircle>
      <Title>Sign In</Title>
    </StepContainer>

    <ProgressBar />
    
    <StepContainer>
      <ProgressCircle done={progress > 2}>
        <Label>2</Label>
      </ProgressCircle>
      <Title>Input Order Number</Title>
    </StepContainer>

    <ProgressBar />

    <StepContainer>
      <ProgressCircle done={progress > 3}>
        <Label>3</Label>
      </ProgressCircle>
      <Title>Select Tickets</Title>
    </StepContainer>
  </ProgressWrapper>

const ProgressWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
`
const StepContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9;
`;

const ProgressCircle = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 32px;
  color: #b5b5ba;
  font-size: 17px;
  margin-bottom: ${spacing1}

  color: ${({ done }) => { return done ? '#FFF' : gray400 }};
  background: ${({ done }) => { return done ? base500 : '' }};
  box-shadow: ${({ done }) => { return done ? 'inset 0 0 2px rgba(0,0,0,.2)' : 'inset 0 0 2px rgba(0,0,0,.2)'}};
`;

const Label = styled.span`

`;

const Title = styled.span`
  color: ${gray400};
`;


const ProgressBar = styled.span`
  flex: 1;
  height: 2px;
  background: ${gray200}
  top: -11px;
  position: relative;
  margin: 0 -80px;
`;


Progress.propTypes = {
  progress: PropTypes.number,
  style: PropTypes.object
}

export default Progress
