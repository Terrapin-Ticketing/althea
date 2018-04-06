import React, { Component } from 'react';
import './Signup.scss';
import { browserHistory, Link } from 'react-router';

import SignupForm from '../../../components/forms/SignupForm';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    document.title = 'Signup - Terrapin Ticketing';
  }

  afterSignup() {
    browserHistory.push('/my-profile');
  }

  render() {
    return (
      <div className='container login-container'>
        <div className="card login-card">
          <div className='row login-selector'>
            <button
              className='col s6 btn-flat btn-large'
              onClick={() => browserHistory.push('/login')}
              style={{borderRadius: 0}}>
              Login
            </button>
            <button
              className='col s6 btn-flat btn-large active'
              style={{borderRadius: 0}}>
              Signup
            </button>
          </div>
          <SignupForm afterSignup={this.afterSignup} />
        </div>
        <Link to='/forgot-password' className="right-align"><small>Forgot Password?</small></Link>
      </div>
    );
  }
}

export default Signup;
