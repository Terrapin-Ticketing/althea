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
      barcode: this.props.location.query.ticketId || '',
      orderNumber: '',
      activateError: null,
      isLoading: false
    };
    this.activateTicket = this.activateTicket.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.props.getEventInfo(this.props.params.urlSafeName);
    document.title = `${this.props.event.name} Ticket Activation on Terrapin Ticketing`;
    let user = this.props.user;
    if (user) this.setState({ email: user.email });
    window.setTimeout(() => { Materialize.updateTextFields() }, 500);
  }

  async activateTicket(e) {
    e.preventDefault();
    this.setState({isLoading: true});
    let { params: { urlSafeName } } = this.props;
    let { email, barcode } = this.state;
    try {
      await this.props.activateTicket(urlSafeName, email, barcode);
      if (this.props.error) return this.setState({ activateError: this.props.error, isLoading: false });
      this.setState({isLoading: false});
      browserHistory.push(this.props.redirect);
    } catch (err) {
      this.setState({ activateError: err, isLoading: false });
    }
  }

  render() {
    let user = this.props.user;
    if (!this.props.event || !this.props.event._id) {
      return (
        <Loading />
      );
    }
    return (
      <div className='container activate-container'>
        <EventInfoContainer event={this.props.event} />
        <div className="card activate-card">
          <div className="card-content">
            <h2>Ticket Information</h2>
            <form className='col s12 login-form' onSubmit={this.activateTicket}>
              <div className="input-field col s6">
                <label htmlFor="barcode">Ticket Number</label>
                <input id="barcode" type="text" data-error="wrong" className="validate" value={this.state.barcode} onChange={(e) => {
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
                { this.state.isLoading ? (
                  <div className="spinner-container">
                    <div className="preloader-wrapper small active">
                      <div className="spinner-layer spinner-green-only">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div><div className="gap-patch">
                          <div className="circle"></div>
                        </div><div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ): <button type="submit" className={classNames('btn-large terrapin-green center-align wave-effect waves-light', { disabled: this.state.isLoading })}>
                  Activate Ticket
                </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Activate;
