import React from 'react';

export default class Price extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { price } = this.props;
    return (
      <span>${parseFloat(price / 100.0).toFixed(2)}</span>
    );
  }
}
