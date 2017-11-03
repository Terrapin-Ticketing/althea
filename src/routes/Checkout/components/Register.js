// CheckoutForm.js
import React from 'react';
// import { browserHistory } from 'react-router';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    // let { password, confirmPassword, email, privateKey } = this.state;
    // let { redirectUrl, signup } = this.props;
    // if (password === confirmPassword) {
    //   try {
    //     await signup(email, password, privateKey);
    //     (redirectUrl) ? browserHistory.push(redirectUrl) : browserHistory.push('/events');
    //   } catch (err) { // email already taken
    //     console.log(err);
    //     this.setState({loginError: 'That email is already in use. Please try again.'});
    //   }
    // } else {
    //   this.setState({loginError: 'Your passwords don\'t match! Please try again.'});
    // }
  }

  render() {
    let { email, password, confirmPassword } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="register-container">
         <label className='label'>
           <span>Email:</span>
           <input type="text" value={email} onChange={(e) => {
             this.setState({email: e.target.value});
           }} />
         </label>
         <label className='label'>
           <span>Password:</span>
           <input type="text" value={password} onChange={(e) => {
             this.setState({password: e.target.value});
           }} />
         </label>
         <label className='label'>
           <span>Confirm Password:</span>
           <input type="text" value={confirmPassword} onChange={(e) => {
             this.setState({confirmPassword: e.target.value});
           }} />
         </label>
      </form>
    );
  }
}

export default Register;
