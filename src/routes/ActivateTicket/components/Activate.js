import React, { Component } from 'react';
import './Activate.scss';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import EventInfoContainer from './../../../components/shared/EventInfo/EventInfo';
import Loading from '../../../components/shared/Loading.js';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Welcome from './Welcome';
import TicketNumber from './TicketNumber';
import SuccessPage from './SuccessPage';
import SelectLogin from './SelectLogin';

class Activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      barcode: this.props.location.query.ticketId || '',
      orderNumber: '',
      activateError: null,
      isLoading: false,
      step: 'welcome'
    };
    this.activateTicket = this.activateTicket.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  async componentDidMount() {
    await this.props.getEventInfo(this.props.params.urlSafeName);
    document.title = `${this.props.event.name} Ticket Activation on Terrapin Ticketing`;
  }

  nextStep(step) {
    this.setState({step});
  }

  async activateTicket(ticketNumber) {
    let { params: { urlSafeName } } = this.props;
    try {
      let resp = await this.props.activateTicket(urlSafeName, this.props.user.email, ticketNumber);
      if (this.props.ticket) this.setState({ticket: this.props.ticket});
    } catch (err) {
      this.setState({ activateError: err});
    }
  }

  renderComponent() {
    switch (this.state.step) {
      case 'welcome':
        return (
          <Welcome
            nextStep={this.nextStep}
            event={this.props.event}
            user={this.props.user}
            key={1}
          />
        );
      case 'select_login':
        return (
          <SelectLogin
            nextStep={this.nextStep}
            event={this.props.event}
            user={this.props.user}
            logout={this.props.logout}
            key={2}
          />
        );
      case 'sign_in':
        return (
          <SignIn
            nextStep={this.nextStep}
            login={this.props.login}
            key={3}
          />
        );
      case 'sign_up':
        return (
          <SignUp
            nextStep={this.nextStep}
            signup={this.props.signup}
            key={4}
          />
        );
      case 'ticket_number':
        return (
          <TicketNumber
            nextStep={this.nextStep}
            // validateTicketNumber={(ticketNumber) => this.props.validateTicketNumber(this.props.params.urlSafeName, ticketNumber)}
            activateTicket={this.activateTicket}
            barcode={this.state.barcode}
            error={this.props.error}
            key={5}
          />
        );
      case 'finish':
        return (
          <SuccessPage
            ticket={this.state.ticket}
            event={this.props.event}
            openSellTicketModal={this.props.openSellTicketModal}
            openTransferTicketModal={this.props.openTransferTicketModal}
            key={6}
          />
        )
    }
  }

  render() {
    let user = this.props.user;
    let progressWidth = (this.state.step === 'welcome') ? '0%' :
      (this.state.step === 'select_login') ? '25%' :
      (this.state.step === 'sign_in') ? '50%' :
      (this.state.step === 'sign_up') ? '50%' :
      (this.state.step === 'ticket_number') ? '75%' : '100%';
    if (!this.props.event || !this.props.event._id) {
      return (
        <Loading />
      );
    }
    return (
      <div className='activate-container'>
        <div className="progress">
          <div className="determinate" style={{width: progressWidth}}></div>
        </div>
        {/* <div className='valign-wrapper' style={{fontSize: '80%', padding: 10}} onClick={() => browserHistory.push('/')}><i className="material-icons">close</i>Cancel</div> */}
        <div className="row" style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
          <img
            onClick={() => browserHistory.push('/events')}
            style={{margin: '0 auto', width: '75%', padding: 25, cursor: 'pointer'}}
            src={require('../../../layouts/assets/img/tt-logo-text-bottom-grn.svg')} />
          <ReactCSSTransitionGroup
            component="div"
            className="activate-transition"
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={200}
            transitionName="Appear" >
              {this.renderComponent()}
            </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default Activate;
