import React, { Component } from 'react';

class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(value) {
    this.setState({ password: value });
    this.props.inputChange('password', value);
  }

  render() {
    let { activateTicket, error } = this.props;
    return (<div className="input-field col s6">
      <label htmlFor="password">Email</label>
      <input
        id="password"
        type="text"
        className="validate"
        value={this.state.password}
        onChange={(e) => {
          this.updateInput(e.target.value);
        }}
      />
      <button onClick={activateTicket} className="btn btn-default terrapin-green">Next</button>
    </div>)
  }
}

export default PasswordInput;
