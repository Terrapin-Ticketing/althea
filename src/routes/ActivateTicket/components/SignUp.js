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
    e.preventDefault();
    let { email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) return this.setState({ error: 'Passwords don\'t match' });

    try {
      await this.props.signup(email, password);
      this.props.nextStep('ticket_number');
    } catch (e) {
      console.log('e: ', e);
      this.setState({error: 'Error: Have you already made an account? If so, try logging in. If not, please contact us.'});
    }
  }

  render() {
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3" key={this.props.key}>
        <div className="card activate-card">
          <form className="card-content" onSubmit={(e) => { this.signup(e); }}>
            <h1 className="activate-header" style={{textAlign: 'center'}}>Hey stranger, can we shake your hand?</h1>
            <span className='error'>{this.state.error}</span>
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
              <div className="input-field">
                <label htmlFor="password">Confirm Password</label>
                <input id="confirmPassword" type="password" value={this.state.confirmPassword}
                  onChange={(e) => {
                    this.updateInput('confirmPassword', e.target.value);
                  }} />
              </div>
            </div>
            <div>
              <button className="btn-large align-right" type="submit">Create an Account</button></div>
          </form>
        </div>
        <i className='material-icons' style={{color: '#093', cursor: 'pointer'}} onClick={() => this.props.nextStep('select_login')}>arrow_back</i>
      </div>
    );
  }
}

export default PasswordInput;
