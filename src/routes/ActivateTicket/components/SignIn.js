import React, { Component } from 'react';

import LoginForm from 'components/forms/LoginForm';

class SignIn extends Component {

  render() {
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3" key={this.props.key}>
        <div className="card activate-card" style={{padding: 25}}>
          <LoginForm afterLogin={() => this.props.nextStep('ticket_number')} />
        </div>
        <i className='material-icons' style={{color: '#093', cursor: 'pointer'}} onClick={() => this.props.nextStep('select_login')}>arrow_back</i>
      </div>
    );
  }
}

export default SignIn;
