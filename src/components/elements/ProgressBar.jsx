import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

let ProgressBar = ({ progress, style }) =>
  <div className='progress' style={Object.assign({ width: '100%' }, style)}>
    <div className='progress-bar' role='progressbar' style={{ width: `${progress}%` }} 
    aria-valuenow={`${progress}`} aria-valuemin='0' aria-valuemax='100' />
  </div>

ProgressBar.propTypes = {
  progress: PropTypes.string,
  style: PropTypes.object
}

ProgressBar = styled(ProgressBar)`
   cursor: pointer;
   height: 5px;
   position: absolute;
   top: 0px;
   width: 100%;
`

export default ProgressBar
