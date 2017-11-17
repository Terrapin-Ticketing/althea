import React, { Component } from 'react';
import web3 from 'web3';
import './CreateEvent.scss';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      qty: '', // TODO: Force to int
      usdPrice: '', // TODO: Force to int,
      imageUrl: '',
      date: '',
      venueName: '',
      venueAddress: '',
      venueCity: '',
      venueState: '',
      venueZip: '',
      password: null
    };
  }

  async onSubmit() {
    let { name, usdPrice, imageUrl, date, venueName, venueAddress, venueCity, venueState, venueZip, qty } = this.state;

    try {
      console.log('trying');
      await this.props.createEvent(name, usdPrice, imageUrl, date, venueName, venueAddress, venueCity, venueState, venueZip, parseInt(qty));
      this.props.router.push('/events');
    } catch (e) {
      console.log('err', e);
    }
  }

  render() {
    return (
      <div className='createEvent-container' >
        <h1>Create Event</h1>
        <span className='user'>Signed in as {(this.props.user) ? this.props.user.email : null}</span>
        <div className='form-container'>
          <div className='left-column'>
            <h2>Event Info</h2>
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
              <span>Price ($):</span>
              <input type="text" value={this.state.price} onChange={(e) => {
                let usdPrice = parseFloat(e.target.value) * 100; // make amount non-decimal
                this.setState({ usdPrice });
              }} />
            </label>
            <h2>Other Info</h2>
            <label className='label'>
              <span>Image Url:</span>
              <input type="text" value={this.state.price} onChange={(e) => {
                this.setState({imageUrl: e.target.value});
              }} />
            </label>
            <label className='label'>
              <span>Date:</span>
              <input type="text" value={this.state.price} onChange={(e) => {
                this.setState({date: e.target.value});
              }} />
            </label>
          </div>
          <div className='right-column'>
            <h2>Venue Info</h2>
            <label className='label'>
              <span>Name:</span>
              <input type="text" value={this.state.price} onChange={(e) => {
                this.setState({venueName: e.target.value});
              }} />
            </label>
            <label className='label'>
              <span>Address:</span>
              <input type="text" value={this.state.price} onChange={(e) => {
                this.setState({venueAddress: e.target.value});
              }} />
            </label>
            <label className='label'>
              <span>City:</span>
              <input type="text" value={this.state.price} onChange={(e) => {
                this.setState({venueCity: e.target.value});
              }} />
            </label>
            <label className='label'>
              <span>State:</span>
              <input type="text" value={this.state.price} onChange={(e) => {
                this.setState({venueState: e.target.value});
              }} />
            </label>
            <label className='label'>
              <span>Zipcode:</span>
              <input type="text" value={this.state.price} onChange={(e) => {
                this.setState({venueZip: e.target.value});
              }} />
            </label>
          </div>
        </div>
        <div className="submit-form">
          <span className='error'>{(this.props.createEventError) ? this.props.createEventError : null}</span>
          <button className="submit-form" onClick={() => this.onSubmit()}>Create Event</button>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
