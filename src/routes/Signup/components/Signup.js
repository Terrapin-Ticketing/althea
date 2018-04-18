import React, { Component } from 'react'
import './Signup.scss'
import { browserHistory, Link } from 'react-router'

import SignupForm from '../../../components/forms/SignupForm'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  componentDidMount() {
    document.title = 'Signup - Terrapin Ticketing'
  }

  afterSignup() {
    browserHistory.push('/my-profile')
  }

  render() {
    return (
      <div className='container signup-container col-sm-12 col-md-6'>
        <div className='signup-header'><h2>Sign up for Terrapin</h2></div>
        <SignupForm afterSignup={this.afterSignup} />
        <div className='other-actions'>
          <Link to='/login'><small>Log In</small></Link>
        </div>
      </div>
    )
  }
}

export default Signup
