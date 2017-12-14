import React, { Component } from 'react';
import './Activate.scss';
import { browserHistory } from 'react-router';
import classNames from 'classnames'
import EventInfoContainer from './../../../components/shared/EventInfo';
import Loading from '../../../components/shared/Loading.js';

class Activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      ticketNumber: '',
      orderNumber: '',
      activateError: null
    };
    this.activateTicket = this.activateTicket.bind(this);
  }

  componentDidMount() {
    this.props.getEventInfo(this.props.params.urlSafeName);
  }

  activateTicket() {
    this.props.activateTicket(this.state.email, this.state.ticketNumber, this.state.orderNumber)
    .then(() => browserHistory.push('my-profile'))
    .catch((err) => this.setState({ activateError: err }));
  }


  render() {
    console.log('this.props: ', this.props);
    if (!this.props.event) {
      return (
        <Loading />
      );
    }
    return (
      <div className='container activate-container'>
        <EventInfoContainer event={this.props.event} />
        <div className="card activate-card">
          <div className="card-content">
            <form className='col s12 login-form' onSubmit={this.activateTicket}>
              <div className="input-field col s6">
                <label for="email">Email Address</label>
                <input id="email" type="text" value={this.state.email} onChange={(e) => {
                  this.setState({email: e.target.value});
                }} />
              </div>
              <div className="input-field col s6">
                <label for="ticketNumber">Ticket Number</label>
                <input id="ticketNumber" type="text" className="validate" value={this.state.ticketNumber} onChange={(e) => {
                  this.setState({ticketNumber: e.target.value});
                }} />
              </div>
              <div className="input-field col s6">
                <label for="orderNumber">Order Number</label>
                <input id="orderNumber" type="text" value={this.state.orderNumber} onChange={(e) => {
                  this.setState({orderNumber: e.target.value});
                }} />
              </div>
              <div className="submit-row">
                <span className='error'>{(this.state.activateError) ? this.state.activateError : null}</span>
                {/* <span className='user'>{(this.props.user) ? JSON.stringify(this.props.user) : ''}</span> */}
                <button type="submit" className="btn-large terrapin-green center-align" onClick={this.activateTicket}>
                  Activate Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Activate;
