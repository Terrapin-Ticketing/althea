import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(value) {
    this.setState({ email: value });
    this.props.inputChange('email', value);
  }

  render() {
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3" style={{textAlign: 'center'}} key={this.props.key}>
        <div className='card'>
          <form className='card-content' onSubmit={(e) => {
            e.preventDefault();
            this.props.nextStep('select_login')}}>
            <img src={this.props.event.imageUrl} style={{margin: '0 auto', maxHeight: '25vh'}} />
            <h1 className="activate-header" style={{margin: '.67em 0 0.1em 0'}}>{this.props.event.name}</h1>
            <h3 style={{color: '#737373', marginTop: 0}}>Official Ticket Transfer and Resale Marketplace</h3>
            <button className='btn-large terrapin-green'
              type="submit"
              style={{margin: '0 auto'}}>Get Started</button>
              {/* <i className='material-icons' style={{color: '#093'}} onClick={() => this.props.nextStep('welcome')}>arrow_back</i> */}
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
