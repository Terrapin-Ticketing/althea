import React, { Component } from 'react';
import './Login.scss';
import { browserHistory, Link } from 'react-router';
import classNames from 'classnames'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      privateKey: '',
      loginError: null,
      loginType: 'login'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    document.title = 'Login - Terrapin Ticketing';
  }

  async handleSubmit(e) {
    (this.state.loginType === 'login') ? this.login(e) : this.register(e);
  }

  async login(e) {
    let { email, password } = this.state;
    let { redirectUrl } = this.props;
    e.preventDefault();
    try {
      await this.props.login(email, password);
      (redirectUrl) ? browserHistory.push(redirectUrl) : browserHistory.push('/my-profile');
    } catch (e) {
      this.setState({loginError: 'You entered the wrong login information. Please try again.'});
    }
  }

  async register(e) {
    let { password, confirmPassword, email, privateKey } = this.state;
    let { redirectUrl } = this.props;
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await this.props.signup(email, password, privateKey);
        (redirectUrl) ? browserHistory.push(redirectUrl) : browserHistory.push('/my-profile');
      } catch (err) { // email already taken
        console.log(err);
        this.setState({loginError: 'That email is already in use. Please try again.'});
      }
    } else {
      this.setState({loginError: 'Your passwords don\'t match! Please try again.'});
    }
  }


  render() {
    return (
      <div className='container login-container'>
        <div className="card login-card">
          <div className='row login-selector'>
            <button
              className={classNames('col s6 btn-flat btn-large',
              {'active': (this.state.loginType === 'login')},
              {'inactive': (this.state.loginType === 'register')}
            )}
            style={{borderRadius: 0}}
            onClick={() => this.setState({ loginType: 'login' })}>
            Login
          </button>
          <button
            className={classNames('col s6 btn-flat btn-large',
            {'active': (this.state.loginType === 'register')},
            {'inactive': (this.state.loginType === 'login')}
          )}
          style={{borderRadius: 0}}
          onClick={() => this.setState({ loginType: 'register' })}>
          Register
        </button>
      </div>

      <form className='col s12 login-form' onSubmit={this.handleSubmit}>
        <div className="input-field col s6">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" className="validate" value={this.state.email} onChange={(e) => {
            this.setState({email: e.target.value});
          }} />
        </div>
        <div className="input-field col s6">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={this.state.password} onChange={(e) => {
            this.setState({password: e.target.value});
          }} />
        </div>
        {(this.state.loginType === 'register') && (
          <div className="input-field col s6">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input id="confirm_password" type="password" className="validate" value={this.state.confirmPassword} onChange={(e) => {
              this.setState({confirmPassword: e.target.value});
            }} />
          </div>
        )}
        <div className="submit-row">
          <span className='error'>{(this.state.loginError) ? this.state.loginError : null}</span>
          {/* <span className='user'>{(this.props.user) ? JSON.stringify(this.props.user) : ''}</span> */}
          <button type="submit" className="btn-large terrapin-green center-align" onClick={this.handleSubmit}>
            {this.state.loginType.charAt(0).toUpperCase() + this.state.loginType.slice(1)}
          </button>
        </div>
      </form>
    </div>
    <Link to='/forgot-password' className="right-align"><small>Forgot Password?</small></Link>
  </div>
    );
  }
}

export default Login;
