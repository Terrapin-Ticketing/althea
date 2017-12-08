// CheckoutForm.js
import React from 'react';
import { Link } from 'react-router';

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
    let { onRegister } = this.props;
    return (
      <form className="register-container card">
         <span className="section-header">Registration Information</span>
        <p>Already have an account? Log in <Link to={'/login'}>here</Link></p>
        <div className="row">
          <div className="input-field col s12 m6">
            <input id='email' type='text' value={email} onChange={(e) => {
              let email = e.target.value;
              onRegister({
                ...this.state,
                email
              });
              this.setState({ email });
            }} />
            <label for='email'>Email</label>
          </div>
          <div className="input-field col s12 m6">
            <input id='password' type='text' value={password} onChange={(e) => {
              let password = e.target.value;
              onRegister({
                ...this.state,
                password
              });
              this.setState({ password });
            }} />
            <label for='password'>Password</label>
          </div>
        </div>
      </form>
    );
  }
}

export default Register;
