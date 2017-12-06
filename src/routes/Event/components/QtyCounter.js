import React, { Component } from 'react';

import './Event.scss';

class QtyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(count) {
    let { onChange } = this.props;
    onChange(count);
  }

  render() {
    let { count } = this.state;
    let { ticketsRemaining } = this.props;
    return (
      <div className="ticket-qty">
        <button className="waves-effect qty-control btn terrapin-green" onClick={() => {
          (count > 0) && this.setState({count: count - 1});
          (count > 0) && this.onChange(count - 1);
        }}>-</button>
          <span className='current-qty'> {this.props.count} </span>
          <button className="waves-effect qty-control btn terrapin-green" onClick={() => {
            (ticketsRemaining > count) && this.setState({count: count + 1});
            (ticketsRemaining > count) && this.onChange(count + 1);
          }}>+</button>
      </div>
    );
  }
}

export default QtyCounter;
