import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const RibbonOuter = styled.div`
  position: absolute;
  left: -5px; top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 150px; height: 150px;
  text-align: right;
`

const RibbonInnter = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-36deg);
  width: 120px;
  display: block;
  background: #79a70a;
  background: linear-gradient(#c63,#c63);
  box-shadow: 0 3px 10px -5px #000;
  position: absolute;
  top: 18.5px;
  left: -17px;
  &:before {
    content: "";
    position: absolute; left: 0px; top: 100%;
    z-index: -1;
    border-left: 3px solid #CC4B4B;
    border-right: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #CC4B4B;
  }
  &:after {
    content: "";
    position: absolute; right: 0px; top: 100%;
    z-index: -1;
    border-left: 3px solid transparent;
    border-right: 3px solid #CC4B4B;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #CC4B4B;
  }
`

let Ribbon = ({ children }) => <RibbonOuter><RibbonInnter>{children}</RibbonInnter></RibbonOuter>

Ribbon.propTypes = {
  children: PropTypes.string,
}


export default Ribbon
