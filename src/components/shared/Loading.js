import React from 'react';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imageStyle = {
      display: 'flex',
      flex: 1,
      justifySelf: 'center',
      alignSelf: 'center',
      height: 250,
      width: 250
    };

    let divStyle = {
      display: 'flex',
      height: '100%'
    }
    return (
      <div style={divStyle}><img style={imageStyle} src={require('../../layouts/assets/img/spinner-green.svg')} /></div>
    );
  }
}
