import React, { Component } from 'react';

class EmailInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(value) {
    this.setState({ email: value });
    this.props.inputChange('email', value);
  }

  render() {
    let { activateTicket, error } = this.props;
    return (<div className="input-field col s6">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        className="validate"
        value={this.state.email}
        onChange={(e) => {
          this.updateInput(e.target.value);
        }}
      />
      <button onClick={activateTicket} className="btn btn-default terrapin-green">Next</button>
    </div>)
  }
}

export default EmailInput;
