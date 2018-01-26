import React, { Component } from 'react';

class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.updateInput = this.updateInput.bind(this);
    this.signup = this.signup.bind(this);
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  async signup(e) {
    let { email, password } = this.state;
    e.preventDefault();
    try {
      await this.props.signup(email, password);
      this.props.nextStep('ticket_number');
    } catch (e) {
      this.setState({error: 'There was an error creating your account. Please try again.'});
    }
  }

  render() {
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card activate-card">
          <form className="card-content" onSubmit={() => { this.signup(); }}>
            <h1 className="activate-header" style={{textAlign: 'center'}}>Hey stranger, can we shake your hand?</h1>
            {this.state.error}
            <div className="activate-login-form">
              <div className="input-field">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" className="validate" value={this.state.email}
                  onChange={(e) => {
                    this.updateInput('email', e.target.value);
                  }} />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={this.state.password}
                  onChange={(e) => {
                    this.updateInput('password', e.target.value);
                  }} />
              </div>
            </div>
            <div>
              <button className="btn-large align-right" type="submit">Create an Account</button></div>
          </form>
        </div>
        <i className='material-icons' style={{color: '#093'}} onClick={() => this.props.nextStep('welcome')}>arrow_back</i>
      </div>
    );
  }
}

export default PasswordInput;
