import React, { Component } from 'react';
import web3 from 'web3';
import './CreateEvent.scss';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      qty: '', // TODO: Force to int
      price: '', // TODO: Force to int,
      password: null
    };
  }

  onSubmit() {
    let { name, qty, price, password } = this.state;
    this.props.createEvent(name, parseInt(qty), web3.utils.toWei(price, 'ether'), password)
      .then(() => {
        this.props.router.push('/events');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='createEvent-container' >
        <h1>Create Event</h1>
        <span className='user'>Signed in as {(this.props.user) ? this.props.user.email : null}</span>
        <label className='label'>
          <span>Event Name:</span>
          <input type="text" value={this.state.name} onChange={(e) => {
            this.setState({name: e.target.value});
          }} />
        </label>
        <label className='label'>
          <span>Qty:</span>
          <input type="text" value={this.state.qty} onChange={(e) => {
            this.setState({qty: e.target.value});
          }} />
        </label>
        <label className='label'>
          <span>Price:</span>
          <input type="text" value={this.state.price} onChange={(e) => {
            this.setState({price: e.target.value});
          }} />
        </label>
        <label className='label'>
          <span>Confirm Password:</span>
          <input type="text" value={this.state.password || ''} onChange={(e) => {
            this.setState({password: e.target.value});
          }} />
        </label>
        <span className='error'>{(this.props.createEventError) ? this.props.createEventError : null}</span>

        <button onClick={() => this.onSubmit()}>Create Event</button>
      </div>
    );
  }
}

export default CreateEvent;
