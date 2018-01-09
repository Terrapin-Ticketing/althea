import React, { Component } from 'react';

class TicketNumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: '',
      error: null
    };
    this.updateInput = this.updateInput.bind(this);
    this.validateTicketNumber = this.validateTicketNumber.bind(this);
  }

  updateInput(value) {
    this.setState({ ticketNumber: value });
    this.props.inputChange('ticketNumber', value);
  }

  async validateTicketNumber() {
    let { checkIfValidTicketNumber, nextStep } = this.props;
    this.setState({isLoading: true});
    await checkIfValidTicketNumber(this.state.ticketNumber);
    let { error } = this.props;
    if (!error) {
      nextStep();
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    let { error } = this.props;
    return (<div className="input-field col s6">
      <label htmlFor="ticketNumber">Ticket Number</label>
      <input
        id="ticketNumber"
        type="text"
        className="validate"
        value={this.state.ticketNumber}
        onChange={(e) => {
          this.updateInput(e.target.value);
        }}
      />
      {(error) ? <div>Error!</div> : null }
      <button onClick={this.validateTicketNumber} className="btn btn-default terrapin-green">Next</button>
    </div>);
  }
}

export default TicketNumberInput;
