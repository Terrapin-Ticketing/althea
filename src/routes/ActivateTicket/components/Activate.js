import React, { Component } from 'react';
import './Activate.scss';
import { browserHistory } from 'react-router';
import classNames from 'classnames'
import EventInfoContainer from './../../../components/shared/EventInfo/EventInfo';
import Loading from '../../../components/shared/Loading.js';

class Activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      barcode: '',
      orderNumber: '',
      activateError: null
    };
    this.activateTicket = this.activateTicket.bind(this);
  }

  componentDidMount() {
    this.props.getEventInfo(this.props.params.urlSafeName);
    let user = this.props.user;
    if (user) this.setState({ email: user.email });
  }

  async activateTicket(e) {
    e.preventDefault();
    let { params: { urlSafeName } } = this.props;
    let { email, barcode } = this.state;
    try {
      await this.props.activateTicket(urlSafeName, email, barcode);
      if (this.props.error) return this.setState({ activateError: this.props.error });
      browserHistory.push(this.props.redirect);
    } catch (err) {
      this.setState({ activateError: err });
    }
  }

  render() {
    let user = this.props.user;
    if (!this.props.event._id) {
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
                <label htmlFor="barcode">Ticket Number</label>
                <input id="barcode" type="text" className="validate" value={this.state.barcode} onChange={(e) => {
                  this.setState({barcode: e.target.value});
                }} />
              </div>
              <div className="input-field col s6">
                { user ? null : (<label htmlFor="email">Email Address</label>) }
                <input id="email" type="text" value={this.state.email} onChange={(e) => {
                  this.setState({email: e.target.value});
                }} />
              </div>
              <div className="submit-row">
                <span className='error'>{(this.state.activateError) ? this.state.activateError : null}</span>
                {/* <span className='user'>{(this.props.user) ? JSON.stringify(this.props.user) : ''}</span> */}
                <button type="submit" className="btn-large terrapin-green center-align">
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
