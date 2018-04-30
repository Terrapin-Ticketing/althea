import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

let ProgressBar = ({ progress }) =>
  <div className='progress'>
    <div className='progress-bar' role='progressbar' style={{ width: `${progress}%` }} aria-valuenow={`${progress}`} aria-valuemin='0' aria-valuemax='100' />
  </div>

ProgressBar.propTypes = {
  progress: PropTypes.number
}

ProgressBar = styled(ProgressBar)`
   cursor: pointer;
   height: 5px;
   position: absolute;
   top: 0px;
   width: 100%;
`

export default ProgressBar
