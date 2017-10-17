import { browserHistory, Router } from 'react-router';
import React, { Component } from 'react';
import './Unlock.scss';

class Unlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null
    };
  }

  async submit(e) {
    e.preventDefault();
    let { unlockPK } = this.props;
    await unlockPK(this.state.password);
    browserHistory.goBack();
  }

  render() {
    return (
      <form className='unlock-container' onSubmit={this.submit}>
        <h2>Unlock your account:</h2>
        <input type="password" placeholder="password" onChange={(e) => {
          this.setState({ password: e.target.value });
        }}/>
        <div className="">
          <button type="submit" onClick={(e) => this.submit(e)}>Unlock Account</button>
        </div>
      </form>
    );
  }
}

export default Unlock;
